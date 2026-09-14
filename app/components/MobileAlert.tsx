'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileAlert() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 1200) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleDismiss = () => {
    setShowAlert(false);
  };

  return (
    <AnimatePresence>
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F17]/80 backdrop-blur-xl pointer-events-auto"
        >
          {/* Tarjeta con Glassmorphism puro, limpio y sutil latido */}
          <motion.div
            animate={{ scale: [1, 1.015, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="relative w-full max-w-sm bg-[#152641]/40 backdrop-blur-2xl border border-white/10 p-7 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-[#E8F4FC] flex flex-col items-center text-center overflow-hidden"
          >
            
            {/* Resplandor superior sutil */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#C3F84A]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Iconos vectoriales  */}
            <div className="relative z-10 flex items-center gap-3.5 mb-5">
              {/* Icono Laptop */}
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner text-[#C3F84A]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.875 2.122L7.5 21h9l-.625-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12H3V5.25" />
                </svg>
              </div>

              <div className="w-1.5 h-1.5 rounded-full bg-[#C3F84A] animate-ping" />

              {/* Icono Dispositivo Móvil */}
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner text-[#136CFC]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              </div>
            </div>

            {/* Títulos y textos  */}
            <div className="relative z-10 mb-7">
              <span className="inline-block text-[9px] font-mono font-bold tracking-[0.3em] text-[#C3F84A] uppercase bg-[#C3F84A]/10 border border-[#C3F84A]/20 px-3.5 py-1 rounded-full mb-3">
                OPTIMIZED EXPERIENCE
              </span>
              <h3 className="text-base font-black tracking-tight uppercase text-white">
                Desktop View Recommended
              </h3>
              <p className="text-sm text-[#E8F4FC]/80 mt-3 leading-relaxed font-light">
                This interactive portfolio features advanced visual effects and telemetry that run significantly better on a <span className="text-white font-medium underline decoration-[#C3F84A]/60">laptop or desktop computer</span>.
              </p>
            </div>

            {/* Botón Continue  */}
            <button
              onClick={handleDismiss}
              className="relative z-10 w-full py-3.5 bg-[#C3F84A] hover:bg-[#b0e23e] text-[#0B0F17] font-mono font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_4px_20px_rgba(195,248,74,0.3)] active:scale-95"
            >
              Continue Experience
            </button>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}