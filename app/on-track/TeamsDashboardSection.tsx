'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const teamsData = [
  {
    id: 'ef',
    name: 'EF EDUCATION',
    era: '2019–2021',
    badge: 'WorldTour Pro',
    quote: 'Exploding Onto the Global Stage',
    description: 'Higuita didn\'t just enter the WorldTour; he conquered it instantly. Nicknamed the "Monster" by team boss Jonathan Vaughters, his 2019 transition to EF is the stuff of legend. He dismantled the elite field to win Stage 18 of the Vuelta a España in his Grand Tour debut, holding off chasing giants like Primož Roglič and Alejandro Valverde. He immediately backed this up by going head-to-head with Tadej Pogačar, finishing a close 2nd overall at the Tour of California. Solidifying his status in 2020, he won the Tour Colombia by conquering Egan Bernal, snatched the National Champion tricolor jersey, and stormed the Paris-Nice overall podium (3rd).',
    image: '/img/palmares/ef.PNG',
    stats: { wins: '3+', peak: 'Top 2 GC', role: 'Leader' },
    seasons: [
      {
        year: '2019',
        title: 'Fundación Euskadi / EF Education First',
        summary: 'His official breakout year, prompting a mid-season WorldTour transfer and historic Grand Tour milestones.',
        races: [
          { name: 'Vuelta a España', category: 'Grand Tour', result: '1st place (Stage 18)', type: 'trophy' },
          { name: 'Tour of California', category: 'UCI WorldTour', result: '2nd place Overall', type: 'podium' },
          { name: "Giro dell'Emilia", category: 'UCI ProSeries', result: '3rd place', type: 'mountain' }
        ]
      },
      {
        year: '2020',
        title: 'EF Pro Cycling',
        summary: 'Established himself as an elite global contender, claiming national and international glory.',
        races: [
          { name: 'Tour Colombia', category: 'UCI America Tour', result: '1st place Overall', type: 'trophy' },
          { name: 'National Championship', category: 'National', result: 'Road Race Champion', type: 'podium' },
          { name: 'Paris-Nice', category: 'UCI WorldTour', result: '3rd place Overall', type: 'mountain' }
        ]
      },
      {
        year: '2021',
        title: 'EF Education-Nippo',
        summary: 'A season characterized by steady support roles in Grand Tours and strong elite monument placements.',
        races: [
          { name: 'Giro de Lombardia', category: 'Monument', result: '10th place', type: 'mountain' },
          { name: 'Tour de France', category: 'Grand Tour', result: '25th place Overall', type: 'podium' }
        ]
      }
    ]
  },
  {
    id: 'bora',
    name: 'BORA-HANSGROHE',
    era: '2022–2024',
    badge: 'WorldTour Elite',
    quote: 'Peak Masterclass and Elite Royalty',
    description: 'His transfer to the German powerhouse unleashed Higuita at the absolute peak of his powers. 2022 was an exhibition of cycling royalty: he captured the Volta a Catalunya general classification after an iconic 130km tactical raid alongside Richard Carapaz, effectively defeating both the Ecuadorian Olympic champion and João Almeida. That same year, he took 2nd overall at the Tour de Suisse right behind Geraint Thomas and reclaimed his National Champion crown. Even when hit by setbacks later on, his world-class caliber flashed brightly by overpowering the field to secure an elite WorldTour stage victory at Itzulia Basque Country.',
    image: '/img/palmares/bora.jpg',
    stats: { wins: '5+', peak: '1st GC', role: 'Co-Leader' },
    seasons: [
      {
        year: '2022',
        title: 'Bora-Hansgrohe',
        summary: 'An absolute masterclass of elite cycling royalty, capturing stage race crowns and podiums.',
        races: [
          { name: 'Volta a Catalunya', category: 'UCI WorldTour', result: '1st place Overall', type: 'trophy' },
          { name: 'National Championship', category: 'National', result: 'Road Race Champion', type: 'podium' },
          { name: 'Tour de Suisse', category: 'UCI WorldTour', result: '2nd place Overall', type: 'mountain' }
        ]
      },
      {
        year: '2023',
        title: 'Bora-Hansgrohe',
        summary: 'Continued consistency in major WorldTour stages, overpowering elite fields.',
        races: [
          { name: 'Itzulia Basque Country', category: 'UCI WorldTour', result: '1st place (Stage 5)', type: 'trophy' },
          { name: 'Vuelta a San Juan', category: 'UCI ProSeries', result: '2nd place Overall', type: 'podium' }
        ]
      },
      {
        year: '2024',
        title: 'Red Bull-Bora-Hansgrohe',
        summary: 'A transitional year maintaining strong top-15 general classification presence.',
        races: [
          { name: 'Tour de Suisse', category: 'UCI WorldTour', result: '12th place Overall', type: 'mountain' },
          { name: 'Vuelta a Burgos', category: 'UCI ProSeries', result: '10th place Overall', type: 'podium' }
        ]
      }
    ]
  },
  {
    id: 'astana',
    name: 'XDS ASTANA',
    era: '2025–2026',
    badge: 'Team Leader',
    quote: 'New Horizons and Leadership',
    description: 'Seeking absolute leadership, Higuita\'s move to the Kazakh project proved he remains one of the sport\'s most dangerous assets. Tasked with spearheading week-long stage races, he immediately re-established his elite consistency. His brilliant, tactically aggressive 2nd place overall at the AlUla Tour—where he fought fiercely alongside Jan Christen and Igor Arrieta—and a highly competitive top-15 showing in the grueling mountains of the Tour de France cemented his status as a permanent threat against the next generation of riders.',
    image: '/img/palmares/astana.jpg',
    stats: { wins: 'Leader', peak: 'Top 2', role: 'Captain' },
    seasons: [
      {
        year: '2025–2026',
        title: 'XDS Astana Team',
        summary: 'Re-energized role as a primary punchy climber and stage race co-leader.',
        races: [
          { name: 'AlUla Tour (2026)', category: 'UCI Asia Tour', result: '2nd place Overall', type: 'podium' },
          { name: 'Tour de France (2025)', category: 'Grand Tour', result: 'Top 15 Overall', type: 'mountain' }
        ]
      }
    ]
  }
];

function AnimatedIcon({ type }: { type: string }) {
  if (type === 'trophy') {
    return (
      <motion.svg 
        className="w-5 h-5 text-[#136CFC]" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        viewBox="0 0 24 24"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h-.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-2.507.433 7.454 7.454 0 01-2.507-.433m5.007 0V11.25a4.5 4.5 0 10-9 0v4.25m9 0h-9" />
      </motion.svg>
    );
  }

  return (
    <motion.svg 
      className="w-5 h-5 text-[#3B82F6]" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      viewBox="0 0 24 24"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 21l6-9 4 5 3-4 5 8H3z" />
    </motion.svg>
  );
}

export default function TeamsDashboardSection() {
  const [activeTab, setActiveTab] = useState('ef');
  const currentTeam = teamsData.find((t) => t.id === activeTab) || teamsData[0];
  const [activeYear, setActiveYear] = useState(currentTeam.seasons[0].year);

  const handleTeamChange = (teamId: string) => {
    setActiveTab(teamId);
    const selectedTeam = teamsData.find((t) => t.id === teamId);
    if (selectedTeam) {
      setActiveYear(selectedTeam.seasons[0].year);
    }
  };

  const currentSeason = currentTeam.seasons.find((s) => s.year === activeYear) || currentTeam.seasons[0];

  return (
    <section className="relative isolate w-full py-28 px-6 sm:px-12 lg:px-20 text-white -mt-24 z-30 overflow-hidden rounded-t-[3.5rem] shadow-[0_-30px_60px_rgba(0,0,0,0.8)]">
      
      {/* 1. Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center -z-30 scale-105 filter blur-[3px]"
        style={{ backgroundImage: "url('/img/fondo.jpg')" }}
      />

      {/* 2. Animated background lines */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none opacity-25">
        <motion.div 
          className="absolute -inset-[100%] bg-[linear-gradient(to_right,#136CFC_1px,transparent_1px),linear-gradient(to_bottom,#136CFC_1px,transparent_1px)] bg-[size:4rem_4rem]"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(19,108,252,0.3),rgba(255,255,255,0))]"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* 3. Glass layer */}
      <div className="absolute inset-0 bg-neutral-950/75 backdrop-blur-[14px] -z-10" />

      <div className="w-full max-w-[1400px] mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6 bg-white/[0.07] backdrop-blur-3xl p-6 sm:p-8 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/20 hover:border-white/40 transition-all duration-500">
          
          <div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-sans drop-shadow-md">
              PALMARES
            </h2>
          </div>

          <div className="flex justify-center">
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-[#136CFC]/25 border border-[#136CFC]/50 px-5 py-2 rounded-full shadow-inner"
            >
              <span className="w-2 h-2 rounded-full bg-[#136CFC] animate-ping" />
              <span className="text-[10px] font-mono font-bold text-[#136CFC] tracking-[0.3em] uppercase whitespace-nowrap">
                Career Evolution Archives
              </span>
            </motion.div>
          </div>

          <div className="flex justify-end">
            <div className="flex bg-black/40 backdrop-blur-2xl p-1.5 rounded-2xl border border-white/15 gap-1.5 shadow-inner w-full sm:w-auto">
              {teamsData.map((team) => (
                <button
                  key={team.id}
                  onClick={() => handleTeamChange(team.id)}
                  className={`relative flex-1 sm:flex-initial px-3 sm:px-4 py-2.5 rounded-xl text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-300 text-center whitespace-nowrap ${
                    activeTab === team.id ? 'text-white shadow-xl shadow-[#136CFC]/40' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {activeTab === team.id && (
                    <motion.div
                      layoutId="glassTeamTabClear"
                      className="absolute inset-0 bg-gradient-to-r from-[#136CFC] to-[#0A47B1] rounded-xl -z-10 shadow-lg border border-white/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{team.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Dynamic Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            
            {/* Left Column with New Images and Animated Thick Stats */}
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-5 bg-white/[0.06] backdrop-blur-3xl rounded-[3rem] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/20 space-y-6"
            >
              
              <div className="w-full h-56 sm:h-64 rounded-3xl overflow-hidden relative shadow-xl border border-white/20 group">
                <img
                  src={currentTeam.image}
                  alt={currentTeam.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/25">
                  <span className="text-xs font-mono font-bold text-[#136CFC] tracking-widest">
                    {currentTeam.era}
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-[10px] font-mono font-bold text-neutral-300 uppercase tracking-widest block mb-1">
                    {currentTeam.badge}
                  </span>
                  <h3 className="text-xl font-black uppercase text-white tracking-tight font-sans">
                    {currentTeam.name}
                  </h3>
                </div>
              </div>

              <div className="space-y-2.5 px-2">
                <motion.h4 
                  whileHover={{ x: 4 }}
                  className="text-lg font-black uppercase tracking-tight text-white font-sans flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#136CFC] shadow-[0_0_10px_#136CFC]" />
                  {currentTeam.quote}
                </motion.h4>
                <p className="text-xs sm:text-sm font-sans text-neutral-300 font-light leading-relaxed">
                  {currentTeam.description}
                </p>
              </div>

              {/* Estadísticas Mejoradas con Degradados y Animación Coqueta */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/15">
                <motion.div 
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  className="bg-white/5 backdrop-blur-md p-4 rounded-2xl text-center border border-white/10 shadow-inner transition-all group cursor-pointer"
                >
                  <span className="block text-xl sm:text-2xl font-black font-mono bg-gradient-to-r from-[#136CFC] to-[#60A5FA] bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                    {currentTeam.stats.wins}
                  </span>
                  <span className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-1">Wins</span>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  className="bg-white/5 backdrop-blur-md p-4 rounded-2xl text-center border border-white/10 shadow-inner transition-all group cursor-pointer"
                >
                  <span className="block text-xl sm:text-2xl font-black font-mono bg-gradient-to-r from-[#136CFC] to-[#60A5FA] bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                    {currentTeam.stats.peak}
                  </span>
                  <span className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-1">Peak</span>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  className="bg-white/5 backdrop-blur-md p-4 rounded-2xl text-center border border-white/10 shadow-inner transition-all group cursor-pointer"
                >
                  <span className="block text-sm sm:text-base font-extrabold font-mono text-white tracking-wide truncate group-hover:text-[#136CFC] transition-colors mt-0.5">
                    {currentTeam.stats.role}
                  </span>
                  <span className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-1">Role</span>
                </motion.div>
              </div>

            </motion.div>

            {/* Right Column */}
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-7 bg-white/[0.06] backdrop-blur-3xl rounded-[3rem] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/20 space-y-6"
            >
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-white/15">
                <div>
                  <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block">
                    Timeline Archives
                  </span>
                  <h4 className="text-base font-bold uppercase tracking-wide text-white font-sans">
                    Interactive Year Selector
                  </h4>
                </div>

                <div className="flex bg-black/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/15 gap-1.5">
                  {currentTeam.seasons.map((season) => (
                    <button
                      key={season.year}
                      onClick={() => setActiveYear(season.year)}
                      className={`relative px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
                        activeYear === season.year
                          ? 'bg-gradient-to-r from-[#136CFC] to-[#0A47B1] text-white shadow-lg shadow-[#136CFC]/40 border border-white/30'
                          : 'text-neutral-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {season.year}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeYear}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div className="bg-black/35 backdrop-blur-xl p-6 rounded-[2rem] border border-white/15 space-y-2 shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#136CFC]">
                        Season {activeYear}
                      </span>
                      <span className="text-xs font-mono text-neutral-300 font-medium italic">
                        {currentSeason.title}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-sans text-neutral-300 font-light leading-relaxed">
                      {currentSeason.summary}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-2 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                      <span>Race & Competition</span>
                      <span>Milestone Result</span>
                    </div>

                    <div className="space-y-3">
                      {currentSeason.races.map((race, rIdx) => (
                        <motion.div
                          key={rIdx}
                          whileHover={{ scale: 1.01, x: 4 }}
                          transition={{ duration: 0.2 }}
                          className="flex justify-between items-center py-4 px-5 bg-white/[0.07] hover:bg-white/[0.12] backdrop-blur-xl rounded-2xl border border-white/15 hover:border-[#136CFC]/65 transition-all shadow-sm group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-[#136CFC]/25 flex items-center justify-center border border-[#136CFC]/40 group-hover:scale-110 transition-transform shadow-inner">
                              <AnimatedIcon type={race.type} />
                            </div>
                            <div>
                              <span className="block text-xs sm:text-sm font-bold font-sans text-white tracking-wide group-hover:text-[#136CFC] transition-colors">
                                {race.name}
                              </span>
                              <span className="block text-[10px] font-mono text-neutral-400">{race.category}</span>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#136CFC] bg-black/60 px-4 py-2 rounded-xl border border-white/20 shadow-inner">
                            {race.result}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* ProCyclingStats button */}
              <div className="pt-4">
                <a
                  href="https://www.procyclingstats.com/rider/sergio-higuita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#136CFC] to-[#0A47B1] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#136CFC]/30 hover:scale-[1.02] transition-transform border border-white/30 text-center"
                >
                  Explore More Results // PCS ↗
                </a>
              </div>

            </motion.div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}