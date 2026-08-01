import React from 'react';
import { Calendar, PhoneCall, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CtaBanner({ onOpenBooking }) {
  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Box */}
        <div className="navy-gradient-bg rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl border border-brand-navy-light/40 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Decorative Background Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-navy-light/30 rounded-full blur-3xl pointer-events-none" />

          {/* Left Content */}
          <div className="space-y-4 text-center lg:text-left relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-extrabold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" /> Express Same-Day Slots Available
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Need Your Phone Fixed <span className="text-brand-orange">Today?</span>
            </h2>

            <p className="text-slate-200 text-base sm:text-lg">
              Don't wait days for official store queues. Get your device fixed in under 30 minutes with our 1-year warranty.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Free Diagnostics
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Zero Hidden Fees
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Walk-Ins Welcome
              </span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full sm:w-auto">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto orange-gradient-btn text-white px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 shadow-orange-glow cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              Book Your Repair
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="tel:18005553494"
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center gap-2.5 transition-colors"
            >
              <PhoneCall className="w-5 h-5 text-brand-orange" />
              Call (800) 555-FIXIT
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
