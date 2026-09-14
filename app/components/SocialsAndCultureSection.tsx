'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const socialLinks = [
  { 
    name: 'INSTAGRAM', 
    url: 'https://www.instagram.com/sergioandreshiguita?stkn=Y2YzZXR0M2hybzU5' 
  },
  { 
    name: 'TWITTER / X', 
    url: 'https://x.com/higuitsergio?s=11' 
  },
  { 
    name: 'TIKTOK', 
    url: 'https://www.tiktok.com/@higuitamonster?_r=1&_t=ZS-99f0RcmMMpF' 
  },
  { 
    name: 'FACEBOOK', 
    url: 'https://www.facebook.com/share/1HXos5tf4z/' 
  },
  { 
    name: 'THREADS', 
    url: 'https://www.threads.com/@sergioandreshiguita' 
  },
];

const socialPhotos = [
  { id: 1, src: '/img/redes/1.jpg' },
  { id: 2, src: '/img/redes/2.jpg' },
  { id: 3, src: '/img/redes/3.jpg' },
  { id: 4, src: '/img/redes/4.jpg' },
  { id: 5, src: '/img/redes/5.jpg' },
  { id: 6, src: '/img/redes/6.jpg' },
];

const friendsPhotosPool = [
  '/img/amigos/1.jpg',
  '/img/amigos/2.jpg',
  '/img/amigos/3.jpg',
  '/img/amigos/4.jpg',
  '/img/amigos/5.jpg',
  '/img/amigos/6.jpg',
  '/img/amigos/7.jpg',
  '/img/amigos/8.jpg',
  '/img/amigos/9.jpg',
  '/img/amigos/10.jpg',
];

const bubblePositions = [
  { top: '3%', left: '2%', size: 'w-28 h-28 sm:w-44 sm:h-44 md:w-64 md:h-64' },
  { top: '4%', right: '3%', size: 'w-32 h-32 sm:w-52 sm:h-52 md:w-76 md:h-76' },
  { top: '36%', left: '0%', size: 'w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48' },
  { top: '38%', right: '0%', size: 'w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56' },
  { bottom: '12%', left: '3%', size: 'w-32 h-32 sm:w-48 sm:h-48 md:w-68 md:h-68' },
  { bottom: '10%', right: '3%', size: 'w-28 h-28 sm:w-44 sm:h-44 md:w-60 md:h-60' },
  { top: '1%', left: '34%', size: 'w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36' },
  { top: '1%', right: '34%', size: 'w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32' },
  { bottom: '4%', left: '28%', size: 'w-20 h-20 sm:w-32 sm:h-32 md:w-44 md:h-44' },
  { bottom: '4%', right: '28%', size: 'w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48' },
];

const emptyGlassBubbles = [
  { top: '16%', left: '16%', size: 'w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32' },
  { top: '22%', right: '15%', size: 'w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36' },
  { top: '55%', left: '12%', size: 'w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28' },
  { top: '58%', right: '12%', size: 'w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32' },
  { bottom: '16%', left: '42%', size: 'w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40' },
  { top: '12%', right: '44%', size: 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24' },
  { bottom: '22%', right: '36%', size: 'w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30' },
  { top: '30%', left: '44%', size: 'w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44' },
];

const marqueeItems = [
  { text: 'PELOTON ALLY', icon: 'M13 10V3L4 14h7v7l9-11h-7z', highlight: false },
  { text: 'MOUNTAIN SPECIALIST', icon: 'M5 11l7-7 7 7M5 19l7-7 7 7', highlight: true },
  { text: 'STAFF & TEAM TRUST', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', highlight: false },
  { text: 'COLOMBIA SELECCIÓN', icon: 'M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9', highlight: false },
];

export default function SocialsAndCultureSection() {
  const [hoveredSocialCard, setHoveredSocialCard] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: -300, y: -300 });
  const containerRef = useRef<HTMLDivElement>(null);
  const bubblesContainerRef = useRef<HTMLDivElement>(null);
  const socialSectionRef = useRef<HTMLDivElement>(null);

  const [photoOffset, setPhotoOffset] = useState(0);

  const { scrollYProgress } = useScroll({
    target: socialSectionRef,
    offset: ["start end", "end start"]
  });

  const titleScale = useTransform(scrollYProgress, [0.1, 0.4], [0.85, 1.05]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.4], [40, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhotoOffset((prev) => (prev + 1) % friendsPhotosPool.length);
    }, 3600);

    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-visible bg-[#E8F4FC] text-[#0D0D0D] font-sans selection:bg-[#C3F84A] selection:text-[#0D0D0D] block"
    >
      
      {/* 1. TRANSICIÓN CURVA SVG */}
      <div className="relative w-full overflow-hidden leading-none z-20 -mt-1 pointer-events-none">
        <svg 
          className="relative block w-full h-16 md:h-24 text-[#0D0D0D]" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0 C150,90 350,-40 500,65 C650,160 900,10 1200,40 L1200,0 L0,0 Z" 
            fill="currentColor"
          />
        </svg>
      </div>

      {/* 2. CURSOR NEÓN MAGNÉTICO HIPERVISIBLE */}
      <div 
        className="pointer-events-none absolute z-40 w-56 h-56 rounded-full blur-2xl opacity-75 bg-radial from-[#C3F84A]/60 via-[#136CFC]/40 to-transparent -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />
      <div 
        className="pointer-events-none absolute z-40 w-12 h-12 rounded-full border-2 border-[#136CFC] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out shadow-[0_0_15px_#136CFC]"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />

      {/* 3. FONDO CON GRID TÉCNICO Y ÓRBITAS ANIMADAS */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000c_1px,transparent_1px),linear-gradient(to_bottom,#0000000c_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <motion.div 
          animate={{ scale: [1, 1.25, 1], rotate: [0, 180, 360], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-radial from-[#136CFC]/20 via-[#C3F84A]/15 to-transparent rounded-full blur-[140px]" 
        />

        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] border border-dashed border-[#136CFC]/25 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] border border-[#C3F84A]/30 rounded-full"
        />
      </div>

      {/* 4. SECCIÓN DE BURBUJAS DE PANTALLA COMPLETA */}
      <div className="relative w-full py-16 px-4 md:px-12 flex flex-col items-center justify-center z-10 overflow-hidden">
        
        <div ref={bubblesContainerRef} className="max-w-7xl w-full relative z-10 flex flex-col items-center justify-center min-h-[720px] md:min-h-[800px]">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center z-20"
          >
            <div className="inline-flex items-center gap-3 bg-white/60 border border-white/90 backdrop-blur-md px-6 py-2.5 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.06)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#136CFC] animate-ping" />
              <span className="text-[10px] md:text-xs font-mono font-black text-[#152641] tracking-[0.25em] uppercase">
                HOLD & DRAG THE MEMORY BUBBLES
              </span>
            </div>
          </motion.div>

          {/* 8 BURBUJAS DE CRISTAL VACÍAS */}
          {emptyGlassBubbles.map((bub, idx) => (
            <motion.div
              key={`empty-${idx}`}
              drag
              dragConstraints={bubblesContainerRef}
              dragElastic={0.15}
              whileHover={{ scale: 1.25, zIndex: 45, cursor: 'grab' }}
              whileTap={{ scale: 0.9, cursor: 'grabbing' }}
              animate={{
                y: [0, idx % 2 === 0 ? -18 : 18, 0],
                x: [0, idx % 3 === 0 ? 12 : -12, 0],
              }}
              transition={{
                y: { repeat: Infinity, duration: 4.5 + (idx % 3), ease: "easeInOut" },
                x: { repeat: Infinity, duration: 5.5 + (idx % 2), ease: "easeInOut" },
              }}
              style={{
                top: bub.top,
                left: bub.left,
                right: bub.right,
                bottom: bub.bottom,
              }}
              className={`absolute ${bub.size} rounded-full border border-white/90 bg-white/10 shadow-[0_10px_30px_rgba(255,255,255,0.3)] backdrop-blur-sm z-10 md:z-40 cursor-grab active:cursor-grabbing overflow-hidden`}
            >
              <div className="absolute top-2 left-3 w-1/2 h-1/2 rounded-full bg-white/50 blur-[1px]" />
              <div className="absolute bottom-2 right-3 w-1/3 h-1/3 rounded-full bg-[#C3F84A]/30 blur-[3px]" />
            </motion.div>
          ))}

          {/* 10 BURBUJAS FOTOGRÁFICAS */}
          {bubblePositions.map((pos, idx) => {
            const currentImgIndex = (idx + photoOffset) % friendsPhotosPool.length;
            
            return (
              <motion.div
                key={`photo-${idx}`}
                drag
                dragConstraints={bubblesContainerRef}
                dragElastic={0.15}
                whileHover={{ scale: 1.15, zIndex: 50, cursor: 'grab' }}
                whileTap={{ scale: 0.92, cursor: 'grabbing' }}
                animate={{
                  y: [0, idx % 2 === 0 ? -16 : 16, 0],
                  x: [0, idx % 3 === 0 ? 10 : -10, 0],
                }}
                transition={{
                  y: { repeat: Infinity, duration: 5 + (idx % 3), ease: "easeInOut" },
                  x: { repeat: Infinity, duration: 6 + (idx % 2), ease: "easeInOut" }
                }}
                style={{
                  top: pos.top,
                  left: pos.left,
                  right: pos.right,
                  bottom: pos.bottom,
                }}
                className={`absolute ${pos.size} rounded-full p-[2px] bg-gradient-to-tr from-white/80 via-[#C3F84A]/40 to-[#136CFC]/40 shadow-[0_15px_40px_rgba(0,0,0,0.12)] backdrop-blur-sm z-15 md:z-40 cursor-grab active:cursor-grabbing`}
              >
                <div className="w-full h-full rounded-full overflow-hidden relative border border-white/80 bg-white/10 backdrop-blur-sm">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImgIndex}
                      src={friendsPhotosPool[currentImgIndex]}
                      alt=""
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                      className="w-full h-full object-cover filter contrast-[1.08] pointer-events-none select-none"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.6)] pointer-events-none" />
                </div>
              </motion.div>
            );
          })}

          {/* CAPA CENTRAL RESPONSIVE: TEXTO FIJO Y LIMPIO EN MÓVIL, ANIMADO EN ESCRITORIO */}
          <div className="relative z-30 md:z-20 flex flex-col items-center justify-center text-center my-auto py-8 px-4 select-none w-full max-w-4xl bg-[#E8F4FC]/95 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none rounded-3xl md:rounded-none border border-white md:border-none shadow-[0_15px_50px_rgba(19,108,252,0.15)] md:shadow-none">
            
            {/* LÍNEA 1 */}
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 md:gap-6 overflow-hidden w-full">
              <span className="text-2xl sm:text-6xl md:text-9xl font-black uppercase tracking-tighter text-[#0D0D0D] leading-none">
                BEHIND
              </span>
              <span className="text-2xl sm:text-6xl md:text-9xl font-black uppercase tracking-tighter text-[#0D0D0D] leading-none">
                THE
              </span>
              <span className="text-2xl sm:text-6xl md:text-9xl font-serif italic font-light text-[#136CFC] leading-none drop-shadow-sm">
                VICTORIES
              </span>
            </div>

            {/* LÍNEA 2 */}
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 md:gap-6 mt-2 sm:mt-6 md:mt-8 overflow-hidden w-full">
              <span className="text-2xl sm:text-6xl md:text-9xl font-black uppercase tracking-tighter text-[#0D0D0D] leading-none">
                THERE
              </span>
              <span className="text-2xl sm:text-6xl md:text-9xl font-black uppercase tracking-tighter text-[#0D0D0D] leading-none">
                IS
              </span>
              <span className="text-2xl sm:text-6xl md:text-9xl font-black uppercase tracking-tighter text-[#0D0D0D] leading-none">
                A
              </span>
              <span className="text-2xl sm:text-6xl md:text-9xl font-serif italic font-light text-[#136CFC] leading-none drop-shadow-sm">
                FAMILY
              </span>
            </div>

            <p className="text-[9px] sm:text-xs md:text-sm font-mono font-bold text-[#136CFC] uppercase tracking-[0.1em] sm:tracking-[0.2em] bg-white border border-white px-4 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-md mt-5 sm:mt-10 inline-block text-center">
              MECHANICS • SOIGNEURS • CHEFS • TEAMMATES // WE CLIMB TOGETHER
            </p>
          </div>

        </div>
      </div>

      {/* 5. CINTA INCLINADA CON MARQUESINA INFINITA CONTINUA PERFECTA */}
      <div className="w-full bg-[#152641] text-white py-4 overflow-hidden shadow-2xl -rotate-1 relative z-20 my-4 border-y border-white/10">
        <motion.div 
          animate={{ x: ['0%', '-50%'] }}
          transition={{ 
            ease: 'linear', 
            duration: 22, 
            repeat: Infinity 
          }}
          className="flex w-max"
        >
          {[0, 1].map((blockIndex) => (
            <div key={blockIndex} className="flex items-center gap-10 pr-10">
              {marqueeItems.concat(marqueeItems).map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#C3F84A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    <span className={`text-xs font-mono font-bold tracking-widest uppercase whitespace-nowrap ${item.highlight ? 'text-[#C3F84A]' : 'text-white'}`}>
                      {item.text}
                    </span>
                  </div>
                  <span className="text-white/20">•</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* 6. WHAT'S UP ON SOCIALS - SECCIÓN TAROT EXPANDIDA Y ANIMADA */}
      <div ref={socialSectionRef} className="relative w-full py-20 px-4 md:px-16 z-10">
        
        {/* ELEMENTOS ANIMADOS DE FONDO */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <motion.div 
            animate={{ scale: [1, 1.3, 1], rotate: [0, -180, -360], opacity: [0.25, 0.45, 0.25] }}
            transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-radial from-[#C3F84A]/25 via-[#136CFC]/15 to-transparent rounded-full blur-[130px]" 
          />
          <motion.div 
            animate={{ y: [0, -25, 0], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute top-1/3 left-10 w-32 h-32 rounded-full border border-white/60 bg-white/10 backdrop-blur-md blur-[1px]"
          />
          <motion.div 
            animate={{ y: [0, 25, 0], scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full border border-[#C3F84A]/40 bg-[#C3F84A]/10 backdrop-blur-md blur-[2px]"
          />
        </div>

        {/* TÍTULO ANIMADO POR SCROLL */}
        <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#152641]/10 border border-[#152641]/20 px-4 py-1.5 rounded-full mb-4 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#136CFC] animate-ping" />
            <span className="text-[11px] font-mono font-bold text-[#136CFC] tracking-widest uppercase">
              LIVE SOCIAL FEED
            </span>
          </motion.div>

          <motion.h2 
            style={{ scale: titleScale, y: titleY }}
            className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-[#0D0D0D] leading-none"
          >
            WHAT'S UP <span className="font-serif italic font-light text-[#136CFC]">ON SOCIALS</span>
          </motion.h2>
        </div>

        {/* MAZO TAROT CON REORDENAMIENTO DINÁMICO POR HOVER Y BORDE ANIMADO NEÓN */}
        <div className="relative w-full max-w-7xl mx-auto h-[460px] sm:h-[520px] md:h-[580px] flex items-center justify-center mb-20 relative z-10">
          <div className="relative w-full h-full flex items-center justify-center">
            {socialPhotos.map((photo, index) => {
              const total = socialPhotos.length;
              const center = (total - 1) / 2;
              const offset = index - center;
              
              const rotateDeg = offset * 11;
              const translateX = offset * 115;
              const isHovered = hoveredSocialCard === photo.id;

              const dynamicZIndex = isHovered 
                ? 100 
                : hoveredSocialCard !== null 
                  ? 10 - Math.abs(photo.id - hoveredSocialCard)
                  : total - Math.abs(offset);

              return (
                <motion.div
                  key={photo.id}
                  onMouseEnter={() => setHoveredSocialCard(photo.id)}
                  onMouseLeave={() => setHoveredSocialCard(null)}
                  initial={{ opacity: 0, y: 120, rotate: 0 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: isHovered ? -70 : Math.abs(offset) * -8,
                    x: translateX,
                    rotate: isHovered ? 0 : rotateDeg,
                    scale: isHovered ? 1.25 : 1
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 280,
                    damping: 22,
                    delay: index * 0.04 
                  }}
                  style={{
                    zIndex: dynamicZIndex,
                  }}
                  className={`group absolute w-[200px] sm:w-[240px] md:w-[280px] h-[310px] sm:h-[370px] md:h-[430px] rounded-3xl overflow-hidden bg-white/10 backdrop-blur-sm cursor-pointer transition-all duration-300 p-[3px] ${
                    isHovered 
                      ? 'shadow-[0_0_50px_rgba(195,248,74,0.7)]' 
                      : 'shadow-[0_20px_45px_rgba(0,0,0,0.18)]'
                  }`}
                >
                  <div className="absolute inset-0 rounded-3xl pointer-events-none p-[2px] overflow-hidden">
                    <div className="absolute -inset-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[conic-gradient(from_0deg_at_50%_50%,#136CFC_0deg,#C3F84A_180deg,#136CFC_360deg)] animate-[spin_3s_linear_infinite]" />
                  </div>

                  <div className="w-full h-full rounded-[22px] overflow-hidden bg-white relative">
                    <img 
                      src={photo.src} 
                      alt="" 
                      className="w-full h-full object-cover filter contrast-[1.08] group-hover:scale-105 transition-transform duration-500 select-none" 
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 7. FOLLOW SERGIO - BOTONES DE CANALES OFICIALES */}
        <div className="max-w-5xl mx-auto px-6 text-center border-t border-black/10 pt-16 relative z-10 pb-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 flex flex-col items-center justify-center"
          >
            <div className="inline-flex items-center gap-2 bg-[#136CFC]/10 border border-[#136CFC]/20 px-5 py-2 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-[#136CFC] animate-ping" />
              <span className="text-[11px] font-mono font-bold text-[#136CFC] tracking-widest uppercase">
                OFFICIAL CHANNELS
              </span>
            </div>

            <h3 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#0D0D0D]">
              FOLLOW SERGIO <span className="font-serif italic font-light text-[#136CFC]">ON SOCIAL MEDIA</span>
            </h3>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {socialLinks.map((social, idx) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
                className="group relative flex items-center gap-3 bg-white hover:bg-[#136CFC] border border-black/10 hover:border-[#136CFC] px-6 py-3 rounded-full shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              >
                <span className="text-xs md:text-sm font-mono font-bold tracking-widest text-[#0D0D0D] group-hover:text-white transition-colors uppercase">
                  {social.name}
                </span>
                <span className="text-xs text-[#136CFC] group-hover:text-white transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </motion.a>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}