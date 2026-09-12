'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const palmaresHighlights = [
  {
    id: 1,
    series: 'UCI WT',
    race: 'VUELTA A CATALUNYA',
    flag: '🇨🇴',
    date: '27 MAR 2022',
    finish: '1ST',
    time: '29:53:33',
    image: '/img/destacado/cataluna.jpg'
  },
  {
    id: 2,
    series: 'UCI PRO',
    race: 'VOLTA AO ALGARVE (STAGE)',
    flag: '🇵🇹',
    date: '20 FEB 2022',
    finish: '1ST',
    time: '17:58:37',
    image: '/img/destacado/algarve.jpg'
  },
  {
    id: 3,
    series: 'NAT',
    race: 'COLOMBIAN ROAD CHAMPION',
    flag: '🇨🇴',
    date: '31 JAN 2020 / 13 FEB 2022',
    finish: '1ST (x2)',
    time: 'CHAMPION',
    image: '/img/destacado/nacionalcampeon.jpg'
  },
  {
    id: 4,
    series: 'UCI WT',
    race: 'VUELTA A ESPAÑA (STAGE)',
    flag: '🇪🇸',
    date: '28 AUG 2019',
    finish: '1ST',
    time: '4:01:48',
    image: '/img/destacado/espana.jpeg'
  },
  {
    id: 5,
    series: 'UCI WT',
    race: 'TOUR DE ROMANDI (STAGE)',
    flag: '🇨🇭',
    date: '30 APR 2022',
    finish: '1ST',
    time: '3:42:15',
    image: '/img/destacado/romandi.jpg'
  }
];

export default function HighlightsSection() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      className="sticky top-0 w-full bg-[#0D0D0D] text-white py-32 px-6 sm:px-12 lg:px-20 z-20 shadow-[0_-30px_50px_rgba(0,0,0,0.8)] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="w-full max-w-[1500px] mx-auto relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-8 px-4">
          <div>
            <span className="text-[11px] font-mono font-bold text-[#136CFC] tracking-[0.4em] uppercase block mb-2">
              CAREER MILESTONES
            </span>
            <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tight text-white">
              RESULT <span className="text-[#136CFC] font-serif italic font-light">HIGHLIGHTS</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-gray-400 mt-4 md:mt-0 uppercase tracking-widest">
            HOVER ROW TO PREVIEW // ELITE PALMARES
          </p>
        </div>

        <div className="flex flex-col w-full">
          <div className="grid grid-cols-12 text-[11px] font-mono text-gray-500 uppercase tracking-widest pb-6 border-b border-white/10 px-6">
            <span className="col-span-2">Series</span>
            <span className="col-span-5">Race / Event</span>
            <span className="col-span-2">Date</span>
            <span className="col-span-1 text-center">Finish</span>
            <span className="col-span-2 text-right">Time</span>
          </div>

          {palmaresHighlights.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredRow(item.id)}
              onMouseLeave={() => setHoveredRow(null)}
              className="grid grid-cols-12 items-center py-7 px-6 border-b border-white/10 transition-all duration-300 hover:bg-[#136CFC] hover:text-black cursor-pointer group relative"
            >
              <span className="col-span-2 font-mono text-xs font-bold text-gray-400 group-hover:text-black tracking-widest">
                {item.series}
              </span>

              <span className="col-span-5 font-black font-sans text-xl sm:text-3xl uppercase tracking-tight text-white group-hover:text-black flex items-center gap-3 transition-colors">
                <span className="text-2xl">{item.flag}</span>
                <span>{item.race}</span>
              </span>

              <span className="col-span-2 font-mono text-xs text-gray-400 group-hover:text-black font-medium">
                {item.date}
              </span>

              <span className="col-span-1 text-center flex items-center justify-center gap-2 font-black font-mono text-xl text-[#136CFC] group-hover:text-black">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 10.63 21 8.55 21 6V5c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
                </svg>
                {item.finish}
              </span>

              <span className="col-span-2 text-right font-mono font-bold text-base sm:text-lg text-white group-hover:text-black tracking-widest">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {hoveredRow !== null && (
          <motion.div
            className="fixed pointer-events-none z-50 w-72 h-96 rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(19,108,252,0.4)] hidden lg:block bg-neutral-900 border border-white/10"
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              top: mousePosition.y - 210,
              left: mousePosition.x + 40,
            }}
          >
            <img
              src={palmaresHighlights.find(h => h.id === hoveredRow)?.image}
              alt="Race Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-6">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-widest drop-shadow-md">
                {palmaresHighlights.find(h => h.id === hoveredRow)?.race} // 1ST PLACE
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}