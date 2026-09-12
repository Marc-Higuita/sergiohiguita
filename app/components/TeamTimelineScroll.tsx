'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const careerErasData = [
  {
    teamName: "EF Education First Era",
    era: "2019–2021",
    quoteTitle: "Exploding Onto the Global Stage",
    mainDescription: "Higuita didn't just enter the WorldTour; he conquered it instantly. Nicknamed the \"Monster\" by team boss Jonathan Vaughters, his 2019 transition to EF is the stuff of legend. He dismantled the elite field to win Stage 18 of the Vuelta a España in his Grand Tour debut, holding off chasing giants like Primož Roglič and Alejandro Valverde. He immediately backed this up by going head-to-head with Tadej Pogačar, finishing a close 2nd overall at the Tour of California. Solidifying his status in 2020, he won the Tour Colombia by conquering Egan Bernal, snatched the National Champion tricolor jersey, and stormed the Paris-Nice overall podium (3rd).",
    seasons: [
      {
        year: "2019",
        seasonTitle: "2019 Season: Fundación Euskadi / EF Education First",
        description: "His official breakout year, prompting a mid-season WorldTour transfer.",
        image: "/img/destacado/españa.jpeg",
        races: [
          { name: "Vuelta a España", category: "Grand Tour", result: "🥇 1st place (Stage 18) / 14th Overall" },
          { name: "Tour of California", category: "UCI WorldTour", result: "🥈 2nd place Overall (behind Tadej Pogačar)" },
          { name: "Giro dell'Emilia", category: "UCI ProSeries", result: "🥉 3rd place" }
        ]
      },
      {
        year: "2020",
        seasonTitle: "2020 Season: EF Pro Cycling",
        description: "Established himself as an elite contender",
        image: "/img/destacado/nacionalcampeon.jpg",
        races: [
          { name: "Tour Colombia", category: "UCI America Tour", result: "🥇 1st place Overall / Stage 4 Winner" },
          { name: "Colombian National Championship", category: "National", result: "🥇 Road Race Champion" },
          { name: "Paris-Nice", category: "UCI WorldTour", result: "🥉 3rd place Overall / White Jersey winner" }
        ]
      },
      {
        year: "2021",
        seasonTitle: "2021 Season: EF Education-Nippo",
        description: "A season characterized by steady support roles in Grand Tours and strong elite placements.",
        image: "/img/destacado/algarve.jpg",
        races: [
          { name: "Giro de Lombardia", category: "Monument", result: "10th place" },
          { name: "Tour de France", category: "Grand Tour", result: "25th place Overall" }
        ]
      }
    ]
  },
  {
    teamName: "Bora-Hansgrohe Era",
    era: "2022–2024",
    quoteTitle: "Peak Masterclass and Elite Royalty",
    mainDescription: "His transfer to the German powerhouse unleashed Higuita at the absolute peak of his powers. 2022 was an exhibition of cycling royalty: he captured the Volta a Catalunya general classification after an iconic 130km tactical raid alongside Richard Carapaz, effectively defeating both the Ecuadorian Olympic champion and João Almeida. That same year, he took 2nd overall at the Tour de Suisse right behind Geraint Thomas and reclaimed his National Champion crown. Even when hit by setbacks later on, his world-class caliber flashed brightly by overpowering the field to secure an elite WorldTour stage victory at Itzulia Basque Country.",
    seasons: [
      {
        year: "2022",
        seasonTitle: "2022 Season: Bora-Hansgrohe",
        description: "Peak Masterclass and Elite Royalty",
        image: "/img/destacado/cataluna.jpg",
        races: [
          { name: "Volta a Catalunya", category: "UCI WorldTour", result: "🥇 1st place Overall" },
          { name: "Colombian National Championship", category: "National", result: "🥇 Road Race Champion" },
          { name: "Tour de Suisse", category: "UCI WorldTour", result: "🥈 2nd place Overall" },
          { name: "Giro de Lombardia", category: "Monument", result: "4th place" }
        ]
      },
      {
        year: "2023",
        seasonTitle: "2023: Bora-Hansgrohe",
        description: "Continued consistency in major WorldTour stages and hard races.",
        image: "/img/destacado/romandi.jpg",
        races: [
          { name: "Itzulia Basque Country", category: "UCI WorldTour", result: "🥇 1st place (Stage 5)" },
          { name: "Vuelta a San Juan", category: "UCI ProSeries", result: "🥈 2nd place Overall" }
        ]
      },
      {
        year: "2024",
        seasonTitle: "2024: Red Bull-Bora-Hansgrohe",
        description: "A transitional year resulting in fewer individual opportunities before his next big team move.",
        image: "/img/destacado/andalucia.jpeg",
        races: [
          { name: "Tour de Suisse", category: "UCI WorldTour", result: "12th place Overall" },
          { name: "Vuelta a Burgos", category: "UCI ProSeries", result: "10th place Overall" }
        ]
      }
    ]
  },
  {
    teamName: "XDS Astana Team Era",
    era: "2025–2026",
    quoteTitle: "New Horizons and Leadership",
    mainDescription: "Seeking absolute leadership, Higuita's move to the Kazakh project proved he remains one of the sport's most dangerous assets. Tasked with spearheading week-long stage races, he immediately re-established his elite consistency. His brilliant, tactically aggressive 2nd place overall at the AlUla Tour—where he fought fiercely alongside Jan Christen and Igor Arrieta—and a highly competitive top-15 showing in the grueling mountains of the Tour de France cemented his status as a permanent threat against the next generation of riders.",
    seasons: [
      {
        year: "2025–2026",
        seasonTitle: "2025–2026: XDS Astana Team",
        description: "Re-energized his role as a primary punchy climber and week-long stage race co-leader for the Kazakh team.",
        image: "/img/ontrack/principal.png",
        races: [
          { name: "AlUla Tour (2026)", category: "UCI Asia Tour", result: "🥈 2nd place Overall" },
          { name: "Vuelta a España (2025)", category: "Grand Tour", result: "Top climber support / Breakaway contender" }
        ]
      }
    ]
  }
];

export default function TeamTimelineScroll() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transformar el scroll vertical en movimiento horizontal fluido
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#0D0D0D] text-white">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        <motion.div style={{ x }} className="flex gap-20 px-12 md:px-24">
          {careerErasData.map((team, index) => (
            <div key={index} className="w-[85vw] md:w-[70vw] lg:w-[60vw] flex-shrink-0 flex flex-col justify-center space-y-10">
              
              {/* Encabezado del Equipo */}
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#136CFC]/10 border border-[#136CFC]/30 px-4 py-1.5 rounded-full">
                  <span className="text-[10px] font-mono font-bold text-[#136CFC] tracking-[0.3em] uppercase">
                    {team.teamName} // {team.era}
                  </span>
                </div>
                <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
                  {team.quoteTitle}
                </h2>
                <p className="text-gray-300 font-sans text-base sm:text-lg leading-relaxed">
                  {team.mainDescription}
                </p>
              </div>

              {/* Tarjetas de Años en Fila Horizontal */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {team.seasons.map((season, sIdx) => (
                  <div 
                    key={sIdx}
                    className="bg-neutral-900/90 border border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
                  >
                    <div className="w-full h-44 rounded-2xl overflow-hidden mb-4 relative">
                      <img 
                        src={season.image} 
                        alt={season.seasonTitle} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        <span className="text-xs font-mono font-bold text-[#136CFC]">
                          {season.year}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-sm font-bold font-sans uppercase tracking-wide text-white">
                        {season.seasonTitle}
                      </h3>
                      <p className="text-[11px] font-mono text-gray-400">
                        {season.description}
                      </p>

                      <div className="space-y-1.5 pt-3 border-t border-white/10">
                        {season.races.map((race, rIdx) => (
                          <div key={rIdx} className="flex justify-between items-center text-[11px] font-mono py-1 border-b border-white/5">
                            <span className="text-gray-300 truncate max-w-[160px]">{race.name}</span>
                            <span className="font-bold text-[#136CFC]">{race.result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}