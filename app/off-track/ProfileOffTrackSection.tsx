'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Trophy, Smile, Activity, Users, Sparkles, HeartHandshake, Compass, Flame, SmilePlus } from 'lucide-react';

const statsPhotos = [
  { src: '/img/prostats/1.jpg' },
  { src: '/img/prostats/2.jpg' },
  { src: '/img/prostats/3.jpg' },
  { src: '/img/prostats/4.jpg' },
  { src: '/img/prostats/5.jpg' },
  { src: '/img/prostats/6.jpg' },
  { src: '/img/prostats/7.jpg' },
  { src: '/img/prostats/8.webp' },
  { src: '/img/prostats/9.jpg' },
  { src: '/img/prostats/10.jpg' },
  { src: '/img/prostats/11.JPG' },
  { src: '/img/prostats/12.jpg' },
  { src: '/img/prostats/13.jpeg' }
];

export default function ProfileSection() {
  const [activeTab, setActiveTab] = useState<'stats' | 'personality'>('stats');
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % statsPhotos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const floatingBackgroundPhotos = useMemo(() => {
    return statsPhotos.map((photo, i) => ({
      ...photo,
      id: i,
      top: `${(i * 16) % 78 + 8}%`,
      left: `${(i * 26) % 82 + 6}%`,
      size: 110 + (i % 3) * 35,
      duration: 18 + (i % 5) * 4,
      delay: i * 0.7,
    }));
  }, []);

  return (
    <section className="relative w-full bg-[#0D0D0D] text-white pt-32 pb-36 overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 md:h-24 text-[#E8F4FC] fill-current">
          <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,20 1200,60 L1200,0 L0,0 Z"></path>
        </svg>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(#136CFC15_1px,transparent_1px)] [background-size:36px_36px] pointer-events-none z-0 opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#136CFC08_1px,transparent_1px),linear-gradient(to_bottom,#136CFC08_1px,transparent_1px)] [background-size:72px_72px] pointer-events-none z-0" />

      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-15">
        {floatingBackgroundPhotos.map((item) => (
          <motion.div
            key={item.id}
            className="absolute rounded-2xl overflow-hidden border border-[#136CFC]/40 shadow-2xl backdrop-blur-sm"
            style={{
              top: item.top,
              left: item.left,
              width: item.size,
              height: item.size,
            }}
            animate={{
              y: [-25, 25, -25],
              rotate: [-5, 5, -5],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: 'easeInOut',
            }}
          >
            <Image
              src={item.src}
              alt="Floating Background"
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-12 inset-x-0 pointer-events-none z-0 overflow-hidden opacity-10 flex justify-center">
        <motion.svg
          viewBox="0 0 1440 320"
          className="w-[150%] max-w-none h-48 sm:h-64 text-[#136CFC]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          animate={{ x: [-50, 50, -50] }}
          transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
        >
          <path d="M0,160 L120,133.3 L240,192 L360,96 L480,160 L600,64 L720,192 L840,128 L960,224 L1080,96 L1200,160 L1320,112 L1440,192 L1440,320 L0,320 Z" />
        </motion.svg>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl sm:text-7xl font-black uppercase tracking-tighter">
          SERGIO <span className="text-[#136CFC]">HIGUITA</span>
        </h2>
        <p className="text-gray-400 font-mono text-xs sm:text-sm tracking-widest mt-3 uppercase">
          Professional Cyclist | 10 Years of WorldTour Experience (2016–2026)
        </p>

        <div className="flex justify-center gap-5 mt-8">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveTab('stats')}
            className={`relative px-8 py-3.5 rounded-2xl font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-3 overflow-hidden border ${
              activeTab === 'stats'
                ? 'bg-gradient-to-r from-[#136CFC] via-blue-600 to-indigo-600 text-white border-blue-400/50 shadow-xl shadow-[#136CFC]/30'
                : 'bg-white/[0.03] text-gray-400 border-white/10 hover:border-white/20 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4 text-blue-300" />
            <span>Pro Stats & Career</span>
            {activeTab === 'stats' && (
              <motion.div layoutId="activeGlow" className="absolute inset-0 bg-white/10 rounded-2xl pointer-events-none" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveTab('personality')}
            className={`relative px-8 py-3.5 rounded-2xl font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-3 overflow-hidden border ${
              activeTab === 'personality'
                ? 'bg-gradient-to-r from-[#136CFC] via-blue-600 to-indigo-600 text-white border-blue-400/50 shadow-xl shadow-[#136CFC]/30'
                : 'bg-white/[0.03] text-gray-400 border-white/10 hover:border-white/20 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            <Smile className="w-4 h-4 text-blue-300" />
            <span>Human & Personality</span>
            {activeTab === 'personality' && (
              <motion.div layoutId="activeGlow" className="absolute inset-0 bg-white/10 rounded-2xl pointer-events-none" />
            )}
          </motion.button>
        </div>
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-6">
        <div className="bg-[#121214]/85 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          <div className="absolute -right-12 -bottom-12 text-white/[0.02] font-black text-9xl pointer-events-none select-none font-mono">
            COL
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'stats' ? (
              <motion.div
                key="stats"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-[#136CFC] font-mono text-xs font-bold tracking-widest uppercase block mb-1">
                      Drafted / Debut: 2016
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                      El Monstruo
                    </h3>
                    <p className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed mt-3">
                      Sergio Andrés Higuita García is a Colombian professional cyclist with over a decade of experience competing at the highest level of professional road cycling. He made his professional debut in 2016 with Manzana Postobón.
                    </p>
                    <p className="text-gray-400 font-sans text-xs sm:text-sm leading-relaxed mt-2">
                      He has competed for elite UCI WorldTour teams including Fundación Euskadi (2019), EF Education First (2019–2021), Bora-Hansgrohe (2022–2024), and XDS Astana Team (2025–2026).
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4 font-mono text-xs text-gray-400 space-y-1">
                    <p><strong className="text-white">Specialty:</strong> Versatile Climber & Stage Race Contender</p>
                    <p><strong className="text-white">Origin:</strong> Medellín, Antioquia, Colombia</p>
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col space-y-4">
                  <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentPhoto}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.7 }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={statsPhotos[currentPhoto].src}
                          alt="Sergio Higuita Stats"
                          fill
                          className="object-cover object-center"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="bg-black/50 border border-white/10 p-5 rounded-2xl space-y-3 backdrop-blur-md">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="font-mono text-xs tracking-widest text-[#136CFC] font-bold flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5" /> Attributes & WorldTour Ratings
                      </span>
                      <span className="font-mono text-xs bg-[#136CFC]/20 text-[#136CFC] px-2.5 py-0.5 rounded font-bold">Overall: 84</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {[
                        { label: 'Mountain (MON)', value: 83 },
                        { label: 'Endurance (MEM)', value: 82 },
                        { label: 'Time Trial (CRO)', value: 76 },
                        { label: 'Sprint (SPR)', value: 78 },
                      ].map((stat, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-gray-300">{stat.label}</span>
                            <span className="text-[#136CFC] font-bold">{stat.value}</span>
                          </div>
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${stat.value}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: idx * 0.1 }}
                              className="bg-gradient-to-r from-[#136CFC] to-blue-400 h-full rounded-full shadow-sm shadow-[#136CFC]/50"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="personality"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2 text-[#136CFC] font-mono text-xs font-bold tracking-widest uppercase">
                    <Sparkles className="w-4 h-4" /> MBTI: ENFP (The Campaigner)
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                    The Human Element
                  </h3>
                  <p className="text-gray-300 font-sans text-sm leading-relaxed">
                    Beyond his competitive achievements, Sergio is widely recognized across the international peloton for his trademark smile, bright energy, and authentic optimism. He is an exceptional teammate who naturally uplifts squad morale during grueling grand tours.
                  </p>
                  <p className="text-gray-400 font-sans text-xs sm:text-sm leading-relaxed">
                    Deeply devoted to his family, he is a loving husband, son, and proud pet owner who cherishes his paisa roots in Colombia. Known for his generous spirit, Sergio frequently supports social causes, community initiatives, and animal welfare, always caring deeply for those around him.
                  </p>
                </div>

                <div className="lg:col-span-7 flex flex-col space-y-4">
                  <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden border border-white/15 bg-black/80 shadow-xl">
                    <iframe
                      className="w-full h-full object-cover"
                      src="https://www.youtube.com/embed/2RP9SGCTYKc?autoplay=0&mute=0&controls=1"
                      title="Sergio Higuita Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  <div className="bg-black/50 border border-white/10 p-5 rounded-2xl space-y-3 backdrop-blur-md">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="font-mono text-xs tracking-widest text-[#136CFC] font-bold flex items-center gap-2">
                        <Flame className="w-3.5 h-3.5" /> Human Attributes & Chemistry
                      </span>
                      <span className="font-mono text-xs bg-[#136CFC]/20 text-[#136CFC] px-2.5 py-0.5 rounded font-bold">ENFP Vibe</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {[
                        { label: 'Charisma & Joy (CHR)', value: 95, icon: SmilePlus },
                        { label: 'Team Chemistry (TC)', value: 92, icon: Users },
                        { label: 'Adaptability (ADP)', value: 88, icon: Compass },
                        { label: 'Philanthropy (PHI)', value: 90, icon: HeartHandshake },
                      ].map((stat, idx) => {
                        const IconComp = stat.icon;
                        return (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-xs font-mono items-center">
                              <span className="text-gray-300 flex items-center gap-1.5">
                                <IconComp className="w-3.5 h-3.5 text-[#136CFC]" /> {stat.label}
                              </span>
                              <span className="text-[#136CFC] font-bold">{stat.value}</span>
                            </div>
                            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${stat.value}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: idx * 0.1 }}
                                className="bg-gradient-to-r from-[#136CFC] to-blue-400 h-full rounded-full shadow-sm shadow-[#136CFC]/50"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 md:h-24 text-[#E8F4FC] fill-current">
          <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,20 1200,60 L1200,0 L0,0 Z"></path>
        </svg>
      </div>

    </section>
  );
}