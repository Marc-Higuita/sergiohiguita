'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

export default function GlobalNavigationOverlay() {
  const { scrollYProgress } = useScroll();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollPosition(latest);
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      unsubscribe();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [scrollYProgress]);

  if (!isMounted) return null;

  const returnToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const returnToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.location.href = '/';
  };

  return (
    <div className="cursor-none">
      {/* 0. Cursor flotante global que reemplaza al puntero blanco por el icono exacto */}
      <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
        <motion.div
          className="absolute pointer-events-none text-[#C3F84A] drop-shadow-[0_0_10px_rgba(195,248,74,0.9)]"
          style={{ left: mousePos.x - 8, top: mousePos.y - 8 }}
          transition={{ type: 'spring', stiffness: 1200, damping: 50 }}
        >
          {/* SVG exacto del icono de montañas onduladas con punto flotante */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Punto superior */}
            <circle cx="16.5" cy="7.5" r="2" fill="currentColor" />
            {/* Curva de las montañas / ondas */}
            <path 
              d="M3.5 18.5C5.5 15.5 7.5 13.5 9.5 16.5C11.5 19.5 14 10.5 16.5 9.5C18.5 8.7 20 11.5 21.5 18.5" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </motion.div>
      </div>

      {/* 1. Mini avisito translúcido adaptativo abajo a la izquierda */}
      <div className="fixed bottom-6 left-6 md:left-12 z-50 pointer-events-auto">
        <button
          onClick={returnToHome}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-[2px] transition-all duration-300 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C3F84A]" />
          RETURN TO HOME
        </button>
      </div>

      {/* 2. Barra Lateral de Scroll Global adaptativa a la derecha */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center bg-black/20 backdrop-blur-[2px] py-4 px-2 rounded-full border border-white/10 pointer-events-auto shadow-sm">
        <div className="relative w-1.5 h-36 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-[#A3E635] rounded-full"
            style={{ height: `${scrollPosition * 100}%` }}
          />
        </div>
        <motion.div 
          className="w-3 h-3 rounded-full bg-[#A3E635] mt-3"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="space-y-3 mt-4 flex flex-col items-center">
          {[0, 0.3, 0.6, 0.9].map((val, idx) => (
            <span 
              key={idx} 
              className={`w-1.5 h-1.5 rounded-full transition-colors ${scrollPosition >= val ? 'bg-[#A3E635]' : 'bg-white/30'}`} 
            />
          ))}
        </div>
      </div>

      {/* 3. Botón translúcido adaptativo abajo a la derecha: TOP */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
        <button
          onClick={returnToTop}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-[2px] transition-all duration-300 shadow-sm"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-[#A3E635] text-[#0D0D0D] flex items-center justify-center font-black text-[8px]">
            ↑
          </span>
          TOP
        </button>
      </div>
    </div>
  );
}