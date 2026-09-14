'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const teamsData = [
  {
    id: 'astana',
    name: "ASTANA QAZAQSTAN",
    years: "2025 - PRESENT",
    role: "WORLDTOUR LEADER & CLIMBER",
    description: "Assuming total leadership in high mountains, driving strategic breakaways, and commanding the WorldTour roster in premier European stage races.",
    imgProfile: "/img/equipos/astana1.png",
    imgAction: "/img/equipos/astana2.jpg",
    rotate: -14,
    translateX: -200,
  },
  {
    id: 'bora',
    name: "BORA - HANSGROHE",
    years: "2022 - 2024",
    role: "GC CHAMPION & STAGE WINNER",
    description: "Crowned Volta a Catalunya Overall GC Champion after a legendary 130km raid, securing multiple WorldTour podiums and dominant stage triumphs.",
    imgProfile: "/img/equipos/bora1.png",
    imgAction: "/img/equipos/bora2.jpg",
    rotate: -7,
    translateX: -100,
  },
  {
    id: 'ef',
    name: "EF EDUCATION - EASYPOST",
    years: "2019 - 2021",
    role: "KEY TACTICAL ALLY & STAGE WINNER",
    description: "Conquered Stage 18 of the Vuelta a España with an elite solo attack, claimed the Tour Colombia GC crown, and served as a vital tactical powerhouse.",
    imgProfile: "/img/equipos/ef.png",
    imgAction: "/img/equipos/ef2.jpg",
    rotate: 0,
    translateX: 0,
  },
  {
    id: 'euskadi',
    name: "EUSKADI MURIAS",
    years: "2019",
    role: "BREAKTHROUGH PRO CLIMBER",
    description: "Ignited the Basque squad with fierce acceleration, driving the team to historic victories, podium finishes, and breakthrough European prominence.",
    imgProfile: "/img/equipos/eukadi.png",
    imgAction: "/img/equipos/euskadi2.jpg",
    rotate: 7,
    translateX: 100,
  },
  {
    id: 'manzana',
    name: "MANZANA POSTOBÓN",
    years: "2016 - 2018",
    role: "PRO CONTINENTAL ORIGINS",
    description: "Forged his professional roots in the mountains, lighting up international breakaways and establishing his explosive climbing signature.",
    imgProfile: "/img/equipos/manzana1.png",
    imgAction: "/img/equipos/manzana2.webp",
    rotate: 14,
    translateX: 200,
  },
];

export default function TeamsSection() {
  const [hasMounted, setHasMounted] = useState(false);
  const [hoveredTeam, setHoveredTeam] = useState<typeof teamsData[0] | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: -300, y: -300 });

  // Estado para el cambio automático de fotos en la vista tablet y móvil
  const [autoAction, setAutoAction] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Intervalo para alternar las fotos automáticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoAction((prev) => !prev);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!hasMounted || !sectionRef.current || !deckRef.current) return;

    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.team-card-stack');

      if (cards.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1800',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      if (bannerRef.current) {
        tl.to(
          bannerRef.current,
          {
            height: '28vh',
            opacity: 0.8,
            ease: 'power1.inOut',
          },
          0
        );
      }

      cards.forEach((card, index) => {
        const item = teamsData[index];
        if (item) {
          tl.to(
            card,
            {
              xPercent: item.translateX,
              rotation: item.rotate,
              yPercent: -8 + index * -2,
              ease: 'power2.out',
            },
            0.1
          );
        }
      });
    }, sectionRef);

    // Forzar actualización de ScrollTrigger tras el montaje
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, [hasMounted]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  if (!hasMounted) {
    return <section className="w-full min-h-screen bg-[#0D0D0D]" />;
  }

  return (
    <>
      <style jsx global>{`
        @media (min-width: 1333px) {
          .teams-tablet-view {
            display: none !important;
          }
        }
      `}</style>

      <section 
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className="relative w-full min-h-screen min-[1333px]:h-screen bg-[#0D0D0D] text-[#E8F4FC] z-30 font-sans border-t border-white/10 overflow-y-auto min-[1333px]:overflow-hidden flex flex-col justify-between select-none shadow-[0_-30px_60px_rgba(0,0,0,0.95)]"
      >
        {/* 1. BANNER SERGIO */}
        <div 
          ref={bannerRef}
          className="relative w-full h-[40vh] min-[1333px]:h-[60vh] overflow-hidden transition-all duration-300 z-10 shrink-0"
        >
          <img 
            src="/img/equipos/bannersergio.jpg" 
            alt="Sergio Higuita Banner" 
            className="w-full h-full object-cover object-center filter contrast-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent" />
        </div>

        {/* 2. FONDO VIVO */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-50 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial from-[#C3F84A]/30 via-[#136CFC]/20 to-transparent rounded-full blur-[110px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border-2 border-dashed border-[#C3F84A]/35 rounded-full" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* 3. RASTRO DEL CURSOR */}
        <div 
          className="hidden min-[1333px]:block fixed pointer-events-none z-40 w-32 h-32 rounded-full blur-2xl opacity-60 bg-gradient-to-r from-[#C3F84A] via-[#136CFC] to-[#FF1493] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        />

        {/* 4. TOOLTIP FLOTANTE */}
        <div
          className={`hidden min-[1333px]:block fixed pointer-events-none z-50 max-w-xs bg-[#152641]/95 backdrop-blur-md border border-[#C3F84A]/50 p-4 rounded-xl shadow-2xl text-left transition-all duration-200 ${
            hoveredTeam ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            left: `${cursorPos.x + 20}px`,
            top: `${cursorPos.y + 20}px`,
          }}
        >
          {hoveredTeam && (
            <>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#C3F84A] animate-ping" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#C3F84A] uppercase">
                  {hoveredTeam.name}
                </span>
              </div>
              <p className="text-xs text-white/90 font-sans leading-relaxed">
                {hoveredTeam.description}
              </p>
            </>
          )}
        </div>

        {/* 5. CABECERA EDITORIAL */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-16 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 -mt-8 min-[1333px]:-mt-12">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.35em] uppercase text-[#C3F84A] block mb-1">
              // PROFESSIONAL CAREER LEGACY
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">
              TEAMS <span className="font-serif italic font-light text-white/70">HALL OF FAME</span>
            </h2>
          </div>

          <div className="hidden min-[1333px]:flex items-center gap-4 bg-white/5 border border-[#C3F84A]/30 backdrop-blur-xl px-5 py-2.5 rounded-2xl shadow-xl">
            <div className="w-7 h-7 rounded-xl bg-[#C3F84A] text-[#0D0D0D] flex items-center justify-center font-bold animate-bounce shadow-md">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono font-black text-[#C3F84A] tracking-wider uppercase">
                HOW TO INTERACT:
              </span>
              <span className="text-[9px] font-mono text-white/80 tracking-widest uppercase">
                1. SCROLL DOWN TO FAN-OUT CARDS // 2. HOVER TO UNLOCK CAREER STATS
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6A. VISTA ESCRITORIO (>= 1333px): MAZO EN ABANICO ORIGINAL */}
        {/* ========================================================================= */}
        <div className="hidden min-[1333px]:flex relative w-full flex-1 items-center justify-center z-20 pt-6 pb-2">
          <div ref={deckRef} className="relative w-[360px] h-[480px] flex items-center justify-center">
            {teamsData.map((team, index) => (
              <div
                key={team.id}
                onMouseEnter={() => setHoveredTeam(team)}
                onMouseLeave={() => setHoveredTeam(null)}
                style={{ zIndex: teamsData.length - index }}
                className="team-card-stack absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-[#141414] border border-white/10 hover:border-[#C3F84A] transition-colors duration-300 cursor-pointer shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between p-6 group"
              >
                <div className="absolute inset-0 rounded-3xl pointer-events-none p-[1px] overflow-hidden">
                  <div className="absolute -inset-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_280deg,#C3F84A_360deg)] animate-[spin_3.5s_linear_infinite]" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent z-20 pointer-events-none" />

                <div className="absolute inset-0 flex items-end justify-center z-10 pointer-events-none">
                  <img
                    src={team.imgProfile}
                    alt={`${team.name} Profile`}
                    className="w-full h-[96%] object-contain object-bottom filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] group-hover:opacity-0 transition-opacity duration-500"
                  />
                  <img
                    src={team.imgAction}
                    alt={`${team.name} Action`}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out filter contrast-[1.08]"
                  />
                </div>

                <div className="relative z-30 flex justify-between items-center">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-white/60 uppercase">
                    {team.role}
                  </span>
                  <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C3F84A] animate-ping" />
                    <span className="text-[11px] font-mono font-bold text-[#C3F84A] tracking-wider">
                      {team.years}
                    </span>
                  </div>
                </div>

                <div className="relative z-30">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-none">
                    {team.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6B. VISTA TABLET E INTERMEDIA CON CLASE BLINDADA .teams-tablet-view */}
        {/* ========================================================================= */}
        <div className="teams-tablet-view hidden md:flex min-[1333px]:hidden w-full max-w-5xl mx-auto flex-1 items-center justify-center z-20 px-4 py-6">
          <div className="flex flex-col items-center justify-center gap-5 w-full">
            {/* Fila superior: 2 cartas */}
            <div className="flex justify-center gap-5 w-full">
              {teamsData.slice(0, 2).map((team) => (
                <div
                  key={team.id}
                  className="relative w-[310px] h-[470px] rounded-3xl overflow-hidden bg-[#141414] border border-white/10 hover:border-[#C3F84A] transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between p-5 group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent z-20 pointer-events-none" />

                  <div className="absolute inset-0 flex items-end justify-center z-10 overflow-hidden pointer-events-none">
                    <img
                      src={team.imgProfile}
                      alt={`${team.name} Profile`}
                      className={`w-full h-[105%] object-contain object-bottom -translate-y-6 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] transition-opacity duration-700 ${
                        autoAction ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                    <img
                      src={team.imgAction}
                      alt={`${team.name} Action`}
                      className={`absolute inset-0 w-full h-full object-cover filter contrast-[1.08] transition-opacity duration-700 ${
                        autoAction ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>

                  <div className="relative z-30 flex justify-between items-center">
                    <span className="text-[8px] font-mono font-bold tracking-widest text-white/70 uppercase">
                      {team.role}
                    </span>
                    <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C3F84A]" />
                      <span className="text-[9px] font-mono font-bold text-[#C3F84A]">
                        {team.years}
                      </span>
                    </div>
                  </div>

                  <div className="relative z-30 flex flex-col gap-1.5 mt-auto">
                    <h3 className="text-base font-black uppercase tracking-tight text-white leading-none">
                      {team.name}
                    </h3>
                    <p className="text-[11px] text-white/95 font-sans leading-relaxed">
                      {team.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Fila inferior: 3 cartas */}
            <div className="flex justify-center gap-5 w-full">
              {teamsData.slice(2, 5).map((team) => (
                <div
                  key={team.id}
                  className="relative w-[310px] h-[470px] rounded-3xl overflow-hidden bg-[#141414] border border-white/10 hover:border-[#C3F84A] transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between p-5 group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent z-20 pointer-events-none" />

                  <div className="absolute inset-0 flex items-end justify-center z-10 overflow-hidden pointer-events-none">
                    <img
                      src={team.imgProfile}
                      alt={`${team.name} Profile`}
                      className={`w-full h-[105%] object-contain object-bottom -translate-y-6 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] transition-opacity duration-700 ${
                        autoAction ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                    <img
                      src={team.imgAction}
                      alt={`${team.name} Action`}
                      className={`absolute inset-0 w-full h-full object-cover filter contrast-[1.08] transition-opacity duration-700 ${
                        autoAction ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>

                  <div className="relative z-30 flex justify-between items-center">
                    <span className="text-[8px] font-mono font-bold tracking-widest text-white/70 uppercase">
                      {team.role}
                    </span>
                    <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C3F84A]" />
                      <span className="text-[9px] font-mono font-bold text-[#C3F84A]">
                        {team.years}
                      </span>
                    </div>
                  </div>

                  <div className="relative z-30 flex flex-col gap-1.5 mt-auto">
                    <h3 className="text-base font-black uppercase tracking-tight text-white leading-none">
                      {team.name}
                    </h3>
                    <p className="text-[11px] text-white/95 font-sans leading-relaxed">
                      {team.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6C. VISTA MÓVIL (< 775px): BLOQUES VERTICALES */}
        {/* ========================================================================= */}
        <div className="flex md:hidden flex-col w-full max-w-md mx-auto px-6 py-8 gap-6 z-20">
          <p className="text-[10px] font-mono text-[#C3F84A] tracking-widest text-center uppercase">
            [ AUTO-EXPLORING TEAMS LEGACY ]
          </p>

          {teamsData.map((team) => (
            <div
              key={team.id}
              className="relative w-full rounded-2xl overflow-hidden bg-[#141414] border border-white/10 p-5 flex flex-col gap-4 shadow-xl"
            >
              <div className="flex justify-between items-center z-20">
                <span className="text-[9px] font-mono font-bold tracking-widest text-white/60 uppercase max-w-[60%]">
                  {team.role}
                </span>
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C3F84A]" />
                  <span className="text-[10px] font-mono font-bold text-[#C3F84A] tracking-wider">
                    {team.years}
                  </span>
                </div>
              </div>

              <div className="relative w-full h-52 rounded-xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center">
                <img
                  src={team.imgProfile}
                  alt={team.name}
                  className={`absolute w-full h-[95%] object-contain object-bottom -translate-y-3 filter drop-shadow-md transition-opacity duration-700 ${
                    autoAction ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <img
                  src={team.imgAction}
                  alt={team.name}
                  className={`absolute inset-0 w-full h-full object-cover filter contrast-[1.08] transition-opacity duration-700 ${
                    autoAction ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="flex flex-col gap-2 z-20">
                <h3 className="text-xl font-black uppercase tracking-tight text-white">
                  {team.name}
                </h3>
                <p className="text-xs text-white/80 font-sans leading-relaxed">
                  {team.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center text-[10px] font-mono tracking-widest text-white/50 uppercase pb-4">
          [ SERGIO HIGUITA // WORLDTOUR TEAMS ARCHIVE ]
        </div>
      </section>
    </>
  );
}