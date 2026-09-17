import React from 'react';
import { TRUST_METRICS } from '../data/repairData';
import { Wrench, Star, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import appleLogo from '../assets/brands/apple.png';
import samsungLogo from '../assets/brands/samsung.png';
import hpLogo from '../assets/brands/hp.png';
import dellLogo from '../assets/brands/dell.png';
import lenovoLogo from '../assets/brands/lenovo.png';
import sonyLogo from '../assets/brands/sony.png';

const iconMap = {
  Wrench,
  Star,
  Clock,
  ShieldCheck
};

const brandLogos = [
  { name: 'Apple', src: appleLogo, imgClass: 'h-8' },
  { name: 'Samsung', src: samsungLogo, imgClass: 'h-6' },
  { name: 'HP', src: hpLogo, imgClass: 'h-9' },
  { name: 'Dell', src: dellLogo, imgClass: 'h-6' },
  { name: 'Lenovo', src: lenovoLogo, imgClass: 'h-7 scale-[1.65]' },
  { name: 'Sony', src: sonyLogo, imgClass: 'h-7 scale-[1.55]' },
];

export default function TrustSection() {
  return (
    <section className="py-12 bg-brand-bg text-white relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TRUST_METRICS.map((metric, idx) => {
            const IconComponent = iconMap[metric.icon] || Wrench;
            return (
              <div
                key={idx}
                className="bg-black p-6 rounded-2xl border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 group-hover:bg-brand-gold text-brand-gold group-hover:text-black flex items-center justify-center transition-colors duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    Verified
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-brand-gold transition-colors">
                  {metric.value}
                </div>

                <div className="text-sm font-bold text-gray-200 mt-1">
                  {metric.label}
                </div>

                <div className="text-xs text-gray-400 mt-1 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  {metric.suffix}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">
              Brand Compatibility
            </h4>
            <p className="text-sm font-semibold text-gray-300 mt-0.5">
              Certified repairs for all major global hardware manufacturers
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {brandLogos.map((brand) => (
              <div
                key={brand.name}
                className="h-12 w-[92px] sm:w-24 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center px-3 overflow-hidden hover:bg-white/[0.08] hover:border-white/20 transition-colors"
              >
                <img
                  src={brand.src}
                  alt={`${brand.name} logo`}
                  className={`w-auto max-w-full object-contain ${brand.imgClass}`}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
