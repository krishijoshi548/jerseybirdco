import React, { useEffect, useState } from 'react';
import {
  X,
  Bookmark,
  Share2,
  Check,
  Shield,
  Globe,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  Tag,
  DollarSign,
  Shirt,
  ShoppingBag,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { JerseyBlog, JerseyOption } from '../data/jerseys';

interface JerseyModalProps {
  jersey: JerseyBlog | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (jersey: JerseyBlog) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  hasPrev: boolean;
  hasNext: boolean;
  currency: 'USD' | 'GBP' | 'EUR';
}

export const JerseyModal: React.FC<JerseyModalProps> = ({
  jersey,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onNavigate,
  hasPrev,
  hasNext,
  currency,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedEditionIndex, setSelectedEditionIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedSleeve, setSelectedSleeve] = useState<string>('Short Sleeve');
  const [selectedBadgeIndex, setSelectedBadgeIndex] = useState<number>(0);

  // Reset local state when jersey changes
  useEffect(() => {
    setSelectedEditionIndex(0);
    setSelectedSize('M');
    setSelectedBadgeIndex(0);
    if (jersey && jersey.sleeveOptions.length > 0) {
      setSelectedSleeve(jersey.sleeveOptions[0]);
    }
  }, [jersey]);

  // Keyboard navigation & escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate('prev');
      if (e.key === 'ArrowRight' && hasNext) onNavigate('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigate, hasPrev, hasNext]);

  // Lock body scroll
  useEffect(() => {
    if (jersey) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [jersey]);

  if (!jersey) return null;

  const currentEdition: JerseyOption =
    jersey.availableOptions[selectedEditionIndex] || jersey.availableOptions[0];

  const formatPrice = (usd: number, gbp: number, eur: number) => {
    if (currency === 'GBP') return `£${gbp}`;
    if (currency === 'EUR') return `€${eur}`;
    return `$${usd}`;
  };

  const badgeAddon = jersey.badgeOptions[selectedBadgeIndex]?.priceUSD || 0;
  const sleeveAddon = selectedSleeve.includes('Long Sleeve') ? 10 : 0;
  const calculatedTotalUSD = currentEdition.priceUSD + badgeAddon + sleeveAddon;
  const calculatedTotalFormatted =
    currency === 'GBP'
      ? `£${Math.round(calculatedTotalUSD * 0.82)}`
      : currency === 'EUR'
      ? `€${Math.round(calculatedTotalUSD * 0.94)}`
      : `$${calculatedTotalUSD}`;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden my-auto z-10 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/90 shrink-0">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                jersey.teamType === 'Premier League'
                  ? 'bg-purple-950 text-purple-300 border border-purple-500/30'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              {jersey.teamType === 'Premier League' ? (
                <Shield className="w-3 h-3 text-purple-400" />
              ) : (
                <Globe className="w-3 h-3 text-emerald-400" />
              )}
              {jersey.teamType}
            </span>
            <span className="text-xs font-bold text-amber-300 px-2 py-0.5 rounded-full bg-slate-900 border border-amber-500/30">
              Season {jersey.season}
            </span>
            <span className="text-xs font-semibold text-slate-300 px-2 py-0.5 rounded-full bg-slate-800">
              {jersey.kitType} Kit
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next navigation */}
            <div className="hidden sm:flex items-center gap-1 mr-2 border-r border-slate-800 pr-3">
              <button
                onClick={() => onNavigate('prev')}
                disabled={!hasPrev}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                title="Previous jersey"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('next')}
                disabled={!hasNext}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                title="Next jersey"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(jersey)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-slate-950' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              title="Copy link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Title & Banner */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-slate-400">
              <span className="font-bold text-white text-sm">{jersey.team}</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">{jersey.kitType} Kit Option</span>
              <span>•</span>
              <span className="text-slate-300">Status: {jersey.inStockStatus}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white font-['Cabinet_Grotesk'] tracking-tight mb-4 leading-tight">
              {jersey.title}
            </h1>

            {/* Image Preview */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl mb-6">
              <img
                src={jersey.image}
                alt={jersey.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between flex-wrap gap-2">
                <div className="bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-emerald-500/30 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Starting Price</span>
                    <span className="text-base font-black text-emerald-400 font-['Space_Grotesk']">
                      {formatPrice(jersey.priceUSD, Math.round(jersey.priceUSD * 0.82), Math.round(jersey.priceUSD * 0.94))}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 flex items-center gap-1.5 text-xs text-slate-300">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>{jersey.availableOptions.length} Editions Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Editions Interactive Selector */}
          <div className="bg-slate-950/90 rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Select Edition & Compare Prices
              </h2>
              <span className="text-xs text-slate-400">
                Currency: <strong className="text-white">{currency}</strong>
              </span>
            </div>

            {/* Edition Cards Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {jersey.availableOptions.map((opt, idx) => {
                const isSelected = selectedEditionIndex === idx;
                return (
                  <button
                    key={opt.edition}
                    onClick={() => setSelectedEditionIndex(idx)}
                    className={`p-3.5 rounded-xl text-left transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950/50 border-emerald-500 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-900 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                        {opt.edition}
                      </span>
                      <span className="text-sm font-black text-emerald-400 font-['Space_Grotesk']">
                        {formatPrice(opt.priceUSD, opt.priceGBP, opt.priceEUR)}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{opt.features}</p>
                  </button>
                );
              })}
            </div>

            {/* Customization Options: Sleeve, Badges, Sizing */}
            <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Size Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {jersey.availableSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-emerald-500 text-slate-950 shadow-sm'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sleeve Options */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Sleeve Option
                </label>
                <div className="space-y-1.5">
                  {jersey.sleeveOptions.map((slv) => (
                    <button
                      key={slv}
                      onClick={() => setSelectedSleeve(slv)}
                      className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-semibold transition-colors cursor-pointer ${
                        selectedSleeve === slv
                          ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {slv}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sleeve Badges Add-on */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Tournament / League Badge
                </label>
                <select
                  value={selectedBadgeIndex}
                  onChange={(e) => setSelectedBadgeIndex(Number(e.target.value))}
                  className="w-full px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-medium focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  {jersey.badgeOptions.map((b, i) => (
                    <option key={b.name} value={i}>
                      {b.name} {b.priceUSD > 0 ? `(+$${b.priceUSD})` : '(Free)'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Estimated Total Price Calculator */}
            <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center justify-between flex-wrap gap-2">
              <div className="text-xs text-slate-300">
                <span>Selected Configuration: </span>
                <strong className="text-white">{currentEdition.edition}</strong> •{' '}
                <span className="text-slate-400">Size {selectedSize}</span> •{' '}
                <span className="text-slate-400">{selectedSleeve}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Estimated Total:</span>
                <span className="text-lg font-black text-emerald-400 font-['Space_Grotesk']">
                  {calculatedTotalFormatted}
                </span>
              </div>
            </div>
          </div>

          {/* Retailer Availability & Price Comparison */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
              Where To Buy & Verified Retailer Pricing
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {jersey.retailers.map((ret) => (
                <div
                  key={ret.name}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-semibold text-slate-200 block">{ret.name}</span>
                    <span className="text-[11px] text-emerald-400 font-bold">
                      {ret.estimatedPrice}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                      ret.inStock
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-rose-500/10 text-rose-400'
                    }`}
                  >
                    {ret.inStock ? 'Available' : 'Check Reruns'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Design Story & Historical Context */}
          <div className="space-y-3 pt-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-['Cabinet_Grotesk']">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Design Story & Club/National Heritage
            </h3>
            <p className="text-slate-200 leading-relaxed text-sm">{jersey.shortDescription}</p>
            <p className="text-slate-300 leading-relaxed text-sm">{jersey.designStory}</p>
          </div>

          {/* Key Tailoring & Tech Details */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Key Details & Features
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {jersey.keyDetails.map((detail, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">
            Category: <strong className="text-white">{jersey.teamType}</strong> • {jersey.season}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
