import React, { useEffect, useRef } from 'react';
import { REPAIR_ISSUES } from '../data/repairData';
import {
  Smartphone, BatteryCharging, Zap, Droplets, Camera, Volume2, Cpu, Database,
  ArrowRight, Clock, ShieldCheck, Check
} from 'lucide-react';
import { BrandMark } from './BrandLogo';
import crackedScreenVideo from '../assets/services/videos/cracked-screen.mp4';
import batteryReplacementVideo from '../assets/services/videos/battery-replacement.mp4';
import chargingPortVideo from '../assets/services/videos/charging-port.mp4';
import waterDamageVideo from '../assets/services/videos/water-damage.mp4';
import cameraLensImage from '../assets/services/camera-lens.webp';
import speakerMicrophoneVideo from '../assets/services/videos/speaker-microphone.mp4';
import softwareDiagnosticsVideo from '../assets/services/videos/software-diagnostics.mp4';
import dataRecoveryVideo from '../assets/services/videos/data-recovery.mp4';

const SERVICE_VIDEOS = {
  screen: crackedScreenVideo,
  battery: batteryReplacementVideo,
  charging: chargingPortVideo,
  water: waterDamageVideo,
  speaker: speakerMicrophoneVideo,
  software: softwareDiagnosticsVideo,
  data: dataRecoveryVideo,
};

// Still photos get a slow zoom so they move like the video cards.
const SERVICE_IMAGES = {
  camera: cameraLensImage,
};

const iconComponents = {
  Smartphone,
  BatteryCharging,
  Zap,
  Droplets,
  Camera,
  Volume2,
  Cpu,
  Database
};

export default function ServicesSection({ onSelectService }) {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const videos = () => grid.querySelectorAll('video');
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[entries.length - 1];
      videos().forEach((video) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { rootMargin: '200px 0px' });

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-20 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-extrabold uppercase tracking-wider border border-brand-gold/20">
            <BrandMark size="sm" />
            Repair Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Professional Repair <span className="text-brand-gold">Services</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            From cracked screens to micro-soldering logic board recoveries, our certified technicians revive your smartphone, tablet, or laptop.
          </p>
        </div>

        <div ref={gridRef} className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REPAIR_ISSUES.map((service) => {
            const Icon = iconComponents[service.icon] || Smartphone;
            const video = SERVICE_VIDEOS[service.id];
            const image = SERVICE_IMAGES[service.id];
            const hasMedia = Boolean(video || image);
            return (
              <div
                key={service.id}
                className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden"
              >
                {video && (
                  <video
                    src={video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover opacity-40 scale-105 transition-all duration-700 ease-out group-hover:opacity-75 group-hover:scale-100 pointer-events-none"
                  />
                )}
                {image && (
                  <img
                    src={image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-40 transition-opacity duration-700 ease-out group-hover:opacity-75 motion-safe:animate-slow-zoom pointer-events-none"
                  />
                )}
                {hasMedia && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent pointer-events-none"
                  />
                )}

                {service.popular && (
                  <span className="absolute top-4 right-4 z-20 bg-brand-gold/10 text-brand-gold text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-brand-gold/20">
                    Popular
                  </span>
                )}

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gray-800 group-hover:bg-brand-gold text-brand-gold group-hover:text-black flex items-center justify-center transition-colors duration-300 shadow-inner">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-white mt-5 group-hover:text-brand-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className={`text-sm mt-2 font-normal leading-relaxed transition-colors duration-500 ${
                    hasMedia ? 'text-gray-500 group-hover:text-gray-200' : 'text-gray-500'
                  }`}>
                    {service.desc}
                  </p>
                </div>

                <div className={`relative z-10 mt-6 pt-5 ${hasMedia ? 'border-t border-gray-800 group-hover:border-white/10' : 'border-t border-gray-800'}`}>
                  <button
                    onClick={() => onSelectService(service)}
                    className="w-full py-2.5 rounded-xl font-bold text-sm bg-gray-800 text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        <div className="mt-14 glass-panel p-5 sm:p-8 rounded-3xl border border-brand-gold/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg bg-gradient-to-r from-brand-gold/5 via-black to-brand-gold/5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-gold text-black flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Unsure what is wrong with your device?</h4>
              <p className="text-sm text-gray-400">Bring it in for a 100% Free 24-point hardware inspection with zero obligation.</p>
            </div>
          </div>

          <button
            onClick={() => onSelectService(null)}
            className="w-full md:w-auto gold-gradient-btn px-6 py-3.5 rounded-xl font-bold text-sm shrink-0 flex items-center justify-center gap-2 shadow-md cursor-pointer touch-manipulation"
          >
            Book Now
          </button>
        </div>

      </div>
    </section>
  );
}
