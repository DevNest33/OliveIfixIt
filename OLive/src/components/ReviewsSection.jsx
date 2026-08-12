import React from 'react';
import { CUSTOMER_REVIEWS } from '../data/repairData';
import { Star, CheckCircle, Quote, ThumbsUp, Sparkles } from 'lucide-react';

export default function ReviewsSection() {
  const filters = [
    { id: 'all', label: 'All Reviews (4.9★)' },
  ];

  const filteredReviews = CUSTOMER_REVIEWS;

  return (
    <section id="reviews" className="py-20 bg-black text-white relative overflow-hidden">
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-extrabold uppercase tracking-wider border border-brand-gold/20">
            <Sparkles className="w-3.5 h-3.5" />
            Verified Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Loved By <span className="text-brand-gold">Thousands</span> Of Device Owners
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            See what real customers say about our fast turnarounds, transparent pricing, and master craftsmanship.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.id}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-gold text-black shadow-lg cursor-pointer"
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel-dark p-8 rounded-3xl border border-brand-gold/15 hover:border-brand-gold/40 transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1 shadow-2xl"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/10 group-hover:text-brand-gold/20 transition-colors" />

              <div>
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

                <p className="text-gray-300 text-sm sm:text-base mt-5 leading-relaxed font-normal italic">
                  "{rev.review}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-gold"
                  />
                  <div>
                    <h4 className="text-sm font-extrabold text-white">{rev.name}</h4>
                    <p className="text-xs text-gray-400">{rev.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-bold text-brand-gold bg-brand-gold/15 px-2.5 py-1 rounded-lg block">
                    {rev.device}
                  </span>
                  <span className="text-[10px] text-gray-400 mt-1 block">{rev.service}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gray-900 border border-gray-800 text-xs font-bold text-gray-400">
            <ThumbsUp className="w-4 h-4 text-emerald-400" />
            <span>Over <strong>1,800+ 5-Star Reviews</strong> on Google, Trustpilot & Yelp</span>
          </div>
        </div>

      </div>
    </section>
  );
}
