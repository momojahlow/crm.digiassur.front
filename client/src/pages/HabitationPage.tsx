import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import WhyDigiassur from "@/components/WhyDigiassur";
import AssurwiBanner from "@/components/AssurwiBanner";
import { 
  ArrowRight, 
  Home, 
  Flame, 
  Droplet, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  Sparkles,
  AlertTriangle,
  Lock
} from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HabitationPage() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#f48161] selection:text-white">
      <DigiassurHeader />

      <main className="flex-1">
        {/* Habitation Hero Section */}
        <section className="relative w-full pt-[116px] bg-slate-50">
          <div className="hidden md:block w-full">
            <div className="relative w-full h-[470px] bg-[#4d7f9a] overflow-hidden shadow-md">
              <div className={`absolute inset-0 flex ${isRTL ? "flex-row-reverse" : ""}`}>
                {/* Left Photo */}
                <div className="w-1/2 h-full relative overflow-hidden">
                  <img
                    src="/images/banner-habitation.jpg"
                    alt="Assurance Habitation Digiassur"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${isRTL ? "from-black/20 to-transparent" : "from-transparent to-black/20"}`} />
                </div>

                {/* Right Slate Blue Container */}
                <div className={`w-1/2 h-full relative flex items-center bg-[#4d7f9a] text-white px-12 lg:px-20 overflow-hidden ${isRTL ? "text-right" : "text-left"}`}>
                  <img
                    src="/images/habitation-drawer.svg"
                    alt=""
                    aria-hidden="true"
                    className={`absolute -bottom-10 ${isRTL ? "left-0 -scale-x-100" : "right-0"} h-[460px] w-auto opacity-25 pointer-events-none select-none`}
                  />

                  <div className="relative z-10 max-w-[560px]">
                    <h1 className="font-bold text-3xl lg:text-[40px] leading-tight tracking-tight text-white mb-4">
                      Assurer votre habitation à <br />
                      partir de <span className="text-[#f48161]">25 DHS TTC/Mois</span>
                    </h1>

                    <p className="text-xl lg:text-2xl text-cyan-50 font-normal py-2 mb-8">
                      Une protection maximale pour votre foyer.
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="/habitation/obtenir-un-devis"
                        className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-sm tracking-wider uppercase px-7 py-3.5 shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span>OBTENIR MON DEVIS</span>
                        <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                      </Link>

                      <Link
                        href="/habitation/obtenir-un-devis"
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
                <div className="w-[96px] h-[96px] rounded-full bg-[#fde4dd] shadow-2xl flex items-center justify-center border-4 border-white/60 transition hover:scale-105 duration-300">
                  <img src="/images/icon-cat-auto.svg" alt="Habitation" className="w-12 h-12 object-contain hidden" />
                  <Home className="w-11 h-11 text-[#f48161]" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Hero */}
          <div 
            className="block md:hidden relative min-h-[460px] bg-cover bg-center flex items-center" 
            style={{ backgroundImage: `url('/images/banner-habitation.jpg')` }}
          >
            <div className="absolute inset-0 bg-[#4d7f9a]/90 backdrop-blur-2xs" />
            <div className="relative z-10 p-6 text-center text-white w-full">
              <div className="w-20 h-20 rounded-full bg-[#fde4dd] shadow-xl flex items-center justify-center mx-auto mb-6 border-4 border-white/80">
                <Home className="w-10 h-10 text-[#f48161]" />
              </div>
              <h1 className="font-bold text-2xl leading-snug uppercase mb-3">
                Assurer votre habitation à partir de <span className="text-[#f48161]">25 DHS TTC/Mois</span>
              </h1>
              <p className="text-base text-cyan-100 font-light mb-8">
                Une protection maximale pour votre foyer.
              </p>
              <Link
                href="/habitation/obtenir-un-devis"
                className="w-full bg-[#f48161] text-white font-bold text-sm uppercase py-4 shadow-xl mb-3 cursor-pointer block text-center"
              >
                OBTENIR MON DEVIS
              </Link>
            </div>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#2f3c4f] text-center mb-14">
              Bienvenue sur l’espace Habitation de Digiassur
            </h2>

            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isRTL ? "text-right" : "text-left"}`}>
              <div className="space-y-6 text-slate-700 leading-relaxed text-base">
                <p className="text-lg font-semibold text-[#153954]">
                  Parce que par définition un risque n’annonce jamais à l’avance sa survenance, vous devez :
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-[#4d7f9a] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <p className="font-medium text-slate-800">
                      Soit être un as de la gestion de votre budget et de votre épargne.
                    </p>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-orange-50 border border-orange-100">
                    <div className="w-8 h-8 rounded-full bg-[#f48161] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <p className="font-medium text-slate-800">
                      Soit vous assurer et transférer le risque à votre assureur ! <br />
                      <strong className="text-[#f48161]">Vous vivrez en paix, il vivra dans l’angoisse !</strong>
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    href="/habitation/obtenir-un-devis"
                    className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase px-8 py-3.5 shadow-md cursor-pointer transition"
                  >
                    <span>OBTENIR MON DEVIS</span>
                    <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <img
                  src="/images/habitation-img-1.png"
                  alt="Habitation Digiassur"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Risk Awareness Section */}
        <section className="py-16 lg:py-24 bg-slate-50 border-y border-slate-100">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-[#f48161] uppercase tracking-widest bg-orange-100/60 px-3.5 py-1.5 rounded-full border border-orange-200">
                Sensibilisation & Protection
              </span>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-[#153954] mt-3">
                Vous êtes propriétaire ou locataire de votre habitation principale ?
              </h3>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                Vous l’avez bâtie ou choisie, et meublée avec amour pour y vivre avec votre famille comme dans un cocon.
                L’achat et l’aménagement ont demandé un budget conséquent financé à crédit.
                <strong> Êtes-vous conscient des risques auxquels votre habitation s’expose ?</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Incendie */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
                  <Flame className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-[#153954] uppercase mb-2">
                  Incendie & Explosion
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Si le feu s'y déclare à cause d’un court-circuit ou problème électrique, vos murs et biens sont indemnisés sans compromettre votre patrimoine.
                </p>
              </div>

              {/* Card 2: Dégâts des eaux */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#4d7f9a] flex items-center justify-center mb-4">
                  <Droplet className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-[#153954] uppercase mb-2">
                  Dégâts des Eaux
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Si une canalisation casse et s'infiltre dans vos murs, parquets et tapis, les réparations sont immédiatement prises en charge.
                </p>
              </div>

              {/* Card 3: Responsabilité Voisins */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-[#153954] uppercase mb-2">
                  Recours des Voisins
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Si un sinistre chez vous se propage chez vos voisins ou au sous-sol, votre responsabilité civile est couverte sans frais imprévus.
                </p>
              </div>

              {/* Card 4: Vol & Vandalisme */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-[#153954] uppercase mb-2">
                  Vol & Vandalisme
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Couverture complète de votre mobilier, équipements électroniques et objets de valeur en cas d’effraction ou de dégradation.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/habitation/obtenir-un-devis"
                className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase px-8 py-3.5 rounded-full shadow-lg transition cursor-pointer"
              >
                <span>Protéger mon logement maintenant</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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
