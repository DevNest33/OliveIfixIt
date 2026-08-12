import React from 'react';
import { Wrench, Mail, MapPin, Clock, ShieldCheck, Heart, Send } from 'lucide-react';

export default function Footer({ onOpenBooking, onOpenTrack }) {
  return (
    <footer className="bg-black text-white pt-16 pb-12 border-t border-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-900">

          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-black flex items-center justify-center text-white shadow-md">
                <Wrench className="w-5 h-5 text-brand-gold" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Fix<span className="text-brand-gold">Craft</span> Pro
              </span>
            </a>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              The premier express repair center for smartphones, tablets, and laptops. Factory-certified engineers, original OEM grade components, and 3-month zero-cost warranty protection.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="gold-gradient-btn px-4 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                Book Online
              </button>

              <button
                onClick={onOpenTrack}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                Track Repair
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Navigation</h4>
            <ul className="space-y-2 text-xs font-semibold text-gray-400">
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">Repair Process</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Customer Reviews</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Services</h4>
            <ul className="space-y-2 text-xs font-semibold text-gray-400">
              <li>Screen Replacement</li>
              <li>Battery Replacement</li>
              <li>Water Damage Recovery</li>
              <li>Charging Port Fix</li>
              <li>Micro-Soldering</li>
              <li>Data Recovery</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Contact & Hours</h4>
            <div className="space-y-2 text-xs text-gray-400 font-semibold">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>support@fixcraftpro.com</span>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white">Mon - Fri: 10:00 AM - 6:30 PM</span>
                  <span className="block text-gray-500">Sun: closed </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} FixCraft Pro Technologies. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-300">Warranty Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
