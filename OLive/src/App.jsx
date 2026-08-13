import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrustSection from './components/TrustSection';
import ServicesSection from './components/ServicesSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import ProcessSection from './components/ProcessSection';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import TrackRepairModal from './components/TrackRepairModal';
import WhatsAppChatWidget from './components/WhatsAppChatWidget';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);
  const [selectedBookingData, setSelectedBookingData] = useState(null);

  const handleOpenBooking = (initialData = null) => {
    setSelectedBookingData(initialData);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand-gold selection:text-black flex flex-col font-sans">
      <Navbar 
        onOpenBooking={() => handleOpenBooking()} 
        onOpenTrack={() => setTrackOpen(true)} 
      />

      <main className="flex-grow">
        <HeroSection 
          onOpenBooking={() => handleOpenBooking()} 
        />
        
        <TrustSection />

        <ServicesSection 
          onSelectService={(service) => handleOpenBooking({ issue: service })} 
        />

        <WhyChooseUsSection 
          onOpenBooking={() => handleOpenBooking()} 
        />

        <ProcessSection 
          onOpenBooking={() => handleOpenBooking()} 
        />

        <ReviewsSection />

        <FAQSection />

      </main>

      <Footer 
        onOpenBooking={() => handleOpenBooking()} 
        onOpenTrack={() => setTrackOpen(true)} 
      />

      <BookingModal 
        isOpen={bookingOpen} 
        onClose={() => setBookingOpen(false)} 
        initialSelection={selectedBookingData} 
      />

      <TrackRepairModal 
        isOpen={trackOpen} 
        onClose={() => setTrackOpen(false)} 
      />

      <WhatsAppChatWidget hidden={bookingOpen || trackOpen} />
    </div>
  );
}
