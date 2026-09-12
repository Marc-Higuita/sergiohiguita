'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Mountain, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();

  const menuItems = [
    { name: 'HOME', path: '/', image: '/img/menu/1.jpg' },
    { name: 'ON TRACK', path: '/on-track', image: '/img/menu/2.jpg' },
    { name: 'OFF TRACK', path: '/off-track', image: '/img/menu/3.jpg' },
    { name: 'CALENDAR', path: '/calendar', image: '/img/menu/4.jpg' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full px-6 sm:px-10 py-8 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none">
        <a href="/" className="flex flex-col text-left group pointer-events-auto">
          <span className="font-light text-3xl md:text-4xl tracking-tight uppercase leading-[0.85] opacity-80 group-hover:opacity-100 transition-opacity">
            SERGIO
          </span>
          <span className="font-black text-4xl md:text-5xl tracking-tighter uppercase leading-[0.85]">
            HIGUITA
          </span>
        </a>

        <div className="flex items-center gap-4 pointer-events-auto relative">
          <a 
            href="/on-track" 
            className="px-6 py-3 bg-[#136CFC] text-white font-black text-xs md:text-sm tracking-widest uppercase rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2.5 cursor-pointer no-underline"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M15.5 5.5a2.5 2.5 0 1 0-2.5-2.5 2.5 2.5 0 0 0 2.5 2.5zm-2.8 3.2-1.9 3.2-2.3-1.3a1.5 1.5 0 0 0-2.1.5l-2.1 3.5a1.5 1.5 0 0 0 2.5 1.5l1.6-2.6 1.8 1v4.5a1.5 1.5 0 0 0 3 0v-5.2l1.6-.9 2.2 3.8a1.5 1.5 0 0 0 2.6-1.5l-2.6-4.5a1.5 1.5 0 0 0-1.3-.7z"/>
            </svg>
            ON TRACK
          </a>

          {/* Botón MENU */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="px-5 py-3 bg-white text-black font-black text-xs md:text-sm tracking-widest uppercase rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2.5 cursor-pointer focus:outline-none z-[60]"
          >
            <div className="w-4 h-3 flex flex-col justify-between items-center">
              <span className="w-full h-0.5 bg-black rounded-full" />
              <span className="w-full h-0.5 bg-black rounded-full" />
              <span className="w-full h-0.5 bg-black rounded-full" />
            </div>
            <span>MENU</span>
          </button>
        </div>
      </header>

      {/* OVERLAY DE MENÚ A PANTALLA COMPLETA */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#0B0F17] text-white flex flex-col justify-between p-6 sm:p-14 overflow-y-auto"
          >
            {/* Fondo con textura fluida */}
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
              <motion.div 
                animate={{ backgroundPosition: ['0px 0px', '80px 80px'] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="w-full h-full absolute inset-0 bg-[radial-gradient(#136CFC_1px,transparent_1px)] [background-size:36px_36px]"
              />
            </div>

            {/* Botón de Cierre (X) Superior Derecho */}
            <div className="absolute top-6 right-6 z-[70] pointer-events-auto">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center font-black hover:bg-[#136CFC] hover:text-white transition-all shadow-xl hover:scale-105 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="w-full h-4" />

            {/* Contenido Central: Distribución Asimétrica Orgánica */}
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto relative z-10">
              
              {/* Lado Izquierdo: Collage Asimétrico de Fotos */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-5 items-center">
                
                <Link
                  href={menuItems[0].path}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={() => setHoveredIndex(0)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative h-64 sm:h-76 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:z-20 bg-black/50 border border-white/10 block"
                >
                  <Image
                    src={menuItems[0].image}
                    alt="Home"
                    fill
                    className={`object-cover transition-all duration-700 ${hoveredIndex === 0 ? 'scale-110 grayscale-0' : 'filter grayscale opacity-85'}`}
                  />
                </Link>

                <Link
                  href={menuItems[1].path}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={() => setHoveredIndex(1)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative h-64 sm:h-76 sm:translate-y-8 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:z-20 bg-black/50 border border-white/10 block"
                >
                  <Image
                    src={menuItems[1].image}
                    alt="On Track"
                    fill
                    className={`object-cover transition-all duration-700 ${hoveredIndex === 1 ? 'scale-110 grayscale-0' : 'filter grayscale opacity-85'}`}
                  />
                </Link>

                <Link
                  href={menuItems[2].path}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={() => setHoveredIndex(2)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative h-56 sm:h-68 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:z-20 bg-black/50 border border-white/10 block"
                >
                  <Image
                    src={menuItems[2].image}
                    alt="Off Track"
                    fill
                    className={`object-cover transition-all duration-700 ${hoveredIndex === 2 ? 'scale-110 grayscale-0' : 'filter grayscale opacity-85'}`}
                  />
                </Link>

                <Link
                  href={menuItems[3].path}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={() => setHoveredIndex(3)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative h-56 sm:h-68 sm:-translate-y-6 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:z-20 bg-black/50 border border-white/10 block"
                >
                  <Image
                    src={menuItems[3].image}
                    alt="Calendar"
                    fill
                    className={`object-cover transition-all duration-700 ${hoveredIndex === 3 ? 'scale-110 grayscale-0' : 'filter grayscale opacity-85'}`}
                  />
                </Link>

              </div>

              {/* Lado Derecho: Enlaces con Animación de Montaña al hacer Hover y Tachado Activo */}
              <nav className="lg:col-span-6 flex flex-col space-y-4 lg:pl-10">
                {menuItems.map((item, idx) => {
                  const isActive = pathname === item.path;
                  const isHovered = hoveredIndex === idx;

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 * idx + 0.1, duration: 0.4 }}
                      className="relative group"
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <Link
                        href={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-4xl sm:text-6xl font-black uppercase tracking-tighter transition-all flex items-center justify-between no-underline relative py-1 ${
                          isActive ? 'text-[#136CFC]' : isHovered ? 'text-white' : 'text-neutral-400'
                        }`}
                      >
                        <span className="relative">
                          {item.name}

                          {isActive && (
                            <svg className="absolute -top-3 left-0 w-full h-8 pointer-events-none text-[#136CFC]" viewBox="0 0 300 40" fill="none" preserveAspectRatio="none">
                              <path d="M5 30 Q 75 5, 150 25 T 295 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                          )}
                        </span>

                        <div className="flex items-center gap-3">
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-1.5 bg-[#136CFC]/20 border border-[#136CFC]/40 px-3 py-1 rounded-full text-[#136CFC]"
                          >
                            <Mountain className="w-4 h-4 animate-pulse" />
                            <span className="text-[10px] font-mono tracking-widest">EXPLORE</span>
                          </motion.div>
                          <ArrowUpRight className={`w-7 h-7 transition-all ${isHovered ? 'text-[#136CFC] translate-x-1 -translate-y-1 opacity-100' : 'opacity-0'}`} />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

            </div>

            {/* Pie del Menú con Botón "Contact me" y Redes */}
            <div className="max-w-7xl mx-auto w-full pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono tracking-widest text-neutral-400 relative z-10">
              
              <a 
                href="mailto:sergio.a.h.g@hotmail.com"
                className="flex items-center gap-2.5 bg-white/5 hover:bg-[#136CFC]/20 border border-white/15 hover:border-[#136CFC] px-5 py-2.5 rounded-xl text-white transition-all shadow-lg group no-underline cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#136CFC] group-hover:scale-110 transition-transform" />
                <span className="font-bold uppercase tracking-wider text-neutral-200 group-hover:text-white">Contact me</span>
              </a>

              <div className="flex gap-6 uppercase font-bold text-neutral-400">
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-[#136CFC] transition-colors">Tiktok</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#136CFC] transition-colors">Instagram</a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">YouTube</a>
                <a href="https://twitch.tv" target="_blank" rel="noreferrer" className="hover:text-[#136CFC] transition-colors">Twitch</a>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}