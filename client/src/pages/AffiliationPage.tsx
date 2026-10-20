import { useState } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import WhyDigiassur from "@/components/WhyDigiassur";
import AssurwiBanner from "@/components/AssurwiBanner";
import { 
  Users, 
  TrendingUp, 
  Wallet, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  HelpCircle, 
  RotateCcw, 
  ShieldCheck, 
  BarChart3, 
  FolderKanban, 
  BadgePercent, 
  Zap, 
  Award,
  Handshake,
  Link as LinkIcon
} from "lucide-react";
import { MOROCCAN_CITIES } from "@/data/motoBrands";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AffiliationPage() {
  const { t, isRTL } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [affiliationNumber, setAffiliationNumber] = useState("");
  
  // Interactive commission simulator state
  const [estimatedContracts, setEstimatedContracts] = useState<number>(15);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    statut: "Auto-entrepreneur",
    ville: "Casablanca",
    telephone: "",
    email: "",
    experience: "1 à 3 ans",
    reseauActuel: "Particuliers & Connaissances",
    message: ""
  });

  // Average commission per contract ~ 500 DHS
  const estimatedGains = estimatedContracts * 500;
  const annualGains = estimatedGains * 12;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    setAffiliationNumber(`N° AFF-${randomNum}`);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#f48161] selection:text-white">
      <DigiassurHeader />

      <main className="flex-1 pt-[116px]">
        {/* HERO AFFILIATION */}
        <section className="relative bg-gradient-to-br from-[#153954] via-[#1c4769] to-[#285773] text-white py-6 lg:py-8 overflow-hidden">
          {/* Subtle ambient lighting */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#f48360]/15 blur-3xl pointer-events-none" />

          {/* AFFILIATE ECOSYSTEM BACKGROUND: DISPERSED METRIC BADGES */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
            {/* Subtle Circuit / Constellation Lines connecting partner network */}
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

            {/* Dispersed Floating Affiliate Badges */}
            {/* 1. Commissions Directes (Top-Left) */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white shadow-lg absolute left-[3%] top-[10%] transform -rotate-2 hover:rotate-0 transition duration-300">
              <div className="w-6 h-6 rounded-lg bg-orange-500/20 text-[#f48360] flex items-center justify-center">
                <Wallet className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-[11px] tracking-wide text-slate-100">Jusqu'à 12% de Commission</span>
            </div>

            {/* 2. Portefeuille Digital (Top-Center) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white shadow-lg absolute left-[44%] top-[8%] transform rotate-1 hover:rotate-0 transition duration-300">
              <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                <FolderKanban className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-[11px] tracking-wide text-slate-100">Portefeuille Prospects & Clients</span>
            </div>

            {/* 3. Suivi des Contrats (Bottom-Left) */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white shadow-lg absolute left-[2%] bottom-[8%] transform rotate-2 hover:rotate-0 transition duration-300">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-[11px] tracking-wide text-slate-100">Suivi des Contrats en Direct</span>
            </div>

            {/* 4. Paiements Mensuels Garantis (Bottom-Center) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white shadow-lg absolute left-[42%] bottom-[10%] transform -rotate-1 hover:rotate-0 transition duration-300">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-[11px] tracking-wide text-slate-100">Paiements Mensuels Garantis</span>
            </div>
          </div>

          <div className="max-w-[1360px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left Column (Compact) */}
              <div className="lg:col-span-7 space-y-3.5 relative">
                {/* Partner Handshake Watermark directly behind the text */}
                <div className="absolute left-[36%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.065] pointer-events-none -z-0">
                  <Handshake className="w-[270px] h-[270px] sm:w-[320px] sm:h-[320px] lg:w-[350px] lg:h-[350px]" strokeWidth={0.8} />
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-wider text-cyan-200 relative z-10">
                  <Handshake className="w-3.5 h-3.5 text-[#f48360]" />
                  <span>Programme Partenaires & Apporteurs d'Affaires</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black leading-tight tracking-tight text-white relative z-10">
                  Devenez Affilié Digiassur&nbsp;: <br />
                  <span className="text-[#f48360]">Gérez votre portefeuille et encaissez vos commissions.</span>
                </h1>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-normal">
                  Vous êtes courtier de proximité, jeune auto-entrepreneur, agent commercial indépendant ou en reconversion ? Développez votre portefeuille de prospects, suivez vos contrats en temps réel et percevez des commissions récurrentes sur chaque vente d'assurance.
                </p>

                {/* 4 Key Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5 max-w-xl">
                  <div className="flex items-center gap-2 text-xs text-cyan-50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#f48360] shrink-0" />
                    <span>Tableau de bord digital de vos prospects & clients</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-cyan-50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#f48360] shrink-0" />
                    <span>Commissions directes versées chaque fin de mois</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-cyan-50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#f48360] shrink-0" />
                    <span>Accès à tout le catalogue multi-compagnies Digiassur</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-cyan-50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#f48360] shrink-0" />
                    <span>Inscription gratuite & aucun investissement de départ</span>
                  </div>
                </div>

                {/* Stat pills (Compact) */}
                <div className="pt-2.5 flex flex-wrap items-center gap-3 border-t border-white/10">
                  <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                    <div className="text-base sm:text-lg font-black text-white">Jusqu'à 12%</div>
                    <div className="text-[10px] text-cyan-200 font-medium uppercase tracking-wider">De commission nette</div>
                  </div>
                  <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                    <div className="text-base sm:text-lg font-black text-[#f48360]">+350</div>
                    <div className="text-[10px] text-cyan-200 font-medium uppercase tracking-wider">Affiliés au Maroc</div>
                  </div>
                  <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                    <div className="text-base sm:text-lg font-black text-white">100%</div>
                    <div className="text-[10px] text-cyan-200 font-medium uppercase tracking-wider">Paiement garanti</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Inscription Affiliation Form (Compact) */}
              <div className="lg:col-span-5">
                <div className="bg-white text-slate-800 p-4 sm:p-5 rounded-2xl shadow-2xl border border-white/20 relative">
                  {!submitted ? (
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3.5">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#f48360]">
                            Espace Partenaires & Affiliés
                          </span>
                          <h2 className="text-lg font-extrabold text-[#153954]">
                            Rejoindre le Réseau Digiassur
                          </h2>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-orange-50 text-[#f48360] flex items-center justify-center shrink-0">
                          <Wallet className="w-4 h-4" />
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-2.5">
                        {/* 1. Nom & Prénom */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                              Nom *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Votre nom"
                              value={formData.nom}
                              onChange={e => setFormData({ ...formData, nom: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4b7f9c]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                              Prénom *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Votre prénom"
                              value={formData.prenom}
                              onChange={e => setFormData({ ...formData, prenom: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4b7f9c]"
                            />
                          </div>
                        </div>

                        {/* 2. Statut & Ville */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                              Votre Profil / Statut *
                            </label>
                            <select
                              value={formData.statut}
                              onChange={e => setFormData({ ...formData, statut: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4b7f9c]"
                            >
                              <option value="Auto-entrepreneur">Auto-entrepreneur</option>
                              <option value="Courtier en assurance">Courtier en assurance</option>
                              <option value="Agent commercial indépendant">Agent commercial indépendant</option>
                              <option value="Étudiant / Jeune diplômé">Étudiant / Jeune diplômé</option>
                              <option value="Professionnel de l'automobile">Professionnel de l'automobile / Garage</option>
                              <option value="Autre">Autre activité</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                              Ville d'activité *
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
                        </div>

                        {/* 3. Téléphone & Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                              Téléphone (Mobile / WhatsApp) *
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="06 XX XX XX XX"
                              value={formData.telephone}
                              onChange={e => setFormData({ ...formData, telephone: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4b7f9c]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                              Email *
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="affilie@email.com"
                              value={formData.email}
                              onChange={e => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4b7f9c]"
                            />
                          </div>
                        </div>

                        {/* 4. Expérience & Réseau */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 border-t border-slate-100">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                              Expérience commerciale
                            </label>
                            <select
                              value={formData.experience}
                              onChange={e => setFormData({ ...formData, experience: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4b7f9c]"
                            >
                              <option value="Débutant motivé">Débutant motivé</option>
                              <option value="1 à 3 ans">1 à 3 ans d'expérience</option>
                              <option value="Plus de 3 ans">Plus de 3 ans d'expérience</option>
                              <option value="Expert assurance">Professionnel de l'assurance</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                              Réseau cible
                            </label>
                            <select
                              value={formData.reseauActuel}
                              onChange={e => setFormData({ ...formData, reseauActuel: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4b7f9c]"
                            >
                              <option value="Particuliers & Connaissances">Particuliers (Auto, Moto, Santé)</option>
                              <option value="Professionnels & TPE">Entreprises & Professionnels</option>
                              <option value="Mixte">Mixte Particuliers & Entreprises</option>
                              <option value="Communauté en ligne / Réseaux sociaux">Audience en ligne / Web</option>
                            </select>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full mt-2 bg-[#f48360] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                        >
                          <span>ACTIVER MON COMPTE D'AFFILIÉ</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <p className="text-[10px] text-center text-slate-400">
                          Accès direct et gratuit. Un conseiller réseau vous contactera sous 24h ouvrées.
                        </p>
                      </form>
                    </div>
                  ) : (
                    /* Confirmation Screen Affiliation */
                    <div className="text-center py-6 animate-in zoom-in-95 duration-300 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>

                      <h3 className="text-xl font-black uppercase text-[#153954]">
                        Bienvenue dans le réseau Digiassur !
                      </h3>

                      <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                        Votre dossier d'affilié <strong>{affiliationNumber}</strong> pour <strong>{formData.prenom} {formData.nom}</strong> a bien été créé avec succès.
                      </p>

                      <div className="bg-[#fef1eb] p-4 rounded-xl border border-orange-200 text-left text-xs space-y-2">
                        <div className="flex justify-between border-b border-orange-200/60 pb-1.5 font-bold text-[#153954]">
                          <span>Affilié Partenaire :</span>
                          <span>{formData.prenom} {formData.nom}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Statut :</span>
                          <span className="font-semibold text-slate-800">{formData.statut}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Ville :</span>
                          <span className="font-semibold text-slate-800">{formData.ville}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Téléphone :</span>
                          <span className="font-semibold text-slate-800">{formData.telephone}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Email :</span>
                          <span className="font-semibold text-slate-800">{formData.email}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500">
                        Notre Responsable Affiliation & Partenaires va vous contacter par téléphone afin de vous délivrer vos accès au tableau de bord et votre kit commercial.
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

        {/* INTERACTIVE COMMISSION SIMULATOR */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#f48360] bg-orange-50 px-3 py-1 rounded-full">
                  Simulateur de Revenus
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153954] mt-3">
                  Estimez vos gains mensuels avec Digiassur
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-2">
                  Déplacez le curseur pour simuler le montant de vos commissions selon le nombre de contrats apportés par mois.
                </p>
              </div>

              {/* Slider & Result Box */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-bold text-slate-700">
                        Contrats souscrits par mois :
                      </label>
                      <span className="text-xl font-black text-[#153954] bg-slate-100 px-3 py-1 rounded-lg">
                        {estimatedContracts} contrats
                      </span>
                    </div>

                    <input
                      type="range"
                      min={1}
                      max={60}
                      step={1}
                      value={estimatedContracts}
                      onChange={e => setEstimatedContracts(Number(e.target.value))}
                      className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#f48360]"
                    />

                    <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1.5">
                      <span>1 contrat</span>
                      <span>15 contrats</span>
                      <span>30 contrats</span>
                      <span>60 contrats/mois</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                    <div className="flex items-center gap-2 text-[#153954] font-bold">
                      <BadgePercent className="w-4 h-4 text-[#f48360]" />
                      <span>Commissions récurrentes garanties :</span>
                    </div>
                    <p className="leading-relaxed">
                      Chaque contrat renouvelé l'année suivante continue de vous générer des commissions. Vous bâtissez ainsi une rente régulière mois après mois.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#153954] text-white p-7 rounded-2xl text-center space-y-4 shadow-xl">
                  <div className="text-xs uppercase tracking-wider text-cyan-200 font-bold">
                    Vos Commissions Estimées
                  </div>

                  <div className="text-4xl sm:text-5xl font-black text-[#f48360]">
                    {estimatedGains.toLocaleString()} <span className="text-xl text-white">DHS</span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    Par mois, versés directement sur votre compte
                  </div>

                  <div className="border-t border-white/10 pt-3">
                    <div className="text-sm text-cyan-100 font-bold">
                      Soit environ <span className="text-white text-lg font-black">{annualGains.toLocaleString()} DHS</span> / an
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 TOOLS FOR AFFILIATES */}
        <section className="py-16 bg-white">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-[#f48360] bg-orange-50 px-3 py-1 rounded-full">
                Votre Espace Digital
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#153954] mt-3 mb-4">
                Tous les outils pour développer et piloter votre clientèle
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Une technologie conçue pour vous permettre de travailler à votre rythme, partout au Maroc, depuis votre smartphone ou votre ordinateur.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/70 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#f48360] flex items-center justify-center mb-4">
                  <FolderKanban className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#153954] mb-2">
                  Portefeuille Prospects
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enregistrez vos prospects, suivez leur statut de devis en temps réel et recevez des alertes automatiques pour relancer au moment opportun.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/70 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#4b7f9c] flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#153954] mb-2">
                  Suivi des Contrats & Échéances
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Visualisez toutes les polices souscrites par vos clients. Anticipez les renouvellements annuels pour sécuriser vos commissions récurrentes.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/70 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <Wallet className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#153954] mb-2">
                  Paiement Automatique
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Consultez le solde de vos commissions en direct. Virement automatique sur votre compte bancaire chaque fin de mois avec relevé détaillé.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/70 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                  <LinkIcon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#153954] mb-2">
                  Lien Affilié & Kit Marketing
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bénéficiez d'un lien tracké personnel et de visuels prêts à l'emploi à partager sur WhatsApp, LinkedIn, email ou auprès de vos contacts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ AFFILIATION */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-[1000px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153954]">
                Questions Fréquentes — Programme Affiliation
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Tout ce que vous devez savoir pour démarrer et percevoir vos commissions en toute sérénité.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <h4 className="font-bold text-sm text-[#153954] mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#f48360]" />
                  <span>Qui peut s'inscrire au programme d'affiliation Digiassur ?</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Le programme est ouvert à tous les professionnels au Maroc : courtiers en assurance, auto-entrepreneurs, agents commerciaux, intermédiaires, mais aussi jeunes diplômés ou indépendants souhaitant valoriser leur réseau relationnel.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <h4 className="font-bold text-sm text-[#153954] mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#f48360]" />
                  <span>Comment et quand sont versées mes commissions ?</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Vos commissions sont calculées dès la validation de la souscription par la compagnie d'assurance. Elles vous sont reversées chaque mois par virement bancaire automatique sur votre compte au Maroc avec mise à disposition d'une facture / relevé d'apport d'affaires.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <h4 className="font-bold text-sm text-[#153954] mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#f48360]" />
                  <span>Dois-je gérer les sinistres et le service après-vente des clients ?</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Non ! Digiassur et ses compagnies partenaires prennent en charge 100% de la gestion administrative, de la livraison des attestations et du traitement des sinistres. Votre seul rôle est d'apporter le prospect ou de faciliter la souscription.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <h4 className="font-bold text-sm text-[#153954] mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#f48360]" />
                  <span>Y a-t-il des frais d'inscription ou un objectif minimum de vente ?</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  L'inscription est totalement gratuite et sans aucun engagement. Vous n'avez aucun quota minimal imposé : vous touchez des commissions dès votre premier contrat apporté !
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
