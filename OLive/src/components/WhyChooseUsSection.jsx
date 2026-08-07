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
    <section id="why-us" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy/10 text-brand-navy text-xs font-extrabold uppercase tracking-wider">
            Unmatched Standards
          </div> */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why FixCraft is <span className="text-brand-navy">Different</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            We combine factory-level precision equipment with certified master technicians to deliver the fastest, most reliable device repair in the industry.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_CHOOSE_US.map((card, idx) => {
            const Icon = iconMap[card.icon] || BadgeCheck;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Background Corner Glow */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-brand-navy/5 rounded-bl-full pointer-events-none group-hover:bg-brand-orange/10 transition-colors" />

                <div>
                  {/* Badge */}
                  <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-brand-navy bg-brand-navy/8 px-3 py-1 rounded-full mb-6">
                    {card.badge}
                  </span>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-brand-navy/5 group-hover:bg-brand-navy text-brand-navy group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-inner">
                    <Icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-slate-900 mt-6 group-hover:text-brand-navy transition-colors">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Highlight */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-brand-orange">
                  <span>Guaranteed Standards</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Highlight Box */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onOpenBooking()}
            className="inline-flex items-center gap-3 orange-gradient-btn text-white px-8 py-4 rounded-xl font-bold text-base shadow-orange-glow cursor-pointer"
          >
            Experience Premium Repair Service
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
