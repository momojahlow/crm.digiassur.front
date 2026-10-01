import { useCallback } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import EpargneHero from "@/components/EpargneHero";
import EpargneWelcome from "@/components/EpargneWelcome";
import PartnersSection from "@/components/PartnersSection";
import EpargneSimulatorForm from "@/components/EpargneSimulatorForm";
import WhyDigiassur from "@/components/WhyDigiassur";
import AssurwiBanner from "@/components/AssurwiBanner";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";

export default function Home() {
  const scrollToSimulation = useCallback(() => {
    const el = document.getElementById("simulation");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#f48161] selection:text-white">
      {/* Navigation Header */}
      <DigiassurHeader onSimulate={scrollToSimulation} />

      <main className="flex-1">
        {/* Hero Section (Figma Desktop - 24) */}
        <EpargneHero onSimulate={scrollToSimulation} />

        {/* Welcome Section (Figma Desktop - 24 / iPhone 14 Pro Max - 15) */}
        <EpargneWelcome onSimulate={scrollToSimulation} />

        {/* Partners Logos (AXA, Allianz, Sanlam, RMA, Assur'wi, AtlantaSanad) */}
        <PartnersSection />

        {/* Interactive Simulation & Contact Form (Figma Desktop - 25) */}
        <EpargneSimulatorForm />

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
