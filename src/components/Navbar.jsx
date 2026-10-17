import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenBooking, onOpenEvents }) {
  const [activeTab, setActiveTab] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const scrollPos = window.scrollY + 200;
      const heroEl = document.getElementById('hero');
      const processEl = document.getElementById('process');
      const memoriesEl = document.getElementById('memories');
      const bookingEl = document.getElementById('booking-flow');
      const contactEl = document.getElementById('contact-us');

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveTab('contact');
      } else if (bookingEl && scrollPos >= bookingEl.offsetTop) {
        setActiveTab('booking');
      } else if (memoriesEl && scrollPos >= memoriesEl.offsetTop) {
        setActiveTab('memories');
      } else if (processEl && scrollPos >= processEl.offsetTop) {
        setActiveTab('process');
      } else {
        setActiveTab('hero');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 transition-all duration-300 ${
        scrolled || mobileOpen ? 'bg-[#1A1008]/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo (Crimson Red 'The Oak') */}
        <a href="#hero" className="flex flex-col items-start leading-none group shrink-0">
          <span className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-[#A82020] group-hover:text-[#c42828] transition-colors">
            The Oak
          </span>
          <span className="text-[9px] uppercase tracking-[0.28em] text-[#E8B89A]/90 font-sans font-medium mt-0.5">
            PADEL HOUSE
          </span>
        </a>

        {/* Centered Desktop Navigation Links */}
        <nav className="hidden md:flex items-center justify-center space-x-10 lg:space-x-12">
          <a
            href="#hero"
            onClick={() => setActiveTab('hero')}
            className={`text-xs uppercase tracking-[0.18em] font-normal font-sans transition-all duration-250 ease-in-out ${
              activeTab === 'hero'
                ? 'text-[#FFFFFF] font-semibold opacity-100'
                : 'text-[#B0B0B0] opacity-75 hover:text-[#FFFFFF] hover:opacity-100'
            }`}
          >
            LETS PADEL
          </a>
          <button
            onClick={() => {
              setActiveTab('events');
              onOpenEvents();
            }}
            className={`text-xs uppercase tracking-[0.18em] font-normal font-sans transition-all duration-250 ease-in-out ${
              activeTab === 'events'
                ? 'text-[#FFFFFF] font-semibold opacity-100'
                : 'text-[#B0B0B0] opacity-75 hover:text-[#FFFFFF] hover:opacity-100'
            }`}
          >
            EVENTS
          </button>
          <a
            href="#contact-us"
            onClick={() => setActiveTab('contact')}
            className={`text-xs uppercase tracking-[0.18em] font-normal font-sans transition-all duration-250 ease-in-out ${
              activeTab === 'contact'
                ? 'text-[#FFFFFF] font-semibold opacity-100'
                : 'text-[#B0B0B0] opacity-75 hover:text-[#FFFFFF] hover:opacity-100'
            }`}
          >
            CONTACT
          </a>
        </nav>

        {/* BOOK YOUR COURT - Solid Crimson Red Button */}
        <div className="hidden sm:flex items-center shrink-0">
          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 bg-[#991B1B] hover:bg-[#b91c1c] text-white text-xs font-semibold uppercase tracking-[0.15em] rounded-md transition-all duration-250 ease-in-out active:scale-95 shadow-sm"
          >
            BOOK YOUR COURT
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-white transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-white transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-white transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#3F3D3A] border-t border-black/20 px-6 py-6 mt-3 space-y-5 text-sm uppercase tracking-[0.18em] font-sans font-medium">
          <a
            href="#hero"
            onClick={() => {
              setMobileOpen(false);
              setActiveTab('hero');
            }}
            className="block text-[#B0B0B0] hover:text-white"
          >
            LETS PADEL
          </a>
          <button
            onClick={() => {
              setMobileOpen(false);
              setActiveTab('events');
              onOpenEvents();
            }}
            className="block w-full text-left uppercase tracking-[0.18em] text-[#B0B0B0] hover:text-white"
          >
            EVENTS
          </button>
          <a
            href="#contact-us"
            onClick={() => {
              setMobileOpen(false);
              setActiveTab('contact');
            }}
            className="block text-[#B0B0B0] hover:text-white"
          >
            CONTACT
          </a>
          <div className="pt-3 border-t border-black/20">
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 bg-[#991B1B] text-white text-xs font-semibold uppercase tracking-widest rounded-md text-center shadow-sm"
            >
              BOOK YOUR COURT
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
