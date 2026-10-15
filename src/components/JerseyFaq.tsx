import React from 'react';
import { HelpCircle, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export const JerseyFaq: React.FC = () => {
  const faqs = [
    {
      question: 'What Is the Difference Between Authentic Player Issue and Stadium Replica Jerseys?',
      answer:
        'Authentic player-issue football jerseys feature lightweight 4D moisture-mapped fabric, laser-cut ventilation, athletic slim contouring, and heat-pressed silicone federation badges designed for professional pitch performance. In contrast, stadium replica jerseys feature standard relaxed street-fit sizing and embroidered woven crests engineered for everyday supporter durability and regular washing.',
    },
    {
      question: 'Why Are Premier League and National Football Team Jerseys Priced Differently?',
      answer:
        'Premier League and national team football jersey prices vary due to official federation licensing fees, technical garment innovations (such as Dri-FIT ADV, HEAT.RDY, and ULTRAWEAVE), and custom tournament sleeve badges. Standard fan replicas generally retail between $85 and $110, whereas authentic pro match cuts range between $130 and $180 due to limited production runs and elite player-spec materials.',
    },
    {
      question: 'How Do You Choose Between Short Sleeve and Long Sleeve Football Jerseys?',
      answer:
        'Short sleeve football jerseys provide maximum breathability and thermal regulation for match play and casual summer wear. Long sleeve editions feature full-length sleeves with elasticated ribbed cuffs and vintage silhouette appeal. Long sleeve cuts typically carry a modest $10 to $15 price premium over standard short sleeve versions.',
    },
    {
      question: 'How Do Official Tournament Sleeve Badges and Player Names Affect Jersey Prices?',
      answer:
        'Official competition sleeve patches—including the Premier League Gold Champions badge or UEFA Euro tournament starball—typically add $12 to $18 to the jersey base price. Official customized player name and number printing (such as Bellingham 10, Kane 9, or Saka 7) adds an additional $18 to $25 in authentic league-approved vinyl font sets.',
    },
    {
      question: 'Where Can Supporters Find Verified Prices and Options on Football Shirts?',
      answer:
        'Supporters can compare real-time pricing and verify stock availability across licensed football apparel distributors including official club direct stores, national FA boutiques, Fanatics, Kitbag, and Pro:Direct Soccer. JerseyBird provides a centralized price guide with direct links to verified stockists.',
    },
  ];

  return (
    <section aria-labelledby="faq-section-heading" className="my-14 rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>SEO Football Kit Knowledge Guide</span>
        </div>
        <h2 id="faq-section-heading" className="text-2xl sm:text-3xl font-black text-white font-['Cabinet_Grotesk'] tracking-tight">
          Frequently Asked Questions About Football Jersey Prices & Editions
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
          Comprehensive answers to common questions about authentic player cuts, stadium replica fits,
          sleeve badge options, and official retail pricing.
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <article
            key={index}
            className="p-5 rounded-2xl bg-[#0b1120] border border-slate-800/80 hover:border-orange-500/30 transition-all space-y-2"
          >
            {/* H2 in direct Question format for SEO snippet capture */}
            <h2 className="text-base sm:text-lg font-bold text-white font-['Cabinet_Grotesk'] flex items-start gap-2">
              <span className="text-orange-400 font-mono text-sm mt-0.5 shrink-0">
                0{index + 1}.
              </span>
              <span>{faq.question}</span>
            </h2>

            {/* Paragraph in direct Answer format */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
              {faq.answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
