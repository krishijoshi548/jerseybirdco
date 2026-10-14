import React, { useState } from 'react';
import { Bookmark, ArrowRight, Shield, Globe, Tag, Layers, Check, Sparkles, Flame } from 'lucide-react';
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
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Limited Stock':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Sold Out (Collector Value)':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
    }
  };

  return (
    <article className="group relative flex flex-col bg-slate-900/90 hover:bg-[#141d33] border border-slate-800 hover:border-orange-500/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/15 hover:-translate-y-1.5">
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        {!imageError ? (
          <img
            src={jersey.image}
            alt={jersey.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : null}

        {/* Fallback Graphic */}
        {(!imageLoaded || imageError) && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900"
            style={{ borderTop: `4px solid ${jersey.accentColor}` }}
          >
            <Shield
              className="w-12 h-12 mb-2 opacity-80"
              style={{ color: jersey.accentColor }}
            />
            <span className="text-xs uppercase tracking-widest font-black text-slate-200">
              {jersey.team}
            </span>
            <span className="text-[10px] text-slate-400">{jersey.season} Official Jersey</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* League Sticker Badge */}
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full backdrop-blur-md shadow-md ${
                jersey.teamType === 'Premier League'
                  ? 'bg-indigo-950/90 text-indigo-200 border border-indigo-400/40'
                  : 'bg-rose-950/90 text-rose-200 border border-rose-400/40'
              }`}
            >
              {jersey.teamType === 'Premier League' ? (
                <Shield className="w-3 h-3 text-indigo-300" />
              ) : (
                <Globe className="w-3 h-3 text-rose-300" />
              )}
              {jersey.teamType}
            </span>

            {/* Season Badge */}
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-950/90 text-amber-300 border border-amber-400/30 backdrop-blur-md font-['Space_Grotesk']">
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
                ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/40 scale-105'
                : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-slate-950' : ''}`} />
          </button>
        </div>

        {/* Bottom image overlay: Price Badge & Stock */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-10 text-xs">
          {/* Price Pill */}
          <div className="flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-xl border border-orange-500/40 shadow-lg">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">From</span>
            <span className="text-sm font-black text-amber-300 font-['Space_Grotesk']">
              {formatPrice(jersey.priceUSD)}
            </span>
            <span className="text-[10px] text-slate-400">(Replica)</span>
          </div>

          <span
            className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border backdrop-blur-sm ${getStockBadge(
              jersey.inStockStatus
            )}`}
          >
            {jersey.inStockStatus}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Team & Kit Option */}
          <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-2">
            <span className="font-bold text-slate-200">{jersey.team}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-300 border border-orange-500/30 text-[10px] font-black uppercase">
              {jersey.kitType} Kit
            </span>
          </div>

          {/* Title */}
          <h2
            onClick={() => onOpenDetails(jersey)}
            className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors line-clamp-2 cursor-pointer mb-2 font-['Cabinet_Grotesk'] tracking-tight"
          >
            {jersey.title}
          </h2>

          {/* Short description */}
          <p className="text-xs text-slate-300 line-clamp-2 mb-3.5 leading-relaxed">
            {jersey.shortDescription}
          </p>

          {/* Available Editions & Sizing Preview */}
          <div className="space-y-1.5 mb-4 p-3 rounded-2xl bg-[#0b1120]/80 border border-slate-800 text-[11px]">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 font-medium text-slate-400">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                <span>Editions:</span>
              </span>
              <span className="text-white font-bold">
                {jersey.availableOptions.length} available (Pro & Fan)
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 font-medium text-slate-400">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span>Pro Match Cut:</span>
              </span>
              <span className="text-amber-300 font-black font-['Space_Grotesk']">
                {formatPrice(jersey.priceUSDAuthentic)}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800/60">
              <span className="font-medium">Sizes:</span>
              <span className="text-slate-200 font-mono text-[10px] font-bold">
                {jersey.availableSizes.join(' • ')}
              </span>
            </div>
          </div>
        </div>

        {/* Footer info: Call to action */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
          <div className="text-[11px] text-slate-400">
            <span className="block font-semibold text-slate-300">{jersey.sleeveOptions[0]}</span>
            <span className="text-slate-500">{jersey.badgeOptions.length} badge options</span>
          </div>

          <button
            onClick={() => onOpenDetails(jersey)}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 transition-all cursor-pointer shadow-md shadow-orange-500/20 transform hover:-translate-y-0.5"
          >
            <span>Options & Prices</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
