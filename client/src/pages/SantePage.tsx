import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import WhyDigiassur from "@/components/WhyDigiassur";
import AssurwiBanner from "@/components/AssurwiBanner";
import { 
  ArrowRight, 
  HeartPulse, 
  ShieldCheck, 
  Stethoscope, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  FileHeart 
} from "lucide-react";
import { Link } from "wouter";

export default function SantePage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#f48161] selection:text-white">
      <DigiassurHeader />

      <main className="flex-1">
        {/* Sante Hero Section */}
        <section className="relative w-full pt-[116px] bg-slate-50">
          <div className="hidden md:block w-full">
            <div className="relative w-full h-[470px] bg-[#4d7f9a] overflow-hidden shadow-md">
              <div className="absolute inset-0 flex">
                {/* Left Photo */}
                <div className="w-1/2 h-full relative overflow-hidden">
                  <img
                    src="/images/banner-sante.jpg"
                    alt="Assurance Santé Digiassur"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                </div>

                {/* Right Slate Blue Container */}
                <div className="w-1/2 h-full relative flex items-center bg-[#4d7f9a] text-white px-12 lg:px-20 overflow-hidden">
                  <img
                    src="/images/sante-drawer.png"
                    alt=""
                    aria-hidden="true"
                    className="absolute -bottom-10 right-0 h-[460px] w-auto opacity-20 pointer-events-none select-none"
                  />

                  <div className="relative z-10 max-w-[560px]">
                    <h1 className="font-bold text-3xl lg:text-[40px] leading-tight tracking-tight text-white mb-4">
                      Assurez votre santé à <br />
                      partir de <span className="text-[#f48161]">120 DHS TTC/Mois</span>
                    </h1>

                    <p className="text-xl lg:text-2xl text-cyan-50 font-normal py-2 mb-8">
                      La santé est notre bien le plus précieux. La protéger n'est pas un luxe mais une nécessité !
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="/auto/devis-auto"
                        className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-sm tracking-wider uppercase px-8 py-3.5 shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span>OBTENIR MON DEVIS SANTÉ</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Emblem */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                <div className="w-[96px] h-[96px] rounded-full bg-[#fde4dd] shadow-2xl flex items-center justify-center border-4 border-white/60 transition hover:scale-105 duration-300">
                  <HeartPulse className="w-11 h-11 text-[#f48161]" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Hero */}
          <div 
            className="block md:hidden relative min-h-[460px] bg-cover bg-center flex items-center" 
            style={{ backgroundImage: `url('/images/banner-sante.jpg')` }}
          >
            <div className="absolute inset-0 bg-[#4d7f9a]/90 backdrop-blur-2xs" />
            <div className="relative z-10 p-6 text-center text-white w-full">
              <div className="w-20 h-20 rounded-full bg-[#fde4dd] shadow-xl flex items-center justify-center mx-auto mb-6 border-4 border-white/80">
                <HeartPulse className="w-10 h-10 text-[#f48161]" />
              </div>
              <h1 className="font-bold text-2xl leading-snug uppercase mb-3">
                Assurez votre santé à partir de <span className="text-[#f48161]">120 DHS TTC/Mois</span>
              </h1>
              <p className="text-base text-cyan-100 font-light mb-8">
                La santé est notre bien le plus précieux. Protégez votre famille en toute sérénité.
              </p>
              <Link
                href="/auto/devis-auto"
                className="w-full bg-[#f48161] text-white font-bold text-sm uppercase py-4 shadow-xl mb-3 cursor-pointer block text-center"
              >
                OBTENIR MON DEVIS SANTÉ
              </Link>
            </div>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#2f3c4f] text-center mb-14">
              Bienvenue sur l'espace santé & prévoyance de Digiassur
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-slate-700 leading-relaxed text-base">
                <p className="text-lg font-medium text-slate-600">
                  Chez <strong>Digiassur</strong>, nous offrons une gamme complète d'assurance santé et prévoyance pour répondre à tous vos besoins.
                </p>
                <p>
                  Nos formules sont conçues pour vous offrir une protection financière solide en cas de coup dur, que ce soit pour couvrir les coûts des soins médicaux quotidiens ou pour vous protéger contre les aléas imprévus de la vie.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <Stethoscope className="w-6 h-6 text-[#4d7f9a] mb-2" />
                    <h4 className="font-bold text-sm text-[#153954]">Consultations & Pharmacie</h4>
                    <p className="text-xs text-slate-500 mt-1">Remboursement rapide des ordonnances, bilans et visites chez les spécialistes.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <Activity className="w-6 h-6 text-[#f48161] mb-2" />
                    <h4 className="font-bold text-sm text-[#153954]">Hospitalisation & Tiers Payant</h4>
                    <p className="text-xs text-slate-500 mt-1">Prise en charge directe en clinique sans avance de frais majeurs.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/auto/devis-auto"
                    className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase px-8 py-3.5 shadow-md cursor-pointer transition"
                  >
                    <span>OBTENIR MON DEVIS SANTÉ</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <img
                  src="/images/sante-pic-2.jpg"
                  alt="Santé Digiassur"
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
