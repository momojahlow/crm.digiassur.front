import { useState, useMemo } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import { CAR_BRANDS, MOROCCAN_PREFECTURES, ARABIC_LETTERS, MOROCCAN_SERIES_LETTERS, MOROCCAN_PLATE_NUMBERS } from "@/data/carBrands";
import { 
  calculateValeurVenale, 
  calculateDevisAuto, 
  calculateDommagesCollision, 
  calculateTierce,
  calculateFormules 
} from "@/lib/pricingEngine";
import { 
  UserCheck, 
  Car, 
  FileText, 
  SlidersHorizontal, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Send, 
  Upload, 
  Check, 
  X, 
  Phone, 
  Mail, 
  User, 
  HelpCircle, 
  Calendar, 
  Gauge, 
  Fuel, 
  Shield, 
  ShieldCheck,
  Clock, 
  FileCheck, 
  Smartphone, 
  Scale, 
  Headphones, 
  Truck, 
  CreditCard, 
  HeartHandshake, 
  Wrench,
  Pencil,
  Plus,
  Sparkles,
  Globe
} from "lucide-react";
import { Link } from "wouter";

interface ProspectState {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  connu: string;
  cgu: boolean;
}

interface VehiculeState {
  marque: string;
  modele: string;
  energie: "Diesel" | "Essence" | "Electrique" | "Hybrid";
  p_fiscale: number;
  date_mec: string;
  van: number;
  crm: number;
  plafond_bg: number;
  custom_plafond_bg: string;
}

interface ContratGaranties {
  pta: boolean;
  inc_vol_bdg: boolean;
  dc: boolean;
  tc: boolean;
  assistance_vip: boolean;
}

interface ContratState {
  duree: "Annuelle" | "Semestrielle" | "Trimestrielle";
  debut: string;
  formule: string;
  garanties: ContratGaranties;
  servicing: number;
  assistance: number;
  carte_verte: number;
}

export default function AutoDevisPage() {
  const [step, setStep] = useState<number>(1);
  const lastStep = 5;

  // Step 1: Prospect
  const [prospect, setProspect] = useState<ProspectState>({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    connu: "",
    cgu: true
  });

  // Step 2: Véhicule
  const [vehicule, setVehicule] = useState<VehiculeState>({
    marque: "Dacia",
    modele: "Logan",
    energie: "Diesel",
    p_fiscale: 6,
    date_mec: new Date().toISOString().split("T")[0],
    van: 150000,
    crm: 1.0,
    plafond_bg: 5000,
    custom_plafond_bg: ""
  });

  // Plate Segments
  const [immNum, setImmNum] = useState<string>("12345");
  const [immCode, setImmCode] = useState<string>("أ");
  const [immChiffre, setImmChiffre] = useState<string>("6");

  // Step 3 & 4: Contrat avec sélection modulaire des garanties
  const [contrat, setContrat] = useState<ContratState>({
    duree: "Annuelle",
    debut: new Date().toISOString().split("T")[0],
    formule: "Sur-Mesure",
    garanties: {
      pta: false,
      inc_vol_bdg: false,
      dc: false,
      tc: false,
      assistance_vip: false
    },
    servicing: 0,
    assistance: 0,
    carte_verte: 0
  });

  // Mode d'affichage de l'Étape 3 : 'sur-mesure' (carte unique interactive) ou '3-formules' (Start, Go, Fast)
  const [viewMode, setViewMode] = useState<"sur-mesure" | "3-formules">("sur-mesure");

  // Step 5: Document toggles & uploads
  const [showDocuments, setShowDocuments] = useState<boolean>(false);
  const [showTaxDetails, setShowTaxDetails] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({});

  // UI Dropdown states
  const [searchMarque, setSearchMarque] = useState("");
  const [showMarquesDropdown, setShowMarquesDropdown] = useState(false);
  const [showModelesDropdown, setShowModelesDropdown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Filtered brands
  const filteredBrands = useMemo(() => {
    if (!searchMarque.trim()) return CAR_BRANDS;
    return CAR_BRANDS.filter(b => b.nom.toLowerCase().includes(searchMarque.toLowerCase()));
  }, [searchMarque]);

  // Current brand models
  const currentBrandModels = useMemo(() => {
    const brand = CAR_BRANDS.find(b => b.nom.toLowerCase() === vehicule.marque.toLowerCase());
    return brand ? brand.modeles : ["Modèle standard"];
  }, [vehicule.marque]);

  // Toggle intelligent des garanties (décochage auto de DC si TC est cochée et vice-versa, inclusion auto si DC ou TC actif)
  const handleToggleGuarantee = (key: keyof ContratGaranties) => {
    setContrat(prev => {
      const nextGaranties = { ...prev.garanties };
      if (key === "tc") {
        if (prev.garanties.dc) return prev; // Inactif / désactivé si Dommages Collision est coché
        nextGaranties.tc = !nextGaranties.tc;
      } else if (key === "dc") {
        if (prev.garanties.tc) return prev; // Inactif / désactivé si Tierce Complète est cochée
        nextGaranties.dc = !nextGaranties.dc;
      } else {
        if (prev.garanties.tc || prev.garanties.dc) return prev; // Inclus d'office si TC ou DC est actif
        nextGaranties[key] = !nextGaranties[key];
      }
      return {
        ...prev,
        garanties: nextGaranties
      };
    });
  };

  // 1. Calcul du prix de départ (Socle Formule Start = RC + DR 0 DH)
  const baseStartQuote = useMemo(() => {
    const cv = Number(vehicule.p_fiscale) || 6;
    const van = Number(vehicule.van) || 150000;
    const crm = Number(vehicule.crm) || 1.0;

    return calculateDevisAuto({
      energie: vehicule.energie,
      puissanceFiscale: cv,
      valeurNeuf: van,
      dateMec: vehicule.date_mec,
      crm,
      duree: contrat.duree,
      options: {}
    });
  }, [vehicule.p_fiscale, vehicule.energie, vehicule.van, vehicule.crm, vehicule.date_mec, contrat.duree]);

  // 2. Calcul du devis personnalisé complet selon les garanties cochées
  const activeQuote = useMemo(() => {
    const cv = Number(vehicule.p_fiscale) || 6;
    const van = Number(vehicule.van) || 150000;
    const crm = Number(vehicule.crm) || 1.0;

    return calculateDevisAuto({
      energie: vehicule.energie,
      puissanceFiscale: cv,
      valeurNeuf: van,
      dateMec: vehicule.date_mec,
      crm,
      duree: contrat.duree,
      options: {
        pta: contrat.garanties.pta,
        inc_vol_bdg: contrat.garanties.inc_vol_bdg,
        dc: contrat.garanties.dc,
        tc: contrat.garanties.tc
      }
    });
  }, [vehicule.p_fiscale, vehicule.energie, vehicule.van, vehicule.crm, vehicule.date_mec, contrat.duree, contrat.garanties]);

  // 3. Calcul comparatif des 3 formules (Start, Go, Fast) pour le mode comparateur
  const formuleResults = useMemo(() => {
    const cv = Number(vehicule.p_fiscale) || 6;
    const van = Number(vehicule.van) || 150000;
    const crm = Number(vehicule.crm) || 1.0;

    return calculateFormules({
      energie: vehicule.energie,
      puissanceFiscale: cv,
      valeurNeuf: van,
      dateMec: vehicule.date_mec,
      crm,
      duree: contrat.duree,
      ptaForStart: contrat.garanties.pta
    });
  }, [vehicule.p_fiscale, vehicule.energie, vehicule.van, vehicule.crm, vehicule.date_mec, contrat.duree, contrat.garanties.pta]);

  const prices = formuleResults;

  // 4. Coûts marginaux TTC par garantie selon la durée
  const incrementalPrices = useMemo(() => {
    const d = contrat.duree.toLowerCase();
    const ratio = d.includes("semestri") ? 0.54 : d.includes("trimestri") ? 0.27 : 1.0;
    const taxFactor = 1.175; // 15% Taxe GA + 2.5% EVCAT

    const van = Number(vehicule.van) || 150000;
    const dcBase = calculateDommagesCollision(van);
    const tcBase = calculateTierce(van);

    const dcPackBase = 125 + 400 + dcBase;
    const tcPackBase = 200 + 400 + tcBase;

    return {
      pta: Number((200 * ratio * taxFactor).toFixed(2)),
      inc_vol_bdg: Number((400 * ratio * taxFactor).toFixed(2)),
      dc: Number((dcPackBase * ratio * taxFactor).toFixed(2)),
      tc: Number((tcPackBase * ratio * taxFactor).toFixed(2)),
      assistance_vip: 85
    };
  }, [contrat.duree, vehicule.van]);

  const activeBreakdown = activeQuote;
  const activeFormulaPrice = activeQuote.primeTotale;

  // Calcul dynamique de la Valeur Vénale via le moteur officiel
  const estimatedValeurVenale = useMemo(() => {
    return calculateValeurVenale(Number(vehicule.van) || 0, vehicule.date_mec);
  }, [vehicule.van, vehicule.date_mec]);

  // End Date calculation based on start date & duration
  const dateFin = useMemo(() => {
    if (!contrat.debut) return "";
    const d = new Date(contrat.debut);
    if (contrat.duree === "Annuelle") {
      d.setFullYear(d.getFullYear() + 1);
    } else if (contrat.duree === "Semestrielle") {
      d.setMonth(d.getMonth() + 6);
    } else {
      d.setMonth(d.getMonth() + 3);
    }
    return d.toISOString().split("T")[0];
  }, [contrat.debut, contrat.duree]);

  // Total Premium
  const totalPrime = useMemo(() => {
    return (
      Number(activeFormulaPrice) +
      Number(contrat.assistance || 0) +
      Number(contrat.carte_verte || 0) +
      Number(contrat.servicing || 0)
    ).toFixed(2);
  }, [activeFormulaPrice, contrat.assistance, contrat.carte_verte, contrat.servicing]);

  // Step Validation
  const validateStep = (targetStep: number): boolean => {
    const err: Record<string, string> = {};

    if (targetStep === 1) {
      if (!prospect.nom.trim()) err.nom = "Veuillez renseigner votre nom";
      if (!prospect.prenom.trim()) err.prenom = "Veuillez renseigner votre prénom";
      if (!prospect.telephone.trim()) err.telephone = "Veuillez renseigner votre téléphone";
      if (!prospect.email.trim() || !prospect.email.includes("@")) err.email = "Email invalide";
      if (!prospect.cgu) err.cgu = "Veuillez accepter les conditions générales";
    }

    if (targetStep === 2) {
      if (!vehicule.marque) err.marque = "Veuillez choisir une marque";
      if (!vehicule.modele) err.modele = "Veuillez choisir un modèle";
      if (!vehicule.p_fiscale || vehicule.p_fiscale < 2) err.p_fiscale = "Puissance fiscale min. 2 CV";
      if (!vehicule.van || vehicule.van <= 0) err.van = "Valeur à neuf requise";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, lastStep));
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const resetAllData = () => {
    setStep(1);
    setProspect({
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      connu: "",
      cgu: true
    });
    setContrat({
      duree: "Annuelle",
      debut: new Date().toISOString().split("T")[0],
      formule: "Sur-Mesure",
      garanties: {
        pta: false,
        inc_vol_bdg: false,
        dc: false,
        tc: false,
        assistance_vip: false
      },
      servicing: 0,
      assistance: 0,
      carte_verte: 0
    });
    setUploadedFiles({});
    setErrors({});
  };

  const handleFileUpload = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles(prev => ({
        ...prev,
        [key]: e.target.files![0].name
      }));
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#f48161] selection:text-white">
      <DigiassurHeader />
      <FloatingWidgets />

      <main className="flex-1 pt-[116px]">
        {/* Banner with car icon overlay matching live devis */}
        <section className="relative overflow-hidden bg-cover bg-center h-[210px]" style={{ backgroundImage: "url('/images/banner-auto.jpg')" }}>
          <div className="absolute inset-0 bg-[#005475]/50 flex flex-col items-center justify-center text-center px-4">
            <div className="w-[84px] h-[84px] rounded-full bg-[#dbf2f4] flex items-center justify-center shadow-lg mb-3 border-4 border-white/60">
              <img src="/images/car-icon.svg" alt="Auto" className="w-10 h-10 object-contain" />
            </div>
            <h1 className="uppercase text-2xl md:text-3xl font-extrabold text-white tracking-wider">
              Obtenir mon tarif auto
            </h1>
            <p className="text-cyan-100 text-sm mt-1">
              Comparez les meilleures offres d'assurance automobile au Maroc
            </p>
          </div>
        </section>

        {/* 5-Step Stepper Header */}
        <section className="bg-slate-50 border-b border-slate-200 py-4 px-4">
          <div className="max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute top-[26px] left-[60px] right-[60px] h-1 bg-slate-200 -z-0" />
            
            <div className="grid grid-cols-5 gap-2 relative z-10">
              {/* Step 1 */}
              <button 
                type="button" 
                onClick={() => { if (step > 1) setStep(1); }}
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white border-4 border-white shadow-md transition-all ${
                  step === 1 ? "bg-[#f48161] ring-4 ring-[#f48161]/20 scale-105" : step > 1 ? "bg-[#153954]" : "bg-slate-300"
                }`}>
                  <UserCheck className="w-6 h-6" />
                </div>
                <span className={`mt-2 text-xs md:text-sm uppercase font-bold tracking-tight ${
                  step === 1 ? "text-[#f48161]" : "text-slate-600"
                }`}>
                  1. Assuré
                </span>
              </button>

              {/* Step 2 */}
              <button 
                type="button" 
                onClick={() => { if (step > 2 || validateStep(1)) setStep(2); }}
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white border-4 border-white shadow-md transition-all ${
                  step === 2 ? "bg-[#f48161] ring-4 ring-[#f48161]/20 scale-105" : step > 2 ? "bg-[#153954]" : "bg-slate-300"
                }`}>
                  <Car className="w-6 h-6" />
                </div>
                <span className={`mt-2 text-xs md:text-sm uppercase font-bold tracking-tight ${
                  step === 2 ? "text-[#f48161]" : "text-slate-600"
                }`}>
                  2. Véhicule
                </span>
              </button>

              {/* Step 3 */}
              <button 
                type="button" 
                onClick={() => { if (step > 3 || (validateStep(1) && validateStep(2))) setStep(3); }}
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white border-4 border-white shadow-md transition-all ${
                  step === 3 ? "bg-[#f48161] ring-4 ring-[#f48161]/20 scale-105" : step > 3 ? "bg-[#153954]" : "bg-slate-300"
                }`}>
                  <FileText className="w-6 h-6" />
                </div>
                <span className={`mt-2 text-xs md:text-sm uppercase font-bold tracking-tight ${
                  step === 3 ? "text-[#f48161]" : "text-slate-600"
                }`}>
                  3. Formule
                </span>
              </button>

              {/* Step 4 */}
              <button 
                type="button" 
                onClick={() => { if (step > 4) setStep(4); }}
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white border-4 border-white shadow-md transition-all ${
                  step === 4 ? "bg-[#f48161] ring-4 ring-[#f48161]/20 scale-105" : step > 4 ? "bg-[#153954]" : "bg-slate-300"
                }`}>
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <span className={`mt-2 text-xs md:text-sm uppercase font-bold tracking-tight ${
                  step === 4 ? "text-[#f48161]" : "text-slate-600"
                }`}>
                  4. Options
                </span>
              </button>

              {/* Step 5 */}
              <button 
                type="button" 
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white border-4 border-white shadow-md transition-all ${
                  step === 5 ? "bg-[#f48161] ring-4 ring-[#f48161]/20 scale-105" : "bg-slate-300"
                }`}>
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className={`mt-2 text-xs md:text-sm uppercase font-bold tracking-tight ${
                  step === 5 ? "text-[#f48161]" : "text-slate-600"
                }`}>
                  5. Confirmation
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Funnel Body + Sidebar */}
        <section className="py-4 px-4 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Main Form Container */}
            <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">

              {/* STEP 1: INFORMATIONS ASSURÉ */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-700 mb-2">
                      Renseignez vos informations afin de recevoir votre devis
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Ces informations nous permettent de calculer précisément votre prime personnalisée.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nom */}
                    <div>
                      <div className="bg-slate-100 rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <User className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          placeholder="Nom *"
                          value={prospect.nom}
                          onChange={e => setProspect({ ...prospect, nom: e.target.value })}
                          className="w-full bg-transparent px-4 text-slate-700 outline-none text-sm font-medium"
                        />
                      </div>
                      {errors.nom && <p className="text-red-500 text-xs mt-1 pl-4">{errors.nom}</p>}
                    </div>

                    {/* Prénom */}
                    <div>
                      <div className="bg-slate-100 rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <User className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          placeholder="Prénom *"
                          value={prospect.prenom}
                          onChange={e => setProspect({ ...prospect, prenom: e.target.value })}
                          className="w-full bg-transparent px-4 text-slate-700 outline-none text-sm font-medium"
                        />
                      </div>
                      {errors.prenom && <p className="text-red-500 text-xs mt-1 pl-4">{errors.prenom}</p>}
                    </div>

                    {/* Téléphone */}
                    <div>
                      <div className="bg-slate-100 rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <Phone className="w-5 h-5" />
                        </div>
                        <input
                          type="tel"
                          placeholder="Téléphone (ex: 06 12 34 56 78) *"
                          value={prospect.telephone}
                          onChange={e => setProspect({ ...prospect, telephone: e.target.value })}
                          className="w-full bg-transparent px-4 text-slate-700 outline-none text-sm font-medium"
                        />
                      </div>
                      {errors.telephone && <p className="text-red-500 text-xs mt-1 pl-4">{errors.telephone}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <div className="bg-slate-100 rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <Mail className="w-5 h-5" />
                        </div>
                        <input
                          type="email"
                          placeholder="Email *"
                          value={prospect.email}
                          onChange={e => setProspect({ ...prospect, email: e.target.value })}
                          className="w-full bg-transparent px-4 text-slate-700 outline-none text-sm font-medium"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-xs mt-1 pl-4">{errors.email}</p>}
                    </div>

                    {/* Comment nous avez-vous connus */}
                    <div className="md:col-span-2">
                      <div className="bg-slate-100 rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <HelpCircle className="w-5 h-5" />
                        </div>
                        <select
                          value={prospect.connu}
                          onChange={e => setProspect({ ...prospect, connu: e.target.value })}
                          className="w-full bg-transparent px-4 text-slate-600 outline-none text-sm font-medium cursor-pointer"
                        >
                          <option value="">Comment vous nous avez connus ?</option>
                          <option value="Google">Google / Recherche web</option>
                          <option value="Facebook">Facebook</option>
                          <option value="Instagram">Instagram</option>
                          <option value="LinkedIn">LinkedIn</option>
                          <option value="Bouche à oreille">Bouche à oreille / Recommandation</option>
                          <option value="Bannière publicitaire">Bannière publicitaire</option>
                          <option value="Mail">Email / Newsletter</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* CGU checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer text-sm text-slate-600">
                      <input
                        type="checkbox"
                        checked={prospect.cgu}
                        onChange={e => setProspect({ ...prospect, cgu: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded text-[#f48161] focus:ring-[#f48161] border-slate-300"
                      />
                      <span>
                        J'ai lu et j'accepte les{" "}
                        <Link href="/mentions-legales" className="font-bold text-[#153954] underline hover:text-[#f48161]">
                          conditions générales
                        </Link>{" "}
                        d'utilisation notamment la mention relative à la protection des données personnelles (CNDP).
                      </span>
                    </label>
                    {errors.cgu && <p className="text-red-500 text-xs mt-1 pl-7">{errors.cgu}</p>}
                  </div>
                </div>
              )}

              {/* STEP 2: CARACTÉRISTIQUES DU VÉHICULE */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-700 mb-2">
                      Caractéristiques de votre véhicule
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Sélectionnez la marque, le modèle et la puissance fiscale de votre auto.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Marque search/select */}
                    <div className="relative">
                      <div className="bg-slate-100 rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <Car className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          placeholder="Rechercher marque (ex: Dacia, Renault...)"
                          value={showMarquesDropdown ? searchMarque : vehicule.marque}
                          onFocus={() => { setSearchMarque(""); setShowMarquesDropdown(true); }}
                          onChange={e => setSearchMarque(e.target.value)}
                          className="w-full bg-transparent px-4 text-slate-700 outline-none text-sm font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => setShowMarquesDropdown(!showMarquesDropdown)}
                          className="p-2 bg-white text-slate-500 rounded-full shadow-xs hover:bg-slate-50 mr-1"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      </div>

                      {showMarquesDropdown && (
                        <div className="absolute top-14 left-0 right-0 z-30 bg-white border border-slate-200 rounded-xl shadow-xl max-h-56 overflow-y-auto p-2">
                          {filteredBrands.map(b => (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => {
                                setVehicule({
                                  ...vehicule,
                                  marque: b.nom,
                                  modele: b.modeles[0] || "Modèle"
                                });
                                setShowMarquesDropdown(false);
                              }}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-orange-50 rounded-lg text-slate-700 font-medium flex items-center justify-between"
                            >
                              <span>{b.nom}</span>
                              <span className="text-xs text-slate-400">{b.modeles.length} modèles</span>
                            </button>
                          ))}
                        </div>
                      )}
                      {errors.marque && <p className="text-red-500 text-xs mt-1 pl-4">{errors.marque}</p>}
                    </div>

                    {/* Modèle Select */}
                    <div className="relative">
                      <div className="bg-slate-100 rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <Car className="w-5 h-5" />
                        </div>
                        <select
                          value={vehicule.modele}
                          onChange={e => setVehicule({ ...vehicule, modele: e.target.value })}
                          className="w-full bg-transparent px-4 text-slate-700 outline-none text-sm font-medium cursor-pointer"
                        >
                          {currentBrandModels.map((m, idx) => (
                            <option key={idx} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>
                      {errors.modele && <p className="text-red-500 text-xs mt-1 pl-4">{errors.modele}</p>}
                    </div>

                    {/* Carburant */}
                    <div>
                      <div className="bg-slate-100 rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <Fuel className="w-5 h-5" />
                        </div>
                        <select
                          value={vehicule.energie}
                          onChange={e => setVehicule({ ...vehicule, energie: e.target.value as any })}
                          className="w-full bg-transparent px-4 text-slate-700 outline-none text-sm font-medium cursor-pointer"
                        >
                          <option value="Diesel">Diesel</option>
                          <option value="Essence">Essence</option>
                          <option value="Hybrid">Hybride</option>
                          <option value="Electrique">Électrique</option>
                        </select>
                      </div>
                    </div>

                    {/* Puissance fiscale */}
                    <div>
                      <div className="bg-slate-100 rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <Gauge className="w-5 h-5" />
                        </div>
                        <input
                          type="number"
                          min="2"
                          max="35"
                          placeholder="Puissance fiscale (CV) *"
                          value={vehicule.p_fiscale}
                          onChange={e => setVehicule({ ...vehicule, p_fiscale: Number(e.target.value) })}
                          className="w-full bg-transparent px-4 text-slate-700 outline-none text-sm font-medium"
                        />
                        <span className="text-xs font-bold text-slate-500 pr-4">CV</span>
                      </div>
                      {errors.p_fiscale && <p className="text-red-500 text-xs mt-1 pl-4">{errors.p_fiscale}</p>}
                    </div>

                    {/* Segmented Moroccan Registration Plate */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1 pl-2">
                        Immatriculation marocaine *
                      </label>
                      <div className="flex gap-2 items-center">
                        {/* Numéro */}
                        <div className="flex-1 bg-slate-100 rounded-full p-1.5 flex items-center shadow-inner h-[52px]">
                          <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                            N°
                          </div>
                          <input
                            type="number"
                            placeholder="12345"
                            value={immNum}
                            onChange={e => setImmNum(e.target.value)}
                            className="w-full bg-transparent px-3 text-slate-700 outline-none text-base font-bold text-center"
                          />
                        </div>

                        {/* Lettre bilingue arabe et française */}
                        <div className="w-32 bg-slate-100 rounded-full px-2 flex items-center justify-center shadow-inner h-[52px]">
                          <select
                            value={immCode}
                            onChange={e => setImmCode(e.target.value)}
                            className="w-full bg-transparent text-center font-bold text-slate-700 outline-none text-sm cursor-pointer h-full"
                          >
                            {MOROCCAN_SERIES_LETTERS.map(lettre => (
                              <option key={lettre.ar} value={lettre.ar}>
                                {lettre.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Préfecture chiffre (1 jusqu'à 99) */}
                        <div className="w-24 sm:w-28 bg-slate-100 rounded-full px-2 flex items-center justify-center shadow-inner h-[52px]">
                          <select
                            value={immChiffre}
                            onChange={e => setImmChiffre(e.target.value)}
                            className="w-full bg-transparent text-center font-bold text-slate-700 outline-none text-sm cursor-pointer h-full"
                          >
                            {MOROCCAN_PLATE_NUMBERS.map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 pl-2 mt-1">Ex: 12345 | أ | A | 6 (Casablanca Anfa)</p>
                    </div>

                    {/* Date mise en circulation */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1 pl-2">
                        Date de 1ère mise en circulation *
                      </label>
                      <div className="bg-slate-100 rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <input
                          type="date"
                          value={vehicule.date_mec}
                          onChange={e => setVehicule({ ...vehicule, date_mec: e.target.value })}
                          className="w-full bg-transparent px-4 text-slate-700 outline-none text-sm font-medium"
                        />
                      </div>
                    </div>

                    {/* Valeur à neuf */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1 pl-2">
                        Valeur du véhicule à neuf (DHS) *
                      </label>
                      <div className="bg-slate-100 rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                          DH
                        </div>
                        <input
                          type="number"
                          step="5000"
                          placeholder="Valeur à neuf (ex: 150000)"
                          value={vehicule.van}
                          onChange={e => setVehicule({ ...vehicule, van: Number(e.target.value) })}
                          className="w-full bg-transparent px-4 text-slate-700 outline-none text-sm font-bold"
                        />
                      </div>
                      {errors.van && <p className="text-red-500 text-xs mt-1 pl-4">{errors.van}</p>}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pl-3 pt-1.5">
                        <span>Valeur vénale estimée (décote FMSAR) :</span>
                        <span className="font-bold text-[#153954] bg-slate-100 px-2 py-0.5 rounded-md">
                          {estimatedValeurVenale.toLocaleString()} DHS
                        </span>
                      </div>
                    </div>

                    {/* Bonus / Malus CRM */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1 pl-2">
                        Bonus / Malus (Coefficient CRM ACAPS)
                      </label>
                      <div className="bg-slate-100 rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#153954] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                          %
                        </div>
                        <select
                          value={vehicule.crm}
                          onChange={e => setVehicule({ ...vehicule, crm: Number(e.target.value) })}
                          className="w-full bg-transparent px-3 text-slate-700 font-bold outline-none text-sm cursor-pointer"
                        >
                          <option value="1.0">CRM 1.00 — Standard (Neutre)</option>
                          <option value="0.9">CRM 0.90 — Bonus -10%</option>
                          <option value="0.8">CRM 0.80 — Bonus -20%</option>
                          <option value="0.7">CRM 0.70 — Bonus -30%</option>
                          <option value="0.6">CRM 0.60 — Bonus -40%</option>
                          <option value="0.5">CRM 0.50 — Bonus maximal (-50%)</option>
                          <option value="1.2">CRM 1.20 — Malus (+20%)</option>
                          <option value="1.4">CRM 1.40 — Jeune conducteur / Malus (+40%)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Plafond Bris de Glace */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-6">
                    <h3 className="font-bold text-slate-700 text-sm mb-3">
                      Plafond de la garantie Bris de Glace
                    </h3>
                    <div className="flex flex-wrap gap-6 items-center">
                      <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700 text-sm">
                        <input
                          type="radio"
                          name="plafond_bg"
                          checked={vehicule.plafond_bg === 5000}
                          onChange={() => setVehicule({ ...vehicule, plafond_bg: 5000 })}
                          className="text-[#f48161] focus:ring-[#f48161]"
                        />
                        <span>5 000 DHS</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700 text-sm">
                        <input
                          type="radio"
                          name="plafond_bg"
                          checked={vehicule.plafond_bg === 10000}
                          onChange={() => setVehicule({ ...vehicule, plafond_bg: 10000 })}
                          className="text-[#f48161] focus:ring-[#f48161]"
                        />
                        <span>10 000 DHS</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700 text-sm">
                        <input
                          type="radio"
                          name="plafond_bg"
                          checked={vehicule.plafond_bg === 15000}
                          onChange={() => setVehicule({ ...vehicule, plafond_bg: 15000 })}
                          className="text-[#f48161] focus:ring-[#f48161]"
                        />
                        <span>15 000 DHS (Véhicules premium)</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: DEVIS AUTO - BASCULEMENT SUR-MESURE OU 3 FORMULES */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  {/* Top Bar: Badge + Toggle Button at top right */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/70 text-[#f48161] text-xs font-black uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{viewMode === "sur-mesure" ? "Offre Modulaire & Sur-Mesure" : "Comparatif 3 Formules"}</span>
                    </div>

                    {/* Bouton de basculement positionné tout en haut à droite */}
                    <button
                      type="button"
                      onClick={() => {
                        setViewMode(prev => {
                          const nextMode = prev === "sur-mesure" ? "3-formules" : "sur-mesure";
                          if (nextMode === "3-formules" && contrat.formule === "Sur-Mesure") {
                            setContrat(c => ({
                              ...c,
                              formule: "Go",
                              garanties: {
                                pta: true,
                                inc_vol_bdg: true,
                                dc: true,
                                tc: false,
                                assistance_vip: false
                              }
                            }));
                          } else if (nextMode === "sur-mesure") {
                            setContrat(c => ({
                              ...c,
                              formule: "Sur-Mesure"
                            }));
                          }
                          return nextMode;
                        });
                      }}
                      className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full transition-all shrink-0 cursor-pointer shadow-md border ${
                        viewMode === "sur-mesure"
                          ? "animate-zoom-pulse bg-gradient-to-r from-orange-50 via-white to-orange-50 border-[#f48161] text-[#153954] hover:shadow-lg hover:border-[#e46e4e]"
                          : "bg-slate-100 hover:bg-slate-200 text-[#153954] border-slate-200 hover:text-[#f48161]"
                      }`}
                    >
                      <SlidersHorizontal className={`w-3.5 h-3.5 shrink-0 ${viewMode === "sur-mesure" ? "animate-slow-spin text-[#f48161]" : "text-[#153954]"}`} />
                      <span>{viewMode === "sur-mesure" ? "Voir la version 3 formules classiques" : "Revenir à l'offre personnalisée sur-mesure"}</span>
                    </button>
                  </div>

                  {/* Header Title & Subtitle */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-800">
                      {viewMode === "sur-mesure" ? "Votre Couverture Auto Personnalisée" : "Choisissez votre formule Digiassur"}
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm mt-0.5">
                      {viewMode === "sur-mesure" 
                        ? "Démarrez avec le prix de base Start et cochez / décochez vos garanties pour suivre l'évolution de votre tarif en direct."
                        : "Comparez nos formules Start, Go et Fast pour votre véhicule."}
                    </p>
                  </div>

                  {/* Top Filters: Durée & Prise d'effet */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 pl-1">
                        Périodicité / Durée de garantie *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setContrat({ ...contrat, duree: "Annuelle" })}
                          className={`h-11 px-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center border text-center ${
                            contrat.duree === "Annuelle"
                              ? "bg-[#153954] text-white border-[#153954] shadow-sm"
                              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <span>Annuelle (1 an)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setContrat({ ...contrat, duree: "Semestrielle" })}
                          className={`h-11 px-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center border text-center ${
                            contrat.duree === "Semestrielle"
                              ? "bg-[#153954] text-white border-[#153954] shadow-sm"
                              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <span>6 Mois</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setContrat({ ...contrat, duree: "Trimestrielle" })}
                          className={`h-11 px-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center border text-center ${
                            contrat.duree === "Trimestrielle"
                              ? "bg-[#153954] text-white border-[#153954] shadow-sm"
                              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <span>3 Mois</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 pl-1">
                        Date de prise d'effet du contrat *
                      </label>
                      <div className="h-11 bg-white rounded-xl px-2.5 flex items-center border border-slate-200 shadow-2xs">
                        <div className="w-7 h-7 rounded-lg bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <Calendar className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="date"
                          value={contrat.debut}
                          onChange={e => setContrat({ ...contrat, debut: e.target.value })}
                          className="w-full bg-transparent px-3 text-slate-700 font-bold outline-none text-xs sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* VUE 1: CARTE UNIQUE INTERACTIVE SUR-MESURE */}
                  {viewMode === "sur-mesure" ? (
                    <div className="rounded-2xl border-2 border-slate-200 shadow-md bg-white transition-all relative">
                      {/* Header de la carte : Titre et Prix en temps réel (Fixé sous le menu au scroll) */}
                      <div className="sticky top-[70px] lg:top-[116px] z-30 bg-[#153954] text-white py-2.5 px-4 md:py-3 md:px-5 flex flex-col md:flex-row md:items-center justify-between gap-2.5 md:gap-3 rounded-t-[14px] shadow-md border-b border-white/10 transition-all backdrop-blur-md">
                        <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-white/5 to-transparent pointer-events-none rounded-tr-[14px]" />
                        
                        <div className="space-y-1 z-10">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f48161] text-white text-[10px] font-black uppercase tracking-wider">
                            <Shield className="w-3 h-3" />
                            <span>Formule Unique Sur-Mesure</span>
                          </div>
                          <p className="text-xs text-cyan-200">
                            Tarif officiel garanti • Taxes FMSAR & ACAPS incluses
                          </p>
                        </div>

                        {/* Boîte Prix Live */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-2 px-3 text-right shrink-0 z-10">
                          <span className="text-[10px] uppercase tracking-wider text-cyan-200 block font-bold">
                            Prime totale ({contrat.duree.toLowerCase()})
                          </span>
                          <div className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight flex items-baseline gap-1.5 justify-end">
                            <span>{activeQuote.primeTotale.toLocaleString()}</span>
                            <span className="text-xs font-bold text-[#f48161]">DHS TTC</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 sm:p-4 space-y-3">
                        {/* 2. AVANTAGES & GARANTIES OPTIONNELS COCHABLES */}
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider">
                                Personnalisez votre couverture
                              </h4>
                              <p className="text-[11px] text-slate-500">
                                Cochez ou décochez les garanties souhaitées pour observer l'évolution de votre tarif.
                              </p>
                            </div>
                            <span className="text-[11px] font-bold text-[#f48161] hidden sm:inline">
                              Taxes et frais légaux inclus
                            </span>
                          </div>

                          <div className="space-y-2">

                            {/* OPTION 1: PERSONNES TRANSPORTÉES (PTA) */}
                            <div
                              onClick={() => !contrat.garanties.tc && !contrat.garanties.dc && handleToggleGuarantee("pta")}
                              className={`p-3 sm:p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                                contrat.garanties.tc || contrat.garanties.dc
                                  ? "border-emerald-200 bg-emerald-50/20 shadow-2xs cursor-default"
                                  : contrat.garanties.pta
                                  ? "border-[#f48161] bg-orange-50/30 shadow-xs ring-1 ring-[#f48161]/20"
                                  : "border-slate-200 bg-white hover:border-slate-300"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="pt-0.5">
                                  <input
                                    type="checkbox"
                                    checked={contrat.garanties.tc || contrat.garanties.dc || contrat.garanties.pta}
                                    disabled={contrat.garanties.tc || contrat.garanties.dc}
                                    onChange={() => {}}
                                    style={{ accentColor: '#f48161' }}
                                    className={`w-4.5 h-4.5 rounded text-[#f48161] accent-[#f48161] focus:ring-[#f48161] border-slate-300 ${contrat.garanties.tc || contrat.garanties.dc ? "cursor-default opacity-80" : "cursor-pointer"}`}
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-black text-xs sm:text-sm text-slate-800">
                                      Personnes Transportées (PTA) — Protection Conducteur & Famille
                                    </span>
                                    {(contrat.garanties.tc || contrat.garanties.dc) && (
                                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                                        Inclus dans {contrat.garanties.tc ? "Tierce Complète" : "Dommages Collision"}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] leading-snug text-slate-500 mt-0.5">
                                    Indemnisation corporelle du conducteur et des passagers en cas d'accident de la circulation (frais médicaux, invalidité, décès).
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* OPTION 2: INCENDIE, VOL & BRIS DE GLACE */}
                            <div
                              onClick={() => !contrat.garanties.tc && !contrat.garanties.dc && handleToggleGuarantee("inc_vol_bdg")}
                              className={`p-3 sm:p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                                contrat.garanties.tc || contrat.garanties.dc
                                  ? "border-emerald-200 bg-emerald-50/20 shadow-2xs cursor-default"
                                  : contrat.garanties.inc_vol_bdg
                                  ? "border-[#f48161] bg-orange-50/30 shadow-xs ring-1 ring-[#f48161]/20"
                                  : "border-slate-200 bg-white hover:border-slate-300"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="pt-0.5">
                                  <input
                                    type="checkbox"
                                    checked={contrat.garanties.tc || contrat.garanties.dc || contrat.garanties.inc_vol_bdg}
                                    disabled={contrat.garanties.tc || contrat.garanties.dc}
                                    onChange={() => {}}
                                    style={{ accentColor: '#f48161' }}
                                    className={`w-4.5 h-4.5 rounded text-[#f48161] accent-[#f48161] focus:ring-[#f48161] border-slate-300 ${contrat.garanties.tc || contrat.garanties.dc ? "cursor-default opacity-80" : "cursor-pointer"}`}
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-black text-xs sm:text-sm text-slate-800">
                                      Incendie, Vol & Bris de Glace
                                    </span>
                                    <span className="text-[9px] bg-blue-100 text-[#153954] font-bold px-2 py-0.5 rounded-full">
                                      Plafond BDG : {vehicule.plafond_bg.toLocaleString()} DH
                                    </span>
                                    {(contrat.garanties.tc || contrat.garanties.dc) && (
                                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                                        Inclus dans {contrat.garanties.tc ? "Tierce Complète" : "Dommages Collision"}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] leading-snug text-slate-500 mt-0.5">
                                    Prise en charge financière en cas de vol du véhicule, incendie, explosion ou bris de pare-brise et vitres latérales.
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* OPTION 3: DOMMAGES COLLISION (DC) */}
                            <div
                              onClick={() => !contrat.garanties.tc && handleToggleGuarantee("dc")}
                              className={`p-3 sm:p-3.5 rounded-xl border-2 transition-all ${
                                contrat.garanties.dc
                                  ? "border-[#f48161] bg-orange-50/30 shadow-xs ring-1 ring-[#f48161]/20 cursor-pointer"
                                  : contrat.garanties.tc
                                  ? "border-slate-200 bg-slate-100/70 opacity-60 cursor-not-allowed select-none"
                                  : "border-slate-200 bg-white hover:border-slate-300 cursor-pointer"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="pt-0.5">
                                  <input
                                    type="checkbox"
                                    checked={contrat.garanties.dc}
                                    disabled={contrat.garanties.tc}
                                    onChange={() => {}}
                                    style={{ accentColor: '#f48161' }}
                                    className={`w-4.5 h-4.5 rounded text-[#f48161] accent-[#f48161] focus:ring-[#f48161] border-slate-300 ${contrat.garanties.tc ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className={`font-black text-xs sm:text-sm ${contrat.garanties.tc ? "text-slate-400" : "text-slate-800"}`}>
                                      Dommages Collision (DC)
                                    </span>
                                    {contrat.garanties.tc ? (
                                      <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                                        Désactivé (Déjà couvert par Tierce Complète)
                                      </span>
                                    ) : (
                                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                                        Formule Complète (Inclut PTA, Vol, Incendie & BDG)
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] leading-snug text-slate-500 mt-0.5">
                                    Remboursement des dégâts subis par votre véhicule en cas de collision avec un tiers identifié, incluant d'office la protection passagers (PTA), le Vol, l'Incendie et le Bris de Glace.
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* OPTION 4: TIERCE COMPLÈTE (TC - TOUS RISQUES) */}
                            <div
                              onClick={() => !contrat.garanties.dc && handleToggleGuarantee("tc")}
                              className={`p-3 sm:p-3.5 rounded-xl border-2 transition-all ${
                                contrat.garanties.tc
                                  ? "border-[#153954] bg-blue-50/50 shadow-xs ring-1 ring-[#153954]/20 cursor-pointer"
                                  : contrat.garanties.dc
                                  ? "border-slate-200 bg-slate-100/70 opacity-50 cursor-not-allowed select-none"
                                  : "border-slate-200 bg-white hover:border-slate-300 cursor-pointer"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="pt-0.5">
                                  <input
                                    type="checkbox"
                                    checked={contrat.garanties.tc}
                                    disabled={contrat.garanties.dc}
                                    onChange={() => {}}
                                    style={{ accentColor: '#f48161' }}
                                    className={`w-4.5 h-4.5 rounded text-[#f48161] accent-[#f48161] focus:ring-[#f48161] border-slate-300 ${contrat.garanties.dc ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className={`font-black text-xs sm:text-sm ${contrat.garanties.dc ? "text-slate-400" : "text-[#153954]"}`}>
                                      Tierce Complète (Tous Risques - TC)
                                    </span>
                                    {contrat.garanties.dc ? (
                                      <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                                        Désactivé (Dommages Collision actif)
                                      </span>
                                    ) : (
                                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                                        Protection Maximale (Tous Risques)
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] leading-snug text-slate-500 mt-0.5">
                                    Couverture tous dégâts matériels (chocs avec/sans tiers, renversement, vandalisme) incluant d'office le Vol, l'Incendie, le Bris de Glace et la PTA.
                                  </p>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* VUE 2: COMPARATIF 3 FORMULES CLASSIQUES (START, GO, FAST) */
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 animate-in fade-in duration-300">
                      {/* FORMULE START */}
                      <div 
                        onClick={() => {
                          setContrat(prev => ({
                            ...prev,
                            formule: "Start",
                            garanties: {
                              pta: false,
                              inc_vol_bdg: false,
                              dc: false,
                              tc: false,
                              assistance_vip: false
                            }
                          }));
                        }}
                        className={`rounded-2xl overflow-hidden border-2 flex flex-col justify-between group transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-2 hover:border-[#153954] cursor-pointer ${
                          contrat.formule === "Start" 
                            ? "border-[#f48161] shadow-xl ring-2 ring-[#f48161]/30 -translate-y-1" 
                            : "border-slate-200 shadow-sm"
                        }`}
                      >
                        <div className="bg-[#153954] text-white py-2.5 px-3 text-center relative transition-colors duration-300 group-hover:bg-[#102c42]">
                          <div className="w-8 h-8 rounded-full bg-[#ffc55c] text-slate-800 flex items-center justify-center mx-auto mb-1 shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                            <Car className="w-4 h-4 text-[#153954]" />
                          </div>
                          <h3 className="text-lg font-black uppercase tracking-wider leading-none">Start</h3>
                          <p className="text-[11px] text-cyan-200 mt-0.5">L'essentiel pour rouler en règle</p>
                        </div>

                        <div className="p-4 flex-1 bg-white space-y-2 text-xs">
                          <div className="flex items-center gap-2 font-medium text-slate-700">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Responsabilité civile</span>
                          </div>
                          <div className="flex items-center gap-2 font-medium text-slate-700">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Défense et Recours</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <X className="w-4 h-4 text-red-400 shrink-0" />
                            <span className="line-through">Personnes transportées</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <X className="w-4 h-4 text-red-400 shrink-0" />
                            <span className="line-through">Protection conducteur</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <X className="w-4 h-4 text-red-400 shrink-0" />
                            <span className="line-through">Assistance 24h/24 Maroc</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <X className="w-4 h-4 text-red-400 shrink-0" />
                            <span className="line-through">Incendie, vol, inondation</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <X className="w-4 h-4 text-red-400 shrink-0" />
                            <span className="line-through">Bris de glace</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <X className="w-4 h-4 text-red-400 shrink-0" />
                            <span className="line-through">Dommages collision</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <X className="w-4 h-4 text-red-400 shrink-0" />
                            <span className="line-through">Tierce</span>
                          </div>
                        </div>

                        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                          <div className="text-2xl font-black text-slate-800 transition-transform duration-200 group-hover:scale-105">
                            {prices.Start.toLocaleString()} <span className="text-sm font-semibold text-slate-500">DHS TTC</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mb-3">{contrat.duree.toLowerCase()}</p>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setContrat(prev => ({
                                ...prev,
                                formule: "Start",
                                garanties: {
                                  pta: false,
                                  inc_vol_bdg: false,
                                  dc: false,
                                  tc: false,
                                  assistance_vip: false
                                }
                              }));
                              setStep(4);
                            }}
                            className={`w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 transform group-hover:scale-[1.02] cursor-pointer ${
                              contrat.formule === "Start"
                                ? "bg-[#153954] text-white shadow-md hover:bg-[#102c42]"
                                : "bg-white text-[#153954] border border-[#153954]/30 hover:bg-[#153954] hover:text-white hover:border-[#153954] shadow-xs"
                            }`}
                          >
                            <Check className="w-4 h-4" />
                            <span>Commander Start</span>
                          </button>
                        </div>
                      </div>

                      {/* FORMULE GO */}
                      <div 
                        onClick={() => {
                          setContrat(prev => ({
                            ...prev,
                            formule: "Go",
                            garanties: {
                              pta: true,
                              inc_vol_bdg: true,
                              dc: true,
                              tc: false,
                              assistance_vip: false
                            }
                          }));
                        }}
                        className={`rounded-2xl overflow-hidden border-2 flex flex-col justify-between relative group transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-2 hover:border-[#f48161] cursor-pointer ${
                          contrat.formule === "Go" 
                            ? "border-[#f48161] shadow-2xl ring-4 ring-[#f48161]/30 -translate-y-2" 
                            : "border-[#f48161]/60 shadow-lg"
                        }`}
                      >
                        <div className="absolute top-0 right-0 bg-[#f48161] text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-bl-md tracking-wider z-10 transition-transform duration-300 group-hover:scale-105">
                          Le plus populaire
                        </div>

                        <div className="bg-[#1d4b75] text-white py-2.5 px-3 text-center relative transition-colors duration-300 group-hover:bg-[#163b5c]">
                          <div className="w-8 h-8 rounded-full bg-[#f48161] text-white flex items-center justify-center mx-auto mb-1 shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                            <Shield className="w-4 h-4" />
                          </div>
                          <h3 className="text-lg font-black uppercase tracking-wider leading-none">Go</h3>
                          <p className="text-[11px] text-cyan-200 mt-0.5">Protection complète équilibrée</p>
                        </div>

                        <div className="p-4 flex-1 bg-white space-y-2 text-xs">
                          <div className="flex items-center gap-2 font-medium text-slate-700">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Responsabilité civile</span>
                          </div>
                          <div className="flex items-center gap-2 font-medium text-slate-700">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Défense et Recours</span>
                          </div>
                          <div className="flex items-center gap-2 font-medium text-slate-700">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Personnes transportées</span>
                          </div>
                          <div className="flex items-center gap-2 font-medium text-slate-700">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Protection conducteur</span>
                          </div>
                          <div className="flex items-center gap-2 font-medium text-slate-700">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Assistance 24h/24 Maroc</span>
                          </div>
                          <div className="flex items-center gap-2 font-medium text-slate-700">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Incendie, vol, inondation</span>
                          </div>
                          <div className="flex items-center gap-2 font-medium text-slate-700">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Bris de glace</span>
                          </div>
                          <div className="flex items-center gap-2 font-medium text-slate-700">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Dommages collision</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <X className="w-4 h-4 text-red-400 shrink-0" />
                            <span className="line-through">Tierce</span>
                          </div>
                        </div>

                        <div className="p-4 bg-orange-50/50 border-t border-orange-100 text-center">
                          <div className="text-2xl font-black text-[#f48161] transition-transform duration-200 group-hover:scale-105">
                            {prices.Go.toLocaleString()} <span className="text-sm font-semibold text-slate-600">DHS TTC</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mb-3">{contrat.duree.toLowerCase()}</p>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setContrat(prev => ({
                                ...prev,
                                formule: "Go",
                                garanties: {
                                  pta: true,
                                  inc_vol_bdg: true,
                                  dc: true,
                                  tc: false,
                                  assistance_vip: false
                                }
                              }));
                              setStep(4);
                            }}
                            className="w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white shadow-lg transition-all duration-200 transform group-hover:scale-[1.02] cursor-pointer"
                          >
                            <Check className="w-4 h-4" />
                            <span>Commander Go</span>
                          </button>
                        </div>
                      </div>

                      {/* FORMULE FAST */}
                      <div 
                        onClick={() => {
                          setContrat(prev => ({
                            ...prev,
                            formule: "Fast",
                            garanties: {
                              pta: true,
                              inc_vol_bdg: true,
                              dc: false,
                              tc: true,
                              assistance_vip: false
                            }
                          }));
                        }}
                        className={`rounded-2xl overflow-hidden border-2 flex flex-col justify-between group transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-2 hover:border-[#153954] cursor-pointer ${
                          contrat.formule === "Fast" 
                            ? "border-[#f48161] shadow-xl ring-2 ring-[#f48161]/30 -translate-y-1" 
                            : "border-slate-200 shadow-sm"
                        }`}
                      >
                        <div className="bg-[#153954] text-white py-2.5 px-3 text-center relative transition-colors duration-300 group-hover:bg-[#102c42]">
                          <div className="w-8 h-8 rounded-full bg-[#10b981] text-white flex items-center justify-center mx-auto mb-1 shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                            <Car className="w-4 h-4" />
                          </div>
                          <h3 className="text-lg font-black uppercase tracking-wider leading-none">Fast</h3>
                          <p className="text-[11px] text-cyan-200 mt-0.5">Tierce Complète Tous Risques</p>
                        </div>

                        <div className="p-4 flex-1 bg-white space-y-2 text-xs">
                          <div className="flex items-center gap-2 font-medium text-slate-700">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Responsabilité civile</span>
                          </div>
                          <div className="flex items-center gap-2 font-medium text-slate-700">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Défense et Recours</span>
                          </div>
                          <div className="flex items-center gap-2 font-medium text-slate-700">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Personnes transportées</span>
                          </div>
                          <div className="flex items-center gap-2 font-medium text-slate-700">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Protection conducteur</span>
                          </div>
                          <div className="flex items-center gap-2 font-medium text-slate-700">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Assistance 24h/24 Maroc</span>
                          </div>
                          <div className="flex items-center gap-2 font-medium text-slate-700">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Incendie, vol, inondation</span>
                          </div>
                          <div className="flex items-center gap-2 font-medium text-slate-700">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Bris de glace</span>
                          </div>
                          <div className="flex items-center gap-2 font-bold text-[#153954] bg-blue-50/70 p-1.5 rounded-lg border border-blue-100">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Tierce</span>
                          </div>
                        </div>

                        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                          <div className="text-2xl font-black text-slate-800 transition-transform duration-200 group-hover:scale-105">
                            {prices.Fast.toLocaleString()} <span className="text-sm font-semibold text-slate-500">DHS TTC</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mb-3">{contrat.duree.toLowerCase()}</p>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setContrat(prev => ({
                                ...prev,
                                formule: "Fast",
                                garanties: {
                                  pta: true,
                                  inc_vol_bdg: true,
                                  dc: false,
                                  tc: true,
                                  assistance_vip: false
                                }
                              }));
                              setStep(4);
                            }}
                            className={`w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 transform group-hover:scale-[1.02] cursor-pointer ${
                              contrat.formule === "Fast"
                                ? "bg-[#153954] text-white shadow-md hover:bg-[#102c42]"
                                : "bg-white text-[#153954] border border-[#153954]/30 hover:bg-[#153954] hover:text-white hover:border-[#153954] shadow-xs"
                            }`}
                          >
                            <Check className="w-4 h-4" />
                            <span>Commander Fast</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: OPTIONS */}
              {step === 4 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-700 mb-1">
                      Options
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Complétez votre protection avec nos formules d'assistance et services exclusifs.
                    </p>
                  </div>

                  {/* 4 Feature Badges Compact */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#f48161] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <p className="font-bold text-[11px] sm:text-xs text-slate-700 leading-tight">
                        Traitement accéléré via l'application mobile
                      </p>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#f48161] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Scale className="w-4 h-4" />
                      </div>
                      <p className="font-bold text-[11px] sm:text-xs text-slate-700 leading-tight">
                        Accompagnement juridique & administratif
                      </p>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#f48161] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Headphones className="w-4 h-4" />
                      </div>
                      <p className="font-bold text-[11px] sm:text-xs text-slate-700 leading-tight">
                        Centre de relation client H24 / 7j
                      </p>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#f48161] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Truck className="w-4 h-4" />
                      </div>
                      <p className="font-bold text-[11px] sm:text-xs text-slate-700 leading-tight">
                        Livraison de votre attestation à domicile
                      </p>
                    </div>
                  </div>

                  {/* Assistance Extension Cards */}
                  <div>
                    <h3 className="font-bold text-base text-slate-800 mb-3">
                      Formules d'assistance :
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Formule 0 : Sans formule d'assistance supplémentaire (0 DHS) */}
                      <label className={`p-3 rounded-xl border-2 cursor-pointer flex flex-col justify-between transition ${
                        contrat.assistance === 0 ? "border-[#f48161] bg-orange-50/20 shadow-sm ring-2 ring-[#f48161]/20" : "border-slate-200 bg-white hover:border-slate-300"
                      }`}>
                        <div>
                          <div className="flex items-center justify-between mb-2 border-b border-slate-100 pb-1.5">
                            <span className="text-base font-black text-[#153954]">Sans assistance : 0 DHS</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Par défaut</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-slate-50/80 p-2 rounded-lg">
                              <span className="font-bold text-slate-600 uppercase text-[10px] block mb-1">Accident</span>
                              <p className="text-[11px] text-slate-500 leading-tight">Remorquage : <strong className="text-slate-400">Non inclus</strong></p>
                              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Véhicule : <strong className="text-slate-400">0 jour</strong></p>
                            </div>
                            <div className="bg-slate-50/80 p-2 rounded-lg">
                              <span className="font-bold text-slate-600 uppercase text-[10px] block mb-1">Panne</span>
                              <p className="text-[11px] text-slate-500 leading-tight">Remorquage : <strong className="text-slate-400">Non inclus</strong></p>
                              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Véhicule : <strong className="text-slate-400">Non inclus</strong></p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#f48161]">Choisir cette formule</span>
                          <input
                            type="radio"
                            name="assistance"
                            checked={contrat.assistance === 0}
                            onChange={() => setContrat({ ...contrat, assistance: 0 })}
                            className="text-[#f48161] focus:ring-[#f48161]"
                          />
                        </div>
                      </label>

                      {/* F1 : 85 DHS */}
                      <label className={`p-3 rounded-xl border-2 cursor-pointer flex flex-col justify-between transition ${
                        contrat.assistance === 85 ? "border-[#f48161] bg-orange-50/20 shadow-sm ring-2 ring-[#f48161]/20" : "border-slate-200 bg-white hover:border-slate-300"
                      }`}>
                        <div>
                          <div className="flex items-center justify-between mb-2 border-b border-slate-100 pb-1.5">
                            <span className="text-base font-black text-[#153954]">F1 : 85 DHS</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Formule 1</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-slate-50/80 p-2 rounded-lg">
                              <span className="font-bold text-[#f48161] uppercase text-[10px] block mb-1">Accident</span>
                              <p className="text-[11px] text-slate-500 leading-tight">Remorquage : <strong className="text-slate-800">Illimité</strong></p>
                              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Véhicule : <strong className="text-slate-800">5 jours</strong></p>
                            </div>
                            <div className="bg-slate-50/80 p-2 rounded-lg">
                              <span className="font-bold text-slate-600 uppercase text-[10px] block mb-1">Panne</span>
                              <p className="text-[11px] text-slate-500 leading-tight">Remorquage : <strong className="text-slate-800">2 fois/an</strong></p>
                              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Véhicule : <strong className="text-slate-400">Non inclus</strong></p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#f48161]">Choisir cette formule</span>
                          <input
                            type="radio"
                            name="assistance"
                            checked={contrat.assistance === 85}
                            onChange={() => setContrat({ ...contrat, assistance: 85 })}
                            className="text-[#f48161] focus:ring-[#f48161]"
                          />
                        </div>
                      </label>

                      {/* F2 : 135 DHS */}
                      <label className={`p-3 rounded-xl border-2 cursor-pointer flex flex-col justify-between transition ${
                        contrat.assistance === 135 ? "border-[#f48161] bg-orange-50/20 shadow-sm ring-2 ring-[#f48161]/20" : "border-slate-200 bg-white hover:border-slate-300"
                      }`}>
                        <div>
                          <div className="flex items-center justify-between mb-2 border-b border-slate-100 pb-1.5">
                            <span className="text-base font-black text-[#153954]">F2 : 135 DHS</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-[#f48161]">Formule 2</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-slate-50/80 p-2 rounded-lg">
                              <span className="font-bold text-[#f48161] uppercase text-[10px] block mb-1">Accident</span>
                              <p className="text-[11px] text-slate-500 leading-tight">Remorquage : <strong className="text-slate-800">Illimité</strong></p>
                              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Véhicule : <strong className="text-slate-800">10 jours</strong></p>
                            </div>
                            <div className="bg-slate-50/80 p-2 rounded-lg">
                              <span className="font-bold text-slate-600 uppercase text-[10px] block mb-1">Panne</span>
                              <p className="text-[11px] text-slate-500 leading-tight">Remorquage : <strong className="text-slate-800">3 fois/an</strong></p>
                              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Véhicule : <strong className="text-emerald-700">3 jours</strong></p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#f48161]">Choisir cette formule</span>
                          <input
                            type="radio"
                            name="assistance"
                            checked={contrat.assistance === 135}
                            onChange={() => setContrat({ ...contrat, assistance: 135 })}
                            className="text-[#f48161] focus:ring-[#f48161]"
                          />
                        </div>
                      </label>

                      {/* F3 : 250 DHS */}
                      <label className={`p-3 rounded-xl border-2 cursor-pointer flex flex-col justify-between transition ${
                        contrat.assistance === 250 ? "border-[#f48161] bg-orange-50/20 shadow-sm ring-2 ring-[#f48161]/20" : "border-slate-200 bg-white hover:border-slate-300"
                      }`}>
                        <div>
                          <div className="flex items-center justify-between mb-2 border-b border-slate-100 pb-1.5">
                            <span className="text-base font-black text-[#153954]">F3: 250 DHS</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Formule VIP</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-slate-50/80 p-2 rounded-lg">
                              <span className="font-bold text-[#f48161] uppercase text-[10px] block mb-1">Accident</span>
                              <p className="text-[11px] text-slate-500 leading-tight">Remorquage : <strong className="text-slate-800">Illimité</strong></p>
                              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Véhicule : <strong className="text-slate-800">15 jours</strong></p>
                            </div>
                            <div className="bg-slate-50/80 p-2 rounded-lg">
                              <span className="font-bold text-slate-600 uppercase text-[10px] block mb-1">Panne</span>
                              <p className="text-[11px] text-slate-500 leading-tight">Remorquage : <strong className="text-slate-800">Illimité</strong></p>
                              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Véhicule : <strong className="text-emerald-700">5 jours</strong></p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#f48161]">Choisir cette formule</span>
                          <input
                            type="radio"
                            name="assistance"
                            checked={contrat.assistance === 250}
                            onChange={() => setContrat({ ...contrat, assistance: 250 })}
                            className="text-[#f48161] focus:ring-[#f48161]"
                          />
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Servicing Options Radio */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <h3 className="font-bold text-sm text-slate-800">
                      Option Service Premium Digiassur (Conciergerie automobile) :
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Option 1: +660 DHS */}
                      <div
                        onClick={() => setContrat({ ...contrat, servicing: contrat.servicing === 660 ? 0 : 660 })}
                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition flex items-start gap-3 ${
                          contrat.servicing === 660
                            ? "border-[#f48161] bg-orange-50/20 shadow-sm ring-2 ring-[#f48161]/20"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={contrat.servicing === 660}
                          onChange={() => {}}
                          className="mt-0.5 w-5 h-5 rounded text-[#f48161] focus:ring-[#f48161] border-slate-300 cursor-pointer shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-sm text-slate-800">
                              +660 DHS — Sans service des mines
                            </span>
                            {contrat.servicing === 660 && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-[#f48161] shrink-0">
                                Sélectionné
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            Prise en charge des formalités, convoyage du véhicule en cas de réparation et assistance personnalisée.
                          </p>
                        </div>
                      </div>

                      {/* Option 2: +840 DHS */}
                      <div
                        onClick={() => setContrat({ ...contrat, servicing: contrat.servicing === 840 ? 0 : 840 })}
                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition flex items-start gap-3 ${
                          contrat.servicing === 840
                            ? "border-[#f48161] bg-orange-50/20 shadow-sm ring-2 ring-[#f48161]/20"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={contrat.servicing === 840}
                          onChange={() => {}}
                          className="mt-0.5 w-5 h-5 rounded text-[#f48161] focus:ring-[#f48161] border-slate-300 cursor-pointer shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-sm text-slate-800">
                              +840 DHS — VIP avec service des mines
                            </span>
                            {contrat.servicing === 840 && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-[#f48161] shrink-0">
                                Sélectionné
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            Visite technique accompagnée, changement de carte grise, conciergerie administrative totale.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Carte Verte Option */}
                  <div className={`p-3.5 rounded-xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    contrat.carte_verte === 500
                      ? "border-emerald-500 bg-emerald-50/20 shadow-sm ring-2 ring-emerald-500/20"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition ${
                        contrat.carte_verte === 500
                          ? "bg-emerald-600 text-white shadow-2xs"
                          : "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
                      }`}>
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-800">
                            Assurance à l'étranger (Carte Verte)
                          </h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            contrat.carte_verte === 500
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-600"
                          }`}>
                            Espagne, France & Europe
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Attestation officielle pour circuler en toute légalité et sérénité hors du territoire marocain.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => setContrat({ ...contrat, carte_verte: 0 })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                          contrat.carte_verte === 0
                            ? "bg-white text-slate-800 shadow-2xs ring-1 ring-slate-200"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${contrat.carte_verte === 0 ? "bg-[#f48161]" : "bg-transparent border border-slate-300"}`} />
                        <span>Non</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setContrat({ ...contrat, carte_verte: 500 })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          contrat.carte_verte === 500
                            ? "bg-emerald-600 text-white shadow-2xs"
                            : "text-slate-700 hover:text-slate-900"
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${contrat.carte_verte === 500 ? "bg-white" : "bg-transparent border border-slate-400"}`} />
                        <span>Oui</span>
                        <span className={contrat.carte_verte === 500 ? "text-emerald-100" : "text-emerald-700 font-black"}>
                          (+500 DHS)
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: FÉLICITATIONS & CONFIRMATION */}
              {step === 5 && (
                <div className="space-y-6 text-center animate-in fade-in duration-300">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black uppercase text-[#153954]">
                    Félicitations, votre devis est prêt !
                  </h2>

                  <div className="max-w-2xl mx-auto text-slate-600 text-sm md:text-base leading-relaxed space-y-2">
                    <p>
                      Votre devis Digiassur <strong>N° DA-{Math.floor(100000 + Math.random() * 900000)}</strong> a été généré avec succès.
                    </p>
                    <p>
                      Une copie détaillée a été envoyée à l'adresse <strong>{prospect.email || "votre adresse email"}</strong> et nos conseillers vont vous joindre au <strong>{prospect.telephone || "votre numéro"}</strong>.
                    </p>
                    <p className="text-xs text-slate-400">
                      Afin d'accélérer l'émission immédiate de votre attestation d'assurance, vous pouvez nous transmettre vos pièces justificatives dès maintenant.
                    </p>
                  </div>

                  {/* Documents Upload Section (Toujours ouvert) */}
                  <div className="pt-4 text-left">
                    <div className="mb-4 text-center sm:text-left">
                      <h3 className="text-base font-bold text-slate-800 flex items-center justify-center sm:justify-start gap-2">
                        <Upload className="w-4 h-4 text-[#f48161]" />
                        <span>Documents requis pour l'émission de votre attestation</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Joignez vos pièces justificatives dès maintenant pour valider votre dossier dans les plus brefs délais.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                      {/* CIN */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <h4 className="font-bold text-sm text-[#153954] mb-3 flex items-center gap-2">
                          <User className="w-4 h-4 text-[#f48161]" />
                          <span>Carte d'Identité (CIN)</span>
                        </h4>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 mb-1">CIN RECTO</label>
                            <label className="border border-dashed border-slate-300 rounded-lg p-2.5 flex items-center justify-between cursor-pointer hover:bg-white text-xs">
                              <span className="truncate max-w-[140px] text-slate-600">
                                {uploadedFiles.cin_recto || "Parcourir le fichier..."}
                              </span>
                              <input type="file" className="hidden" onChange={e => handleFileUpload("cin_recto", e)} />
                              <Upload className="w-4 h-4 text-[#f48161]" />
                            </label>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 mb-1">CIN VERSO</label>
                            <label className="border border-dashed border-slate-300 rounded-lg p-2.5 flex items-center justify-between cursor-pointer hover:bg-white text-xs">
                              <span className="truncate max-w-[140px] text-slate-600">
                                {uploadedFiles.cin_verso || "Parcourir le fichier..."}
                              </span>
                              <input type="file" className="hidden" onChange={e => handleFileUpload("cin_verso", e)} />
                              <Upload className="w-4 h-4 text-[#f48161]" />
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Carte Grise */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <h4 className="font-bold text-sm text-[#153954] mb-3 flex items-center gap-2">
                          <Car className="w-4 h-4 text-[#f48161]" />
                          <span>Carte Grise du véhicule</span>
                        </h4>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 mb-1">CARTE GRISE RECTO</label>
                            <label className="border border-dashed border-slate-300 rounded-lg p-2.5 flex items-center justify-between cursor-pointer hover:bg-white text-xs">
                              <span className="truncate max-w-[140px] text-slate-600">
                                {uploadedFiles.cg_recto || "Parcourir le fichier..."}
                              </span>
                              <input type="file" className="hidden" onChange={e => handleFileUpload("cg_recto", e)} />
                              <Upload className="w-4 h-4 text-[#f48161]" />
                            </label>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 mb-1">CARTE GRISE VERSO</label>
                            <label className="border border-dashed border-slate-300 rounded-lg p-2.5 flex items-center justify-between cursor-pointer hover:bg-white text-xs">
                              <span className="truncate max-w-[140px] text-slate-600">
                                {uploadedFiles.cg_verso || "Parcourir le fichier..."}
                              </span>
                              <input type="file" className="hidden" onChange={e => handleFileUpload("cg_verso", e)} />
                              <Upload className="w-4 h-4 text-[#f48161]" />
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Permis de Conduire */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <h4 className="font-bold text-sm text-[#153954] mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#f48161]" />
                          <span>Permis de conduire</span>
                        </h4>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 mb-1">PERMIS RECTO</label>
                            <label className="border border-dashed border-slate-300 rounded-lg p-2.5 flex items-center justify-between cursor-pointer hover:bg-white text-xs">
                              <span className="truncate max-w-[140px] text-slate-600">
                                {uploadedFiles.permis_recto || "Parcourir le fichier..."}
                              </span>
                              <input type="file" className="hidden" onChange={e => handleFileUpload("permis_recto", e)} />
                              <Upload className="w-4 h-4 text-[#f48161]" />
                            </label>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 mb-1">PERMIS VERSO</label>
                            <label className="border border-dashed border-slate-300 rounded-lg p-2.5 flex items-center justify-between cursor-pointer hover:bg-white text-xs">
                              <span className="truncate max-w-[140px] text-slate-600">
                                {uploadedFiles.permis_verso || "Parcourir le fichier..."}
                              </span>
                              <input type="file" className="hidden" onChange={e => handleFileUpload("permis_verso", e)} />
                              <Upload className="w-4 h-4 text-[#f48161]" />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions finalisées (Space Between) */}
                  <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
                    <Link
                      href="/auto"
                      className="px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 shadow-sm inline-flex items-center gap-2 transition cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Retour à la page Auto</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        const fileCount = Object.keys(uploadedFiles).length;
                        if (fileCount === 0) {
                          alert("Veuillez sélectionner au moins un document avant d'envoyer.");
                        } else {
                          alert(`${fileCount} document(s) transmis avec succès à nos équipes Digiassur.`);
                        }
                      }}
                      className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#f48161] hover:bg-[#e46e4e] text-white shadow-lg inline-flex items-center gap-2 transition transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Envoyer mes documents</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Wizard Navigation Buttons (Strict Space Between) */}
              {step < lastStep && (
                <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                  {/* Left Side: Réinitialiser (Step 1) ou Précédent (Steps 2 à 4) */}
                  <div>
                    {step === 1 ? (
                      <button
                        type="button"
                        onClick={resetAllData}
                        className="px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 inline-flex items-center gap-2 cursor-pointer transition shadow-2xs"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Réinitialiser les champs</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-[#4b7f9c] hover:bg-[#3d6880] text-white shadow-md inline-flex items-center gap-2 cursor-pointer transition"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Précédent</span>
                      </button>
                    )}
                  </div>

                  {/* Right Side: Suivant */}
                  <div>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#f48161] hover:bg-[#e46e4e] text-white shadow-lg inline-flex items-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5"
                    >
                      <span>{step === 3 ? "Valider mon offre" : "Suivant"}</span>
                      {step === 3 ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Summary Sidebar (Matching digiassur.ma) */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-[#f5cbbe]/30 rounded-2xl p-4 border border-[#f5cbbe] sticky top-32 shadow-sm">
                
                {/* Header Icon */}
                <div className="w-14 h-14 rounded-full bg-[#153954] text-white flex items-center justify-center mx-auto -mt-10 shadow-md border-4 border-white mb-3">
                  <Phone className="w-6 h-6 text-[#f48161]" />
                </div>

                {/* Assistance Box */}
                <div className="text-center mb-6 border-b border-orange-200/60 pb-4">
                  <p className="text-xs uppercase font-extrabold text-slate-500 tracking-wider">Besoin d'aide ?</p>
                  <a
                    href="tel:0522368182"
                    className="text-lg md:text-xl font-black text-[#153954] hover:text-[#f48161] transition"
                  >
                    05 22 36 81 82
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Conseiller disponible du Lun au Ven 9h-18h</p>
                </div>

                {/* Realtime Summary Data */}
                {step === 1 ? (
                  <div className="text-xs text-slate-600 leading-relaxed space-y-3">
                    <div className="p-3 bg-white/70 rounded-xl border border-orange-100">
                      <p className="font-bold text-[#153954] mb-1">Protection CNDP (Loi 09-08)</p>
                      <p>
                        Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification et d'opposition au traitement de vos données personnelles.
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">Autorisation CNDP N° : A-GC-232/2023</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-xs">
                    {/* Section Assuré */}
                    <div className="bg-white/80 rounded-xl p-3.5 shadow-2xs border border-orange-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-[#153954] uppercase text-[11px] tracking-wider">Assuré</span>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-[#f48161] hover:underline flex items-center gap-1 font-bold text-[10px]"
                        >
                          <Pencil className="w-3 h-3" />
                          <span>Modifier</span>
                        </button>
                      </div>
                      <p className="text-slate-700"><strong>Nom :</strong> {prospect.nom || "—"} {prospect.prenom}</p>
                      <p className="text-slate-700"><strong>Tél :</strong> {prospect.telephone || "—"}</p>
                      <p className="text-slate-700 truncate"><strong>Email :</strong> {prospect.email || "—"}</p>
                    </div>

                    {/* Section Véhicule */}
                    <div className="bg-white/80 rounded-xl p-3.5 shadow-2xs border border-orange-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-[#153954] uppercase text-[11px] tracking-wider">Véhicule</span>
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="text-[#f48161] hover:underline flex items-center gap-1 font-bold text-[10px]"
                        >
                          <Pencil className="w-3 h-3" />
                          <span>Modifier</span>
                        </button>
                      </div>
                      <p className="text-slate-700"><strong>Véhicule :</strong> {vehicule.marque} {vehicule.modele}</p>
                      <p className="text-slate-700 flex items-center gap-1.5 flex-wrap">
                        <strong>Immatriculation :</strong>{" "}
                        <span dir="ltr" className="inline-flex items-center gap-1 font-bold text-slate-800">
                          <span>{immNum}</span>
                          <span className="text-slate-400">|</span>
                          <bdi>{immCode}</bdi>
                          <span className="text-slate-400">|</span>
                          <span>{immChiffre}</span>
                        </span>
                      </p>
                      <p className="text-slate-700"><strong>Carburant :</strong> {vehicule.energie}</p>
                      <p className="text-slate-700"><strong>Valeur à neuf :</strong> {vehicule.van.toLocaleString()} DH</p>
                      <p className="text-slate-700"><strong>Valeur vénale :</strong> <span className="text-[#153954] font-bold">{estimatedValeurVenale.toLocaleString()} DH</span></p>
                      <p className="text-slate-700"><strong>Bonus / Malus :</strong> CRM {vehicule.crm.toFixed(2)}</p>
                      <p className="text-slate-700"><strong>Plafond Bris de glace :</strong> {vehicule.plafond_bg.toLocaleString()} DH</p>
                    </div>

                    {/* Section Contrat */}
                    <div className="bg-white/80 rounded-xl p-3.5 shadow-2xs border border-orange-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-[#153954] uppercase text-[11px] tracking-wider">Contrat & Tarifs</span>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="text-[#f48161] hover:underline flex items-center gap-1 font-bold text-[10px]"
                        >
                          <Pencil className="w-3 h-3" />
                          <span>Modifier</span>
                        </button>
                      </div>
                      <p className="text-slate-700"><strong>Formule :</strong> <span className="font-black text-[#f48161]">{contrat.formule}</span></p>
                      <p className="text-slate-700"><strong>Durée :</strong> {contrat.duree}</p>
                      
                      {/* Badges des garanties incluses et choisies */}
                      <div className="mt-2 mb-2">
                        <p className="text-[11px] font-bold text-slate-600 mb-1">Garanties activées :</p>
                        <div className="flex flex-wrap gap-1">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                            RC Obligatoire
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                            Défense & Recours
                          </span>
                          {(contrat.garanties.pta || contrat.garanties.dc || contrat.garanties.tc) && (
                            <span className="px-2 py-0.5 rounded bg-orange-100 text-[#f48161] text-[10px] font-bold border border-orange-200">
                              + PTA
                            </span>
                          )}
                          {(contrat.garanties.inc_vol_bdg || contrat.garanties.dc || contrat.garanties.tc) && (
                            <span className="px-2 py-0.5 rounded bg-orange-100 text-[#f48161] text-[10px] font-bold border border-orange-200">
                              + Incendie/Vol/BDG
                            </span>
                          )}
                          {contrat.garanties.dc && (
                            <span className="px-2 py-0.5 rounded bg-orange-100 text-[#f48161] text-[10px] font-bold border border-orange-200">
                              + Collision (DC)
                            </span>
                          )}
                          {contrat.garanties.tc && (
                            <span className="px-2 py-0.5 rounded bg-blue-100 text-[#153954] text-[10px] font-bold border border-blue-200">
                              + Tous Risques (TC)
                            </span>
                          )}
                          {contrat.garanties.assistance_vip && (
                            <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold border border-purple-200">
                              + Assistance VIP
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-slate-700"><strong>Prime auto :</strong> {activeFormulaPrice.toLocaleString()} DH</p>
                      {contrat.assistance > 0 && (
                        <p className="text-slate-700"><strong>Assistance étendue :</strong> {contrat.assistance} DH</p>
                      )}
                      {contrat.carte_verte > 0 && (
                        <p className="text-slate-700"><strong>Carte Verte (Europe) :</strong> {contrat.carte_verte} DH</p>
                      )}
                      {contrat.servicing > 0 && (
                        <p className="text-slate-700"><strong>Service VIP Conciergerie :</strong> {contrat.servicing} DH</p>
                      )}

                      {/* Total Box */}
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <p className="text-[11px] uppercase font-bold text-slate-500">Prime totale TTC :</p>
                        <p className="text-xl font-black text-[#153954]">
                          {Number(totalPrime).toLocaleString()} <span className="text-xs font-semibold">DHS</span>
                        </p>
                      </div>

                      {/* Accordéon détail officiel du calcul et taxes */}
                      <div className="mt-2.5 pt-2.5 border-t border-slate-200">
                        <button
                          type="button"
                          onClick={() => setShowTaxDetails(!showTaxDetails)}
                          className="w-full flex items-center justify-between text-[11px] font-bold text-[#153954] hover:text-[#f48161] transition"
                        >
                          <span>Détail calcul & taxes officielles</span>
                          <span className="text-[9px]">{showTaxDetails ? "▲ Fermer" : "▼ Voir"}</span>
                        </button>

                        {showTaxDetails && activeBreakdown && (
                          <div className="mt-2 p-2.5 bg-slate-50 rounded-lg text-[10px] space-y-1.5 border border-slate-200 text-slate-600 animate-in fade-in duration-200">
                            <div className="flex justify-between">
                              <span>Prime RC nette :</span>
                              <span className="font-bold text-slate-800">{activeBreakdown.rcNette.toLocaleString()} DH</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Garanties annexes (GA) :</span>
                              <span className="font-bold text-slate-800">{activeBreakdown.gaNette.toLocaleString()} DH</span>
                            </div>
                            <div className="border-t border-dashed border-slate-200 my-1 pt-1 space-y-1 text-slate-500">
                              <div className="flex justify-between">
                                <span>• Taxe RC (16.5%) :</span>
                                <span>{activeBreakdown.taxeRc.toFixed(2)} DH</span>
                              </div>
                              <div className="flex justify-between">
                                <span>• Taxe GA (15%) :</span>
                                <span>{activeBreakdown.taxeGa.toFixed(2)} DH</span>
                              </div>
                              <div className="flex justify-between">
                                <span>• Fonds Catastrophes (EVCAT) :</span>
                                <span>{activeBreakdown.evcat.toFixed(2)} DH</span>
                              </div>
                              <div className="flex justify-between">
                                <span>• Taxe CNPAC (NARSA) :</span>
                                <span>{activeBreakdown.cnpac} DH</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section (AXA, Allianz, Sanlam, RMA, Assurwi, AtlantaSanad) */}
        <PartnersSection />
      </main>

      <DigiassurFooter />
    </div>
  );
}
