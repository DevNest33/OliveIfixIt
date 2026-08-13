import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Navbar({ onOpenBooking }) {
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

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Why Olive ifixit', href: '#why-us' },
    { name: 'Repair Process', href: '#process' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 pt-safe ${isScrolled
      ? 'bg-black/85 backdrop-blur-md border-b border-gray-800 shadow-sm py-3'
      : 'bg-transparent py-4 sm:py-5'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">

          <a href="#" className="group">
            <BrandLogo showTagline />
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
              onClick={() => onOpenBooking()}
              className="gold-gradient-btn px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Book Repair
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              aria-label="Book repair"
              className="w-11 h-11 rounded-lg gold-gradient-btn flex items-center justify-center touch-manipulation"
            >
              <Calendar className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 rounded-xl bg-gray-900 text-gray-300 active:bg-gray-800 transition-colors flex items-center justify-center touch-manipulation"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-gray-800 px-4 pt-4 pb-6 space-y-4 shadow-xl max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-gray-300 active:text-brand-gold py-3 border-b border-gray-800 touch-manipulation"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full gold-gradient-btn py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg touch-manipulation"
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
