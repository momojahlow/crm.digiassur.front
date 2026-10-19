import { ArrowRight, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

type EpargneWelcomeProps = {
  onSimulate?: () => void;
};

export default function EpargneWelcome({ onSimulate }: EpargneWelcomeProps) {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-16 lg:py-24 bg-white" id="decouvrir">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-[#f48161] font-bold text-xs uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Solutions Épargne & Avenir</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#153954] tracking-tight leading-snug">
            Bienvenue sur l'espace Epargne de Digiassur
          </h2>
        </div>

        {/* 2 Columns: Text on Left, Picture on Right */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isRTL ? "text-right" : "text-left"}`}>
          {/* Left Text & Benefits */}
          <div className="space-y-6">
            <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
              Nous pouvons tous, à un moment donné, économiser de l'argent pour faire face à des situations imprévues, financer un projet ou encore préparer sa retraite.
            </p>

            <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
              Pour faire face à cela, nous mettons à votre disposition un produit d'épargne qui vous permet de constituer une épargne progressive en toute sécurité.
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 pb-3">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#153954]">Capital Garanti</h4>
                  <p className="text-xs text-slate-500">Sécurité maximale pour vos économies</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#153954]">Rendement attractif</h4>
                  <p className="text-xs text-slate-500">Taux avantageux & défiscalisation</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/epargne/obtenir-un-devis"
                className="inline-flex items-center gap-3 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-none shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>OBTENIR MON DEVIS</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </div>
          </div>

          {/* Right Image Container */}
          <div className="relative group">
            {/* Soft decorative shadow/gradient behind */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#568ba9]/20 to-[#f48161]/20 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500 -z-10" />

            <div className="relative rounded-xl overflow-hidden shadow-xl border border-slate-100 bg-white">
              <img
                src="/images/epargne-pic.jpg"
                alt="Jeune fille avec sa tirelire d'épargne"
                className="w-full h-[360px] lg:h-[420px] object-cover object-center transform group-hover:scale-102 transition duration-700"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://digiassur.ma/assets/img-front/epargne-pic.jpg";
                }}
              />

              {/* Bottom Partner Trust Badge */}
              <div className={`absolute bottom-4 ${isRTL ? "right-4" : "left-4"} bg-white/95 backdrop-blur-xs px-4 py-2 rounded-lg shadow-md flex items-center gap-3 border border-slate-100`}>
                <span className="text-[11px] font-semibold text-slate-500">Partenaire agréé :</span>
                <img
                  src="/images/allianz.svg"
                  alt="Allianz"
                  className="h-6 w-auto object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "https://digiassur.ma/assets/img/allianz-2-1-2.svg";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
