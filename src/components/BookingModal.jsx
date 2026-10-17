import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    court: 'Court 01 — Sunset Terracotta',
    slot: '06:30 PM - 08:00 PM',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      colors: ['#C4622D', '#D4845A', '#E8B89A', '#F5DEC8'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1008]/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#1A1008] border border-[#E8B89A] rounded-2xl overflow-hidden text-[#F5DEC8]">
        {/* Header */}
        <div className="p-6 border-b border-[#E8B89A]/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#E8B89A] font-sans font-semibold">
              The Oak Padel House
            </span>
            <h3 className="font-serif text-2xl font-bold uppercase tracking-wide mt-0.5 text-[#F5DEC8]">
              Reserve Your Court
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full border border-[#E8B89A]/30 hover:border-[#C4622D] hover:text-[#C4622D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 font-sans">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full border border-[#C4622D] bg-[#C4622D]/20 text-[#C4622D] mx-auto flex items-center justify-center">
                <Check className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-3xl font-bold text-[#F5DEC8] uppercase">
                Court Reserved !
              </h4>
              <p className="text-xs sm:text-sm text-[#F5DEC8]/80 max-w-xs mx-auto leading-relaxed">
                Thank you, <strong>{formData.name || 'Padel Player'}</strong>. Your booking details have been confirmed.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-8 py-3 bg-[#C4622D] hover:bg-[#a84e20] text-[#F5DEC8] text-xs font-semibold uppercase tracking-widest rounded-full border border-[#C4622D]"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#E8B89A] block mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Marcus Vance"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8B89A]/40 bg-[#1A1008] text-[#F5DEC8] focus:border-[#C4622D] focus:outline-none text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#E8B89A] block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@email.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8B89A]/40 bg-[#1A1008] text-[#F5DEC8] focus:border-[#C4622D] focus:outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#E8B89A] block mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8B89A]/40 bg-[#1A1008] text-[#F5DEC8] focus:border-[#C4622D] focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#E8B89A] block mb-1.5">
                  Select Court
                </label>
                <select
                  value={formData.court}
                  onChange={(e) => setFormData({ ...formData, court: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E8B89A]/40 bg-[#1A1008] text-[#F5DEC8] focus:border-[#C4622D] focus:outline-none text-xs"
                >
                  <option value="Court 01 — Sunset Terracotta">Court 01 — Sunset Terracotta</option>
                  <option value="Court 02 — The Oak Pavilion">Court 02 — The Oak Pavilion</option>
                  <option value="Court 03 — Center Court">Court 03 — Center Court</option>
                </select>
              </div>

              <div className="pt-4 border-t border-[#E8B89A]/20 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#C4622D] hover:bg-[#a84e20] text-[#F5DEC8] text-xs font-semibold uppercase tracking-widest rounded-full border border-[#C4622D] transition-colors"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
