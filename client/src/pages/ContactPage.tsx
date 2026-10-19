import { useState } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
  const { t, isRTL } = useLanguage();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <DigiassurHeader />

      <main className="flex-1 pt-[130px] pb-20">
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-[#153954] mb-3">
              Contactez DigiAssur
            </h1>
            <p className="text-slate-600 text-sm md:text-base">
              Nos conseillers sont à votre entière disposition pour répondre à toutes vos questions d'assurance et vous accompagner.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Contact Information Card (5 cols) */}
            <div className={`lg:col-span-5 bg-[#153954] text-white p-8 rounded-2xl shadow-xl space-y-6 ${isRTL ? "text-right" : "text-left"}`}>
              <h3 className="text-xl font-bold border-b border-white/10 pb-4">
                Nos Coordonnées
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#f48161] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-300 block">Téléphone direct</span>
                    <a href="tel:+212522368182" className="font-bold text-lg text-white hover:text-[#f48161]">
                      (+212) 522 36 81 82
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#568ba9] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-300 block">Email officiel</span>
                    <a href="mailto:contact@digiassur.ma" className="font-semibold text-white hover:text-[#f48161]">
                      contact@digiassur.ma
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#f48161]" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-300 block">Adresse du siège</span>
                    <p className="font-medium text-slate-200">
                      27, Rue Ain Asserdoune, Rez de jardin, CIL, Casablanca, Maroc
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#f48161]" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-300 block">Horaires d'ouverture</span>
                    <p className="font-medium text-slate-200">
                      Du Lundi au Vendredi : 08h30 - 18h30<br />
                      Samedi : 09h00 - 13h00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form (7 cols) */}
            <div className={`lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-100 ${isRTL ? "text-right" : "text-left"}`}>
              {sent ? (
                <div className="text-center py-10 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#153954] mb-2">Message envoyé !</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                    Merci de nous avoir contactés. Un conseiller Digiassur prendra contact avec vous dans les meilleurs délais.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="bg-[#153954] text-white text-xs font-semibold px-6 py-2.5 rounded-full cursor-pointer"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-[#153954] mb-4">
                    Envoyez-nous un message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nom *</label>
                      <input
                        type="text"
                        required
                        placeholder="Votre nom"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#568ba9]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Téléphone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="06 XX XX XX XX"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#568ba9]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="votre.email@exemple.com"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#568ba9]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Sujet</label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#568ba9]">
                      <option>Demande d'information générale</option>
                      <option>Devis Épargne</option>
                      <option>Devis Auto / Moto</option>
                      <option>Devis Santé / Prévoyance</option>
                      <option>Partenariat / Affiliation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Votre message ou question..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#568ba9]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-sm uppercase py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Envoyer mon message</span>
                    <Send className={`w-4 h-4 ${isRTL ? "rotate-180 -scale-y-100" : ""}`} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <FloatingWidgets />
      <DigiassurFooter />
    </div>
  );
}
