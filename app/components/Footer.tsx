'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const pagesLinks = [
  { name: 'HOME', href: '#hero' },
  { name: 'ON TRACK', href: '#victories' },
  { name: 'OFF TRACK', href: '#socials' },
  { name: 'CALENDAR', href: '#calendar' },
];

const socialLinks = [
  { name: 'INSTAGRAM', url: 'https://www.instagram.com/sergioandreshiguita?stkn=Y2YzZXR0M2hybzU5' },
  { name: 'TWITTER / X', url: 'https://x.com/higuitsergio?s=11' },
  { name: 'TIKTOK', url: 'https://www.tiktok.com/@higuitamonster?_r=1&_t=ZS-99f0RcmMMpF' },
  { name: 'FACEBOOK', url: 'https://www.facebook.com/share/1HXos5tf4z/' },
  { name: 'THREADS', url: 'https://www.threads.com/@sergioandreshiguita' },
];

const riderTraits = [
  'PUNCHY CLIMBER',
  'STAGE WINNER',
  'ATTACKER SPECIALIST',
  'NATIONAL CHAMPION',
  'MONSTER HIGUITA',
  'PELOTON LEADER',
  'HIGH ALTITUDE BEAST',
  'CLASSICS SPECIALIST',
  'COLOMBIAN MONSTER',
];

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end']
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [15, 0]);

  return (
    <footer ref={footerRef} className="relative w-full bg-[#0D120D] text-white font-sans overflow-hidden block">
      
      {/* 1. DEGRADADO SUPERIOR SUAVE */}
      <div className="absolute top-0 left-0 w-full h-36 bg-gradient-to-b from-[#E8F4FC] via-[#0D120D]/80 to-[#0D120D] z-30 pointer-events-none" />

      {/* 2. LATIDOS NEÓN INTENSOS + MONTAÑAS ANIMADAS */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        
        {/* PULSOS DE CORAZÓN / CARDIOGRAMA */}
        <motion.div
          animate={{ scale: [1, 1.35, 1], opacity: [0.3, 0.75, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="absolute w-[450px] h-[450px] md:w-[680px] md:h-[680px] rounded-full border-2 border-[#C3F84A]/60 bg-radial from-[#C3F84A]/25 to-transparent blur-md shadow-[0_0_50px_rgba(195,248,74,0.4)]"
        />
        <motion.div
          animate={{ scale: [1, 1.55, 1], opacity: [0.2, 0.55, 0.2] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 0.25 }}
          className="absolute w-[700px] h-[700px] md:w-[1000px] md:h-[1000px] rounded-full border border-[#136CFC]/50 bg-radial from-[#136CFC]/15 to-transparent blur-xl"
        />

        {/* LÍNEAS DE ALTIMETRÍA / MONTAÑA */}
        <svg 
          className="absolute bottom-10 left-0 w-full h-64 text-[#C3F84A]/20 opacity-60" 
          viewBox="0 0 1200 300" 
          fill="none" 
          preserveAspectRatio="none"
        >
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
            d="M0,250 L150,200 L300,240 L450,110 L600,180 L750,50 L900,160 L1050,90 L1200,220" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeDasharray="8 8"
          />
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{ repeat: Infinity, duration: 15, ease: "easeInOut", delay: 1 }}
            d="M0,280 L200,220 L380,160 L520,230 L700,90 L850,140 L1000,40 L1200,180" 
            stroke="#136CFC" 
            strokeWidth="2" 
            opacity="0.4"
          />
        </svg>

        {/* Malla técnica */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* 3. CONTENEDOR PRINCIPAL */}
      <div className="relative w-full min-h-screen flex flex-col justify-between pt-36 pb-4 px-4 md:px-12 z-10">
        
        {/* CABECERA: TÍTULO CON LATIDO BOOM-BOOM Y CRÉDITO DE LA VUELTA A ESPAÑA */}
        <div className="text-center relative z-20 pt-4">
          <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none text-white select-none">
            IF THERE IS{' '}
            <motion.span 
              animate={{ scale: [1, 1.06, 1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="inline-block text-[#C3F84A] font-serif italic font-light drop-shadow-[0_0_30px_rgba(195,248,74,0.6)]"
            >
              HEART,
            </motion.span>
            <br />
            THERE ARE{' '}
            <motion.span 
              animate={{ scale: [1, 1.06, 1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 0.15 }}
              className="inline-block text-[#C3F84A] font-serif italic font-light drop-shadow-[0_0_30px_rgba(195,248,74,0.6)]"
            >
              LEGS.
            </motion.span>
          </h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] sm:text-xs font-mono font-bold text-gray-400 tracking-[0.3em] uppercase mt-4"
          >
            — SERGIO HIGUITA // VUELTA A ESPAÑA, STAGE 18 VICTORY
          </motion.p>
        </div>

        {/* 4. SECCIÓN CENTRAL: FOTO Y NAVEGACIÓN */}
        <div className="relative w-full flex flex-col justify-end min-h-[500px] md:min-h-[620px] mt-auto">
          
          {/* MARQUESINA EXPANDIDA CON CARACTERÍSTICAS */}
          <div className="absolute bottom-28 left-0 w-full z-15 overflow-hidden border-y border-white/10 py-3.5 bg-[#0D120D]/50 backdrop-blur-xs">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ ease: 'linear', duration: 28, repeat: Infinity }}
              className="flex w-max items-center gap-8"
            >
              {[0, 1].map((blockIndex) => (
                <div key={blockIndex} className="flex items-center gap-8 pr-8">
                  {riderTraits.concat(riderTraits).map((trait, idx) => (
                    <React.Fragment key={idx}>
                      <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-gray-300 uppercase whitespace-nowrap">
                        {trait}
                      </span>
                      <span className="text-[#C3F84A] text-xs">•</span>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* FOTO AMPLIADA PEGADA AL BORDE INFERIOR REAL */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[850px] md:max-w-[1150px] h-full flex items-end justify-center pointer-events-none z-10">
            <motion.div 
              style={{ y: imgY }}
              className="relative w-full h-full flex items-end justify-center"
            >
              <img
                src="/img/footer.png"
                alt="Sergio Higuita"
                className="w-full max-h-[650px] md:max-h-[850px] object-contain object-bottom filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] select-none"
              />

              {/* MÁSCARA DE DEGRADADO EN LA BASE */}
              <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-[#0D120D] via-[#0D120D]/70 to-transparent pointer-events-none" />
            </motion.div>
          </div>

          {/* COLUMNAS LATERALES (PAGES / CONTACT / FOLLOW ON) */}
          <div className="relative w-full grid grid-cols-1 md:grid-cols-3 items-end gap-6 z-30 pb-4">
            
            {/* COLUMNA IZQUIERDA: PAGES */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left pb-6">
              <span className="text-[11px] font-mono font-bold tracking-[0.3em] text-gray-400 uppercase mb-3 block">
                PAGES
              </span>
              <nav className="flex flex-col gap-2">
                {pagesLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    whileHover={{ x: 10, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="text-2xl sm:text-4xl font-black tracking-tight text-white hover:text-[#C3F84A] hover:drop-shadow-[0_0_15px_rgba(195,248,74,0.8)] transition-colors duration-200 uppercase inline-block"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* COLUMNA CENTRO: BOTÓN DE CONTACTO */}
            <div className="relative w-full flex flex-col items-center justify-end pb-4">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsContactOpen(true)}
                className="bg-[#C3F84A] hover:bg-white text-[#0D120D] font-mono font-black text-xs sm:text-sm tracking-widest uppercase px-8 py-4 rounded-full shadow-[0_0_35px_rgba(195,248,74,0.6)] hover:shadow-[0_0_50px_rgba(255,255,255,0.9)] transition-all duration-300 flex items-center gap-3 cursor-pointer z-40"
              >
                <span>CONTACT SERGIO</span>
                <span className="text-base font-bold">↗</span>
              </motion.button>
            </div>

            {/* COLUMNA DERECHA: FOLLOW ON */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right pb-6">
              <span className="text-[11px] font-mono font-bold tracking-[0.3em] text-gray-400 uppercase mb-3 block">
                FOLLOW ON
              </span>
              <div className="flex flex-col gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: -10, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="text-2xl sm:text-4xl font-black tracking-tight text-white hover:text-[#C3F84A] hover:drop-shadow-[0_0_15px_rgba(195,248,74,0.8)] transition-colors duration-200 uppercase inline-block"
                  >
                    {social.name}
                  </motion.a>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* 5. COPYRIGHT EN LAS ESQUINAS INFERIORES */}
        <div className="relative z-30 w-full flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-gray-400 font-bold tracking-wider uppercase pt-3 border-t border-white/5">
          <div className="hover:text-white transition-colors">
            © 2026 SERGIO HIGUITA. ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-[#C3F84A] transition-colors">
              PRIVACY POLICY
            </a>
            <span className="text-gray-600">•</span>
            <a href="#terms" className="hover:text-[#C3F84A] transition-colors">
              TERMS OF SERVICE
            </a>
          </div>
        </div>

      </div>

      {/* POPUP DE CONTACTO */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsContactOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#152641] border border-[#C3F84A]/40 text-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-[0_0_50px_rgba(195,248,74,0.3)] text-center relative"
            >
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-mono cursor-pointer"
              >
                ✕
              </button>

              <div className="inline-flex items-center gap-2 bg-[#C3F84A]/10 border border-[#C3F84A]/30 px-4 py-1.5 rounded-full mb-4">
                <span className="w-2 h-2 rounded-full bg-[#C3F84A] animate-ping" />
                <span className="text-[10px] font-mono font-bold text-[#C3F84A] tracking-widest uppercase">
                  BUSINESS & MEDIA ENQUIRIES
                </span>
              </div>

              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
                GET IN TOUCH
              </h3>
              <p className="text-xs text-gray-300 font-sans mb-6">
                Para patrocinios, prensa o colaboraciones oficiales con Sergio Higuita:
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="mailto:sergio.a.h.g@hotmail.com"
                  className="flex items-center justify-between bg-white/10 hover:bg-[#C3F84A] hover:text-[#0D120D] border border-white/20 px-5 py-3.5 rounded-2xl transition-all duration-300 group"
                >
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-mono font-bold text-gray-400 group-hover:text-[#0D120D]/70">EMAIL</span>
                    <span className="text-sm font-mono font-bold">sergio.a.h.g@hotmail.com</span>
                  </div>
                  <span className="text-sm font-bold">✉ ↗</span>
                </a>

                <a
                  href="https://wa.me/573136118724"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-white/10 hover:bg-[#C3F84A] hover:text-[#0D120D] border border-white/20 px-5 py-3.5 rounded-2xl transition-all duration-300 group"
                >
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-mono font-bold text-gray-400 group-hover:text-[#0D120D]/70">WHATSAPP</span>
                    <span className="text-sm font-mono font-bold">+57 313 611 8724</span>
                  </div>
                  <span className="text-sm font-bold">💬 ↗</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </footer>
  );
}