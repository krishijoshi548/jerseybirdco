import React from 'react';
import { Search, X, RotateCcw, ArrowUpDown, Filter, DollarSign, Shirt } from 'lucide-react';
import { SEASONS, KIT_TYPES } from '../data/jerseys';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedSeason: string;
  onSeasonChange: (season: string) => void;
  selectedKitType: string;
  onKitTypeChange: (kitType: string) => void;
  selectedPriceRange: string;
  onPriceRangeChange: (priceRange: string) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  onResetFilters: () => void;
  totalFiltered: number;
  totalAll: number;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSeason,
  onSeasonChange,
  selectedKitType,
  onKitTypeChange,
  selectedPriceRange,
  onPriceRangeChange,
  sortBy,
  onSortByChange,
  onResetFilters,
  totalFiltered,
  totalAll,
  searchInputRef,
}) => {
  const isFiltered =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedSeason !== 'All' ||
    selectedKitType !== 'All' ||
    selectedPriceRange !== 'All';

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl shadow-black/40 mb-8 backdrop-blur-md">
      {/* Top Row: Search Input + Sort Selection */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        {/* Live Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4 text-emerald-400" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search jersey options, club or national team (e.g. 'Arsenal', 'Argentina', 'Home', 'Away')..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs font-semibold text-slate-400 flex items-center gap-1 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Sort:</span>
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="w-full sm:w-auto px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 cursor-pointer"
          >
            <option value="featured">Featured Jerseys</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="season-desc">Newest Season</option>
          </select>
        </div>
      </div>

      {/* Filter Row: Season, Kit Type, Price Range */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 items-center">
        {/* Kit Option (Home, Away, Third) */}
        <div>
          <label htmlFor="kit-type-select" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Jersey Option / Kit Type
          </label>
          <select
            id="kit-type-select"
            value={selectedKitType}
            onChange={(e) => onKitTypeChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 cursor-pointer"
          >
            {KIT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type === 'All' ? 'All Kit Types (Home, Away, Third)' : `${type} Jersey`}
              </option>
            ))}
          </select>
        </div>

        {/* Season Filter */}
        <div>
          <label htmlFor="season-select" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Season / Release Year
          </label>
          <select
            id="season-select"
            value={selectedSeason}
            onChange={(e) => onSeasonChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 cursor-pointer"
          >
            {SEASONS.map((season) => (
              <option key={season} value={season}>
                {season === 'All' ? 'All Seasons' : season}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label htmlFor="price-range-select" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Price Range (Replica Base)
          </label>
          <select
            id="price-range-select"
            value={selectedPriceRange}
            onChange={(e) => onPriceRangeChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 cursor-pointer"
          >
            <option value="All">All Price Ranges</option>
            <option value="under-90">Under $90</option>
            <option value="90-100">$90 to $100</option>
            <option value="over-100">$100+ & Special Editions</option>
          </select>
        </div>
      </div>

      {/* Summary and Reset Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 mt-3 border-t border-slate-800/60 text-xs">
        <div className="text-slate-400">
          Showing <span className="font-bold text-emerald-400">{totalFiltered}</span> of{' '}
          <span className="font-bold text-white">{totalAll}</span> jersey options
        </div>

        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/30 transition-all cursor-pointer"
            title="Reset all filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      {isFiltered && (
        <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 text-xs">
          <span className="text-slate-400 font-medium">Active:</span>
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-200 border border-slate-700">
              Query: &ldquo;{searchQuery}&rdquo;
              <button onClick={() => onSearchChange('')} className="hover:text-rose-400 ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
              {selectedCategory}
              <button onClick={() => onCategoryChange('All')} className="hover:text-white ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedKitType !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-950/80 text-blue-300 border border-blue-500/30">
              {selectedKitType} Kit
              <button onClick={() => onKitTypeChange('All')} className="hover:text-white ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedSeason !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-950/80 text-amber-300 border border-amber-500/30">
              Season: {selectedSeason}
              <button onClick={() => onSeasonChange('All')} className="hover:text-white ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedPriceRange !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-purple-950/80 text-purple-300 border border-purple-500/30">
              Price: {selectedPriceRange}
              <button onClick={() => onPriceRangeChange('All')} className="hover:text-white ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
