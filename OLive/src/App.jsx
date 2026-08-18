import React, { useCallback, useEffect, useState } from 'react';
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
import WhatsAppChatWidget from './components/WhatsAppChatWidget';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedBookingData, setSelectedBookingData] = useState(null);
  const [heroIntroComplete, setHeroIntroComplete] = useState(false);

  const handleOpenBooking = (initialData = null) => {
    setSelectedBookingData(initialData);
    setBookingOpen(true);
  };

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

  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-gold selection:text-black flex flex-col font-sans">
      <Navbar
        visible={heroIntroComplete}
        onOpenBooking={() => handleOpenBooking()}
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
          <TrustSection />

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

      <WhatsAppChatWidget hidden={bookingOpen || !heroIntroComplete} />
    </div>
  );
}
