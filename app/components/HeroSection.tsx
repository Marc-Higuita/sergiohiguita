'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar'; // <--- Importamos el navbar unificado

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const [maskUrl, setMaskUrl] = useState<string>('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let points: { x: number; y: number; radius: number; alpha: number }[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x, y });

      points.push({
        x,
        y,
        radius: Math.random() * 40 + 120,
        alpha: 1.0,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();

        p.alpha -= 0.012; 
        p.radius *= 0.99;
      }

      points = points.filter((p) => p.alpha > 0);

      setMaskUrl(canvas.toDataURL());
      animationFrameId = requestAnimationFrame(render);
    };

    const resizeCanvas = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const textRowOne = "EXPLOSIVE ATTACKER • PUNCHY CLIMBER • STAGE WINNER • ";
  const textRowTwo = "MEDIUM MOUNTAIN SPECIALIST • ONE-WEEK RACE CONTENDER • ";

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-screen bg-[#E8F4FC] overflow-hidden select-none font-sans flex flex-col justify-between"
    >
      <canvas ref={canvasRef} className="hidden" />

      {/* AQUÍ USAMOS EL NAVBAR COMPARTIDO */}
      <Navbar />

      {/* INDICADOR SCROLL + TEXTO DE HOJA DE VIDA PROFESIONAL */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed bottom-8 left-10 z-40 flex items-center gap-6 mix-blend-difference text-white pointer-events-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1.5 h-2.5 bg-[#C3F84A] rounded-full"
            />
          </div>
          <span className="text-xs font-mono font-bold tracking-widest uppercase">SCROLL DOWN</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-neutral-400 border-l border-white/20 pl-6">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-300">
            // THIS IS MY PROFESSIONAL RESUME
          </span>
        </div>
      </motion.div>

      {/* FONDOS AMBIENTALES */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] bg-[#136CFC]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] right-[12%] w-[600px] h-[600px] bg-[#C3F84A]/10 rounded-full blur-3xl" />

        <svg viewBox="0 0 1400 900" className="w-full h-full stroke-[#136CFC] fill-none stroke-[1.2] opacity-20" preserveAspectRatio="none">
          <path d="M -100 200 C 300 50, 700 350, 1500 150" />
          <path d="M -100 380 C 400 180, 800 580, 1500 320" />
          <path d="M -100 560 C 350 360, 950 720, 1500 500" />
          <path d="M -100 740 C 500 500, 900 850, 1500 680" />
        </svg>
      </div>

      {/* MARQUEE */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none z-0 overflow-hidden leading-none opacity-10 space-y-3 pt-16">
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
            className="flex whitespace-nowrap text-[11rem] md:text-[15rem] font-black uppercase tracking-tighter text-[#152641]"
          >
            <span>{textRowOne}</span>
            <span>{textRowOne}</span>
          </motion.div>
        </div>

        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div 
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
            className="flex whitespace-nowrap text-[11rem] md:text-[15rem] font-black uppercase tracking-tighter text-[#136CFC] italic"
          >
            <span>{textRowTwo}</span>
            <span>{textRowTwo}</span>
          </motion.div>
        </div>
      </div>

      {/* RETRATO DE SERGIO */}
      <div 
        className="relative w-full flex-1 flex items-end justify-center z-10 bottom-0"
        style={{
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
        }}
      >
        <div className="relative w-full max-w-[1400px] h-[88vh] flex items-end justify-center overflow-hidden">
          <img 
            src="/img/section1/sergiouno.png" 
            alt="Sergio Higuita Civil" 
            className="absolute bottom-0 w-auto h-[98%] max-w-none object-contain object-bottom pointer-events-none filter drop-shadow-xl z-10"
          />

          <div 
            className="absolute inset-0 z-20 w-full h-full flex items-end justify-center pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              maskImage: `url(${maskUrl})`,
              WebkitMaskImage: `url(${maskUrl})`,
              maskSize: 'cover',
              WebkitMaskSize: 'cover',
            }}
          >
            <img 
              src="/img/section1/sergiodos.png" 
              alt="Sergio Higuita Ciclista" 
              className="absolute bottom-0 w-auto h-[98%] max-w-none object-contain object-bottom filter drop-shadow-2xl"
            />
          </div>

          {isHovered && (
            <div 
              className="absolute w-[300px] h-[300px] rounded-full border-2 border-[#C3F84A] shadow-[0_0_35px_rgba(195,248,74,0.6)] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-30 transition-transform duration-75 ease-out"
              style={{
                left: `${mousePos.x}px`,
                top: `${mousePos.y}px`,
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}