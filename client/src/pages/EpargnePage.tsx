import DigiassurHeader from "@/components/DigiassurHeader";
import EpargneHero from "@/components/EpargneHero";
import EpargneWelcome from "@/components/EpargneWelcome";
import PartnersSection from "@/components/PartnersSection";
import WhyDigiassur from "@/components/WhyDigiassur";
import AssurwiBanner from "@/components/AssurwiBanner";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";

export default function EpargnePage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#f48161] selection:text-white">
      {/* Navigation Header */}
      <DigiassurHeader />

      <main className="flex-1">
        {/* Hero Section (Figma Desktop - 24) */}
        <EpargneHero />

        {/* Welcome Section (Figma Desktop - 24 / iPhone 14 Pro Max - 15) */}
        <EpargneWelcome />

        {/* Partners Logos (AXA, Allianz, Sanlam, RMA, Assur'wi, AtlantaSanad) */}
        <PartnersSection />

        {/* 7 Key Advantages: Pourquoi choisir Digiassur ? */}
        <WhyDigiassur />

        {/* Legal Authority & CNDP Accreditation */}
        <AssurwiBanner />
      </main>

      {/* Floating Action Bar & Digibot Chat Widget */}
      <FloatingWidgets />

      {/* Official Digiassur Footer */}
      <DigiassurFooter />
    </div>
  );
}
