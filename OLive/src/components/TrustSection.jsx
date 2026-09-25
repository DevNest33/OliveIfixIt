import React from 'react';
import { TRUST_METRICS } from '../data/repairData';
import { Wrench, Star, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
const iconMap = {
  Wrench,
  Star,
  Clock,
  ShieldCheck
};

const logoFiles = import.meta.glob('../assets/brands/*.png', { eager: true, import: 'default' });
const logo = (file) => logoFiles[`../assets/brands/${file}.png`];

// Heights balance the logos visually: wide wordmarks sit shorter than square marks.
const WORDMARK = 'h-4 sm:h-5';
const MEDIUM = 'h-6 sm:h-7';
const SQUARE = 'h-7 sm:h-8';

const brandGroups = [
  {
    label: 'Phones & Tablets',
    brands: [
      { name: 'Apple', file: 'apple', size: SQUARE },
      { name: 'Samsung', file: 'samsung', size: 'h-3.5 sm:h-4' },
      { name: 'Google', file: 'google', size: SQUARE },
      { name: 'Android', file: 'android', size: MEDIUM },
      { name: 'Motorola', file: 'motorola', size: SQUARE },
      { name: 'Xiaomi / Redmi', file: 'xiaomi', size: SQUARE },
      { name: 'OnePlus', file: 'oneplus', size: SQUARE },
      { name: 'Oppo', file: 'oppo', size: WORDMARK },
      { name: 'Vivo', file: 'vivo', size: WORDMARK },
      { name: 'Huawei', file: 'huawei', size: MEDIUM },
      { name: 'Nokia', file: 'nokia', size: WORDMARK },
      { name: 'LG', file: 'lg', size: MEDIUM },
      { name: 'HTC', file: 'htc', size: WORDMARK },
      { name: 'BlackBerry', file: 'blackberry', size: MEDIUM },
    ],
  },
  {
    label: 'Laptops & PCs',
    brands: [
      { name: 'HP', file: 'hp', size: SQUARE },
      { name: 'Dell', file: 'dell', size: SQUARE },
      { name: 'Lenovo', file: 'lenovo', size: WORDMARK },
      { name: 'Acer', file: 'acer', size: WORDMARK },
      { name: 'Asus', file: 'asus', size: WORDMARK },
      { name: 'MSI', file: 'msi', size: SQUARE },
      { name: 'Republic of Gamers', file: 'republicofgamers', size: MEDIUM },
      { name: 'BenQ', file: 'benq', size: WORDMARK },
      { name: 'Nvidia', file: 'nvidia', size: MEDIUM },
      { name: 'AMD', file: 'amd', size: WORDMARK },
      { name: 'Linux', file: 'linux', size: SQUARE },
    ],
  },
  {
    label: 'Consoles',
    brands: [
      { name: 'Sony', file: 'sony', size: 'h-3.5 sm:h-4' },
      { name: 'PlayStation', file: 'playstation', size: MEDIUM },
      { name: 'Xbox', file: 'xbox', size: SQUARE },
      { name: 'Nintendo', file: 'nintendo', size: WORDMARK },
    ],
  },
];

export default function TrustSection({ onOpenWarranty }) {
  return (
    <section className="py-12 bg-brand-bg text-white relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TRUST_METRICS.map((metric, idx) => {
            const IconComponent = iconMap[metric.icon] || Wrench;
            const isWarranty = metric.label === 'Warranty Covered';
            const cardClass = isWarranty
              ? 'bg-black p-6 rounded-2xl border border-brand-gold/10 hover:border-brand-gold/50 hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:outline-none text-left w-full'
              : 'bg-black p-6 rounded-2xl border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-300 transform hover:-translate-y-1 group';

            const card = (
              <>
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
              </>
            );

            if (isWarranty) {
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={onOpenWarranty}
                  aria-label="Open warranty application"
                  className={cardClass}
                >
                  {card}
                </button>
              );
            }

            return (
              <div key={idx} className={cardClass}>
                {card}
              </div>
            );
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="text-center">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">
              Brand Compatibility
            </h4>
            <p className="text-sm font-semibold text-gray-300 mt-0.5">
              Certified repairs for all major global hardware manufacturers
            </p>
          </div>

          <div className="mt-8 space-y-8">
            {brandGroups.map((group) => (
              <div key={group.label}>
                <p className="text-center text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-4">
                  {group.label}
                </p>
                <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12">
                  {group.brands.map((brand) => (
                    <li key={brand.name} className="flex items-center">
                      <img
                        src={logo(brand.file)}
                        alt={`${brand.name} logo`}
                        title={brand.name}
                        loading="lazy"
                        className={`w-auto object-contain transition-transform hover:scale-110 ${brand.size}`}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
