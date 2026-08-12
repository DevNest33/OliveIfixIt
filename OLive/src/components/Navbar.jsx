import React, { useState, useEffect } from 'react';
import { Smartphone, Wrench, Search, Calendar, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenBooking, onOpenTrack }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Why FixCraft', href: '#why-us' },
    { name: 'Repair Process', href: '#process' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
      ? 'bg-black/85 backdrop-blur-md border-b border-gray-800 shadow-sm py-3'
      : 'bg-transparent py-5'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">

          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-brand-black flex items-center justify-center text-white shadow-md shadow-brand-gold/20 group-hover:bg-brand-black-lighter transition-colors">
              <Wrench className="w-5 h-5 text-brand-gold group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                Olive<span className="text-brand-gold">Craft</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-brand-gold/10 text-brand-gold px-1.5 py-0.5 rounded ml-1">Pro</span>
              </span>
              <span className="text-[10px] text-gray-500 font-medium -mt-1">Express Mob Repairs</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-gray-400 hover:text-brand-gold transition-colors relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenTrack}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-brand-gold bg-brand-gold/5 hover:bg-brand-gold/10 border border-brand-gold/15 transition-all"
            >
              <Search className="w-3.5 h-3.5 text-brand-gold" />
              Track Status
            </button>

            <button
              onClick={() => onOpenBooking()}
              className="gold-gradient-btn px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Book Repair
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenTrack}
              className="p-2 rounded-lg bg-gray-900 text-gray-300 text-xs font-bold"
            >
              <Search className="w-4 h-4 text-brand-gold" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-gray-900 text-gray-300 hover:bg-gray-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-gray-800 px-4 pt-4 pb-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-gray-300 hover:text-brand-gold py-1.5 border-b border-gray-800"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrack();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-gray-900 text-gray-300"
            >
              <Search className="w-4 h-4 text-brand-gold" />
              Track Repair Ticket
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full gold-gradient-btn py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              Book Repair Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
