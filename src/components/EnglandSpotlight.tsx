import React, { useState } from 'react';
import { ArrowRight, Shield, Flame, Trophy, Camera } from 'lucide-react';

interface EnglandSpotlightProps {
  onSelectEnglandKit: (teamName: string) => void;
  currency: 'USD' | 'GBP' | 'EUR';
}

export const EnglandSpotlight: React.FC<EnglandSpotlightProps> = ({
  onSelectEnglandKit,
  currency,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<number>(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  const formatPrice = (usd: number) => {
    if (currency === 'GBP') return `£${Math.round(usd * 0.82)}`;
    if (currency === 'EUR') return `€${Math.round(usd * 0.94)}`;
    return `$${usd}`;
  };

  const englandPhotos = [
    {
      url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=480&h=320&q=55&fm=webp',
      alt: 'England National Football Team players on pitch in white 2024 home shirts with Three Lions crest',
      caption: 'Three Lions Match Day at Wembley Stadium',
      tag: 'Euro 2024 White Kit',
    },
    {
      url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=480&h=320&q=55&fm=webp',
      alt: 'England National Team players celebrating under tournament floodlights in team shirts',
      caption: 'Squad Goal Celebration Under Tournament Floodlights',
      tag: 'Match Action',
    },
  ];

  return (
    <section aria-labelledby="england-spotlight-heading" className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border-2 border-indigo-500/30 shadow-2xl p-6 sm:p-8 mb-10 transition-all hover:border-indigo-400/50">
      {/* Background decorative glows */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left: England Team Info in Q&A Format for SEO */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 text-red-300 border border-red-500/30 text-xs font-bold tracking-wide">
              <span>🦁</span> Three Lions Special Feature
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold">
              <Trophy className="w-3.5 h-3.5" /> Euro 2024 Finalists
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/15 text-sky-300 border border-blue-500/30 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-orange-400" /> Star Squad Strips
            </span>
          </div>

          {/* H2 in Question format for SEO snippet optimization */}
          <h2
            id="england-spotlight-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-['Cabinet_Grotesk'] tracking-tight leading-tight"
          >
            What Are the Official England National Team Jersey Options and Prices?
          </h2>

          {/* Paragraph in direct Answer format */}
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
            Official England National Team football jerseys are available in two primary editions:
            the Stadium Supporter Replica starting at {formatPrice(100)} and the Authentic Pro Match
            Vapor edition priced at {formatPrice(160)}. Both editions feature the iconic Three Lions
            crest, with optional UEFA Euro tournament sleeve badges and official star player printing
            for Jude Bellingham, Harry Kane, and Bukayo Saka.
          </p>

          {/* Star player print options */}
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

          {/* Pricing & Call to Action with explicit descriptive anchor text */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Replicas from:</span>
              <span className="text-lg font-black text-amber-300 font-['Space_Grotesk']">
                {formatPrice(100)}
              </span>
              <span className="text-xs text-slate-500">• Pro Match: {formatPrice(160)}</span>
            </div>

            <a
              href="/national-jerseys"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onSelectEnglandKit('England');
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 hover:from-red-400 hover:to-amber-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore England National Team Jerseys</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right: Featured England National Team Photos - small size, explicit alt text, multiple viewable pictures */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-indigo-400/30 shadow-2xl bg-slate-950 group">
            {!imageError[selectedPhoto] ? (
              <img
                src={englandPhotos[selectedPhoto].url}
                alt={englandPhotos[selectedPhoto].alt}
                loading="lazy"
                onError={() => setImageError((prev) => ({ ...prev, [selectedPhoto]: true }))}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-950 via-slate-900 to-red-950 text-center">
                <Shield className="w-16 h-16 text-red-500 mb-2" />
                <span className="text-sm font-black text-white font-['Cabinet_Grotesk']">
                  England National Football Team
                </span>
                <span className="text-xs text-slate-300">Official Three Lions Euro 2024 Strips</span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-md">
              <Shield className="w-3.5 h-3.5 text-red-400" />
              <span>The Three Lions</span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div>
                <span className="block text-white font-black text-sm font-['Cabinet_Grotesk']">
                  {englandPhotos[selectedPhoto].caption}
                </span>
                <span className="text-[11px] text-slate-300">
                  Wembley Stadium • European Championship Campaign
                </span>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow">
                {englandPhotos[selectedPhoto].tag}
              </div>
            </div>
          </div>

          {/* Photo Switcher Thumbnails so users can see multiple authentic England pictures */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Camera className="w-3 h-3 text-amber-400" />
              <span>England Photos:</span>
            </span>
            {englandPhotos.map((photo, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPhoto(idx)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedPhoto === idx
                    ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                <span>Photo {idx + 1}</span>
                <span className="text-[10px] opacity-75">({photo.tag})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
