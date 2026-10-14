import React, { useState } from 'react';
import { Bookmark, ArrowRight, Shield, Globe, Tag, Layers, Check, Sparkles } from 'lucide-react';
import { JerseyBlog } from '../data/jerseys';

interface JerseyCardProps {
  jersey: JerseyBlog;
  isBookmarked: boolean;
  onToggleBookmark: (jersey: JerseyBlog) => void;
  onOpenDetails: (jersey: JerseyBlog) => void;
  currency: 'USD' | 'GBP' | 'EUR';
}

export const JerseyCard: React.FC<JerseyCardProps> = ({
  jersey,
  isBookmarked,
  onToggleBookmark,
  onOpenDetails,
  currency,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Format price based on currency
  const formatPrice = (usd: number) => {
    if (currency === 'GBP') return `£${Math.round(usd * 0.82)}`;
    if (currency === 'EUR') return `€${Math.round(usd * 0.94)}`;
    return `$${usd}`;
  };

  const getStockBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Limited Stock':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Sold Out (Collector Value)':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <article className="group relative flex flex-col bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/20 hover:-translate-y-1">
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        {!imageError ? (
          <img
            src={jersey.image}
            alt={jersey.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : null}

        {/* Fallback Graphic */}
        {(!imageLoaded || imageError) && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"
            style={{ borderTop: `4px solid ${jersey.accentColor}` }}
          >
            <Shield
              className="w-12 h-12 mb-2 opacity-80"
              style={{ color: jersey.accentColor }}
            />
            <span className="text-xs uppercase tracking-widest font-black text-slate-300">
              {jersey.team}
            </span>
            <span className="text-[10px] text-slate-400">{jersey.season} Official Jersey</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* League Badge */}
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md shadow-md ${
                jersey.teamType === 'Premier League'
                  ? 'bg-purple-950/90 text-purple-200 border border-purple-500/40'
                  : 'bg-emerald-950/90 text-emerald-200 border border-emerald-500/40'
              }`}
            >
              {jersey.teamType === 'Premier League' ? (
                <Shield className="w-3 h-3 text-purple-300" />
              ) : (
                <Globe className="w-3 h-3 text-emerald-300" />
              )}
              {jersey.teamType}
            </span>

            {/* Season Badge */}
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-md font-['Space_Grotesk']">
              {jersey.season}
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(jersey);
            }}
            aria-label={isBookmarked ? 'Remove saved jersey' : 'Save jersey'}
            className={`p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
              isBookmarked
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/40 ring-1 ring-emerald-300'
                : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-slate-950' : ''}`} />
          </button>
        </div>

        {/* Bottom image overlay: Price Badge & Stock */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-10 text-xs">
          {/* Price Range Pill */}
          <div className="flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-xl border border-emerald-500/30 shadow-md">
            <span className="text-[10px] text-slate-400 uppercase font-medium">From</span>
            <span className="text-sm font-black text-emerald-400 font-['Space_Grotesk']">
              {formatPrice(jersey.priceUSD)}
            </span>
            <span className="text-[10px] text-slate-400">(Replica)</span>
          </div>

          <span
            className={`px-2 py-0.5 rounded-md font-semibold text-[10px] border backdrop-blur-sm ${getStockBadge(
              jersey.inStockStatus
            )}`}
          >
            {jersey.inStockStatus}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Team & Kit Option */}
          <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-1.5">
            <span className="font-semibold text-slate-300">{jersey.team}</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">
              {jersey.kitType} Option
            </span>
          </div>

          {/* Title */}
          <h2
            onClick={() => onOpenDetails(jersey)}
            className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 cursor-pointer mb-2 font-['Cabinet_Grotesk'] tracking-tight"
          >
            {jersey.title}
          </h2>

          {/* Short description */}
          <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
            {jersey.shortDescription}
          </p>

          {/* Available Editions & Sizes Preview */}
          <div className="space-y-1.5 mb-4 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px]">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-emerald-400" />
                <span>Editions:</span>
              </span>
              <span className="text-slate-200 font-medium">
                {jersey.availableOptions.length} available (Pro & Fan)
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1">
                <Tag className="w-3 h-3 text-amber-400" />
                <span>Authentic Match:</span>
              </span>
              <span className="text-amber-300 font-semibold font-['Space_Grotesk']">
                {formatPrice(jersey.priceUSDAuthentic)}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Sizes:</span>
              <span className="text-slate-300 font-mono text-[10px]">
                {jersey.availableSizes.join(', ')}
              </span>
            </div>
          </div>
        </div>

        {/* Footer info: Call to action */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div className="text-[11px] text-slate-400">
            <span className="block font-medium text-slate-300">{jersey.sleeveOptions[0]}</span>
            <span className="text-slate-500">{jersey.badgeOptions.length} badge options</span>
          </div>

          <button
            onClick={() => onOpenDetails(jersey)}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
          >
            <span>Options & Prices</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
