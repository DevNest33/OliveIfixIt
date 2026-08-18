import React from 'react';
import { Calendar, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CtaBanner({ onOpenBooking }) {
  return (
    <section className="py-16 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-gradient-to-r from-brand-black via-brand-black-lighter to-brand-black rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-brand-gold/20">

          <div className="space-y-3 text-center lg:text-left relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-extrabold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              Fast Turnaround Guaranteed 
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Need Your Phone Fixed <span className="text-brand-gold">Today?</span>
            </h2>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Book your appointment online in under 60 seconds or bring your device straight to our repair lab. Fast, reliable quality repair service!
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-gray-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                3 months Guarantee Included
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-400" />
                Free Diagnostic Inspection
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full sm:w-auto">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto gold-gradient-btn px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 shadow-gold-glow cursor-pointer"
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
