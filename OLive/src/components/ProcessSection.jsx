import React from 'react';
import { REPAIR_PROCESS_STEPS } from '../data/repairData';
import { Calendar, MapPin, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';
import { BrandMark } from './BrandLogo';
import bookAppointmentHover from '../assets/process/book-appointment.jpg';
import bringOrSendHover from '../assets/process/bring-or-send.jpg';
import precisionRepairHover from '../assets/process/precision-repair.jpg';

const iconMap = {
  Calendar,
  MapPin,
  Wrench,
  CheckCircle2
};

const PROCESS_HOVER_IMAGES = {
  'Book Appointment': {
    src: bookAppointmentHover,
    position: 'object-[center_48%]',
  },
  'Bring or Send Device': {
    src: bringOrSendHover,
    position: 'object-[center_46%]',
  },
  'Precision Repair': {
    src: precisionRepairHover,
    position: 'object-[center_52%]',
  },
};

export default function ProcessSection({ onOpenBooking }) {
  return (
    <section id="process" className="py-20 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-extrabold uppercase tracking-wider border border-brand-gold/20">
            <BrandMark size="sm" />
            Our Process
          </div>
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
            const hoverImage = PROCESS_HOVER_IMAGES[step.title];
            return (
              <div
                key={idx}
                className="bg-gray-900 rounded-3xl p-6 border border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 relative z-10 flex flex-col justify-between group hover:-translate-y-2 overflow-hidden"
              >
                {hoverImage && (
                  <>
                    <img
                      src={hoverImage.src}
                      alt=""
                      aria-hidden="true"
                      className={`absolute inset-0 h-full w-full object-cover ${hoverImage.position} opacity-0 scale-110 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100 pointer-events-none`}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/25 opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none"
                    />
                  </>
                )}

                <div className="relative z-10">
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
                  <p className={`text-sm mt-2 leading-relaxed transition-colors duration-500 ${
                    hoverImage ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-400'
                  }`}>
                    {step.desc}
                  </p>
                </div>

                <div className={`relative z-10 mt-6 pt-4 flex items-center justify-between ${hoverImage ? 'border-t border-gray-800 group-hover:border-white/10' : 'border-t border-gray-800'}`}>
                  <span className={`text-xs font-semibold ${hoverImage ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-500'}`}>Duration:</span>
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
            className="w-full sm:w-auto gold-gradient-btn text-white px-8 py-4 rounded-xl font-bold text-base shadow-gold-glow inline-flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
          >
            Start Step 1: Book Appointment
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
