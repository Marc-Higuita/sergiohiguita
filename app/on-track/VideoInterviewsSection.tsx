'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface VideoItem {
  title: string;
  url: string;
  videoId: string;
  description: string;
}

export default function VideoInterviewsSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const videos: VideoItem[] = [
    {
      title: "Stage 6 Highlights: Carapaz & Higuita in Epic Stage | Volta Catalunya",
      url: "https://www.youtube.com/watch?v=WnBrqyfs6jo",
      videoId: "WnBrqyfs6jo",
      description: "The memorable attack over 100km that marked a historic milestone alongside Richard Carapaz."
    },
    {
      title: "Battle in the mountains | Tour de Suisse 2022 Stage 7 Highlights",
      url: "https://www.youtube.com/watch?v=G1hMwLreUL8",
      videoId: "G1hMwLreUL8",
      description: "Epic climbing battle and yellow jersey defense in the Swiss mountains."
    },
    {
      title: "Vuelta a España - EF Gone Racing - Episode 18 (Behind the Scenes)",
      url: "https://www.youtube.com/watch?v=4V6vObO7F0k",
      videoId: "4V6vObO7F0k",
      description: "Exclusive emotional documentary inside the team during the unforgettable Vuelta a España."
    },
    {
      title: "Sergio Higuita Campeón Nacional de Ruta Élite",
      url: "https://www.youtube.com/watch?v=ELkapS61lZo",
      videoId: "ELkapS61lZo",
      description: "La consagración vistiendo con orgullo los colores de la bandera de Colombia."
    },
    {
      title: "Sergio Higuita's Cannondale SuperSix EVO",
      url: "https://www.youtube.com/watch?v=qP2P3krvReY",
      videoId: "qP2P3krvReY",
      description: "Custom details and special thanks to the team and sponsors."
    },
    {
      title: "Vuelta a España 2019: Sergio Higuita Stage 18 Win",
      url: "https://www.youtube.com/watch?v=J-auxZKcUsc",
      videoId: "J-auxZKcUsc",
      description: "The epic solo victory that marked a before and after in his professional career."
    },
    {
      title: "Itzulia Basque Stage 5 Epic Win",
      url: "https://www.youtube.com/watch?v=qjMzXi4A-_8",
      videoId: "qjMzXi4A-_8",
      description: "Interviews and analysis of one of the toughest and most contested stages in the Basque Country."
    },
    {
      title: "Sergio Higuita Best Moments & Interviews",
      url: "https://www.youtube.com/watch?v=64oKenOLGjY",
      videoId: "64oKenOLGjY",
      description: "A compilation of interviews sharing his growth and the backing of his teammates."
    },
    {
      title: "El Monstruo - Interview & Season Summary",
      url: "https://www.youtube.com/watch?v=Tl0MLjm_5WM",
      videoId: "Tl0MLjm_5WM",
      description: "Heartfelt words of gratitude to family, teammates, and fans worldwide."
    }
  ];

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative w-full py-32 px-6 md:px-16 bg-[#0D0D0D] text-white z-20 border-t border-white/10 overflow-hidden"
    >
      
      {/* 1. Textura de puntos original de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none z-0" />

      {/* 2. Orbes y luces difuminadas animadas con el cursor */}
      <div 
        className="absolute pointer-events-none w-[450px] h-[450px] bg-gradient-to-r from-[#136CFC]/20 to-[#A3E635]/20 rounded-full blur-[150px] transition-all duration-300 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* 3. Logos del León flotando y animados en el fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-20 select-none">
        <motion.div
          animate={{ x: ['-10vw', '110vw'], y: [0, 50, 0], rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
          className="absolute top-[15%] w-16 h-16 md:w-24 md:h-24 relative filter drop-shadow-[0_0_10px_#A3E635]"
        >
          <Image src="/img/logo/leon.png" alt="Lion Logo" fill className="object-contain" />
        </motion.div>

        <motion.div
          animate={{ x: ['110vw', '-10vw'], y: [0, -40, 0], rotate: [360, 0] }}
          transition={{ repeat: Infinity, duration: 28, ease: "linear", delay: 4 }}
          className="absolute top-[55%] w-20 h-20 md:w-28 md:h-28 relative filter drop-shadow-[0_0_10px_#136CFC]"
        >
          <Image src="/img/logo/leon.png" alt="Lion Logo" fill className="object-contain" />
        </motion.div>

        <motion.div
          animate={{ x: ['-10vw', '110vw'], y: [0, 30, 0], rotate: [0, -180] }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear", delay: 8 }}
          className="absolute top-[80%] w-14 h-14 md:w-20 md:h-20 relative filter drop-shadow-[0_0_10px_#ffffff]"
        >
          <Image src="/img/logo/leon.png" alt="Lion Logo" fill className="object-contain" />
        </motion.div>
      </div>

      {/* 4. Fondo cinético con cualidades ciclistas positivas, profesionales y humanas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10 flex flex-col justify-around py-6 select-none z-0">
        <motion.div 
          animate={{ x: [-120, 120, -120] }}
          transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
          className="whitespace-nowrap text-4xl md:text-7xl font-serif tracking-widest text-white uppercase"
        >
          EXPLOSIVE CLIMBER . UNSTOPPABLE SPIRIT . RIDING WITH JOY AND PASSION .
        </motion.div>
        
        <motion.div 
          animate={{ x: [120, -120, 120] }}
          transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
          className="whitespace-nowrap text-5xl md:text-8xl font-black uppercase font-sans tracking-tight text-[#136CFC]"
        >
          NATURAL TALENT - FIERCE COMPETITOR - ALWAYS SMILING ON THE BIKE -
        </motion.div>

        <motion.div 
          animate={{ x: [-180, 180, -180] }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
          className="whitespace-nowrap text-4xl md:text-7xl font-mono uppercase tracking-widest text-[#A3E635]"
        >
          DEDICATION AND EFFORT . INSPIRING A NEW GENERATION . PURE HEART IN EVERY ATTACK .
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">

        {/* Frase emotiva principal */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-center max-w-4xl leading-tight mb-8"
        >
          " CYCLING IS A DREAM FULFILLED EVERY DAY THANKS TO <span className="font-serif italic font-light text-[#136CFC]">TEAMWORK</span> AND THOSE WHO NEVER STOPPED SUPPORTING US. "
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-400 text-center max-w-2xl font-mono text-sm sm:text-base mb-16"
        >
          A journey through interviews and key moments where Sergio Higuita acknowledges the collective effort of his teammates, coaches, and fans.
        </motion.p>

        {/* Cuadrícula de tarjetas de video */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {videos.map((vid, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
              className="group relative bg-neutral-900/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-[#136CFC] transition-all duration-300 shadow-2xl flex flex-col justify-between"
            >
              {/* Contenedor del video */}
              <div className="relative w-full aspect-video bg-black overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${vid.videoId}`}
                  title={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Contenido de la tarjeta */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-[10px] font-mono text-[#136CFC] tracking-widest uppercase block mb-2">
                    INTERVIEW // HIGHLIGHT
                  </span>
                  <h3 className="text-lg font-bold font-sans text-white group-hover:text-[#A3E635] transition-colors line-clamp-2 mb-3">
                    {vid.title}
                  </h3>
                  <p className="text-gray-400 text-xs font-sans line-clamp-2 mb-6">
                    {vid.description}
                  </p>
                </div>

                <a
                  href={vid.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#136CFC] border border-white/10 hover:border-[#136CFC] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-sm"
                >
                  <span>WATCH ON YOUTUBE</span>
                  <span className="text-[#C3F84A] group-hover:text-white transition-transform group-hover:translate-x-1">↗</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}