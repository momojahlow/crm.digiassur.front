import { useState } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import { 
  HeartPulse, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  Activity, 
  Stethoscope, 
  FileText, 
  Upload,
  Users
} from "lucide-react";
import { Link } from "wouter";
import { MOROCCAN_CITIES } from "@/data/motoBrands";

export default function SanteDevisPage() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    nom: "Koulouch",
    prenom: "Youssef",
    telephone: "+212 675 289 966",
    email: "youssefkoulouch@gmail.com",
    cin: "BE123456",
    dateNaissance: "1988-06-15",
    ville: "Casablanca",
    adresse: "27 Rue Ain Asserdoune CIL",
    typeCouverture: "Famille",
    tauxRemboursement: "80%",
    plafondAnnuel: "100 000 DH",
    optique: true,
    dentaire: true,
    maternite: true,
    hospitalisation: true,
    pharmacie: true,
    datePriseEffet: "2026-11-01",
    cgu: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.nom.trim()) errs.nom = "Nom obligatoire";
    if (!formData.prenom.trim()) errs.prenom = "Prénom obligatoire";
    if (!formData.telephone.trim()) errs.telephone = "Téléphone obligatoire";
    if (!formData.email.trim()) errs.email = "Email obligatoire";
    if (!formData.cgu) errs.cgu = "Veuillez accepter les CGU";
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
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-[#f48360] selection:text-white">
      <DigiassurHeader />

      <main className="flex-1 pt-[116px] pb-16">
        {/* Banner Top */}
        <div className="bg-[#4b7f9c] text-white py-8 border-b border-[#3d6880]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 bg-white/20 rounded-full text-white">
                <HeartPulse className="w-4 h-4" />
              </span>
              <span className="text-xs uppercase tracking-wider text-cyan-200 font-semibold">
                Assurance Santé Complémentaire & Mutuelle
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-1">
              Vous êtes à la recherche d'une couverture de frais médicaux, pharmaceutiques et d'hospitalisation ?
            </h1>
            <p className="text-sm text-cyan-100 mt-2 max-w-2xl">
              Complétez le formulaire ci-dessous pour recevoir une simulation personnalisée et sans engagement avec les meilleurs taux de remboursement au Maroc.
            </p>
          </div>
        </div>

        {/* Funnel Container */}
        <div className="max-w-4xl mx-auto px-6 mt-8">
          {step === 1 && (
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in duration-300">
              <h2 className="text-xl md:text-2xl text-gray-700 font-bold mb-6">
                Pour être contacté(e), renseignez ce formulaire :
              </h2>

              <form onSubmit={handleNext} className="space-y-8">
                {/* Section Coordonnées */}
                <div>
                  <div className="uppercase text-lg border-l-4 border-[#f48360] font-bold text-gray-600 pl-3 mb-4">
                    Vos Coordonnées
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nom */}
                    <div>
                      <div className="bg-gray-200 rounded-full p-1.5 flex items-center space-x-1">
                        <div className="w-8 h-8 rounded-full bg-[#f48360] text-white flex items-center justify-center shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          className="p-2 bg-gray-200 border-0 flex-1 rounded-r-full text-neutral-700 text-sm focus:outline-none"
                          placeholder="Nom *"
                          value={formData.nom}
                          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        />
                      </div>
                      {errors.nom && <div className="text-red-500 pt-1 pl-4 text-xs">{errors.nom}</div>}
                    </div>

                    {/* Prénom */}
                    <div>
                      <div className="bg-gray-200 rounded-full p-1.5 flex items-center space-x-1">
                        <div className="w-8 h-8 rounded-full bg-[#f48360] text-white flex items-center justify-center shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          className="p-2 bg-gray-200 border-0 flex-1 rounded-r-full text-neutral-700 text-sm focus:outline-none"
                          placeholder="Prénom *"
                          value={formData.prenom}
                          onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                        />
                      </div>
                      {errors.prenom && <div className="text-red-500 pt-1 pl-4 text-xs">{errors.prenom}</div>}
                    </div>

                    {/* Téléphone */}
                    <div>
                      <div className="bg-gray-200 rounded-full p-1.5 flex items-center space-x-1">
                        <div className="w-8 h-8 rounded-full bg-[#f48360] text-white flex items-center justify-center shrink-0">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          className="p-2 bg-gray-200 border-0 flex-1 rounded-r-full text-neutral-700 text-sm focus:outline-none"
                          placeholder="Téléphone *"
                          value={formData.telephone}
                          onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        />
                      </div>
                      {errors.telephone && <div className="text-red-500 pt-1 pl-4 text-xs">{errors.telephone}</div>}
                    </div>

                    {/* Email */}
                    <div>
                      <div className="bg-gray-200 rounded-full p-1.5 flex items-center space-x-1">
                        <div className="w-8 h-8 rounded-full bg-[#f48360] text-white flex items-center justify-center shrink-0">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          className="p-2 bg-gray-200 border-0 flex-1 rounded-r-full text-neutral-700 text-sm focus:outline-none"
                          placeholder="Email *"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      {errors.email && <div className="text-red-500 pt-1 pl-4 text-xs">{errors.email}</div>}
                    </div>

                    {/* CIN */}
                    <div>
                      <div className="bg-gray-200 rounded-full p-1.5 flex items-center space-x-1">
                        <div className="w-8 h-8 rounded-full bg-[#f48360] text-white flex items-center justify-center shrink-0">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          className="p-2 bg-gray-200 border-0 flex-1 rounded-r-full text-neutral-700 text-sm focus:outline-none"
                          placeholder="CIN"
                          value={formData.cin}
                          onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Date de Naissance */}
                    <div>
                      <div className="bg-gray-200 rounded-full p-1.5 flex items-center space-x-1">
                        <div className="w-8 h-8 rounded-full bg-[#f48360] text-white flex items-center justify-center shrink-0">
                          <CalendarIcon className="w-4 h-4" />
                        </div>
                        <input
                          type="date"
                          className="p-2 bg-gray-200 border-0 flex-1 rounded-r-full text-neutral-700 text-sm focus:outline-none"
                          value={formData.dateNaissance}
                          onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Ville */}
                    <div>
                      <div className="bg-gray-200 rounded-full p-1.5 flex items-center space-x-1">
                        <div className="w-8 h-8 rounded-full bg-[#f48360] text-white flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <select
                          className="p-2 bg-gray-200 border-0 flex-1 rounded-r-full text-neutral-700 text-sm focus:outline-none"
                          value={formData.ville}
                          onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                        >
                          {MOROCCAN_CITIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Adresse */}
                    <div>
                      <div className="bg-gray-200 rounded-full p-1.5 flex items-center space-x-1">
                        <div className="w-8 h-8 rounded-full bg-[#f48360] text-white flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          className="p-2 bg-gray-200 border-0 flex-1 rounded-r-full text-neutral-700 text-sm focus:outline-none"
                          placeholder="Adresse"
                          value={formData.adresse}
                          onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Besoins Médicaux & Couverture */}
                <div>
                  <div className="uppercase text-lg border-l-4 border-[#f48360] font-bold text-gray-600 pl-3 mb-4">
                    Votre Profil Médical & Besoins de Couverture
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Formule */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                        Bénéficiaires
                      </label>
                      <select
                        className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-[#f48360]"
                        value={formData.typeCouverture}
                        onChange={(e) => setFormData({ ...formData, typeCouverture: e.target.value })}
                      >
                        <option value="Individuel">Individuel (Adhérent seul)</option>
                        <option value="Famille">Famille (Conjoint & Enfants)</option>
                        <option value="Senior">Senior (+60 ans)</option>
                        <option value="Entreprise">Entreprise / Salariés</option>
                      </select>
                    </div>

                    {/* Taux de Remboursement */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                        Taux de Remboursement
                      </label>
                      <select
                        className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-[#f48360]"
                        value={formData.tauxRemboursement}
                        onChange={(e) => setFormData({ ...formData, tauxRemboursement: e.target.value })}
                      >
                        <option value="70%">70% des frais engagés</option>
                        <option value="80%">80% des frais engagés (Standard)</option>
                        <option value="85%">85% des frais engagés</option>
                        <option value="100%">100% des frais engagés (Premium)</option>
                      </select>
                    </div>

                    {/* Plafond Annuel */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                        Plafond Annuel / Personne
                      </label>
                      <select
                        className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-[#f48360]"
                        value={formData.plafondAnnuel}
                        onChange={(e) => setFormData({ ...formData, plafondAnnuel: e.target.value })}
                      >
                        <option value="50 000 DH">50 000 DH / an</option>
                        <option value="100 000 DH">100 000 DH / an</option>
                        <option value="250 000 DH">250 000 DH / an</option>
                        <option value="500 000 DH">500 000 DH / an (Illimité)</option>
                      </select>
                    </div>
                  </div>

                  {/* Modules de soins prioritaires */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">
                      Garanties prioritaires souhaitées
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { key: "hospitalisation", label: "Hospitalisation & Chirurgie", icon: Activity },
                        { key: "pharmacie", label: "Pharmacie & Consultations", icon: Stethoscope },
                        { key: "dentaire", label: "Soins Dentaires & Prothèses", icon: HeartPulse },
                        { key: "optique", label: "Optique (Lunettes & Lentilles)", icon: EyeIcon },
                        { key: "maternite", label: "Maternité & Accouchement", icon: Users },
                      ].map((item) => {
                        const Icon = item.icon;
                        const isChecked = !!(formData as any)[item.key];
                        return (
                          <label
                            key={item.key}
                            className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                              isChecked
                                ? "bg-white border-[#f48360] shadow-xs text-slate-800"
                                : "bg-slate-100 border-slate-200 text-slate-500 hover:bg-white"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                              className="accent-[#f48360] rounded w-4 h-4"
                            />
                            <Icon className="w-4 h-4 text-[#f48360]" />
                            <span className="text-xs font-semibold">{item.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* CGU */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.cgu}
                      onChange={(e) => setFormData({ ...formData, cgu: e.target.checked })}
                      className="mt-1 checkbox checkbox-sm accent-[#f48360]"
                    />
                    <span className="text-xs text-slate-500 leading-snug">
                      J'ai lu et j'accepte les{" "}
                      <a href="/mentions-legales" className="text-[#4b7f9c] underline font-medium">
                        conditions générales d'utilisation
                      </a>
                      , notamment la mention relative à la protection des données personnelles.
                    </span>
                  </label>
                  {errors.cgu && <div className="text-red-500 text-xs mt-1">{errors.cgu}</div>}
                </div>

                {/* Submit button */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#f48360] to-[#ff9478] hover:from-[#e3714e] hover:to-[#f48360] text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>Recevoir mon devis Santé gratuit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">
                Félicitations {formData.prenom} {formData.nom} !
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto mb-6 text-sm md:text-base">
                Votre demande de devis <strong>Assurance Santé Complémentaire</strong> a bien été enregistrée.
                Un de nos conseillers experts en couverture médicale étudie votre profil et vous transmettra les meilleures offres de nos partenaires d'ici 15 minutes.
              </p>

              {/* Récapitulatif */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-w-lg mx-auto text-left mb-6 text-xs md:text-sm space-y-2">
                <div className="font-bold text-slate-700 border-b pb-2 flex items-center justify-between">
                  <span>Récapitulatif de votre demande</span>
                  <span className="text-[#4b7f9c] font-semibold">{formData.typeCouverture}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Adhérent :</span>
                  <span className="font-semibold text-slate-800">{formData.nom} {formData.prenom}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Téléphone :</span>
                  <span className="font-semibold text-slate-800">{formData.telephone}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Email :</span>
                  <span className="font-semibold text-slate-800">{formData.email}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Ville :</span>
                  <span className="font-semibold text-slate-800">{formData.ville}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Taux souhaité :</span>
                  <span className="font-semibold text-emerald-600">{formData.tauxRemboursement}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Plafond annuel :</span>
                  <span className="font-semibold text-slate-800">{formData.plafondAnnuel}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href={`https://wa.me/212675289966?text=Bonjour%20DigiAssur,%20je%20souhaite%20finaliser%20mon%20devis%20Assurance%20Sante%20pour%20${encodeURIComponent(formData.nom + ' ' + formData.prenom)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full font-bold text-sm shadow flex items-center justify-center gap-2 transition"
                >
                  <span>Accélérer mon devis sur WhatsApp</span>
                </a>

                <button
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto px-6 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Modifier mes informations</span>
                </button>

                <Link
                  href="/sante"
                  className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition"
                >
                  <span>Retour à la page Santé</span>
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

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
