import React from 'react';
import { REPAIR_PROCESS_STEPS } from '../data/repairData';
import { Calendar, MapPin, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';

const iconMap = {
  Calendar,
  MapPin,
  Wrench,
  CheckCircle2
};

export default function ProcessSection({ onOpenBooking }) {
  return (
    <section id="process" className="py-20 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How The Repair <span className="text-brand-gold">Process Works</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            From booking your slot to receiving your fully tested device, experience our transparent 4-step workflow.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">

          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-gold/20 via-brand-gold/40 to-brand-gold/20 -translate-y-8 z-0" />

          {REPAIR_PROCESS_STEPS.map((step, idx) => {
            const Icon = iconMap[step.icon] || Calendar;
            return (
              <div
                key={idx}
                className="bg-gray-900 rounded-3xl p-6 border border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 relative z-10 flex flex-col justify-between group hover:-translate-y-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-black border border-gray-700 group-hover:bg-brand-gold group-hover:border-brand-gold text-brand-gold group-hover:text-black flex items-center justify-center transition-colors duration-300 shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-extrabold text-gray-700 group-hover:text-brand-gold transition-colors">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">Duration:</span>
                  <span className="text-xs font-bold text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-full">
                    {step.timeEst}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={() => onOpenBooking()}
            className="gold-gradient-btn text-white px-8 py-4 rounded-xl font-bold text-base shadow-gold-glow inline-flex items-center gap-2 cursor-pointer"
          >
            Start Step 1: Book Appointment
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
