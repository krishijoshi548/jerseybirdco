import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { JERSEY_BLOGS, JerseyBlog } from './data/jerseys';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EnglandSpotlight } from './components/EnglandSpotlight';
import { FilterBar } from './components/FilterBar';
import { JerseyCard } from './components/JerseyCard';
import { JerseyModal } from './components/JerseyModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { Footer } from './components/Footer';
import { SearchX, RotateCcw } from 'lucide-react';
import { SEO_CONFIGS, getJerseySEODescription, updateMetaTags } from './utils/seo';

const LOCAL_STORAGE_BOOKMARKS_KEY = 'jerseybird_saved_kits';

export default function App() {
  // Helper to parse path from initial URL
  const getInitialRouteState = () => {
    if (typeof window === 'undefined') {
      return { category: 'All', jerseyId: null };
    }
    const path = window.location.pathname.toLowerCase();
    if (path.includes('national-jerseys')) {
      return { category: 'National Team', jerseyId: null };
    }
    if (path.includes('premier-league-jerseys')) {
      return { category: 'Premier League', jerseyId: null };
    }
    if (path.includes('/jersey/')) {
      const id = path.split('/jersey/')[1]?.replace(/\/$/, '');
      return { category: 'All', jerseyId: id };
    }
    return { category: 'All', jerseyId: null };
  };

  const initialRoute = getInitialRouteState();

  // Navigation & Category State (Taskbar)
  const [selectedCategory, setSelectedCategory] = useState<string>(initialRoute.category);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [selectedKitType, setSelectedKitType] = useState<string>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'EUR'>('USD');

  // Modal & Drawer State
  const [activeJersey, setActiveJersey] = useState<JerseyBlog | null>(() => {
    if (initialRoute.jerseyId) {
      return JERSEY_BLOGS.find((j) => j.id === initialRoute.jerseyId) || null;
    }
    return null;
  });
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Bookmarks persisted in LocalStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BOOKMARKS_KEY);
      return saved ? JSON.parse(saved) : ['england-home-2024-25', 'arsenal-home-2023-24'];
    } catch {
      return ['england-home-2024-25', 'arsenal-home-2023-24'];
    }
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Dynamic SEO and URL sync
  useEffect(() => {
    if (activeJersey) {
      const uniqueUrl = `/jersey/${activeJersey.id}`;
      updateMetaTags({
        title: `${activeJersey.title} Prices & Options | JerseyBird`,
        description: getJerseySEODescription(activeJersey),
        urlPath: uniqueUrl,
        image: activeJersey.image,
      });
      if (window.location.pathname !== uniqueUrl) {
        window.history.pushState({ jerseyId: activeJersey.id }, '', uniqueUrl);
      }
    } else if (selectedCategory === 'National Team') {
      updateMetaTags({
        title: SEO_CONFIGS.national.title,
        description: SEO_CONFIGS.national.description,
        urlPath: SEO_CONFIGS.national.path,
      });
      if (window.location.pathname !== SEO_CONFIGS.national.path) {
        window.history.pushState({ category: 'National Team' }, '', SEO_CONFIGS.national.path);
      }
    } else if (selectedCategory === 'Premier League') {
      updateMetaTags({
        title: SEO_CONFIGS.premierLeague.title,
        description: SEO_CONFIGS.premierLeague.description,
        urlPath: SEO_CONFIGS.premierLeague.path,
      });
      if (window.location.pathname !== SEO_CONFIGS.premierLeague.path) {
        window.history.pushState({ category: 'Premier League' }, '', SEO_CONFIGS.premierLeague.path);
      }
    } else {
      updateMetaTags({
        title: SEO_CONFIGS.all.title,
        description: SEO_CONFIGS.all.description,
        urlPath: SEO_CONFIGS.all.path,
      });
      if (
        window.location.pathname !== SEO_CONFIGS.all.path &&
        window.location.pathname !== '/'
      ) {
        window.history.pushState({ category: 'All' }, '', SEO_CONFIGS.all.path);
      }
    }
  }, [activeJersey, selectedCategory]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const route = getInitialRouteState();
      setSelectedCategory(route.category);
      if (route.jerseyId) {
        setActiveJersey(JERSEY_BLOGS.find((j) => j.id === route.jerseyId) || null);
      } else {
        setActiveJersey(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

  const handleSelectEnglandKit = (teamName: string) => {
    setSearchQuery(teamName);
    setSelectedCategory('National Team');
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

  const handleCloseModal = () => {
    setActiveJersey(null);
    // Restore classification URL
    if (selectedCategory === 'National Team') {
      window.history.pushState({}, '', SEO_CONFIGS.national.path);
    } else if (selectedCategory === 'Premier League') {
      window.history.pushState({}, '', SEO_CONFIGS.premierLeague.path);
    } else {
      window.history.pushState({}, '', SEO_CONFIGS.all.path);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-orange-500 selection:text-white">
      {/* Top Navbar with JerseyBird Branding and New-Tab Taskbar Links */}
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
        {/* Playful Hero Section */}
        <Hero
          onSelectTag={handleSelectTag}
          totalKits={JERSEY_BLOGS.length}
          selectedCategory={selectedCategory}
        />

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          {/* England National Team Spotlight Card with Action Photo */}
          <EnglandSpotlight
            onSelectEnglandKit={handleSelectEnglandKit}
            currency={currency}
          />

          {/* Filter Bar with Warm Playful Contrast */}
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
            <div className="py-20 px-4 text-center rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 mb-4 shadow">
                <SearchX className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white mb-2 font-['Cabinet_Grotesk']">
                No Football Jerseys Found
              </h3>
              <p className="text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
                Try searching for another team (like &ldquo;England&rdquo; or &ldquo;Arsenal&rdquo;) or
                resetting your price & kit type filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-xs tracking-wider uppercase transition-all shadow-lg shadow-orange-500/25 cursor-pointer transform hover:-translate-y-0.5"
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
        onClose={handleCloseModal}
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
