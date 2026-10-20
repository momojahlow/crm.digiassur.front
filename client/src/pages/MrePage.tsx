import { useState } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import WhyDigiassur from "@/components/WhyDigiassur";
import AssurwiBanner from "@/components/AssurwiBanner";
import { 
  Plane, 
  Home as HomeIcon, 
  Car, 
  HeartPulse, 
  PiggyBank, 
  CheckCircle2, 
  ArrowRight, 
  Globe2, 
  Phone, 
  Mail, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  HelpCircle,
  RotateCcw,
  Sparkles,
  Users
} from "lucide-react";
import { MOROCCAN_CITIES } from "@/data/motoBrands";
import { useLanguage } from "@/contexts/LanguageContext";

const MRE_COUNTRIES = [
  { code: "FR", name: "France (+33)", dial: "+33" },
  { code: "ES", name: "Espagne (+34)", dial: "+34" },
  { code: "BE", name: "Belgique (+32)", dial: "+32" },
  { code: "IT", name: "Italie (+39)", dial: "+39" },
  { code: "DE", name: "Allemagne (+49)", dial: "+49" },
  { code: "NL", name: "Pays-Bas (+31)", dial: "+31" },
  { code: "CA", name: "Canada (+1)", dial: "+1" },
  { code: "US", name: "États-Unis (+1)", dial: "+1" },
  { code: "AE", name: "Émirats Arabes Unis (+971)", dial: "+971" },
  { code: "SA", name: "Arabie Saoudite (+966)", dial: "+966" },
  { code: "GB", name: "Royaume-Uni (+44)", dial: "+44" },
  { code: "OTHER", name: "Autre pays", dial: "+" },
];

const MRE_SOLUTIONS = [
  {
    id: "rapatriement",
    title: "Assistance Rapatriement & Secours",
    icon: Plane,
    desc: "Garantie essentielle pour vous et vos proches : rapatriement sanitaire d'urgence et rapatriement de corps vers le Maroc avec prise en charge intégrale."
  },
  {
    id: "residence_secondaire",
    title: "Résidence Secondaire au Maroc",
    icon: HomeIcon,
    desc: "Protégez votre appartement, maison ou villa au Maroc pendant vos mois d'absence contre les dégâts des eaux, cambriolages, incendies et vandalisme."
  },
  {
    id: "vehicule_transit",
    title: "Assurance Véhicule & Transit / Carte Verte",
    icon: Car,
    desc: "Couverture automobile au Maroc pour les véhicules immatriculés à l'étranger (traversée Tanger Med, Nador, etc.) avec assistance panne 24/7."
  },
  {
    id: "soins_vacances",
    title: "Soins Médicaux & Urgences Vacances",
    icon: HeartPulse,
    desc: "Accès aux meilleures cliniques privées au Maroc sans avance de frais lors de vos séjours en famille au Royaume."
  },
  {
    id: "epargne_maroc",
    title: "Épargne & Investissement au Maroc",
    icon: PiggyBank,
    desc: "Préparez votre retraite ou financez votre projet immobilier au pays avec des placements à capital garanti et rémunération attractive en Dirhams."
  }
];

export default function MrePage() {
  const { t, isRTL } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [dossierNumber, setDossierNumber] = useState("");

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    paysResidence: "France (+33)",
    villeMaroc: "Casablanca",
    telephone: "",
    email: "",
    besoins: ["rapatriement", "residence_secondaire"] as string[],
    periodeSejour: "Été (Juillet - Août)",
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
    setDossierNumber(`N° MRE-${randomNum}`);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#f48161] selection:text-white">
      <DigiassurHeader />

      <main className="flex-1 pt-[116px]">
        {/* HERO MRE */}
        <section className="relative bg-gradient-to-br from-[#153954] via-[#1c4769] to-[#285773] text-white py-6 lg:py-8 overflow-hidden">
          {/* Subtle ambient lighting */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#f48360]/15 blur-3xl pointer-events-none" />

          {/* GALACTIC BACKGROUND: TWO CROSSING OVALS (FAR LEFT) & GIANT GLOBE2 ICON (FAR RIGHT) */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center z-0">
            {/* Giant Globe2 Icon Watermark on the Right */}
            <div className="absolute -right-10 lg:right-6 top-1/2 -translate-y-1/2 text-white/[0.065] transition-transform duration-700">
              <Globe2 className="w-[500px] h-[500px] lg:w-[680px] lg:h-[680px]" strokeWidth={0.75} />
            </div>

            {/* Two Crossing Galactic Ovals SVG at Far Left */}
            <svg 
              className="absolute -left-36 lg:-left-20 top-1/2 -translate-y-1/2 w-[900px] h-[520px] lg:w-[1240px] lg:h-[600px] opacity-70" 
              viewBox="0 0 1200 600" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="mre-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
                  <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.85" />
                  <stop offset="70%" stopColor="#0284c7" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#153954" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="mre-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f48360" stopOpacity="0.1" />
                  <stop offset="35%" stopColor="#f48360" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#ff7849" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#ea580c" stopOpacity="0.1" />
                </linearGradient>
                <filter id="mre-glow-galactic" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Central Core Ambient Glow */}
              <circle cx="600" cy="300" r="140" fill="#38bdf8" opacity="0.04" />
              <circle cx="600" cy="300" r="90" fill="#f48360" opacity="0.04" />

              {/* Oval 1 - Galactic Orbit Tilt Left (-25 deg) */}
              <g transform="rotate(-25 600 300)">
                <ellipse 
                  cx="600" 
                  cy="300" 
                  rx="510" 
                  ry="170" 
                  stroke="url(#mre-grad-1)" 
                  strokeWidth="2" 
                  strokeDasharray="10 8"
                  filter="url(#mre-glow-galactic)"
                />
                <ellipse 
                  cx="600" 
                  cy="300" 
                  rx="510" 
                  ry="170" 
                  stroke="#38bdf8" 
                  strokeWidth="0.75" 
                  opacity="0.2"
                />
                {/* Orbital nodes on ring 1 */}
                <circle cx="180" cy="230" r="5" fill="#38bdf8" filter="url(#mre-glow-galactic)" />
                <circle cx="1020" cy="370" r="4" fill="#67e8f9" />
                <circle cx="600" cy="130" r="3.5" fill="#bae6fd" />
              </g>

              {/* Oval 2 - Galactic Orbit Tilt Right (+25 deg) - Crossing Oval 1 */}
              <g transform="rotate(25 600 300)">
                <ellipse 
                  cx="600" 
                  cy="300" 
                  rx="510" 
                  ry="170" 
                  stroke="url(#mre-grad-2)" 
                  strokeWidth="2" 
                  strokeDasharray="10 8"
                  filter="url(#mre-glow-galactic)"
                />
                <ellipse 
                  cx="600" 
                  cy="300" 
                  rx="510" 
                  ry="170" 
                  stroke="#f48360" 
                  strokeWidth="0.75" 
                  opacity="0.2"
                />
                {/* Orbital nodes on ring 2 */}
                <circle cx="210" cy="370" r="5" fill="#f48360" filter="url(#mre-glow-galactic)" />
                <circle cx="990" cy="230" r="4.5" fill="#ff7849" />
                <circle cx="600" cy="470" r="3.5" fill="#fed7aa" />
              </g>
            </svg>
          </div>

          <div className="max-w-[1360px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left Column (Compact) */}
              <div className="lg:col-span-7 space-y-3.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-wider text-cyan-200">
                  <Globe2 className="w-3.5 h-3.5 text-[#f48360]" />
                  <span>Espace Diaspora & Marocains du Monde (MRE)</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-black leading-tight tracking-tight text-white">
                  Restez protégé au Maroc comme à l'étranger : <br />
                  <span className="text-[#f48360]">Rapatriement, biens et séjours en toute sérénité.</span>
                </h1>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-normal">
                  Digiassur accompagne la communauté marocaine résidant à l'étranger. Que vous viviez en France, Espagne, Belgique, Canada ou dans le Golfe, bénéficiez de solutions complètes pour votre maison au Maroc, vos vacances et l'assistance rapatriement de toute votre famille.
                </p>

                {/* 4 Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5 max-w-xl">
                  <div className="flex items-center gap-2 text-xs text-cyan-50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#f48360] shrink-0" />
                    <span>Assistance rapatriement de corps & sanitaire 24/7</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-cyan-50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#f48360] shrink-0" />
                    <span>Protection de votre résidence secondaire inoccupée</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-cyan-50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#f48360] shrink-0" />
                    <span>Assurance automobile temporaire & transit</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-cyan-50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#f48360] shrink-0" />
                    <span>Paiement en ligne sécurisé en Euros ou Dirhams</span>
                  </div>
                </div>

                {/* Stats (Compact) */}
                <div className="pt-2.5 flex flex-wrap items-center gap-3 border-t border-white/10">
                  <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                    <div className="text-base sm:text-lg font-black text-white">+85 000</div>
                    <div className="text-[10px] text-cyan-200 font-medium uppercase tracking-wider">MRE protégés</div>
                  </div>
                  <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                    <div className="text-base sm:text-lg font-black text-[#f48360]">24h/7j</div>
                    <div className="text-[10px] text-cyan-200 font-medium uppercase tracking-wider">Assistance Rapatriement</div>
                  </div>
                  <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                    <div className="text-base sm:text-lg font-black text-white">100%</div>
                    <div className="text-[10px] text-cyan-200 font-medium uppercase tracking-wider">Souscription en ligne</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Formulaire MRE (Compact) */}
              <div className="lg:col-span-5">
                <div className="bg-white text-slate-800 p-4 sm:p-5 rounded-2xl shadow-2xl border border-white/20 relative">
                  {!submitted ? (
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3.5">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#f48360]">
                            Formulaire Spécial Diaspora
                          </span>
                          <h2 className="text-lg font-extrabold text-[#153954]">
                            Obtenir mon tarif MRE sur-mesure
                          </h2>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-orange-50 text-[#f48360] flex items-center justify-center shrink-0">
                          <Globe2 className="w-4 h-4" />
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

                        {/* 2. Pays de Résidence & Ville au Maroc */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                              Pays de résidence *
                            </label>
                            <select
                              value={formData.paysResidence}
                              onChange={e => setFormData({ ...formData, paysResidence: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4b7f9c]"
                            >
                              {MRE_COUNTRIES.map(c => (
                                <option key={c.code} value={c.name}>{c.name}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                              Ville d'attache au Maroc *
                            </label>
                            <select
                              value={formData.villeMaroc}
                              onChange={e => setFormData({ ...formData, villeMaroc: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4b7f9c]"
                            >
                              {MOROCCAN_CITIES.map(c => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* 3. Besoins MRE */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                            Garanties souhaitées (Plusieurs choix possibles) *
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {MRE_SOLUTIONS.map(sol => {
                              const selected = formData.besoins.includes(sol.id);
                              return (
                                <button
                                  key={sol.id}
                                  type="button"
                                  onClick={() => toggleBesoin(sol.id)}
                                  className={`text-left p-1.5 rounded-lg border text-[11px] flex items-center gap-1.5 transition cursor-pointer ${
                                    selected 
                                      ? "bg-orange-50 border-[#f48360] text-[#153954] font-bold" 
                                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                                  }`}
                                >
                                  <div className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 ${selected ? "bg-[#f48360] text-white" : "border border-slate-300"}`}>
                                    {selected && <CheckCircle2 className="w-3 h-3" />}
                                  </div>
                                  <span className="truncate">{sol.title}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* 4. Téléphone international & Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 border-t border-slate-100">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                              Téléphone (Mobile / WhatsApp) *
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="+33 6 XX XX XX XX"
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
                              placeholder="exemple@email.com"
                              value={formData.email}
                              onChange={e => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4b7f9c]"
                            />
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full mt-2 bg-[#f48360] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                        >
                          <span>OBTENIR MON DEVIS MRE GRATUIT</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <p className="text-[10px] text-center text-slate-400">
                          Devis officiel sans engagement. Accompagnement en français et en arabe.
                        </p>
                      </form>
                    </div>
                  ) : (
                    /* Confirmation Screen MRE */
                    <div className="text-center py-6 animate-in zoom-in-95 duration-300 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>

                      <h3 className="text-xl font-black uppercase text-[#153954]">
                        Félicitations, demande MRE enregistrée !
                      </h3>

                      <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                        Votre dossier <strong>{dossierNumber}</strong> pour <strong>{formData.prenom} {formData.nom}</strong> a bien été transmis à notre Pôle Spécial Diaspora.
                      </p>

                      <div className="bg-[#fef1eb] p-4 rounded-xl border border-orange-200 text-left text-xs space-y-2">
                        <div className="flex justify-between border-b border-orange-200/60 pb-1.5 font-bold text-[#153954]">
                          <span>Bénéficiaire :</span>
                          <span>{formData.prenom} {formData.nom}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Pays de Résidence :</span>
                          <span className="font-semibold text-slate-800">{formData.paysResidence}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Ville au Maroc :</span>
                          <span className="font-semibold text-slate-800">{formData.villeMaroc}</span>
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
                        Un conseiller spécialisé MRE va vous contacter par téléphone ou email afin de finaliser votre tarification et activer vos garanties immédiatement.
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

        {/* 5 SOLUTIONS MRE */}
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-[#f48360] bg-orange-50 px-3 py-1 rounded-full">
                Offres Diaspora
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#153954] mt-3 mb-4">
                Nos Solutions Spéciales pour les Marocains du Monde
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Des formules conçues pour faciliter votre vie entre votre pays d'accueil et le Royaume du Maroc.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MRE_SOLUTIONS.map(sol => {
                const Icon = sol.icon;
                return (
                  <div key={sol.id} className="bg-white p-7 rounded-2xl shadow-xs border border-slate-200/80 hover:shadow-md transition group">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#f48360] flex items-center justify-center mb-5 group-hover:bg-[#f48360] group-hover:text-white transition">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#153954] mb-2">
                      {sol.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {sol.desc}
                    </p>
                    <div className="border-t pt-4">
                      <span className="text-xs font-bold text-[#4b7f9c] group-hover:text-[#f48360] inline-flex items-center gap-1 transition">
                        <span>Souscription en ligne immédiate</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ MRE */}
        <section className="py-16 bg-white">
          <div className="max-w-[1000px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153954]">
                Questions Fréquentes — MRE & Diaspora
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Tout comprendre sur l'assistance rapatriement et les assurances de vos biens au Maroc.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-xs">
                <h4 className="font-bold text-sm text-[#153954] mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#f48360]" />
                  <span>En quoi consiste la convention d'assistance rapatriement de corps ?</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Elle garantit le rapatriement du corps du défunt depuis n'importe quel pays étranger jusqu'au lieu d'inhumation au Maroc. Le contrat prend en charge les démarches administratives, consulaires, le transport aérien et fournit également un billet aller-retour pour un accompagnateur de la famille.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-xs">
                <h4 className="font-bold text-sm text-[#153954] mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#f48360]" />
                  <span>Comment assurer ma résidence secondaire au Maroc pendant mon absence ?</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Notre contrat Multirisque Habitation MRE comprend une clause spécifique d'inoccupation prolongée sans surcoût. Vos biens, meubles et équipements sont protégés en continu contre le vol, l'incendie, les dégâts des eaux et les catastrophes naturelles, même si vous n'êtes sur place qu'un mois par an.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-xs">
                <h4 className="font-bold text-sm text-[#153954] mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#f48360]" />
                  <span>Puis-je souscrire et payer depuis l'étranger avec ma carte bancaire européenne ?</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Oui, notre plateforme accepte les cartes bancaires internationales (Visa, Mastercard internationales) ainsi que les cartes marocaines via la plateforme sécurisée CMI. Vos attestations vous sont envoyées par email instantanément dès validation du paiement.
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
