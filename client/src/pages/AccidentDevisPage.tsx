import { useState, useMemo } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import { 
  Shield, 
  HeartPulse, 
  Clock, 
  User, 
  Check, 
  X, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  Mail, 
  FileText, 
  Upload, 
  Calendar, 
  Briefcase, 
  MapPin, 
  Plus, 
  Trash2, 
  RotateCcw,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { Link } from "wouter";

interface Beneficiary {
  nom: string;
  prenom: string;
  dateNaissance: string;
}

export default function AccidentDevisPage() {
  const [step, setStep] = useState<number>(1);

  // Selected Formula: "pomme" | "orange" | "kiwi"
  const [selectedFormule, setSelectedFormule] = useState<"pomme" | "orange" | "kiwi">("orange");

  // Options toggles per formula
  const [options, setOptions] = useState({
    assistance: true,
    ecoute: false,
    conseil: false,
  });

  // Client / Assuré info
  const [client, setClient] = useState({
    nom: "Koulouch",
    prenom: "Youssef",
    telephone: "0675289966",
    email: "youssefkoulouch@gmail.com",
    cin: "BE123456",
    dateNaissance: "1988-06-15",
    adresse: "27 Rue Ain Asserdoune CIL, Casablanca",
    profession: "Ingénieur d'affaires",
  });

  // Risk questionnaire
  const [maladieGrave, setMaladieGrave] = useState<"non" | "oui">("non");
  const [infirmite, setInfirmite] = useState<"non" | "oui">("non");
  const [sportDangereux, setSportDangereux] = useState<"non" | "oui">("non");

  // Contract dates
  const today = new Date().toISOString().slice(0, 10);
  const [dateDebut, setDateDebut] = useState<string>(today);

  const dateEcheance = useMemo(() => {
    if (!dateDebut) return "";
    const d = new Date(dateDebut);
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().slice(0, 10);
  }, [dateDebut]);

  // Beneficiaries
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    { nom: "Koulouch", prenom: "Amina", dateNaissance: "2015-04-12" }
  ]);

  const [cgu, setCgu] = useState<boolean>(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Document Uploads
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

  // Pricing configuration matching official Digiassur
  const formulasData: Record<"pomme" | "orange" | "kiwi", {
    name: string;
    tagline: string;
    color: string;
    bgLight: string;
    badgeColor: string;
    isPopular?: boolean;
    basePrice: number;
    monthlyPrice: string;
    capitalDeces: string;
    fraisMedicaux: {
      taux: string;
      plafond: string;
      franchise: string;
    };
    indemniteJour: string;
    indemniteDesc: string;
    optPrices: {
      assistance: number;
      ecoute: number;
      conseil: number;
    };
    ecouteLabel: string;
    conseilLabel: string;
  }> = {
    pomme: {
      name: "Formule Pomme",
      tagline: "L'essentiel pour votre sécurité",
      color: "#81C9A4",
      bgLight: "#f0fdf4",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      isPopular: false,
      basePrice: 312.50,
      monthlyPrice: "26 DHS",
      capitalDeces: "50 000 DHS",
      fraisMedicaux: {
        taux: "80%",
        plafond: "30 000 DHS",
        franchise: "500 DHS"
      },
      indemniteJour: "150 DHS",
      indemniteDesc: "Dès le 1er jour et jusqu'à 120 jours",
      optPrices: {
        assistance: 120,
        ecoute: 100, // 3 séances
        conseil: 100, // 1 consultation
      },
      ecouteLabel: "3 séances / accident",
      conseilLabel: "1 consultation / accident"
    },
    orange: {
      name: "Formule Orange",
      tagline: "Le meilleur équilibre couverture / budget",
      color: "#F48161",
      bgLight: "#fff7ed",
      badgeColor: "bg-orange-100 text-[#f48161] border-orange-200",
      isPopular: true,
      basePrice: 427.50,
      monthlyPrice: "35.6 DHS",
      capitalDeces: "70 000 DHS",
      fraisMedicaux: {
        taux: "80%",
        plafond: "50 000 DHS",
        franchise: "500 DHS"
      },
      indemniteJour: "300 DHS",
      indemniteDesc: "Dès le 1er jour et jusqu'à 120 jours",
      optPrices: {
        assistance: 120,
        ecoute: 150, // 5 séances
        conseil: 150, // 1 consultation
      },
      ecouteLabel: "5 séances / accident",
      conseilLabel: "1 consultation / accident"
    },
    kiwi: {
      name: "Formule Kiwi",
      tagline: "Protection intégrale et plafonds élevés",
      color: "#378C99",
      bgLight: "#f0f9ff",
      badgeColor: "bg-cyan-100 text-[#378c99] border-cyan-200",
      isPopular: false,
      basePrice: 738.50,
      monthlyPrice: "61.5 DHS",
      capitalDeces: "150 000 DHS",
      fraisMedicaux: {
        taux: "80%",
        plafond: "100 000 DHS",
        franchise: "500 DHS"
      },
      indemniteJour: "450 DHS",
      indemniteDesc: "Dès le 1er jour et jusqu'à 120 jours",
      optPrices: {
        assistance: 120,
        ecoute: 204, // 10 séances
        conseil: 204, // 1 consultation
      },
      ecouteLabel: "10 séances / accident",
      conseilLabel: "1 consultation / accident"
    }
  };

  const currentFormula = formulasData[selectedFormule];

  // Dynamic calculation
  const totalOptionsPrice = useMemo(() => {
    let tot = 0;
    if (options.assistance) tot += currentFormula.optPrices.assistance;
    if (options.ecoute) tot += currentFormula.optPrices.ecoute;
    if (options.conseil) tot += currentFormula.optPrices.conseil;
    return tot;
  }, [options, currentFormula]);

  const totalPrime = useMemo(() => {
    return (currentFormula.basePrice + totalOptionsPrice).toFixed(2);
  }, [currentFormula, totalOptionsPrice]);

  const handleAddBeneficiary = () => {
    setBeneficiaries([...beneficiaries, { nom: "", prenom: "", dateNaissance: "" }]);
  };

  const handleRemoveBeneficiary = (index: number) => {
    setBeneficiaries(beneficiaries.filter((_, i) => i !== index));
  };

  const handleUpdateBeneficiary = (index: number, field: keyof Beneficiary, value: string) => {
    const updated = [...beneficiaries];
    updated[index][field] = value;
    setBeneficiaries(updated);
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!client.nom.trim()) errs.nom = "Nom obligatoire";
    if (!client.prenom.trim()) errs.prenom = "Prénom obligatoire";
    if (!client.telephone.trim()) errs.telephone = "Téléphone obligatoire";
    if (!client.email.trim()) errs.email = "Email obligatoire";
    if (!client.cin.trim()) errs.cin = "CIN obligatoire";
    if (!client.dateNaissance) errs.dateNaissance = "Date de naissance requise";
    if (!client.adresse.trim()) errs.adresse = "Adresse obligatoire";
    if (!client.profession.trim()) errs.profession = "Profession obligatoire";
    if (!cgu) errs.cgu = "Veuillez accepter les CGU et la mention CNDP";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextFromStep2 = () => {
    if (validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFileUpload = (docKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles(prev => ({ ...prev, [docKey]: e.target.files![0] }));
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-[#F48161] selection:text-white">
      <DigiassurHeader />

      <main className="flex-1 pt-[116px] pb-20">
        {/* Top Header Banner */}
        <div className="bg-[#4B7F9C] text-white py-8 border-b border-[#3d6880] shadow-sm">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 text-cyan-200 text-xs font-semibold uppercase tracking-wider mb-1">
                  <span>Assurance des personnes</span>
                  <span>•</span>
                  <span>Individuelle Accident</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  Tarification Assurance Accident de la vie privée & professionnelle
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs bg-white/10 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/20 text-cyan-100">
                  Formules à partir de <strong className="text-white">26 DHS / mois</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stepper Indicator */}
        <div className="bg-white border-b border-slate-200 shadow-2xs sticky top-[72px] z-30">
          <div className="max-w-[1240px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {/* Step 1 */}
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`flex items-center gap-3 transition cursor-pointer ${
                  step === 1 ? "text-[#F48161] font-bold" : step > 1 ? "text-[#4B7F9C] font-semibold" : "text-slate-400"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition ${
                    step === 1
                      ? "bg-[#F48161] text-white shadow-md shadow-orange-200 ring-4 ring-orange-50"
                      : step > 1
                      ? "bg-[#4B7F9C] text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {step > 1 ? <Check className="w-5 h-5 stroke-[3]" /> : "1"}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Étape 1</div>
                  <div className="text-sm">Offres & Formules</div>
                </div>
              </button>

              <div className={`flex-1 h-0.5 mx-4 transition ${step > 1 ? "bg-[#4B7F9C]" : "bg-slate-200"}`} />

              {/* Step 2 */}
              <button
                type="button"
                onClick={() => {
                  if (step > 2 || step === 1) setStep(2);
                }}
                className={`flex items-center gap-3 transition cursor-pointer ${
                  step === 2 ? "text-[#F48161] font-bold" : step > 2 ? "text-[#4B7F9C] font-semibold" : "text-slate-400"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition ${
                    step === 2
                      ? "bg-[#F48161] text-white shadow-md shadow-orange-200 ring-4 ring-orange-50"
                      : step > 2
                      ? "bg-[#4B7F9C] text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {step > 2 ? <Check className="w-5 h-5 stroke-[3]" /> : "2"}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Étape 2</div>
                  <div className="text-sm">Assuré & Bénéficiaires</div>
                </div>
              </button>

              <div className={`flex-1 h-0.5 mx-4 transition ${step > 2 ? "bg-[#4B7F9C]" : "bg-slate-200"}`} />

              {/* Step 3 */}
              <div
                className={`flex items-center gap-3 ${
                  step === 3 ? "text-[#F48161] font-bold" : "text-slate-400"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition ${
                    step === 3
                      ? "bg-[#F48161] text-white shadow-md shadow-orange-200 ring-4 ring-orange-50"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  3
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Étape 3</div>
                  <div className="text-sm">Confirmation</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-[1240px] mx-auto px-6 mt-8">
          {/* ============================================================== */}
          {/* ÉTAPE 1: COMPARATEUR DES 3 FORMULES                           */}
          {/* ============================================================== */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in-50 duration-300">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-bold text-[#F48161] uppercase tracking-widest bg-[#FEF1EB] px-3.5 py-1.5 rounded-full border border-orange-100">
                  Tarification en ligne
                </span>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-[#1B232F] mt-3 mb-2">
                  Choisissez la formule qui correspond à votre rythme de vie
                </h2>
                <p className="text-slate-500 text-sm">
                  Personnalisez vos garanties en cochant les options de votre choix. Aucun engagement préalable.
                </p>
              </div>

              {/* Formula Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                {(Object.keys(formulasData) as Array<"pomme" | "orange" | "kiwi">).map(key => {
                  const f = formulasData[key];
                  const isSelected = selectedFormule === key;

                  // Formula-specific option calculation
                  const formulaOptionTotal = 
                    (options.assistance ? f.optPrices.assistance : 0) +
                    (options.ecoute ? f.optPrices.ecoute : 0) +
                    (options.conseil ? f.optPrices.conseil : 0);

                  const formulaTotal = (f.basePrice + formulaOptionTotal).toFixed(2);

                  return (
                    <div
                      key={key}
                      className={`relative rounded-2xl bg-white border transition-all duration-200 flex flex-col ${
                        isSelected
                          ? "border-[#F48161] shadow-xl ring-2 ring-[#F48161]/20 -translate-y-1"
                          : "border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300"
                      }`}
                    >
                      {f.isPopular && (
                        <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 z-10">
                          <span className="bg-[#F48161] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Formule Recommandée
                          </span>
                        </div>
                      )}

                      {/* Card Header */}
                      <div className="p-6 border-b border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full border ${f.badgeColor}`}>
                            {f.name}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">À partir de {f.monthlyPrice}/mois</span>
                        </div>

                        <p className="text-xs text-slate-500 mb-4">{f.tagline}</p>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                          <div className="text-3xl font-extrabold text-[#1B232F]">
                            {formulaTotal} <span className="text-base font-semibold text-[#F48161]">DHS</span>
                          </div>
                          <span className="text-xs text-slate-500 font-medium">Prime annuelle TTC</span>
                        </div>
                      </div>

                      {/* Card Guarantees */}
                      <div className="p-6 flex-1 space-y-4 text-xs">
                        <div className="pb-3 border-b border-slate-100">
                          <span className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Décès accidentel
                          </span>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Capital versé aux ayants droit</span>
                            <strong className="text-sm font-extrabold text-[#1B232F]">{f.capitalDeces}</strong>
                          </div>
                        </div>

                        <div className="pb-3 border-b border-slate-100 space-y-1.5">
                          <span className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Frais Médicaux & Hospitalisation
                          </span>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Taux de remboursement</span>
                            <strong className="font-bold text-slate-800">{f.fraisMedicaux.taux}</strong>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Plafond annuel / assuré</span>
                            <strong className="font-extrabold text-[#1B232F]">{f.fraisMedicaux.plafond}</strong>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Franchise</span>
                            <strong className="font-medium text-slate-700">{f.fraisMedicaux.franchise}</strong>
                          </div>
                        </div>

                        <div className="pb-3 border-b border-slate-100">
                          <span className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Indemnités journalières
                          </span>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Par jour d'hospitalisation</span>
                            <strong className="text-sm font-extrabold text-[#1B232F]">{f.indemniteJour}</strong>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-1 italic">{f.indemniteDesc}</p>
                        </div>

                        {/* Options Selection */}
                        <div className="space-y-3 pt-2">
                          <span className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                            Options complémentaires
                          </span>

                          {/* Assistance malade */}
                          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                            <div>
                              <div className="font-semibold text-slate-800">Assistance malade</div>
                              <div className="text-[11px] text-slate-500">+{f.optPrices.assistance} DHS TTC/an</div>
                            </div>
                            <div className="flex gap-1 bg-white p-1 rounded-md border border-slate-200">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedFormule(key);
                                  setOptions(o => ({ ...o, assistance: true }));
                                }}
                                className={`px-2.5 py-1 text-[11px] font-bold rounded cursor-pointer transition ${
                                  options.assistance && isSelected
                                    ? "bg-[#4B7F9C] text-white"
                                    : "text-slate-600 hover:bg-slate-100"
                                }`}
                              >
                                Oui
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedFormule(key);
                                  setOptions(o => ({ ...o, assistance: false }));
                                }}
                                className={`px-2.5 py-1 text-[11px] font-bold rounded cursor-pointer transition ${
                                  !options.assistance && isSelected
                                    ? "bg-slate-400 text-white"
                                    : "text-slate-600 hover:bg-slate-100"
                                }`}
                              >
                                Non
                              </button>
                            </div>
                          </div>

                          {/* Écoute psychologique */}
                          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                            <div>
                              <div className="font-semibold text-slate-800">Écoute psychologique</div>
                              <div className="text-[11px] text-slate-500">{f.ecouteLabel} (+{f.optPrices.ecoute} DH)</div>
                            </div>
                            <div className="flex gap-1 bg-white p-1 rounded-md border border-slate-200">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedFormule(key);
                                  setOptions(o => ({ ...o, ecoute: true }));
                                }}
                                className={`px-2.5 py-1 text-[11px] font-bold rounded cursor-pointer transition ${
                                  options.ecoute && isSelected
                                    ? "bg-[#4B7F9C] text-white"
                                    : "text-slate-600 hover:bg-slate-100"
                                }`}
                              >
                                Oui
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedFormule(key);
                                  setOptions(o => ({ ...o, ecoute: false }));
                                }}
                                className={`px-2.5 py-1 text-[11px] font-bold rounded cursor-pointer transition ${
                                  !options.ecoute && isSelected
                                    ? "bg-slate-400 text-white"
                                    : "text-slate-600 hover:bg-slate-100"
                                }`}
                              >
                                Non
                              </button>
                            </div>
                          </div>

                          {/* Conseil juridique */}
                          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                            <div>
                              <div className="font-semibold text-slate-800">Conseil juridique</div>
                              <div className="text-[11px] text-slate-500">{f.conseilLabel} (+{f.optPrices.conseil} DH)</div>
                            </div>
                            <div className="flex gap-1 bg-white p-1 rounded-md border border-slate-200">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedFormule(key);
                                  setOptions(o => ({ ...o, conseil: true }));
                                }}
                                className={`px-2.5 py-1 text-[11px] font-bold rounded cursor-pointer transition ${
                                  options.conseil && isSelected
                                    ? "bg-[#4B7F9C] text-white"
                                    : "text-slate-600 hover:bg-slate-100"
                                }`}
                              >
                                Oui
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedFormule(key);
                                  setOptions(o => ({ ...o, conseil: false }));
                                }}
                                className={`px-2.5 py-1 text-[11px] font-bold rounded cursor-pointer transition ${
                                  !options.conseil && isSelected
                                    ? "bg-slate-400 text-white"
                                    : "text-slate-600 hover:bg-slate-100"
                                }`}
                              >
                                Non
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Button */}
                      <div className="p-6 pt-0">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFormule(key);
                            setStep(2);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                            isSelected
                              ? "bg-[#F48161] hover:bg-[#e46e4e] text-white shadow-orange-200"
                              : "bg-[#4B7F9C] hover:bg-[#3d6880] text-white"
                          }`}
                        >
                          <span>{isSelected ? "Continuer avec cette formule" : `Choisir ${f.name}`}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Regulatory Notice Banner */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-center max-w-2xl mx-auto shadow-2xs">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification et d'opposition au traitement de vos données personnelles. 
                  Autorisation CNDP N° : <strong>A-GC-232/2023</strong>.
                </p>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* ÉTAPE 2: FORMULAIRE ASSURÉ, SANTÉ & BÉNÉFICIAIRES             */}
          {/* ============================================================== */}
          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in-50 duration-300">
              {/* Main Form (8 cols) */}
              <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <div>
                      <h2 className="text-xl md:text-2xl font-extrabold text-[#1B232F]">
                        Renseignez vos informations afin de recevoir votre devis
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Formule sélectionnée : <strong className="text-[#F48161]">{currentFormula.name}</strong> ({totalPrime} DHS TTC/an)
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-[#4B7F9C] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Changer d'offre
                    </button>
                  </div>

                  {/* Section A: Informations du Souscripteur */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-[#4B7F9C] uppercase tracking-wider flex items-center gap-2">
                      <User className="w-4 h-4" /> 1. Informations de l'assuré
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Nom *</label>
                        <input
                          type="text"
                          value={client.nom}
                          onChange={(e) => setClient({ ...client, nom: e.target.value })}
                          placeholder="Nom de famille"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#4B7F9C] focus:bg-white"
                        />
                        {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Prénom *</label>
                        <input
                          type="text"
                          value={client.prenom}
                          onChange={(e) => setClient({ ...client, prenom: e.target.value })}
                          placeholder="Prénom"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#4B7F9C] focus:bg-white"
                        />
                        {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Téléphone *</label>
                        <input
                          type="tel"
                          value={client.telephone}
                          onChange={(e) => setClient({ ...client, telephone: e.target.value })}
                          placeholder="06 XX XX XX XX"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#4B7F9C] focus:bg-white"
                        />
                        {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Email *</label>
                        <input
                          type="email"
                          value={client.email}
                          onChange={(e) => setClient({ ...client, email: e.target.value })}
                          placeholder="votre.email@exemple.com"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#4B7F9C] focus:bg-white"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">CIN *</label>
                        <input
                          type="text"
                          value={client.cin}
                          onChange={(e) => setClient({ ...client, cin: e.target.value.toUpperCase() })}
                          placeholder="Numéro de CIN (ex: BE123456)"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#4B7F9C] focus:bg-white"
                        />
                        {errors.cin && <p className="text-red-500 text-xs mt-1">{errors.cin}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Date de naissance *</label>
                        <input
                          type="date"
                          value={client.dateNaissance}
                          onChange={(e) => setClient({ ...client, dateNaissance: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#4B7F9C] focus:bg-white"
                        />
                        {errors.dateNaissance && <p className="text-red-500 text-xs mt-1">{errors.dateNaissance}</p>}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Adresse postale complète *</label>
                        <input
                          type="text"
                          value={client.adresse}
                          onChange={(e) => setClient({ ...client, adresse: e.target.value })}
                          placeholder="N°, Rue, Quartier, Ville"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#4B7F9C] focus:bg-white"
                        />
                        {errors.adresse && <p className="text-red-500 text-xs mt-1">{errors.adresse}</p>}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Profession / Activité exercée *</label>
                        <input
                          type="text"
                          value={client.profession}
                          onChange={(e) => setClient({ ...client, profession: e.target.value })}
                          placeholder="Ex: Cadre d'entreprise, Commerçant, Profession libérale..."
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#4B7F9C] focus:bg-white"
                        />
                        {errors.profession && <p className="text-red-500 text-xs mt-1">{errors.profession}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Section B: Déclaration de santé & Risque */}
                  <div className="space-y-4 pt-6 border-t border-slate-100">
                    <h3 className="text-xs font-bold text-[#4B7F9C] uppercase tracking-wider flex items-center gap-2">
                      <HeartPulse className="w-4 h-4" /> 2. Déclaration sur l'honneur & questionnaire simplifié
                    </h3>

                    <div className="space-y-3">
                      {/* Question 1 */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <span className="text-sm font-medium text-slate-700">
                          Êtes-vous atteint d’une maladie grave ?
                        </span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setMaladieGrave("non")}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                              maladieGrave === "non"
                                ? "bg-[#12AC8F] text-white shadow-xs"
                                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            Non
                          </button>
                          <button
                            type="button"
                            onClick={() => setMaladieGrave("oui")}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                              maladieGrave === "oui"
                                ? "bg-amber-500 text-white shadow-xs"
                                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            Oui
                          </button>
                        </div>
                      </div>

                      {/* Question 2 */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <span className="text-sm font-medium text-slate-700">
                          Êtes-vous atteint d’une infirmité totale ou partielle ?
                        </span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setInfirmite("non")}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                              infirmite === "non"
                                ? "bg-[#12AC8F] text-white shadow-xs"
                                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            Non
                          </button>
                          <button
                            type="button"
                            onClick={() => setInfirmite("oui")}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                              infirmite === "oui"
                                ? "bg-amber-500 text-white shadow-xs"
                                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            Oui
                          </button>
                        </div>
                      </div>

                      {/* Question 3 */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <span className="text-sm font-medium text-slate-700">
                          Pratiquez-vous un sport dangereux ?
                        </span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setSportDangereux("non")}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                              sportDangereux === "non"
                                ? "bg-[#12AC8F] text-white shadow-xs"
                                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            Non
                          </button>
                          <button
                            type="button"
                            onClick={() => setSportDangereux("oui")}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                              sportDangereux === "oui"
                                ? "bg-amber-500 text-white shadow-xs"
                                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            Oui
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section C: Dates du Contrat */}
                  <div className="space-y-4 pt-6 border-t border-slate-100">
                    <h3 className="text-xs font-bold text-[#4B7F9C] uppercase tracking-wider flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> 3. Dates de prise d'effet
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          Date de début du contrat *
                        </label>
                        <input
                          type="date"
                          value={dateDebut}
                          onChange={(e) => setDateDebut(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#4B7F9C] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          Date d'échéance annuelle (Tacite reconduction)
                        </label>
                        <input
                          type="date"
                          disabled
                          value={dateEcheance}
                          className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section D: Bénéficiaires en cas de décès */}
                  <div className="space-y-4 pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-[#4B7F9C] uppercase tracking-wider flex items-center gap-2">
                        <Shield className="w-4 h-4" /> 4. Bénéficiaires désignés en cas de décès
                      </h3>
                      <button
                        type="button"
                        onClick={handleAddBeneficiary}
                        className="text-xs text-[#F48161] hover:text-[#e46e4e] font-bold flex items-center gap-1 cursor-pointer bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100"
                      >
                        <Plus className="w-3.5 h-3.5" /> Ajouter un proche
                      </button>
                    </div>

                    <p className="text-xs text-slate-500">
                      À défaut de mention expresse, les bénéficiaires sont les héritiers légaux selon la législation marocaine.
                    </p>

                    <div className="space-y-3">
                      {beneficiaries.map((b, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative group">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-slate-700 uppercase">
                              Bénéficiaire #{idx + 1}
                            </span>
                            {beneficiaries.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveBeneficiary(idx)}
                                className="text-red-400 hover:text-red-600 transition p-1 cursor-pointer"
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <input
                                type="text"
                                placeholder="Nom*"
                                value={b.nom}
                                onChange={(e) => handleUpdateBeneficiary(idx, "nom", e.target.value)}
                                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4B7F9C]"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                placeholder="Prénom*"
                                value={b.prenom}
                                onChange={(e) => handleUpdateBeneficiary(idx, "prenom", e.target.value)}
                                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4B7F9C]"
                              />
                            </div>
                            <div>
                              <input
                                type="date"
                                placeholder="Date de naissance"
                                value={b.dateNaissance}
                                onChange={(e) => handleUpdateBeneficiary(idx, "dateNaissance", e.target.value)}
                                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#4B7F9C]"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section E: Consentement CGU */}
                  <div className="pt-6 border-t border-slate-100">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={cgu}
                        onChange={(e) => setCgu(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-[#F48161] focus:ring-[#F48161]"
                      />
                      <span>
                        J'ai lu et j'accepte les{" "}
                        <Link href="/mentions-legales" className="text-[#153954] underline font-bold">
                          conditions générales d'utilisation
                        </Link>{" "}
                        notamment la mention relative à la protection des données personnelles conformément aux dispositions de la loi 09-08 (Autorisation CNDP N° A-GC-232/2023).
                      </span>
                    </label>
                    {errors.cgu && <p className="text-red-500 text-xs mt-1">{errors.cgu}</p>}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-6 py-3 border border-slate-200 text-slate-700 font-bold text-xs uppercase rounded-xl hover:bg-slate-50 transition flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Précédent</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNextFromStep2}
                      className="px-8 py-3.5 bg-[#F48161] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-200 transition flex items-center gap-2 cursor-pointer"
                    >
                      <span>Valider & Continuer</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar Summary (4 cols) */}
              <div className="lg:col-span-4 sticky top-[150px] space-y-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Récapitulatif</span>
                    <span className="text-xs font-bold text-[#F48161] bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                      Accident Corporel
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-500 font-medium">Formule choisie</div>
                    <div className="text-lg font-extrabold text-[#1B232F]">{currentFormula.name}</div>
                    <div className="text-xs text-slate-600 mt-1">Capital décès : {currentFormula.capitalDeces}</div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Prime de base :</span>
                      <span className="font-bold text-slate-800">{currentFormula.basePrice.toFixed(2)} DHS</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span>Total des options :</span>
                      <span className="font-bold text-slate-800">{totalOptionsPrice.toFixed(2)} DHS</span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-extrabold text-sm text-[#1B232F]">Total annuel TTC :</span>
                      <span className="font-extrabold text-xl text-[#F48161]">{totalPrime} DHS</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-cyan-50 border border-cyan-100 text-[11px] text-[#4B7F9C] flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Attestation disponible immédiatement après confirmation et validation des pièces requises.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* ÉTAPE 3: CONFIRMATION & TÉLÉVERSEMENT DES PIÈCES              */}
          {/* ============================================================== */}
          {step === 3 && (
            <div className="max-w-3xl mx-auto space-y-8 animate-in zoom-in-95 duration-200">
              {/* Success Banner */}
              <div className="bg-white p-8 md:p-10 rounded-2xl border border-emerald-100 shadow-xl text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>

                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                    Devis Enregistré avec Succès
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B232F] mt-3">
                    Félicitations {client.prenom} !
                  </h2>
                  <p className="text-sm text-slate-600 max-w-lg mx-auto mt-2 leading-relaxed">
                    Vous allez recevoir par email votre récapitulatif dans quelques instants à <strong>{client.email}</strong>. 
                    Un conseiller Digiassur est à votre disposition au <strong>05 22 36 81 82</strong>.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-left space-y-4 max-w-xl mx-auto text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <div className="text-slate-400 font-medium uppercase text-[10px]">Formule souscrite</div>
                      <div className="font-extrabold text-base text-[#1B232F]">{currentFormula.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-400 font-medium uppercase text-[10px]">Prime Annuelle TTC</div>
                      <div className="font-extrabold text-xl text-[#F48161]">{totalPrime} DHS</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Assuré principal</span>
                      <strong className="text-slate-800">{client.prenom} {client.nom} ({client.cin})</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Téléphone</span>
                      <strong className="text-slate-800">{client.telephone}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Garantie décès</span>
                      <strong className="text-slate-800">{currentFormula.capitalDeces}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Frais Médicaux (80%)</span>
                      <strong className="text-slate-800">Plafond {currentFormula.fraisMedicaux.plafond}</strong>
                    </div>
                  </div>
                </div>

                {/* Document Upload Section */}
                <div className="pt-6 border-t border-slate-100 text-left space-y-4">
                  <div>
                    <h3 className="font-extrabold text-base text-[#1B232F]">
                      Afin d'accélérer l'émission de votre attestation définitive :
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Vous pouvez joindre vos pièces justificatives dès maintenant (formats acceptés : JPG, PNG, PDF).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* CIN Upload */}
                    <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition text-center">
                      <Upload className="w-6 h-6 text-[#4B7F9C] mx-auto mb-2" />
                      <div className="font-bold text-xs text-slate-700">CIN de l'assuré (Recto / Verso)</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {uploadedFiles["cin"] ? uploadedFiles["cin"].name : "Cliquez pour importer"}
                      </div>
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload("cin", e)}
                        className="hidden"
                        id="upload-cin"
                      />
                      <label
                        htmlFor="upload-cin"
                        className="mt-2.5 inline-block text-[11px] font-bold text-[#4B7F9C] hover:underline cursor-pointer"
                      >
                        {uploadedFiles["cin"] ? "Remplacer le fichier" : "Sélectionner un fichier"}
                      </label>
                    </div>

                    {/* Justificatif Upload */}
                    <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition text-center">
                      <FileText className="w-6 h-6 text-[#4B7F9C] mx-auto mb-2" />
                      <div className="font-bold text-xs text-slate-700">Justificatif d'activité ou adresse</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {uploadedFiles["justif"] ? uploadedFiles["justif"].name : "Optionnel"}
                      </div>
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload("justif", e)}
                        className="hidden"
                        id="upload-justif"
                      />
                      <label
                        htmlFor="upload-justif"
                        className="mt-2.5 inline-block text-[11px] font-bold text-[#4B7F9C] hover:underline cursor-pointer"
                      >
                        {uploadedFiles["justif"] ? "Remplacer le fichier" : "Sélectionner un fichier"}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Final Actions */}
                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase rounded-xl transition cursor-pointer flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Imprimer mon devis</span>
                  </button>

                  <Link
                    href="/"
                    className="px-8 py-3.5 bg-[#4B7F9C] hover:bg-[#3d6880] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Retour à l'accueil</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Partners Section */}
        <div className="mt-16">
          <PartnersSection />
        </div>
      </main>

      <FloatingWidgets />
      <DigiassurFooter />
    </div>
  );
}
