import React from 'react';
import { Bookmark, Search, Globe, Shield, Bird, Sparkles } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-[#0b1120]/90 backdrop-blur-md border-b border-slate-800/80 transition-all shadow-xl shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between gap-4">
          {/* Playful Brand Logo - JerseyBird */}
          <div
            onClick={() => onSelectCategory('All')}
            className="flex items-center gap-3 cursor-pointer select-none shrink-0 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-500 via-rose-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-orange-500/30 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
              <Bird className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-2xl tracking-tight text-white font-['Cabinet_Grotesk']">
                  Jersey<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400">Bird</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500/15 text-orange-400 border border-orange-500/30">
                  ⚽ Kits Hub
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Premier League & National Team Jerseys
              </p>
            </div>
          </div>

          {/* Main Taskbar Sections: National Jerseys & Premier League Jerseys */}
          <nav className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800/90 shadow-inner">
            <button
              onClick={() => onSelectCategory('National Team')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black tracking-tight transition-all cursor-pointer ${
                selectedCategory === 'National Team'
                  ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/25 scale-[1.02]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Globe className={`w-4 h-4 ${selectedCategory === 'National Team' ? 'text-white' : 'text-rose-400'}`} />
              <span>National Jerseys</span>
            </button>

            <button
              onClick={() => onSelectCategory('Premier League')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black tracking-tight transition-all cursor-pointer ${
                selectedCategory === 'Premier League'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 scale-[1.02]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Shield className={`w-4 h-4 ${selectedCategory === 'Premier League' ? 'text-white' : 'text-indigo-400'}`} />
              <span>Premier League Jerseys</span>
            </button>

            <button
              onClick={() => onSelectCategory('All')}
              className={`hidden md:inline-flex px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-slate-800 text-amber-300'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              All Kits
            </button>
          </nav>

          {/* Right Action Controls: Currency + Quick Search + Saved Kits */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Currency Selector */}
            <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 text-xs font-bold shadow-inner">
              {(['USD', 'GBP', 'EUR'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => onChangeCurrency(curr)}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer text-xs font-black ${
                    currency === curr
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title={`View prices in ${curr}`}
                >
                  {curr === 'USD' ? '$ USD' : curr === 'GBP' ? '£ GBP' : '€ EUR'}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <button
              onClick={onFocusSearch}
              className="hidden lg:flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors cursor-pointer"
              title="Search clubs, countries and jersey options"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded-md border border-slate-700">
                /
              </kbd>
            </button>

            {/* Saved Bookmarks */}
            <button
              onClick={onOpenBookmarks}
              className="relative flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer shadow"
              title="Saved Jerseys"
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarkCount > 0 ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Saved</span>
              {bookmarkCount > 0 && (
                <span className="bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full shadow">
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
