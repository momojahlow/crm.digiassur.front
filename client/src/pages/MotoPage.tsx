import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import WhyDigiassur from "@/components/WhyDigiassur";
import AssurwiBanner from "@/components/AssurwiBanner";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MotoPage() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#f48161] selection:text-white overflow-x-hidden">
      <DigiassurHeader />
      <FloatingWidgets />

      <main className="flex-1 pt-[116px]">
        {/* ========================================================
            HERO SECTION (Figma Desktop - 8 / id: 238:5)
           ======================================================== */}
        <section className="relative w-full bg-slate-50">
          <div className="hidden md:block w-full">
            <div className="relative w-full h-[470px] bg-[#4d7f9a] overflow-hidden shadow-md">
              <div className={`absolute inset-0 flex ${isRTL ? "flex-row-reverse" : ""}`}>
                {/* Left Photo (Couple on moto with helmet) */}
                <div className="w-1/2 h-full relative overflow-hidden">
                  <img
                    src="/images/banner-moto-couple.png"
                    alt="Assurance Moto Digiassur"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${isRTL ? "from-black/20 to-transparent" : "from-transparent to-black/20"}`} />
                </div>

                {/* Right Slate Blue Container */}
                <div className={`w-1/2 h-full relative flex items-center bg-[#4d7f9a] text-white px-12 lg:px-20 overflow-hidden ${isRTL ? "text-right" : "text-left"}`}>
                  <img
                    src="/images/moto-drawer.svg"
                    alt=""
                    aria-hidden="true"
                    className={`absolute -bottom-16 ${isRTL ? "left-0 -scale-x-100" : "right-0"} h-[480px] w-auto opacity-25 pointer-events-none select-none`}
                  />

                  <div className="relative z-10 max-w-[560px]">
                    <h1 className="font-bold text-3xl lg:text-[42px] leading-tight tracking-tight text-white mb-4">
                      Assurer votre Moto à <br />
                      partir de <span className="text-[#f48161]">62.5 DHS TTC/Mois</span>
                    </h1>

                    <p className="text-xl lg:text-2xl text-cyan-50 font-normal py-2 mb-8">
                      Recevez votre attestation à domicile ou au bureau
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="/moto/devis-moto"
                        className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-sm tracking-wider uppercase px-7 py-3.5 shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span>OBTENIR MON TARIF MOTO</span>
                        <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                      </Link>

                      <Link
                        href="/moto/devis-moto"
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
                <div className="w-[96px] h-[96px] rounded-full bg-[#fde4dd] shadow-2xl flex items-center justify-center border-4 border-white transition hover:scale-105 duration-300">
                  <img src="/images/moto-icon.svg" alt="Moto" className="w-12 h-12 object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Hero */}
          <div 
            className="block md:hidden relative min-h-[460px] bg-cover bg-center flex items-center" 
            style={{ backgroundImage: `url('/images/banner-moto-couple.png')` }}
          >
            <div className="absolute inset-0 bg-[#4d7f9a]/90 backdrop-blur-2xs" />
            <div className="relative z-10 p-6 text-center text-white w-full">
              <div className="w-20 h-20 rounded-full bg-[#fde4dd] shadow-xl flex items-center justify-center mx-auto mb-6 border-4 border-white/80">
                <img src="/images/moto-icon.svg" alt="Moto" className="w-10 h-10 object-contain" />
              </div>
              <h1 className="font-bold text-2xl leading-snug uppercase mb-3">
                Assurez votre Moto à partir de <span className="text-[#f48161]">62.5 DHS TTC/Mois</span>
              </h1>
              <p className="text-base text-cyan-100 font-light mb-8">
                Recevez votre attestation à domicile ou au bureau
              </p>
              <Link
                href="/moto/devis-moto"
                className="w-full bg-[#f48161] text-white font-bold text-sm uppercase py-4 shadow-xl mb-3 cursor-pointer block text-center"
              >
                OBTENIR MON TARIF MOTO
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================
            WELCOME SECTION (Figma Desktop - 8)
           ======================================================== */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1240px] mx-auto px-6">
            <h2 className="text-3xl lg:text-[34px] font-black text-[#153954] text-center mb-14 tracking-tight">
              Bienvenue sur l’espace Moto de Digiassur
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column: Text & Buttons */}
              <div className={`space-y-5 text-slate-600 text-sm lg:text-base leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                <p>
                  L'assurance moto de <strong>Digiassur</strong> est une option intéressante pour les conducteurs qui souhaitent bénéficier d'une couverture d'assurance plus étendue que l'assurance au tiers, tout en ne payant pas autant que pour une bonne assurance.
                </p>
                <p>
                  Cette formule intermédiaire permet de couvrir les dommages causés aux autres véhicules, mais également les dégâts sur votre propre moto en cas de vol, d'incendie.
                </p>
                <p>
                  Elle peut également inclure des garanties supplémentaires telles que l'assistance en cas de panne ou d'accident, ou encore la protection juridique. Cette solution d'assurance intermédiaire est donc adaptée aux conducteurs souhaitant une protection plus complète tout en maîtrisant leur budget.
                </p>
                <p className="font-semibold text-slate-800">
                  Contactez-nous pour obtenir une offre personnalisée et adaptée à vos besoins.
                </p>

                <div className="pt-6 flex flex-wrap gap-4">
                  <Link
                    href="/moto/devis-moto"
                    className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 shadow-md transition transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>OBTENIR MON TARIF MOTO</span>
                    <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                  </Link>

                  <Link
                    href="/moto/devis-moto"
                    className="inline-flex items-center gap-2 bg-[#689ebd] hover:bg-[#588da9] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 shadow-md transition transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>COMPARER MON DEVIS ACTUEL</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Wide Image Handlebars */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-slate-100">
                <img
                  src="/images/banner-moto-handlebars.png"
                  alt="Espace Moto Digiassur"
                  className="w-full h-[360px] lg:h-[420px] object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Partners Logos */}
        <PartnersSection />

        {/* 7 Key Advantages */}
        <WhyDigiassur />

        {/* Assur'wi Banner */}
        <AssurwiBanner />
      </main>

      <DigiassurFooter />
    </div>
  );
}
