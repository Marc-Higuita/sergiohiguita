'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ExternalLink, ChevronLeft, ChevronRight, Play, Bike } from 'lucide-react';

const socialPosts = [
  {
    id: 1, url: 'https://www.instagram.com/reel/CkWZUPyoYA3/',
    title: 'Southwest Roads', tag: 'REELS // 01',
    description: 'Riding and enjoying the breathtaking landscapes through the roads of southwestern Antioquia.',
    previewImg: '/img/offtrack/insta/1.jpeg',
  },
  {
    id: 2, url: 'https://www.instagram.com/p/CAJr6J3HIVf/',
    title: 'Good Vibes & Dancing', tag: 'POST // 02',
    description: 'Sergio having fun, dancing, and showing his trademark joyful personality off the bike.',
    previewImg: '/img/offtrack/insta/2.webp',
  },
  {
    id: 3, url: 'https://www.instagram.com/reel/Clvr4IwIqsT/',
    title: 'Pro Training Session', tag: 'REELS // 03',
    description: 'Intense training session focused on high-level endurance and preparation.',
    previewImg: '/img/offtrack/insta/3.jpg',
  },
  {
    id: 4, url: 'https://www.instagram.com/reel/CzmFZceMyxi/',
    title: 'Giro de Rigo', tag: 'REELS // 04',
    description: 'Experiencing the incredible party, energy, and excitement of the Giro de Rigo with fans.',
    previewImg: '/img/offtrack/insta/4.jpg',
  },
  {
    id: 5, url: 'https://www.instagram.com/reel/DbgiXMEp8ON/',
    title: 'Family Farewell', tag: 'REELS // 05',
    description: 'Heartwarming moments right before heading out for the Tour, saying goodbye to family.',
    previewImg: '/img/offtrack/insta/5.jpg',
  },
  {
    id: 6, url: 'https://www.instagram.com/reel/Czg7qLqMFsL/',
    title: 'Sprint vs Wout van Aert', tag: 'REELS // 06',
    description: 'An exhilarating sprint finish battling head-to-head against Wout van Aert at the Giro de Rigo.',
    previewImg: '/img/offtrack/insta/6.jpg',
  },
];

// --- Lluvia de Bicicletas de Fondo ---
const BikeRain = () => {
  const bikes = Array.from({ length: 22 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: 5 + Math.random() * 5,
    delay: Math.random() * 4,
    scale: 0.6 + Math.random() * 0.8,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-25">
      {bikes.map(bike => (
        <motion.div
          key={bike.id}
          className="absolute text-[#10B981] drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]"
          style={{ left: bike.left, scale: bike.scale }}
          animate={{
            y: ['-10vh', '110vh'],
            rotate: [bike.rotation, bike.rotation + 360],
          }}
          transition={{
            duration: bike.duration,
            ease: 'linear',
            repeat: Infinity,
            delay: bike.delay,
          }}
        >
          <Bike size={36} strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  );
};

// --- Rastro de Barrido de Bicicletas al Mover el Mouse ---
interface TrailItem {
  id: number;
  x: number;
  y: number;
}

const CursorTrail = () => {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newItem: TrailItem = { id: Date.now(), x, y };
    setTrail(prev => [...prev, newItem].slice(-20)); // Mantiene las últimas 20 bicicletas del rastro

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setTrail([]), 350);
  };

  return (
    <div onMouseMove={handleMouseMove} className="absolute inset-0 z-25 w-full h-full pointer-events-auto">
      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            className="absolute text-[#10B981] pointer-events-none drop-shadow-[0_0_10px_rgba(16,185,129,0.8)] flex items-center"
            initial={{ opacity: 0.9, scale: 1.3, x: item.x - 10, y: item.y - 10 }}
            animate={{ opacity: 0, scale: 0.3, y: item.y + 35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Bike size={22} strokeWidth={2} />
            <span className="font-mono text-[10px] font-bold text-[#10B981] ml-0.5">3.0</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default function SocialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex(prev => (prev + 1) % socialPosts.length);
  const handlePrev = () => setCurrentIndex(prev => (prev - 1 + socialPosts.length) % socialPosts.length);

  const prevIdx = (currentIndex - 1 + socialPosts.length) % socialPosts.length;
  const nextIdx = (currentIndex + 1) % socialPosts.length;
  const prevPost = socialPosts[prevIdx];
  const activePost = socialPosts[currentIndex];
  const nextPost = socialPosts[nextIdx];

  return (
    <section className="relative w-full bg-gradient-to-b from-[#E8F4FC] via-[#7AA8D2] to-[#0D0D0D] text-white pt-16 pb-32 overflow-hidden z-20 block h-auto min-h-screen">
      
      {/* Fondo Texturizado */}
      <div className="absolute inset-0 z-0 opacity-[0.06] bg-[radial-gradient(#136CFC_1px,transparent_1px)] [background-size:30px_30px]" />
      
      {/* Lluvia de Bicicletas de Fondo */}
      <BikeRain />

      {/* Efecto de Barrido / Rastro de Bicicletas al Mover el Mouse */}
      <CursorTrail />

      {/* Cabecera Compactada y con Alto Contraste */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 text-center mb-10 pt-4 pointer-events-none">
        <div className="inline-flex items-center gap-2 bg-[#136CFC]/15 border border-[#136CFC]/40 px-4 py-1.5 rounded-full mb-3 backdrop-blur-md shadow-md pointer-events-auto">
          <Camera className="w-4 h-4 text-[#136CFC]" />
          <span className="text-[10px] font-mono font-bold text-[#136CFC] tracking-[0.3em] uppercase">
            INSTAGRAM FEED & MOMENTS
          </span>
        </div>
        
        <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-gray-900 drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]">
          SOCIAL <span className="text-[#136CFC] drop-shadow-sm">PULSE</span>
        </h2>
        <p className="text-gray-800 font-mono text-xs sm:text-sm tracking-widest mt-2 uppercase font-bold drop-shadow-sm">
          Explore Sergio&apos;s interactive deck of daily moments and reels
        </p>
      </div>

      {/* Carrusel de Tarjetas Interactivas */}
      <div className="relative z-30 max-w-6xl mx-auto px-6 flex flex-col items-center pointer-events-none">
        <div className="w-full flex items-center justify-center gap-6 py-2 overflow-visible pointer-events-auto">
          
          {/* Tarjeta Lateral Izquierda */}
          <div className="hidden md:flex w-72 h-[420px] bg-[#141418] border border-white/10 rounded-3xl overflow-hidden opacity-40 scale-90 blur-[1px] pointer-events-none flex-col justify-between relative shadow-xl">
            <div className="absolute inset-0 z-0">
              <img src={prevPost.previewImg} alt={prevPost.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="relative z-10 p-5">
              <span className="text-[10px] font-mono font-bold bg-[#136CFC]/80 text-white px-3 py-1 rounded-full uppercase tracking-wider">
                {prevPost.tag}
              </span>
            </div>
            <div className="relative z-10 p-5 bg-gradient-to-t from-black to-transparent">
              <h3 className="text-lg font-black uppercase text-white">{prevPost.title}</h3>
            </div>
          </div>

          {/* Tarjeta Principal Activa */}
          <div className="w-72 sm:w-80 h-[440px] sm:h-[470px] bg-[#141418] border border-white/25 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between relative group z-50">
            <div className="absolute inset-0 z-0">
              <img
                src={activePost.previewImg}
                alt={activePost.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
            </div>

            <div className="relative z-10 p-5 flex justify-between items-center">
              <span className="text-[10px] font-mono font-bold bg-[#136CFC] text-white px-3 py-1 rounded-full backdrop-blur-md uppercase tracking-wider shadow-md">
                {activePost.tag}
              </span>
              <div className="w-8 h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center backdrop-blur-md">
                <Play className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            </div>

            <div className="relative z-10 p-5 space-y-2 bg-gradient-to-t from-black via-black/85 to-transparent pt-10">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white drop-shadow-md">
                {activePost.title}
              </h3>
              <p className="text-gray-300 font-sans text-xs line-clamp-3 leading-relaxed">
                {activePost.description}
              </p>

              <div className="pt-3 border-t border-white/15 flex justify-between items-center">
                <span className="font-mono text-[10px] text-gray-400">INSTAGRAM MEDIA</span>
                <a
                  href={activePost.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#136CFC] text-white px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#136CFC]/40 hover:bg-blue-600 transition-colors"
                >
                  <span>Watch Post</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Tarjeta Lateral Derecha */}
          <div className="hidden md:flex w-72 h-[420px] bg-[#141418] border border-white/10 rounded-3xl overflow-hidden opacity-40 scale-90 blur-[1px] pointer-events-none flex-col justify-between relative shadow-xl">
            <div className="absolute inset-0 z-0">
              <img src={nextPost.previewImg} alt={nextPost.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="relative z-10 p-5">
              <span className="text-[10px] font-mono font-bold bg-[#136CFC]/80 text-white px-3 py-1 rounded-full uppercase tracking-wider">
                {nextPost.tag}
              </span>
            </div>
            <div className="relative z-10 p-5 bg-gradient-to-t from-black to-transparent">
              <h3 className="text-lg font-black uppercase text-white">{nextPost.title}</h3>
            </div>
          </div>

        </div>

        {/* Botones de Navegación */}
        <div className="flex items-center gap-6 mt-8 z-60 pointer-events-auto">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-[#136CFC] hover:border-[#136CFC] transition-all shadow-lg active:scale-95 cursor-pointer"
            aria-label="Previous post"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="font-mono text-xs text-gray-400 tracking-widest">
            {currentIndex + 1} / {socialPosts.length}
          </span>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-[#136CFC] hover:border-[#136CFC] transition-all shadow-lg active:scale-95 cursor-pointer"
            aria-label="Next post"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

    </section>
  );
}