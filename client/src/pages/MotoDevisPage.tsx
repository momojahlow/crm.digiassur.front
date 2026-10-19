import { useState, useMemo } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import { MOTO_BRANDS, MOROCCAN_CITIES } from "@/data/motoBrands";
import { MOROCCAN_PREFECTURES, MOROCCAN_SERIES_LETTERS, MOROCCAN_PLATE_NUMBERS } from "@/data/carBrands";
import { 
  User, 
  Bike, 
  FileText, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Upload, 
  Check, 
  Phone, 
  Mail, 
  Calendar, 
  Gauge, 
  Clock, 
  Pencil, 
  MapPin, 
  ShieldCheck, 
  FileCheck,
  Send,
  HelpCircle
} from "lucide-react";
import { Link } from "wouter";

// Barème officiel ACAPS des 5 catégories Moto
// La puissance fiscale (1 à 5) est un code technique interne pour correspondre aux catégories réelles
export const MOTO_CATEGORIES = [
  {
    puissance_fiscale: 1,
    label: "Vélomoteurs <= 50 cm3 et <= 60 Km/h",
    shortLabel: "Vélomoteurs <= 50 cm³ et <= 60 Km/h",
    rcBase: 602,
    description: "Cyclomoteurs urbains standards, mobylettes"
  },
  {
    puissance_fiscale: 2,
    label: "Vélomoteurs <= 50 cm3 et > 60 Km/h",
    shortLabel: "Vélomoteurs <= 50 cm³ et > 60 Km/h",
    rcBase: 1217,
    description: "Scooters 50cc débridés ou rapides"
  },
  {
    puissance_fiscale: 3,
    label: "Vélo à 2 Roues ac Cylindrée entre 50 et 125 cm3",
    shortLabel: "Vélo à 2 Roues ac Cylindrée entre 50 et 125 cm³",
    rcBase: 1581,
    description: "SH 125, PCX 125, NMAX 125, Symphony 125"
  },
  {
    puissance_fiscale: 4,
    label: "Vélo à 2 Roues ac Cylindrée >= 125 cm3",
    shortLabel: "Vélo à 2 Roues ac Cylindrée >= 125 cm³",
    rcBase: 2216,
    description: "Grosses cylindrées, TMAX, X-ADV, Z900, GS 1250"
  },
  {
    puissance_fiscale: 5,
    label: "Vélo à 3 Roues ac Cylindrée > 125 cm3",
    shortLabel: "Vélo à 3 Roues ac Cylindrée > 125 cm³",
    rcBase: 1883,
    description: "Tricycles motorisés, Piaggio MP3, Trikes"
  }
];

interface MotoProspectState {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  ville: string;
  cgu: boolean;
}

interface MotoVehicleState {
  marque: string;
  modele: string;
  puissance_fiscale: number;
  date_debut: string;
  date_mec: string;
  vitesse: string;
  van: number;
}

export default function MotoDevisPage() {
  const [step, setStep] = useState<number>(1);
  const lastStep = 4;

  // Step 1: Assuré
  const [prospect, setProspect] = useState<MotoProspectState>({
    nom: "Koulouch",
    prenom: "Youssef",
    email: "youssefkoulouch@gmail.com",
    telephone: "+212 675 289 966",
    ville: "Casablanca",
    cgu: true
  });

  // Step 2: Moto
  const [moto, setMoto] = useState<MotoVehicleState>({
    marque: "Honda",
    modele: "SH 125",
    puissance_fiscale: 3, // Défaut : 50-125 cm3 (RC = 1581)
    date_debut: new Date().toISOString().split("T")[0],
    date_mec: "2021-07-11",
    vitesse: "120 Km/h",
    van: 45000
  });

  // Moroccan Plate
  const [immNum, setImmNum] = useState<string>("1234");
  const [immCode, setImmCode] = useState<string>("د");
  const [immPref, setImmPref] = useState<string>("23");

  // Step 3: Durée
  const [duree, setDuree] = useState<"1 an*" | "6 mois" | "3 mois">("1 an*");

  // Accordéon détail des taxes
  const [showTaxDetails, setShowTaxDetails] = useState<boolean>(false);

  // Step 4: Documents Uploads
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({});

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Current brand models
  const currentBrandModels = useMemo(() => {
    const brand = MOTO_BRANDS.find(b => b.nom.toLowerCase() === moto.marque.toLowerCase());
    return brand ? brand.modeles : ["Modèle standard"];
  }, [moto.marque]);

  // Selected Category details
  const selectedCategory = useMemo(() => {
    return MOTO_CATEGORIES.find(c => c.puissance_fiscale === moto.puissance_fiscale) || MOTO_CATEGORIES[2];
  }, [moto.puissance_fiscale]);

  // Pricing Engine officiel Moto (ACAPS / FMSAR)
  const pricingBreakdown = useMemo(() => {
    const rcAnnuelle = selectedCategory.rcBase;

    let ratio = 1.0;
    if (duree === "6 mois") ratio = 0.54;
    if (duree === "3 mois") ratio = 0.27;

    const rcNette = Math.round(rcAnnuelle * ratio * 100) / 100;
    const taxeRc = Math.round(rcNette * 0.165 * 100) / 100;
    const evcat = Math.round(rcNette * 0.045 * 100) / 100;
    const cnpac = 17.00;
    const totalTtc = Math.round((rcNette + taxeRc + evcat + cnpac) * 100) / 100;

    return {
      category: selectedCategory,
      rcAnnuelle,
      ratio,
      rcNette,
      taxeRc,
      evcat,
      cnpac,
      totalTtc
    };
  }, [selectedCategory, duree]);

  // Validation
  const validateStep = (s: number): boolean => {
    const err: Record<string, string> = {};
    if (s === 1) {
      if (!prospect.nom.trim()) err.nom = "Nom requis";
      if (!prospect.prenom.trim()) err.prenom = "Prénom requis";
      if (!prospect.email.trim() || !prospect.email.includes("@")) err.email = "Email invalide";
      if (!prospect.telephone.trim()) err.telephone = "Téléphone requis";
      if (!prospect.cgu) err.cgu = "Veuillez accepter les conditions";
    }
    if (s === 2) {
      if (!moto.marque) err.marque = "Marque requise";
      if (!moto.modele) err.modele = "Modèle requis";
      if (!moto.van || moto.van <= 0) err.van = "Valeur à neuf requise";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, lastStep));
      window.scrollTo({ top: 280, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 280, behavior: "smooth" });
  };

  const handleReset = () => {
    if (step === 1) {
      setProspect({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        ville: "Casablanca",
        cgu: true
      });
    } else if (step === 2) {
      setMoto({
        marque: "Honda",
        modele: "SH 125",
        puissance_fiscale: 3,
        date_debut: new Date().toISOString().split("T")[0],
        date_mec: "2021-07-11",
        vitesse: "120 Km/h",
        van: 45000
      });
      setImmNum("1234");
      setImmCode("د");
      setImmPref("23");
    }
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

  const handleSubmitDocuments = () => {
    const fileCount = Object.keys(uploadedFiles).length;
    if (fileCount === 0) {
      alert("Veuillez sélectionner au moins un document avant d'envoyer.");
    } else {
      alert(`Merci ! Vos ${fileCount} document(s) ont été transmis à l'équipe Digiassur.`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#f48161] selection:text-white overflow-x-hidden">
      <DigiassurHeader />
      <FloatingWidgets />

      <main className="flex-1 pt-[116px]">
        {/* Banner with Biker Image and Center Moto Emblem */}
        <section 
          className="relative overflow-hidden bg-cover bg-center h-[200px]" 
          style={{ backgroundImage: "url('/images/banner-moto-couple.png')" }}
        >
          <div className="absolute inset-0 bg-[#005475]/50 flex flex-col items-center justify-center text-center px-4">
            <div className="w-[84px] h-[84px] rounded-full bg-[#fde4dd] flex items-center justify-center shadow-lg mb-3 border-4 border-white/70">
              <img src="/images/moto-icon.svg" alt="Moto" className="w-11 h-11 object-contain" />
            </div>
            <h1 className="uppercase text-2xl md:text-3xl font-extrabold text-white tracking-wider">
              Obtenir mon tarif MOTO
            </h1>
          </div>
        </section>

        {/* 4-Step Stepper Header */}
        <section className="bg-white border-b border-slate-200 py-6 px-4">
          <div className="max-w-4xl mx-auto relative">
            <div className="hidden md:block absolute top-[26px] left-[70px] right-[70px] h-0.5 bg-slate-200 -z-0" />

            <div className="grid grid-cols-4 gap-2 relative z-10">
              {/* Step 1 */}
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white border-4 border-white shadow-md transition-all ${
                  step === 1 ? "bg-[#f48161] ring-4 ring-[#f48161]/20 scale-105" : step > 1 ? "bg-[#4d7f9a]" : "bg-slate-200"
                }`}>
                  <User className="w-6 h-6" />
                </div>
                <span className={`mt-2 text-xs md:text-sm uppercase font-bold tracking-tight ${
                  step === 1 ? "text-[#f48161]" : "text-slate-600"
                }`}>
                  ASSURÉ
                </span>
              </button>

              {/* Step 2 */}
              <button 
                type="button" 
                onClick={() => { if (validateStep(1)) setStep(2); }}
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white border-4 border-white shadow-md transition-all ${
                  step === 2 ? "bg-[#f48161] ring-4 ring-[#f48161]/20 scale-105" : step > 2 ? "bg-[#4d7f9a]" : "bg-slate-200"
                }`}>
                  <Bike className="w-6 h-6" />
                </div>
                <span className={`mt-2 text-xs md:text-sm uppercase font-bold tracking-tight ${
                  step === 2 ? "text-[#f48161]" : "text-slate-600"
                }`}>
                  MOTO
                </span>
              </button>

              {/* Step 3 */}
              <button 
                type="button" 
                onClick={() => { if (validateStep(1) && validateStep(2)) setStep(3); }}
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white border-4 border-white shadow-md transition-all ${
                  step === 3 ? "bg-[#f48161] ring-4 ring-[#f48161]/20 scale-105" : step > 3 ? "bg-[#4d7f9a]" : "bg-slate-200"
                }`}>
                  <FileText className="w-6 h-6" />
                </div>
                <span className={`mt-2 text-xs md:text-sm uppercase font-bold tracking-tight ${
                  step === 3 ? "text-[#f48161]" : "text-slate-600"
                }`}>
                  FORMULE
                </span>
              </button>

              {/* Step 4 */}
              <button 
                type="button" 
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white border-4 border-white shadow-md transition-all ${
                  step === 4 ? "bg-[#f48161] ring-4 ring-[#f48161]/20 scale-105" : "bg-slate-200"
                }`}>
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className={`mt-2 text-xs md:text-sm uppercase font-bold tracking-tight ${
                  step === 4 ? "text-[#f48161]" : "text-slate-600"
                }`}>
                  CONFIRMATION
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Content Area + Right Sidebar */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Main Form Container */}
            <div className="flex-1 w-full bg-white">
              
              {/* ========================================================
                  STEP 1: ASSURÉ
                 ======================================================== */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                    Renseignez vos coordonnées personnelles :
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nom */}
                    <div>
                      <div className="bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner">
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
                      <div className="bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner">
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

                    {/* Email */}
                    <div>
                      <div className="bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner">
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

                    {/* Téléphone */}
                    <div>
                      <div className="bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <Phone className="w-5 h-5" />
                        </div>
                        <input
                          type="tel"
                          placeholder="Téléphone *"
                          value={prospect.telephone}
                          onChange={e => setProspect({ ...prospect, telephone: e.target.value })}
                          className="w-full bg-transparent px-4 text-slate-700 outline-none text-sm font-medium"
                        />
                      </div>
                      {errors.telephone && <p className="text-red-500 text-xs mt-1 pl-4">{errors.telephone}</p>}
                    </div>

                    {/* Ville */}
                    <div className="md:col-span-2">
                      <div className="bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <select
                          value={prospect.ville}
                          onChange={e => setProspect({ ...prospect, ville: e.target.value })}
                          className="w-full bg-transparent px-4 text-slate-700 outline-none text-sm font-medium cursor-pointer"
                        >
                          {MOROCCAN_CITIES.map((c, idx) => (
                            <option key={idx} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* CGU Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer text-sm text-slate-600">
                      <input
                        type="checkbox"
                        checked={prospect.cgu}
                        onChange={e => setProspect({ ...prospect, cgu: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded text-[#f48161] focus:ring-[#f48161] border-slate-300"
                      />
                      <span>
                        j'ai lu et j'accepte les{" "}
                        <Link href="/mentions-legales" className="font-bold text-[#153954] underline hover:text-[#f48161]">
                          conditions générales d'utilisation
                        </Link>{" "}
                        notamment la mention relative à la protection des données personnelles.
                      </span>
                    </label>
                    {errors.cgu && <p className="text-red-500 text-xs mt-1 pl-7">{errors.cgu}</p>}
                  </div>
                </div>
              )}

              {/* ========================================================
                  STEP 2: MOTO (5 Catégories officielles + Modèle + Plaque)
                 ======================================================== */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                    Renseignez les informations concernant votre Moto :
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Marque */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1 pl-2">
                        Marque de la moto *
                      </label>
                      <div className="bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <Bike className="w-5 h-5" />
                        </div>
                        <select
                          value={moto.marque}
                          onChange={e => {
                            const newBrand = e.target.value;
                            const found = MOTO_BRANDS.find(b => b.nom === newBrand);
                            const firstModel = found && found.modeles.length > 0 ? found.modeles[0] : "";
                            setMoto({ ...moto, marque: newBrand, modele: firstModel });
                          }}
                          className="w-full bg-transparent px-4 text-slate-700 outline-none text-sm font-semibold cursor-pointer"
                        >
                          {MOTO_BRANDS.map(b => (
                            <option key={b.id} value={b.nom}>{b.nom}</option>
                          ))}
                        </select>
                      </div>
                      {errors.marque && <p className="text-red-500 text-xs mt-1 pl-4">{errors.marque}</p>}
                    </div>

                    {/* Modèle */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1 pl-2">
                        Modèle *
                      </label>
                      <div className="bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <Bike className="w-5 h-5" />
                        </div>
                        <select
                          value={moto.modele}
                          onChange={e => setMoto({ ...moto, modele: e.target.value })}
                          className="w-full bg-transparent px-4 text-slate-700 outline-none text-sm font-semibold cursor-pointer"
                        >
                          {currentBrandModels.map((m, idx) => (
                            <option key={idx} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>
                      {errors.modele && <p className="text-red-500 text-xs mt-1 pl-4">{errors.modele}</p>}
                    </div>

                    {/* Catégorie de la Moto (Correspondance avec puissance_fiscale 1 à 5 en interne) */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-600 mb-1 pl-2">
                        Catégorie de la Moto *
                      </label>
                      <div className="bg-[#f3f4f6] rounded-2xl md:rounded-full p-1.5 flex items-center shadow-inner h-[52px]">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <select
                          value={moto.puissance_fiscale}
                          onChange={e => setMoto({ ...moto, puissance_fiscale: Number(e.target.value) })}
                          className="w-full bg-transparent px-4 text-slate-800 outline-none text-xs md:text-sm font-bold cursor-pointer"
                        >
                          {MOTO_CATEGORIES.map(cat => (
                            <option key={cat.puissance_fiscale} value={cat.puissance_fiscale}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 pl-3 italic">
                        {selectedCategory.description}
                      </p>
                    </div>

                    {/* Date début contrat */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1 pl-2">
                        Date de prise d'effet du contrat *
                      </label>
                      <div className="bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner h-[52px]">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <input
                          type="date"
                          value={moto.date_debut}
                          onChange={e => setMoto({ ...moto, date_debut: e.target.value })}
                          className="w-full bg-transparent px-4 text-slate-700 outline-none text-sm font-medium"
                        />
                      </div>
                    </div>

                    {/* Date mise en circulation */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1 pl-2">
                        Date de 1ère mise en circulation *
                      </label>
                      <div className="bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner h-[52px]">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <input
                          type="date"
                          value={moto.date_mec}
                          onChange={e => setMoto({ ...moto, date_mec: e.target.value })}
                          className="w-full bg-transparent px-4 text-slate-700 outline-none text-sm font-medium"
                        />
                      </div>
                    </div>

                    {/* Immatriculation marocaine complète (Même hauteur lg h-[52px]) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1 pl-2">
                        Immatriculation marocaine *
                      </label>
                      <div className="flex gap-2 items-center">
                        {/* Numéro (1 à 5 chiffres) */}
                        <div className="flex-1 bg-[#f3f4f6] rounded-full px-4 flex items-center shadow-inner h-[52px]">
                          <input
                            type="text"
                            placeholder="1234"
                            maxLength={5}
                            value={immNum}
                            onChange={e => setImmNum(e.target.value.replace(/\D/g, ""))}
                            className="w-full bg-transparent text-slate-800 outline-none text-base font-bold text-center"
                          />
                        </div>

                        {/* Lettre série bilingue */}
                        <div className="w-28 bg-[#f3f4f6] rounded-full px-2 flex items-center justify-center shadow-inner h-[52px]">
                          <select
                            value={immCode}
                            onChange={e => setImmCode(e.target.value)}
                            className="w-full bg-transparent text-center font-bold text-slate-800 outline-none text-sm cursor-pointer h-full"
                          >
                            {MOROCCAN_SERIES_LETTERS.map(l => (
                              <option key={l.ar} value={l.ar}>{l.label}</option>
                            ))}
                          </select>
                        </div>

                        {/* Code Préfecture (1 jusqu'à 99) */}
                        <div className="w-24 bg-[#f3f4f6] rounded-full px-2 flex items-center justify-center shadow-inner h-[52px]">
                          <select
                            value={immPref}
                            onChange={e => setImmPref(e.target.value)}
                            className="w-full bg-transparent text-center font-bold text-slate-800 outline-none text-sm cursor-pointer h-full"
                          >
                            {MOROCCAN_PLATE_NUMBERS.map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 pl-2 mt-1">Ex: 1234 | د | D | 23</p>
                    </div>

                    {/* Vitesse Km/h */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1 pl-2">
                        Vitesse max (Km/h)
                      </label>
                      <div className="bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <Gauge className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          placeholder="Ex: 120 Km/h"
                          value={moto.vitesse}
                          onChange={e => setMoto({ ...moto, vitesse: e.target.value })}
                          className="w-full bg-transparent px-4 text-slate-700 outline-none text-sm font-medium"
                        />
                      </div>
                    </div>

                    {/* Valeur à neuf */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-600 mb-1 pl-2">
                        Valeur à neuf déclarée (DHS) *
                      </label>
                      <div className="bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                          DH
                        </div>
                        <input
                          type="number"
                          step="1000"
                          placeholder="Valeur d'achat à neuf (ex: 45000)"
                          value={moto.van}
                          onChange={e => setMoto({ ...moto, van: Number(e.target.value) })}
                          className="w-full bg-transparent px-4 text-slate-800 outline-none text-sm font-bold"
                        />
                      </div>
                      {errors.van && <p className="text-red-500 text-xs mt-1 pl-4">{errors.van}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================
                  STEP 3: FORMULE & TARIF MOTO (RC + DR Uniquement)
                 ======================================================== */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                    Pendant combien de temps souhaitez-vous assurer votre Moto ?
                  </h2>

                  {/* Duration Selector */}
                  <div className="max-w-md">
                    <div className="bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner">
                      <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <select
                        value={duree}
                        onChange={e => setDuree(e.target.value as any)}
                        className="w-full bg-transparent px-4 text-slate-800 font-bold outline-none text-sm cursor-pointer"
                      >
                        <option value="1 an*">1 an* (Annuelle — Tarif officiel recommandé)</option>
                        <option value="6 mois">6 mois (Semestrielle — Ratio 54%)</option>
                        <option value="3 mois">3 mois (Trimestrielle — Ratio 27%)</option>
                      </select>
                    </div>
                  </div>

                  {/* Formula Card "Moto Run" (Exclusivement RC + DR 0 DH) */}
                  <div className="max-w-md mx-auto pt-4">
                    <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 relative bg-[#205680] text-white text-center">
                      
                      {/* Top Circular Emblem */}
                      <div className="pt-8 pb-4">
                        <div className="w-16 h-16 rounded-full bg-[#f48161] text-white flex items-center justify-center mx-auto shadow-md border-2 border-white">
                          <Bike className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-black mt-3 tracking-wide">
                          Moto Run
                        </h3>
                        <p className="text-xs text-orange-200 mt-1 uppercase font-semibold">
                          Formule Standard Complète ACAPS
                        </p>
                      </div>

                      {/* Guarantees List (Strictement RC + Défense & Recours 0 DH) */}
                      <div className="bg-[#174669] px-6 py-4 border-t border-white/10 space-y-2.5 text-sm font-semibold">
                        <div className="flex items-center justify-center gap-2">
                          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                          <span>Responsabilité Civile (Obligatoire)</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-cyan-100 text-xs">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Défense et Recours (Inclus 0 DH)</span>
                        </div>
                      </div>

                      {/* Price Section */}
                      <div className="bg-white text-slate-800 py-6 px-4 border-t border-slate-100">
                        <div className="text-3xl md:text-4xl font-black text-slate-900">
                          {pricingBreakdown.totalTtc.toLocaleString()} <span className="text-base font-bold text-slate-500">DHS TTC</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-500 mt-1">
                          Périodicité : {duree === "1 an*" ? "Annuelle (12 mois)" : duree}
                        </p>
                      </div>

                      {/* Commander Button */}
                      <div className="p-6 bg-[#205680]">
                        <button
                          type="button"
                          onClick={() => setStep(4)}
                          className="w-full py-3.5 px-6 rounded-full bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
                        >
                          <Check className="w-5 h-5" />
                          <span>Commander cette formule</span>
                        </button>
                      </div>
                    </div>

                    {/* Accordéon détail calcul & taxes */}
                    <div className="mt-4 bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs text-slate-600">
                      <button
                        type="button"
                        onClick={() => setShowTaxDetails(!showTaxDetails)}
                        className="w-full flex items-center justify-between font-bold text-[#153954] hover:text-[#f48161] transition"
                      >
                        <span>Détail calcul & taxes officielles</span>
                        <span className="text-[10px]">{showTaxDetails ? "▲ Masquer" : "▼ Afficher"}</span>
                      </button>

                      {showTaxDetails && (
                        <div className="mt-2.5 pt-2 border-t border-slate-200 space-y-1.5 text-[11px] animate-in fade-in duration-200">
                          <div className="flex justify-between">
                            <span>• {selectedCategory.shortLabel} :</span>
                            <span className="font-bold text-slate-800">{pricingBreakdown.rcAnnuelle} DH (Annuelle)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>• Prime RC Nette ({duree}) :</span>
                            <span className="font-bold text-slate-800">{pricingBreakdown.rcNette.toFixed(2)} DH</span>
                          </div>
                          <div className="flex justify-between">
                            <span>• Taxe RC (16.5%) :</span>
                            <span>{pricingBreakdown.taxeRc.toFixed(2)} DH</span>
                          </div>
                          <div className="flex justify-between">
                            <span>• Taxe Catastrophes EVCAT (4.5%) :</span>
                            <span>{pricingBreakdown.evcat.toFixed(2)} DH</span>
                          </div>
                          <div className="flex justify-between">
                            <span>• Forfait CNPAC (Sécurité Routière) :</span>
                            <span>{pricingBreakdown.cnpac.toFixed(2)} DH</span>
                          </div>
                          <div className="border-t border-dashed border-slate-300 pt-1.5 flex justify-between font-black text-slate-900 text-xs">
                            <span>Total TTC :</span>
                            <span className="text-[#f48161]">{pricingBreakdown.totalTtc.toFixed(2)} DHS</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================
                  STEP 4: CONFIRMATION & DOCUMENTS (Jumeau exact de l'Auto)
                 ======================================================== */}
              {step === 4 && (
                <div className="space-y-6 text-center animate-in fade-in duration-300">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black uppercase text-[#153954]">
                    Félicitations, votre devis est prêt !
                  </h2>

                  <div className="max-w-2xl mx-auto text-slate-600 text-sm md:text-base leading-relaxed space-y-2">
                    <p>
                      Votre devis Digiassur Moto <strong>N° DM-{Math.floor(100000 + Math.random() * 900000)}</strong> a été généré avec succès.
                    </p>
                    <p>
                      Une copie détaillée a été envoyée à l'adresse <strong>{prospect.email || "votre adresse email"}</strong> et nos conseillers vont vous joindre au <strong>{prospect.telephone || "votre numéro"}</strong>.
                    </p>
                    <p className="text-xs text-slate-400">
                      Afin d'accélérer l'émission immédiate de votre attestation d'assurance, vous pouvez nous transmettre vos pièces justificatives dès maintenant.
                    </p>
                  </div>

                  {/* Formulaire des documents requis (CIN, Carte Grise, Permis) toujours ouvert par défaut */}
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
                      {/* 1. CIN */}
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

                      {/* 2. CARTE GRISE */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <h4 className="font-bold text-sm text-[#153954] mb-3 flex items-center gap-2">
                          <Bike className="w-4 h-4 text-[#f48161]" />
                          <span>Carte Grise de la moto</span>
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

                      {/* 3. PERMIS DE CONDUIRE */}
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

                  {/* Actions finalisées en space-between */}
                  <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
                    <Link
                      href="/moto"
                      className="px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 shadow-sm inline-flex items-center gap-2 transition cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Retour à la page Moto</span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleSubmitDocuments}
                      className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#f48161] hover:bg-[#e46e4e] text-white shadow-lg inline-flex items-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5"
                    >
                      <Send className="w-4 h-4" />
                      <span>Envoyer mes documents</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================
                  NAVIGATION BUTTONS (Steps 1 à 3) — EN VRAI SPACE-BETWEEN
                 ======================================================== */}
              {step < lastStep && (
                <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                  
                  {/* Left Side : Réinitialiser (Step 1) ou Précédent + Réinitialiser (Step 2/3) */}
                  <div>
                    {step === 1 ? (
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-[#4b7f9c] hover:bg-[#3d6880] text-white inline-flex items-center gap-2 cursor-pointer transition shadow-sm"
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

                  {/* Right Side : Suivant */}
                  <div>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#f48161] hover:bg-[#e46e4e] text-white shadow-lg inline-flex items-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5"
                    >
                      <span>Suivant</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Summary Sidebar */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-[#fef6f3] rounded-2xl p-6 border border-[#f5cbbe] sticky top-28 shadow-sm">
                
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
                </div>

                {/* Step 1 Legal text */}
                {step === 1 ? (
                  <div className="text-xs text-slate-600 leading-relaxed space-y-3">
                    <p>
                      Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification et d'opposition au traitement de vos données personnelles.
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Ce traitement a été autorisé par la CNDP.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 text-xs">
                    {/* Section Assuré */}
                    <div className="bg-white rounded-xl p-3.5 shadow-2xs border border-orange-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-[#153954] uppercase text-[11px] tracking-wider">Informations de l'assuré</span>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="w-7 h-7 rounded-full bg-[#f48161] text-white flex items-center justify-center hover:bg-[#e46e4e] transition cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-slate-700"><strong>Nom :</strong> {prospect.nom || "—"}</p>
                      <p className="text-slate-700"><strong>Prénom :</strong> {prospect.prenom || "—"}</p>
                      <p className="text-slate-700 truncate"><strong>Email :</strong> {prospect.email || "—"}</p>
                      <p className="text-slate-700"><strong>Téléphone :</strong> {prospect.telephone || "—"}</p>
                      <p className="text-slate-700"><strong>Ville :</strong> {prospect.ville || "—"}</p>
                    </div>

                    {/* Section Moto (visible on step 2, 3 and 4) */}
                    {step >= 2 && (
                      <div className="bg-white rounded-xl p-3.5 shadow-2xs border border-orange-100">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-[#153954] uppercase text-[11px] tracking-wider">Informations de la Moto</span>
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="w-7 h-7 rounded-full bg-[#f48161] text-white flex items-center justify-center hover:bg-[#e46e4e] transition cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-slate-700"><strong>Marque :</strong> {moto.marque} {moto.modele}</p>
                        <p className="text-slate-700 line-clamp-2"><strong>Catégorie :</strong> {selectedCategory.shortLabel}</p>
                        <p className="text-slate-700"><strong>Immatriculation :</strong> {immNum} | {immCode} | {immPref}</p>
                        <p className="text-slate-700"><strong>Date d'effet :</strong> {moto.date_debut}</p>
                        <p className="text-slate-700"><strong>Mise en circulation :</strong> {moto.date_mec}</p>
                        <p className="text-slate-700"><strong>Valeur à neuf :</strong> {moto.van.toLocaleString()} DHS</p>
                      </div>
                    )}

                    {/* Section Contrat & Prime (visible on step 3 and 4) */}
                    {step >= 3 && (
                      <div className="bg-white rounded-xl p-3.5 shadow-2xs border border-orange-100">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-[#153954] uppercase text-[11px] tracking-wider">Formule & Prime</span>
                          <button
                            type="button"
                            onClick={() => setStep(3)}
                            className="w-7 h-7 rounded-full bg-[#f48161] text-white flex items-center justify-center hover:bg-[#e46e4e] transition cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-slate-700"><strong>Formule :</strong> Moto Run</p>
                        <p className="text-slate-700"><strong>Durée :</strong> {duree === "1 an*" ? "Annuelle (1 an)" : duree}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                            Responsabilité Civile
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                            Défense & Recours (0 DH)
                          </span>
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-slate-200">
                          <p className="text-[11px] uppercase font-bold text-slate-500">Prime Totale TTC :</p>
                          <p className="text-lg font-black text-[#153954]">
                            {pricingBreakdown.totalTtc.toLocaleString()} <span className="text-xs font-semibold">DHS</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <PartnersSection />
      </main>

      <DigiassurFooter />
    </div>
  );
}
