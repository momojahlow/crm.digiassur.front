import { useState, useMemo } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import { MOTO_BRANDS, MOTO_CLASSES, MOROCCAN_CITIES } from "@/data/motoBrands";
import { ARABIC_LETTERS } from "@/data/carBrands";
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
  X, 
  Phone, 
  Mail, 
  Calendar, 
  Gauge, 
  Clock, 
  Pencil, 
  MapPin, 
  ShieldCheck, 
  FileCheck 
} from "lucide-react";
import { Link } from "wouter";

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
  classe: string;
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
    classe: "D1 Sc1",
    date_debut: new Date().toISOString().split("T")[0],
    date_mec: "2021-07-11",
    vitesse: "120 Km/h",
    van: 45000
  });

  // Moroccan Plate
  const [immNum, setImmNum] = useState<string>("1234");
  const [immCode, setImmCode] = useState<string>("د");
  const [immPref, setImmPref] = useState<string>("23");

  // Step 3: Contrat
  const [duree, setDuree] = useState<"1 an*" | "6 mois" | "3 mois">("1 an*");

  // Step 4: Documents Uploads
  const [showDocuments, setShowDocuments] = useState<boolean>(true);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({});

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Current brand models
  const currentBrandModels = useMemo(() => {
    const brand = MOTO_BRANDS.find(b => b.nom.toLowerCase() === moto.marque.toLowerCase());
    return brand ? brand.modeles : ["Modèle standard"];
  }, [moto.marque]);

  // Selected Class details
  const selectedClass = useMemo(() => {
    return MOTO_CLASSES.find(c => c.code === moto.classe) || MOTO_CLASSES[0];
  }, [moto.classe]);

  // Pricing Engine
  const price = useMemo(() => {
    const base = selectedClass.basePrime;
    const vanAdd = (Number(moto.van) || 40000) * 0.015;
    const annualTotal = base + vanAdd + 350; // Taxes & assistance

    if (duree === "6 mois") return Math.round(annualTotal * 0.55);
    if (duree === "3 mois") return Math.round(annualTotal * 0.30);
    return Math.round(annualTotal);
  }, [selectedClass, moto.van, duree]);

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
    setStep(1);
    setProspect({
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      ville: "Casablanca",
      cgu: true
    });
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

        {/* 4-Step Stepper Header (Figma Desktop - 9 / 10 / 11 / 13) */}
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

        {/* Funnel Body + Sidebar */}
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Main Form Area */}
            <div className="flex-1 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">

              {/* ========================================================
                  STEP 1: ASSURÉ (Figma Desktop - 9)
                 ======================================================== */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                    Renseignez vos informations afin de recevoir votre devis:
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
                  STEP 2: MOTO (Figma Desktop - 10)
                 ======================================================== */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                    Renseignez vos informations concernant votre Moto:
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Marque */}
                    <div>
                      <div className="bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <Bike className="w-5 h-5" />
                        </div>
                        <select
                          value={moto.marque}
                          onChange={e => setMoto({ ...moto, marque: e.target.value, modele: "Modèle" })}
                          className="w-full bg-transparent px-4 text-slate-700 outline-none text-sm font-medium cursor-pointer"
                        >
                          {MOTO_BRANDS.map(b => (
                            <option key={b.id} value={b.nom}>{b.nom}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* La classe */}
                    <div>
                      <div className="bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <select
                          value={moto.classe}
                          onChange={e => setMoto({ ...moto, classe: e.target.value })}
                          className="w-full bg-transparent px-3 text-slate-700 outline-none text-xs font-semibold cursor-pointer truncate"
                        >
                          {MOTO_CLASSES.map(cl => (
                            <option key={cl.code} value={cl.code}>{cl.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Date début contrat */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1 pl-2">
                        Date de début de contrat *
                      </label>
                      <div className="bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner">
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
                        Date de mise en circulation *
                      </label>
                      <div className="bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner">
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

                    {/* Immatriculation (segmentée) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1 pl-2">
                        Immatriculation / N° Cadre *
                      </label>
                      <div className="flex gap-2 items-center">
                        <div className="flex-1 bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner">
                          <input
                            type="text"
                            placeholder="1234"
                            value={immNum}
                            onChange={e => setImmNum(e.target.value)}
                            className="w-full bg-transparent px-3 text-slate-700 outline-none text-sm font-bold text-center"
                          />
                        </div>

                        <div className="w-16 bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner">
                          <select
                            value={immCode}
                            onChange={e => setImmCode(e.target.value)}
                            className="w-full bg-transparent text-center font-bold text-slate-700 outline-none text-sm cursor-pointer"
                          >
                            {ARABIC_LETTERS.slice(0, 15).map(l => (
                              <option key={l} value={l}>{l}</option>
                            ))}
                          </select>
                        </div>

                        <div className="w-16 bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner">
                          <input
                            type="text"
                            placeholder="23"
                            value={immPref}
                            onChange={e => setImmPref(e.target.value)}
                            className="w-full bg-transparent px-2 text-slate-700 outline-none text-sm font-bold text-center"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Vitesse Km/h */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1 pl-2">
                        Vitesse Km/h
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
                        Valeur à neuf (DHS) *
                      </label>
                      <div className="bg-[#f3f4f6] rounded-full p-1.5 flex items-center shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-[#f48161] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                          DH
                        </div>
                        <input
                          type="number"
                          step="1000"
                          placeholder="Valeur à neuf (ex: 45000)"
                          value={moto.van}
                          onChange={e => setMoto({ ...moto, van: Number(e.target.value) })}
                          className="w-full bg-transparent px-4 text-slate-700 outline-none text-sm font-bold"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================
                  STEP 3: FORMULE & TARIF (Figma Desktop - 11)
                 ======================================================== */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                    Pendant combien de temps souhaitez-vous assurer votre Moto?
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
                        className="w-full bg-transparent px-4 text-slate-700 font-bold outline-none text-sm cursor-pointer"
                      >
                        <option value="1 an*">1 an* (Annuelle — Tarif le plus avantageux)</option>
                        <option value="6 mois">6 mois (Semestrielle)</option>
                        <option value="3 mois">3 mois (Trimestrielle)</option>
                      </select>
                    </div>
                  </div>

                  {/* Formula Card "Moto Run" (Figma Desktop - 11) */}
                  <div className="max-w-md mx-auto pt-6">
                    <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 relative bg-[#205680] text-white text-center">
                      
                      {/* Top Circular Emblem */}
                      <div className="pt-8 pb-4">
                        <div className="w-16 h-16 rounded-full bg-[#f48161] text-white flex items-center justify-center mx-auto shadow-md border-2 border-white">
                          <Bike className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-black mt-3 tracking-wide">
                          Moto Run
                        </h3>
                      </div>

                      {/* Guarantees List */}
                      <div className="bg-[#205680] px-6 py-4 border-t border-white/10 space-y-2 text-sm font-semibold">
                        <div className="flex items-center justify-center gap-2">
                          <Check className="w-5 h-5 text-emerald-400" />
                          <span>Responsabilité civile</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-cyan-100 text-xs">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Défense et Recours</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-cyan-100 text-xs">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Assistance remorquage 24/7</span>
                        </div>
                      </div>

                      {/* Price Section */}
                      <div className="bg-white text-slate-800 py-6 px-4">
                        <div className="text-3xl md:text-4xl font-black text-slate-900">
                          {price.toLocaleString()} <span className="text-base font-bold text-slate-500">DHS / {duree === "1 an*" ? "AN" : duree.toUpperCase()} TTC</span>
                        </div>
                      </div>

                      {/* Commander Button */}
                      <div className="p-6 bg-[#205680]">
                        <button
                          type="button"
                          onClick={() => setStep(4)}
                          className="w-full py-3.5 px-6 rounded-full bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
                        >
                          <Check className="w-5 h-5" />
                          <span>Commander</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================
                  STEP 4: CONFIRMATION & DOCUMENTS (Figma Desktop - 13)
                 ======================================================== */}
              {step === 4 && (
                <div className="space-y-6 text-center animate-in fade-in duration-300">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>

                  <h2 className="text-3xl md:text-4xl font-black uppercase text-[#153954]">
                    FÉLICITATIONS !
                  </h2>

                  <div className="max-w-xl mx-auto text-slate-600 text-sm md:text-base leading-relaxed space-y-2">
                    <p className="font-semibold text-slate-800">
                      Vous allez recevoir par email votre devis dans quelques minutes.
                    </p>
                    <p>
                      Suivez ensuite les instructions pour finaliser l’assurance de votre Moto.
                    </p>
                    <p className="text-xs text-slate-500 pt-2">
                      Afin d’accélérer le processus d’obtention d’un devis définitif, veuillez cliquer sur le bouton suivant pour nous envoyer les documents requis :
                    </p>
                  </div>

                  {/* Toggle documents button */}
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowDocuments(true)}
                      className={`px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition ${
                        showDocuments ? "bg-[#4b7f9c] text-white" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                      }`}
                    >
                      <FileCheck className="w-4 h-4" />
                      <span>Afficher les documents requis</span>
                    </button>

                    {showDocuments && (
                      <button
                        type="button"
                        onClick={() => setShowDocuments(false)}
                        className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-rose-500 hover:bg-rose-600 text-white inline-flex items-center gap-2 transition"
                      >
                        <X className="w-4 h-4" />
                        <span>Fermer</span>
                      </button>
                    )}
                  </div>

                  {/* 4 Upload Sections (CIN, CARTE GRISE, PERMIS, TITRE DE PROPRIÉTÉ) */}
                  {showDocuments && (
                    <div className="space-y-6 pt-6 text-left max-w-4xl mx-auto animate-in slide-in-from-top-4 duration-300">
                      
                      {/* 1. CIN */}
                      <div>
                        <div className="inline-flex items-center gap-2 bg-[#4b7f9c] text-white text-xs font-bold uppercase px-4 py-1.5 rounded-full mb-3">
                          <User className="w-3.5 h-3.5" />
                          <span>CIN</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-[#205680] p-4 rounded-xl text-white text-center">
                            <h5 className="font-bold text-xs uppercase mb-3">CIN recto</h5>
                            <label className="border border-dashed border-white/40 rounded-lg p-3 bg-white flex items-center justify-center gap-2 cursor-pointer hover:bg-orange-50">
                              <span className="text-xs font-bold text-[#f48161] truncate">
                                {uploadedFiles.cin_recto || "Parcourir"}
                              </span>
                              <input type="file" className="hidden" onChange={e => handleFileUpload("cin_recto", e)} />
                              <Upload className="w-4 h-4 text-[#f48161]" />
                            </label>
                          </div>

                          <div className="bg-[#205680] p-4 rounded-xl text-white text-center">
                            <h5 className="font-bold text-xs uppercase mb-3">CIN verso</h5>
                            <label className="border border-dashed border-white/40 rounded-lg p-3 bg-white flex items-center justify-center gap-2 cursor-pointer hover:bg-orange-50">
                              <span className="text-xs font-bold text-[#f48161] truncate">
                                {uploadedFiles.cin_verso || "Parcourir"}
                              </span>
                              <input type="file" className="hidden" onChange={e => handleFileUpload("cin_verso", e)} />
                              <Upload className="w-4 h-4 text-[#f48161]" />
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* 2. CARTE GRISE */}
                      <div>
                        <div className="inline-flex items-center gap-2 bg-[#4b7f9c] text-white text-xs font-bold uppercase px-4 py-1.5 rounded-full mb-3">
                          <Bike className="w-3.5 h-3.5" />
                          <span>CARTE GRISE</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-[#205680] p-4 rounded-xl text-white text-center">
                            <h5 className="font-bold text-xs uppercase mb-3">Carte grise recto</h5>
                            <label className="border border-dashed border-white/40 rounded-lg p-3 bg-white flex items-center justify-center gap-2 cursor-pointer hover:bg-orange-50">
                              <span className="text-xs font-bold text-[#f48161] truncate">
                                {uploadedFiles.cg_recto || "Parcourir"}
                              </span>
                              <input type="file" className="hidden" onChange={e => handleFileUpload("cg_recto", e)} />
                              <Upload className="w-4 h-4 text-[#f48161]" />
                            </label>
                          </div>

                          <div className="bg-[#205680] p-4 rounded-xl text-white text-center">
                            <h5 className="font-bold text-xs uppercase mb-3">Carte grise verso</h5>
                            <label className="border border-dashed border-white/40 rounded-lg p-3 bg-white flex items-center justify-center gap-2 cursor-pointer hover:bg-orange-50">
                              <span className="text-xs font-bold text-[#f48161] truncate">
                                {uploadedFiles.cg_verso || "Parcourir"}
                              </span>
                              <input type="file" className="hidden" onChange={e => handleFileUpload("cg_verso", e)} />
                              <Upload className="w-4 h-4 text-[#f48161]" />
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* 3. PERMIS */}
                      <div>
                        <div className="inline-flex items-center gap-2 bg-[#4b7f9c] text-white text-xs font-bold uppercase px-4 py-1.5 rounded-full mb-3">
                          <FileText className="w-3.5 h-3.5" />
                          <span>PERMIS</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-[#205680] p-4 rounded-xl text-white text-center">
                            <h5 className="font-bold text-xs uppercase mb-3">Permis recto</h5>
                            <label className="border border-dashed border-white/40 rounded-lg p-3 bg-white flex items-center justify-center gap-2 cursor-pointer hover:bg-orange-50">
                              <span className="text-xs font-bold text-[#f48161] truncate">
                                {uploadedFiles.permis_recto || "Parcourir"}
                              </span>
                              <input type="file" className="hidden" onChange={e => handleFileUpload("permis_recto", e)} />
                              <Upload className="w-4 h-4 text-[#f48161]" />
                            </label>
                          </div>

                          <div className="bg-[#205680] p-4 rounded-xl text-white text-center">
                            <h5 className="font-bold text-xs uppercase mb-3">Permis verso</h5>
                            <label className="border border-dashed border-white/40 rounded-lg p-3 bg-white flex items-center justify-center gap-2 cursor-pointer hover:bg-orange-50">
                              <span className="text-xs font-bold text-[#f48161] truncate">
                                {uploadedFiles.permis_verso || "Parcourir"}
                              </span>
                              <input type="file" className="hidden" onChange={e => handleFileUpload("permis_verso", e)} />
                              <Upload className="w-4 h-4 text-[#f48161]" />
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* 4. TITRE DE PROPRIÉTÉ (Spécifique Moto) */}
                      <div>
                        <div className="inline-flex items-center gap-2 bg-[#4b7f9c] text-white text-xs font-bold uppercase px-4 py-1.5 rounded-full mb-3">
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>TITRE DE PROPRIÉTÉ</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-[#205680] p-4 rounded-xl text-white text-center">
                            <h5 className="font-bold text-xs uppercase mb-3">Titre de propriété recto</h5>
                            <label className="border border-dashed border-white/40 rounded-lg p-3 bg-white flex items-center justify-center gap-2 cursor-pointer hover:bg-orange-50">
                              <span className="text-xs font-bold text-[#f48161] truncate">
                                {uploadedFiles.titre_recto || "Parcourir"}
                              </span>
                              <input type="file" className="hidden" onChange={e => handleFileUpload("titre_recto", e)} />
                              <Upload className="w-4 h-4 text-[#f48161]" />
                            </label>
                          </div>

                          <div className="bg-[#205680] p-4 rounded-xl text-white text-center">
                            <h5 className="font-bold text-xs uppercase mb-3">Titre de propriété verso</h5>
                            <label className="border border-dashed border-white/40 rounded-lg p-3 bg-white flex items-center justify-center gap-2 cursor-pointer hover:bg-orange-50">
                              <span className="text-xs font-bold text-[#f48161] truncate">
                                {uploadedFiles.titre_verso || "Parcourir"}
                              </span>
                              <input type="file" className="hidden" onChange={e => handleFileUpload("titre_verso", e)} />
                              <Upload className="w-4 h-4 text-[#f48161]" />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit & Cancel Buttons */}
                  <div className="pt-8 flex flex-wrap justify-center gap-4">
                    <Link
                      href="/moto"
                      className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-rose-500 hover:bg-rose-600 text-white shadow-md inline-flex items-center gap-2 transition"
                    >
                      <X className="w-4 h-4" />
                      <span>Annuler</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => alert("Vos documents ont été transmis avec succès !")}
                      className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#f48161] hover:bg-[#e46e4e] text-white shadow-lg inline-flex items-center gap-2 transition"
                    >
                      <Check className="w-4 h-4" />
                      <span>Envoyer</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
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
                  {step < 3 && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-[#4b7f9c] hover:bg-[#3d6880] text-white inline-flex items-center gap-2 cursor-pointer transition"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Réinitialiser les champs</span>
                    </button>
                  )}

                  {step < 3 && (
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

            {/* Right Summary Sidebar (Figma Desktop - 9, 10, 11) */}
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
                          className="w-7 h-7 rounded-full bg-[#f48161] text-white flex items-center justify-center hover:bg-[#e46e4e] transition"
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

                    {/* Section Moto (visible on step 3 and 4) */}
                    {step >= 3 && (
                      <div className="bg-white rounded-xl p-3.5 shadow-2xs border border-orange-100">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-[#153954] uppercase text-[11px] tracking-wider">Informations du Moto</span>
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="w-7 h-7 rounded-full bg-[#f48161] text-white flex items-center justify-center hover:bg-[#e46e4e] transition"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-slate-700"><strong>Marque :</strong> {moto.marque} {moto.modele}</p>
                        <p className="text-slate-700 line-clamp-2"><strong>Classe :</strong> {selectedClass.label}</p>
                        <p className="text-slate-700"><strong>Vitesse :</strong> {moto.vitesse}</p>
                        <p className="text-slate-700"><strong>Immatriculation :</strong> {immNum}.{immCode}.{immPref}</p>
                        <p className="text-slate-700"><strong>Date d'effet :</strong> {moto.date_debut}</p>
                        <p className="text-slate-700"><strong>Mise en circulation :</strong> {moto.date_mec}</p>
                        <p className="text-slate-700"><strong>Valeur à neuf :</strong> {moto.van.toLocaleString()} DHS</p>
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
