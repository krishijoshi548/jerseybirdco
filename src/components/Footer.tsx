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
    <footer className="border-t border-slate-900 bg-slate-950 pt-12 pb-10 mt-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Bird className="w-5 h-5" />
              </div>
              <span className="font-black text-xl text-white font-['Space_Grotesk']">
                Jersey<span className="text-emerald-400">Bird</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The premier information hub for football jersey prices, player-issue authentic cuts,
              stadium fan replicas, and custom badge options across Premier League clubs and National
              teams.
            </p>
          </div>

          {/* Quick Categories Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-['Space_Grotesk']">
              Jersey Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('National Team')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  National Team Strips & Prices
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Premier League')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Premier League Club Jerseys & Options
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('All')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  All Strips Archive
                </button>
              </li>
            </ul>
          </div>

          {/* Price Drops Newsletter */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-['Space_Grotesk']">
              Price Drop Alerts
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Get notified when official authentic or replica football jerseys go on seasonal sale.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscribed to JerseyBird Price Alerts!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for price drops..."
                    required
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  Get Price Alerts
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Legal notice */}
        <div className="pt-6 border-t border-slate-900 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} JerseyBird. Football jersey pricing and options reference.</p>
          <div className="flex items-center gap-4">
            <span>National Jerseys</span>
            <span>•</span>
            <span>Premier League Jerseys</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
