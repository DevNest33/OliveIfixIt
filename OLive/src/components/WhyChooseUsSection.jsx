import React from 'react';
import { WHY_CHOOSE_US } from '../data/repairData';
import { BadgeCheck, ShieldCheck, Zap, DollarSign, ArrowRight } from 'lucide-react';
import { BrandMark } from './BrandLogo';
import experiencedSpecialistsHover from '../assets/why-us/experienced-specialists.jpg';
import premiumPartsHover from '../assets/why-us/premium-parts.jpg';
import quickDiagnosisHover from '../assets/why-us/quick-diagnosis.jpg';
import noHiddenChargesHover from '../assets/why-us/no-hidden-charges.jpg';

const iconMap = {
  BadgeCheck,
  ShieldCheck,
  Zap,
  DollarSign
};

const WHY_HOVER_IMAGES = {
  'Experienced Repair Specialists': {
    src: experiencedSpecialistsHover,
    position: 'object-[32%_58%]',
  },
  'High-Quality Compatible Parts': {
    src: premiumPartsHover,
    position: 'object-[center_48%]',
  },
  'Quick Diagnosis & Repair': {
    src: quickDiagnosisHover,
    position: 'object-[center_52%]',
  },
  'No Hidden Charges': {
    src: noHiddenChargesHover,
    position: 'object-[center_42%]',
  },
};

export default function WhyChooseUsSection({ onOpenBooking }) {
  return (
    <section id="why-us" className="py-20 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-extrabold uppercase tracking-wider border border-brand-gold/20">
            <BrandMark size="sm" />
            Why Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why Olive ifixit is <span className="text-brand-gold">Different</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            We combine factory-level precision equipment with certified master technicians to deliver the fastest, most reliable device repair in the industry.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_CHOOSE_US.map((card, idx) => {
            const Icon = iconMap[card.icon] || BadgeCheck;
            const hoverImage = WHY_HOVER_IMAGES[card.title];
            return (
              <div
                key={idx}
                className="bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group relative overflow-hidden"
              >
                {hoverImage && (
                  <>
                    <img
                      src={hoverImage.src}
                      alt=""
                      aria-hidden="true"
                      className={`absolute inset-0 h-full w-full object-cover ${hoverImage.position} opacity-40 scale-105 transition-all duration-700 ease-out group-hover:opacity-75 group-hover:scale-100 pointer-events-none`}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent pointer-events-none"
                    />
                  </>
                )}

                <div className={`absolute top-0 right-0 w-28 h-28 bg-brand-gold/5 rounded-bl-full pointer-events-none group-hover:bg-brand-gold/10 transition-all ${hoverImage ? 'group-hover:opacity-0' : ''}`} />

                <div className="relative z-10">
                  <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full mb-6">
                    {card.badge}
                  </span>

                  <div className="w-16 h-16 rounded-2xl bg-brand-gold/5 group-hover:bg-brand-gold text-brand-gold group-hover:text-black flex items-center justify-center transition-colors duration-300 shadow-inner">
                    <Icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  </div>

                  <h3 className="text-xl font-extrabold text-white mt-6 group-hover:text-brand-gold transition-colors">
                    {card.title}
                  </h3>

                  <p className={`text-sm mt-3 leading-relaxed transition-colors duration-500 ${
                    hoverImage ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-400'
                  }`}>
                    {card.description}
                  </p>
                </div>

                <div className={`relative z-10 mt-8 pt-4 flex items-center text-xs font-bold text-brand-gold ${hoverImage ? 'border-t border-gray-800 group-hover:border-white/10' : 'border-t border-gray-800'}`}>
                  <span>Guaranteed Standards</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={() => onOpenBooking()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 gold-gradient-btn px-8 py-4 rounded-xl font-bold text-base shadow-gold-glow cursor-pointer touch-manipulation"
          >
            Experience Premium Repair Service
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
