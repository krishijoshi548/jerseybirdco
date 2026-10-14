import React from 'react';
import { ArrowRight, Sparkles, Shield, Heart, Star, Flame, Trophy } from 'lucide-react';
import { JerseyBlog } from '../data/jerseys';

interface EnglandSpotlightProps {
  onSelectEnglandKit: (teamName: string) => void;
  currency: 'USD' | 'GBP' | 'EUR';
}

export const EnglandSpotlight: React.FC<EnglandSpotlightProps> = ({
  onSelectEnglandKit,
  currency,
}) => {
  const formatPrice = (usd: number) => {
    if (currency === 'GBP') return `£${Math.round(usd * 0.82)}`;
    if (currency === 'EUR') return `€${Math.round(usd * 0.94)}`;
    return `$${usd}`;
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border-2 border-indigo-500/30 shadow-2xl p-6 sm:p-8 mb-10 transition-all hover:border-indigo-400/50">
      {/* Playful background decorative glows */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left: England Team Info & Fun Badges */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 text-red-300 border border-red-500/30 text-xs font-bold tracking-wide">
              <span>🦁</span> Three Lions Special Feature
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold">
              <Trophy className="w-3.5 h-3.5" /> Euro 2024 Finalists
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/15 text-sky-300 border border-blue-500/30 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-orange-400" /> Most Searched Squad
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-['Cabinet_Grotesk'] tracking-tight leading-tight">
            England National Team{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-sky-300">
              Official Kits & Strips
            </span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
            From the classic pure white Wembley home strip to the bold Renaissance deep-raisin away
            edition worn by Jude Bellingham, Harry Kane, and Bukayo Saka. Compare authentic match
            pro-cut pricing against fan replica options.
          </p>

          {/* Quick squad player tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-300">
            <span className="text-slate-400 font-medium">Star Print Options:</span>
            {['Bellingham #10', 'Kane #9', 'Saka #7', 'Foden #11', 'Palmer #20'].map((player) => (
              <span
                key={player}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-white font-mono font-medium border border-slate-700/70 transition-colors"
              >
                {player}
              </span>
            ))}
          </div>

          {/* Pricing & Call to Action */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Replicas from:</span>
              <span className="text-lg font-black text-amber-300 font-['Space_Grotesk']">
                {formatPrice(100)}
              </span>
              <span className="text-xs text-slate-500">• Pro Match: {formatPrice(160)}</span>
            </div>

            <button
              onClick={() => onSelectEnglandKit('England')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 hover:from-red-400 hover:to-amber-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore England Jerseys</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Featured England National Team Photo */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-indigo-400/30 shadow-2xl bg-slate-950 group">
            <img
              src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80"
              alt="England National Football Team on the pitch"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

            {/* Sticker Pill on top of photo */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-md">
              <Shield className="w-3.5 h-3.5 text-red-400" />
              <span>The Three Lions</span>
            </div>

            {/* Bottom Photo Caption */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div>
                <span className="block text-white font-black text-sm font-['Cabinet_Grotesk']">
                  England National Football Team
                </span>
                <span className="text-[11px] text-slate-300">
                  Wembley Stadium • European Championship Campaign
                </span>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow">
                Featured
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
