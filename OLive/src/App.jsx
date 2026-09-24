import React, { useCallback, useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrustSection from './components/TrustSection';
import ServicesSection from './components/ServicesSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import ProcessSection from './components/ProcessSection';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';
import BookingModal from './components/BookingModal';
import WarrantyModal from './components/WarrantyModal';
import WhatsAppChatWidget from './components/WhatsAppChatWidget';
import PwaInstallBanner from './components/PwaInstallBanner';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [warrantyOpen, setWarrantyOpen] = useState(false);
  const [selectedBookingData, setSelectedBookingData] = useState(null);
  const [heroIntroComplete, setHeroIntroComplete] = useState(false);
  const openedBookingFromQuery = useRef(false);

  const handleOpenBooking = (initialData = null) => {
    setSelectedBookingData(initialData);
    setBookingOpen(true);
  };

  const handleCloseWarranty = useCallback(() => {
    setWarrantyOpen(false);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setHeroIntroComplete(true);
  }, []);

  useEffect(() => {
    if (heroIntroComplete) return undefined;

    const html = document.documentElement;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [heroIntroComplete]);

  useEffect(() => {
    if (!heroIntroComplete || openedBookingFromQuery.current) return;

    const params = new URLSearchParams(window.location.search);
    if (params.get('book') !== '1') return;

    openedBookingFromQuery.current = true;
    handleOpenBooking();

    params.delete('book');
    const search = params.toString();
    const nextUrl = `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`;
    window.history.replaceState({}, '', nextUrl);
  }, [heroIntroComplete]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const sections = document.querySelectorAll(
      '#services, #why-us, #process, #reviews, #faq'
    );
    sections.forEach((section) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });

    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-gold selection:text-black flex flex-col font-sans">
      <Navbar
        visible={heroIntroComplete}
        onOpenBooking={() => handleOpenBooking()}
        onOpenWarranty={() => setWarrantyOpen(true)}
      />

      <main className="flex-grow">
        <HeroSection
          onIntroComplete={handleIntroComplete}
          onOpenBooking={() => handleOpenBooking()}
        />

        <div
          className={`transition-opacity duration-700 ease-out ${
            heroIntroComplete ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={!heroIntroComplete}
        >
          <TrustSection onOpenWarranty={() => setWarrantyOpen(true)} />

          <SectionDivider />

          <ServicesSection
            onSelectService={(service) => handleOpenBooking({ issue: service })}
          />

          <WhyChooseUsSection
            onOpenBooking={() => handleOpenBooking()}
          />

          <ProcessSection
            onOpenBooking={() => handleOpenBooking()}
          />

          <SectionDivider />

          <ReviewsSection />

          <FAQSection />
        </div>
      </main>

      <div
        className={`transition-opacity duration-700 ease-out ${
          heroIntroComplete ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!heroIntroComplete}
      >
        <Footer
          onOpenBooking={() => handleOpenBooking()}
        />
      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialSelection={selectedBookingData}
      />

      <WarrantyModal
        isOpen={warrantyOpen}
        onClose={handleCloseWarranty}
      />

      <WhatsAppChatWidget hidden={bookingOpen || warrantyOpen || !heroIntroComplete} />
      <PwaInstallBanner visible={heroIntroComplete && !bookingOpen && !warrantyOpen} />
    </div>
  );
}
