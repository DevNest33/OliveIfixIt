import React, { useState } from 'react';
import { REPAIR_ISSUES } from '../data/repairData';
import {
  Smartphone, BatteryCharging, Zap, Droplets, Camera, Volume2, Cpu, Database,
  ArrowRight, Clock, ShieldCheck, Check
} from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Repairs' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'express', label: 'Express Service' },
  ];

  const filteredServices = REPAIR_ISSUES.filter((item) => {
    if (activeTab === 'popular') return item.popular;
    if (activeTab === 'express') return item.timeEst.includes('mins') || item.timeEst.includes('Min');
    return true;
  });

  return (
    <section id="services" className="py-20 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Professional Repair <span className="text-brand-gold">Services</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            From cracked screens to micro-soldering logic board recoveries, our certified technicians revive your smartphone, tablet, or laptop.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-brand-gold text-black shadow-md'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const Icon = iconComponents[service.icon] || Smartphone;
            return (
              <div
                key={service.id}
                className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden"
              >
                {service.popular && (
                  <span className="absolute top-4 right-4 bg-brand-gold/10 text-brand-gold text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-brand-gold/20">
                    Popular
                  </span>
                )}

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gray-800 group-hover:bg-brand-gold text-brand-gold group-hover:text-black flex items-center justify-center transition-colors duration-300 shadow-inner">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-white mt-5 group-hover:text-brand-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 font-normal leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-800">
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

        <div className="mt-14 glass-panel p-8 rounded-3xl border border-brand-gold/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg bg-gradient-to-r from-brand-gold/5 via-black to-brand-gold/5">
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
            className="gold-gradient-btn px-6 py-3 rounded-xl font-bold text-sm shrink-0 flex items-center gap-2 shadow-md cursor-pointer"
          >
            Book Now
          </button>
        </div>

      </div>
    </section>
  );
}
