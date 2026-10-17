import React, { useState } from 'react';
import { ChevronRight, Check, Calendar as CalendarIcon, Clock, ShieldCheck } from 'lucide-react';

const courtsData = [
  {
    id: 'terracotta-court',
    name: 'Terracotta Court',
    type: 'Outdoor Clay / Terracotta',
    image: '/assets/section4/courts/Cafe Lounge.png',
    rate: '$120 / hr',
    description: 'Championship-grade terracotta surface beneath open skies and towering palms.',
  },
  {
    id: 'premium-court',
    name: 'Premium Court',
    type: 'Indoor Acoustic Oak',
    image: '/assets/section4/courts/Premium Court.png',
    rate: '$150 / hr',
    description: 'Sound-dampened timber canopy with tournament lighting and climate control.',
  },
  {
    id: 'family-court',
    name: 'Family Court',
    type: 'Semi-Private Pavilion',
    image: '/assets/section4/courts/Family Lounge.png',
    rate: '$110 / hr',
    description: 'Spacious court with adjacent lounge seating for groups, families, and clinics.',
  },
  {
    id: 'private-court',
    name: 'Private Court',
    type: 'Secluded VIP Court',
    image: '/assets/section4/courts/Private Court.png',
    rate: '$180 / hr',
    description: 'Exclusive private court with dedicated concierge, drinks bar, and recovery suite.',
  },
  {
    id: 'classic-court',
    name: 'Classic Court',
    type: 'Outdoor Club Surface',
    image: '/assets/section4/courts/Classic Court.png',
    rate: '$95 / hr',
    description: 'Heritage court layout with crisp rebound walls and panoramic clubhouse views.',
  },
];

const timeSlots = [
  '8:00 - 9:00 Am',
  '10:00 - 11:00 Am',
  '12:00 - 1:00 Pm',
  '2:00 - 3:00 Pm',
  '4:00 - 5:00 Pm',
  '6:00 - 7:00 Pm',
  '8:00 - 9:00 Pm',
  '11:00 - 12:00 Am',
];

export default function SectionBookingFlow({ onOpenCheckout }) {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedCourt, setSelectedCourt] = useState(courtsData[0]);
  const [selectedDate, setSelectedDate] = useState(26);
  const [selectedMonth, setSelectedMonth] = useState('Sep');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('6:00 - 7:00 Pm');
  const [isBookedSuccess, setIsBookedSuccess] = useState(false);

  const steps = [
    {
      step: 1,
      title: '1 ) SELECT YOUR COURT',
      thumb: '/assets/section4/metadata/3.png',
      summary: selectedCourt ? selectedCourt.name : 'Choose Court',
    },
    {
      step: 2,
      title: '2 ) SELECT YOUR DAY',
      thumb: '/assets/section4/metadata/1.png',
      summary: `${selectedMonth} ${selectedDate}, ${selectedYear}`,
    },
    {
      step: 3,
      title: '3 ) SELECT YOUR TIME SLOT',
      thumb: '/assets/section4/metadata/2.png',
      summary: selectedTimeSlot || 'Choose Slot',
    },
  ];

  // Simple calendar generator for the interactive calendar in Step 2
  const daysInMonth = 30; // Sep has 30 days
  const startDayOffset = 1; // Sep 1 starts on Tue (offset 1 for Mon-based index)
  const daysOfWeek = ['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'];

  const isFormComplete = selectedCourt && selectedDate && selectedTimeSlot;

  const handleProceedToPay = () => {
    if (!isFormComplete) return;
    if (onOpenCheckout) {
      onOpenCheckout({
        court: selectedCourt,
        date: `${selectedMonth} ${selectedDate}, ${selectedYear}`,
        time: selectedTimeSlot,
      });
    } else {
      setIsBookedSuccess(true);
    }
  };

  return (
    <section id="booking-flow" className="relative w-full min-h-screen bg-[#EFE6D8] border-t border-[#A64A2E]/40 overflow-hidden">
      {/* Full-Screen 2-Column Booking Widget (Edge-to-Edge, 0 outer padding) */}
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        
        {/* LEFT SIDEBAR: Gradient Background & 3 Steps with Radial Glow */}
        <div 
          className="lg:col-span-4 xl:col-span-4 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#A64A2E]/30"
          style={{
            background: 'linear-gradient(180deg, #2B1810 0%, #A64A2E 100%)',
          }}
        >
          <div className="space-y-6 sm:space-y-8">
            {/* Sidebar Title */}
            <div className="pb-2">
              <span className="text-[#C97A3D] font-sans text-xs uppercase tracking-[0.28em] font-semibold block mb-1">
                RESERVE YOUR EXPERIENCE
              </span>
              <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl text-[#FFFFFF] tracking-wide uppercase font-medium">
                THE OAK BOOKING
              </h2>
            </div>

            {steps.map((item) => {
              const isActive = activeStep === item.step;
              return (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(item.step)}
                  className={`group relative cursor-pointer rounded-[20px] p-4 sm:p-5 transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/10 ring-2 ring-[#C97A3D] shadow-xl scale-[1.01]' 
                      : 'bg-black/20 hover:bg-white/5 opacity-85 hover:opacity-100'
                  }`}
                  style={{
                    backgroundImage: isActive 
                      ? 'radial-gradient(circle at center, rgba(201, 122, 61, 0.42) 0%, transparent 75%)' 
                      : 'none',
                  }}
                >
                  {/* Hover radial glow overlay */}
                  <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(201,122,61,0.38)_0%,transparent_70%)]" />

                  {/* Step Title in Serif */}
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <h3 className="font-playfair text-base sm:text-lg lg:text-xl text-[#FFFFFF] font-medium tracking-[0.05em] uppercase">
                      {item.title}
                    </h3>
                    {isActive && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C97A3D] shadow-[0_0_10px_#C97A3D]" />
                    )}
                  </div>

                  {/* Thumbnail Image */}
                  <div className="relative w-full h-28 sm:h-32 rounded-[14px] overflow-hidden shadow-inner border border-white/20">
                    <img
                      src={item.thumb}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-white/90 font-serif">
                      <span className="truncate">{item.summary}</span>
                      <ChevronRight size={14} className="text-[#C97A3D]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Booking Summary Pill in Sidebar */}
          <div className="mt-8 pt-6 border-t border-white/15 text-xs text-white/80 font-serif space-y-1.5">
            <div className="flex justify-between items-center text-white font-medium">
              <span>Selected Court:</span>
              <span className="text-[#F7F1E7] font-semibold">{selectedCourt?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Date:</span>
              <span>{selectedMonth} {selectedDate}, {selectedYear}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Time Slot:</span>
              <span>{selectedTimeSlot}</span>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT PANEL: #EFE6D8 Cream Background (Full Bleed) */}
        <div className="lg:col-span-8 xl:col-span-8 bg-[#EFE6D8] p-6 sm:p-10 md:p-12 lg:p-14 xl:p-16 flex flex-col justify-between text-[#2B1810]">
          
          {/* STEP 1: Select Your Court */}
          {activeStep === 1 && (
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 mb-6 pb-3 border-b border-[#2B1810]/15">
                  <h3 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-medium uppercase text-[#2B1810] tracking-wide">
                    AVAILABLE COURTS
                  </h3>
                  <span className="text-xs font-serif text-[#2B1810]/70 uppercase tracking-widest">
                    {courtsData.length} COURTS READY
                  </span>
                </div>

                {/* Court Cards List (Scrollbar Hidden) */}
                <div className="space-y-5 max-h-[60vh] overflow-y-auto no-scrollbar hide-scrollbar">
                  {courtsData.map((court) => {
                    const isSelected = selectedCourt?.id === court.id;
                    return (
                      <div
                        key={court.id}
                        onClick={() => setSelectedCourt(court)}
                        className={`group relative cursor-pointer rounded-[20px] overflow-hidden transition-all duration-300 border ${
                          isSelected
                            ? 'ring-2 ring-[#6B1F22] border-[#6B1F22] shadow-2xl scale-[1.01]'
                            : 'border-[#2B1810]/15 bg-[#F7F1E7] hover:border-[#C97A3D] shadow-md'
                        }`}
                      >
                        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                          <img
                            src={court.image}
                            alt={court.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                          
                          {/* Top Badge */}
                          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] text-white font-serif tracking-wider">
                            {court.type}
                          </div>

                          <div className="absolute top-4 right-4 bg-[#6B1F22] text-white px-3.5 py-1 rounded-full text-xs font-semibold font-serif shadow-sm">
                            {court.rate}
                          </div>

                          {/* Bottom Court Name */}
                          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                            <div>
                              <h4 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide drop-shadow-md">
                                {court.name}
                              </h4>
                              <p className="text-xs sm:text-sm text-white/85 font-serif line-clamp-1 mt-1">
                                {court.description}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCourt(court);
                                setActiveStep(2);
                              }}
                              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-serif font-medium transition-all ${
                                isSelected
                                  ? 'bg-[#6B1F22] text-white shadow-md'
                                  : 'bg-white text-[#2B1810] hover:bg-[#C97A3D] hover:text-white'
                              }`}
                            >
                              {isSelected ? 'Selected' : 'Select'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 1 Footer Action */}
              <div className="mt-8 pt-6 border-t border-[#2B1810]/15 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-8 sm:px-10 py-4 rounded-full bg-[#6B1F22] hover:bg-[#A64A2E] text-white font-playfair font-medium text-base sm:text-lg tracking-[0.03em] shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  <span>Continue To Date</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Your Day (Interactive Calendar with Maroon Dashed Border) */}
          {activeStep === 2 && (
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 mb-6 pb-3 border-b border-[#2B1810]/15">
                  <h3 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-medium uppercase text-[#2B1810] tracking-wide">
                    SELECT YOUR DAY
                  </h3>
                  <span className="text-xs font-serif text-[#2B1810]/70 uppercase tracking-widest">
                    STEP 2 OF 3
                  </span>
                </div>

                {/* Interactive Calendar Container with Maroon Dashed Border */}
                <div className="relative border-2 border-dashed border-[#6B1F22]/50 rounded-[24px] p-6 sm:p-10 bg-[#F7F1E7]/80 shadow-md">
                  {/* Month / Year Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2B1810]/10">
                    <h4 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2B1810] tracking-wide">
                      {selectedMonth} {selectedYear}
                    </h4>
                    <div className="flex items-center gap-2">
                      {['Sep', 'Oct', 'Nov'].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setSelectedMonth(m)}
                          className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-serif transition-all ${
                            selectedMonth === m
                              ? 'bg-[#6B1F22] text-white font-semibold shadow-sm'
                              : 'bg-white/80 text-[#2B1810] hover:bg-[#C97A3D] hover:text-white'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Days of Week Header */}
                  <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-4 text-center">
                    {daysOfWeek.map((d) => (
                      <div key={d} className="font-sans text-xs sm:text-sm font-bold text-[#6B1F22] tracking-wider uppercase">
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Days Grid */}
                  <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center">
                    {/* Empty padding days for offset */}
                    {Array.from({ length: startDayOffset }).map((_, i) => (
                      <div key={`empty-${i}`} className="p-2 text-transparent select-none">-</div>
                    ))}

                    {/* Month Days */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dayNum = i + 1;
                      const isSelected = selectedDate === dayNum;
                      return (
                        <button
                          key={dayNum}
                          type="button"
                          onClick={() => setSelectedDate(dayNum)}
                          className={`h-10 sm:h-12 rounded-full font-serif text-sm sm:text-base lg:text-lg transition-all duration-200 flex items-center justify-center font-medium ${
                            isSelected
                              ? 'bg-[#6B1F22] text-white shadow-lg scale-105 font-bold ring-2 ring-[#6B1F22]/30'
                              : 'bg-white hover:bg-[#C97A3D] hover:text-white text-[#2B1810] shadow-sm'
                          }`}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 2 Bottom Actions */}
              <div className="mt-8 pt-6 border-t border-[#2B1810]/15 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="px-6 py-3 rounded-full bg-white text-[#2B1810] font-playfair text-sm hover:bg-[#2B1810] hover:text-white transition-all shadow-sm"
                >
                  Back to Courts
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="px-8 sm:px-10 py-4 rounded-full bg-[#6B1F22] hover:bg-[#A64A2E] text-white font-playfair font-medium text-base sm:text-lg tracking-[0.03em] shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  <span>Continue To Time Slot</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Select Your Time Slot */}
          {activeStep === 3 && (
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 mb-6 pb-3 border-b border-[#2B1810]/15">
                  <h3 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-medium uppercase text-[#2B1810] tracking-wide">
                    SELECT YOUR TIME SLOT
                  </h3>
                  <span className="text-xs font-serif text-[#2B1810]/70 uppercase tracking-widest">
                    STEP 3 OF 3
                  </span>
                </div>

                {/* Time Slots Grid with Maroon Dashed Border matching mockup */}
                <div className="border-2 border-dashed border-[#6B1F22]/50 rounded-[24px] p-6 sm:p-10 bg-[#F7F1E7]/80 shadow-md overflow-hidden">
                  <p className="font-serif text-xs sm:text-sm text-[#2B1810]/75 uppercase tracking-widest mb-6">
                    AVAILABLE 60-MINUTE SLOTS FOR {selectedMonth} {selectedDate}, {selectedYear}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[46vh] overflow-y-auto overflow-x-hidden no-scrollbar hide-scrollbar">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`group flex items-center gap-4 px-6 py-4 rounded-full text-left transition-all duration-200 border ${
                            isSelected
                              ? 'bg-white border-[#6B1F22] ring-2 ring-[#6B1F22] shadow-lg scale-[1.02]'
                              : 'bg-white/95 border-[#2B1810]/15 hover:border-[#C97A3D] text-[#2B1810] shadow-sm'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-[#6B1F22] text-white' : 'bg-[#C97A3D] text-white'
                          }`}>
                            <ChevronRight size={17} />
                          </div>
                          <span className="font-serif text-base sm:text-lg font-semibold tracking-wide text-[#2B1810]">
                            {slot}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 3 Action: Proceed To Pay Button */}
              <div className="mt-8 pt-6 border-t border-[#2B1810]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-6 py-3 rounded-full bg-white text-[#2B1810] font-playfair text-sm hover:bg-[#2B1810] hover:text-white transition-all shadow-sm w-full sm:w-auto text-center"
                >
                  Back to Date
                </button>

                <button
                  type="button"
                  onClick={handleProceedToPay}
                  disabled={!isFormComplete}
                  className={`px-12 py-4.5 rounded-full font-playfair font-medium text-lg sm:text-xl tracking-[0.03em] shadow-2xl transition-all duration-300 w-full sm:w-auto text-center ${
                    isFormComplete
                      ? 'bg-[#6B1F22] hover:bg-[#A64A2E] text-white hover:scale-105 cursor-pointer'
                      : 'bg-stone-300 text-stone-500 cursor-not-allowed opacity-60'
                  }`}
                >
                  Proceed To Pay
                </button>
              </div>
            </div>
          )}

          {/* Success Booking Confirmation Modal / Alert */}
          {isBookedSuccess && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-[#EFE6D8] max-w-md w-full rounded-[24px] p-8 border-2 border-[#6B1F22] shadow-2xl text-center">
                <div className="w-16 h-16 rounded-full bg-[#6B1F22] text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <ShieldCheck size={36} />
                </div>
                <h3 className="font-playfair text-3xl font-bold text-[#2B1810] uppercase mb-2">
                  RESERVATION READY
                </h3>
                <p className="font-serif text-sm text-[#2B1810]/80 mb-6 leading-relaxed">
                  Your slot for <strong>{selectedCourt?.name}</strong> on <strong>{selectedMonth} {selectedDate}, {selectedYear}</strong> at <strong>{selectedTimeSlot}</strong> is reserved.
                </p>
                <button
                  type="button"
                  onClick={() => setIsBookedSuccess(false)}
                  className="w-full py-3.5 rounded-full bg-[#6B1F22] hover:bg-[#A64A2E] text-white font-playfair text-base tracking-wider transition-all shadow-md"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
