import { useState, useMemo } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Plus, 
  X, 
  Calendar as CalendarIcon, 
  User, 
  Phone, 
  Mail, 
  CreditCard, 
  MapPin, 
  Briefcase, 
  CheckCircle2, 
  Upload, 
  FileText,
  Send
} from "lucide-react";
import { Link } from "wouter";

interface Beneficiary {
  nom: string;
  prenom: string;
  dateNaissance: string;
}

export default function AccidentDevisPage() {
  const [step, setStep] = useState<number>(1);
  const lastStep = 3;

  // Selected formula
  const [formule, setFormule] = useState<"pomme" | "orange" | "kiwi">("pomme");

  // Options for Pomme
  const [pommeOptions, setPommeOptions] = useState({
    assistance: 120, // 120 or 0
    ecoute: 0,       // 100 or 0 (3 séances)
    conseil: 0,      // 100 or 0 (1 consultation)
  });

  // Options for Orange
  const [orangeOptions, setOrangeOptions] = useState({
    assistance: 120, // 120 or 0
    ecoute: 0,       // 150 or 0 (5 séances)
    conseil: 0,      // 150 or 0 (1 consultation)
  });

  // Options for Kiwi
  const [kiwiOptions, setKiwiOptions] = useState({
    assistance: 120, // 120 or 0
    ecoute: 0,       // 204 or 0 (10 séances)
    conseil: 0,      // 204 or 0 (1 consultation)
  });

  // Client info (matches Figma & live devis)
  const [prospect, setProspect] = useState({
    nom: "Koulouch",
    prenom: "Youssef",
    telephone: "+212 675 289 966",
    email: "youssefkoulouch@gmail.com",
    cin: "BE123456",
    dateNaissance: "1988-06-15",
    adresse: "27 Rue Ain Asserdoune CIL, Casablanca",
    profession: "Ingénieur d'affaires",
  });

  // Risk questionnaire (matches Figma live)
  const [maladieGrave, setMaladieGrave] = useState<"non" | "oui">("non");
  const [infirme, setInfirme] = useState<"non" | "oui">("non");
  const [sportDanger, setSportDanger] = useState<"non" | "oui">("non");

  // Contract dates
  const today = new Date().toISOString().slice(0, 10);
  const [debut, setDebut] = useState<string>(today);

  // Beneficiaries
  const [proches, setProches] = useState<Beneficiary[]>([
    { nom: "Koulouch", prenom: "Amina", dateNaissance: "2015-04-12" }
  ]);

  const [cgu, setCgu] = useState<boolean>(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDocsModal, setShowDocsModal] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

  // Totals
  const pommeOptionTotal = pommeOptions.assistance + pommeOptions.ecoute + pommeOptions.conseil;
  const pommeTotal = 312.50 + pommeOptionTotal;

  const orangeOptionTotal = orangeOptions.assistance + orangeOptions.ecoute + orangeOptions.conseil;
  const orangeTotal = 427.50 + orangeOptionTotal;

  const kiwiOptionTotal = kiwiOptions.assistance + kiwiOptions.ecoute + kiwiOptions.conseil;
  const kiwiTotal = 738.50 + kiwiOptionTotal;

  const currentTotal = useMemo(() => {
    if (formule === "pomme") return pommeTotal.toFixed(2);
    if (formule === "orange") return orangeTotal.toFixed(2);
    return kiwiTotal.toFixed(2);
  }, [formule, pommeTotal, orangeTotal, kiwiTotal]);

  const currentCapital = useMemo(() => {
    if (formule === "pomme") return "50 000 DHS";
    if (formule === "orange") return "70 000 DHS";
    return "150 000 DHS";
  }, [formule]);

  const handleSelectFormule = (selected: "pomme" | "orange" | "kiwi") => {
    setFormule(selected);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddProche = () => {
    setProches([...proches, { nom: "", prenom: "", dateNaissance: "" }]);
  };

  const handleRemoveProche = (index: number) => {
    setProches(proches.filter((_, i) => i !== index));
  };

  const handleUpdateProche = (index: number, field: keyof Beneficiary, value: string) => {
    const updated = [...proches];
    updated[index][field] = value;
    setProches(updated);
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!prospect.nom.trim()) errs.nom = "Nom obligatoire";
    if (!prospect.prenom.trim()) errs.prenom = "Prénom obligatoire";
    if (!prospect.telephone.trim()) errs.telephone = "Téléphone obligatoire";
    if (!prospect.email.trim()) errs.email = "Email obligatoire";
    if (!prospect.cin.trim()) errs.cin = "CIN obligatoire";
    if (!prospect.dateNaissance) errs.dateNaissance = "Date de naissance obligatoire";
    if (!prospect.adresse.trim()) errs.adresse = "Adresse obligatoire";
    if (!prospect.profession.trim()) errs.profession = "Profession obligatoire";
    if (!cgu) errs.cgu = "Veuillez accepter les conditions générales d'utilisation";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 2) {
      if (validateStep2()) {
        setStep(3);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const resetAllData = () => {
    setStep(1);
    setFormule("pomme");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFileUpload = (docKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles(prev => ({ ...prev, [docKey]: e.target.files![0] }));
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-[#f48360] selection:text-white">
      <DigiassurHeader />

      <main className="flex-1 pt-[116px]">
        {/* ============================================================== */}
        {/* FIGMA TIMELINE (Continuous connecting line + exact SVG icons)   */}
        {/* ============================================================== */}
        <section className="bg-white border-b border-slate-200 py-8">
          <div className="max-w-4xl mx-auto px-4 relative">
            {/* Background continuous track */}
            <div className="hidden md:block absolute h-1 bg-slate-200 top-[48px] left-[15%] right-[15%] z-0" />
            
            {/* Active colored progress line */}
            <div 
              className="hidden md:block absolute h-1 bg-[#f48360] top-[48px] left-[15%] transition-all duration-300 z-0"
              style={{
                width: step === 1 ? "0%" : step === 2 ? "35%" : "70%"
              }}
            />

            {/* Desktop timeline items */}
            <ol className="hidden md:flex justify-between items-center relative z-10">
              {/* Step 1: Offres */}
              <li className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div
                    className={`relative w-24 h-24 rounded-full text-white flex justify-center items-center border-4 border-white shadow-md transition-all ${
                      step === 1 
                        ? "bg-[#f48360] ring-4 ring-[#f48360]/20 scale-105" 
                        : "bg-[#4b7f9c]"
                    }`}
                  >
                    <img 
                      src="/images/icon-personal-injury.svg" 
                      alt="Offres" 
                      className="w-12 h-12 object-contain" 
                    />
                    {/* Pip connector on right */}
                    <div
                      className={`absolute -right-1.5 border-2 border-white h-4 w-4 rounded-full ${
                        step > 1 ? "bg-[#4b7f9c]" : "bg-[#f48360]"
                      }`}
                    />
                  </div>
                  <p
                    className={`mt-2 text-center text-sm uppercase font-bold tracking-tight ${
                      step === 1 ? "text-[#f48360]" : "text-neutral-500"
                    }`}
                  >
                    Offres
                  </p>
                </button>
              </li>

              {/* Step 2: Assuré */}
              <li className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => {
                    if (step >= 1) setStep(2);
                  }}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div
                    className={`relative w-24 h-24 rounded-full text-white flex justify-center items-center border-4 border-white shadow-md transition-all ${
                      step === 2
                        ? "bg-[#f48360] ring-4 ring-[#f48360]/20 scale-105"
                        : step > 2
                        ? "bg-[#4b7f9c]"
                        : "bg-gray-200"
                    }`}
                  >
                    <img 
                      src="/images/prime-user-edit.svg" 
                      alt="Assuré" 
                      className="w-12 h-12 object-contain" 
                    />
                    {/* Connector pips */}
                    <div
                      className={`absolute -left-1.5 border-2 border-white h-4 w-4 rounded-full ${
                        step === 2 ? "bg-[#f48360]" : step > 2 ? "bg-[#4b7f9c]" : "bg-gray-200"
                      }`}
                    />
                    <div
                      className={`absolute -right-1.5 border-2 border-white h-4 w-4 rounded-full ${
                        step === 2 ? "bg-[#f48360]" : step > 2 ? "bg-[#4b7f9c]" : "bg-gray-200"
                      }`}
                    />
                  </div>
                  <p
                    className={`mt-2 text-center text-sm uppercase font-bold tracking-tight ${
                      step === 2 ? "text-[#f48360]" : "text-neutral-500"
                    }`}
                  >
                    Assuré
                  </p>
                </button>
              </li>

              {/* Step 3: Confirmation */}
              <li className="flex flex-col items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`relative w-24 h-24 rounded-full text-white flex justify-center items-center border-4 border-white shadow-md transition-all ${
                      step === 3 
                        ? "bg-[#f48360] ring-4 ring-[#f48360]/20 scale-105" 
                        : "bg-gray-200"
                    }`}
                  >
                    <img 
                      src="/images/check-circle-4.svg" 
                      alt="Confirmation" 
                      className="w-12 h-12 object-contain" 
                    />
                    {/* Connector pips */}
                    <div
                      className={`absolute -left-1.5 border-2 border-white h-4 w-4 rounded-full ${
                        step === 3 ? "bg-[#f48360]" : "bg-gray-200"
                      }`}
                    />
                    <div
                      className={`absolute -right-1.5 border-2 border-white h-4 w-4 rounded-full ${
                        step === 3 ? "bg-[#f48360]" : "bg-gray-200"
                      }`}
                    />
                  </div>
                  <p
                    className={`mt-2 text-center text-sm uppercase font-bold tracking-tight ${
                      step === 3 ? "text-[#f48360]" : "text-neutral-500"
                    }`}
                  >
                    Confirmation
                  </p>
                </div>
              </li>
            </ol>

            {/* Responsive Mobile Timeline */}
            <div className="flex items-center justify-start p-2 space-x-3 text-xs bg-gray-200 bg-opacity-60 md:hidden rounded-xl">
              <div className="flex-none p-2 font-semibold text-center text-[#f06d2b] uppercase bg-gray-50 rounded-lg">
                <div>Étape {step}</div>
                <span className="font-normal text-[11px]">
                  {step === 1 ? "Offres" : step === 2 ? "Assuré" : "Confirmation"}
                </span>
              </div>
              <div className="flex-1 bg-white h-2.5 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full leading-none text-center text-white bg-[#f06d2b] rounded-full transition-all duration-300"
                  style={{ width: `${Math.round((step / lastStep) * 100)}%` }}
                />
              </div>
              <div className="w-12 py-1.5 text-center text-[#f06d2b] font-bold rounded-lg bg-gray-50">
                {Math.round((step / lastStep) * 100)}%
              </div>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="py-10 px-4 max-w-7xl mx-auto">
          {/* ============================================================== */}
          {/* ÉTAPE 1: OFFRES (3 FORMULES POMME, ORANGE, KIWI FIGMA EXACT)   */}
          {/* ============================================================== */}
          {step === 1 && (
            <div className="animate-in fade-in-50 duration-300">
              <div className="flex flex-col lg:flex-row gap-x-4 gap-y-14 justify-center items-stretch relative max-w-5xl mx-auto my-8">
                {/* ---------------- CARD 1: FORMULE POMME ---------------- */}
                <ul className="bg-white border-2 border-white w-full max-w-[320px] text-white text-center relative shadow-lg rounded-md flex flex-col justify-between mx-auto">
                  {/* Floating Circular Emblem at -top-10 */}
                  <div className="absolute right-0 left-0 -top-10 z-10">
                    <div className="h-20 w-20 mx-auto rounded-full bg-[#ffc55c] flex items-center justify-center border-4 border-white text-white p-3 shadow-md">
                      <img src="/images/orange-pack.svg" alt="Formule Pomme" className="w-12 h-12 object-contain" />
                    </div>
                  </div>

                  <div>
                    {/* Header */}
                    <li className="px-6 py-4 w-full uppercase font-bold text-[#977028] text-2xl flex items-center justify-center bg-[#ffc55c] pt-12 rounded-t-md whitespace-nowrap">
                      FORMULE POMME
                    </li>

                    {/* Décès */}
                    <li className="px-4 py-2 text-gray-600 w-full text-base font-bold bg-white">Décès accidentel</li>
                    <li className="px-4 py-2 bg-[#4b7f9c] w-full text-sm font-medium">
                      <div>Capital décès accidentel</div>
                      <div className="font-bold text-base">50 000 DHS</div>
                    </li>

                    {/* Frais Médicaux */}
                    <li className="py-2 px-4 text-gray-600 w-full text-sm font-bold bg-white">
                      Frais medicaux, pharmaceutiques, chirurgicaux et d’hospitalisation
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] border-b border-gray-200/20 w-full text-sm font-medium">
                      <div>Taux de remboursement</div>
                      <div className="font-bold">80%</div>
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] border-b border-gray-200/20 w-full text-sm font-medium">
                      <div>Plafond par an et par assuré</div>
                      <div className="font-bold">30 000 DHS</div>
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] w-full text-sm font-medium">
                      <div>Franchise</div>
                      <div className="font-bold">500 DHS</div>
                    </li>

                    {/* Indemnités */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Indémnités journalières d’hospitalisation
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] w-full text-sm font-medium">
                      <div>Indémnités journalières *</div>
                      <div className="font-bold text-base">150 DHS</div>
                    </li>

                    {/* Prime Annuelle */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Prime annuelle TTC
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] w-full text-sm font-bold">
                      <div className="font-bold text-lg">312.50 DHS</div>
                    </li>

                    {/* Option 1: Assistance */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Assistance
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] w-full text-sm font-medium">
                      <div className="flex justify-center gap-4">
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="pomme_assist"
                            checked={pommeOptions.assistance === 120}
                            onChange={() => setPommeOptions({ ...pommeOptions, assistance: 120 })}
                            className="accent-[#ffc55c] cursor-pointer"
                          />
                          <span>Oui</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="pomme_assist"
                            checked={pommeOptions.assistance === 0}
                            onChange={() => setPommeOptions({ ...pommeOptions, assistance: 0 })}
                            className="accent-[#ffc55c] cursor-pointer"
                          />
                          <span>Non</span>
                        </label>
                      </div>
                    </li>

                    {/* Option 2: Ecoute psy */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Ecoute psychologique
                    </li>
                    <li className="px-6 pt-2 bg-[#4b7f9c] w-full text-xs font-medium">
                      <div>3 séances/accident</div>
                    </li>
                    <li className="px-6 pb-2 bg-[#4b7f9c] w-full text-sm font-medium">
                      <div className="flex justify-center gap-4">
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="pomme_ecoute"
                            checked={pommeOptions.ecoute === 100}
                            onChange={() => setPommeOptions({ ...pommeOptions, ecoute: 100 })}
                            className="accent-[#ffc55c] cursor-pointer"
                          />
                          <span>Oui</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="pomme_ecoute"
                            checked={pommeOptions.ecoute === 0}
                            onChange={() => setPommeOptions({ ...pommeOptions, ecoute: 0 })}
                            className="accent-[#ffc55c] cursor-pointer"
                          />
                          <span>Non</span>
                        </label>
                      </div>
                    </li>

                    {/* Option 3: Conseil juridique */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Conseil juridique
                    </li>
                    <li className="px-6 pt-2 bg-[#4b7f9c] w-full text-xs font-medium">
                      <div>Une consultation / accident</div>
                    </li>
                    <li className="px-6 pb-2 bg-[#4b7f9c] w-full text-sm font-medium">
                      <div className="flex justify-center gap-4">
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="pomme_conseil"
                            checked={pommeOptions.conseil === 100}
                            onChange={() => setPommeOptions({ ...pommeOptions, conseil: 100 })}
                            className="accent-[#ffc55c] cursor-pointer"
                          />
                          <span>Oui</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="pomme_conseil"
                            checked={pommeOptions.conseil === 0}
                            onChange={() => setPommeOptions({ ...pommeOptions, conseil: 0 })}
                            className="accent-[#ffc55c] cursor-pointer"
                          />
                          <span>Non</span>
                        </label>
                      </div>
                    </li>

                    {/* Total Options */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Prix total des options
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] w-full text-base font-bold">
                      <div>{pommeOptionTotal.toFixed(2)} DHS TTC</div>
                    </li>

                    {/* Prime Totale */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Prime totale
                    </li>
                    <li className="px-6 py-3 w-full text-gray-700 text-2xl font-bold bg-white">
                      <div>{pommeTotal.toFixed(2)} DHS TTC</div>
                    </li>
                  </div>

                  {/* Commander Button */}
                  <li className="p-3 w-full bg-[#4b7f9c] rounded-b-md">
                    <button
                      type="button"
                      onClick={() => handleSelectFormule("pomme")}
                      className="w-full px-6 py-2.5 bg-[#f48360] hover:bg-[#ffc55c] rounded-full text-white font-medium text-xs leading-tight uppercase shadow-md transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Commander</span>
                    </button>
                  </li>
                </ul>

                {/* ---------------- CARD 2: FORMULE ORANGE ---------------- */}
                <ul className="bg-white border-2 border-white w-full max-w-[320px] text-white text-center relative shadow-lg rounded-md flex flex-col justify-between mx-auto">
                  {/* Floating Circular Emblem at -top-10 */}
                  <div className="absolute right-0 left-0 -top-10 z-10">
                    <div className="h-20 w-20 mx-auto rounded-full bg-[#ff8f56] flex items-center justify-center border-4 border-white text-white p-3 shadow-md">
                      <img src="/images/pomme-pack.svg" alt="Formule Orange" className="w-12 h-12 object-contain" />
                    </div>
                  </div>

                  <div>
                    {/* Header */}
                    <li className="px-6 py-4 w-full uppercase font-bold text-white text-2xl flex items-center justify-center bg-[#ff8f56] pt-12 rounded-t-md whitespace-nowrap">
                      FORMULE Orange
                    </li>

                    {/* Décès */}
                    <li className="px-4 py-2 text-gray-600 w-full text-base font-bold bg-white">Décès accidentel</li>
                    <li className="px-4 py-2 bg-[#4b7f9c] w-full text-sm font-medium">
                      <div>Capital décès accidentel</div>
                      <div className="font-bold text-base">70 000 DHS</div>
                    </li>

                    {/* Frais Médicaux */}
                    <li className="py-2 px-4 text-gray-600 w-full text-sm font-bold bg-white">
                      Frais medicaux, pharmaceutiques, chirurgicaux et d’hospitalisation
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] border-b border-gray-200/20 w-full text-sm font-medium">
                      <div>Taux de remboursement</div>
                      <div className="font-bold">80%</div>
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] border-b border-gray-200/20 w-full text-sm font-medium">
                      <div>Plafond par an et par assuré</div>
                      <div className="font-bold">50 000 DHS</div>
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] w-full text-sm font-medium">
                      <div>Franchise</div>
                      <div className="font-bold">500 DHS</div>
                    </li>

                    {/* Indemnités */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Indémnités journalières d’hospitalisation
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] w-full text-sm font-medium">
                      <div>Indémnités journalières *</div>
                      <div className="font-bold text-base">300 DHS</div>
                    </li>

                    {/* Prime Annuelle */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Prime annuelle TTC
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] w-full text-sm font-bold">
                      <div className="font-bold text-lg">427.50 DHS</div>
                    </li>

                    {/* Option 1: Assistance */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Assistance
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] w-full text-sm font-medium">
                      <div className="flex justify-center gap-4">
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="orange_assist"
                            checked={orangeOptions.assistance === 120}
                            onChange={() => setOrangeOptions({ ...orangeOptions, assistance: 120 })}
                            className="accent-[#ff8f56] cursor-pointer"
                          />
                          <span>Oui</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="orange_assist"
                            checked={orangeOptions.assistance === 0}
                            onChange={() => setOrangeOptions({ ...orangeOptions, assistance: 0 })}
                            className="accent-[#ff8f56] cursor-pointer"
                          />
                          <span>Non</span>
                        </label>
                      </div>
                    </li>

                    {/* Option 2: Ecoute psy */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Ecoute psychologique
                    </li>
                    <li className="px-6 pt-2 bg-[#4b7f9c] w-full text-xs font-medium">
                      <div>5 séances/accident</div>
                    </li>
                    <li className="px-6 pb-2 bg-[#4b7f9c] w-full text-sm font-medium">
                      <div className="flex justify-center gap-4">
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="orange_ecoute"
                            checked={orangeOptions.ecoute === 150}
                            onChange={() => setOrangeOptions({ ...orangeOptions, ecoute: 150 })}
                            className="accent-[#ff8f56] cursor-pointer"
                          />
                          <span>Oui</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="orange_ecoute"
                            checked={orangeOptions.ecoute === 0}
                            onChange={() => setOrangeOptions({ ...orangeOptions, ecoute: 0 })}
                            className="accent-[#ff8f56] cursor-pointer"
                          />
                          <span>Non</span>
                        </label>
                      </div>
                    </li>

                    {/* Option 3: Conseil juridique */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Conseil juridique
                    </li>
                    <li className="px-6 pt-2 bg-[#4b7f9c] w-full text-xs font-medium">
                      <div>Une consultation / accident</div>
                    </li>
                    <li className="px-6 pb-2 bg-[#4b7f9c] w-full text-sm font-medium">
                      <div className="flex justify-center gap-4">
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="orange_conseil"
                            checked={orangeOptions.conseil === 150}
                            onChange={() => setOrangeOptions({ ...orangeOptions, conseil: 150 })}
                            className="accent-[#ff8f56] cursor-pointer"
                          />
                          <span>Oui</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="orange_conseil"
                            checked={orangeOptions.conseil === 0}
                            onChange={() => setOrangeOptions({ ...orangeOptions, conseil: 0 })}
                            className="accent-[#ff8f56] cursor-pointer"
                          />
                          <span>Non</span>
                        </label>
                      </div>
                    </li>

                    {/* Total Options */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Prix total des options
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] w-full text-base font-bold">
                      <div>{orangeOptionTotal.toFixed(2)} DHS TTC</div>
                    </li>

                    {/* Prime Totale */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Prime totale
                    </li>
                    <li className="px-6 py-3 w-full text-gray-700 text-2xl font-bold bg-white">
                      <div>{orangeTotal.toFixed(2)} DHS TTC</div>
                    </li>
                  </div>

                  {/* Commander Button */}
                  <li className="p-3 w-full bg-[#4b7f9c] rounded-b-md">
                    <button
                      type="button"
                      onClick={() => handleSelectFormule("orange")}
                      className="w-full px-6 py-2.5 bg-[#f48360] hover:bg-[#e46e4e] rounded-full text-white font-medium text-xs leading-tight uppercase shadow-md transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Commander</span>
                    </button>
                  </li>
                </ul>

                {/* ---------------- CARD 3: FORMULE KIWI ---------------- */}
                <ul className="bg-white border-2 border-white w-full max-w-[320px] text-white text-center relative shadow-lg rounded-md flex flex-col justify-between mx-auto">
                  {/* Floating Circular Emblem at -top-10 */}
                  <div className="absolute right-0 left-0 -top-10 z-10">
                    <div className="h-20 w-20 mx-auto rounded-full bg-[#a1c673] flex items-center justify-center border-4 border-white text-white p-3 shadow-md">
                      <span className="font-extrabold text-2xl">🥝</span>
                    </div>
                  </div>

                  <div>
                    {/* Header */}
                    <li className="px-6 py-4 w-full uppercase font-bold text-white text-2xl flex items-center justify-center bg-[#a1c673] pt-12 rounded-t-md whitespace-nowrap">
                      FORMULE KIWI
                    </li>

                    {/* Décès */}
                    <li className="px-4 py-2 text-gray-600 w-full text-base font-bold bg-white">Décès accidentel</li>
                    <li className="px-4 py-2 bg-[#4b7f9c] w-full text-sm font-medium">
                      <div>Capital décès accidentel</div>
                      <div className="font-bold text-base">150 000 DHS</div>
                    </li>

                    {/* Frais Médicaux */}
                    <li className="py-2 px-4 text-gray-600 w-full text-sm font-bold bg-white">
                      Frais medicaux, pharmaceutiques, chirurgicaux et d’hospitalisation
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] border-b border-gray-200/20 w-full text-sm font-medium">
                      <div>Taux de remboursement</div>
                      <div className="font-bold">80%</div>
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] border-b border-gray-200/20 w-full text-sm font-medium">
                      <div>Plafond par an et par assuré</div>
                      <div className="font-bold">100 000 DHS</div>
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] w-full text-sm font-medium">
                      <div>Franchise</div>
                      <div className="font-bold">500 DHS</div>
                    </li>

                    {/* Indemnités */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Indémnités journalières d’hospitalisation
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] w-full text-sm font-medium">
                      <div>Indémnités journalières *</div>
                      <div className="font-bold text-base">450 DHS</div>
                    </li>

                    {/* Prime Annuelle */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Prime annuelle TTC
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] w-full text-sm font-bold">
                      <div className="font-bold text-lg">738.50 DHS</div>
                    </li>

                    {/* Option 1: Assistance */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Assistance
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] w-full text-sm font-medium">
                      <div className="flex justify-center gap-4">
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="kiwi_assist"
                            checked={kiwiOptions.assistance === 120}
                            onChange={() => setKiwiOptions({ ...kiwiOptions, assistance: 120 })}
                            className="accent-[#a1c673] cursor-pointer"
                          />
                          <span>Oui</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="kiwi_assist"
                            checked={kiwiOptions.assistance === 0}
                            onChange={() => setKiwiOptions({ ...kiwiOptions, assistance: 0 })}
                            className="accent-[#a1c673] cursor-pointer"
                          />
                          <span>Non</span>
                        </label>
                      </div>
                    </li>

                    {/* Option 2: Ecoute psy */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Ecoute psychologique
                    </li>
                    <li className="px-6 pt-2 bg-[#4b7f9c] w-full text-xs font-medium">
                      <div>10 séances/accident</div>
                    </li>
                    <li className="px-6 pb-2 bg-[#4b7f9c] w-full text-sm font-medium">
                      <div className="flex justify-center gap-4">
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="kiwi_ecoute"
                            checked={kiwiOptions.ecoute === 204}
                            onChange={() => setKiwiOptions({ ...kiwiOptions, ecoute: 204 })}
                            className="accent-[#a1c673] cursor-pointer"
                          />
                          <span>Oui</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="kiwi_ecoute"
                            checked={kiwiOptions.ecoute === 0}
                            onChange={() => setKiwiOptions({ ...kiwiOptions, ecoute: 0 })}
                            className="accent-[#a1c673] cursor-pointer"
                          />
                          <span>Non</span>
                        </label>
                      </div>
                    </li>

                    {/* Option 3: Conseil juridique */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Conseil juridique
                    </li>
                    <li className="px-6 pt-2 bg-[#4b7f9c] w-full text-xs font-medium">
                      <div>Une consultation / accident</div>
                    </li>
                    <li className="px-6 pb-2 bg-[#4b7f9c] w-full text-sm font-medium">
                      <div className="flex justify-center gap-4">
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="kiwi_conseil"
                            checked={kiwiOptions.conseil === 204}
                            onChange={() => setKiwiOptions({ ...kiwiOptions, conseil: 204 })}
                            className="accent-[#a1c673] cursor-pointer"
                          />
                          <span>Oui</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="kiwi_conseil"
                            checked={kiwiOptions.conseil === 0}
                            onChange={() => setKiwiOptions({ ...kiwiOptions, conseil: 0 })}
                            className="accent-[#a1c673] cursor-pointer"
                          />
                          <span>Non</span>
                        </label>
                      </div>
                    </li>

                    {/* Total Options */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Prix total des options
                    </li>
                    <li className="px-6 py-2 bg-[#4b7f9c] w-full text-base font-bold">
                      <div>{kiwiOptionTotal.toFixed(2)} DHS TTC</div>
                    </li>

                    {/* Prime Totale */}
                    <li className="px-6 py-2 text-gray-600 w-full text-base font-bold bg-white">
                      Prime totale
                    </li>
                    <li className="px-6 py-3 w-full text-gray-700 text-2xl font-bold bg-white">
                      <div>{kiwiTotal.toFixed(2)} DHS TTC</div>
                    </li>
                  </div>

                  {/* Commander Button */}
                  <li className="p-3 w-full bg-[#4b7f9c] rounded-b-md">
                    <button
                      type="button"
                      onClick={() => handleSelectFormule("kiwi")}
                      className="w-full px-6 py-2.5 bg-[#f48360] hover:bg-[#e46e4e] rounded-full text-white font-medium text-xs leading-tight uppercase shadow-md transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Commander</span>
                    </button>
                  </li>
                </ul>
              </div>

              {/* Regulatory CNDP text */}
              <div className="text-center text-xs text-slate-500 max-w-2xl mx-auto my-6 px-4">
                Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification et d'opposition au traitement de vos données personnelles. 
                Ce traitement a été autorisé par la CNDP sous le numéro : <strong>A-GC-232/2023</strong>.
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* ÉTAPE 2: ASSURÉ, QUESTIONNAIRE, CONTRAT & BÉNÉFICIAIRES        */}
          {/* ============================================================== */}
          {step === 2 && (
            <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in duration-300">
              <h2 className="text-xl md:text-3xl font-semibold tracking-tight leading-tight mb-8 text-slate-800">
                Renseignez vos informations afin de recevoir votre devis
              </h2>

              {/* Section 1: Client */}
              <div className="uppercase text-xl border-l-4 border-[#f48360] font-bold text-gray-500 pl-3 mb-6">
                Client
              </div>

              {/* Row 1: Nom & Prenom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="bg-gray-200 rounded-full p-1.5 flex space-x-1 items-center">
                    <div className="w-9 h-9 p-2 bg-[#f48360] text-white rounded-full flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="Nom*"
                      value={prospect.nom}
                      onChange={e => setProspect({ ...prospect, nom: e.target.value })}
                      className="p-2 bg-transparent border-0 flex-1 rounded-r-full text-neutral-700 outline-none text-sm font-medium"
                    />
                  </div>
                  {errors.nom && <div className="text-red-400 pt-1 pl-4 text-xs">{errors.nom}</div>}
                </div>

                <div>
                  <div className="bg-gray-200 rounded-full p-1.5 flex space-x-1 items-center">
                    <div className="w-9 h-9 p-2 bg-[#f48360] text-white rounded-full flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="Prénom*"
                      value={prospect.prenom}
                      onChange={e => setProspect({ ...prospect, prenom: e.target.value })}
                      className="p-2 bg-transparent border-0 flex-1 rounded-r-full text-neutral-700 outline-none text-sm font-medium"
                    />
                  </div>
                  {errors.prenom && <div className="text-red-400 pt-1 pl-4 text-xs">{errors.prenom}</div>}
                </div>
              </div>

              {/* Row 2: Téléphone & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="bg-gray-200 rounded-full p-1.5 flex space-x-1 items-center">
                    <div className="w-9 h-9 p-2 bg-[#f48360] text-white rounded-full flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      placeholder="Téléphone*"
                      value={prospect.telephone}
                      onChange={e => setProspect({ ...prospect, telephone: e.target.value })}
                      className="p-2 bg-transparent border-0 flex-1 rounded-r-full text-neutral-700 outline-none text-sm font-medium"
                    />
                  </div>
                  {errors.telephone && <div className="text-red-400 pt-1 pl-4 text-xs">{errors.telephone}</div>}
                </div>

                <div>
                  <div className="bg-gray-200 rounded-full p-1.5 flex space-x-1 items-center">
                    <div className="w-9 h-9 p-2 bg-[#f48360] text-white rounded-full flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      placeholder="Email*"
                      value={prospect.email}
                      onChange={e => setProspect({ ...prospect, email: e.target.value })}
                      className="p-2 bg-transparent border-0 flex-1 rounded-r-full text-neutral-700 outline-none text-sm font-medium"
                    />
                  </div>
                  {errors.email && <div className="text-red-400 pt-1 pl-4 text-xs">{errors.email}</div>}
                </div>
              </div>

              {/* Row 3: CIN & Date de naissance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="bg-gray-200 rounded-full p-1.5 flex space-x-1 items-center">
                    <div className="w-9 h-9 p-2 bg-[#f48360] text-white rounded-full flex items-center justify-center shrink-0">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="CIN*"
                      value={prospect.cin}
                      onChange={e => setProspect({ ...prospect, cin: e.target.value.toUpperCase() })}
                      className="p-2 bg-transparent border-0 flex-1 rounded-r-full text-neutral-700 outline-none text-sm font-medium"
                    />
                  </div>
                  {errors.cin && <div className="text-red-400 pt-1 pl-4 text-xs">{errors.cin}</div>}
                </div>

                <div>
                  <div className="bg-gray-200 rounded-full p-1.5 flex space-x-2 items-center relative">
                    <div className="w-9 h-9 p-2 bg-[#f48360] text-white rounded-full flex items-center justify-center shrink-0">
                      <CalendarIcon className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-neutral-500 hidden sm:inline">Date de naissance :</span>
                    <input
                      type="date"
                      value={prospect.dateNaissance}
                      onChange={e => setProspect({ ...prospect, dateNaissance: e.target.value })}
                      className="p-2 bg-transparent border-0 flex-1 text-neutral-700 rounded-r-full outline-none text-sm font-medium"
                    />
                  </div>
                  {errors.dateNaissance && <div className="text-red-400 pt-1 pl-4 text-xs">{errors.dateNaissance}</div>}
                </div>
              </div>

              {/* Row 4: Adresse postale & Profession */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                  <div className="bg-gray-200 rounded-full p-1.5 flex space-x-1 items-center">
                    <div className="w-9 h-9 p-2 bg-[#f48360] text-white rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="Adresse postale*"
                      value={prospect.adresse}
                      onChange={e => setProspect({ ...prospect, adresse: e.target.value })}
                      className="p-2 bg-transparent border-0 flex-1 rounded-r-full text-neutral-700 outline-none text-sm font-medium"
                    />
                  </div>
                  {errors.adresse && <div className="text-red-400 pt-1 pl-4 text-xs">{errors.adresse}</div>}
                </div>

                <div>
                  <div className="bg-gray-200 rounded-full p-1.5 flex space-x-1 items-center">
                    <div className="w-9 h-9 p-2 bg-[#f48360] text-white rounded-full flex items-center justify-center shrink-0">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="Profession/activité*"
                      value={prospect.profession}
                      onChange={e => setProspect({ ...prospect, profession: e.target.value })}
                      className="p-2 bg-transparent border-0 flex-1 rounded-r-full text-neutral-700 outline-none text-sm font-medium"
                    />
                  </div>
                  {errors.profession && <div className="text-red-400 pt-1 pl-4 text-xs">{errors.profession}</div>}
                </div>
              </div>

              {/* Section 2: Questionnaire Médical / Risque */}
              <div className="uppercase text-xl border-l-4 border-[#f48360] font-bold text-gray-500 pl-3 my-6">
                Questionnaire Médical & Risques
              </div>

              <div className="space-y-4 mb-8">
                {/* Q1 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-base font-semibold text-gray-600">
                    Êtes-vous atteint d’une maladie grave ?
                  </div>
                  <div className="flex gap-4 items-center">
                    <label className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="maladie"
                        checked={maladieGrave === "oui"}
                        onChange={() => setMaladieGrave("oui")}
                        className="accent-[#f48360]"
                      />
                      <span>Oui</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="maladie"
                        checked={maladieGrave === "non"}
                        onChange={() => setMaladieGrave("non")}
                        className="accent-[#f48360]"
                      />
                      <span>Non</span>
                    </label>
                  </div>
                </div>

                {/* Q2 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-base font-semibold text-gray-600">
                    Êtes-vous atteint d’une infirmité totale ou partielle ?
                  </div>
                  <div className="flex gap-4 items-center">
                    <label className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="infirme"
                        checked={infirme === "oui"}
                        onChange={() => setInfirme("oui")}
                        className="accent-[#f48360]"
                      />
                      <span>Oui</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="infirme"
                        checked={infirme === "non"}
                        onChange={() => setInfirme("non")}
                        className="accent-[#f48360]"
                      />
                      <span>Non</span>
                    </label>
                  </div>
                </div>

                {/* Q3 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-base font-semibold text-gray-600">
                    Pratiquez-vous un sport dangereux ?
                  </div>
                  <div className="flex gap-4 items-center">
                    <label className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="sport_danger"
                        checked={sportDanger === "oui"}
                        onChange={() => setSportDanger("oui")}
                        className="accent-[#f48360]"
                      />
                      <span>Oui</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="sport_danger"
                        checked={sportDanger === "non"}
                        onChange={() => setSportDanger("non")}
                        className="accent-[#f48360]"
                      />
                      <span>Non</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Section 3: Contrat */}
              <div className="uppercase text-xl border-l-4 border-[#f48360] font-bold text-gray-500 pl-3 my-6">
                Contrat
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-200 rounded-full p-1.5 flex space-x-2 items-center">
                  <div className="w-9 h-9 p-2 bg-[#f48360] text-white rounded-full flex items-center justify-center shrink-0">
                    <CalendarIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-neutral-500">Date de début du contrat :</span>
                  <input
                    type="date"
                    value={debut}
                    onChange={e => setDebut(e.target.value)}
                    className="p-2 bg-transparent border-0 flex-1 text-neutral-700 rounded-r-full outline-none text-sm font-medium"
                  />
                </div>
              </div>

              {/* Section 4: Bénéficiaires */}
              <div className="flex items-center justify-between my-6">
                <div className="uppercase text-xl border-l-4 border-[#f48360] font-bold text-gray-500 pl-3">
                  BÉNÉFICIAIRES EN CAS DE DÉCÈS
                </div>
                <button
                  type="button"
                  onClick={handleAddProche}
                  className="text-3xl text-[#4b7f9c] hover:text-[#388a9a] transition cursor-pointer"
                  title="Ajouter un bénéficiaire"
                >
                  <Plus className="w-8 h-8" />
                </button>
              </div>

              <div className="space-y-4 mb-8">
                {proches.map((p, idx) => (
                  <div key={idx} className="flex flex-wrap items-center gap-3">
                    <div className="flex-1 min-w-[200px]">
                      <div className="bg-gray-200 rounded-full p-1.5 flex space-x-1 items-center">
                        <div className="w-8 h-8 p-1.5 bg-[#f48360] text-white rounded-full flex items-center justify-center shrink-0">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="text"
                          placeholder="Nom*"
                          value={p.nom}
                          onChange={e => handleUpdateProche(idx, "nom", e.target.value)}
                          className="p-2 bg-transparent border-0 flex-1 rounded-r-full text-neutral-700 outline-none text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="bg-gray-200 rounded-full p-1.5 flex space-x-1 items-center">
                        <div className="w-8 h-8 p-1.5 bg-[#f48360] text-white rounded-full flex items-center justify-center shrink-0">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="text"
                          placeholder="Prénom*"
                          value={p.prenom}
                          onChange={e => handleUpdateProche(idx, "prenom", e.target.value)}
                          className="p-2 bg-transparent border-0 flex-1 rounded-r-full text-neutral-700 outline-none text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-[220px] flex items-center gap-2">
                      <div className="bg-gray-200 rounded-full p-1.5 flex space-x-1 items-center flex-1">
                        <div className="w-8 h-8 p-1.5 bg-[#f48360] text-white rounded-full flex items-center justify-center shrink-0">
                          <CalendarIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs text-neutral-500 hidden sm:inline">Né(e) le :</span>
                        <input
                          type="date"
                          value={p.dateNaissance}
                          onChange={e => handleUpdateProche(idx, "dateNaissance", e.target.value)}
                          className="p-2 bg-transparent border-0 flex-1 text-neutral-700 rounded-r-full outline-none text-sm font-medium"
                        />
                      </div>

                      {proches.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveProche(idx)}
                          className="text-red-400 hover:text-red-600 transition p-2 cursor-pointer"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* CGU Consent */}
              <div className="pt-4 border-t border-slate-100 mb-6">
                <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-500">
                  <input
                    type="checkbox"
                    checked={cgu}
                    onChange={e => setCgu(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#f48360] accent-[#f48360]"
                  />
                  <span>
                    j'ai lu et j'accepte les{" "}
                    <Link href="/mentions-legales" className="font-bold text-slate-800 underline">
                      conditions générales
                    </Link>{" "}
                    d'utilisation notamment la mention relative à la protection des données personnelles (Autorisation CNDP N° A-GC-232/2023).
                  </span>
                </label>
                {errors.cgu && <div className="text-red-400 pt-1 text-xs">{errors.cgu}</div>}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="btn text-white gap-2 px-6 py-2.5 rounded-full bg-[#4b7f9c] hover:bg-cyan-700 transition flex items-center font-bold text-sm cursor-pointer shadow-md"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Précédent</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="btn text-white gap-2 px-8 py-2.5 rounded-full bg-[#f48360] hover:bg-orange-600 transition flex items-center font-bold text-sm cursor-pointer shadow-md shadow-orange-200"
                >
                  <span>Suivant</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* ÉTAPE 3: CONFIRMATION & DOCUMENTS (Standard Auto & Moto)       */}
          {/* ============================================================== */}
          {step === 3 && (
            <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200 text-center animate-in zoom-in-95 duration-200 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <h2 className="text-2xl md:text-3xl font-black uppercase text-[#153954]">
                Félicitations, votre devis est prêt !
              </h2>

              <div className="max-w-2xl mx-auto text-slate-600 text-sm md:text-base leading-relaxed space-y-2">
                <p>
                  Votre devis Digiassur Individuelle Accident <strong>N° DA-{Math.floor(100000 + Math.random() * 900000)}</strong> a été généré avec succès.
                </p>
                <p>
                  Une copie détaillée a été envoyée à l'adresse <strong>{prospect.email || "votre adresse email"}</strong> et nos conseillers vont vous joindre au <strong>{prospect.telephone || "votre numéro"}</strong>.
                </p>
                <p className="text-xs text-slate-400">
                  Afin d'accélérer l'émission immédiate de votre attestation d'assurance, vous pouvez nous transmettre vos pièces justificatives dès maintenant.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#fef1eb] p-6 rounded-2xl border border-orange-200 text-left max-w-xl mx-auto text-sm shadow-xs">
                <div className="flex items-center justify-between border-b border-orange-200/70 pb-3 mb-3">
                  <div>
                    <span className="text-xs uppercase text-orange-800 font-bold tracking-wider">Formule</span>
                    <div className="text-lg font-extrabold text-[#153954]">
                      FORMULE {formule.toUpperCase()}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs uppercase text-orange-800 font-bold tracking-wider">Prime Annuelle TTC</span>
                    <div className="text-xl font-extrabold text-[#f48360]">
                      {currentTotal} DHS
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-slate-700 text-xs">
                  <div>
                    <span className="text-slate-500 block">Assuré :</span>
                    <strong>{prospect.prenom} {prospect.nom}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Téléphone :</span>
                    <strong>{prospect.telephone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Capital décès :</span>
                    <strong className="text-emerald-700">{currentCapital}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Date d'effet :</span>
                    <strong>{debut}</strong>
                  </div>
                </div>
              </div>

              {/* Document Requis pour l'Accident : Juste CIN Recto et Verso */}
              <div className="pt-4 text-left border-t border-slate-100">
                <div className="mb-4 text-center sm:text-left">
                  <h3 className="text-base font-bold text-slate-800 flex items-center justify-center sm:justify-start gap-2">
                    <Upload className="w-4 h-4 text-[#f48360]" />
                    <span>Pièce justificative requise</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Téléversez votre carte d'identité (CIN) recto et verso pour valider l'émission immédiate de votre contrat garantie accident.
                  </p>
                </div>

                <div className="max-w-xl mx-auto bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-sm text-[#153954] mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#f48360]" />
                    <span>Carte d'Identité Nationale (CIN)</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">CIN RECTO</label>
                      <label className="border border-dashed border-slate-300 rounded-lg p-2.5 flex items-center justify-between cursor-pointer hover:bg-white text-xs transition">
                        <span className="truncate max-w-[140px] text-slate-600">
                          {uploadedFiles["cin_recto"]?.name || "Parcourir le fichier..."}
                        </span>
                        <input type="file" className="hidden" onChange={e => handleFileUpload("cin_recto", e)} />
                        <Upload className="w-4 h-4 text-[#f48360]" />
                      </label>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">CIN VERSO</label>
                      <label className="border border-dashed border-slate-300 rounded-lg p-2.5 flex items-center justify-between cursor-pointer hover:bg-white text-xs transition">
                        <span className="truncate max-w-[140px] text-slate-600">
                          {uploadedFiles["cin_verso"]?.name || "Parcourir le fichier..."}
                        </span>
                        <input type="file" className="hidden" onChange={e => handleFileUpload("cin_verso", e)} />
                        <Upload className="w-4 h-4 text-[#f48360]" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Space Between */}
              <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
                <Link
                  href="/accident"
                  className="px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 shadow-xs inline-flex items-center gap-2 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour à la page Accident</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    const count = Object.keys(uploadedFiles).length;
                    if (count === 0) {
                      alert("Veuillez sélectionner au moins un document avant d'envoyer.");
                    } else {
                      alert(`${count} document(s) transmis avec succès à nos équipes Digiassur.`);
                    }
                  }}
                  className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#f48360] hover:bg-orange-600 text-white shadow-lg inline-flex items-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer mes documents</span>
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Partners Section */}
        <div className="mt-12">
          <PartnersSection />
        </div>
      </main>

      <FloatingWidgets />
      <DigiassurFooter />
    </div>
  );
}
