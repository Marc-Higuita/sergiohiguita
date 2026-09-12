import ScrollProgress from './components/ScrollProgress';
import HeroSection from './components/HeroSection';
import QuoteSection from './components/QuoteSection';
import VictoriesSection from './components/VictoriesSection';
import TeamsSection from './components/TeamsSection';
import SocialsAndCultureSection from './components/SocialsAndCultureSection';
import Footer from './components/Footer';
import ReturnToTop from './components/ReturnToTop';


export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#E8F4FC] overflow-x-hidden">
      <ScrollProgress />
      <HeroSection />
      <QuoteSection />
      <VictoriesSection />
      <TeamsSection />
      <SocialsAndCultureSection />
      <Footer />
      <ReturnToTop />
    </main>
  );
}