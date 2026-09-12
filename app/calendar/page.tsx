'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import SocialsAndCultureSection from '@/app/components/SocialsAndCultureSection';
import CalendarDesignSection from './CalendarDesignSection';

export default function CalendarPage() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isMounted) return null;

  const returnToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const returnToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.location.href = '/';
  };

  return (
    <main className="relative w-full bg-[#0D0D0D] text-white font-sans min-h-screen selection:bg-[#136CFC] selection:text-white cursor-none overflow-x-hidden m-0 p-0">
      
      {/* Cursor global de montañas con punto */}
      <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
        <motion.div
          className="absolute pointer-events-none text-[#C3F84A] drop-shadow-[0_0_10px_rgba(195,248,74,0.9)]"
          style={{ left: mousePos.x - 8, top: mousePos.y - 8 }}
          transition={{ type: 'spring', stiffness: 1200, damping: 50 }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16.5" cy="7.5" r="2" fill="currentColor" />
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

      {/* Botones flotantes de navegación */}
      <div className="fixed bottom-6 left-6 md:left-12 z-50 pointer-events-auto">
        <button
          onClick={returnToHome}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-[2px] transition-all duration-300 shadow-sm cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C3F84A]" />
          RETURN TO HOME
        </button>
      </div>

      <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
        <button
          onClick={returnToTop}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-[2px] transition-all duration-300 shadow-sm cursor-pointer"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-[#A3E635] text-[#0D0D0D] flex items-center justify-center font-black text-[8px]">↑</span>
          TOP
        </button>
      </div>

      {/* Estructura limpia solicitada: Navbar -> CalendarDesignSection -> SocialsAndCultureSection -> Footer */}
      <Navbar />
      <CalendarDesignSection />
      <SocialsAndCultureSection />
      <Footer />

    </main>
  );
}