import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function SectionContact({ selectedInquiry }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: selectedInquiry || 'General Inquiry',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Update service if prop changes
  React.useEffect(() => {
    if (selectedInquiry) {
      setFormData((prev) => ({ ...prev, service: selectedInquiry }));
    }
  }, [selectedInquiry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact-us" className="relative w-full py-20 md:py-28 bg-[#1A1008] border-t border-[#E8B89A]/30 text-[#F5DEC8]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[#C97A3D] font-sans text-xs uppercase tracking-[0.28em] font-semibold block mb-2">
            DIRECT CONCIERGE &amp; INQUIRIES
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FFFFFF] tracking-wide uppercase font-medium">
            CONTACT US
          </h2>
          <div className="w-16 h-[2px] bg-[#A64A2E] mx-auto mt-4" />
        </div>

        {/* 2-Column Grid: Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Venue Details */}
          <div className="lg:col-span-5 space-y-8 bg-[#2B1810]/60 p-8 sm:p-10 rounded-[28px] border border-[#A64A2E]/25 backdrop-blur-sm shadow-xl">
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider text-[#FFFFFF] block mb-1">
                The Oak Padel House
              </span>
              <p className="text-sm font-serif text-[#E8B89A] leading-relaxed">
                A sanctuary of classical proportion, championship padel, and refined hospitality.
              </p>
            </div>

            <div className="space-y-5 text-sm font-serif text-[#F5DEC8]/90">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#6B1F22]/40 border border-[#6B1F22] flex items-center justify-center text-[#C97A3D] shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-0.5">Location</h4>
                  <p className="text-xs text-[#E8B89A]/80 leading-relaxed">
                    Oak Pavilions, 442 Terracotta Way, Palm Grove
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#6B1F22]/40 border border-[#6B1F22] flex items-center justify-center text-[#C97A3D] shrink-0 mt-0.5">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-0.5">Club Hours</h4>
                  <p className="text-xs text-[#E8B89A]/80 leading-relaxed">
                    Monday – Sunday: 6:00 AM – 12:00 Midnight
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#6B1F22]/40 border border-[#6B1F22] flex items-center justify-center text-[#C97A3D] shrink-0 mt-0.5">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-0.5">Concierge Email</h4>
                  <p className="text-xs text-[#E8B89A]/80 leading-relaxed">
                    concierge@theoakpadel.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#6B1F22]/40 border border-[#6B1F22] flex items-center justify-center text-[#C97A3D] shrink-0 mt-0.5">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-0.5">Direct Line</h4>
                  <p className="text-xs text-[#E8B89A]/80 leading-relaxed">
                    +1 (800) 843-6257 (THE-OAKP)
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs font-serif text-[#E8B89A]/60">
              Private court hire, brand productions, tournament sanctioning, and bespoke corporate events.
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-[#EFE6D8] p-8 sm:p-10 md:p-12 rounded-[28px] shadow-2xl border border-[#A64A2E]/30 text-[#2B1810]">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#6B1F22] text-white flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-playfair text-3xl font-bold uppercase text-[#2B1810]">
                  MESSAGE RECEIVED
                </h3>
                <p className="font-serif text-sm text-[#2B1810]/80 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name || 'valued guest'}</strong>. Our master concierge will respond to your inquiry regarding <strong>{formData.service}</strong> within 2 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      service: 'General Inquiry',
                      message: '',
                    });
                  }}
                  className="mt-6 px-8 py-3 rounded-full bg-[#6B1F22] hover:bg-[#A64A2E] text-white font-playfair text-sm tracking-wider transition-all"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#2B1810] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Sebastian Vance"
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#2B1810]/20 text-[#2B1810] font-serif text-sm focus:outline-none focus:ring-2 focus:ring-[#C97A3D] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#2B1810] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="sebastian@vance.com"
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#2B1810]/20 text-[#2B1810] font-serif text-sm focus:outline-none focus:ring-2 focus:ring-[#C97A3D] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#2B1810] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 019-2834"
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#2B1810]/20 text-[#2B1810] font-serif text-sm focus:outline-none focus:ring-2 focus:ring-[#C97A3D] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#2B1810] mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#2B1810]/20 text-[#2B1810] font-serif text-sm focus:outline-none focus:ring-2 focus:ring-[#C97A3D] transition-all"
                    >
                      <option value="Tournament">Host Tournament</option>
                      <option value="Marketing Shoot">Book Commercial Shoot</option>
                      <option value="Private Court Booking">Private Court Reservation</option>
                      <option value="Corporate Event">Corporate / Private Event</option>
                      <option value="Membership">Membership Consultation</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#2B1810] mb-1.5">
                    Your Message / Specific Requirements *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details regarding court preferences, group size, equipment needs, or dates..."
                    className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#2B1810]/20 text-[#2B1810] font-serif text-sm focus:outline-none focus:ring-2 focus:ring-[#C97A3D] transition-all"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-[#6B1F22] hover:bg-[#A64A2E] text-white font-playfair font-medium text-base sm:text-lg tracking-[0.03em] shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>{loading ? 'Submitting...' : 'Submit Inquiry'}</span>
                    <Send size={18} />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
