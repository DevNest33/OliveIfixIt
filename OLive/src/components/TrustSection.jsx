import React from 'react';
import { TRUST_METRICS } from '../data/repairData';
import { Wrench, Star, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

const iconMap = {
  Wrench,
  Star,
  Clock,
  ShieldCheck
};

export default function TrustSection() {
  const brandLogos = [
    { name: 'Apple iPhone & Mac', label: 'Apple Authorized Spec' },
    { name: 'Samsung Galaxy', label: 'Samsung OEM Standard' },
    { name: 'Google Pixel', label: 'Google Pixel Certified' },
    { name: 'Dell & XPS', label: 'Dell Laptop Specialist' },
    { name: 'Lenovo ThinkPad', label: 'Lenovo Service Ready' },
    { name: 'Microsoft Surface', label: 'Surface Repair Qualified' },
  ];

  return (
    <section className="py-12 bg-black text-white relative overflow-hidden">

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
            {brandLogos.map((brand, bIdx) => (
              <div
                key={bIdx}
                className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                {brand.name}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
