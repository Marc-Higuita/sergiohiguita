'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Bike } from 'lucide-react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1350); // Tiempo óptimo para apreciar el panel de cristal y el desvanecimiento

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-[#070A10]/40 backdrop-blur-3xl flex flex-col items-center justify-center text-white select-none pointer-events-none overflow-hidden"
        >
          {/* SUTIL DEGRADADO LUMINOSO TRAS EL CRISTAL */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-[#3A4EFB]/10 to-transparent pointer-events-none" />

          {/* TARJETA CENTRAL CON EFECTO GLASSMORPHIKS (CRISTAL ESMERILADO) */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 p-10 sm:p-14 rounded-3xl bg-white/[0.07] border border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center gap-8"
          >
            
            {/* LOGO CON FUSIÓN A BLANCO LUMINOSO */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
              
              {/* Capa de contorno inicial */}
              <motion.div
                initial={{ opacity: 1, scale: 0.85 }}
                animate={{ opacity: [1, 1, 0], scale: 1 }}
                transition={{ duration: 1.1, times: [0, 0.7, 1] }}
                className="absolute inset-0 flex items-center justify-center filter drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]"
              >
                <Image
                  src="/img/logo/leon.png"
                  alt="Leon Outline"
                  fill
                  className="object-contain filter invert brightness-200 opacity-90"
                  priority
                />
              </motion.div>

              {/* Capa de Relleno que se vuelve totalmente Blanca y luminosa */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, filter: ['brightness(1)', 'brightness(1.5)', 'brightness(2)'] }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]"
              >
                <Image
                  src="/img/logo/leon.png"
                  alt="Leon Glass Glow"
                  fill
                  className="object-contain filter brightness-200 contrast-125"
                  priority
                />
              </motion.div>
            </div>

            {/* NOMBRE "SERGIO HIGUITA" EN BLANCO PURO */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              className="flex flex-col items-center text-center"
            >
              <span className="font-light text-xs sm:text-sm tracking-[0.4em] uppercase opacity-80 text-neutral-200 mb-1">
                ELITE CYCLING
              </span>
              <span className="font-black text-2xl sm:text-4xl tracking-tighter uppercase text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                SERGIO HIGUITA
              </span>
            </motion.div>

            {/* BARRA DE CARGA CON LA BICICLETA */}
            <div className="relative w-48 sm:w-56 mt-2 flex items-center">
              <motion.div
                initial={{ x: '0px', opacity: 0 }}
                animate={{ x: '190px', opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute -top-6 z-20 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]"
              >
                <Bike className="w-5 h-5" />
              </motion.div>

              <div className="w-full h-[2.5px] bg-white/20 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-white/40 via-white to-[#E3FF3B] shadow-[0_0_15px_rgba(255,255,255,0.9)]"
                />
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}