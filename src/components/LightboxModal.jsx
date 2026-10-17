import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

export default function LightboxModal({ image, onClose, onNext, onPrev }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onNext, onPrev]);

  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-[#9E1B1B] text-white transition-colors"
        aria-label="Close Preview"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next controls */}
      <button
        onClick={onPrev}
        className="absolute left-4 md:left-8 z-50 p-3 rounded-full bg-white/10 hover:bg-[#9E1B1B] text-white transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 md:right-8 z-50 p-3 rounded-full bg-white/10 hover:bg-[#9E1B1B] text-white transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image display */}
      <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
        <img
          src={image.src}
          alt={image.title}
          className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl border border-white/10"
        />
        <div className="mt-4 text-center">
          <span className="text-xs uppercase font-mono tracking-widest text-amber-300">
            {image.tag} • ARCHIVE 0{image.id}
          </span>
          <h4 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase tracking-wider mt-1">
            {image.title}
          </h4>
        </div>
      </div>
    </div>
  );
}
