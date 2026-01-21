import React from "react";

const HeroSection = () => {
  return (
    /* Hero Container */
    <section className="relative min-h-[500px] bg-black text-white flex items-center overflow-hidden rounded-none">
      {/* Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/images/banner.png"
          alt="Banner"
          className="absolute right-0 bottom-0 h-full w-full object-cover opacity-50 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent w-full lg:w-3/4" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full px-6 lg:px-20 py-20 flex flex-col items-start text-left">
        <div className="max-w-3xl">
          {/* Sub Title */}
          <span className="text-[12px] font-black tracking-[0.4em] uppercase mb-6 block text-gray-400">
            Exclusive Access
          </span>

          {/* Main Title */}
          <h2 className="text-[40px] lg:text-[60px] font-black leading-[1.1] mb-8 tracking-tighter uppercase break-keep">
            Limited <br /> Edition Ticket
          </h2>

          {/* Description */}
          <p className="text-[14px] lg:text-[16px] text-gray-400 mb-10 max-w-sm font-light leading-relaxed">
            오직 당신만을 위해 선별된 한정판 입장권. <br />
            감각적인 제안과 특별한 기회를 지금 확보하십시오.
          </p>

          {/* Action Button */}
          <button className="group flex items-center gap-4 text-[13px] font-bold tracking-widest uppercase border border-white px-10 py-5 hover:bg-white hover:text-black transition-all duration-300">
            View All Deals
            <svg
              width="18"
              height="8"
              viewBox="0 0 18 8"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-2"
            >
              <path
                d="M17.3536 4.35355C17.5488 4.15829 17.5488 3.84171 17.3536 3.64645L14.1716 0.464466C13.9763 0.269204 13.6597 0.269204 13.4645 0.464466C13.2692 0.659728 13.2692 0.976311 13.4645 1.17157L16.2929 4L13.4645 6.82843C13.2692 7.02369 13.2692 7.34027 13.4645 7.53553C13.6597 7.7308 13.9763 7.7308 14.1716 7.53553L17.3536 4.35355ZM0 4.5H17V3.5H0V4.5Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
