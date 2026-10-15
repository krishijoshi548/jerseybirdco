import React, { useState } from 'react';
import { Bird, Mail, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="border-t border-slate-800 bg-[#070c18] pt-14 pb-12 mt-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info with semantic home anchor link */}
          <div className="md:col-span-2 space-y-3">
            <a
              href="/all-jerseys"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onSelectCategory('All');
                }
              }}
              className="inline-flex items-center gap-2.5 group"
              title="JerseyBird Football Kits Home"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md group-hover:scale-105 transition-transform">
                <Bird className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-black text-2xl text-white font-['Cabinet_Grotesk']">
                Jersey<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Bird</span>
              </span>
            </a>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The definitive football kit guide for authentic player issues, stadium fan replicas,
              and official tournament badge pricing for Premier League clubs and National teams.
            </p>
            <div className="pt-2 text-slate-400 flex items-center gap-1.5 text-xs">
              <span>Crafted for true football kit enthusiasts</span>
              <span>⚽</span>
            </div>
          </div>

          {/* Quick Categories Navigation with explicit anchor text for every link */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-3 font-['Space_Grotesk']">
              Jersey Classifications
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="/national-jerseys"
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey) {
                      e.preventDefault();
                      onSelectCategory('National Team');
                    }
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left font-medium block"
                >
                  🦁 Explore National Team Football Jerseys & Prices
                </a>
              </li>
              <li>
                <a
                  href="/premier-league-jerseys"
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey) {
                      e.preventDefault();
                      onSelectCategory('Premier League');
                    }
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left font-medium block"
                >
                  🏆 Explore Premier League Club Jerseys & Options
                </a>
              </li>
              <li>
                <a
                  href="/all-jerseys"
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey) {
                      e.preventDefault();
                      onSelectCategory('All');
                    }
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left font-medium block"
                >
                  ⚡ Browse All Football Strips & Editions
                </a>
              </li>
            </ul>
          </div>

          {/* Price Drops Newsletter */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-3 font-['Space_Grotesk']">
              Kit Alerts Dispatch
            </h3>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Get notified when official authentic match or replica football jerseys drop in price.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Subscribed to JerseyBird Alerts!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email for alerts..."
                    required
                    aria-label="Email address for price drop alerts"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-xs transition-colors cursor-pointer shadow-md shadow-orange-500/20"
                >
                  Get Kit Alerts
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Legal notice with semantic anchor links */}
        <div className="pt-6 border-t border-slate-900 text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} JerseyBird. Football jersey pricing and options reference.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="/national-jerseys" className="hover:text-amber-300 transition-colors">
              National Jerseys
            </a>
            <span>•</span>
            <a href="/premier-league-jerseys" className="hover:text-amber-300 transition-colors">
              Premier League Jerseys
            </a>
            <span>•</span>
            <a href="/all-jerseys" className="hover:text-amber-300 transition-colors">
              All Football Kits
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
