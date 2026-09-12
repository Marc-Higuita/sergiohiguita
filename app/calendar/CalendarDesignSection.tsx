'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, MapPin, Mountain, Award, AlertTriangle, Sparkles, Star, ChevronLeft, ChevronRight, Zap, Flame, Activity, Timer } from 'lucide-react';

interface StageDetail {
  dayNumber: number;
  monthIndex: number;
  monthName: string;
  stage: string;
  name: string;
  km: string;
  type: string;
  result: string;
  gcStanding?: string;
  isPodium?: boolean;
  isTop10?: boolean;
  isTop15?: boolean;
  isCrash?: boolean;
  status: 'completed' | 'upcoming' | 'live';
}

const detailedRacesDatabase: StageDetail[] = [
  // Enero: AlUla Tour
  { dayNumber: 27, monthIndex: 0, monthName: 'January', stage: 'Stage 1', name: 'AlUla Tour - Al Mansiyah', km: '149 km', type: 'Flat / Sprint', result: '49th', status: 'completed' },
  { dayNumber: 28, monthIndex: 0, monthName: 'January', stage: 'Stage 2', name: 'AlUla Tour - Winter Park', km: '199 km', type: 'Rolling Hills', result: '29th', status: 'completed' },
  { dayNumber: 29, monthIndex: 0, monthName: 'January', stage: 'Stage 3', name: 'AlUla Tour - Camel Cup', km: '170 km', type: 'Crosswinds', result: '3rd Place', isPodium: true, status: 'completed' },
  { dayNumber: 30, monthIndex: 0, monthName: 'January', stage: 'Stage 4', name: 'AlUla Tour - Maraya', km: '142 km', type: 'Hilly Finish', result: '32nd', status: 'completed' },
  { dayNumber: 31, monthIndex: 0, monthName: 'January', stage: 'Stage 5', name: 'AlUla Tour - Skyviews', km: '187 km', type: 'Mountain Finish', result: '6th', isTop10: true, status: 'completed' },
  { dayNumber: 31, monthIndex: 0, monthName: 'January', stage: 'General Classification', name: 'AlUla Tour - Final GC Podium', km: 'Total Race', type: 'Podium Overall', result: '2nd Place Overall 🥈', gcStanding: '2nd GC Podium', isPodium: true, status: 'completed' },

  // Febrero: UAE Tour
  { dayNumber: 16, monthIndex: 1, monthName: 'February', stage: 'Stage 1', name: 'UAE Tour - Madinat Zayed', km: '143 km', type: 'Flat', result: '39th', status: 'completed' },
  { dayNumber: 17, monthIndex: 1, monthName: 'February', stage: 'Stage 2', name: 'UAE Tour - Hudayriyat Island (ITT)', km: '12 km', type: 'Time Trial', result: '81st', status: 'completed' },
  { dayNumber: 18, monthIndex: 1, monthName: 'February', stage: 'Stage 3', name: 'UAE Tour - Jebel Jais', km: '176 km', type: 'Mountain', result: '46th', status: 'completed' },
  { dayNumber: 19, monthIndex: 1, monthName: 'February', stage: 'Stage 4', name: 'UAE Tour - Dubai Harbour', km: '175 km', type: 'Flat', result: '59th', status: 'completed' },
  { dayNumber: 20, monthIndex: 1, monthName: 'February', stage: 'Stage 5', name: 'UAE Tour - Umm al Quwain', km: '182 km', type: 'Flat', result: '79th', status: 'completed' },
  { dayNumber: 21, monthIndex: 1, monthName: 'February', stage: 'Stage 6', name: 'UAE Tour - Jebel Hafeet', km: '138 km', type: 'Summit Finish', result: '19th', isTop15: true, status: 'completed' },
  { dayNumber: 22, monthIndex: 1, monthName: 'February', stage: 'Stage 7', name: 'UAE Tour - Abu Dhabi Breakwater', km: '138 km', type: 'Flat', result: '94th', gcStanding: '33rd GC', status: 'completed' },

  // Abril: GP Miguel Induráin e Itzulia Basque Country
  { dayNumber: 4, monthIndex: 3, monthName: 'April', stage: 'Classic', name: 'GP Miguel Induráin', km: '200 km', type: 'Hilly Classic', result: '50th', status: 'completed' },
  { dayNumber: 6, monthIndex: 3, monthName: 'April', stage: 'Stage 1', name: 'Itzulia Basque Country (ITT)', km: '10 km', type: 'Time Trial', result: '80th', status: 'completed' },
  { dayNumber: 7, monthIndex: 3, monthName: 'April', stage: 'Stage 2', name: 'Itzulia Basque Country - Kanpezu', km: '193 km', type: 'Hilly Basque', result: '14th', isTop15: true, status: 'completed' },
  { dayNumber: 8, monthIndex: 3, monthName: 'April', stage: 'Stage 3', name: 'Itzulia Basque Country - Altsasu', km: '190 km', type: 'Steep Climbs', result: '28th', gcStanding: '18th GC (Before Crash)', status: 'completed' },
  { dayNumber: 9, monthIndex: 3, monthName: 'April', stage: 'Stage 4', name: 'Itzulia Basque Country - Galdakao', km: '167.2 km', type: 'Crash / DNF', result: 'DNF (Crash at -115 km)', isCrash: true, status: 'completed' },

  // Abril - Mayo: Tour de Romandie
  { dayNumber: 28, monthIndex: 3, monthName: 'April', stage: 'Prologue', name: 'Tour de Romandie - Prologue', km: '4 km', type: 'Time Trial', result: '81st', status: 'completed' },
  { dayNumber: 29, monthIndex: 3, monthName: 'April', stage: 'Stage 1', name: 'Tour de Romandie - Château-d\'Œx', km: '170 km', type: 'Hilly', result: '6th', isTop10: true, status: 'completed' },
  { dayNumber: 30, monthIndex: 3, monthName: 'April', stage: 'Stage 2', name: 'Tour de Romandie - Fribourg', km: '171 km', type: 'Rolling', result: '11th', isTop15: true, status: 'completed' },
  { dayNumber: 1, monthIndex: 4, monthName: 'May', stage: 'Stage 3', name: 'Tour de Romandie - Les Marécottes', km: '155 km', type: 'Mountain', result: '5th', isTop10: true, status: 'completed' },
  { dayNumber: 2, monthIndex: 4, monthName: 'May', stage: 'Stage 4', name: 'Tour de Romandie - Charmey', km: '155 km', type: 'Mountain', result: '5th', isTop10: true, status: 'completed' },
  { dayNumber: 3, monthIndex: 4, monthName: 'May', stage: 'Stage 5', name: 'Tour de Romandie - Vernier (ITT)', km: '15 km', type: 'Time Trial', result: '16th', gcStanding: '11th Overall', status: 'completed' },

  // Junio: Tour de Suisse
  { dayNumber: 17, monthIndex: 5, monthName: 'June', stage: 'Stage 1', name: 'Tour de Suisse - Vaduz', km: '177 km', type: 'Rolling', result: '12th', isTop15: true, status: 'completed' },
  { dayNumber: 18, monthIndex: 5, monthName: 'June', stage: 'Stage 2', name: 'Tour de Suisse - Regensdorf', km: '177 km', type: 'Hilly', result: '18th', status: 'completed' },
  { dayNumber: 19, monthIndex: 5, monthName: 'June', stage: 'Stage 3', name: 'Tour de Suisse - Rüschlikon', km: '161 km', type: 'Mountain', result: '42nd', status: 'completed' },
  { dayNumber: 20, monthIndex: 5, monthName: 'June', stage: 'Stage 4', name: 'Tour de Suisse - Ittigen (ITT)', km: '25 km', type: 'Time Trial', result: '51st', status: 'completed' },
  { dayNumber: 21, monthIndex: 5, monthName: 'June', stage: 'Stage 5', name: 'Tour de Suisse - Cari', km: '148 km', type: 'Mountain', result: '11th', gcStanding: '9th Overall', isTop10: true, status: 'completed' },

  // Julio: Tour de France
  { dayNumber: 4, monthIndex: 6, monthName: 'July', stage: 'Stage 1', name: 'Tour de France - Florence', km: '185 km', type: 'Hilly', result: '14th', isTop15: true, status: 'completed' },
  { dayNumber: 5, monthIndex: 6, monthName: 'July', stage: 'Stage 2', name: 'Tour de France - Bologna', km: '199 km', type: 'Mountain', result: '9th', isTop10: true, status: 'completed' },
  { dayNumber: 6, monthIndex: 6, monthName: 'July', stage: 'Stage 3', name: 'Tour de France - Torino', km: '230 km', type: 'Flat', result: '15th', isTop15: true, status: 'completed' },
  { dayNumber: 7, monthIndex: 6, monthName: 'July', stage: 'Stage 4', name: 'Tour de France - Galibier', km: '139 km', type: 'High Mountain', result: '101st', status: 'completed' },
  { dayNumber: 8, monthIndex: 6, monthName: 'July', stage: 'Stage 5', name: 'Tour de France - Saint-Vulbas', km: '177 km', type: 'Flat', result: '42nd', status: 'completed' },
  { dayNumber: 9, monthIndex: 6, monthName: 'July', stage: 'Stage 6', name: 'Tour de France - Dijon', km: '163 km', type: 'Flat', result: '35th', status: 'completed' },
  { dayNumber: 10, monthIndex: 6, monthName: 'July', stage: 'Stage 7', name: 'Tour de France - Gevrey-Chambertin (ITT)', km: '25 km', type: 'Time Trial', result: '135th', status: 'completed' },
  { dayNumber: 11, monthIndex: 6, monthName: 'July', stage: 'Stage 8', name: 'Tour de France - Colombey', km: '183 km', type: 'Hilly', result: '151st', status: 'completed' },
  { dayNumber: 12, monthIndex: 6, monthName: 'July', stage: 'Stage 9', name: 'Tour de France - Troyes', km: '199 km', type: 'Gravel', result: '122nd', status: 'completed' },
  { dayNumber: 14, monthIndex: 6, monthName: 'July', stage: 'Stage 10', name: 'Tour de France - Saint-Amand', km: '187 km', type: 'Flat', result: '62nd', status: 'completed' },
  { dayNumber: 15, monthIndex: 6, monthName: 'July', stage: 'Stage 11', name: 'Tour de France - Le Lioran', km: '211 km', type: 'Mountain', result: '158th', status: 'completed' },
  { dayNumber: 16, monthIndex: 6, monthName: 'July', stage: 'Stage 12', name: 'Tour de France - Villeneuve', km: '203 km', type: 'Hilly', result: '131st', status: 'completed' },
  { dayNumber: 17, monthIndex: 6, monthName: 'July', stage: 'Stage 13', name: 'Tour de France - Pau', km: '165 km', type: 'Flat', result: '83rd', status: 'completed' },
  { dayNumber: 18, monthIndex: 6, monthName: 'July', stage: 'Stage 14', name: 'Tour de France - Pla d\'Adet', km: '151 km', type: 'High Mountain', result: '55th', status: 'completed' },
  { dayNumber: 19, monthIndex: 6, monthName: 'July', stage: 'Stage 15', name: 'Tour de France - Plateau de Beille', km: '197 km', type: 'High Mountain', result: '64th', status: 'completed' },
  { dayNumber: 21, monthIndex: 6, monthName: 'July', stage: 'Stage 16', name: 'Tour de France - Nîmes', km: '188 km', type: 'Flat', result: '83rd', status: 'completed' },
  { dayNumber: 22, monthIndex: 6, monthName: 'July', stage: 'Stage 17', name: 'Tour de France - Superdévoluy', km: '177 km', type: 'Mountain', result: '139th', status: 'completed' },
  { dayNumber: 23, monthIndex: 6, monthName: 'July', stage: 'Stage 18', name: 'Tour de France - Barcelonnette', km: '179 km', type: 'Hilly', result: '24th', status: 'completed' },
  { dayNumber: 24, monthIndex: 6, monthName: 'July', stage: 'Stage 19', name: 'Tour de France - Isola 2000', km: '144 km', type: 'High Mountain', result: '39th', status: 'completed' },
  { dayNumber: 25, monthIndex: 6, monthName: 'July', stage: 'Stage 20', name: 'Tour de France - Nice', km: '132 km', type: 'Mountain', result: '38th', status: 'completed' },
  { dayNumber: 26, monthIndex: 6, monthName: 'July', stage: 'Stage 21', name: 'Tour de France - Monaco (ITT Finale)', km: '33 km', type: 'Time Trial', result: '132nd', gcStanding: '38th Overall', status: 'completed' },

  // Septiembre
  { dayNumber: 11, monthIndex: 8, monthName: 'September', stage: 'Classic', name: 'GP Québec', km: '201 km', type: 'One-Day Classic', result: '43rd', status: 'completed' },
  { dayNumber: 13, monthIndex: 8, monthName: 'September', stage: 'Classic', name: 'GP Montréal', km: '214.4 km', type: 'One-Day Classic', result: 'Live Today', status: 'live' },
  { dayNumber: 27, monthIndex: 8, monthName: 'September', stage: 'World Championships', name: 'Mundial de Ruta - Montréal', km: '273.7 km', type: 'World Championship', result: 'Coming Soon', status: 'upcoming' }
];

const activeMonths = [
  { index: 0, label: 'January' },
  { index: 1, label: 'February' },
  { index: 3, label: 'April' },
  { index: 4, label: 'May' },
  { index: 5, label: 'June' },
  { index: 6, label: 'July (Tour de France)' },
  { index: 8, label: 'September' },
];

export default function CalendarDesignSection() {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const currentYear = 2026;
  const [selectedDayDetail, setSelectedDayDetail] = useState<StageDetail | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const monthRaces = detailedRacesDatabase.filter(r => r.monthIndex === selectedMonth);

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setIsOverflowing(scrollWidth > clientWidth);
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [selectedMonth, monthRaces]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const progress = scrollWidth - clientWidth > 0 ? (scrollLeft / (scrollWidth - clientWidth)) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  const scrollLeftAmount = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRightAmount = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-[#0D0D0D] text-white py-20 px-4 sm:px-8 z-25 overflow-hidden">
      
      {/* FONDO DE MONTAÑAS CON LÍNEAS NEÓN Y PULSACIONES BRILLANTES */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-end justify-center overflow-hidden">
        <svg className="w-full h-[75%] opacity-70" viewBox="0 0 1440 500" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M0 350L200 250L450 320L700 150L950 280L1200 120L1440 300V500H0V350Z"
            fill="url(#mountain-grad-1)"
            animate={{ scaleY: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: 'bottom' }}
          />
          <motion.path
            d="M0 420L250 310L500 380L750 220L1000 340L1250 190L1440 360V500H0V420Z"
            fill="url(#mountain-grad-2)"
            animate={{ scaleY: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            style={{ transformOrigin: 'bottom' }}
          />
          <defs>
            <linearGradient id="mountain-grad-1" x1="0" y1="0" x2="0" y2="500" gradientUnits="userSpaceOnUse">
              <stop stopColor="#136CFC" stopOpacity="0.6" />
              <stop offset="1" stopColor="#136CFC" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="mountain-grad-2" x1="0" y1="0" x2="0" y2="500" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C3F84A" stopOpacity="0.7" />
              <stop offset="1" stopColor="#C3F84A" stopOpacity="0.0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Cabecera Principal */}
      <div className="max-w-7xl mx-auto mb-10 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-[#C3F84A]/10 border border-[#C3F84A]/30 px-4 py-1.5 rounded-full mb-3 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#C3F84A] animate-ping" />
          <span className="text-[10px] font-mono font-bold text-[#C3F84A] tracking-[0.25em] uppercase">
            ACTIVE SEASON SCHEDULE // PRO CYCLING 2026
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
          SEASON <span className="text-[#C3F84A]">CALENDAR</span>
        </h2>
        <p className="text-gray-400 font-mono text-xs sm:text-sm tracking-widest mt-2 uppercase">
          Select an active month below to explore stages, official standings, and results
        </p>
      </div>

      {/* EFECTO GLASS SUPERIOR: POTENCIA ESTIMADA 2026 (430W / 362W / 317W) */}
      <div className="max-w-7xl mx-auto mb-8 relative z-10">
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C3F84A]/15 border border-[#C3F84A]/30 flex items-center justify-center text-[#C3F84A] flex-shrink-0 shadow-inner">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#C3F84A] tracking-[0.2em] uppercase block">
                2026 ESTIMATED POWER CURVE // @ 57 KG
              </span>
              <h4 className="text-base sm:text-lg font-black uppercase text-white tracking-tight">
                Peak Punch & Threshold Profile
              </h4>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
            <div className="bg-black/40 border border-white/10 px-4 py-2 rounded-xl flex flex-col items-center">
              <span className="text-[9px] font-mono text-gray-400 uppercase flex items-center gap-1">
                <Timer className="w-3 h-3 text-[#C3F84A]" /> 5 Min (Punch)
              </span>
              <span className="text-sm font-mono font-black text-[#C3F84A] mt-0.5">~430 W</span>
            </div>
            <div className="bg-black/40 border border-white/10 px-4 py-2 rounded-xl flex flex-col items-center">
              <span className="text-[9px] font-mono text-gray-400 uppercase flex items-center gap-1">
                <Activity className="w-3 h-3 text-cyan-400" /> 20 Min (Climb)
              </span>
              <span className="text-sm font-mono font-black text-cyan-300 mt-0.5">~362 W</span>
            </div>
            <div className="bg-black/40 border border-white/10 px-4 py-2 rounded-xl flex flex-col items-center">
              <span className="text-[9px] font-mono text-gray-400 uppercase flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" /> 60 Min (Threshold)
              </span>
              <span className="text-sm font-mono font-black text-amber-300 mt-0.5">~317 W</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenedor Principal Estilo Panel Translúcido */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-[#141418]/75 border border-white/20 rounded-3xl p-6 sm:p-12 backdrop-blur-xl shadow-[0_30px_70px_rgba(0,0,0,0.9)]">
          
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono text-[#C3F84A] uppercase tracking-widest block">Active Competition Period</span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-1">
                {activeMonths.find(m => m.index === selectedMonth)?.label} <span className="text-[#C3F84A]">{currentYear}</span>
              </h3>
            </div>
            <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl font-mono text-xs text-gray-300">
              {monthRaces.length} Registered Events / Stages
            </div>
          </div>

          {/* CONTENEDOR DE DESPLAZAMIENTO HORIZONTAL AMPLIADO */}
          <div className="relative w-full mb-6 overflow-hidden">
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="grid grid-flow-col grid-rows-2 gap-5 overflow-x-auto pb-4 pt-2 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x scroll-smooth"
            >
              {monthRaces.map((race, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => setSelectedDayDetail(race)}
                  className={`min-w-[280px] sm:min-w-[340px] flex-shrink-0 p-5 rounded-2xl border cursor-pointer relative overflow-hidden transition-all flex flex-col justify-between snap-start ${
                    race.isPodium
                      ? 'bg-gradient-to-br from-amber-500/30 via-[#1a160d] to-black border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.3)] ring-2 ring-amber-400/50 animate-pulse'
                      : race.isTop10
                      ? 'bg-gradient-to-br from-purple-950/40 via-[#170f24] to-black border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.25)] ring-1 ring-purple-400/40 animate-pulse'
                      : race.isTop15
                      ? 'bg-gradient-to-br from-cyan-950/40 via-[#0a1824] to-black border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)] ring-1 ring-cyan-400/30 animate-pulse'
                      : race.isCrash
                      ? 'bg-gradient-to-br from-red-950/30 via-[#141418] to-black border-red-500/60'
                      : race.status === 'live'
                      ? 'bg-gradient-to-br from-emerald-950/40 via-[#141418] to-black border-emerald-500/60 animate-pulse'
                      : race.status === 'completed'
                      ? 'bg-gradient-to-br from-blue-950/20 via-[#141418] to-black border-blue-500/30 hover:border-[#C3F84A]'
                      : 'bg-gradient-to-br from-amber-950/20 via-[#141418] to-black border-amber-500/40'
                  }`}
                >
                  {/* Animación interna de montaña decorativa */}
                  <div className="absolute right-2 bottom-2 opacity-10 pointer-events-none text-white">
                    <Mountain className="w-16 h-16" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-[9px] font-bold bg-white/10 px-2.5 py-0.5 rounded text-white uppercase">
                        Day {race.dayNumber} // {race.stage}
                      </span>
                      {race.isPodium ? (
                        <span className="flex items-center gap-1 bg-amber-400 text-black px-2.5 py-0.5 rounded-full text-[9px] font-mono font-black uppercase shadow-md animate-bounce">
                          <Sparkles className="w-2.5 h-2.5 text-black" /> Podium 🥈
                        </span>
                      ) : race.isTop10 ? (
                        <span className="flex items-center gap-1 bg-purple-600 text-white px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase shadow-md tracking-wide animate-bounce">
                          <Star className="w-2.5 h-2.5 text-white animate-spin" /> Top 10 🌟
                        </span>
                      ) : race.isTop15 ? (
                        <span className="flex items-center gap-1 bg-cyan-400 text-black px-2.5 py-0.5 rounded-full text-[9px] font-mono font-black uppercase shadow-md tracking-wider animate-bounce">
                          <Award className="w-2.5 h-2.5 text-black" /> Top 15 ⚡
                        </span>
                      ) : race.isCrash ? (
                        <span className="flex items-center gap-1 bg-red-500/20 text-red-300 border border-red-500/40 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase">
                          <AlertTriangle className="w-2.5 h-2.5 text-red-400" /> DNF
                        </span>
                      ) : race.status === 'live' ? (
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase">
                          Live
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono text-gray-400 uppercase">{race.type}</span>
                      )}
                    </div>

                    <h4 className="text-sm font-black uppercase text-white tracking-tight line-clamp-1 mb-1">
                      {race.name}
                    </h4>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/10 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-gray-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C3F84A]" /> {race.km}
                      </span>
                      <span className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-lg ${
                        race.isPodium ? 'bg-amber-400 text-black font-black' : race.isTop10 ? 'bg-purple-600 text-white font-bold' : race.isTop15 ? 'bg-cyan-400 text-black font-bold' : race.isCrash ? 'bg-red-600 text-white' : 'bg-white/10 text-[#C3F84A]'
                      }`}>
                        {race.result}
                      </span>
                    </div>

                    {race.gcStanding && (
                      <div className="mt-1 bg-black/60 border border-amber-400/40 px-2.5 py-1 rounded-lg flex items-center justify-between shadow-inner">
                        <span className="font-mono text-[8px] text-amber-300 uppercase tracking-wider font-bold">GC Standing</span>
                        <span className="font-mono text-[9px] font-black text-amber-400">{race.gcStanding}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* BARRA DE DESLIZAMIENTO CONDICIONAL */}
          {isOverflowing && (
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={scrollLeftAmount}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-[#C3F84A] hover:text-black hover:border-[#C3F84A] transition-all cursor-pointer shadow-md flex-shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex-1 h-3 rounded-full bg-black/80 border border-white/15 p-[2px] relative overflow-hidden shadow-inner">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#C3F84A] via-emerald-400 to-[#136CFC] rounded-full shadow-[0_0_15px_rgba(195,248,74,0.9)]"
                  style={{ width: `${Math.max(scrollProgress, 12)}%` }}
                />
              </div>

              <button
                onClick={scrollRightAmount}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-[#C3F84A] hover:text-black hover:border-[#C3F84A] transition-all cursor-pointer shadow-md flex-shrink-0"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* PESTAÑAS DE MESES ABAJO ESTILO CARPETA */}
          <div className="pt-4 border-t border-white/10 flex flex-col items-center gap-3">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              Select Active Month Folder
            </span>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 bg-black/40 p-2.5 rounded-2xl border border-white/10 backdrop-blur-md">
              {activeMonths.map((m) => (
                <button
                  key={m.index}
                  onClick={() => setSelectedMonth(m.index)}
                  className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    selectedMonth === m.index
                      ? 'bg-[#C3F84A] text-black border-[#C3F84A] shadow-[0_0_20px_rgba(195,248,74,0.4)] scale-105'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Modal Detallado de la Etapa */}
      <AnimatePresence>
        {selectedDayDetail && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#141418] border border-white/20 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedDayDetail(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold hover:bg-red-500 transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold bg-[#C3F84A]/20 text-[#C3F84A] px-3 py-1 rounded-full uppercase border border-[#C3F84A]/30 flex items-center gap-1.5">
                  <Mountain className="w-3.5 h-3.5" /> {selectedDayDetail.stage} // {selectedDayDetail.type}
                </span>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                  {selectedDayDetail.monthName} {selectedDayDetail.dayNumber}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mb-2">
                {selectedDayDetail.name}
              </h3>
              
              <div className="grid grid-cols-2 gap-4 my-6 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div>
                  <span className="font-mono text-[10px] text-gray-400 block uppercase">Stage Distance</span>
                  <span className="text-base font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#C3F84A]" /> {selectedDayDetail.km}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-gray-400 block uppercase">Official Performance</span>
                  <span className="text-base font-bold text-[#C3F84A] flex items-center gap-1.5 mt-0.5">
                    <Award className="w-4 h-4 text-amber-400" /> {selectedDayDetail.result}
                  </span>
                </div>
              </div>

              {selectedDayDetail.gcStanding && (
                <div className="mb-6 bg-black/60 border border-amber-400/40 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-amber-300 block uppercase font-bold">General Classification (GC)</span>
                    <span className="text-sm font-bold text-white">Final or standing position</span>
                  </div>
                  <span className="font-mono text-sm font-black bg-amber-400 text-black px-3 py-1.5 rounded-xl shadow-md">
                    {selectedDayDetail.gcStanding}
                  </span>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedDayDetail(null)}
                  className="bg-[#C3F84A] text-black font-mono text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl hover:bg-[#b0e03c] transition-colors cursor-pointer"
                >
                  Close Information
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}