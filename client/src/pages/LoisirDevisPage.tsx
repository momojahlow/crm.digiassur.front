import { useState } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import { 
  Compass, 
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
  Anchor, 
  Target, 
  Bike, 
  Music, 
  Sparkles,
  FileText,
  Upload
} from "lucide-react";
import { Link } from "wouter";
import { MOROCCAN_CITIES } from "@/data/motoBrands";

export default function LoisirDevisPage() {
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
    categorieLoisir: "Chasse",
    descriptionEquipement: "Fusil Beretta Calibre 12 + 2 chiens d'arrêt",
    valeurMateriel: "45 000 DH",
    zonePratique: "Maroc & International",
    garantieDommages: true,
    garantieVol: true,
    assistanceRapatriement: true,
    responsabiliteCivile: true,
    cgu: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
                <Compass className="w-4 h-4" />
              </span>
              <span className="text-xs uppercase tracking-wider text-cyan-200 font-semibold">
                Assurance Loisirs, Chasse & Activités Plein Air
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-1">
              Protégez vos passions, vos matériels et vos activités de loisirs
            </h1>
            <p className="text-sm text-cyan-100 mt-2 max-w-2xl">
              Chasse, plaisance, instruments ou sports outdoor : obtenez une protection sur-mesure au meilleur tarif.
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

                {/* Section Activité Loisir */}
                <div>
                  <div className="uppercase text-lg border-l-4 border-[#f48360] font-bold text-gray-600 pl-3 mb-4">
                    Votre Activité & Équipement de Loisir
                  </div>

                  {/* Choix de la catégorie */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {[
                      { id: "Chasse", title: "Chasse", icon: Target, desc: "Armes, chiens & RC" },
                      { id: "Bateau", title: "Plaisance / Bateau", icon: Anchor, desc: "Jet-ski, voilier, vedette" },
                      { id: "Sports", title: "Sports Outdoor", icon: Bike, desc: "Vélo, golf, équitation" },
                      { id: "Instruments", title: "Instruments", icon: Music, desc: "Matériel d'artiste & son" },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = formData.categorieLoisir === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, categorieLoisir: item.id })}
                          className={`p-4 rounded-xl border text-center transition-all ${
                            isSelected
                              ? "bg-[#4b7f9c]/10 border-[#4b7f9c] text-[#4b7f9c] shadow-xs"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                            isSelected ? "bg-[#4b7f9c] text-white" : "bg-white text-slate-500 shadow-xs"
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="font-bold text-xs md:text-sm">{item.title}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Description du matériel */}
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">
                        Description de l'activité ou de l'équipement
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#f48360] focus:outline-none"
                        placeholder="Ex: Fusil de chasse Calibre 12, Voilier 8m, Vélo carbone..."
                        value={formData.descriptionEquipement}
                        onChange={(e) => setFormData({ ...formData, descriptionEquipement: e.target.value })}
                      />
                    </div>

                    {/* Valeur estimée */}
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">
                        Valeur estimée du matériel
                      </label>
                      <select
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#f48360] focus:outline-none"
                        value={formData.valeurMateriel}
                        onChange={(e) => setFormData({ ...formData, valeurMateriel: e.target.value })}
                      >
                        <option value="15 000 DH">Moins de 20 000 DH</option>
                        <option value="45 000 DH">Entre 20 000 DH et 50 000 DH</option>
                        <option value="100 000 DH">Entre 50 000 DH et 150 000 DH</option>
                        <option value="300 000 DH">Plus de 150 000 DH</option>
                      </select>
                    </div>
                  </div>

                  {/* Garanties complémentaires */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">
                      Garanties incluses ou souhaitées
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { key: "responsabiliteCivile", label: "Responsabilité Civile", desc: "Obligatoire pour chasse & bateaux" },
                        { key: "garantieDommages", label: "Dommages & Casse", desc: "Accidents corporels et matériels" },
                        { key: "garantieVol", label: "Vol & Détérioration", desc: "Pendant le transport et stockage" },
                        { key: "assistanceRapatriement", label: "Assistance & Secours", desc: "Frais de recherche et sauvetage" },
                      ].map((item) => {
                        const isChecked = !!(formData as any)[item.key];
                        return (
                          <label
                            key={item.key}
                            className={`p-3 rounded-lg border cursor-pointer transition-all ${
                              isChecked
                                ? "bg-white border-[#f48360] shadow-xs text-slate-800"
                                : "bg-slate-100 border-slate-200 text-slate-500 hover:bg-white"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                                className="accent-[#f48360] rounded w-4 h-4"
                              />
                              <span className="text-xs font-bold">{item.label}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 pl-6">{item.desc}</p>
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
                    <span>Recevoir mon devis Loisir gratuit</span>
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
                Votre demande de devis <strong>Assurance Loisirs ({formData.categorieLoisir})</strong> a bien été enregistrée.
                Un de nos conseillers spécialisés prend en charge votre dossier et vous contactera d'ici 15 minutes avec l'offre optimale.
              </p>

              {/* Récapitulatif */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-w-lg mx-auto text-left mb-6 text-xs md:text-sm space-y-2">
                <div className="font-bold text-slate-700 border-b pb-2 flex items-center justify-between">
                  <span>Récapitulatif de votre demande</span>
                  <span className="text-[#4b7f9c] font-semibold">{formData.categorieLoisir}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Assuré :</span>
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
                  <span>Description :</span>
                  <span className="font-semibold text-slate-800">{formData.descriptionEquipement}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Valeur déclarée :</span>
                  <span className="font-semibold text-emerald-600">{formData.valeurMateriel}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href={`https://wa.me/212675289966?text=Bonjour%20DigiAssur,%20je%20souhaite%20finaliser%20mon%20devis%20Assurance%20Loisir%20(${encodeURIComponent(formData.categorieLoisir)})%20pour%20${encodeURIComponent(formData.nom + ' ' + formData.prenom)}`}
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
                  href="/loisir"
                  className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition"
                >
                  <span>Retour à la page Loisir</span>
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
