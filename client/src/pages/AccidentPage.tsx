import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import WhyDigiassur from "@/components/WhyDigiassur";
import AssurwiBanner from "@/components/AssurwiBanner";
import { ArrowRight, CheckCircle2, Shield, HeartPulse, Stethoscope, Clock } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AccidentPage() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#f48161] selection:text-white">
      <DigiassurHeader />

      <main className="flex-1">
        {/* Accident Hero Section */}
        <section className="relative w-full pt-[116px] bg-slate-50">
          <div className="hidden md:block w-full">
            <div className="relative w-full h-[470px] bg-[#4d7f9a] overflow-hidden shadow-md">
              <div className={`absolute inset-0 flex ${isRTL ? "flex-row-reverse" : ""}`}>
                {/* Left Photo */}
                <div className="w-1/2 h-full relative overflow-hidden">
                  <img
                    src="/images/banner-accident.jpg"
                    alt="Assurance Individuelle Accident Digiassur"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${isRTL ? "from-black/20 to-transparent" : "from-transparent to-black/20"}`} />
                </div>

                {/* Right Slate Blue Container */}
                <div className={`w-1/2 h-full relative flex items-center bg-[#4d7f9a] text-white px-12 lg:px-20 overflow-hidden ${isRTL ? "text-right" : "text-left"}`}>
                  <img
                    src="/images/accident-drawer.svg"
                    alt=""
                    aria-hidden="true"
                    className={`absolute -bottom-10 ${isRTL ? "left-0 -scale-x-100" : "right-0"} h-[460px] w-auto opacity-25 pointer-events-none select-none`}
                  />

                  <div className="relative z-10 max-w-[560px]">
                    <h1 className="font-bold text-3xl lg:text-[40px] leading-tight tracking-tight text-white mb-4">
                      Soyez protégé en cas d'accident <br />
                      corporel à partir de <span className="text-[#f48161]">26 DHS TTC/Mois</span>
                    </h1>

                    <p className="text-xl lg:text-2xl text-cyan-50 font-normal py-2 mb-8 leading-snug">
                      Une protection maximale en cas d'accident de la vie privée et professionnelle
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="/accident/devis-accident"
                        className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-sm tracking-wider uppercase px-8 py-3.5 shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span>OBTENIR MON DEVIS</span>
                        <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Emblem */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                <div className="w-[96px] h-[96px] rounded-full bg-[#f8e2d8] shadow-2xl flex items-center justify-center border-4 border-white/60 transition hover:scale-105 duration-300">
                  <img src="/images/icon-cat-accident.svg" alt="Accident" className="w-12 h-12 object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Hero */}
          <div 
            className="block md:hidden relative min-h-[460px] bg-cover bg-center flex items-center" 
            style={{ backgroundImage: `url('/images/banner-accident.jpg')` }}
          >
            <div className="absolute inset-0 bg-[#4d7f9a]/90 backdrop-blur-2xs" />
            <div className="relative z-10 p-6 text-center text-white w-full">
              <div className="w-20 h-20 rounded-full bg-[#f8e2d8] shadow-xl flex items-center justify-center mx-auto mb-6 border-4 border-white/80">
                <img src="/images/icon-cat-accident.svg" alt="Accident" className="w-10 h-10 object-contain" />
              </div>
              <h1 className="font-bold text-2xl leading-snug uppercase mb-3">
                SOYEZ PROTÉGÉ EN CAS D'ACCIDENT CORPOREL À PARTIR DE <span className="text-[#f48161]">26 DHS TTC/MOIS</span>
              </h1>
              <p className="text-base text-cyan-100 font-light mb-8">
                Une protection maximale en cas d'accident de la vie privée et professionnelle
              </p>
              <Link
                href="/accident/devis-accident"
                className="w-full bg-[#f48161] text-white font-bold text-sm uppercase py-4 shadow-xl mb-3 cursor-pointer block text-center"
              >
                OBTENIR MON DEVIS
              </Link>
            </div>
          </div>
        </section>

        {/* Section 1: Bienvenue sur l'espace Accident de Digiassur */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#2f3c4f] text-center mb-14">
              Bienvenue sur l'espace Accident de Digiassur
            </h2>

            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isRTL ? "text-right" : "text-left"}`}>
              <div className="space-y-6 text-slate-700 leading-relaxed text-base">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-[#f48161] text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <p className="font-medium text-slate-800">
                      Renseignez vos informations et celles de vos bénéficiaires.
                    </p>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-[#f48161] text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <p className="font-medium text-slate-800">
                      Choisissez la formule qui vous convient (Pomme, Orange ou Kiwi).
                    </p>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-[#f48161] text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <p className="font-medium text-slate-800">
                      Commandez et signez votre contrat en toute sérénité.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/accident/devis-accident"
                    className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase px-8 py-3.5 shadow-md cursor-pointer transition"
                  >
                    <span>OBTENIR MON DEVIS</span>
                    <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <img
                  src="/images/accident-pic-1.jpg"
                  alt="Protection Accident Digiassur"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Pourquoi souscrire une prévoyance individuelle en cas d'accident ? */}
        <section className="py-16 lg:py-24 bg-slate-50 border-y border-slate-100">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100 order-2 lg:order-1">
                <img
                  src="/images/accident-pic-2.jpg"
                  alt="Pourquoi souscrire une prévoyance accident"
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="space-y-6 order-1 lg:order-2">
                <h3 className="text-2xl lg:text-3xl font-extrabold text-[#153954]">
                  Pourquoi souscrire une prévoyance individuelle en cas d'accident ?
                </h3>

                <ul className="space-y-4">
                  {[
                    "Pour protéger votre famille des conséquences qu’un accident pourrait provoquer sur le niveau de vie que vous leur avez toujours offert,",
                    "Pour compenser une perte de revenus suite à tout accident (ex: sport amateur, loisirs, voyage, domestique, agression ...), qui vous empêcherait d’exercer votre activité professionnelle momentanément,",
                    "Pour bénéficier d’un complément d’indemnisation en cas de survenance d’un accident de la vie professionnelle (accident du travail) ou d’un accident de circulation,",
                    "Pour garder l’esprit libre et profiter de chaque jour de votre vie !"
                  ].map((text, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 text-slate-700 leading-relaxed text-sm">
                      <div className="w-6 h-6 rounded-md bg-[#dbf2f4] text-[#4d7f9a] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <CheckCircle2 className="w-4 h-4 text-[#4d7f9a]" />
                      </div>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <Link
                    href="/accident/devis-accident"
                    className="inline-flex items-center gap-2 bg-[#4d7f9a] hover:bg-[#3d6880] text-white font-bold text-xs uppercase px-8 py-3.5 shadow-md cursor-pointer transition"
                  >
                    <span>SOUSCRIRE EN LIGNE</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Que couvre Digiassur accident ? */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#2f3c4f] text-center mb-14">
              Que couvre Digiassur accident ?
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              <div className="space-y-6">
                {/* Coverage 1 */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#f48161] flex items-center justify-center">
                      <Shield className="w-5 h-5" />
                    </div>
                    <h4 className="font-extrabold text-base text-[#153954] uppercase tracking-wide">
                      GARANTIE DÉCÈS
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    En cas d’accident dans le cadre de la vie privée ou professionnelle de l’assuré, un capital défini sera versé aux bénéficiaires désignés dans le contrat.
                  </p>
                </div>

                {/* Coverage 2 */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-cyan-100 text-[#4d7f9a] flex items-center justify-center">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <h4 className="font-extrabold text-base text-[#153954] uppercase tracking-wide">
                      FRAIS MÉDICAUX, PHARMACEUTIQUES, CHIRURGICAUX ET D’HOSPITALISATION
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Le remboursement des frais médicaux, pharmaceutiques et chirurgicaux suite à un accident allant jusqu’à 100.000 DH par année.
                  </p>
                </div>

                {/* Coverage 3 */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <h4 className="font-extrabold text-base text-[#153954] uppercase tracking-wide">
                      INDEMNITÉS JOURNALIÈRES D’HOSPITALISATION
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Une indemnité journalière dès le 1er jour d’hospitalisation et jusqu’à 120 jours consécutifs.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/accident/devis-accident"
                    className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase px-8 py-3.5 shadow-md cursor-pointer transition"
                  >
                    <span>OBTENIR MON DEVIS ACCIDENT</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <img
                  src="/images/accident-pic-3.jpg"
                  alt="Que couvre Digiassur accident"
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
