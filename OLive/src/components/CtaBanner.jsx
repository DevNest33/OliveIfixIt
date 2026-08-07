import React from 'react';
import { Calendar, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CtaBanner({ onOpenBooking }) {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Box */}
        <div className="bg-gradient-to-r from-brand-navy via-slate-900 to-brand-navy rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-slate-800">
          
          {/* Background Decorative Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-navy-light/20 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text */}
          <div className="space-y-3 text-center lg:text-left relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-extrabold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              Fast Turnaround Guaranteed
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Need Your Phone Fixed <span className="text-brand-orange">Today?</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Book your appointment online in under 60 seconds or bring your device straight to our repair lab. Fast, reliable quality repair service!
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-orange" />
                1-Year Guarantee Included
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-400" />
                Free Diagnostic Inspection
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
          </div>

        </div>

      </div>
    </section>
  );
}
