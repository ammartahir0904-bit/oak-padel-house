import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 181;
const HERO_LERP = 0.14;

export default function SectionHero({ onOpenBooking }) {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const letsPlayRef = useRef(null);
  const downScrollRef = useRef(null);
  const captionsRef = useRef([]);

  const framesRef = useRef([]);
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let isMounted = true;

    // 1. Preload 181 frames
    const preloadFrames = () => {
      const frames = [];
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = `/frames/frame_${String(i).padStart(4, '0')}.webp`;
        img.onload = () => {
          if (!isMounted) return;
          loadedCountRef.current++;
          if (loadedCountRef.current === 1) {
            drawFrame(0);
          }
          if (loadedCountRef.current >= 20 && !isLoaded) {
            setIsLoaded(true);
          }
        };
        img.onerror = () => {
          if (!isMounted) return;
          loadedCountRef.current++;
        };
        frames.push(img);
      }
      framesRef.current = frames;
    };

    preloadFrames();

    // 2. High-DPI canvas resizing and cover math
    const resizeCanvas = () => {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(Math.round(currentFrameRef.current));
    };

    const drawFrame = (idx) => {
      if (!canvas || !ctx) return;
      const frames = framesRef.current;
      const frameIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, idx));
      const img = frames[frameIdx];

      if (!img || !img.complete || !img.naturalWidth) return;

      const cw = canvas.width / (window.devicePixelRatio || 1);
      const ch = canvas.height / (window.devicePixelRatio || 1);
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;

      let sw, sh, sx, sy;
      if (imgRatio > canvasRatio) {
        sh = img.naturalHeight;
        sw = sh * canvasRatio;
        sx = (img.naturalWidth - sw) / 2;
        sy = 0;
      } else {
        sw = img.naturalWidth;
        sh = sw / canvasRatio;
        sx = 0;
        sy = (img.naturalHeight - sh) / 2;
      }

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 3. Caption windowing helper
    const win = (p, a, b, f = 0.04) => {
      if (p < a - f || p > b + f) return 0;
      if (p < a) return (p - (a - f)) / f;
      if (p > b) return 1 - (p - b) / f;
      return 1;
    };

    const updateCaptions = (p) => {
      const ranges = [
        { a: 0.0, b: 0.14 },
        { a: 0.20, b: 0.40 },
        { a: 0.44, b: 0.64 },
        { a: 0.68, b: 0.86 },
        { a: 0.89, b: 1.0 },
      ];

      captionsRef.current.forEach((cap, i) => {
        if (!cap) return;
        const range = ranges[i];
        const opacity = win(p, range.a, range.b);
        cap.style.opacity = opacity;
        cap.style.transform = `translateY(${(1 - opacity) * 16}px)`;
        cap.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
      });

      // Overlay badges fade out
      if (letsPlayRef.current) {
        const lpOpacity = Math.max(0, 1 - p / 0.12);
        letsPlayRef.current.style.opacity = lpOpacity;
        letsPlayRef.current.style.transform = `translateY(${-p * 40}px)`;
      }

      if (downScrollRef.current) {
        const dsOpacity = Math.max(0, 1 - p / 0.1);
        downScrollRef.current.style.opacity = dsOpacity;
      }
    };

    // 4. GSAP ScrollTrigger for pinning and progress tracking
    const container = containerRef.current;
    const stage = stageRef.current;

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      pin: stage,
      anticipatePin: 1,
      onUpdate: (self) => {
        targetFrameRef.current = self.progress * (TOTAL_FRAMES - 1);
        updateCaptions(self.progress);
      },
    });

    // 5. Render loop with LERP interpolation
    const render = () => {
      currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * HERO_LERP;
      const idx = Math.round(currentFrameRef.current);
      drawFrame(idx);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animId);
      st.kill();
    };
  }, [isLoaded]);

  return (
    <section id="hero" ref={containerRef} className="relative w-full h-[500vh] bg-[#1A1008]">
      {/* Pinned Stage */}
      <div
        ref={stageRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#1A1008]"
      >
        {/* Main Animation Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Subtle Scrim Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1008]/90 via-[#1A1008]/30 to-[#1A1008]/60 pointer-events-none z-[1]" />

        {/* Floating "LET'S PLAY" Overlay on Hero */}
        <div
          ref={letsPlayRef}
          className="absolute top-28 md:top-32 short:top-20 left-6 md:left-12 z-20 pointer-events-none transition-opacity"
        >
          <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.3em] text-[#E8B89A] px-3.5 py-1.5 rounded-full border border-[#E8B89A]/40 bg-[#1A1008]/70 backdrop-blur-sm shadow-md">
            LET'S PLAY
          </span>
        </div>

        {/* Constantly Rotating Circular "SCROLL DOWN" Indicator (Centered at Bottom) */}
        <div
          ref={downScrollRef}
          className="absolute left-1/2 -translate-x-1/2 bottom-4 sm:bottom-6 md:bottom-8 short:bottom-2 z-20 pointer-events-none transition-opacity"
        >
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 short:w-20 short:h-20 flex items-center justify-center">
            <svg
              className="w-full h-full animate-[spin_12s_linear_infinite]"
              viewBox="0 0 100 100"
            >
              <path
                id="scrollCirclePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text className="text-[9.5px] font-sans font-bold tracking-[0.24em] fill-[#FFFFFF] uppercase">
                <textPath href="#scrollCirclePath" startOffset="0%">
                  • SCROLL DOWN • SCROLL DOWN
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-ping" />
            </div>
          </div>
        </div>

        {/* Captions Overlay Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full h-full flex items-center justify-center pointer-events-none">
          {/* Caption 0: Intro Hero (Centered in Screen) */}
          <div
            ref={(el) => (captionsRef.current[0] = el)}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 opacity-100 will-change-transform"
          >
            <span className="text-xs md:text-sm uppercase tracking-[0.28em] font-semibold text-white/90 block mb-3 font-sans">
              EXPERIENCE A REFRESHING
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl short:text-5xl font-bold tracking-tight text-white uppercase leading-[0.95] mb-4 short:mb-2 drop-shadow-md">
              GAME OF PADEL
            </h1>
            <p className="font-serif text-lg sm:text-2xl md:text-3xl short:text-xl italic tracking-wide text-white/95 font-normal">
              In Our Tranquil Nature Inspired Court
            </p>
          </div>

          {/* Caption 1: 01 - BOOK YOUR PRIVATE COURT (Left-Aligned) */}
          <div
            ref={(el) => (captionsRef.current[1] = el)}
            className="absolute bottom-20 md:bottom-28 short:bottom-8 left-6 md:left-12 max-w-xl text-left opacity-0 will-change-transform"
          >
            <span className="text-xs md:text-sm uppercase tracking-[0.25em] font-semibold text-white/90 block mb-2 font-sans">
              01 - BOOK YOUR
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl short:text-3xl font-bold tracking-tight text-white uppercase mb-4 short:mb-2 drop-shadow-sm">
              PRIVATE COURT
            </h2>
            <p className="text-sm md:text-base text-white/90 leading-relaxed font-sans max-w-lg">
              Enjoy Time With Your Family In Our Private Court , Filled With Laughter , Friends And Thrill Of Padel !
            </p>
          </div>

          {/* Caption 2: 02 - HOST YOUR PADEL TOURNAMENT (Left-Aligned) */}
          <div
            ref={(el) => (captionsRef.current[2] = el)}
            className="absolute bottom-20 md:bottom-28 short:bottom-8 left-6 md:left-12 max-w-xl text-left opacity-0 will-change-transform"
          >
            <span className="text-xs md:text-sm uppercase tracking-[0.25em] font-semibold text-white/90 block mb-2 font-sans">
              02 - HOST YOUR
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl short:text-3xl font-bold tracking-tight text-white uppercase mb-4 short:mb-2 drop-shadow-sm">
              PADEL TOURNAMENT
            </h2>
            <p className="text-sm md:text-base text-white/90 leading-relaxed font-sans max-w-lg">
              Our Multi Court Indoor / Outddor Facilities Allow You To Host A Grand Tournament For Marketing Branding , Or Corporate Purposes .
            </p>
          </div>

          {/* Caption 3: 03 - SHOOT YOUR MARKETING CAMPAIGN (Left-Aligned) */}
          <div
            ref={(el) => (captionsRef.current[3] = el)}
            className="absolute bottom-20 md:bottom-28 short:bottom-8 left-6 md:left-12 max-w-xl text-left opacity-0 will-change-transform"
          >
            <span className="text-xs md:text-sm uppercase tracking-[0.25em] font-semibold text-white/90 block mb-2 font-sans">
              03 - SHOOT YOUR
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl short:text-3xl font-bold tracking-tight text-white uppercase mb-4 short:mb-2 drop-shadow-sm">
              MARKETING CAMPAIGN
            </h2>
            <p className="text-sm md:text-base text-white/90 leading-relaxed font-sans max-w-lg">
              Our Oak Interior Blended With Terracot Court Serves As The Perfect Backdrop That Your Brand Needs .
            </p>
          </div>

          {/* Caption 4: 04 - YOUR COURT IS READY / LET'S PLAY ! (Right-Aligned) */}
          <div
            ref={(el) => (captionsRef.current[4] = el)}
            className="absolute bottom-20 md:bottom-28 short:bottom-8 right-6 md:right-12 max-w-xl text-right flex flex-col items-end opacity-0 will-change-transform pointer-events-auto"
          >
            <span className="text-xs md:text-sm uppercase tracking-[0.25em] font-semibold text-white/90 block mb-2 font-sans">
              YOUR COURT IS READY
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl short:text-3xl font-bold tracking-tight text-white uppercase mb-6 short:mb-3 drop-shadow-sm">
              LETS PLAY !
            </h2>
            <button
              onClick={onOpenBooking}
              className="px-7 py-3 bg-[#991B1B] hover:bg-[#b91c1c] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-md transition-all duration-300 active:scale-95 shadow-md"
            >
              BOOK A COURT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
