'use client';

import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import SocialsAndCultureSection from '@/app/components/SocialsAndCultureSection';
import HeroSection from './HeroSection';
import HighlightsSection from './HighlightsSection';
import TeamsDashboardSection from './TeamsDashboardSection';
import GlobalNavigationOverlay from './GlobalNavigationOverlay';
import VideoInterviewsSection from './VideoInterviewsSection';

export default function OnTrackPage() {
  return (
    <div className="relative w-full bg-[#E8F4FC] text-[#0D0D0D] font-sans overflow-x-hidden selection:bg-[#136CFC] selection:text-white border-0 outline-none">
      
      {/* Overlay global flotante de navegación y scroll */}
      <GlobalNavigationOverlay />

      {/* Navbar principal */}
      <Navbar />

      {/* Sección Hero */}
      <HeroSection />

      {/* Highlights */}
      <HighlightsSection />

      {/* Teams Dashboard */}
      <TeamsDashboardSection />

      {/* Sección de entrevistas y videos de YouTube */}
      <VideoInterviewsSection />

      {/* Sección de redes sociales y cultura */}
      <SocialsAndCultureSection />

      {/* Footer corporativo al final del todo */}
      <div className="relative z-30 bg-[#0D0D0D] border-0">
        <Footer />
      </div>

    </div>
  );
}