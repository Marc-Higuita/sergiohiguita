'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReturnToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Aparece únicamente tras salir del Hero
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="fixed top-28 left-8 md:top-36 md:left-16 z-50 pointer-events-auto select-none"
        >
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2.5 bg-[#152641]/75 hover:bg-[#152641]/95 border border-white/20 hover:border-[#C3F84A]/60 backdrop-blur-md px-4 py-2 rounded-full opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(195,248,74,0.25)]"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-4 h-4 rounded-full bg-[#C3F84A] text-[#0D0D0D] flex items-center justify-center font-bold text-[10px] shadow-sm"
            >
              ↑
            </motion.div>
            <span className="text-[10px] font-mono font-black tracking-widest text-white/90 group-hover:text-[#C3F84A] transition-colors uppercase">
              CLICK TO RETURN TO TOP
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}