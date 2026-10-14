import React, { useState, useMemo, useRef, useEffect } from 'react';
import { JERSEY_BLOGS, JerseyBlog } from './data/jerseys';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { JerseyCard } from './components/JerseyCard';
import { JerseyModal } from './components/JerseyModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { Footer } from './components/Footer';
import { SearchX, RotateCcw } from 'lucide-react';

const LOCAL_STORAGE_BOOKMARKS_KEY = 'jerseybird_saved_kits';

export default function App() {
  // Navigation & Category State (Taskbar)
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [selectedKitType, setSelectedKitType] = useState<string>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'EUR'>('USD');

  // Modal & Drawer State
  const [activeJersey, setActiveJersey] = useState<JerseyBlog | null>(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Bookmarks persisted in LocalStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BOOKMARKS_KEY);
      return saved ? JSON.parse(saved) : ['arsenal-home-2023-24', 'argentina-home-2022-23'];
    } catch {
      return ['arsenal-home-2023-24', 'argentina-home-2022-23'];
    }
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BOOKMARKS_KEY, JSON.stringify(bookmarkedIds));
    } catch (err) {
      console.warn('Could not save bookmarks to localStorage', err);
    }
  }, [bookmarkedIds]);

  // Keyboard shortcut: '/' focuses search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleBookmark = (jersey: JerseyBlog) => {
    setBookmarkedIds((prev) =>
      prev.includes(jersey.id) ? prev.filter((id) => id !== jersey.id) : [...prev, jersey.id]
    );
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarkedIds((prev) => prev.filter((item) => item !== id));
  };

  const handleClearAllBookmarks = () => {
    setBookmarkedIds([]);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSeason('All');
    setSelectedKitType('All');
    setSelectedPriceRange('All');
    setSortBy('featured');
  };

  const handleSelectTag = (tag: string) => {
    setSearchQuery(tag);
    searchInputRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter and Sort jerseys
  const filteredJerseys = useMemo(() => {
    return JERSEY_BLOGS.filter((jersey) => {
      // League Category Filter (Taskbar)
      if (selectedCategory !== 'All' && jersey.teamType !== selectedCategory) {
        return false;
      }

      // Season Filter
      if (selectedSeason !== 'All' && jersey.season !== selectedSeason) {
        return false;
      }

      // Kit Type Filter (Home, Away, Third)
      if (selectedKitType !== 'All' && jersey.kitType !== selectedKitType) {
        return false;
      }

      // Price Range Filter
      if (selectedPriceRange === 'under-90' && jersey.priceUSD >= 90) {
        return false;
      }
      if (selectedPriceRange === '90-100' && (jersey.priceUSD < 90 || jersey.priceUSD > 100)) {
        return false;
      }
      if (selectedPriceRange === 'over-100' && jersey.priceUSD <= 100) {
        return false;
      }

      // Search matching title, team, options, description
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = jersey.title.toLowerCase().includes(query);
        const matchesTeam = jersey.team.toLowerCase().includes(query);
        const matchesSeason = jersey.season.toLowerCase().includes(query);
        const matchesKitType = jersey.kitType.toLowerCase().includes(query);
        const matchesDesc = jersey.shortDescription.toLowerCase().includes(query);
        const matchesOptions = jersey.availableOptions.some((opt) =>
          opt.edition.toLowerCase().includes(query)
        );

        if (
          !matchesTitle &&
          !matchesTeam &&
          !matchesSeason &&
          !matchesKitType &&
          !matchesDesc &&
          !matchesOptions
        ) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.priceUSD - b.priceUSD;
      }
      if (sortBy === 'price-desc') {
        return b.priceUSD - a.priceUSD;
      }
      if (sortBy === 'rating-desc') {
        return b.rating - a.rating;
      }
      if (sortBy === 'season-desc') {
        return b.season.localeCompare(a.season);
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedSeason, selectedKitType, selectedPriceRange, sortBy]);

  // Bookmarked jersey objects
  const bookmarkedJerseys = useMemo(() => {
    return JERSEY_BLOGS.filter((j) => bookmarkedIds.includes(j.id));
  }, [bookmarkedIds]);

  // Modal navigation indices
  const currentModalIndex = useMemo(() => {
    if (!activeJersey) return -1;
    return filteredJerseys.findIndex((j) => j.id === activeJersey.id);
  }, [activeJersey, filteredJerseys]);

  const handleModalNavigate = (direction: 'prev' | 'next') => {
    if (currentModalIndex === -1) return;
    if (direction === 'prev' && currentModalIndex > 0) {
      setActiveJersey(filteredJerseys[currentModalIndex - 1]);
    } else if (direction === 'next' && currentModalIndex < filteredJerseys.length - 1) {
      setActiveJersey(filteredJerseys[currentModalIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navbar with JerseyBird Branding and Taskbar Sections */}
      <Navbar
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSearchQuery('');
        }}
        bookmarkCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onFocusSearch={() => {
          searchInputRef.current?.focus();
          searchInputRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
        currency={currency}
        onChangeCurrency={setCurrency}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSelectTag={handleSelectTag}
          totalKits={JERSEY_BLOGS.length}
          selectedCategory={selectedCategory}
        />

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5">
          {/* Filter Bar (No manufacturer references, includes kit types & price ranges) */}
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedSeason={selectedSeason}
            onSeasonChange={setSelectedSeason}
            selectedKitType={selectedKitType}
            onKitTypeChange={setSelectedKitType}
            selectedPriceRange={selectedPriceRange}
            onPriceRangeChange={setSelectedPriceRange}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            onResetFilters={handleResetFilters}
            totalFiltered={filteredJerseys.length}
            totalAll={JERSEY_BLOGS.length}
            searchInputRef={searchInputRef}
          />

          {/* Jersey Grid */}
          {filteredJerseys.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredJerseys.map((jersey) => (
                <JerseyCard
                  key={jersey.id}
                  jersey={jersey}
                  isBookmarked={bookmarkedIds.includes(jersey.id)}
                  onToggleBookmark={handleToggleBookmark}
                  onOpenDetails={(j) => setActiveJersey(j)}
                  currency={currency}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-20 px-4 text-center rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 mb-4">
                <SearchX className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-['Cabinet_Grotesk']">
                No Football Jerseys Match Your Criteria
              </h3>
              <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
                We couldn&apos;t find any jerseys matching your current combination of keywords,
                season, kit type, or price filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }}
      />

      {/* Jersey Options & Pricing Modal */}
      <JerseyModal
        jersey={activeJersey}
        onClose={() => setActiveJersey(null)}
        isBookmarked={activeJersey ? bookmarkedIds.includes(activeJersey.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onNavigate={handleModalNavigate}
        hasPrev={currentModalIndex > 0}
        hasNext={currentModalIndex < filteredJerseys.length - 1}
        currency={currency}
      />

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedJerseys={bookmarkedJerseys}
        onRemoveBookmark={handleRemoveBookmark}
        onClearAll={handleClearAllBookmarks}
        onSelectJersey={(jersey) => {
          setActiveJersey(jersey);
        }}
        currency={currency}
      />
    </div>
  );
}
