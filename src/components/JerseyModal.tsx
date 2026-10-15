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
  Trophy,
  HelpCircle,
  ExternalLink,
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
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setSelectedEditionIndex(0);
    setSelectedSize('M');
    setSelectedBadgeIndex(0);
    setImageError(false);
    if (jersey && jersey.sleeveOptions.length > 0) {
      setSelectedSleeve(jersey.sleeveOptions[0]);
    }
  }, [jersey]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate('prev');
      if (e.key === 'ArrowRight' && hasNext) onNavigate('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigate, hasPrev, hasNext]);

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
        className="fixed inset-0 bg-[#070c18]/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-slate-900 border-2 border-slate-700/80 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden my-auto z-10 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0b1120] shrink-0">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 text-xs font-black px-3 py-1 rounded-full ${
                jersey.teamType === 'Premier League'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}
            >
              {jersey.teamType === 'Premier League' ? (
                <Shield className="w-3 h-3 text-indigo-400" />
              ) : (
                <Globe className="w-3 h-3 text-rose-400" />
              )}
              {jersey.teamType}
            </span>
            <span className="text-xs font-bold text-amber-300 px-2.5 py-1 rounded-full bg-slate-800 border border-amber-500/30">
              Season {jersey.season}
            </span>
            <span className="text-xs font-black text-orange-400 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
              {jersey.kitType} Kit
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next navigation */}
            <div className="hidden sm:flex items-center gap-1 mr-2 border-r border-slate-800 pr-3">
              <button
                onClick={() => onNavigate('prev')}
                disabled={!hasPrev}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                title="Previous jersey"
                aria-label="Previous jersey"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('next')}
                disabled={!hasNext}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                title="Next jersey"
                aria-label="Next jersey"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(jersey)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
              aria-label={isBookmarked ? 'Remove saved jersey' : 'Save jersey'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-slate-950' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              title="Copy link"
              aria-label="Share article link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition-colors cursor-pointer"
              title="Close modal"
              aria-label="Close modal dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Title & Banner */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-slate-400">
              <span className="font-black text-white text-base">{jersey.team}</span>
              <span>•</span>
              <span className="text-orange-400 font-bold">{jersey.kitType} Kit Option</span>
              <span>•</span>
              <span className="text-slate-300 font-medium">Availability: {jersey.inStockStatus}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white font-['Cabinet_Grotesk'] tracking-tight mb-4 leading-tight">
              {jersey.title}
            </h1>

            {/* Image Preview with small size & descriptive alt text */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-2xl mb-6">
              {!imageError ? (
                <img
                  src={jersey.image}
                  alt={jersey.altText}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : null}

              {/* Fallback Graphic ensuring picture is always clearly seen */}
              {imageError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-center">
                  <Shield className="w-16 h-16 mb-2" style={{ color: jersey.accentColor }} />
                  <span className="text-lg font-black text-white font-['Cabinet_Grotesk']">
                    {jersey.team} {jersey.kitType} Shirt
                  </span>
                  <span className="text-xs text-slate-300">Season {jersey.season} Official Match Kit</span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-transparent opacity-85" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between flex-wrap gap-2">
                <div className="bg-[#0b1120]/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-orange-500/40 flex items-center gap-2.5 shadow-xl">
                  <Tag className="w-4 h-4 text-orange-400" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Starting Price</span>
                    <span className="text-lg font-black text-amber-300 font-['Space_Grotesk']">
                      {formatPrice(jersey.priceUSD, Math.round(jersey.priceUSD * 0.82), Math.round(jersey.priceUSD * 0.94))}
                    </span>
                  </div>
                </div>

                <div className="bg-[#0b1120]/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700 flex items-center gap-1.5 text-xs text-slate-200 font-bold shadow-xl">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  <span>{jersey.availableOptions.length} Editions Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: H2 in Question & Answer Format */}
          <div className="bg-[#0b1120]/90 rounded-3xl p-5 sm:p-6 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-wider text-orange-400 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                How Much Does Each Edition of the {jersey.team} Jersey Cost?
              </h2>
              <span className="text-xs text-slate-300 font-bold">
                Currency: <strong className="text-amber-300">{currency}</strong>
              </span>
            </div>

            {/* Answer paragraph */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Standard stadium supporter replicas for the {jersey.team} retail starting at{' '}
              <strong className="text-amber-300 font-bold">{formatPrice(jersey.priceUSD, Math.round(jersey.priceUSD * 0.82), Math.round(jersey.priceUSD * 0.94))}</strong>,
              while authentic match pro player cuts are priced at{' '}
              <strong className="text-amber-300 font-bold">{formatPrice(jersey.priceUSDAuthentic, Math.round(jersey.priceUSDAuthentic * 0.82), Math.round(jersey.priceUSDAuthentic * 0.94))}</strong>.
              Select an edition below to compare specs and calculate your custom total.
            </p>

            {/* Edition Cards Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {jersey.availableOptions.map((opt, idx) => {
                const isSelected = selectedEditionIndex === idx;
                return (
                  <button
                    key={opt.edition}
                    onClick={() => setSelectedEditionIndex(idx)}
                    className={`p-4 rounded-2xl text-left transition-all border-2 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-br from-orange-500/15 to-amber-500/10 border-orange-500 shadow-lg shadow-orange-500/10'
                        : 'bg-slate-900/90 hover:bg-slate-800/90 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-xs font-black ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                        {opt.edition}
                      </span>
                      <span className="text-base font-black text-amber-300 font-['Space_Grotesk']">
                        {formatPrice(opt.priceUSD, opt.priceGBP, opt.priceEUR)}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{opt.features}</p>
                  </button>
                );
              })}
            </div>

            {/* Customization Options: Sleeve, Badges, Sizing */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Size Selector */}
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {jersey.availableSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 shadow-md'
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
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">
                  Sleeve Style
                </label>
                <div className="space-y-1.5">
                  {jersey.sleeveOptions.map((slv) => (
                    <button
                      key={slv}
                      onClick={() => setSelectedSleeve(slv)}
                      className={`w-full px-3 py-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                        selectedSleeve === slv
                          ? 'bg-orange-500/20 border border-orange-500 text-orange-300 font-black'
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
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">
                  Tournament / League Badge
                </label>
                <select
                  value={selectedBadgeIndex}
                  onChange={(e) => setSelectedBadgeIndex(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-bold focus:ring-1 focus:ring-orange-500 cursor-pointer"
                >
                  {jersey.badgeOptions.map((b, i) => (
                    <option key={b.name} value={i}>
                      {b.name} {b.priceUSD > 0 ? `(+$${b.priceUSD})` : '(Included)'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Estimated Total Price Calculator */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-orange-500/40 flex items-center justify-between flex-wrap gap-2 shadow-lg">
              <div className="text-xs text-slate-300">
                <span>Selected Configuration: </span>
                <strong className="text-white font-bold">{currentEdition.edition}</strong> •{' '}
                <span className="text-amber-300 font-bold">Size {selectedSize}</span> •{' '}
                <span className="text-slate-300">{selectedSleeve}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Estimated Total:</span>
                <span className="text-xl font-black text-amber-300 font-['Space_Grotesk']">
                  {calculatedTotalFormatted}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: H2 in Question & Answer format for where to buy */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-orange-400" />
              Where Can You Buy Verified Official {jersey.team} Jerseys?
            </h2>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Official stock availability and estimated price ranges for this {jersey.team} kit are
              verified across leading licensed football retailers below.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {jersey.retailers.map((ret) => (
                <div
                  key={ret.name}
                  className="p-3.5 rounded-2xl bg-[#0b1120] border border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-200 block">{ret.name}</span>
                    <span className="text-xs text-amber-300 font-black font-['Space_Grotesk']">
                      {ret.estimatedPrice}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${
                      ret.inStock
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {ret.inStock ? 'Available' : 'Check Reruns'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: H2 in Question & Answer format for Design Story */}
          <div className="space-y-3 pt-2">
            <h2 className="text-base font-black text-white flex items-center gap-2 font-['Cabinet_Grotesk']">
              <Trophy className="w-4 h-4 text-amber-400" />
              What Is the Cultural Design Story and Heritage Behind This Shirt?
            </h2>
            <p className="text-slate-200 leading-relaxed text-sm">{jersey.shortDescription}</p>

            {/* Embedded Article Photo */}
            {jersey.articleImage && (
              <figure className="my-4 rounded-2xl overflow-hidden border border-slate-700/80 bg-[#070c18] shadow-2xl">
                <img
                  src={jersey.articleImage}
                  alt={jersey.articleImageAlt || jersey.altText}
                  className="w-full h-56 sm:h-72 object-cover object-center"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = jersey.image;
                  }}
                />
                <figcaption className="px-4 py-2.5 text-xs text-slate-300 bg-slate-950/95 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2">
                  <span className="font-medium text-slate-200">
                    {jersey.articleImageCaption || `Official ${jersey.team} match kit action photo`}
                  </span>
                  {jersey.articleSourceUrl && (
                    <a
                      href={jersey.articleSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-orange-400 hover:text-orange-300 underline font-medium inline-flex items-center gap-1 transition-colors"
                    >
                      <span>View source article photo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </figcaption>
              </figure>
            )}

            <p className="text-slate-300 leading-relaxed text-sm">{jersey.designStory}</p>
          </div>

          {/* Section 4: H2 in Question & Answer format for Key Details */}
          <div className="p-4 rounded-2xl bg-[#0b1120] border border-slate-800 space-y-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-300">
              What Key Technical Features and Match Tailoring Details Are Included?
            </h2>
            <p className="text-xs text-slate-400 mb-2">
              Engineered with {jersey.fabricTech} and crafted with a {jersey.collarStyle.toLowerCase()}.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {jersey.keyDetails.map((detail, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 mt-0.5 shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#0b1120] border-t border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">
            Category: <strong className="text-white">{jersey.teamType}</strong> • {jersey.season}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 transition-all cursor-pointer shadow-md shadow-orange-500/20"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
