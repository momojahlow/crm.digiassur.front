import { useState, useMemo } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import { CAR_BRANDS, MOROCCAN_PREFECTURES, ARABIC_LETTERS } from "@/data/carBrands";
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
  Clock, 
  FileCheck, 
  Smartphone, 
  Scale, 
  Headphones, 
  Truck, 
  CreditCard, 
  HeartHandshake, 
  Wrench,
  Pencil
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
  plafond_bg: number;
  custom_plafond_bg: string;
}

interface ContratState {
  duree: "Annuelle" | "Semestrielle" | "Trimestrielle";
  debut: string;
  formule: "Start" | "Go" | "Fast";
  pta: boolean;
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
    plafond_bg: 5000,
    custom_plafond_bg: ""
  });

  // Plate Segments
  const [immNum, setImmNum] = useState<string>("12345");
  const [immCode, setImmCode] = useState<string>("أ");
  const [immChiffre, setImmChiffre] = useState<string>("6");

  // Step 3 & 4: Contrat
  const [contrat, setContrat] = useState<ContratState>({
    duree: "Annuelle",
    debut: new Date().toISOString().split("T")[0],
    formule: "Go",
    pta: false,
    servicing: 0,
    assistance: 85,
    carte_verte: 0
  });

  // Step 5: Document toggles & uploads
  const [showDocuments, setShowDocuments] = useState<boolean>(false);
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

  // Calcul officiel de la Responsabilité Civile (RC) de base
  const calculateRc = (energie: string, pf: number) => {
    if (energie === "Diesel") {
      if (pf <= 4) return 1840;
      if (pf === 5) return 2238;
      if (pf === 6 || pf === 7) return 2429;
      return 3490;
    } else {
      if (pf <= 6) return 1840;
      if (pf === 7 || pf === 8) return 2238;
      if (pf === 9 || pf === 10) return 2429;
      return 3490;
    }
  };

  // Calcul officiel devis provisoire
  // RC et DR (Défense et Recours) sont TOUJOURS inclus par défaut sur toutes les formules (DR = 0)
  // PTA = 200 DH si inclus (inclus par défaut sur Go & Fast, optionnel sur Start)
  const calcDevisProvisoire = (duree: string, rcBase: number, includePta: boolean = false) => {
    let RC = rcBase;
    const DR = 0; // Inclus par défaut sur toute
    const PTA = includePta ? 200 : 0;
    let GA = DR + PTA;

    const d = duree.toLowerCase();
    if (d.includes("semestri")) {
      RC = RC * 0.54;
      GA = GA * 0.54;
    } else if (d.includes("trimestri")) {
      RC = RC * 0.27;
      GA = GA * 0.27;
    }

    const Taxe_RC = (RC * 16.5) / 100;
    const Taxe_GA = (GA * 15) / 100;
    const EVCAT = ((RC * 4.5) / 100) + ((GA * 2.5) / 100);
    const CNPAC = 17;
    return Number((RC + Taxe_RC + GA + Taxe_GA + EVCAT + CNPAC).toFixed(2));
  };

  // Pricing Calculation Engine
  const prices = useMemo(() => {
    const cv = Number(vehicule.p_fiscale) || 6;
    const van = Number(vehicule.van) || 150000;

    // 1. Calcul RC de base selon énergie et puissance fiscale
    const baseRc = calculateRc(vehicule.energie, cv);

    // 2. Formule Start : RC + DR incluses par défaut. PTA selon contrat.pta
    const primeStart = calcDevisProvisoire(contrat.duree, baseRc, contrat.pta);
    const primeStartAnnual = calcDevisProvisoire("Annuelle", baseRc, contrat.pta);

    // Ratio durée
    let durationMultiplier = 1;
    if (contrat.duree === "Semestrielle") durationMultiplier = 0.54;
    if (contrat.duree === "Trimestrielle") durationMultiplier = 0.27;

    // 3. Formules Go & Fast : RC, DR ET PTA (200 DH) incluses par défaut !
    const baseGoFastAnnual = calcDevisProvisoire("Annuelle", baseRc, true);
    const bgAdd = (Number(vehicule.plafond_bg) || 5000) * 0.05;
    const volIncendie = (van * 0.012);
    const primeGoAnnual = Math.round(baseGoFastAnnual + volIncendie + bgAdd + 850);

    const tierce = (van * 0.024);
    const primeFastAnnual = Math.round(primeGoAnnual + tierce);

    const go = Math.round(primeGoAnnual * durationMultiplier);
    const fast = Math.round(primeFastAnnual * durationMultiplier);

    return {
      Start: primeStart,
      Go: go,
      Fast: fast,
      annual: {
        Start: primeStartAnnual,
        Go: primeGoAnnual,
        Fast: primeFastAnnual
      }
    };
  }, [vehicule.p_fiscale, vehicule.energie, vehicule.van, vehicule.plafond_bg, contrat.duree, contrat.pta]);

  // Selected formula base premium
  const activeFormulaPrice = prices[contrat.formule] || prices.Go;

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
      formule: "Go",
      servicing: 0,
      assistance: 85,
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
        <section className="bg-slate-50 border-b border-slate-200 py-6 px-4">
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
        <section className="py-10 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Main Form Container */}
            <div className="flex-1 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">

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
                        <div className="flex-1 bg-slate-100 rounded-full p-1.5 flex items-center shadow-inner">
                          <div className="w-8 h-8 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                            N°
                          </div>
                          <input
                            type="number"
                            placeholder="12345"
                            value={immNum}
                            onChange={e => setImmNum(e.target.value)}
                            className="w-full bg-transparent px-3 text-slate-700 outline-none text-sm font-bold text-center"
                          />
                        </div>

                        {/* Lettre arabe */}
                        <div className="w-20 bg-slate-100 rounded-full p-1.5 flex items-center shadow-inner">
                          <select
                            value={immCode}
                            onChange={e => setImmCode(e.target.value)}
                            className="w-full bg-transparent text-center font-bold text-slate-700 outline-none text-base cursor-pointer"
                          >
                            {ARABIC_LETTERS.map(lettre => (
                              <option key={lettre} value={lettre}>{lettre}</option>
                            ))}
                          </select>
                        </div>

                        {/* Préfecture chiffre */}
                        <div className="w-24 bg-slate-100 rounded-full p-1.5 flex items-center shadow-inner">
                          <select
                            value={immChiffre}
                            onChange={e => setImmChiffre(e.target.value)}
                            className="w-full bg-transparent text-center font-bold text-slate-700 outline-none text-sm cursor-pointer"
                          >
                            {MOROCCAN_PREFECTURES.map(pref => (
                              <option key={pref.code} value={pref.code}>{pref.code}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 pl-2 mt-1">Ex: 12345 | أ | 6 (Casablanca Anfa)</p>
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

              {/* STEP 3: COMPARATEUR FORMULES & TARIFS */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-700 mb-1">
                      Choisissez la formule adaptée à vos besoins
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Tarifs indicatifs calculés pour votre {vehicule.marque} {vehicule.modele} ({vehicule.p_fiscale} CV {vehicule.energie}).
                    </p>
                  </div>

                  {/* Top Filters: Durée & Prise d'effet */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1 pl-2">
                        Durée du contrat *
                      </label>
                      <div className="bg-white rounded-full p-1.5 flex items-center border border-slate-200">
                        <div className="w-8 h-8 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4" />
                        </div>
                        <select
                          value={contrat.duree}
                          onChange={e => setContrat({ ...contrat, duree: e.target.value as any })}
                          className="w-full bg-transparent px-3 text-slate-700 font-bold outline-none text-sm cursor-pointer"
                        >
                          <option value="Annuelle">Annuelle (1 an — Meilleur tarif)</option>
                          <option value="Semestrielle">Semestrielle (6 mois)</option>
                          <option value="Trimestrielle">Trimestrielle (3 mois)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1 pl-2">
                        Date de prise d'effet souhaitée *
                      </label>
                      <div className="bg-white rounded-full p-1.5 flex items-center border border-slate-200">
                        <div className="w-8 h-8 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <input
                          type="date"
                          value={contrat.debut}
                          onChange={e => setContrat({ ...contrat, debut: e.target.value })}
                          className="w-full bg-transparent px-3 text-slate-700 font-bold outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3 Formula Comparison Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">

                    {/* FORMULE START */}
                    <div className={`rounded-2xl overflow-hidden border-2 flex flex-col justify-between transition-all duration-300 ${
                      contrat.formule === "Start" 
                        ? "border-[#f48161] shadow-xl ring-2 ring-[#f48161]/30 transform -translate-y-1" 
                        : "border-slate-200 hover:border-slate-300 shadow-sm"
                    }`}>
                      <div className="bg-[#153954] text-white p-5 text-center relative">
                        <div className="w-12 h-12 rounded-full bg-[#ffc55c] text-slate-800 flex items-center justify-center mx-auto mb-2 shadow-md">
                          <Car className="w-6 h-6 text-[#153954]" />
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-wider">Start</h3>
                        <p className="text-xs text-cyan-200">L'essentiel pour rouler en règle</p>
                      </div>

                      <div className="p-5 flex-1 bg-white space-y-2.5 text-xs">
                        <div className="flex items-center gap-2 font-medium text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Responsabilité Civile (Obligatoire)</span>
                        </div>
                        <div className="flex items-center gap-2 font-medium text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Défense et Recours</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <X className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="line-through">Personnes transportées (PTA)</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <X className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="line-through">Protection conducteur</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <X className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="line-through">Incendie & Explosion</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <X className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="line-through">Vol du véhicule</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <X className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="line-through">Bris de glace</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <X className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="line-through">Inondations & Cat. Naturelles</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <X className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="line-through">Dommages Collision</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <X className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="line-through">Tierce complète Tous Risques</span>
                        </div>
                      </div>

                      <div className="p-5 bg-slate-50 border-t border-slate-100 text-center">
                        <div className="text-2xl font-black text-slate-800">
                          {prices.Start.toLocaleString()} <span className="text-sm font-semibold text-slate-500">DHS TTC</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-3">{contrat.duree.toLowerCase()}</p>

                        <button
                          type="button"
                          onClick={() => {
                            setContrat({ ...contrat, formule: "Start" });
                            setStep(4);
                          }}
                          className={`w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition ${
                            contrat.formule === "Start"
                              ? "bg-[#153954] text-white shadow-md"
                              : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          <Check className="w-4 h-4" />
                          <span>Commander Start</span>
                        </button>
                      </div>
                    </div>

                    {/* FORMULE GO (LE PLUS CHOISI) */}
                    <div className={`rounded-2xl overflow-hidden border-2 flex flex-col justify-between relative transition-all duration-300 ${
                      contrat.formule === "Go" 
                        ? "border-[#f48161] shadow-2xl ring-4 ring-[#f48161]/30 transform -translate-y-2" 
                        : "border-[#f48161]/60 shadow-lg"
                    }`}>
                      <div className="absolute top-0 right-0 bg-[#f48161] text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-lg tracking-wider z-10">
                        Le plus populaire
                      </div>

                      <div className="bg-[#1d4b75] text-white p-5 text-center relative">
                        <div className="w-12 h-12 rounded-full bg-[#f48161] text-white flex items-center justify-center mx-auto mb-2 shadow-md">
                          <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-wider">Go</h3>
                        <p className="text-xs text-cyan-200">Protection complète équilibrée</p>
                      </div>

                      <div className="p-5 flex-1 bg-white space-y-2.5 text-xs">
                        <div className="flex items-center gap-2 font-medium text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Responsabilité Civile</span>
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
                          <span className="font-bold text-slate-800">Incendie & Explosion</span>
                        </div>
                        <div className="flex items-center gap-2 font-medium text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="font-bold text-slate-800">Vol du véhicule</span>
                        </div>
                        <div className="flex items-center gap-2 font-medium text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="font-bold text-slate-800">Bris de glace ({vehicule.plafond_bg.toLocaleString()} DH)</span>
                        </div>
                        <div className="flex items-center gap-2 font-medium text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Inondations & Risques climatiques</span>
                        </div>
                        <div className="flex items-center gap-2 font-medium text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Dommages Collision</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <X className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="line-through">Tierce complète Tous Risques</span>
                        </div>
                      </div>

                      <div className="p-5 bg-orange-50/50 border-t border-orange-100 text-center">
                        <div className="text-2xl font-black text-[#f48161]">
                          {prices.Go.toLocaleString()} <span className="text-sm font-semibold text-slate-600">DHS TTC</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-3">{contrat.duree.toLowerCase()}</p>

                        <button
                          type="button"
                          onClick={() => {
                            setContrat({ ...contrat, formule: "Go" });
                            setStep(4);
                          }}
                          className="w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white shadow-lg transition"
                        >
                          <Check className="w-4 h-4" />
                          <span>Commander Go</span>
                        </button>
                      </div>
                    </div>

                    {/* FORMULE FAST (TOUS RISQUES) */}
                    <div className={`rounded-2xl overflow-hidden border-2 flex flex-col justify-between transition-all duration-300 ${
                      contrat.formule === "Fast" 
                        ? "border-[#f48161] shadow-xl ring-2 ring-[#f48161]/30 transform -translate-y-1" 
                        : "border-slate-200 hover:border-slate-300 shadow-sm"
                    }`}>
                      <div className="bg-[#153954] text-white p-5 text-center relative">
                        <div className="w-12 h-12 rounded-full bg-[#f48161] text-white flex items-center justify-center mx-auto mb-2 shadow-md">
                          <Car className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-wider">Fast</h3>
                        <p className="text-xs text-cyan-200">Tierce Complète Tous Risques</p>
                      </div>

                      <div className="p-5 flex-1 bg-white space-y-2.5 text-xs">
                        <div className="flex items-center gap-2 font-medium text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Toutes les garanties de la formule Go</span>
                        </div>
                        <div className="flex items-center gap-2 font-medium text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Responsabilité Civile & Défense</span>
                        </div>
                        <div className="flex items-center gap-2 font-medium text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Protection conducteur & passagers</span>
                        </div>
                        <div className="flex items-center gap-2 font-medium text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Vol, Incendie, Bris de glace</span>
                        </div>
                        <div className="flex items-center gap-2 font-medium text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Inondations & Phénomènes météo</span>
                        </div>
                        <div className="flex items-center gap-2 font-medium text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Dommages collision tous tiers</span>
                        </div>
                        <div className="flex items-center gap-2 font-bold text-[#153954] bg-blue-50 p-2 rounded-lg">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>TIERCE INTÉGRALE TOUS RISQUES</span>
                        </div>
                        <p className="text-[11px] text-slate-500 pl-6 italic">
                          Indemnisation même en cas de choc sans tiers ou responsabilité totale.
                        </p>
                      </div>

                      <div className="p-5 bg-slate-50 border-t border-slate-100 text-center">
                        <div className="text-2xl font-black text-slate-800">
                          {prices.Fast.toLocaleString()} <span className="text-sm font-semibold text-slate-500">DHS TTC</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-3">{contrat.duree.toLowerCase()}</p>

                        <button
                          type="button"
                          onClick={() => {
                            setContrat({ ...contrat, formule: "Fast" });
                            setStep(4);
                          }}
                          className={`w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition ${
                            contrat.formule === "Fast"
                              ? "bg-[#153954] text-white shadow-md"
                              : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          <Check className="w-4 h-4" />
                          <span>Commander Fast</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* STEP 4: OPTIONS & SERVICES PREMIUM */}
              {step === 4 && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-700 mb-2">
                      Avec Digiassur, bénéficiez d'un service premium
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Personnalisez vos options d'assistance routière et services exclusifs à domicile.
                    </p>
                  </div>

                  {/* 4 Feature Badges */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-[#f48161] text-white flex items-center justify-center mb-2 shadow-sm">
                        <Smartphone className="w-7 h-7" />
                      </div>
                      <p className="font-bold text-xs text-slate-700">Traitement accéléré via l'application mobile</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-[#f48161] text-white flex items-center justify-center mb-2 shadow-sm">
                        <Scale className="w-7 h-7" />
                      </div>
                      <p className="font-bold text-xs text-slate-700">Accompagnement juridique & administratif</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-[#f48161] text-white flex items-center justify-center mb-2 shadow-sm">
                        <Headphones className="w-7 h-7" />
                      </div>
                      <p className="font-bold text-xs text-slate-700">Centre de relation client H24 / 7j</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-[#f48161] text-white flex items-center justify-center mb-2 shadow-sm">
                        <Truck className="w-7 h-7" />
                      </div>
                      <p className="font-bold text-xs text-slate-700">Livraison de votre attestation à domicile</p>
                    </div>
                  </div>

                  {/* Servicing Options Radio */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                    <h3 className="font-bold text-sm text-slate-800">
                      Option Service Premium Digiassur (Conciergerie automobile) :
                    </h3>

                    <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-[#f48161]">
                      <input
                        type="radio"
                        name="servicing"
                        checked={contrat.servicing === 0}
                        onChange={() => setContrat({ ...contrat, servicing: 0 })}
                        className="mt-1 text-[#f48161] focus:ring-[#f48161]"
                      />
                      <div>
                        <span className="font-bold text-sm text-slate-800">0 DHS — Formule standard</span>
                        <p className="text-xs text-slate-500">Je ne souhaite pas bénéficier de ce service premium.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-[#f48161]">
                      <input
                        type="radio"
                        name="servicing"
                        checked={contrat.servicing === 660}
                        onChange={() => setContrat({ ...contrat, servicing: 660 })}
                        className="mt-1 text-[#f48161] focus:ring-[#f48161]"
                      />
                      <div>
                        <span className="font-bold text-sm text-slate-800">+660 DHS — Service Premium sans service des mines</span>
                        <p className="text-xs text-slate-500">Prise en charge des formalités, convoyage du véhicule en cas de réparation et assistance personnalisée.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-[#f48161]">
                      <input
                        type="radio"
                        name="servicing"
                        checked={contrat.servicing === 840}
                        onChange={() => setContrat({ ...contrat, servicing: 840 })}
                        className="mt-1 text-[#f48161] focus:ring-[#f48161]"
                      />
                      <div>
                        <span className="font-bold text-sm text-slate-800">+840 DHS — Service Premium VIP avec accompagnement au service des mines</span>
                        <p className="text-xs text-slate-500">Visite technique accompagnée, changement de carte grise, conciergerie administrative totale.</p>
                      </div>
                    </label>
                  </div>

                  {/* Assistance Extension Cards */}
                  <div>
                    <h3 className="font-bold text-base text-slate-800 mb-3">
                      Souhaitez-vous souscrire une extension de votre formule d'assistance ?
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* 85 DHS */}
                      <label className={`p-5 rounded-2xl border-2 cursor-pointer flex flex-col justify-between transition ${
                        contrat.assistance === 85 ? "border-[#f48161] bg-orange-50/20 shadow-md" : "border-slate-200 bg-white"
                      }`}>
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-2xl font-black text-[#153954]">85 DHS</span>
                            <input
                              type="radio"
                              name="assistance"
                              checked={contrat.assistance === 85}
                              onChange={() => setContrat({ ...contrat, assistance: 85 })}
                              className="text-[#f48161] focus:ring-[#f48161]"
                            />
                          </div>
                          <div className="space-y-2 text-xs text-slate-700">
                            <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">En cas d'accident :</p>
                            <p>• Remorquage garage au choix : <strong>Illimité</strong></p>
                            <p>• Véhicule de remplacement : <strong>5 jours</strong></p>
                            <p className="font-bold text-slate-900 border-b border-slate-100 pt-2 pb-1">En cas de panne :</p>
                            <p>• Remorquage : <strong>2 fois / an</strong></p>
                            <p>• Véhicule remplacement : <strong>0 jour</strong></p>
                          </div>
                        </div>
                      </label>

                      {/* 135 DHS */}
                      <label className={`p-5 rounded-2xl border-2 cursor-pointer flex flex-col justify-between transition ${
                        contrat.assistance === 135 ? "border-[#f48161] bg-orange-50/20 shadow-md" : "border-slate-200 bg-white"
                      }`}>
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-2xl font-black text-[#153954]">135 DHS</span>
                            <input
                              type="radio"
                              name="assistance"
                              checked={contrat.assistance === 135}
                              onChange={() => setContrat({ ...contrat, assistance: 135 })}
                              className="text-[#f48161] focus:ring-[#f48161]"
                            />
                          </div>
                          <div className="space-y-2 text-xs text-slate-700">
                            <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">En cas d'accident :</p>
                            <p>• Remorquage garage au choix : <strong>Illimité</strong></p>
                            <p>• Véhicule de remplacement : <strong>10 jours</strong></p>
                            <p className="font-bold text-slate-900 border-b border-slate-100 pt-2 pb-1">En cas de panne :</p>
                            <p>• Remorquage : <strong>3 fois / an</strong></p>
                            <p>• Véhicule remplacement : <strong>3 jours</strong></p>
                          </div>
                        </div>
                      </label>

                      {/* 150 DHS */}
                      <label className={`p-5 rounded-2xl border-2 cursor-pointer flex flex-col justify-between transition ${
                        contrat.assistance === 150 ? "border-[#f48161] bg-orange-50/20 shadow-md" : "border-slate-200 bg-white"
                      }`}>
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-2xl font-black text-[#f48161]">150 DHS</span>
                            <input
                              type="radio"
                              name="assistance"
                              checked={contrat.assistance === 150}
                              onChange={() => setContrat({ ...contrat, assistance: 150 })}
                              className="text-[#f48161] focus:ring-[#f48161]"
                            />
                          </div>
                          <div className="space-y-2 text-xs text-slate-700">
                            <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">En cas d'accident :</p>
                            <p>• Remorquage garage au choix : <strong>Illimité</strong></p>
                            <p>• Véhicule de remplacement : <strong>15 jours</strong></p>
                            <p className="font-bold text-slate-900 border-b border-slate-100 pt-2 pb-1">En cas de panne :</p>
                            <p>• Remorquage : <strong>Illimité</strong></p>
                            <p>• Véhicule remplacement : <strong>5 jours</strong></p>
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="mt-3">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-500">
                        <input
                          type="radio"
                          name="assistance"
                          checked={contrat.assistance === 0}
                          onChange={() => setContrat({ ...contrat, assistance: 0 })}
                          className="text-[#f48161] focus:ring-[#f48161]"
                        />
                        <span>Je ne souhaite pas bénéficier d'une formule d'assistance étendue (Assistance de base conservée).</span>
                      </label>
                    </div>
                  </div>

                  {/* Carte Verte Option */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">
                        Souhaitez-vous assurer votre véhicule à l'étranger (Carte Verte) ?
                      </h4>
                      <p className="text-xs text-slate-500">Couverture en Espagne, France et Europe continentale.</p>
                    </div>

                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-sm text-slate-700">
                        <input
                          type="radio"
                          name="carte_verte"
                          checked={contrat.carte_verte === 500}
                          onChange={() => setContrat({ ...contrat, carte_verte: 500 })}
                          className="text-[#f48161] focus:ring-[#f48161]"
                        />
                        <span>Oui (+500 DH)</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer font-bold text-sm text-slate-700">
                        <input
                          type="radio"
                          name="carte_verte"
                          checked={contrat.carte_verte === 0}
                          onChange={() => setContrat({ ...contrat, carte_verte: 0 })}
                          className="text-[#f48161] focus:ring-[#f48161]"
                        />
                        <span>Non (0 DH)</span>
                      </label>
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

                  {/* Toggle documents button */}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setShowDocuments(!showDocuments)}
                      className={`px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition ${
                        showDocuments ? "bg-red-500 hover:bg-red-600 text-white" : "bg-[#153954] hover:bg-[#1d4b75] text-white shadow-md"
                      }`}
                    >
                      {showDocuments ? <X className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
                      <span>{showDocuments ? "Fermer les documents requis" : "Afficher et joindre les documents requis"}</span>
                    </button>
                  </div>

                  {/* Documents Upload Section */}
                  {showDocuments && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left animate-in slide-in-from-top-4 duration-300">
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
                  )}

                  <div className="pt-6 flex flex-wrap justify-center gap-4">
                    <Link
                      href="/auto"
                      className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#f48161] hover:bg-[#e46e4e] text-white shadow-lg inline-flex items-center gap-2 transition"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Retour à la page Auto</span>
                    </Link>

                    <Link
                      href="/"
                      className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#153954] hover:bg-[#1d4b75] text-white shadow-md inline-flex items-center gap-2 transition"
                    >
                      <span>Accueil Digiassur</span>
                    </Link>
                  </div>
                </div>
              )}

              {/* Bottom Wizard Navigation Buttons */}
              <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                {step > 1 && step < lastStep ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-[#4b7f9c] hover:bg-[#3d6880] text-white shadow-md inline-flex items-center gap-2 cursor-pointer transition"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Précédent</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex gap-3">
                  {(step === 1 || step === lastStep) && (
                    <button
                      type="button"
                      onClick={resetAllData}
                      className="px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-slate-200 hover:bg-slate-300 text-slate-700 inline-flex items-center gap-2 cursor-pointer transition"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span className="hidden sm:inline">Réinitialiser</span>
                    </button>
                  )}

                  {step < lastStep && step !== 3 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#f48161] hover:bg-[#e46e4e] text-white shadow-lg inline-flex items-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5"
                    >
                      <span>Suivant</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Summary Sidebar (Matching digiassur.ma) */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-[#f5cbbe]/30 rounded-2xl p-6 border border-[#f5cbbe] sticky top-28 shadow-sm">
                
                {/* Header Icon */}
                <div className="w-14 h-14 rounded-full bg-[#153954] text-white flex items-center justify-center mx-auto -mt-12 shadow-md border-4 border-white mb-4">
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
                      <p className="text-slate-700"><strong>Carburant :</strong> {vehicule.energie}</p>
                      <p className="text-slate-700"><strong>Puissance :</strong> {vehicule.p_fiscale} CV</p>
                      <p className="text-slate-700"><strong>Valeur à neuf :</strong> {vehicule.van.toLocaleString()} DH</p>
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
                      <p className="text-slate-700"><strong>Prime formule :</strong> {activeFormulaPrice.toLocaleString()} DH</p>
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
