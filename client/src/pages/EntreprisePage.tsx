import { useState } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import WhyDigiassur from "@/components/WhyDigiassur";
import AssurwiBanner from "@/components/AssurwiBanner";
import { 
  Building2, 
  ShieldCheck, 
  Truck, 
  HardHat, 
  HeartPulse, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  Users, 
  Clock, 
  Award, 
  Sparkles,
  ChevronRight,
  TrendingDown,
  HelpCircle,
  RotateCcw
} from "lucide-react";
import { MOROCCAN_CITIES } from "@/data/motoBrands";
import { useLanguage } from "@/contexts/LanguageContext";

type InsuranceNeed = {
  id: string;
  label: string;
  icon: typeof Building2;
  description: string;
};

const INSURANCE_NEEDS: InsuranceNeed[] = [
  {
    id: "at",
    label: "Accidents du Travail (Loi 18-12)",
    icon: HardHat,
    description: "Couverture légale obligatoire pour l'ensemble de vos collaborateurs et ouvriers."
  },
  {
    id: "flotte",
    label: "Flotte Automobile & Utilitaires",
    icon: Truck,
    description: "Gestion unifiée dès 3 véhicules, véhicules de fonction, livraison et transport."
  },
  {
    id: "mrp",
    label: "Multirisque Professionnelle (MRP)",
    icon: Building2,
    description: "Protection de vos bureaux, usines, entrepôts, stocks et perte d'exploitation."
  },
  {
    id: "sante_groupe",
    label: "Santé & Prévoyance Groupe",
    icon: HeartPulse,
    description: "Mutuelle collective pour fidéliser vos talents avec tiers-payant national."
  },
  {
    id: "rc",
    label: "RC Exploitation & Décennale",
    icon: Briefcase,
    description: "Garantie des dommages causés aux tiers, aux clients et responsabilité des dirigeants."
  },
  {
    id: "marchandises",
    label: "Transport & Marchandises",
    icon: ShieldCheck,
    description: "Assurance des marchandises transportées par voie terrestre, maritime et aérienne."
  }
];

export default function EntreprisePage() {
  const { t, isRTL } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [dossierNumber, setDossierNumber] = useState("");

  const [formData, setFormData] = useState({
    raisonSociale: "",
    formeJuridique: "SARL",
    ville: "Casablanca",
    secteurActivite: "Services & Informatique",
    effectif: "11-50 salariés",
    besoins: ["at", "flotte"] as string[],
    nomContact: "",
    fonctionContact: "Gérant / Dirigeant",
    telephone: "",
    email: "",
    message: ""
  });

  const toggleBesoin = (id: string) => {
    setFormData(prev => {
      const exists = prev.besoins.includes(id);
      return {
        ...prev,
        besoins: exists ? prev.besoins.filter(b => b !== id) : [...prev.besoins, id]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    setDossierNumber(`N° B2B-${randomNum}`);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#f48161] selection:text-white">
      <DigiassurHeader />

      <main className="flex-1 pt-[116px]">
        {/* HERO SECTION ENTREPRISE */}
        <section className="relative bg-gradient-to-br from-[#153954] via-[#1c4769] to-[#285773] text-white py-6 lg:py-8 overflow-hidden">
          {/* Subtle ambient lighting */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#f48360]/15 blur-3xl pointer-events-none" />

          {/* ENTERPRISE ECOSYSTEM BACKGROUND: DISPERSED GUARANTEE ICONS */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
            {/* Subtle Circuit / Constellation Lines connecting guarantees */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <line x1="8%" y1="14%" x2="44%" y2="10%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="5 5" />
              <line x1="44%" y1="10%" x2="52%" y2="40%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="5 5" />
              <line x1="8%" y1="88%" x2="44%" y2="86%" stroke="#f48360" strokeWidth="1" strokeDasharray="5 5" />
              <line x1="44%" y1="86%" x2="52%" y2="60%" stroke="#f48360" strokeWidth="1" strokeDasharray="5 5" />
              <circle cx="8%" cy="14%" r="3" fill="#38bdf8" />
              <circle cx="44%" cy="10%" r="3" fill="#38bdf8" />
              <circle cx="8%" cy="88%" r="3" fill="#f48360" />
              <circle cx="44%" cy="86%" r="3" fill="#f48360" />
            </svg>

            {/* Dispersed Floating Guarantee Icon Badges */}
            {/* 1. Santé & Prévoyance Groupe (Top-Left) */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white shadow-lg absolute left-[3%] top-[10%] transform -rotate-2 hover:rotate-0 transition duration-300">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <HeartPulse className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-[11px] tracking-wide text-slate-100">Santé & Prévoyance</span>
            </div>

            {/* 2. Flotte Automobile & Utilitaires (Top-Center) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white shadow-lg absolute left-[44%] top-[8%] transform rotate-1 hover:rotate-0 transition duration-300">
              <div className="w-6 h-6 rounded-lg bg-orange-500/20 text-[#f48360] flex items-center justify-center">
                <Truck className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-[11px] tracking-wide text-slate-100">Flotte Automobile</span>
            </div>

            {/* 3. Accidents du Travail - Loi 18-12 (Bottom-Left) */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white shadow-lg absolute left-[2%] bottom-[8%] transform rotate-2 hover:rotate-0 transition duration-300">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <HardHat className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-[11px] tracking-wide text-slate-100">Accidents du Travail</span>
            </div>

            {/* 4. Multirisque Pro & Locaux (Bottom-Center) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white shadow-lg absolute left-[42%] bottom-[10%] transform -rotate-1 hover:rotate-0 transition duration-300">
              <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-[11px] tracking-wide text-slate-100">Multirisque Pro & Bureaux</span>
            </div>
          </div>

          <div className="max-w-[1360px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left Column: Heading & Value Proposition (Compact) */}
              <div className="lg:col-span-7 space-y-3.5 relative">
                {/* Enterprise Building HQ Watermark directly behind the text */}
                <div className="absolute left-[36%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.065] pointer-events-none -z-0">
                  <Building2 className="w-[270px] h-[270px] sm:w-[320px] sm:h-[320px] lg:w-[350px] lg:h-[350px]" strokeWidth={0.8} />
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-wider text-cyan-200 relative z-10">
                  <Building2 className="w-3.5 h-3.5 text-[#f48360]" />
                  <span>Solutions Dédiées Entreprises & Professionnels</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black leading-tight tracking-tight text-white relative z-10">
                  L'Assurance Entreprise sur-mesure au Maroc&nbsp;: <br />
                  <span className="text-[#f48360]">Protégez vos salariés, locaux et flottes.</span>
                </h1>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-normal">
                  Digiassur Entreprises négocie pour votre société les meilleures conditions auprès des leaders de l'assurance au Maroc (AtlantaSanad, RMA, Wafa, Sanlam, AXA). Bénéficiez d'un courtier dédié, d'un audit gratuit et d'une gestion réactive de vos sinistres.
                </p>

                {/* 4 Pillars with Icons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5 max-w-xl">
                  <div className="flex items-center gap-2 text-xs text-cyan-50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#f48360] shrink-0" />
                    <span>Audit gratuit des risques & devis sous 24h</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-cyan-50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#f48360] shrink-0" />
                    <span>Jusqu'à -25% sur vos primes d'assurance</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-cyan-50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#f48360] shrink-0" />
                    <span>Accidents du Travail conformes Loi 18-12</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-cyan-50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#f48360] shrink-0" />
                    <span>Chargé d'affaires B2B dédié à votre compte</span>
                  </div>
                </div>

                {/* Stat pills (Compact) */}
                <div className="pt-2.5 flex flex-wrap items-center gap-3 border-t border-white/10">
                  <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                    <div className="text-base sm:text-lg font-black text-white">+500</div>
                    <div className="text-[10px] text-cyan-200 font-medium uppercase tracking-wider">Entreprises clientes</div>
                  </div>
                  <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                    <div className="text-base sm:text-lg font-black text-[#f48360]">98%</div>
                    <div className="text-[10px] text-cyan-200 font-medium uppercase tracking-wider">Taux de renouvellement</div>
                  </div>
                  <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                    <div className="text-base sm:text-lg font-black text-white">&lt; 24h</div>
                    <div className="text-[10px] text-cyan-200 font-medium uppercase tracking-wider">Délai d'étude B2B</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive B2B Quote Form (Compact) */}
              <div className="lg:col-span-5">
                <div className="bg-white text-slate-800 p-4 sm:p-5 rounded-2xl shadow-2xl border border-white/20 relative">
                  {!submitted ? (
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3.5">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#f48360]">
                            Formulaire Entreprise & Professionnel
                          </span>
                          <h2 className="text-lg font-extrabold text-[#153954]">
                            Demander une étude B2B personnalisée
                          </h2>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-orange-50 text-[#f48360] flex items-center justify-center shrink-0">
                          <Building2 className="w-4 h-4" />
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-2.5">
                        {/* 1. Société */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                              Raison Sociale *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Ex: Atlas Logistique SARL"
                              value={formData.raisonSociale}
                              onChange={e => setFormData({ ...formData, raisonSociale: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4b7f9c]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                              Forme Juridique
                            </label>
                            <select
                              value={formData.formeJuridique}
                              onChange={e => setFormData({ ...formData, formeJuridique: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4b7f9c]"
                            >
                              <option value="SARL">SARL / SARL AU</option>
                              <option value="SA">SA (Société Anonyme)</option>
                              <option value="Auto-entrepreneur">Auto-entrepreneur</option>
                              <option value="Profession Libérale">Profession Libérale / Cabinet</option>
                              <option value="Succursale">Succursale / Multinationale</option>
                              <option value="Autre">Autre</option>
                            </select>
                          </div>
                        </div>

                        {/* 2. Ville & Effectif */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                              Ville du siège *
                            </label>
                            <select
                              value={formData.ville}
                              onChange={e => setFormData({ ...formData, ville: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4b7f9c]"
                            >
                              {MOROCCAN_CITIES.map(c => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                              Effectif Salariés
                            </label>
                            <select
                              value={formData.effectif}
                              onChange={e => setFormData({ ...formData, effectif: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4b7f9c]"
                            >
                              <option value="1-5 salariés">1 à 5 salariés</option>
                              <option value="6-20 salariés">6 à 20 salariés</option>
                              <option value="21-50 salariés">21 à 50 salariés</option>
                              <option value="51-200 salariés">51 à 200 salariés</option>
                              <option value="+200 salariés">+ 200 salariés</option>
                            </select>
                          </div>
                        </div>

                        {/* 3. Besoins d'assurance (Multi-select pills) */}
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">
                            Assurances souhaitées (Sélectionnez vos besoins) *
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {INSURANCE_NEEDS.map(need => {
                              const selected = formData.besoins.includes(need.id);
                              return (
                                <button
                                  key={need.id}
                                  type="button"
                                  onClick={() => toggleBesoin(need.id)}
                                  className={`text-left p-2 rounded-lg border text-[11px] flex items-center gap-1.5 transition cursor-pointer ${
                                    selected 
                                      ? "bg-orange-50 border-[#f48360] text-[#153954] font-bold" 
                                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                                  }`}
                                >
                                  <div className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 ${selected ? "bg-[#f48360] text-white" : "border border-slate-300"}`}>
                                    {selected && <CheckCircle2 className="w-3 h-3" />}
                                  </div>
                                  <span className="truncate">{need.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* 4. Contact Référent (Compact) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 border-t border-slate-100">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                              Nom du responsable *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="M. / Mme Nom & Prénom"
                              value={formData.nomContact}
                              onChange={e => setFormData({ ...formData, nomContact: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4b7f9c]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                              Fonction
                            </label>
                            <select
                              value={formData.fonctionContact}
                              onChange={e => setFormData({ ...formData, fonctionContact: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4b7f9c]"
                            >
                              <option value="Gérant / Dirigeant">Gérant / Dirigeant</option>
                              <option value="DRH / Responsable RH">DRH / Responsable RH</option>
                              <option value="DAF / Directeur Financier">DAF / Directeur Financier</option>
                              <option value="Responsable Achats / Moyens Généraux">Responsable Moyens Généraux</option>
                              <option value="Autre">Autre</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                              Téléphone professionnel *
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="06 XX XX XX XX / 05 22..."
                              value={formData.telephone}
                              onChange={e => setFormData({ ...formData, telephone: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4b7f9c]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                              Email professionnel *
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="contact@entreprise.ma"
                              value={formData.email}
                              onChange={e => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4b7f9c]"
                            />
                          </div>
                        </div>

                        {/* Submit Button (Compact) */}
                        <button
                          type="submit"
                          className="w-full mt-1.5 bg-[#f48360] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                        >
                          <span>DEMANDER UNE ÉTUDE B2B GRATUITE</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <p className="text-[9px] text-center text-slate-400">
                          Sans engagement. Vos données sont protégées conformément à la loi 09-08 (CNDP).
                        </p>
                      </form>
                    </div>
                  ) : (
                    /* Confirmation Screen B2B */
                    <div className="text-center py-6 animate-in zoom-in-95 duration-300 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>

                      <h3 className="text-xl font-black uppercase text-[#153954]">
                        Demande B2B enregistrée !
                      </h3>

                      <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                        Votre dossier <strong>{dossierNumber}</strong> pour la société <strong>{formData.raisonSociale || "votre entreprise"}</strong> a bien été transmis à notre Pôle Entreprises.
                      </p>

                      <div className="bg-[#fef1eb] p-4 rounded-xl border border-orange-200 text-left text-xs space-y-2">
                        <div className="flex justify-between border-b border-orange-200/60 pb-1.5 font-bold text-[#153954]">
                          <span>Raison Sociale :</span>
                          <span>{formData.raisonSociale || "Non spécifié"}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Ville :</span>
                          <span className="font-semibold text-slate-800">{formData.ville}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Effectif :</span>
                          <span className="font-semibold text-slate-800">{formData.effectif}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Contact :</span>
                          <span className="font-semibold text-slate-800">{formData.nomContact} ({formData.fonctionContact})</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Téléphone :</span>
                          <span className="font-semibold text-slate-800">{formData.telephone}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500">
                        Un chargé de compte Grands Comptes prendra contact avec vous dans un délai de <strong>24 heures ouvrées</strong> pour vous présenter un comparatif chiffré.
                      </p>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setSubmitted(false)}
                          className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold inline-flex items-center gap-2 cursor-pointer transition"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Faire une autre demande</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 MAIN B2B SOLUTIONS */}
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-[#f48360] bg-orange-50 px-3 py-1 rounded-full">
                Catalogue Pro & PME
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#153954] mt-3 mb-4">
                Nos Solutions d'Assurance pour les Entreprises au Maroc
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Des garanties solides et calibrées pour protéger votre capital humain, vos actifs matériels et la pérennité financière de votre société.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1: Accidents du Travail */}
              <div className="bg-white p-7 rounded-2xl shadow-xs border border-slate-200/80 hover:shadow-md transition group">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#f48360] flex items-center justify-center mb-5 group-hover:bg-[#f48360] group-hover:text-white transition">
                  <HardHat className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#153954] mb-2">
                  Accidents du Travail (Loi 18-12)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Obligation légale pour tout employeur au Maroc. Couvre les indemnités journalières, les frais médicaux et chirurgicaux, ainsi que les rentes d'invalidité pour vos salariés.
                </p>
                <ul className="text-xs text-slate-500 space-y-2 border-t pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Conformité stricte avec la législation marocaine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Accidents de trajet et sur le lieu de travail</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Attestation immédiate pour marchés publics et privés</span>
                  </li>
                </ul>
              </div>

              {/* Card 2: Flotte Automobile */}
              <div className="bg-white p-7 rounded-2xl shadow-xs border border-slate-200/80 hover:shadow-md transition group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#4b7f9c] flex items-center justify-center mb-5 group-hover:bg-[#4b7f9c] group-hover:text-white transition">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#153954] mb-2">
                  Flotte Automobile & Utilitaires
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Contrats flottes personnalisés dès 3 véhicules. Regroupez vos véhicules commerciaux, camions, deux-roues et engins de chantier sous un contrat unique à tarif négocié.
                </p>
                <ul className="text-xs text-slate-500 space-y-2 border-t pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Assistance dépannage et remorquage rapide 24/7</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Tous Risques avec franchises modulables</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Gestion des entrées / sorties de véhicules simplifiée</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: Multirisque Professionnelle */}
              <div className="bg-white p-7 rounded-2xl shadow-xs border border-slate-200/80 hover:shadow-md transition group">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 group-hover:bg-amber-600 group-hover:text-white transition">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#153954] mb-2">
                  Multirisque Professionnelle (MRP)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Sécurisez vos bâtiments, bureaux, ateliers et entrepôts contre l'incendie, les dégâts des eaux, le vol de marchandises et le bris de machines industrielles.
                </p>
                <ul className="text-xs text-slate-500 space-y-2 border-t pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Garantie Perte d'Exploitation après sinistre</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Protection des stocks de matières premières</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Couverture matériel informatique & serveurs</span>
                  </li>
                </ul>
              </div>

              {/* Card 4: Santé Groupe */}
              <div className="bg-white p-7 rounded-2xl shadow-xs border border-slate-200/80 hover:shadow-md transition group">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#153954] mb-2">
                  Santé & Prévoyance Groupe
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Une couverture médicale d'entreprise pour les collaborateurs et leurs ayants droit. Remboursements rapides des soins, optique, dentaire et hospitalisation clinique.
                </p>
                <ul className="text-xs text-slate-500 space-y-2 border-t pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Réseau Tiers-Payant dans les cliniques du Royaume</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Capital Décès et Invalidité toutes causes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Outil RH de valorisation et fidélisation des équipes</span>
                  </li>
                </ul>
              </div>

              {/* Card 5: RC Exploitation & Décennale */}
              <div className="bg-white p-7 rounded-2xl shadow-xs border border-slate-200/80 hover:shadow-md transition group">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5 group-hover:bg-purple-600 group-hover:text-white transition">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#153954] mb-2">
                  Responsabilité Civile & Décennale
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Protège votre trésorerie contre les réclamations de tiers, clients ou prestataires. Couvre également la RC Décennale pour les acteurs du BTP et la responsabilité des dirigeants.
                </p>
                <ul className="text-xs text-slate-500 space-y-2 border-t pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Dommages corporels, matériels et immatériels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>RC Professionnelle (Cabinets, Conseil, IT)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Prise en charge des frais de défense juridique</span>
                  </li>
                </ul>
              </div>

              {/* Card 6: Transport de Marchandises */}
              <div className="bg-white p-7 rounded-2xl shadow-xs border border-slate-200/80 hover:shadow-md transition group">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-5 group-hover:bg-cyan-600 group-hover:text-white transition">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#153954] mb-2">
                  Transport & Facultés Marchandises
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Indispensable pour les importateurs, exportateurs et transporteurs. Sécurisez vos flux de marchandises contre le vol, la perte ou les avaries lors des trajets nationaux et internationaux.
                </p>
                <ul className="text-xs text-slate-500 space-y-2 border-t pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Transports maritimes, terrestres et aériens</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Garantie tous risques ou avaries particulières</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Gestion des sinistres avec experts maritimes agréés</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WHY DIGIASSUR B2B */}
        <section className="py-16 bg-white">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="bg-[#153954] rounded-3xl text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f48360] bg-white/10 px-3 py-1 rounded-full">
                    L'Excellence du Courtage B2B
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                    Pourquoi confier les assurances de votre entreprise à Digiassur ?
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Courtier agréé par l'ACAPS, nous ne vendons pas un contrat unique : nous mettons en concurrence les compagnies d'assurance pour négocier des garanties sur-mesure au prix le plus bas du marché.
                  </p>
                </div>

                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/10">
                    <div className="text-xl font-black text-[#f48360] mb-1">01. Audit Gratuit</div>
                    <p className="text-xs text-slate-300">
                      Analyse de vos polices existantes pour déceler les trous de garantie ou les surcoûts injustifiés.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/10">
                    <div className="text-xl font-black text-[#f48360] mb-1">02. Un Seul Guichet</div>
                    <p className="text-xs text-slate-300">
                      Un interlocuteur unique pour la gestion de l'ensemble de vos contrats, avenants et déclarations.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/10">
                    <div className="text-xl font-black text-[#f48360] mb-1">03. Tarifs Négociés</div>
                    <p className="text-xs text-slate-300">
                      Volume d'affaires mutualisé permettant de décrocher les barèmes préférentiels grands comptes.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/10">
                    <div className="text-xl font-black text-[#f48360] mb-1">04. Défense Sinistres</div>
                    <p className="text-xs text-slate-300">
                      En cas de sinistre, nous défendons vos intérêts face aux experts d'assurance pour accélérer l'indemnisation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ B2B */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-[1000px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153954]">
                Questions Fréquentes — Entreprises & Professionnels
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Tout ce que vous devez savoir pour optimiser la couverture de votre société au Maroc.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <h4 className="font-bold text-sm text-[#153954] mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#f48360]" />
                  <span>L'assurance Accident du Travail (AT) est-elle légalement obligatoire au Maroc ?</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Oui, au Maroc, la loi 18-12 rend l'assurance contre les accidents du travail et maladies professionnelles strictement obligatoire pour tout employeur, quelle que soit la taille de l'effectif ou le secteur d'activité. Le défaut d'assurance expose l'entreprise à de lourdes sanctions financières et pénales en cas de contrôle ou d'accident d'un collaborateur.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <h4 className="font-bold text-sm text-[#153954] mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#f48360]" />
                  <span>Les cotisations d'assurance d'entreprise sont-elles déductibles de l'Impôt sur les Sociétés (IS) ?</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Oui, les primes d'assurance souscrites pour les besoins de l'exploitation de l'entreprise (Accidents du travail, multirisque, flotte automobile, responsabilité civile, etc.) constituent des charges déductibles du résultat fiscal au Maroc conformément au Code Général des Impôts (CGI).
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <h4 className="font-bold text-sm text-[#153954] mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#f48360]" />
                  <span>À partir de combien de véhicules peut-on souscrire un contrat Flotte ?</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Chez Digiassur, nous pouvons mutualiser et ouvrir un contrat flotte d'entreprise dès <strong>3 véhicules motorisés</strong> (voitures de fonction, utilitaires de livraison, camionnettes, scooters de coursiers). Cela vous permet de bénéficier d'une tarification dégressive et d'un seul avis d'échéance annuel.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <h4 className="font-bold text-sm text-[#153954] mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#f48360]" />
                  <span>Comment se déroule la souscription d'une mutuelle santé groupe ?</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Il vous suffit de nous fournir la liste de vos collaborateurs (tranches d'âge et statut de famille). Nous établissons un comparatif entre les principales compagnies pour vous proposer les meilleurs barèmes de remboursement (80%, 90% ou 100%) avec activation du tiers-payant clinique pour vos équipes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <PartnersSection />

        {/* Why Digiassur */}
        <WhyDigiassur />

        {/* Legal Banner */}
        <AssurwiBanner />
      </main>

      <FloatingWidgets />
      <DigiassurFooter />
    </div>
  );
}
