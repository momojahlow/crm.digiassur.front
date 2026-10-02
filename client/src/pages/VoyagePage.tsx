import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import WhyDigiassur from "@/components/WhyDigiassur";
import AssurwiBanner from "@/components/AssurwiBanner";
import { 
  ArrowRight, 
  Plane, 
  ShieldCheck, 
  FileCheck2, 
  Car, 
  HeartHandshake, 
  Globe2, 
  Clock, 
  CheckCircle2 
} from "lucide-react";
import { Link } from "wouter";

export default function VoyagePage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#f48161] selection:text-white">
      <DigiassurHeader />

      <main className="flex-1">
        {/* Voyage Hero Section */}
        <section className="relative w-full pt-[116px] bg-slate-50">
          <div className="hidden md:block w-full">
            <div className="relative w-full h-[470px] bg-[#4d7f9a] overflow-hidden shadow-md">
              <div className="absolute inset-0 flex">
                {/* Left Photo */}
                <div className="w-1/2 h-full relative overflow-hidden">
                  <img
                    src="/images/banner-voyage.jpg"
                    alt="Assurance Voyage Digiassur"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                </div>

                {/* Right Slate Blue Container */}
                <div className="w-1/2 h-full relative flex items-center bg-[#4d7f9a] text-white px-12 lg:px-20 overflow-hidden">
                  <img
                    src="/images/voyage-drawer.svg"
                    alt=""
                    aria-hidden="true"
                    className="absolute -bottom-10 right-0 h-[460px] w-auto opacity-25 pointer-events-none select-none"
                  />

                  <div className="relative z-10 max-w-[560px]">
                    <h1 className="font-bold text-3xl lg:text-[40px] leading-tight tracking-tight text-white mb-4">
                      Votre assurance voyage à <br />
                      partir de <span className="text-[#f48161]">650 DHS TTC/An</span>
                    </h1>

                    <p className="text-xl lg:text-2xl text-cyan-50 font-normal py-2 mb-8">
                      Une protection maximale pour votre voyage dans le monde entier.
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="/voyage/obtenir-un-devis"
                        className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-sm tracking-wider uppercase px-8 py-3.5 shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span>OBTENIR MON DEVIS</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Emblem */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                <div className="w-[96px] h-[96px] rounded-full bg-[#dbf2f4] shadow-2xl flex items-center justify-center border-4 border-white/60 transition hover:scale-105 duration-300">
                  <Plane className="w-11 h-11 text-[#4d7f9a]" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Hero */}
          <div 
            className="block md:hidden relative min-h-[460px] bg-cover bg-center flex items-center" 
            style={{ backgroundImage: `url('/images/banner-voyage.jpg')` }}
          >
            <div className="absolute inset-0 bg-[#4d7f9a]/90 backdrop-blur-2xs" />
            <div className="relative z-10 p-6 text-center text-white w-full">
              <div className="w-20 h-20 rounded-full bg-[#dbf2f4] shadow-xl flex items-center justify-center mx-auto mb-6 border-4 border-white/80">
                <Plane className="w-10 h-10 text-[#4d7f9a]" />
              </div>
              <h1 className="font-bold text-2xl leading-snug uppercase mb-3">
                Votre assurance voyage à partir de <span className="text-[#f48161]">650 DHS TTC</span>
              </h1>
              <p className="text-base text-cyan-100 font-light mb-8">
                Une protection maximale pour votre voyage et visa Schengen
              </p>
              <Link
                href="/voyage/obtenir-un-devis"
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
              Bienvenue sur l'espace Voyage de Digiassur
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-slate-700 leading-relaxed text-base">
                <p className="text-lg font-medium text-slate-600">
                  Que vous partiez pour les vacances, les études ou les affaires, voyagez l’esprit tranquille grâce à une couverture internationale complète conforme aux normes consulaires.
                </p>

                <div className="space-y-4">
                  {/* Item 1 */}
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 text-[#4d7f9a] flex items-center justify-center shrink-0 mt-0.5">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#153954] uppercase">
                        Acceptée par les ambassades et consulats pour visa Schengen
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Attestation officielle immédiate couvrant les 30 000 € médicaux requis pour l'espace Schengen.
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-[#f48161] flex items-center justify-center shrink-0 mt-0.5">
                      <Globe2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#153954] uppercase">
                        Assurance médicale de voyage internationale
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Prise en charge directe des frais d’hospitalisation d’urgence et soins médicaux à l'étranger.
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-[#4d7f9a] flex items-center justify-center shrink-0 mt-0.5">
                      <Car className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#153954] uppercase">
                        Assistance automobile à l'étranger
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Dépannage, remorquage et véhicule de remplacement en cas d’accident ou de panne durant votre séjour.
                      </p>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#153954] uppercase">
                        Assistance liée au décès & rapatriement
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Rapatriement sanitaire, retour anticipé des membres de la famille et dotation financière d'urgence.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/voyage/obtenir-un-devis"
                    className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase px-8 py-3.5 shadow-md cursor-pointer transition"
                  >
                    <span>OBTENIR MON DEVIS VOYAGE</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <img
                  src="/images/voyage-pic.jpg"
                  alt="Voyage Digiassur"
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
