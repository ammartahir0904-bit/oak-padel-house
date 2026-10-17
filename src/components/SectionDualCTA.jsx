import React from 'react';

export default function SectionDualCTA({ onSelectService }) {
  const handleAction = (serviceName) => {
    if (onSelectService) {
      onSelectService(serviceName);
    }
    const el = document.getElementById('contact-us');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="dual-cta" className="relative w-full border-t border-[#E8B89A]/40 overflow-hidden bg-[#1A1008]">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 min-h-[500px] lg:min-h-[640px]">
        
        {/* LEFT HALF: Host Tournament */}
        <div className="relative w-full h-[380px] sm:h-[460px] md:h-full overflow-hidden flex items-center justify-center group">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          >
            <source src="/assets/section5/tournament_opt.mp4" type="video/mp4" />
            <source src="/assets/section5/tournament.mp4" type="video/mp4" />
          </video>
          
          {/* Overlay Dark Vignette */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />

          {/* Centered Pill Button: HOST TOURNAMENT (Black #1A1210) */}
          <div className="relative z-10 p-6">
            <button
              type="button"
              onClick={() => handleAction('Tournament')}
              className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-full bg-[#1A1210] hover:bg-[#2B1810] text-[#FFFFFF] border border-white/20 font-playfair font-medium text-base sm:text-lg md:text-xl tracking-[0.03em] uppercase shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              HOST TOURNAMENT
            </button>
          </div>
        </div>

        {/* RIGHT HALF: Book Your Shoot */}
        <div className="relative w-full h-[380px] sm:h-[460px] md:h-full overflow-hidden flex items-center justify-center group border-t md:border-t-0 md:border-l border-[#E8B89A]/20">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          >
            <source src="/assets/section5/shoot_opt.mp4" type="video/mp4" />
            <source src="/assets/section5/shoot.mp4" type="video/mp4" />
          </video>

          {/* Overlay Dark Vignette */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />

          {/* Centered Pill Button: BOOK YOUR SHOOT (White #FFFFFF with rust orange text) */}
          <div className="relative z-10 p-6">
            <button
              type="button"
              onClick={() => handleAction('Marketing Shoot')}
              className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-full bg-[#FFFFFF] hover:bg-[#F7F1E7] text-[#C97A3D] md:text-[#A64A2E] font-playfair font-medium text-base sm:text-lg md:text-xl tracking-[0.03em] uppercase shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              BOOK YOUR SHOOT
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
