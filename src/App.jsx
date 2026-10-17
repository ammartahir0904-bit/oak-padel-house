import React, { useState } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import SectionHero from './components/SectionHero';
import SectionProcess from './components/SectionProcess';
import SectionMemories from './components/SectionMemories';
import SectionBookingFlow from './components/SectionBookingFlow';
import SectionDualCTA from './components/SectionDualCTA';
import SectionContact from './components/SectionContact';
import BookingModal from './components/BookingModal';
import EventModal from './components/EventModal';
import LightboxModal from './components/LightboxModal';
import { siteContent } from './data/content';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [selectedInquiryService, setSelectedInquiryService] = useState('General Inquiry');

  const images = siteContent.section3.images;

  const handleNextLightbox = () => {
    if (!lightboxImage) return;
    const currentIndex = images.findIndex((img) => img.id === lightboxImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setLightboxImage(images[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!lightboxImage) return;
    const currentIndex = images.findIndex((img) => img.id === lightboxImage.id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setLightboxImage(images[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-[#1A1008] text-[#F5DEC8] selection:bg-[#C4622D] selection:text-[#F5DEC8]">
      {/* 0. Loading Screen */}
      <Loader />

      {/* 1. Global Navbar */}
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenEvents={() => setIsEventOpen(true)}
      />

      {/* 2. Main Content */}
      <main className="w-full">
        {/* SECTION 1: Pinned Hero Scroll Sequence (GSAP ScrollTrigger Scrub) */}
        <SectionHero
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* SECTION 2: Our Premium Courts + The Process (GSAP ScrollTrigger Scrub) */}
        <SectionProcess
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* SECTION 3: Memories CTA (Cream Background #F5DEC8 + Interactive Trail) */}
        <SectionMemories
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenEvent={() => setIsEventOpen(true)}
          onSelectImage={(img) => setLightboxImage(img)}
        />

        {/* SECTION 4: Interactive 3-Step Booking Flow Widget */}
        <SectionBookingFlow
          onOpenCheckout={(details) => setIsBookingOpen(true)}
        />

        {/* SECTION 5: Dual CTA Banner (Tournament & Shoot) */}
        <SectionDualCTA
          onSelectService={(service) => setSelectedInquiryService(service)}
        />

        {/* SECTION 6: Contact Us Form (#contact-us) */}
        <SectionContact
          selectedInquiry={selectedInquiryService}
        />
      </main>

      {/* 3. Neo-Classical Footer */}
      <footer className="w-full py-20 bg-[#1A1008] text-[#F5DEC8] border-t border-[#E8B89A]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start leading-none">
            <span className="font-serif text-3xl font-bold tracking-wider text-[#F5DEC8]">
              The Oak
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#E8B89A] font-sans font-medium mt-1">
              PADEL HOUSE • EST. 2024
            </span>
          </div>

          <div className="text-center md:text-right font-sans text-xs text-[#E8B89A]/80 space-y-1">
            <p>© {new Date().getFullYear()} The Oak Padel House. All Rights Reserved.</p>
            <p className="text-[11px] text-[#E8B89A]/60">
              Neo-classical padel architecture in terracotta, sand, cream &amp; deep oak.
            </p>
          </div>
        </div>
      </footer>

      {/* 4. Global Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <EventModal
        isOpen={isEventOpen}
        onClose={() => setIsEventOpen(false)}
      />

      <LightboxModal
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
        onNext={handleNextLightbox}
        onPrev={handlePrevLightbox}
      />
    </div>
  );
}
