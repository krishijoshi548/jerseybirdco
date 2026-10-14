import React from 'react';
import { Search, X, RotateCcw, ArrowUpDown, Filter, DollarSign, Shirt, Sparkles } from 'lucide-react';
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
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-black/50 mb-8 backdrop-blur-md">
      {/* Top Row: Search Input + Sort Selection */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        {/* Live Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4 text-orange-400" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search teams, players or kits (e.g. 'England', 'Arsenal', 'Bellingham', 'Home', 'Away')..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-[#0b1120] border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs font-bold text-slate-300 flex items-center gap-1 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Sort:</span>
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-[#0b1120] border border-slate-700/80 text-white text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 cursor-pointer"
          >
            <option value="featured">Featured Picks</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Fan Rating</option>
            <option value="season-desc">Newest Season</option>
          </select>
        </div>
      </div>

      {/* Filter Row: Kit Type, Season, Price Range */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 items-center">
        {/* Kit Option (Home, Away, Third) */}
        <div>
          <label htmlFor="kit-type-select" className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
            Jersey Option / Kit Type
          </label>
          <select
            id="kit-type-select"
            value={selectedKitType}
            onChange={(e) => onKitTypeChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b1120] border border-slate-700/80 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 cursor-pointer"
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
          <label htmlFor="season-select" className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
            Season / Release Campaign
          </label>
          <select
            id="season-select"
            value={selectedSeason}
            onChange={(e) => onSeasonChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b1120] border border-slate-700/80 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 cursor-pointer"
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
          <label htmlFor="price-range-select" className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
            Price Range (Replica Base)
          </label>
          <select
            id="price-range-select"
            value={selectedPriceRange}
            onChange={(e) => onPriceRangeChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b1120] border border-slate-700/80 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 cursor-pointer"
          >
            <option value="All">All Price Ranges</option>
            <option value="under-90">Under $90</option>
            <option value="90-100">$90 to $100</option>
            <option value="over-100">$100+ & Special Editions</option>
          </select>
        </div>
      </div>

      {/* Summary and Reset Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-3 border-t border-slate-800/60 text-xs">
        <div className="text-slate-300 font-medium">
          Showing <span className="font-black text-orange-400 text-sm">{totalFiltered}</span> of{' '}
          <span className="font-bold text-white">{totalAll}</span> available kits
        </div>

        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
            title="Reset all filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      {isFiltered && (
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-800/40 text-xs">
          <span className="text-slate-400 font-bold">Active:</span>
          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-amber-300 border border-slate-700 font-medium">
              &ldquo;{searchQuery}&rdquo;
              <button onClick={() => onSearchChange('')} className="hover:text-rose-400 ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
              {selectedCategory}
              <button onClick={() => onCategoryChange('All')} className="hover:text-white ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedKitType !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold">
              {selectedKitType} Kit
              <button onClick={() => onKitTypeChange('All')} className="hover:text-white ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedSeason !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
              Season: {selectedSeason}
              <button onClick={() => onSeasonChange('All')} className="hover:text-white ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedPriceRange !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
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
