'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import SocialsAndCultureSection from '@/app/components/SocialsAndCultureSection';
import HeroOffTrackSection from './HeroOffTrackSection';
import ProfileOffTrackSection from './ProfileOffTrackSection';
import SocialSection from './SocialSection';

// Componente integrado directamente para eliminar errores de importación
function InlineGlobalOverlay() {
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
      {/* Cursor personalizado de montañas con punto */}
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

      {/* Botón Return to Home */}
      <div className="fixed bottom-6 left-6 md:left-12 z-50 pointer-events-auto">
        <button
          onClick={returnToHome}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-[2px] transition-all duration-300 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C3F84A]" />
          RETURN TO HOME
        </button>
      </div>

      {/* Barra lateral de scroll */}
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

      {/* Botón TOP */}
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

export default function OnTrackPage() {
  return (
    <main className="relative w-full bg-[#0D0D0D] text-white font-sans overflow-x-hidden selection:bg-[#136CFC] selection:text-white m-0 p-0">
      
      <InlineGlobalOverlay />

      <Navbar />
      <HeroOffTrackSection />
      <ProfileOffTrackSection />
      <SocialSection />
      <SocialsAndCultureSection />
      <Footer />

    </main>
  );
}