'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Mountain } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const pathname = usePathname();

  const menuItems = [
    { name: 'HOME', path: '/', image: '/img/fotosmenu/1.PNG' },
    { name: 'ON TRACK', path: '/on-track', image: '/img/fotosmenu/2.jpg' },
    { name: 'OFF TRACK', path: '/off-track', image: '/img/fotosmenu/3.PNG' },
    { name: 'CALENDAR', path: '/calendar', image: '/img/fotosmenu/4.jpg' },
  ];

  const socialLinks = [
    { name: 'INSTAGRAM', url: 'https://www.instagram.com/sergioandreshiguita?stkn=Y2YzZXR0M2hybzU5' },
    { name: 'TWITTER / X', url: 'https://x.com/higuitsergio?s=11' },
    { name: 'TIKTOK', url: 'https://www.tiktok.com/@higuitamonster?_r=1&_t=ZS-99f0RcmMMpF' },
    { name: 'FACEBOOK', url: 'https://www.facebook.com/share/1HXos5tf4z/' },
    { name: 'THREADS', url: 'https://www.threads.com/@sergioandreshiguita' },
  ];

  // Efecto de cursor ligero para seguir el mouse sin sobrecargar
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMenuOpen]);

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
            className="fixed inset-0 z-50 bg-[#0B0F17] text-white flex flex-col justify-between overflow-y-auto select-none"
          >
            {/* EFECTO DE LUZ SUAVE SIGUIENDO EL MOUSE (100% Fluido) */}
            <div 
              className="absolute pointer-events-none w-[350px] h-[350px] bg-gradient-to-r from-[#3A4EFB]/15 to-[#E3FF3B]/10 rounded-full blur-3xl z-10 transition-transform duration-75 ease-out"
              style={{ 
                transform: `translate(${mousePosition.x - 175}px, ${mousePosition.y - 175}px)` 
              }}
            />

            {/* ONDAS PALPITANTES DE FONDO */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-10">
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.15, 0.35, 0.15] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute w-[500px] h-[500px] rounded-full border border-[#3A4EFB]/40 bg-[#3A4EFB]/10 blur-xl"
              />
              <motion.div
                animate={{ scale: [1, 2.2, 1], opacity: [0.1, 0.25, 0.1] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.8 }}
                className="absolute w-[700px] h-[700px] rounded-full border border-[#E3FF3B]/30 bg-transparent blur-2xl"
              />
            </div>

            {/* ZONA SUPERIOR DERECHA: BOTÓN PODCAST GIGANTE + BOTÓN DE CIERRE (X) */}
            <div className="absolute top-6 right-6 z-[70] flex items-center gap-4 pointer-events-auto">
              {/* Botón de Podcast con Egan Bernal */}
              <motion.a
                href="https://www.youtube.com/watch?v=QoXU7YoA8vg"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.07, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center gap-3.5 px-6 py-3.5 bg-gradient-to-r from-[#FF0000]/20 via-white/10 to-[#3A4EFB]/20 hover:from-[#FF0000]/40 hover:to-[#3A4EFB]/40 border-2 border-[#FF0000]/50 hover:border-[#FF0000] backdrop-blur-xl rounded-2xl text-xs sm:text-sm font-mono font-black tracking-widest text-white transition-all shadow-[0_0_30px_rgba(255,0,0,0.3)] hover:shadow-[0_0_45px_rgba(255,0,0,0.6)] no-underline uppercase"
              >
                <div className="w-6 h-6 flex items-center justify-center bg-[#FF0000] rounded-lg shadow-md animate-pulse">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <span className="drop-shadow-md">Cycla x Egan | EP 03 Monster</span>
                <ArrowUpRight className="w-4 h-4 text-[#E3FF3B]" />
              </motion.a>

              {/* Botón de Cierre (X) */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(false)}
                className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center font-black hover:bg-[#3A4EFB] hover:text-white transition-all shadow-xl cursor-pointer"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Contenido Central */}
            <div className="w-full min-h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-12 relative z-20 items-stretch pt-16 lg:pt-0">
              
              {/* Columna Izquierda: Fotos Dinámicas */}
              <div className="lg:col-span-6 relative min-h-[350px] lg:min-h-full bg-black overflow-hidden flex items-center justify-center">
                {menuItems.map((item, idx) => {
                  const isVisible = hoveredIndex !== null ? hoveredIndex === idx : idx === 0;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 1.05 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B0F17]/80 hidden lg:block" />
                    </motion.div>
                  );
                })}
              </div>

              {/* Columna Derecha: Menú y Redes */}
              <div className="lg:col-span-6 flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-12 lg:py-0">
                <nav className="flex flex-col space-y-6 mb-10">
                  {menuItems.map((item, idx) => {
                    const isActive = pathname === item.path;
                    const isHovered = hoveredIndex === idx;

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 * idx + 0.1, duration: 0.5, ease: "easeOut" }}
                        className="relative"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <Link
                          href={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`text-5xl sm:text-7xl font-black uppercase tracking-tighter transition-all flex items-center justify-between no-underline py-2 group ${
                            isActive 
                              ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#3A4EFB] to-[#E3FF3B]' 
                              : isHovered 
                              ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#3A4EFB] to-[#3A4EFB]/70 translate-x-4' 
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          <span className="relative inline-block">
                            {item.name}
                            
                            {/* ANIMACIÓN DE MONTAÑA SVG CUANDO ESTÁ EN LA SECCIÓN ACTIVA */}
                            {isActive && (
                              <motion.div 
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="absolute -bottom-3 left-0 w-full overflow-hidden text-[#3A4EFB]"
                              >
                                <svg className="w-full h-5" viewBox="0 0 200 24" fill="none" preserveAspectRatio="none">
                                  <path d="M0 20 L40 8 L75 16 L120 4 L160 14 L200 6" stroke="url(#mountainGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                  <defs>
                                    <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                      <stop offset="0%" stopColor="#3A4EFB" />
                                      <stop offset="100%" stopColor="#E3FF3B" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                              </motion.div>
                            )}
                          </span>

                          <motion.div
                            animate={{ rotate: isHovered ? 45 : 0, scale: isHovered ? 1.2 : 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowUpRight className={`w-9 h-9 text-[#3A4EFB] ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                          </motion.div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* REDES SOCIALES */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="pt-8 border-t border-white/15"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Mountain className="w-3.5 h-3.5 text-[#3A4EFB]" />
                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400 font-bold">
                      SOCIAL CHANNELS
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2.5 bg-white/5 hover:bg-gradient-to-r hover:from-[#3A4EFB]/30 hover:to-[#E3FF3B]/20 border border-white/10 hover:border-[#3A4EFB]/60 backdrop-blur-md rounded-xl text-xs font-mono font-bold tracking-wider text-neutral-300 hover:text-white transition-all shadow-lg no-underline uppercase"
                      >
                        {social.name}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>

            </div>

            {/* Pie inferior limpio */}
            <div className="max-w-7xl mx-auto w-full px-8 sm:px-16 lg:px-20 py-6 border-t border-white/10 flex justify-between items-center text-xs font-mono tracking-widest text-neutral-500 relative z-20">
              <p>© 2026 SERGIO HIGUITA. ALL RIGHTS RESERVED.</p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}