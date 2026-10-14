import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, DollarSign, Sparkles } from 'lucide-react';
import { JerseyBlog } from '../data/jerseys';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedJerseys: JerseyBlog[];
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
  onSelectJersey: (jersey: JerseyBlog) => void;
  currency: 'USD' | 'GBP' | 'EUR';
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedJerseys,
  onRemoveBookmark,
  onClearAll,
  onSelectJersey,
  currency,
}) => {
  if (!isOpen) return null;

  const formatPrice = (usd: number) => {
    if (currency === 'GBP') return `£${Math.round(usd * 0.82)}`;
    if (currency === 'EUR') return `€${Math.round(usd * 0.94)}`;
    return `$${usd}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#070c18]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l-2 border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 bg-[#0b1120] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black shadow-md">
                <Bookmark className="w-4 h-4 fill-slate-950" />
              </div>
              <div>
                <h2 className="text-base font-black text-white font-['Cabinet_Grotesk']">
                  Saved Jerseys
                </h2>
                <span className="text-xs text-slate-400">
                  {bookmarkedJerseys.length} saved for price tracking
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {bookmarkedJerseys.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 text-xs transition-colors cursor-pointer"
                  title="Clear all saved jerseys"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {bookmarkedJerseys.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center mb-4 text-amber-400/60 border border-slate-700">
                  <Bookmark className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-slate-200 mb-1">
                  No Saved Jerseys Yet
                </h3>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  Bookmark any club or national jersey to track pricing, editions, and available options.
                </p>
              </div>
            ) : (
              bookmarkedJerseys.map((jersey) => (
                <div
                  key={jersey.id}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#0b1120] border border-slate-800 hover:border-orange-500/40 transition-all group shadow-sm"
                >
                  <img
                    src={jersey.image}
                    alt={jersey.title}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-900 shrink-0 border border-slate-800"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-0.5">
                      <span className="text-amber-300 font-black font-['Space_Grotesk']">
                        From {formatPrice(jersey.priceUSD)}
                      </span>
                      <span>•</span>
                      <span>{jersey.season}</span>
                    </div>
                    <h4
                      onClick={() => {
                        onSelectJersey(jersey);
                        onClose();
                      }}
                      className="text-xs font-black text-white group-hover:text-amber-300 transition-colors truncate cursor-pointer font-['Cabinet_Grotesk']"
                    >
                      {jersey.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 block truncate">
                      {jersey.team} ({jersey.kitType})
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => onRemoveBookmark(jersey.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onSelectJersey(jersey);
                        onClose();
                      }}
                      className="text-[11px] font-black text-orange-400 hover:text-amber-300 flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Options</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
