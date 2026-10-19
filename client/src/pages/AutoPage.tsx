import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import WhyDigiassur from "@/components/WhyDigiassur";
import AssurwiBanner from "@/components/AssurwiBanner";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AutoPage() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#f48161] selection:text-white">
      <DigiassurHeader />

      <main className="flex-1">
        {/* Auto Hero Section */}
        <section className="relative w-full pt-[116px] bg-slate-50">
          <div className="hidden md:block w-full">
            <div className="relative w-full h-[470px] bg-[#4d7f9a] overflow-hidden shadow-md">
              <div className={`absolute inset-0 flex ${isRTL ? "flex-row-reverse" : ""}`}>
                {/* Left Photo */}
                <div className="w-1/2 h-full relative overflow-hidden">
                  <img
                    src="/images/banner-auto.jpg"
                    alt="Assurance Auto Digiassur"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${isRTL ? "from-black/20 to-transparent" : "from-transparent to-black/20"}`} />
                </div>

                {/* Right Slate Blue Container */}
                <div className={`w-1/2 h-full relative flex items-center bg-[#4d7f9a] text-white px-12 lg:px-20 overflow-hidden ${isRTL ? "text-right" : "text-left"}`}>
                  <img
                    src="/images/car-drawer.svg"
                    alt=""
                    aria-hidden="true"
                    className={`absolute -bottom-16 ${isRTL ? "left-0 -scale-x-100" : "right-0"} h-[480px] w-auto opacity-30 pointer-events-none select-none`}
                  />

                  <div className="relative z-10 max-w-[560px]">
                    <h1 className="font-bold text-3xl lg:text-[42px] leading-tight tracking-tight text-white mb-4">
                      Assurer votre voiture à <br />
                      partir de <span className="text-[#f48161]">153 DHS TTC/Mois</span>
                    </h1>

                    <p className="text-xl lg:text-2xl text-cyan-50 font-normal py-2 mb-8">
                      Recevez votre attestation à domicile ou au bureau
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="/auto/devis-auto"
                        className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-sm tracking-wider uppercase px-7 py-3.5 shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span>OBTENIR MON TARIF AUTO</span>
                        <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                      </Link>

                      <Link
                        href="/auto/devis-auto"
                        className="inline-flex items-center gap-2 bg-[#689ebd] hover:bg-[#588da9] text-white font-bold text-sm tracking-wider uppercase px-7 py-3.5 shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span>COMPARER MON DEVIS ACTUEL</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Emblem */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                <div className="w-[96px] h-[96px] rounded-full bg-[#dbf2f4] shadow-2xl flex items-center justify-center border-4 border-white/60 transition hover:scale-105 duration-300">
                  <img src="/images/car-icon.svg" alt="Auto" className="w-12 h-12 object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Hero */}
          <div className="block md:hidden relative min-h-[460px] bg-cover bg-center flex items-center" style={{ backgroundImage: `url('/images/banner-auto.jpg')` }}>
            <div className="absolute inset-0 bg-[#4d7f9a]/90 backdrop-blur-2xs" />
            <div className="relative z-10 p-6 text-center text-white w-full">
              <div className="w-20 h-20 rounded-full bg-[#dbf2f4] shadow-xl flex items-center justify-center mx-auto mb-6 border-4 border-white/80">
                <img src="/images/car-icon.svg" alt="Auto" className="w-10 h-10 object-contain" />
              </div>
              <h1 className="font-bold text-2xl leading-snug uppercase mb-3">
                Assurez votre voiture à partir de 153 DHS TTC/Mois
              </h1>
              <p className="text-base text-cyan-100 font-light mb-8">
                Recevez votre attestation à domicile ou au bureau
              </p>
              <Link
                href="/auto/devis-auto"
                className="w-full bg-[#f48161] text-white font-bold text-sm uppercase py-4 shadow-xl mb-3 cursor-pointer block text-center"
              >
                OBTENIR MON TARIF AUTO
              </Link>
            </div>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#2f3c4f] text-center mb-14">
              Bienvenue sur l'espace Auto de Digiassur
            </h2>

            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isRTL ? "text-right" : "text-left"}`}>
              <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                <p>
                  L'assurance auto de <strong className="text-[#153954]">Digiassur</strong> est une option intéressante pour les conducteurs qui souhaitent bénéficier d'une couverture d'assurance plus étendue que l'assurance au tiers, tout en ne payant pas autant que pour une assurance tous risques.
                </p>
                <p>
                  Cette formule intermédiaire permet de couvrir les dommages causés aux autres véhicules, mais également les dégâts sur votre propre voiture en cas de vol, d'incendie ou de bris de glace.
                </p>
                <p>
                  Elle peut également inclure des garanties supplémentaires telles que l'assistance en cas de panne ou d'accident, ou encore la protection juridique. Cette solution d'assurance intermédiaire est donc adaptée aux conducteurs souhaitant une protection plus complète tout en maîtrisant leur budget.
                </p>
                <p>
                  Contactez-nous pour obtenir une offre personnalisée et adaptée à vos besoins.
                </p>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href="/auto/devis-auto"
                    className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase px-7 py-3.5 shadow-md cursor-pointer transition"
                  >
                    OBTENIR MON TARIF AUTO
                  </Link>
                  <Link
                    href="/auto/devis-auto"
                    className="inline-flex items-center gap-2 bg-[#689ebd] hover:bg-[#588da9] text-white font-bold text-xs uppercase px-7 py-3.5 shadow-md cursor-pointer transition"
                  >
                    COMPARER MON DEVIS ACTUEL
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <img
                  src="/images/familly-car.png"
                  alt="Véhicule familial Digiassur"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <PartnersSection />

        {/* Why Digiassur */}
        <WhyDigiassur />

        {/* Assurwi Regulatory */}
        <AssurwiBanner />
      </main>

      <FloatingWidgets />
      <DigiassurFooter />
    </div>
  );
}
