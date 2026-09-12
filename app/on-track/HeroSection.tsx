'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function InteractiveHighlight({ children }: { children: React.ReactNode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <span
      className="relative inline-block font-serif italic font-normal text-[#136CFC] cursor-pointer group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <span
          className="absolute pointer-events-none rounded-full bg-[#136CFC]/30 blur-md transition-opacity duration-300 -z-10"
          style={{
            width: '60px',
            height: '60px',
            top: `${mousePosition.y - 30}px`,
            left: `${mousePosition.x - 30}px`,
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </span>
  );
}

function BackgroundAtmosphereAndRain() {
  const [raindrops, setRaindrops] = useState<Array<{ left: number; duration: number; delay: number; opacity: number }>>([]);

  useEffect(() => {
    const drops = Array.from({ length: 45 }).map(() => ({
      left: Math.random() * 100,
      duration: 0.5 + Math.random() * 0.7,
      delay: Math.random() * 2,
      opacity: 0.25 + Math.random() * 0.45,
    }));
    setRaindrops(drops);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <motion.div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(to right, #136CFC 1px, transparent 1px), linear-gradient(to bottom, #136CFC 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {raindrops.map((drop, i) => (
        <motion.div
          key={i}
          className="absolute top-[-20px] w-[2px] h-[35px] bg-gradient-to-b from-transparent via-[#136CFC] to-[#0A47B1] rounded-full"
          style={{
            left: `${drop.left}%`,
            opacity: drop.opacity,
          }}
          animate={{
            y: ['0vh', '110vh'],
          }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            delay: drop.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

function InfiniteScrollingQuote() {
  const quoteText = "“ WHEN YOU SUFFER ON THE BIKE, YOU KNOW YOU ARE ALIVE. EVERY ATTACK IN THE MOUNTAINS IS AN ACT OF PURE FAITH. ”";

  return (
    <div className="absolute top-[68%] left-0 w-full overflow-hidden pointer-events-none z-15 whitespace-nowrap opacity-20 select-none">
      <motion.div
        className="inline-block font-black font-mono text-6xl sm:text-8xl uppercase tracking-widest text-[#0D0D0D] animate-pulse"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <span>{quoteText} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {quoteText} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
      </motion.div>
    </div>
  );
}

function BloomingFlowersFromGrass() {
  return (
    <div className="absolute bottom-16 sm:bottom-24 left-0 w-full overflow-visible pointer-events-none h-[45vh] z-30 flex items-end justify-between px-10 md:px-24">
      {[1, 2, 3, 4, 5, 6].map((_, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 60 140"
          className="w-12 h-32 sm:w-20 sm:h-48 stroke-[#136CFC] fill-none stroke-[2.5]"
          initial={{ pathLength: 0, opacity: 0, scale: 0.3, y: 80 }}
          animate={{ pathLength: 1, opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 3,
            delay: i * 0.3,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        >
          <path d="M30 140 Q 20 80, 30 35" />
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 1.2 + i * 0.2 }}
          >
            <circle cx="30" cy="25" r="7" className="stroke-[#136CFC] fill-white" />
            <path d="M30 18 Q 18 10, 22 2" />
            <path d="M30 18 Q 42 10, 38 2" />
            <path d="M18 25 Q 8 20, 4 27" />
            <path d="M42 25 Q 52 20, 56 27" />
          </motion.g>
        </motion.svg>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-[110vh] bg-[#E8F4FC] pt-36 px-6 md:px-16 flex flex-col justify-between overflow-hidden z-10">
      <BackgroundAtmosphereAndRain />
      <InfiniteScrollingQuote />

      <motion.div 
        className="absolute inset-0 w-full h-full z-20 pointer-events-none overflow-hidden flex items-end justify-end"
        animate={{ scale: [1, 1.02, 1], y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <img 
          src="/img/ontrack/principal.png" 
          alt="Sergio Higuita On Track" 
          className="w-full h-full object-cover object-center drop-shadow-2xl"
        />
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-[#E8F4FC] via-[#E8F4FC]/80 to-transparent pointer-events-none z-25" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-4">
        <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border border-[#136CFC]/30 px-4 py-1.5 rounded-full shadow-sm w-fit">
          <span className="w-2 h-2 rounded-full bg-[#136CFC] animate-ping" />
          <span className="text-[10px] font-mono font-bold text-[#136CFC] tracking-[0.3em] uppercase">
            PROFESSIONAL CAREER // PALMARES & STATS
          </span>
        </div>

        <h1 className="text-7xl sm:text-9xl md:text-[13rem] font-black uppercase tracking-tighter text-[#0D0D0D] leading-none select-none drop-shadow-md">
          ON <span className="font-serif italic font-light text-[#136CFC]">TRACK.</span>
        </h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-3xl z-40 relative"
        >
          <span className="text-[11px] font-mono font-bold text-gray-500 tracking-[0.3em] uppercase block mb-1">
            THE EL MONSTER WAY
          </span>
          <p className="text-xl sm:text-2xl font-sans text-[#0D0D0D] leading-relaxed font-medium">
            Since stepping into the World Tour peloton, Sergio Higuita has always raced with his heart on his sleeve, pushing limits and taking the{' '}
            <InteractiveHighlight>fight to every climb</InteractiveHighlight>.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-6 md:left-16 z-40 flex items-center gap-4 cursor-pointer group" onClick={scrollToContent}>
        <div className="w-8 h-12 rounded-full border-2 border-[#0D0D0D]/40 flex justify-center p-1 group-hover:border-[#136CFC] transition-colors">
          <motion.div 
            className="w-1.5 h-3 bg-[#A3E635] rounded-full shadow-[0_0_8px_#A3E635]"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#0D0D0D] group-hover:text-[#136CFC] transition-colors">
          Scroll Down
        </span>
      </div>

      <div className="absolute top-[28%] right-[6%] z-40 flex flex-col gap-3.5 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md border border-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-6">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">HEIGHT</span>
          <span className="text-lg font-bold font-mono text-[#0D0D0D]">1.66 m</span>
        </div>
        <div className="bg-white/90 backdrop-blur-md border border-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-6">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">WEIGHT</span>
          <span className="text-lg font-bold font-mono text-[#0D0D0D]">57 kg</span>
        </div>
        <div className="bg-white/90 backdrop-blur-md border border-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-6">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">AGE</span>
          <span className="text-lg font-bold font-mono text-[#136CFC]">28 Yrs</span>
        </div>
        <div className="bg-[#0D0D0D]/95 backdrop-blur-md border border-white/20 px-6 py-3.5 rounded-2xl shadow-xl text-white">
          <span className="block text-[9px] font-mono text-gray-400 uppercase tracking-widest">ORIGIN // STATUS</span>
          <span className="text-xs font-bold font-mono text-[#136CFC]">Antioquia, Colombia 🇨🇴 // World Tour Pro</span>
        </div>
      </div>

      <BloomingFlowersFromGrass />
    </section>
  );
}