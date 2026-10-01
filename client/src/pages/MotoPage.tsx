import { useState, useCallback } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import WhyDigiassur from "@/components/WhyDigiassur";
import AssurwiBanner from "@/components/AssurwiBanner";
import { 
  ArrowRight, 
  Bike, 
  CheckCircle2, 
  Send
} from "lucide-react";
import { Link } from "wouter";

export default function MotoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    cylindree: "125 cc - 250 cc",
    formule: "Tiers + Assistance Motard",
    cgu: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const scrollToDevis = useCallback(() => {
    document.getElementById("devis-moto")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!formData.nom.trim()) errs.nom = "Nom obligatoire";
    if (!formData.telephone.trim()) errs.telephone = "Téléphone obligatoire";
    if (!formData.email.trim()) errs.email = "Email obligatoire";
    if (!formData.cgu) errs.cgu = "Veuillez accepter les conditions";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#f48161] selection:text-white">
      <DigiassurHeader onSimulate={scrollToDevis} />

      <main className="flex-1">
        {/* Moto Hero Section */}
        <section className="relative w-full pt-[116px] bg-slate-50">
          <div className="hidden md:block w-full">
            <div className="relative w-full h-[470px] bg-[#4d7f9a] overflow-hidden shadow-md">
              <div className="absolute inset-0 flex">
                {/* Left Photo */}
                <div className="w-1/2 h-full relative overflow-hidden">
                  <img
                    src="/images/banner-moto.png"
                    alt="Assurance Moto Digiassur"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                </div>

                {/* Right Slate Blue Container */}
                <div className="w-1/2 h-full relative flex items-center bg-[#4d7f9a] text-white px-12 lg:px-20 overflow-hidden">
                  <img
                    src="/images/moto-drawer.svg"
                    alt=""
                    aria-hidden="true"
                    className="absolute -bottom-16 right-0 h-[480px] w-auto opacity-30 pointer-events-none select-none"
                  />

                  <div className="relative z-10 max-w-[560px]">
                    <h1 className="font-bold text-3xl lg:text-[42px] leading-tight tracking-tight text-white mb-4">
                      Assurer votre moto à <br />
                      partir de <span className="text-[#f48161]">62.5 DHS TTC/Mois</span>
                    </h1>

                    <p className="text-xl lg:text-2xl text-cyan-50 font-normal py-2 mb-8">
                      Recevez votre attestation à domicile ou au bureau
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <button
                        type="button"
                        onClick={scrollToDevis}
                        className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-sm tracking-wider uppercase px-7 py-3.5 shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span>OBTENIR MON TARIF MOTO</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={scrollToDevis}
                        className="inline-flex items-center gap-2 bg-[#689ebd] hover:bg-[#588da9] text-white font-bold text-sm tracking-wider uppercase px-7 py-3.5 shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span>COMPARER MON DEVIS ACTUEL</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Emblem */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                <div className="w-[96px] h-[96px] rounded-full bg-[#dbf2f4] shadow-2xl flex items-center justify-center border-4 border-white/60 transition hover:scale-105 duration-300">
                  <img src="/images/moto-icon.svg" alt="Moto" className="w-12 h-12 object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Hero */}
          <div className="block md:hidden relative min-h-[460px] bg-cover bg-center flex items-center" style={{ backgroundImage: `url('/images/banner-moto.png')` }}>
            <div className="absolute inset-0 bg-[#4d7f9a]/90 backdrop-blur-2xs" />
            <div className="relative z-10 p-6 text-center text-white w-full">
              <div className="w-20 h-20 rounded-full bg-[#dbf2f4] shadow-xl flex items-center justify-center mx-auto mb-6 border-4 border-white/80">
                <img src="/images/moto-icon.svg" alt="Moto" className="w-10 h-10 object-contain" />
              </div>
              <h1 className="font-bold text-2xl leading-snug uppercase mb-3">
                Assurez votre moto à partir de 62.5 DHS TTC/Mois
              </h1>
              <p className="text-base text-cyan-100 font-light mb-8">
                Recevez votre attestation à domicile ou au bureau
              </p>
              <button
                type="button"
                onClick={scrollToDevis}
                className="w-full bg-[#f48161] text-white font-bold text-sm uppercase py-4 shadow-xl mb-3 cursor-pointer"
              >
                OBTENIR MON TARIF MOTO
              </button>
            </div>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#2f3c4f] text-center mb-14">
              Bienvenue sur l'espace Moto de Digiassur
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                <p>
                  L'assurance moto de <strong className="text-[#153954]">Digiassur</strong> est une solution adaptée pour tous les conducteurs de deux-roues qui souhaitent une couverture efficace et complète.
                </p>
                <p>
                  Cette formule permet de couvrir les dommages causés aux tiers, mais également les dégâts sur votre propre moto en cas de vol, d'incendie ou d'accident.
                </p>
                <p>
                  Elle inclut des garanties d'assistance moto 24/7 en cas de panne sur route ou autoroute partout au Maroc.
                </p>

                <div className="pt-4 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={scrollToDevis}
                    className="bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase px-7 py-3.5 shadow-md cursor-pointer transition"
                  >
                    OBTENIR MON TARIF MOTO
                  </button>
                  <button
                    type="button"
                    onClick={scrollToDevis}
                    className="bg-[#689ebd] hover:bg-[#588da9] text-white font-bold text-xs uppercase px-7 py-3.5 shadow-md cursor-pointer transition"
                  >
                    COMPARER MON DEVIS ACTUEL
                  </button>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <img
                  src="/images/banner-moto-welcome.png"
                  alt="Motard Digiassur"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <PartnersSection />

        {/* Moto Simulation / Devis Form */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-white" id="devis-moto">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-[#f48161] uppercase tracking-widest bg-orange-50 px-3.5 py-1.5 rounded-full">
                Tarification Moto & Scooter
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#153954] mt-3 mb-2">
                Demandez votre tarif Moto en quelques clics
              </h2>
              <p className="text-slate-500 text-sm">
                Devis rapide et sans engagement avec attestation express.
              </p>
            </div>

            {submitted ? (
              <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-xl border border-emerald-100 text-center max-w-2xl mx-auto animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#153954] mb-2">Félicitations {formData.prenom} !</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Votre demande pour votre moto ({formData.cylindree}) a bien été prise en compte.
                  Un conseiller Digiassur va vous appeler au <strong>{formData.telephone}</strong> avec la meilleure offre.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#153954] text-white text-xs font-semibold px-6 py-2.5 rounded-full"
                >
                  Nouvelle demande
                </button>
              </div>
            ) : (
              <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-xl border border-slate-100">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Cylindrée</label>
                      <select
                        value={formData.cylindree}
                        onChange={(e) => setFormData({ ...formData, cylindree: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#568ba9]"
                      >
                        <option>Moins de 50 cc</option>
                        <option>50 cc - 125 cc</option>
                        <option>125 cc - 250 cc</option>
                        <option>250 cc - 500 cc</option>
                        <option>Plus de 500 cc (Grosse cylindrée)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Formule souhaitée</label>
                      <select
                        value={formData.formule}
                        onChange={(e) => setFormData({ ...formData, formule: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#568ba9]"
                      >
                        <option>Responsabilité Civile Moto</option>
                        <option>Tiers + Vol + Incendie</option>
                        <option>Tous Risques Moto</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Nom *</label>
                      <input
                        type="text"
                        placeholder="Votre nom"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#568ba9]"
                      />
                      {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Prénom</label>
                      <input
                        type="text"
                        placeholder="Votre prénom"
                        value={formData.prenom}
                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#568ba9]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Téléphone *</label>
                      <input
                        type="tel"
                        placeholder="06 XX XX XX XX"
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#568ba9]"
                      />
                      {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Email *</label>
                      <input
                        type="email"
                        placeholder="votre.email@exemple.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#568ba9]"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={formData.cgu}
                        onChange={(e) => setFormData({ ...formData, cgu: e.target.checked })}
                        className="mt-0.5 rounded border-slate-300 text-[#f48161]"
                      />
                      <span>
                        J'ai lu et j'accepte les{" "}
                        <Link href="/mentions-legales" className="text-[#153954] underline font-bold">
                          conditions générales
                        </Link>{" "}
                        d'utilisation et autorise Digiassur à me contacter pour ma proposition d'assurance moto.
                      </span>
                    </label>
                    {errors.cgu && <p className="text-red-500 text-xs mt-1">{errors.cgu}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-sm uppercase py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>OBTENIR MON DEVIS MOTO GRATUIT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>

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
