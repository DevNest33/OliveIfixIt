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
    <section id="process" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-extrabold uppercase tracking-wider">
            Seamless & Simple
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            How The Repair <span className="text-brand-orange">Process Works</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            From booking your slot to receiving your fully tested device, experience our transparent 4-step workflow.
          </p>
        </div>

        {/* Timeline Grid (4 Steps) */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-navy/20 via-brand-orange/40 to-brand-navy/20 -translate-y-8 z-0" />

          {REPAIR_PROCESS_STEPS.map((step, idx) => {
            const Icon = iconMap[step.icon] || Calendar;
            return (
              <div 
                key={idx}
                className="bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 relative z-10 flex flex-col justify-between group hover:-translate-y-2"
              >
                <div>
                  {/* Step Header Badge & Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 group-hover:bg-brand-navy group-hover:border-brand-navy text-brand-navy group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-extrabold text-slate-300 group-hover:text-brand-orange transition-colors">
                      {step.step}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-navy transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Duration Pill */}
                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Duration:</span>
                  <span className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-full">
                    {step.timeEst}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onOpenBooking()}
            className="orange-gradient-btn text-white px-8 py-4 rounded-xl font-bold text-base shadow-orange-glow inline-flex items-center gap-2 cursor-pointer"
          >
            Start Step 1: Book Appointment
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
