import React from 'react';
import { Tag, Sparkles, CheckCircle2, Flame, Heart, Shirt, Trophy } from 'lucide-react';

interface HeroProps {
  onSelectTag: (tag: string) => void;
  totalKits: number;
  selectedCategory: string;
}

export const Hero: React.FC<HeroProps> = ({ onSelectTag, totalKits, selectedCategory }) => {
  const popularClubsAndNations = [
    { label: 'England 🦁', tag: 'England' },
    { label: 'Arsenal 🔴', tag: 'Arsenal' },
    { label: 'Argentina ⭐⭐⭐', tag: 'Argentina' },
    { label: 'Manchester City 🏆', tag: 'Manchester City' },
    { label: 'Liverpool 🔴', tag: 'Liverpool' },
    { label: 'France 🐓', tag: 'France' },
    { label: 'Nigeria 🦅', tag: 'Nigeria' },
    { label: 'Aston Villa 🦁', tag: 'Aston Villa' },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-10 border-b border-slate-800/80 bg-gradient-to-b from-[#0b1120] via-slate-900/40 to-[#0b1120]">
      {/* Playful Ambient Background Blurs */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[280px] bg-rose-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-1/4 translate-x-1/2 w-[500px] h-[280px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Playful Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/15 via-rose-500/15 to-amber-500/15 border border-orange-500/30 text-amber-300 text-xs font-black mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Official Jersey Prices, Cuts & Match Day Editions</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-['Cabinet_Grotesk'] leading-[1.08] mb-4">
            {selectedCategory === 'National Team' ? (
              <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-300 to-amber-300">
                  National Football Jerseys
                </span>
                <br className="hidden sm:inline" /> Prices & Star Editions
              </>
            ) : selectedCategory === 'Premier League' ? (
              <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300">
                  Premier League Jerseys
                </span>
                <br className="hidden sm:inline" /> Club Prices & Options
              </>
            ) : (
              <>
                Every Jersey, Price & Edition.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-amber-300">
                  All in One Place.
                </span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mb-6">
            Compare real retail prices for official player-issue cuts, stadium replicas, long sleeve
            editions, and tournament sleeve badges.
          </p>

          {/* Playful Stickers Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-3 px-5 rounded-2xl bg-slate-900/80 border border-slate-800 mb-6 text-xs shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-orange-300 font-bold">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span>Authentic Pro vs Replica</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center gap-1.5 text-sky-300 font-bold">
              <Trophy className="w-3.5 h-3.5 text-sky-400" />
              <span>Official Sleeve Patches</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              <span>USD ($), GBP (£), EUR (€)</span>
            </div>
          </div>

          {/* Quick Find Topic Stickers */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 mr-1 font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-400" /> Quick Jump:
            </span>
            {popularClubsAndNations.map((item) => (
              <button
                key={item.tag}
                onClick={() => onSelectTag(item.tag)}
                className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-orange-500/40 transition-all font-semibold cursor-pointer text-xs transform hover:-translate-y-0.5 shadow-sm"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
