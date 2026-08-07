import React, { useState } from 'react';
import { CUSTOMER_REVIEWS } from '../data/repairData';
import { Star, CheckCircle, Quote, ThumbsUp, Sparkles } from 'lucide-react';

export default function ReviewsSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Reviews (4.9★)' },
    { id: 'screen', label: 'Screen Repairs' },
    { id: 'laptop', label: 'MacBook & Laptops' },
  ];

  const filteredReviews = CUSTOMER_REVIEWS.filter((rev) => {
    if (activeFilter === 'screen') return rev.service.includes('Screen');
    if (activeFilter === 'laptop') return rev.device.includes('MacBook') || rev.device.includes('Laptop');
    return true;
  });

  return (
    <section id="reviews" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-navy-light/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-brand-orange text-xs font-extrabold uppercase tracking-wider border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            Verified Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Loved By <span className="text-brand-orange">Thousands</span> Of Device Owners
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            See what real customers say about our fast turnarounds, transparent pricing, and master craftsmanship.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-brand-orange text-white shadow-lg'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Testimonials Cards Grid */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel-dark p-8 rounded-3xl border border-white/15 hover:border-brand-orange/40 transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1 shadow-2xl"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/10 group-hover:text-brand-orange/20 transition-colors" />

              <div>
                {/* Star Rating & Verified Pill */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified Customer
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-slate-200 text-sm sm:text-base mt-5 leading-relaxed font-normal italic">
                  "{rev.review}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-orange"
                  />
                  <div>
                    <h4 className="text-sm font-extrabold text-white">{rev.name}</h4>
                    <p className="text-xs text-slate-400">{rev.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-bold text-brand-orange bg-brand-orange/15 px-2.5 py-1 rounded-lg block">
                    {rev.device}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 block">{rev.service}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Aggregate Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-slate-300">
            <ThumbsUp className="w-4 h-4 text-emerald-400" />
            <span>Over <strong>1,800+ 5-Star Reviews</strong> on Google, Trustpilot & Yelp</span>
          </div>
        </div>

      </div>
    </section>
  );
}
