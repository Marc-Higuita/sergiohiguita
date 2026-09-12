'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', label: '01 // HERO' },
  { id: 'quote', label: '02 // QUOTE' },
  { id: 'victories', label: '03 // VICTORIES' },
  { id: 'track', label: '04 // ON/OFF TRACK' },
  { id: 'teams', label: '05 // TEAMS' },
];

export default function ScrollProgress() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollPercent(scrolled);

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((sec, index) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const sectionHeight = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + sectionHeight) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-5 p-3 rounded-full bg-[#152641]/75 backdrop-blur-xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.35)] select-none pointer-events-auto transition-colors duration-300">
      
      {/* BARRA DE PROGRESO DE SCROLL CON DEGRADADO OFICIAL HIGUITA (VERDE NEÓN -> AZUL ELÉCTRICO) */}
      <div className="relative w-[3px] h-36 bg-white/15 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-gradient-to-b from-[#C3F84A] via-[#136CFC] to-[#C3F84A] shadow-[0_0_12px_#C3F84A]"
          style={{ height: `${scrollPercent}%` }}
          transition={{ ease: 'easeOut', duration: 0.1 }}
        />
      </div>

      {/* PUNTOS INTERACTIVOS DE NAVEGACIÓN */}
      <div className="flex flex-col gap-3.5 items-center">
        {sections.map((sec, index) => {
          const isActive = activeSection === index;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="group relative flex items-center justify-center p-0.5 cursor-pointer focus:outline-none"
              aria-label={sec.label}
            >
              {/* ETIQUETA TOOLTIP CON TIPOGRAFÍA HIGUITA */}
              <span className="absolute right-9 text-[10px] font-mono font-bold tracking-widest text-[#C3F84A] bg-[#152641]/95 backdrop-blur-md px-3 py-1 rounded-lg border border-[#C3F84A]/30 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-lg">
                {sec.label}
              </span>

              {/* PUNTO CON RESPLANDOR SEGÚN ESTADO */}
              <div
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-3.5 h-3.5 bg-[#C3F84A] shadow-[0_0_12px_#C3F84A]'
                    : 'w-2 h-2 bg-white/40 hover:bg-[#C3F84A]/80 hover:scale-125'
                }`}
              />

              {/* ANILLO DE PULSO SÍNCRONO */}
              {isActive && (
                <span className="absolute w-5 h-5 rounded-full border border-[#C3F84A]/60 animate-ping pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

    </aside>
  );
}