'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroOffTrackSection() {
  const particles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 8 + 3, // Tamaños variados: desde pequeñas (3px) hasta grandes (11px)
      duration: Math.random() * 7 + 4,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <section className="relative w-full h-[95vh] min-h-[700px] bg-[#E8F4FC] text-[#0D0D0D] overflow-hidden flex flex-col justify-between pt-24 pb-12 px-6 md:px-16">
      
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(#136CFC15_1px,transparent_1px)] [background-size:36px_36px] pointer-events-none z-0" />
      <motion.div 
        animate={{ backgroundPosition: ['0px 0px', '100px 100px'] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#136CFC0a_1px,transparent_1px),linear-gradient(to_bottom,#136CFC0a_1px,transparent_1px)] [background-size:72px_72px] pointer-events-none z-0"
      />

      {/* Partículas que caen con tamaños variados */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-[#136CFC]/60 rounded-full shadow-sm"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              top: -20,
            }}
            animate={{
              y: ['0vh', '105vh'],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Cabecera / Etiqueta */}
      <div className="relative z-30 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/80 border border-black/10 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-[#136CFC] animate-ping" />
          <span className="text-[10px] font-mono font-bold text-[#136CFC] tracking-[0.3em] uppercase">
            // PERSONAL LIFE // BEHIND THE SCENES
          </span>
        </motion.div>
      </div>

      {/* Título Gigante OFF TRACK */}
      <div className="absolute top-[26%] left-6 md:left-36 lg:left-48 z-0 pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <h1 className="text-8xl sm:text-[10rem] md:text-[13rem] font-black uppercase tracking-tighter leading-[0.75] flex items-center gap-6">
            <span className="text-[#0D0D0D]">OFF</span>
            <span className="font-serif italic font-light text-[#136CFC]">TRACK</span>
          </h1>
        </motion.div>
      </div>

      {/* Imagen PNG */}
      <div className="absolute right-0 bottom-0 w-full lg:w-[65%] h-[92%] pointer-events-none z-20 flex items-end justify-end overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="/img/offtrack/banner.png"
            alt="Off Track Sergio Higuita"
            fill
            className="object-cover object-top drop-shadow-2xl"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#E8F4FC] via-[#E8F4FC]/40 to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* Contenido de Texto Principal */}
      <div className="relative z-35 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center my-auto pointer-events-auto">
        <div className="lg:col-span-6 flex flex-col pt-44">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-lg"
          >
            <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest block mb-2">
              THE HUMAN SIDE
            </span>
            <p className="text-gray-900 font-sans text-lg sm:text-xl leading-relaxed font-normal">
              Beyond the intense World Tour pressure and mountain climbs, Sergio Higuita reveals his relaxed personality, constant smiles, and{' '}
              <span className="font-serif italic font-light text-[#136CFC] text-xl sm:text-2xl">
                genuine moments shared with friends.
              </span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Texto Animado Inferior */}
      <div className="absolute bottom-16 inset-x-0 pointer-events-none overflow-hidden opacity-10 select-none z-0">
        <motion.div 
          animate={{ x: [-150, 150, -150] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="whitespace-nowrap text-3xl sm:text-5xl md:text-6xl font-mono uppercase tracking-widest text-[#136CFC] font-bold"
        >
          FRIENDSHIP BEYOND THE PELOTON . SHARING LAUGHS . UNBREAKABLE BONDS . LIFE OUTSIDE RACING .
        </motion.div>
      </div>

      {/* Margen inferior */}
      <div className="relative z-30 max-w-7xl mx-auto w-full pt-4 pb-2" />

    </section>
  );
}