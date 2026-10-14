import React from 'react';
import { Bookmark, Search, Globe, Shield, Bird } from 'lucide-react';

interface NavbarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  bookmarkCount: number;
  onOpenBookmarks: () => void;
  onFocusSearch: () => void;
  currency: 'USD' | 'GBP' | 'EUR';
  onChangeCurrency: (curr: 'USD' | 'GBP' | 'EUR') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCategory,
  onSelectCategory,
  bookmarkCount,
  onOpenBookmarks,
  onFocusSearch,
  currency,
  onChangeCurrency,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 transition-all shadow-lg shadow-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-18 flex items-center justify-between gap-4">
          {/* Brand Logo - JerseyBird */}
          <div
            onClick={() => onSelectCategory('All')}
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-emerald-400 to-teal-500 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-300/40">
              <Bird className="w-6 h-6 stroke-[2.4]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-2xl tracking-tight text-white font-['Space_Grotesk']">
                  Jersey<span className="text-emerald-400">Bird</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                Kit Prices & Editions Guide
              </p>
            </div>
          </div>

          {/* Main Taskbar Sections: National Jerseys & Premier League Jerseys */}
          <nav className="flex items-center gap-1.5 sm:gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 shadow-inner">
            <button
              onClick={() => onSelectCategory('National Team')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-tight transition-all cursor-pointer ${
                selectedCategory === 'National Team'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Globe className={`w-4 h-4 ${selectedCategory === 'National Team' ? 'text-slate-950' : 'text-emerald-400'}`} />
              <span>National Jerseys</span>
            </button>

            <button
              onClick={() => onSelectCategory('Premier League')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-tight transition-all cursor-pointer ${
                selectedCategory === 'Premier League'
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Shield className={`w-4 h-4 ${selectedCategory === 'Premier League' ? 'text-white' : 'text-purple-400'}`} />
              <span>Premier League Jerseys</span>
            </button>

            <button
              onClick={() => onSelectCategory('All')}
              className={`hidden md:inline-flex px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              All Strips
            </button>
          </nav>

          {/* Right Action Controls: Currency + Quick Search + Saved Kits */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Currency Selector */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-bold">
              {(['USD', 'GBP', 'EUR'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => onChangeCurrency(curr)}
                  className={`px-2 py-1 rounded transition-colors cursor-pointer text-[11px] ${
                    currency === curr
                      ? 'bg-emerald-500 text-slate-950 font-black'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title={`View prices in ${curr}`}
                >
                  {curr === 'USD' ? '$' : curr === 'GBP' ? '£' : '€'}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <button
              onClick={onFocusSearch}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Search clubs, countries and jersey options (Press /)"
            >
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              <span>Search Options</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded border border-slate-700">
                /
              </kbd>
            </button>

            {/* Saved Bookmarks */}
            <button
              onClick={onOpenBookmarks}
              className="relative flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 transition-all cursor-pointer"
              title="Saved Kits"
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarkCount > 0 ? 'fill-emerald-400 text-emerald-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Saved</span>
              {bookmarkCount > 0 && (
                <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {bookmarkCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
