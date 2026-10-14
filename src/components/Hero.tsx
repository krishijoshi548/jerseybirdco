import React from 'react';
import { Tag, Sparkles, CheckCircle, ShieldCheck, DollarSign } from 'lucide-react';

interface HeroProps {
  onSelectTag: (tag: string) => void;
  totalKits: number;
  selectedCategory: string;
}

export const Hero: React.FC<HeroProps> = ({ onSelectTag, totalKits, selectedCategory }) => {
  const popularClubsAndNations = [
    'Arsenal',
    'Argentina',
    'England',
    'Manchester City',
    'Liverpool',
    'France',
    'Nigeria',
    'Aston Villa',
  ];

  return (
    <section className="relative overflow-hidden pt-7 pb-8 border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4 shadow-sm">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official Price Guide, Editions & Jersey Options</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-['Cabinet_Grotesk'] leading-[1.1] mb-4">
            {selectedCategory === 'National Team' ? (
              <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                  National Football Jerseys
                </span>
                : Editions & Price Guide
              </>
            ) : selectedCategory === 'Premier League' ? (
              <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
                  Premier League Jerseys
                </span>
                : Editions & Price Guide
              </>
            ) : (
              <>
                Discover Jersey Prices,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                  Editions & Options
                </span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl mb-5">
            Your comprehensive reference for authentic player issues, fan replicas, long sleeve
            versions, and sleeve badges for Premier League clubs and National teams.
          </p>

          {/* Value Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-2.5 px-4 rounded-xl bg-slate-900/60 border border-slate-800 mb-5 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Authentic vs Replica Breakdown</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official Sleeve Badge Pricing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              <span>USD ($), GBP (£) & EUR (€)</span>
            </div>
          </div>

          {/* Quick Find Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            <span className="text-slate-400 mr-1 font-medium">Quick find:</span>
            {popularClubsAndNations.map((item) => (
              <button
                key={item}
                onClick={() => onSelectTag(item)}
                className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-800 transition-colors cursor-pointer text-xs"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
