import { useState, useMemo } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import { 
  PiggyBank, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  TrendingUp, 
  PhoneCall,
  Check
} from "lucide-react";
import { Link } from "wouter";
import { MOROCCAN_CITIES } from "@/data/motoBrands";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EpargneDevisPage() {
  const { language, isRTL, t } = useLanguage();
  const [step, setStep] = useState<number>(1);
  const [monthlyAmount, setMonthlyAmount] = useState<number>(2000);
  const [durationYears, setDurationYears] = useState<number>(10);
  
  const [formData, setFormData] = useState({
    nom: "Koulouch",
    prenom: "Youssef",
    telephone: "+212 675 289 966",
    email: "youssefkoulouch@gmail.com",
    cin: "BE123456",
    dateNaissance: "1988-06-15",
    ville: "Casablanca",
    adresse: "27 Rue Ain Asserdoune CIL",
    typeEpargne: "Épargne Projet (Acquisition, Voyage, Investissement)",
    cgu: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Exact compound calculation (4.5% annual rate)
  const projection = useMemo(() => {
    const r = 0.045; // 4.5%
    const i = r / 12;
    const n = durationYears * 12;
    const totalDeposits = monthlyAmount * n;
    const futureValue = monthlyAmount * ((Math.pow(1 + i, n) - 1) / i);
    const interests = Math.max(0, futureValue - totalDeposits);
    const annualRente = Math.round(futureValue / 10);

    return {
      months: n,
      totalDeposits: Math.round(totalDeposits),
      futureValue: Math.round(futureValue),
      interests: Math.round(interests),
      annualRente,
    };
  }, [monthlyAmount, durationYears]);

  const formatDhs = (num: number) => {
    const formatted = num.toLocaleString(language === "ar" ? "ar-MA" : "fr-FR");
    if (language === "ar") return `${formatted} درهم`;
    if (language === "en") return `${formatted} MAD`;
    return `${formatted} DHS`;
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.nom.trim()) errs.nom = t("common.lastName") + " *";
    if (!formData.prenom.trim()) errs.prenom = t("common.firstName") + " *";
    if (!formData.telephone.trim()) errs.telephone = t("common.phone") + " *";
    if (!formData.email.trim()) errs.email = t("common.email") + " *";
    if (!formData.cgu) errs.cgu = t("common.cguRequired", "Veuillez accepter les CGU");
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className={`min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-[#f48360] selection:text-white ${isRTL ? "text-right" : "text-left"}`}>
      <DigiassurHeader />

      <main className="flex-1 pt-[116px] pb-16">
        {/* Banner Top */}
        <div className="bg-[#4b7f9c] text-white py-8 border-b border-[#3d6880]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 bg-white/20 rounded-full text-white">
                <PiggyBank className="w-4 h-4" />
              </span>
              <span className="text-xs uppercase tracking-wider text-cyan-200 font-semibold">
                {t("epargne.title", "Simulateur & Devis Assurance Épargne")}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-1">
              {t("epargne.heroTitle", "Assurez-vous une épargne confortable pour réaliser vos projets")}
            </h1>
            <p className="text-sm text-cyan-100 mt-2 max-w-2xl">
              {t("epargne.subtitle", "Ajustez vos mensualités en direct, découvrez votre capital projeté avec intérêts et recevez votre devis sur-mesure sans engagement.")}
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-6xl mx-auto px-6 mt-8">
          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Form Card (7 Cols) */}
              <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in duration-300">
                <form onSubmit={handleNext} className="space-y-6">
                  {/* Coordonnées en grille */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nom */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        {t("common.lastName", "Nom")} *
                      </label>
                      <div className="relative">
                        <div className={`absolute inset-y-0 ${isRTL ? "right-0 pr-3.5" : "left-0 pl-3.5"} flex items-center pointer-events-none text-slate-400`}>
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          className={`w-full ${isRTL ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"} py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f48360] focus:bg-white transition`}
                          placeholder={t("common.lastName", "Nom")}
                          value={formData.nom}
                          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        />
                      </div>
                      {errors.nom && <div className="text-red-500 pt-1 text-xs">{errors.nom}</div>}
                    </div>

                    {/* Prénom */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        {t("common.firstName", "Prénom")} *
                      </label>
                      <div className="relative">
                        <div className={`absolute inset-y-0 ${isRTL ? "right-0 pr-3.5" : "left-0 pl-3.5"} flex items-center pointer-events-none text-slate-400`}>
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          className={`w-full ${isRTL ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"} py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f48360] focus:bg-white transition`}
                          placeholder={t("common.firstName", "Prénom")}
                          value={formData.prenom}
                          onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                        />
                      </div>
                      {errors.prenom && <div className="text-red-500 pt-1 text-xs">{errors.prenom}</div>}
                    </div>

                    {/* Téléphone */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        {t("common.phone", "Téléphone")} *
                      </label>
                      <div className="relative">
                        <div className={`absolute inset-y-0 ${isRTL ? "right-0 pr-3.5" : "left-0 pl-3.5"} flex items-center pointer-events-none text-slate-400`}>
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          className={`w-full ${isRTL ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"} py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f48360] focus:bg-white transition`}
                          placeholder="06 XX XX XX XX"
                          value={formData.telephone}
                          onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                          dir="ltr"
                        />
                      </div>
                      {errors.telephone && <div className="text-red-500 pt-1 text-xs">{errors.telephone}</div>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        {t("common.email", "Email")} *
                      </label>
                      <div className="relative">
                        <div className={`absolute inset-y-0 ${isRTL ? "right-0 pr-3.5" : "left-0 pl-3.5"} flex items-center pointer-events-none text-slate-400`}>
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          className={`w-full ${isRTL ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"} py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f48360] focus:bg-white transition`}
                          placeholder="exemple@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          dir="ltr"
                        />
                      </div>
                      {errors.email && <div className="text-red-500 pt-1 text-xs">{errors.email}</div>}
                    </div>
                  </div>

                  {/* Type d'épargne */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      {t("epargne.savingType", "Type d'épargne souhaité *")}
                    </label>
                    <div className="relative">
                      <div className={`absolute inset-y-0 ${isRTL ? "right-0 pr-3.5" : "left-0 pl-3.5"} flex items-center pointer-events-none text-slate-400`}>
                        <PiggyBank className="w-4 h-4 text-[#f48360]" />
                      </div>
                      <select
                        className={`w-full ${isRTL ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"} py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#f48360] focus:bg-white transition`}
                        value={formData.typeEpargne}
                        onChange={(e) => setFormData({ ...formData, typeEpargne: e.target.value })}
                      >
                        <option value="Épargne Projet (Acquisition, Voyage, Investissement)">
                          {t("epargne.projectSaving", "Épargne Projet (Acquisition, Voyage, Investissement)")}
                        </option>
                        <option value="Épargne Retraite (Complément de revenu à la retraite)">
                          {t("epargne.retirementSaving", "Épargne Retraite (Complément de revenu à la retraite)")}
                        </option>
                        <option value="Épargne Éducation Enfants (Études supérieures garanties)">
                          {t("epargne.educationSaving", "Épargne Éducation Enfants (Études supérieures garanties)")}
                        </option>
                        <option value="Capitalisation & Sécurité (Fonds garantis & fiscalité avantageuse)">
                          {t("epargne.capitalizationSaving", "Capitalisation & Sécurité (Fonds garantis & fiscalité avantageuse)")}
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Sliders Section */}
                  <div className="space-y-4 pt-2">
                    {/* Slider 1: Capacité d'épargne mensuelle */}
                    <div className="p-4 rounded-xl border border-orange-200/80 bg-orange-50/30">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          {t("epargne.monthlyCapacity", "Capacité d'épargne mensuelle")}
                        </span>
                        <div className="px-3.5 py-1 bg-white border border-[#f48360] text-[#f48360] rounded-full font-bold text-sm shadow-2xs" dir="ltr">
                          {monthlyAmount.toLocaleString(language === "ar" ? "ar-MA" : "fr-FR")} {t("common.dhsMonth", "DHS / mois")}
                        </div>
                      </div>

                      <input
                        type="range"
                        min="200"
                        max="10000"
                        step="100"
                        value={monthlyAmount}
                        onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#f48360]"
                        dir="ltr"
                      />

                      <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium" dir="ltr">
                        <span>200 DHS</span>
                        <span>2 500 DHS</span>
                        <span>5 000 DHS</span>
                        <span>10 000 DHS</span>
                      </div>
                    </div>

                    {/* Slider 2: Durée de placement envisagée */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          {t("epargne.durationEnvisaged", "Durée de placement envisagée")}
                        </span>
                        <div className="px-3.5 py-1 bg-white border border-slate-300 text-slate-800 rounded-full font-bold text-sm shadow-2xs" dir="ltr">
                          {durationYears} {t("epargne.yearsCount", "ans")} ({durationYears * 12} {t("epargne.monthsCount", "mois")})
                        </div>
                      </div>

                      <input
                        type="range"
                        min="3"
                        max="30"
                        step="1"
                        value={durationYears}
                        onChange={(e) => setDurationYears(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4b7f9c]"
                        dir="ltr"
                      />

                      <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium" dir="ltr">
                        <span>3 ans</span>
                        <span>10 ans</span>
                        <span>20 ans</span>
                        <span>30 ans</span>
                      </div>
                    </div>
                  </div>

                  {/* Ville & Compléments en détails */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        {t("common.city", "Ville")}
                      </label>
                      <select
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f48360]"
                        value={formData.ville}
                        onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                      >
                        {MOROCCAN_CITIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        {t("common.cin", "N° CIN")}
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: BE123456"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f48360]"
                        value={formData.cin}
                        onChange={(e) => setFormData({ ...formData, cin: e.target.value.toUpperCase() })}
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* CGU */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.cgu}
                        onChange={(e) => setFormData({ ...formData, cgu: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded accent-[#f48360]"
                      />
                      <span className="text-xs text-slate-500 leading-snug">
                        {t("common.cguNotice", "J'ai lu et j'accepte les conditions générales d'utilisation notamment la mention relative à la protection des données personnelles.")}
                      </span>
                    </label>
                    {errors.cgu && <div className="text-red-500 text-xs mt-1">{errors.cgu}</div>}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#f48360] hover:bg-[#e46e4e] text-white rounded-xl font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm"
                    >
                      <span>{t("common.getMyQuote", "Obtenir mon devis épargne")}</span>
                      <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Dark Live Estimation Card & Support (5 Cols) */}
              <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
                {/* Dark Navy Live Estimation Card */}
                <div className="bg-[#0e2a3f] text-white p-6 md:p-7 rounded-2xl shadow-xl border border-[#1b3d57] relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#f48360]/10 rounded-full blur-2xl pointer-events-none" />

                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-[#f48360] flex items-center justify-center text-white shrink-0">
                        <TrendingUp className="w-3 h-3" />
                      </div>
                      <span>{t("epargne.liveEstimation", "Estimation en direct")}</span>
                    </div>
                    <span className="px-2.5 py-1 bg-white/10 text-cyan-200 text-[11px] font-semibold rounded-full border border-white/10">
                      {t("epargne.indicativeRate", "Taux indicatif : 4.5%")}
                    </span>
                  </div>

                  {/* Big Number Display */}
                  <div className="mb-6">
                    <div className="text-xs uppercase text-slate-300 font-medium tracking-wide mb-1">
                      {t("epargne.projectedCapital", "Capital net projeté au terme")}
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#f48360] tracking-tight">
                      {formatDhs(projection.futureValue)}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {t("epargne.annualIncomeEquiv", "Soit")} {formatDhs(projection.annualRente)} {t("common.dhsYear", "par an")}
                    </div>
                  </div>

                  {/* Breakdown metrics */}
                  <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>{t("epargne.totalContributions", "Total de vos versements :")}</span>
                      <strong className="text-white font-bold">{formatDhs(projection.totalDeposits)}</strong>
                    </div>

                    <div className="flex justify-between items-center text-slate-300">
                      <span>{t("epargne.estimatedGains", "Intérêts & plus-values estimés :")}</span>
                      <strong className="text-[#34d399] font-bold">+{formatDhs(projection.interests)}</strong>
                    </div>

                    <div className="flex justify-between items-center text-slate-300">
                      <span>{t("epargne.paymentFrequency", "Fréquence des versements :")}</span>
                      <strong className="text-white font-bold">
                        {t("epargne.monthlyFrequency", "Mensuelle")} ({formatDhs(monthlyAmount)})
                      </strong>
                    </div>
                  </div>

                  {/* Guarantee banner */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-start gap-2.5 text-[11px] text-slate-300 leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      {t("common.partnerGuaranteed", "Fonds sécurisé et garanti par nos compagnies partenaires agréées (AXA, Allianz, RMA, Sanlam).")}
                    </span>
                  </div>
                </div>

                {/* Quick Advice Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-50 text-[#f48360] flex items-center justify-center shrink-0">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-800">
                      {t("common.immediateAdvice", "Besoin d'un conseil immédiat ?")}
                    </div>
                    <p className="text-xs text-slate-500">
                      {t("common.adviceSchedule", "Nos experts répondent à vos questions du lundi au vendredi.")}
                    </p>
                    <a
                      href="tel:+212522368182"
                      className="text-sm font-bold text-[#f48360] hover:underline inline-block mt-0.5"
                      dir="ltr"
                    >
                      (+212) 522 36 81 82
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-2xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">
                {t("common.congratulations", "Félicitations")} {formData.prenom} {formData.nom} !
              </h2>
              <p className="text-slate-600 mb-6 text-sm md:text-base">
                {t("common.partnerGuaranteed", "Votre demande a bien été enregistrée.")}
              </p>

              {/* Résumé de l'estimation */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left mb-6 text-xs md:text-sm space-y-2" dir={isRTL ? "rtl" : "ltr"}>
                <div className="font-bold text-slate-700 border-b pb-2 flex items-center justify-between">
                  <span>{t("epargne.title", "Synthèse de votre simulation")}</span>
                  <span className="text-[#f48360] font-bold">{formatDhs(projection.futureValue)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{t("common.fullName", "Souscripteur")} :</span>
                  <span className="font-semibold text-slate-800">{formData.nom} {formData.prenom}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{t("common.phone", "Téléphone")} :</span>
                  <span className="font-semibold text-slate-800" dir="ltr">{formData.telephone}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{t("epargne.monthlyCapacity", "Versement mensuel")} :</span>
                  <span className="font-semibold text-slate-800">{formatDhs(monthlyAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{t("epargne.durationEnvisaged", "Durée")} :</span>
                  <span className="font-semibold text-slate-800">{durationYears} {t("epargne.yearsCount", "ans")} ({projection.months} {t("epargne.monthsCount", "mois")})</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{t("epargne.totalContributions", "Total versements")} :</span>
                  <span className="font-semibold text-slate-800">{formatDhs(projection.totalDeposits)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{t("epargne.estimatedGains", "Plus-values estimées")} :</span>
                  <span className="font-semibold text-emerald-600 font-bold">+{formatDhs(projection.interests)}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href={`https://wa.me/212675289966?text=Bonjour%20DigiAssur,%20je%20souhaite%20finaliser%20mon%20devis%20Epargne%20avec%20un%20capital%20projet%C3%A9%20de%20${encodeURIComponent(formatDhs(projection.futureValue))}%20pour%20${encodeURIComponent(formData.nom + ' ' + formData.prenom)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full font-bold text-sm shadow flex items-center justify-center gap-2 transition"
                >
                  <span>{t("common.whatsappSpeedUp", "Accélérer sur WhatsApp")}</span>
                </a>

                <button
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto px-6 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t("common.modifyInfo", "Ajuster ma simulation")}</span>
                </button>

                <Link
                  href="/epargne"
                  className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition"
                >
                  <span>{t("common.backHome", "Retour à l'accueil Épargne")}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <PartnersSection />
      <DigiassurFooter />
      <FloatingWidgets />
    </div>
  );
}
