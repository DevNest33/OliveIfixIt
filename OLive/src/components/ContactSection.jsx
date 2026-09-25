import React from 'react';
import { MapPin, Clock, Navigation, Landmark, Phone, MessageCircle } from 'lucide-react';
import { BrandMark } from './BrandLogo';
import {
  STORE,
  STORE_MAP_EMBED_URL,
  STORE_DIRECTIONS_URL,
  getWhatsAppUrl,
} from '../data/contactConfig';

function InfoRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-brand-gold flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">{label}</p>
        <div className="text-sm sm:text-base font-semibold text-gray-200 mt-1">{children}</div>
      </div>
    </div>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-brand-bg text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-extrabold uppercase tracking-wider border border-brand-gold/20">
            <BrandMark size="sm" />
            Visit Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Find Our <span className="text-brand-gold">Repair Centre</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Walk in for a free diagnosis, or get directions straight to our Banjara Hills store.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-6">

          <div className="bg-gray-900 rounded-3xl border border-gray-800 p-6 sm:p-8 flex flex-col">
            <p className="text-xs uppercase font-bold tracking-[0.2em] text-brand-gold">Repair Centre</p>

            <div className="mt-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">{STORE.name}</h3>
                <address className="not-italic text-sm sm:text-base text-gray-400 mt-2 leading-relaxed">
                  {STORE.addressLines.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </address>
              </div>
            </div>

            <div className="my-7 border-t border-white/10" />

            <div className="space-y-6">
              <InfoRow icon={Clock} label="Working Hours">
                {STORE.hours}
                <span className="block text-xs text-gray-500 font-medium mt-0.5">{STORE.closed}</span>
              </InfoRow>
              <InfoRow icon={Landmark} label="Landmark">
                {STORE.landmark}
              </InfoRow>
              <InfoRow icon={Phone} label="Phone">
                <a href={STORE.phoneHref} className="hover:text-brand-gold transition-colors">
                  {STORE.phoneDisplay}
                </a>
              </InfoRow>
            </div>

            <div className="mt-auto pt-8 grid sm:grid-cols-3 gap-3">
              <a
                href={STORE.phoneHref}
                className="py-3 rounded-xl border border-white/10 hover:border-brand-gold/50 text-sm font-bold text-gray-200 flex items-center justify-center gap-2 transition-colors touch-manipulation"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                Call Store
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 rounded-xl border border-white/10 hover:border-brand-gold/50 text-sm font-bold text-gray-200 flex items-center justify-center gap-2 transition-colors touch-manipulation"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                WhatsApp
              </a>
              <a
                href={STORE_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-gradient-btn py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 touch-manipulation"
              >
                <Navigation className="w-4 h-4" />
                Directions
              </a>
            </div>
          </div>

          <div className="relative rounded-3xl border border-gray-800 overflow-hidden min-h-[380px] lg:min-h-0 bg-gray-900">
            <iframe
              title="OliveCare repair centre on Google Maps"
              src={STORE_MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0 [filter:invert(90%)_hue-rotate(180deg)_brightness(0.95)_contrast(0.9)]"
            />

            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 border border-white/10 text-[11px] font-bold uppercase tracking-widest text-gray-200 pointer-events-none">
              <span className="relative flex h-2 w-2">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Live Location
            </div>

            <a
              href={STORE_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-[4.5rem] left-4 gold-gradient-btn px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap flex items-center gap-2 shadow-lg touch-manipulation"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
