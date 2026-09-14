'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function QuoteSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(false);

  const textRowOne = "EXPLOSIVE ATTACKER • PUNCHY CLIMBER • STAGE WINNER • ";
  const textRowTwo = "MEDIUM MOUNTAIN SPECIALIST • ONE-WEEK RACE CONTENDER • ";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    // En dispositivos móviles (menores a 1024px) apagamos GSAP por completo para evitar que bloquee el scroll o encime elementos
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=50%',
          scrub: 0.6,
          pin: true,
        },
      });

      tl.fromTo(
        overlayRef.current,
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', opacity: 0 },
        { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', opacity: 1, duration: 0.6, ease: 'power3.inOut' }
      );

      if (marquee1Ref.current) {
        gsap.to(marquee1Ref.current, {
          xPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (marquee2Ref.current) {
        gsap.to(marquee2Ref.current, {
          xPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMounted]);

  if (!isMounted) {
    return <div className="w-full h-screen bg-[#E8F4FC]" />;
  }

  return (
    <div ref={containerRef} className="relative w-full min-h-screen lg:h-screen bg-[#E8F4FC] overflow-x-hidden">
      <div
        ref={overlayRef}
        className="relative lg:absolute inset-0 w-full min-h-screen lg:h-full bg-[#152641] text-[#E8F4FC] flex flex-col items-center justify-start pt-28 pb-32 lg:py-12 lg:justify-between z-30 select-none font-sans"
      >
        {/* MAPA DE CALOR ANIMADO (FONDO) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
          <motion.div 
            animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute top-[15%] left-[20%] w-[350px] lg:w-[450px] h-[350px] lg:h-[450px] bg-radial from-[#C3F84A]/30 via-[#136CFC]/20 to-transparent rounded-full blur-[90px]" 
          />
          <motion.div 
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute bottom-[10%] right-[15%] w-[400px] lg:w-[550px] h-[400px] lg:h-[550px] bg-radial from-[#136CFC]/40 via-[#C3F84A]/15 to-transparent rounded-full blur-[110px]" 
          />

          <svg className="w-full h-full stroke-[#136CFC]/20 fill-none stroke-[1]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(19, 108, 252, 0.15)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* MARQUEE ROTATIVO */}
        <div className="absolute inset-0 flex flex-col justify-center pointer-events-none z-0 overflow-hidden leading-none opacity-15 space-y-8">
          <div className="flex whitespace-nowrap overflow-hidden">
            <motion.div
              ref={marquee1Ref}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="flex whitespace-nowrap text-[6rem] sm:text-[9rem] md:text-[14rem] font-black uppercase tracking-tighter text-[#C3F84A]"
            >
              <span>{textRowOne}</span>
              <span>{textRowOne}</span>
            </motion.div>
          </div>

          <div className="flex whitespace-nowrap overflow-hidden">
            <motion.div
              ref={marquee2Ref}
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="flex whitespace-nowrap text-[6rem] sm:text-[9rem] md:text-[14rem] font-black uppercase tracking-tighter text-[#136CFC] italic"
            >
              <span>{textRowTwo}</span>
              <span>{textRowTwo}</span>
            </motion.div>
          </div>
        </div>

        {/* 1. TÍTULO EXCLUSIVO PARA ESCRITORIO (LG) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden lg:flex relative z-20 flex-col items-center gap-1.5 pt-8 text-center pointer-events-none px-4 mb-4"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C3F84A] animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#C3F84A] uppercase">
              ATHLETE TELEMETRY & PROFILE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
            SERGIO'S <span className="text-[#C3F84A]">SPECIALTIES</span>
          </h2>
        </motion.div>

        {/* 2. CONTENEDOR CENTRAL */}
        <div className="relative z-10 w-full max-w-6xl flex items-center justify-center px-4 py-4 lg:my-auto">
          
          {/* ========================================================= */}
          {/* VISTA ESCRITORIO (LG) */}
          {/* ========================================================= */}
          <div className="hidden lg:flex relative w-full max-w-6xl h-[72vh] items-center justify-center p-4">
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-full max-w-[850px] aspect-[16/10] rounded-2xl overflow-hidden border border-[#136CFC]/40 shadow-[0_0_60px_rgba(21,38,65,0.9)]"
            >
              <img
                src="/img/sergiobici.jpg"
                alt="Sergio Higuita Racing"
                className="w-full h-full object-cover filter contrast-[1.08] brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#152641]/90 via-transparent to-[#152641]/30" />
            </motion.div>

            {/* LÍNEAS VECTORIALES SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 stroke-[#C3F84A] stroke-[2] fill-none">
              <motion.path
                d="M 580 230 L 320 120 L 250 120"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                strokeDasharray="4 4"
              />
              <motion.path
                d="M 680 340 L 880 220 L 960 220"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <motion.path
                d="M 550 480 L 350 560 L 260 560"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              <motion.path
                d="M 450 520 L 720 620 L 820 620"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                strokeDasharray="4 4"
              />
            </svg>

            {/* TARJETAS HUD DESKTOP */}
            <motion.div
              initial={{ opacity: 0, x: -60, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute top-[8%] left-[4%] z-30 bg-[#152641]/90 backdrop-blur-md border border-[#C3F84A]/60 p-4 rounded-xl max-w-[240px] shadow-[0_0_25px_rgba(195,248,74,0.2)] group hover:scale-105 hover:border-[#C3F84A] transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-[#C3F84A] tracking-widest uppercase">FEATURE 01</span>
                <span className="w-2 h-2 rounded-full bg-[#C3F84A] animate-ping" />
              </div>
              <h4 className="text-base font-black tracking-tight uppercase text-white">PUNCHY CLIMBER</h4>
              <p className="text-xs text-[#E8F4FC]/80 mt-1 leading-snug">High acceleration capacity on short steep climbs and explosive mountain finishes.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute top-[18%] right-[4%] z-30 bg-[#152641]/90 backdrop-blur-md border border-[#136CFC]/60 p-4 rounded-xl max-w-[240px] shadow-[0_0_25px_rgba(19,108,252,0.2)] group hover:scale-105 hover:border-[#136CFC] transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-[#136CFC] tracking-widest uppercase">FEATURE 02</span>
                <span className="w-2 h-2 rounded-full bg-[#136CFC]" />
              </div>
              <h4 className="text-base font-black tracking-tight uppercase text-white">MEDIUM MOUNTAIN</h4>
              <p className="text-xs text-[#E8F4FC]/80 mt-1 leading-snug">Specialist in undulating terrain and fast-paced mid-stage attacks.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -60, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute bottom-[18%] left-[4%] z-30 bg-[#152641]/90 backdrop-blur-md border border-[#136CFC]/60 p-4 rounded-xl max-w-[240px] shadow-[0_0_25px_rgba(19,108,252,0.2)] group hover:scale-105 hover:border-[#136CFC] transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-[#136CFC] tracking-widest uppercase">FEATURE 03</span>
                <span className="w-2 h-2 rounded-full bg-[#136CFC]" />
              </div>
              <h4 className="text-base font-black tracking-tight uppercase text-white">EXPLOSIVE ATTACKER</h4>
              <p className="text-xs text-[#E8F4FC]/80 mt-1 leading-snug">Lethal gear changes and decisive moves in closing kilometers.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-[8%] right-[4%] z-30 bg-[#152641]/90 backdrop-blur-md border border-[#C3F84A]/60 p-4 rounded-xl max-w-[240px] shadow-[0_0_25px_rgba(195,248,74,0.2)] group hover:scale-105 hover:border-[#C3F84A] transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-[#C3F84A] tracking-widest uppercase">FEATURE 04</span>
                <span className="w-2 h-2 rounded-full bg-[#C3F84A] animate-pulse" />
              </div>
              <h4 className="text-base font-black tracking-tight uppercase text-white">STAGE & 1-WEEK RACES</h4>
              <p className="text-xs text-[#E8F4FC]/80 mt-1 leading-snug">Consistent overall contender in high-level WorldTour stage races.</p>
            </motion.div>

          </div>


          {/* ========================================================================= */}
          {/* VISTA MÓVIL / TABLET (< LG): Flujo natural vertical, sin GSAP, sin bloqueos */}
          {/* ========================================================================= */}
          <div className="flex lg:hidden flex-col items-center w-full max-w-md pt-4 pb-20">
            
            {/* 1. FOTO ARRIBA */}
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-[#136CFC]/40 shadow-xl mb-6">
              <img
                src="/img/sergiobici.jpg"
                alt="Sergio Higuita Racing"
                className="w-full h-full object-cover filter contrast-[1.08] brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#152641]/90 via-transparent to-[#152641]/30" />
            </div>

            {/* 2. TÍTULO ABAJO DE LA FOTO */}
            <div className="relative z-20 flex flex-col items-center gap-1.5 text-center mb-6 px-2">
              <div className="inline-flex items-center gap-2 bg-[#C3F84A]/10 border border-[#C3F84A]/30 px-3.5 py-1 rounded-full mb-1">
                <span className="w-2 h-2 rounded-full bg-[#C3F84A] animate-ping" />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#C3F84A] uppercase">
                  ATHLETE TELEMETRY & PROFILE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase text-white">
                SERGIO'S <span className="text-[#C3F84A]">SPECIALTIES</span>
              </h2>
            </div>

            <svg className="w-full h-8 stroke-[#C3F84A] stroke-[1.5] fill-none mb-6" viewBox="0 0 100 40">
              <path d="M 50 0 L 25 35 M 50 0 L 75 35" strokeDasharray="3 3" />
            </svg>

            {/* 3. TARJETAS DE CARACTERÍSTICAS ABAJO */}
            <div className="flex flex-col gap-3.5 w-full">
              
              <div className="bg-[#152641]/95 backdrop-blur-md border border-[#C3F84A]/60 p-3.5 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-[#C3F84A] tracking-widest uppercase">FEATURE 01</span>
                  <span className="w-2 h-2 rounded-full bg-[#C3F84A] animate-ping" />
                </div>
                <h4 className="text-sm font-black tracking-tight uppercase text-white">PUNCHY CLIMBER</h4>
                <p className="text-xs text-[#E8F4FC]/80 mt-1 leading-snug">High acceleration capacity on short steep climbs and explosive mountain finishes.</p>
              </div>

              <div className="bg-[#152641]/95 backdrop-blur-md border border-[#136CFC]/60 p-3.5 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-[#136CFC] tracking-widest uppercase">FEATURE 02</span>
                  <span className="w-2 h-2 rounded-full bg-[#136CFC]" />
                </div>
                <h4 className="text-sm font-black tracking-tight uppercase text-white">MEDIUM MOUNTAIN</h4>
                <p className="text-xs text-[#E8F4FC]/80 mt-1 leading-snug">Specialist in undulating terrain and fast-paced mid-stage attacks.</p>
              </div>

              <div className="bg-[#152641]/95 backdrop-blur-md border border-[#136CFC]/60 p-3.5 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-[#136CFC] tracking-widest uppercase">FEATURE 03</span>
                  <span className="w-2 h-2 rounded-full bg-[#136CFC]" />
                </div>
                <h4 className="text-sm font-black tracking-tight uppercase text-white">EXPLOSIVE ATTACKER</h4>
                <p className="text-xs text-[#E8F4FC]/80 mt-1 leading-snug">Lethal gear changes and decisive moves in closing kilometers.</p>
              </div>

              <div className="bg-[#152641]/95 backdrop-blur-md border border-[#C3F84A]/60 p-3.5 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-[#C3F84A] tracking-widest uppercase">FEATURE 04</span>
                  <span className="w-2 h-2 rounded-full bg-[#C3F84A] animate-pulse" />
                </div>
                <h4 className="text-sm font-black tracking-tight uppercase text-white">STAGE & 1-WEEK RACES</h4>
                <p className="text-xs text-[#E8F4FC]/80 mt-1 leading-snug">Consistent overall contender in high-level WorldTour stage races.</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}