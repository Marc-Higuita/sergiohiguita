'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function TrackSelectionSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="w-full h-screen bg-[#EBEBE6]" />;

  return (
    <section className="relative w-full h-screen bg-[#EBEBE6] text-[#152641] overflow-hidden select-none font-sans flex items-center justify-between pl-8 md:pl-16 pr-0 py-8">
      
      {/* 1. LÍNEAS TOPOGRÁFICAS EN EL FONDO CON TRAZO MÁS GRUESO */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-30 overflow-hidden">
        <motion.svg 
          animate={{
            x: [0, -20, 0, 20, 0],
            y: [0, 15, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "easeInOut",
          }}
          viewBox="0 0 1400 900" 
          className="w-[120%] h-[120%] -top-[10%] -left-[10%] stroke-current fill-none stroke-[2]" 
          preserveAspectRatio="none"
        >
          <path d="M -100 200 C 300 50, 700 350, 1500 150" />
          <path d="M -100 380 C 400 180, 800 580, 1500 320" />
          <path d="M -100 560 C 350 360, 950 720, 1500 500" />
          <path d="M -100 740 C 500 500, 900 850, 1500 680" />
        </motion.svg>
      </div>

      {/* 2. EFECTOS DETRÁS DE LA FOTO: LATIDO CARDÍACO "PUM-PUM" INTENSO */}
      <div className="absolute top-0 right-0 h-full w-[52vw] pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        
        {/* HALO RADIAL CON EFECTO LATIDO DOBLE (SÍSTOLE-DIÁSTOLE) */}
        <motion.div 
          animate={{ 
            scale: [1, 1.25, 1.08, 1.35, 1], 
            opacity: [0.35, 0.85, 0.5, 0.95, 0.35] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.8, 
            ease: "easeInOut",
            times: [0, 0.15, 0.3, 0.45, 1]
          }}
          className="absolute w-[550px] h-[550px] bg-radial from-[#C3F84A]/50 via-[#136CFC]/30 to-transparent rounded-full blur-[75px]" 
        />

        {/* ONDAS EXPANSIVAS DE PULSO DE CORAZÓN */}
        <motion.div 
          animate={{ scale: [0.8, 1.6], opacity: [0.8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
          className="absolute w-[380px] h-[380px] border-4 border-[#C3F84A] rounded-full"
        />
        <motion.div 
          animate={{ scale: [0.8, 1.8], opacity: [0.6, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.3, ease: "easeOut" }}
          className="absolute w-[380px] h-[380px] border-2 border-[#136CFC] rounded-full"
        />

        {/* ANILLO HUD CON TRAZO GRUESO ROTATIVO */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
          className="absolute w-[520px] h-[520px] border-2 border-dashed border-[#136CFC]/60 rounded-full"
        />

        {/* ONDA ECG LATIDO EN VIVO SVG CON TRAZO GRUESO */}
        <div className="absolute top-[32%] right-[15%] w-[320px] z-0">
          <motion.svg 
            viewBox="0 0 300 80" 
            className="w-full stroke-[#C3F84A] fill-none stroke-[3.5] drop-shadow-[0_0_12px_rgba(195,248,74,0.8)]"
          >
            <motion.path 
              d="M 0 40 L 60 40 L 70 10 L 80 70 L 90 20 L 100 50 L 110 40 L 300 40"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{ pathLength: [0, 1, 1], pathOffset: [0, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
            />
          </motion.svg>
        </div>

      </div>

      {/* 3. WIDGETS DE TELEMETRÍA (WHOOP / WATTS / PHYSIOLOGY) */}
      <div className="absolute top-0 right-[38vw] h-full w-[20vw] pointer-events-none z-10 overflow-hidden flex flex-col justify-center gap-5">
        
        {/* WHOOP RECOVERY */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/85 backdrop-blur-md border border-[#136CFC]/20 p-4 rounded-2xl max-w-[230px] shadow-xl flex items-center justify-between"
        >
          <div>
            <span className="text-[9px] font-mono font-bold text-[#136CFC] tracking-widest uppercase block">
              WHOOP // RECOVERY SCORE
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-[#152641]">96%</span>
              <span className="text-[10px] text-emerald-600 font-mono font-bold">PEAK FORM</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#C3F84A] border border-[#C3F84A] flex items-center justify-center shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#152641] animate-ping" />
          </div>
        </motion.div>

        {/* CLIMBING POWER */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/85 backdrop-blur-md border border-[#136CFC]/20 p-4 rounded-2xl max-w-[240px] shadow-xl ml-4"
        >
          <span className="text-[9px] font-mono font-bold text-[#136CFC] tracking-widest uppercase block">
            CLIMBING POWER // 5-MIN PEAK
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-3xl font-black text-[#152641]">6.9</span>
            <span className="text-xs font-mono font-bold text-[#136CFC]">W/KG</span>
          </div>
          <div className="w-full h-1.5 bg-black/10 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-[#136CFC] w-[92%] rounded-full" />
          </div>
        </motion.div>

        {/* PHYSIOLOGY */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/85 backdrop-blur-md border border-[#136CFC]/20 p-4 rounded-2xl max-w-[210px] shadow-xl"
        >
          <span className="text-[9px] font-mono font-bold text-[#136CFC] tracking-widest uppercase block">
            PHYSIOLOGY METRICS
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-black text-[#152641]">37</span>
            <span className="text-xs font-mono text-[#152641]/60">BPM</span>
            <span className="text-[10px] font-mono font-bold text-[#136CFC] ml-auto">VO2 MAX 84</span>
          </div>
        </motion.div>

      </div>

      {/* 4. BLOQUE IZQUIERDO: TEXTOS Y BOTONES */}
      <div className="relative z-20 max-w-xl md:max-w-2xl flex flex-col items-start gap-6 pt-4">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#136CFC] animate-ping" />
          <span className="text-xs font-mono font-bold tracking-[0.35em] uppercase text-[#136CFC]">
            // EXPLORE HIGUITA'S DUAL LEGACY
          </span>
        </motion.div>

        {/* TITULAR DINÁMICO */}
        <div className="relative flex flex-col items-start leading-[0.82]">
          
          {/* ON TRACK */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <span className="absolute -top-10 md:-top-16 -left-2 text-6xl md:text-9xl font-serif italic text-[#C3F84A] drop-shadow-[0_8px_20px_rgba(0,0,0,0.18)] z-10 pointer-events-none">
              On
            </span>
            <h2 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter text-[#152641]">
              TRACK
            </h2>
          </motion.div>

          {/* OFF TRACK */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="-mt-2 md:-mt-6"
          >
            <h2 className="text-7xl md:text-[10rem] font-serif italic font-light tracking-tight text-[#152641]/85">
              OFF <span className="font-sans font-black not-italic text-[#136CFC]">TRACK</span>
            </h2>
          </motion.div>

        </div>

        {/* TEXTO EN INGLÉS */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm md:text-base text-[#152641]/80 max-w-lg leading-relaxed font-sans font-medium"
        >
          Dive deep into WorldTour race statistics, stage victories, and classification titles, or explore Sergio Higuita’s personal journey and lifestyle beyond the peloton.
        </motion.p>

        {/* TARJETAS DE BOTONES INTERACTIVAS */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-5 w-full pt-2"
        >
          {/* BOTÓN ON TRACK */}
          <div className="w-full sm:w-auto flex items-center justify-between gap-6 bg-white/80 backdrop-blur-md border border-[#152641]/10 px-6 py-4 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 hover:border-[#C3F84A] transition-all duration-300 cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#152641] text-[#C3F84A] flex items-center justify-center shadow-inner group-hover:bg-[#C3F84A] group-hover:text-[#152641] transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-mono font-black tracking-wider uppercase text-[#152641]">
                  FULL PALMARÈS
                </span>
                <span className="text-[10px] text-[#152641]/60 font-mono">
                  [ Race Stats & Results ]
                </span>
              </div>
            </div>
            
            <div className="w-9 h-9 rounded-full bg-[#C3F84A] text-[#152641] flex items-center justify-center font-bold shadow-md group-hover:translate-x-1 transition-transform">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>

          {/* BOTÓN OFF TRACK */}
          <div className="w-full sm:w-auto flex items-center justify-between gap-6 bg-white/80 backdrop-blur-md border border-[#152641]/10 px-6 py-4 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 hover:border-[#136CFC] transition-all duration-300 cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#152641] text-[#136CFC] flex items-center justify-center shadow-inner group-hover:bg-[#136CFC] group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-mono font-black tracking-wider uppercase text-[#152641]">
                  ATHLETE STORY
                </span>
                <span className="text-[10px] text-[#152641]/60 font-mono">
                  [ Biography & Media ]
                </span>
              </div>
            </div>

            <div className="w-9 h-9 rounded-full bg-[#136CFC] text-white flex items-center justify-center font-bold shadow-md group-hover:translate-x-1 transition-transform">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>

        </motion.div>

      </div>

      {/* 5. FOTOGRAFÍA ENCAJADA CON LA PROPORCIÓN SOLICITADA */}
      <div className="absolute top-0 right-0 h-full w-[48vw] pointer-events-none z-20 overflow-hidden flex items-start justify-end">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1.15 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-full w-full flex items-start justify-end origin-top-right translate-x-4"
        >
          <img
            src="/img/fotopalmares.png"
            alt="Sergio Higuita Proportionate Frame"
            className="w-full h-full object-cover object-right-top filter drop-shadow-[-20px_0_35px_rgba(21,38,65,0.22)]"
          />
        </motion.div>
      </div>

    </section>
  );
}