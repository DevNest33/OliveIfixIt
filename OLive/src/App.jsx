import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrustSection from './components/TrustSection';
import ServicesSection from './components/ServicesSection';
import RepairEstimatorSection from './components/RepairEstimatorSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import ProcessSection from './components/ProcessSection';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import TrackRepairModal from './components/TrackRepairModal';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);
  const [selectedBookingData, setSelectedBookingData] = useState(null);

  const handleOpenBooking = (initialData = null) => {
    setSelectedBookingData(initialData);
    setBookingOpen(true);
  };

  const handleScrollToEstimator = () => {
    const el = document.getElementById('estimator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-orange selection:text-white flex flex-col font-sans">
      {/* Sticky Navbar */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking()} 
        onOpenTrack={() => setTrackOpen(true)} 
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <HeroSection 
          onOpenBooking={() => handleOpenBooking()} 
          onScrollToEstimator={handleScrollToEstimator} 
        />
        
        <TrustSection />

        <ServicesSection 
          onSelectService={(service) => handleOpenBooking({ issue: service })} 
        />

        <RepairEstimatorSection 
          onBookWithSelection={(selection) => handleOpenBooking(selection)} 
        />

        <WhyChooseUsSection 
          onOpenBooking={() => handleOpenBooking()} 
        />

        <ProcessSection 
          onOpenBooking={() => handleOpenBooking()} 
        />

        <ReviewsSection />

        <FAQSection />

        <CtaBanner 
          onOpenBooking={() => handleOpenBooking()} 
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenBooking={() => handleOpenBooking()} 
        onOpenTrack={() => setTrackOpen(true)} 
      />

      {/* Interactive Modals */}
      <BookingModal 
        isOpen={bookingOpen} 
        onClose={() => setBookingOpen(false)} 
        initialSelection={selectedBookingData} 
      />

      <TrackRepairModal 
        isOpen={trackOpen} 
        onClose={() => setTrackOpen(false)} 
      />
    </div>
  );
}
