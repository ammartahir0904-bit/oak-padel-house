import React, { useEffect, useRef } from 'react';
import { Maximize2 } from 'lucide-react';
import { siteContent } from '../data/content';

const MAX_TRAIL_ITEMS = 5;

const TRAIL_IMAGES = [
  '/assets/section3/1.png',
  '/assets/section3/2.png',
  '/assets/section3/3.png',
  '/assets/section3/4.png',
  '/assets/section3/5.png',
  '/assets/section3/6.png',
  '/assets/section3/7.png',
  '/assets/section3/8.png',
  '/assets/section3/9.png',
];

export default function SectionMemories({ onOpenBooking, onOpenEvent, onSelectImage }) {
  const stageRef = useRef(null);
  const trailContainerRef = useRef(null);
  const activeTrailRef = useRef([]);
  const trailIndexRef = useRef(0);
  const lastCursorRef = useRef({ x: 0, y: 0 });
  const isThrottledRef = useRef(false);

  const images = siteContent.section3.images;

  useEffect(() => {
    const stage = stageRef.current;
    const trailContainer = trailContainerRef.current;
    if (!stage || !trailContainer) return;

    // Preload trail images
    TRAIL_IMAGES.forEach((src) => {
      const im = new Image();
      im.src = src;
    });

    const removeTrailItem = (el) => {
      if (!el) return;
      el.classList.remove('is-active');
      el.classList.add('is-fading');
      setTimeout(() => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }, 700);
    };

    const spawnTrailItem = (x, y) => {
      const rect = stage.getBoundingClientRect();
      const relX = x - rect.left;
      const relY = y - rect.top;

      const rot = (Math.random() * 16 - 8).toFixed(1);

      const item = document.createElement('div');
      item.className = 'cursor-trail-item';
      item.style.left = `${relX}px`;
      item.style.top = `${relY}px`;
      item.style.setProperty('--rot', `${rot}deg`);

      const img = document.createElement('img');
      img.src = TRAIL_IMAGES[trailIndexRef.current % TRAIL_IMAGES.length];
      img.alt = 'The Oak Memories Preview';
      item.appendChild(img);

      trailContainer.appendChild(item);
      activeTrailRef.current.push(item);
      trailIndexRef.current++;

      requestAnimationFrame(() => {
        item.classList.add('is-active');
      });

      // STRICT CAP: max 5 active trail items
      while (activeTrailRef.current.length > MAX_TRAIL_ITEMS) {
        const oldest = activeTrailRef.current.shift();
        removeTrailItem(oldest);
      }

      // Auto fade out after 2.2 seconds
      setTimeout(() => {
        const idx = activeTrailRef.current.indexOf(item);
        if (idx !== -1) {
          activeTrailRef.current.splice(idx, 1);
          removeTrailItem(item);
        }
      }, 2200);
    };

    const handleMouseMove = (e) => {
      const dist = Math.hypot(e.clientX - lastCursorRef.current.x, e.clientY - lastCursorRef.current.y);
      if (dist > 75 && !isThrottledRef.current) {
        lastCursorRef.current = { x: e.clientX, y: e.clientY };
        spawnTrailItem(e.clientX, e.clientY);
        isThrottledRef.current = true;
        setTimeout(() => {
          isThrottledRef.current = false;
        }, 60);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        const dist = Math.hypot(t.clientX - lastCursorRef.current.x, t.clientY - lastCursorRef.current.y);
        if (dist > 65 && !isThrottledRef.current) {
          lastCursorRef.current = { x: t.clientX, y: t.clientY };
          spawnTrailItem(t.clientX, t.clientY);
          isThrottledRef.current = true;
          setTimeout(() => {
            isThrottledRef.current = false;
          }, 80);
        }
      }
    };

    stage.addEventListener('mousemove', handleMouseMove);
    stage.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      stage.removeEventListener('mousemove', handleMouseMove);
      stage.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div id="memories" className="w-full">
      {/* SECTION 3 — MEMORIES CTA: Cream/Sand Background (#F5ECD7), min padding 96px, thin 1px #E8B89A border */}
      <section className="relative w-full min-h-[90vh] bg-[#F5ECD7] text-[#1A1008] border-t border-[#E8B89A] py-24 md:py-36 flex items-center justify-center overflow-hidden select-none">
        <div
          ref={stageRef}
          className="cursor-trail-stage w-full flex flex-col items-center justify-center text-center px-6 md:px-12"
        >
          {/* Dynamic Cursor Photo Trail */}
          <div ref={trailContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-10" />

          {/* Centered Content */}
          <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center">
            {/* Sub-label above headline: "MOVE YOUR CURSOR" (Increased by 40%) */}
            <span className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-[0.38em] text-[#A84A25] block mb-8 font-sans">
              MOVE YOUR CURSOR
            </span>

            {/* Main headline: "LETS CREATE SOME MEMORIES !" with Trobosh Artistic Typography (Increased by 40%) */}
            <div className="w-full max-w-4xl md:max-w-5xl px-4 my-4 mb-12 flex justify-center items-center">
              <img
                src="/assets/section3/trobosh_title_transparent.png"
                alt="LETS CREATE SOME MEMORIES !"
                className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl h-auto object-contain pointer-events-none select-none drop-shadow-sm scale-110 md:scale-125 transition-transform"
              />
            </div>

            {/* Two Side-by-Side Pill Buttons (Increased by 40%) */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pointer-events-auto mt-4">
              {/* Button 1: Terracotta Filled */}
              <button
                onClick={onOpenBooking}
                className="px-10 sm:px-12 py-4 sm:py-5 bg-[#A84A25] hover:bg-[#8f3c1b] text-white text-sm sm:text-base md:text-lg font-semibold uppercase tracking-[0.14em] rounded-full transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl"
              >
                Book Your Court
              </button>

              {/* Button 2: Crisp White Pill with Shadow */}
              <button
                onClick={onOpenEvent}
                className="px-10 sm:px-12 py-4 sm:py-5 bg-white hover:bg-[#faf6f0] text-[#2B150A] text-sm sm:text-base md:text-lg font-semibold uppercase tracking-[0.14em] rounded-full transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl border border-black/5"
              >
                Host Event
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
