import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    stepNum: '01 -',
    title: 'SELECT\nYOUR COURT',
    image: '/assets/section2/Select Your Court.jpeg',
    textPos: 'items-center justify-center text-center',
  },
  {
    stepNum: '02 -',
    title: 'SELECT\nYOUR DAY',
    image: '/assets/section2/Select Your Day.jpeg',
    textPos: 'items-start justify-start pt-10 pl-8 text-left',
  },
  {
    stepNum: '03 -',
    title: 'SELECT YOUR SLOT',
    image: '/assets/section2/Select Your Slot.PNG',
    textPos: 'items-end justify-center pb-8 text-center',
  },
  {
    stepNum: '04 -',
    title: 'AND LETS PLAY !',
    image: '/assets/section2/And Lets Play.jpeg',
    textPos: 'items-start justify-center pt-8 text-center',
  },
];

export default function SectionProcess({ onOpenBooking }) {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const introRef = useRef(null);
  const stepCardsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    const ctx = gsap.context(() => {
      // Set initial states: Intro visible, all step cards hidden
      if (introRef.current) {
        gsap.set(introRef.current, { opacity: 1, scale: 1 });
      }

      stepCardsRef.current.forEach((card) => {
        if (card) {
          gsap.set(card, { opacity: 0, y: 30, scale: 0.96, pointerEvents: 'none' });
        }
      });

      // ScrollTrigger timeline for Section 2 with scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: stage,
          anticipatePin: 1,
        },
      });

      // 0. Intro -> Step 1
      tl.to(introRef.current, { opacity: 0, scale: 0.92, duration: 0.18, ease: 'power1.inOut' }, 0.08)
        .to(stepCardsRef.current[0], { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto', duration: 0.22, ease: 'power2.out' }, 0.16);

      // 1. Step 1 -> Step 2
      tl.to(stepCardsRef.current[0], { opacity: 0, y: -25, scale: 0.96, pointerEvents: 'none', duration: 0.18, ease: 'power1.inOut' }, 0.36)
        .to(stepCardsRef.current[1], { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto', duration: 0.22, ease: 'power2.out' }, 0.42);

      // 2. Step 2 -> Step 3
      tl.to(stepCardsRef.current[1], { opacity: 0, y: -25, scale: 0.96, pointerEvents: 'none', duration: 0.18, ease: 'power1.inOut' }, 0.60)
        .to(stepCardsRef.current[2], { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto', duration: 0.22, ease: 'power2.out' }, 0.66);

      // 3. Step 3 -> Step 4
      tl.to(stepCardsRef.current[2], { opacity: 0, y: -25, scale: 0.96, pointerEvents: 'none', duration: 0.18, ease: 'power1.inOut' }, 0.82)
        .to(stepCardsRef.current[3], { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto', duration: 0.22, ease: 'power2.out' }, 0.88);
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full h-[450vh] bg-white text-[#1A1008]"
    >
      {/* Pinned Stage for Section 2 */}
      <div
        ref={stageRef}
        className="relative w-full h-screen flex items-center overflow-hidden bg-white"
      >
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          
          {/* LEFT SIDE: Animation Video ("OUR PREMIUM COURTS") — Completely flush to left edge, 0 padding/space */}
          <div className="relative w-full h-[50vh] lg:h-full overflow-hidden bg-[#1A1008] shadow-2xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-center"
            >
              <source src="/assets/section2/animation_opt.mp4" type="video/mp4" />
              <source src="/assets/section2/ANIMATION.mp4" type="video/mp4" />
            </video>
          </div>

          {/* RIGHT SIDE: Interactive Scrolling UI/UX Cards (+20% larger image card) */}
          <div className="relative w-full h-[50vh] lg:h-full flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-14 xl:p-16 overflow-hidden">
            
            {/* 0. START INTRO: "THE PROCESS" */}
            <div
              ref={introRef}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 select-none will-change-transform"
            >
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-[0.18em] text-[#8C4B2E] uppercase">
                THE PROCESS
              </h2>
              <div className="w-[1.5px] h-16 sm:h-20 md:h-28 bg-[#8C4B2E]/60 my-6 sm:my-8" />
              <span className="font-sans text-xs sm:text-sm md:text-base font-medium tracking-[0.3em] uppercase text-[#8C4B2E]/75">
                SCROLL
              </span>
            </div>

            {/* 1-4. STEP CARDS (01 to 04) — +20% enlarged size */}
            {processSteps.map((step, i) => (
              <div
                key={step.stepNum}
                ref={(el) => (stepCardsRef.current[i] = el)}
                className="absolute inset-0 flex flex-col items-center justify-center p-2 sm:p-4 will-change-transform"
              >
                <div className="w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] lg:max-w-[500px] xl:max-w-[560px] flex flex-col">
                  {/* Step Label: e.g. 01 - */}
                  <div className="w-full text-left mb-2.5 sm:mb-3.5">
                    <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-[#8C4B2E]">
                      {step.stepNum}
                    </span>
                  </div>

                  {/* Card Container with Image & Typography Overlay (+20% size increase) */}
                  <div className="relative w-full aspect-[3/4] max-h-[calc(50vh-6rem)] lg:max-h-[78vh] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-2xl border border-stone-200 group">
                    <img
                      src={step.image}
                      alt={step.stepNum}
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Text Overlay */}
                    <div className={`absolute inset-0 p-6 sm:p-8 md:p-10 flex ${step.textPos} pointer-events-none`}>
                      <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl xl:text-[2.85rem] font-bold text-white tracking-wide leading-tight drop-shadow-[0_4px_14px_rgba(0,0,0,0.65)] whitespace-pre-line">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
