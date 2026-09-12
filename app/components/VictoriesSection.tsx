'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    type: 'card',
    id: 'c1',
    title: "VOLTA A CATALUNYA",
    label: "BARCELONA • 2022",
    badge: "WORLDTOUR GC WINNER",
    desc: "Overall GC victory after a legendary 130km attack.",
    img: "/img/carreras/vueltacataluna.jpeg",
    size: "w-[340px] md:w-[480px] aspect-[4/5]",
    align: "self-start mt-6",
  },
  {
    type: 'quote',
    id: 'q1',
    text: "When I attacked 130 km out, I knew I had to give every drop of energy for Colombia.",
    context: "VOLTA A CATALUNYA • 2022",
    align: "self-center my-auto",
  },
  {
    type: 'card',
    id: 'c2',
    title: "TOUR COLOMBIA 2.1",
    label: "MEDELLIN • 2020",
    badge: "OVERALL GC CHAMPION",
    desc: "Crowned champion in front of thousands of fans on home roads.",
    img: "/img/carreras/tourcolombia.jpeg",
    size: "w-[380px] md:w-[540px] aspect-[16/10]",
    align: "self-end mb-12",
  },
  {
    type: 'quote',
    id: 'q2',
    text: "Riding on home roads with everyone screaming my name on Las Palmas was an unforgettable emotion.",
    context: "TOUR COLOMBIA • 2020",
    align: "self-start mt-16",
  },
  {
    type: 'card',
    id: 'c3',
    title: "VUELTA A ESPAÑA",
    label: "BECERRIL DE LA SIERRA • 2019",
    badge: "STAGE 18 SOLO RAID",
    desc: "First Grand Tour stage win after a daring 50km solo attack.",
    img: "/img/carreras/vueltaespaña.jpeg",
    size: "w-[280px] md:w-[380px] aspect-[1/1]",
    align: "self-center",
  },
  {
    type: 'quote',
    id: 'q3_vuelta',
    text: "Attacking solo 50km from the finish line in a Grand Tour requires faith and a bit of madness. Crossing that line alone was pure magic.",
    context: "VUELTA A ESPAÑA • 2019",
    align: "self-end mb-16",
  },
  {
    type: 'card',
    id: 'c4',
    title: "NATIONAL CHAMPIONSHIPS",
    label: "COLOMBIA • 2020 & 2022",
    badge: "2x ROAD CHAMPION",
    desc: "Crowned National Champion twice to wear the tricolor jersey across Europe.",
    img: "/img/carreras/nacionales2022.webp",
    size: "w-[340px] md:w-[460px] aspect-[4/5]",
    align: "self-start mt-4",
  },
  {
    type: 'quote',
    id: 'q3',
    text: "Wearing the Colombian tricolor jersey in the European peloton is the greatest honor.",
    context: "NATIONAL CHAMPIONSHIP",
    align: "self-end mb-20",
  },
  {
    type: 'card',
    id: 'c5',
    title: "TOUR DE POLOGNE",
    label: "PRZEMYŚL • 2022",
    badge: "STAGE 3 & RACE LEADER",
    desc: "Explosive uphill sprint triumph taking the leader's yellow jersey.",
    img: "/img/carreras/tourpolonia.jpg",
    size: "w-[360px] md:w-[500px] aspect-[16/10]",
    align: "self-end mb-6",
  },
  {
    type: 'quote',
    id: 'q4',
    text: "I knew the last steep kilometer suited my punchy style. I opened full gas to the line.",
    context: "TOUR DE POLOGNE • 2022",
    align: "self-center",
  },
  {
    type: 'card',
    id: 'c6',
    title: "ITZULIA BASQUE COUNTRY",
    label: "AMOREBIETA • 2023",
    badge: "STAGE 5 WINNER",
    desc: "Punchy finish victory against elite WorldTour climbers.",
    img: "/img/carreras/paisvasco.webp",
    size: "w-[300px] md:w-[400px] aspect-[1/1]",
    align: "self-start mt-10",
  },
  {
    type: 'quote',
    id: 'q5',
    text: "In the Basque Country, every climb is a war. Winning here against the best climbers proves what we are made of.",
    context: "ITZULIA BASQUE COUNTRY • 2023",
    align: "self-center",
  },
  {
    type: 'card',
    id: 'c7',
    title: "UCI WORLD CHAMPIONSHIPS",
    label: "YORKSHIRE • 2019",
    badge: "4th PLACE U23",
    desc: "Sensational World Championship performance wearing Colombia's national kit.",
    img: "/img/carreras/mundiales 2019.jpg",
    size: "w-[380px] md:w-[520px] aspect-[16/10]",
    align: "self-end mb-14",
  },
  {
    type: 'quote',
    id: 'q6',
    text: "Racing in the rain of Yorkshire taught me that I could fight at the very top level of WorldTour cycling.",
    context: "UCI WORLD CHAMPIONSHIPS • 2019",
    align: "self-start mt-8",
  },
];

export default function VictoriesSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Estados independientes para cada contador
  const [winsNum, setWinsNum] = useState<number | string>(0);
  const [podiumsNum, setPodiumsNum] = useState<number | string>(0);
  const [secondNum, setSecondNum] = useState<number | string>(0);
  const [thirdNum, setThirdNum] = useState<number | string>(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // CURSOR ADAPTABLE AL TEMA
  useEffect(() => {
    if (!isMounted) return;

    const fillColor = isDarkTheme ? '%23C3F84A' : '%23152641';
    const bikeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="${fillColor}"><path d="M15.5 5.5a2.5 2.5 0 1 0-2.5-2.5 2.5 2.5 0 0 0 2.5 2.5zm-2.8 3.2-1.9 3.2-2.3-1.3a1.5 1.5 0 0 0-2.1.5l-2.1 3.5a1.5 1.5 0 0 0 2.5 1.5l1.6-2.6 1.8 1v4.5a1.5 1.5 0 0 0 3 0v-5.2l1.6-.9 2.2 3.8a1.5 1.5 0 0 0 2.6-1.5l-2.6-4.5a1.5 1.5 0 0 0-1.3-.7z"/></svg>`;
    const cursorUrl = `data:image/svg+xml;utf8,${bikeSvg}`;

    document.body.style.cursor = `url('${cursorUrl}') 16 16, auto`;

    return () => {
      document.body.style.cursor = 'default';
    };
  }, [isMounted, isDarkTheme]);

  // DISPARO DE ANIMACIÓN DE TODOS LOS CONTADORES (SLOT MACHINE DESDE 0)
  const triggerCounters = () => {
    setWinsNum(0);
    setPodiumsNum(0);
    setSecondNum(0);
    setThirdNum(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < 4) {
        setWinsNum(step);
        setPodiumsNum(step * 3);
        setSecondNum(step * 2);
        setThirdNum(step * 2);
      } else if (step < 18) {
        setWinsNum(Math.floor(Math.random() * 85) + 10);
        setPodiumsNum(Math.floor(Math.random() * 70) + 20);
        setSecondNum(Math.floor(Math.random() * 60) + 10);
        setThirdNum(Math.floor(Math.random() * 50) + 10);
      } else {
        clearInterval(interval);
        setWinsNum(11);
        setPodiumsNum(38);
        setSecondNum(15);
        setThirdNum(12);
      }
    }, 50);
  };

  // CANVAS RASTRO DE BICICLETAS SVG
  useEffect(() => {
    if (!isMounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bikeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C3F84A"><path d="M15.5 5.5a2.5 2.5 0 1 0-2.5-2.5 2.5 2.5 0 0 0 2.5 2.5zm-2.8 3.2-1.9 3.2-2.3-1.3a1.5 1.5 0 0 0-2.1.5l-2.1 3.5a1.5 1.5 0 0 0 2.5 1.5l1.6-2.6 1.8 1v4.5a1.5 1.5 0 0 0 3 0v-5.2l1.6-.9 2.2 3.8a1.5 1.5 0 0 0 2.6-1.5l-2.6-4.5a1.5 1.5 0 0 0-1.3-.7z"/></svg>`;
    const blob = new Blob([bikeSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const bikeImg = new Image();
    bikeImg.src = url;

    let bikes: {
      x: number;
      y: number;
      size: number;
      rotation: number;
      vx: number;
      vy: number;
      alpha: number;
    }[] = [];

    let lastMove = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMove < 35) return;
      lastMove = now;

      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      bikes.push({
        x,
        y,
        size: Math.random() * 10 + 16,
        rotation: (Math.random() - 0.5) * 0.4,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -Math.random() * 1.5 - 0.5,
        alpha: 0.85,
      });
    };

    let animId: number;
    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < bikes.length; i++) {
        const b = bikes[i];
        b.x += b.vx;
        b.y += b.vy;
        b.alpha -= 0.015;

        ctx.save();
        ctx.globalAlpha = Math.max(b.alpha, 0);
        ctx.filter = 'blur(1px)';
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rotation);
        if (bikeImg.complete) {
          ctx.drawImage(bikeImg, -b.size / 2, -b.size / 2, b.size, b.size);
        }
        ctx.restore();
      }

      bikes = bikes.filter((b) => b.alpha > 0);
      animId = requestAnimationFrame(render);
    };

    const resize = () => {
      if (sectionRef.current && canvas) {
        canvas.width = sectionRef.current.clientWidth;
        canvas.height = sectionRef.current.clientHeight;
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [isMounted]);

  // SCROLLTRIGGER & GSAP CONTROL
  useEffect(() => {
    if (!isMounted || !sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120);

      gsap.to(section, {
        backgroundColor: '#EBEBE6',
        color: '#151515',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth}`,
          scrub: 1,
          onUpdate: (self) => {
            setIsDarkTheme(self.progress < 0.5);
          },
        },
      });

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onEnter: triggerCounters,
          onEnterBack: triggerCounters,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]);

  if (!isMounted) {
    return <div className="w-full h-screen bg-[#152641]" />;
  }

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#152641] text-[#E8F4FC] overflow-hidden select-none font-sans flex flex-col justify-between py-6 transition-colors duration-700"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-30 w-full h-full"
      />

      <div className="absolute inset-0 pointer-events-none z-0 opacity-25 overflow-hidden">
        <motion.svg 
          animate={{
            x: [0, -30, 0, 30, 0],
            y: [0, 20, -15, 0],
            scale: [1, 1.03, 0.98, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
          }}
          viewBox="0 0 1400 900" 
          className="w-[125%] h-[125%] -top-[12%] -left-[12%] stroke-current fill-none stroke-[0.9]" 
          preserveAspectRatio="none"
        >
          <path d="M -100 200 C 300 50, 700 350, 1500 150" />
          <path d="M -100 380 C 400 180, 800 580, 1500 320" />
          <path d="M -100 560 C 350 360, 950 720, 1500 500" />
          <path d="M -100 740 C 500 500, 900 850, 1500 680" />
        </motion.svg>
      </div>

      {/* CABECERA EDITORIAL CON TELEMETRÍA COMPLETA DE PODIOS */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center px-12 pt-2 max-w-7xl mx-auto w-full gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 25, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#C3F84A] block mb-1">
            // HIGUITA PALMARÈS ARCHIVE
          </span>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">
            REDEFINING <span className="font-light italic opacity-70">LIMITS.</span>
          </h2>
        </motion.div>

        {/* ZONA DE CONTADORES UNIFICADA */}
        <div className="flex items-center gap-6 md:gap-10">
          
          {/* 1.er LUGAR / VICTORIAS */}
          <div className="flex flex-col items-end">
            <div className="flex items-baseline font-black text-4xl md:text-6xl tracking-tighter text-[#C3F84A] leading-none">
              <span>{winsNum}</span>
              <span className="text-xl font-light text-[#136CFC] ml-0.5">+</span>
            </div>
            <span className="text-[8px] md:text-[9px] font-mono font-bold tracking-[0.2em] opacity-70 uppercase mt-0.5">
              VICTORIES
            </span>
          </div>

          <div className="w-[1px] h-8 bg-current opacity-20" />

          {/* TOTAL PODIOS */}
          <div className="flex flex-col items-end">
            <div className="flex items-baseline font-black text-4xl md:text-6xl tracking-tighter text-white leading-none">
              <span>{podiumsNum}</span>
              <span className="text-xl font-light text-[#C3F84A] ml-0.5">+</span>
            </div>
            <span className="text-[8px] md:text-[9px] font-mono font-bold tracking-[0.2em] opacity-70 uppercase mt-0.5">
              PODIUMS
            </span>
          </div>

          <div className="w-[1px] h-8 bg-current opacity-20" />

          {/* 2.º LUGAR */}
          <div className="flex flex-col items-end">
            <div className="flex items-baseline font-light text-3xl md:text-5xl tracking-tighter text-amber-300 leading-none">
              <span>{secondNum}</span>
              <span className="text-base font-extralight ml-0.5">+</span>
            </div>
            <span className="text-[8px] md:text-[9px] font-mono font-bold tracking-[0.2em] opacity-70 uppercase mt-0.5">
              2nd PLACE
            </span>
          </div>

          <div className="w-[1px] h-8 bg-current opacity-20" />

          {/* 3.er LUGAR */}
          <div className="flex flex-col items-end">
            <div className="flex items-baseline font-light text-3xl md:text-5xl tracking-tighter text-orange-400 leading-none">
              <span>{thirdNum}</span>
              <span className="text-base font-extralight ml-0.5">+</span>
            </div>
            <span className="text-[8px] md:text-[9px] font-mono font-bold tracking-[0.2em] opacity-70 uppercase mt-0.5">
              3rd PLACE
            </span>
          </div>

        </div>
      </div>

      {/* TRACK HORIZONTAL DE LA GALERÍA */}
      <div className="relative z-10 w-full overflow-hidden flex-1 flex items-center">
        <div 
          ref={trackRef} 
          className="flex gap-16 md:gap-24 pl-12 md:pl-20 pr-[35vw] w-max items-center h-full"
        >
          {galleryItems.map((item) => {
            if (item.type === 'quote') {
              return (
                <div 
                  key={item.id} 
                  className={`w-[260px] md:w-[340px] flex-shrink-0 text-left ${item.align}`}
                >
                  <p className="font-serif italic text-base md:text-xl leading-relaxed tracking-tight opacity-85">
                    "{item.text}"
                  </p>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#136CFC] uppercase block mt-3 opacity-90">
                    — {item.context}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className={`flex-shrink-0 ${item.size} ${item.align} flex flex-col justify-between group cursor-pointer transition-transform duration-500 hover:-translate-y-2`}
              >
                <div className="flex justify-between items-center mb-2 px-1">
                  <span className="text-[9px] font-mono font-bold tracking-widest uppercase opacity-60">
                    {item.label}
                  </span>
                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#136CFC] uppercase">
                    {item.badge}
                  </span>
                </div>

                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-neutral-900 border border-white/10 group-hover:border-[#C3F84A]/60 transition-colors">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.05]"
                  />
                </div>

                <div className="mt-2 px-1">
                  <h3 className="text-base md:text-xl font-black uppercase tracking-tight leading-none group-hover:text-[#136CFC] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] opacity-70 mt-1 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 text-center text-[10px] font-mono tracking-widest opacity-40 uppercase pt-1">
        [ SWIPE / SCROLL HORIZONTALLY TO TRAVERSE HIGHLIGHTS → ]
      </div>
    </section>
  );
}