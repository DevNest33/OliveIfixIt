import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ShieldCheck, Zap, Award, Star, CheckCircle, ArrowRight, Smartphone, Laptop, Sparkles, Wrench } from 'lucide-react';
import screwdriverImg from '../assets/screwdriver.png';

export default function HeroSection({ onOpenBooking }) {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Background Subtle Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-brand-navy/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Hero Content Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy/5 border border-brand-navy/10 text-brand-navy text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
              #1 Express Mobile & Electronics Repair
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Broken screen? <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-navy via-brand-navy-light to-brand-orange bg-clip-text text-transparent inline-flex items-center gap-0.5">
                Just if<img src={screwdriverImg} alt="screwdriver icon" className="inline-block w-5 h-12 object-contain align-middle   translate-y-1" />xit
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Screen replacements, battery replacements, water damage recovery, charging issues and more for smartphones, tablets & laptops.
            </p>

            {/* Hero CTA Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto orange-gradient-btn text-white px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 group shadow-orange-glow cursor-pointer"
              >
                <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Book Repair
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Micro-Badges below CTAs */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-semibold">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span><strong className="text-slate-900">4.9/5</strong> (1,800+ Reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-brand-orange" />
                <span><strong className="text-slate-900">Express</strong> Turnaround</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-navy" />
                <span><strong className="text-slate-900">3 Months</strong> Warranty</span>
              </div>
            </div>

          </div>

          {/* Right Side 3D Graphic Mockup & Floating Glass Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Visual Container Frame */}
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">

              {/* Glowing Background Radial */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/20 to-brand-orange/20 rounded-full blur-2xl transform scale-90" />

              {/* Tech Illustration Canvas - Smartphone & Laptop SVG Visual */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                <div className="w-full h-full rounded-3xl glass-panel p-6 shadow-2xl relative flex flex-col justify-between overflow-hidden border border-white/60">

                  {/* Top Bar inside Card Illustration */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-400" />
                      <span className="w-3 h-3 rounded-full bg-amber-400" />
                      <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <div className="text-[11px] font-mono font-semibold text-brand-navy bg-brand-navy/8 px-2.5 py-1 rounded-md">
                      DIAGNOSTIC STATUS: ACTIVE
                    </div>
                  </div>

                  {/* Center Device Visual Graphic */}
                  <div className="my-auto relative flex items-center justify-center py-6">
                    {/* Laptop Illustration */}
                    <div className="w-64 h-36 bg-slate-900 rounded-xl p-2 shadow-2xl border border-slate-700 relative">
                      <div className="w-full h-full bg-gradient-to-br from-brand-navy to-slate-900 rounded-lg p-3 flex flex-col justify-between text-white">
                        <div className="flex items-center justify-between">
                          <Laptop className="w-5 h-5 text-brand-orange" />
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">CALIBRATING</span>
                        </div>
                        <div className="space-y-1.5">
                          <div className="w-3/4 h-1.5 bg-white/20 rounded" />
                          <div className="w-1/2 h-1.5 bg-brand-orange/60 rounded" />
                        </div>
                      </div>
                      <div className="absolute -bottom-2 -left-4 -right-4 h-2.5 bg-slate-400 rounded-b-lg border-t border-slate-500" />
                    </div>

                    {/* Smartphone Overlapping Graphic */}
                    <div className="absolute -right-2 -bottom-2 w-28 h-52 bg-slate-900 rounded-2xl p-1.5 shadow-2xl border-2 border-slate-700 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                      <div className="w-full h-full bg-slate-800 rounded-xl overflow-hidden relative flex flex-col justify-between p-2">
                        {/* Notch */}
                        <div className="w-10 h-2 bg-slate-900 rounded-full mx-auto" ></div>

                        <div className="text-center my-auto space-y-1">
                          <Wrench className="w-8 h-8 text-brand-orange mx-auto animate-bounce" />
                          <p className="text-[10px] font-bold text-white">OLED Express</p>
                          <p className="text-[9px] text-emerald-400 font-mono">100% Genuine</p>
                        </div>

                        <div className="w-full bg-brand-orange/20 border border-brand-orange/40 rounded-lg py-1 text-center">
                          <span className="text-[9px] font-bold text-brand-orange">PARTS VERIFIED</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Scan Indicator */}
                  <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1 text-emerald-600 font-bold">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Free Diagnostic Clean
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">iFix-Engineers v4.9</span>
                  </div>

                </div>
              </div>

              {/* Floating Glass Card 1: Same Day Repair */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -left-4 sm:-left-8 z-20 glass-card px-4 py-3 rounded-2xl flex items-center gap-3 shadow-xl bg-white/90 border border-white"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-extrabold text-slate-900">Same Day Repair</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Fast Turnaround</p>
                  
                </div>
              </motion.div>

              {/* Floating Glass Card 2: Certified Technicians */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/2 -right-4 sm:-right-8 z-20 glass-card px-4 py-3 rounded-2xl flex items-center gap-3 shadow-xl bg-white/90 border border-white"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center font-bold">
                  <Award className="w-5 h-5 text-brand-navy" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-brand-navy" />
                    <span className="text-sm font-extrabold text-slate-900">Certified Techs</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Apple & Samsung Master</p>
                </div>
              </motion.div>

              {/* Floating Glass Card 3: Warranty Included */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 left-6 z-20 glass-card px-4 py-3 rounded-2xl flex items-center gap-3 shadow-xl bg-white/90 border border-white"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-orange/15 text-brand-orange flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-brand-orange" />
                    <span className="text-sm font-extrabold text-slate-900">3-Month Warranty</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Zero Cost Protection</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
