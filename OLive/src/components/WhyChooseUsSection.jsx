import React from 'react';
import { WHY_CHOOSE_US } from '../data/repairData';
import { BadgeCheck, ShieldCheck, Zap, DollarSign, ArrowRight } from 'lucide-react';

const iconMap = {
  BadgeCheck,
  ShieldCheck,
  Zap,
  DollarSign
};

export default function WhyChooseUsSection({ onOpenBooking }) {
  return (
    <section id="why-us" className="py-20 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why FixCraft is <span className="text-brand-gold">Different</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            We combine factory-level precision equipment with certified master technicians to deliver the fastest, most reliable device repair in the industry.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_CHOOSE_US.map((card, idx) => {
            const Icon = iconMap[card.icon] || BadgeCheck;
            return (
              <div
                key={idx}
                className="bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-brand-gold/5 rounded-bl-full pointer-events-none group-hover:bg-brand-gold/10 transition-colors" />

                <div>
                  <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full mb-6">
                    {card.badge}
                  </span>

                  <div className="w-16 h-16 rounded-2xl bg-brand-gold/5 group-hover:bg-brand-gold text-brand-gold group-hover:text-black flex items-center justify-center transition-colors duration-300 shadow-inner">
                    <Icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  </div>

                  <h3 className="text-xl font-extrabold text-white mt-6 group-hover:text-brand-gold transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-800 flex items-center text-xs font-bold text-brand-gold">
                  <span>Guaranteed Standards</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={() => onOpenBooking()}
            className="inline-flex items-center gap-3 gold-gradient-btn px-8 py-4 rounded-xl font-bold text-base shadow-gold-glow cursor-pointer"
          >
            Experience Premium Repair Service
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
