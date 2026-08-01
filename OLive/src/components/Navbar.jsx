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
      ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3'
      : 'bg-transparent py-5'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center text-white shadow-md shadow-brand-navy/20 group-hover:bg-brand-navy-light transition-colors">
              <Wrench className="w-5 h-5 text-brand-orange group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                Fix<span className="text-brand-orange">Craft</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-brand-navy/10 text-brand-navy px-1.5 py-0.5 rounded ml-1">Pro</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium -mt-1">Express Mob Repairs</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-600 hover:text-brand-navy transition-colors relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA Area */}
          <div className="hidden md:flex items-center gap-3">
            {/* Track Repair Button */}
            <button
              onClick={onOpenTrack}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-brand-navy bg-brand-navy/5 hover:bg-brand-navy/10 border border-brand-navy/15 transition-all"
            >
              <Search className="w-3.5 h-3.5 text-brand-navy" />
              Track Status
            </button>

            {/* Primary Book Repair CTA */}
            <button
              onClick={() => onOpenBooking()}
              className="orange-gradient-btn text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Book Repair
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenTrack}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold"
            >
              <Search className="w-4 h-4 text-brand-navy" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-700 hover:text-brand-navy py-1.5 border-b border-slate-100"
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
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-slate-100 text-slate-800"
            >
              <Search className="w-4 h-4 text-brand-navy" />
              Track Repair Ticket
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full orange-gradient-btn text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
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
