import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Warm up the first hero frames so the canvas is ready when the loader lifts
const PRELOAD_FRAMES = 20;
const MIN_DURATION = 3500;

// Perforation holes in a staggered grid, kept inside the hitting face
const HOLES = [];
for (let row = 0; row < 8; row++) {
  const y = 22 + row * 9.5;
  const offset = row % 2 ? 5 : 0;
  for (let x = 15 + offset; x <= 85; x += 10) {
    const dx = (x - 50) / 30;
    const dy = (y - 54) / 37;
    if (dx * dx + dy * dy <= 1) HOLES.push([x, y]);
  }
}

function PadelRacket({ className }) {
  return (
    <svg viewBox="0 0 100 182" className={className} aria-hidden="true">
      {/* Frame */}
      <path
        d="M50 4C77 4 95 23 95 51c0 28-18 50-45 54C23 101 5 79 5 51 5 23 23 4 50 4Z"
        fill="#C4622D"
      />
      {/* Hitting face */}
      <path
        d="M50 11c23 0 38 16 38 40 0 24-15 42-38 47-23-5-38-23-38-47 0-24 15-40 38-40Z"
        fill="#E8B89A"
      />
      {HOLES.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.4" fill="#1A1008" />
      ))}
      {/* Throat with open bridge */}
      <path
        fillRule="evenodd"
        d="M28 95 43 130h14l15-35-8 3-14 1-14-1ZM41 103l9 18 9-18-9 1Z"
        fill="#C4622D"
      />
      {/* Handle, grip wrap and butt cap */}
      <rect x="42" y="128" width="16" height="44" rx="4" fill="#C4622D" />
      <path
        d="M42 136l16-6M42 145l16-6M42 154l16-6M42 163l16-6"
        stroke="#1A1008"
        strokeWidth="1.6"
        opacity="0.45"
      />
      <rect x="39" y="169" width="22" height="9" rx="4" fill="#A64A2E" />
    </svg>
  );
}

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let loaded = 0;
    let finished = false;
    let timer;

    const finish = () => {
      if (finished) return;
      finished = true;
      loaded = PRELOAD_FRAMES;
      const wait = Math.max(0, MIN_DURATION - (performance.now() - start));
      timer = setTimeout(() => setDone(true), wait);
    };

    // Bar fills over MIN_DURATION, but never ahead of the actual frame loading
    const tick = setInterval(() => {
      const byTime = (performance.now() - start) / MIN_DURATION;
      const byLoad = loaded / PRELOAD_FRAMES;
      setProgress(Math.round(Math.min(1, byTime, byLoad) * 100));
    }, 50);

    const onFrame = () => {
      loaded++;
      if (loaded >= PRELOAD_FRAMES) finish();
    };

    for (let i = 1; i <= PRELOAD_FRAMES; i++) {
      const img = new Image();
      img.onload = onFrame;
      img.onerror = onFrame;
      img.src = `/frames/frame_${String(i).padStart(4, '0')}.webp`;
    }

    // Never trap the visitor behind the loader on a slow connection
    const fallback = setTimeout(finish, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallback);
      clearInterval(tick);
    };
  }, []);

  // Lock page scroll while the loader is visible
  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1A1008] text-[#F5DEC8]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] } }}
        >
          <motion.div
            style={{ transformOrigin: '50% 95%' }}
            animate={{ rotate: [-18, 18, -18] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <PadelRacket className="w-14 h-[102px] md:w-16 md:h-[116px]" />
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <span className="font-serif text-4xl md:text-5xl font-bold tracking-wider text-[#F5DEC8]">
              The Oak
            </span>
            <span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-[#C4622D] font-sans font-medium">
              Padel House • Est. 2024
            </span>

            <div className="mt-5 h-px w-40 md:w-48 bg-[#E8B89A]/20 overflow-hidden">
              <div
                className="h-full bg-[#E8B89A]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="mt-3 text-[9px] uppercase tracking-[0.35em] text-[#E8B89A]/70 font-sans">
              Preparing your court · {progress}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
