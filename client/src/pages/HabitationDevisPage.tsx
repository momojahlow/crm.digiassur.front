import { useState } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import { 
  Home, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  Building, 
  Upload, 
  FileText
} from "lucide-react";
import { Link } from "wouter";
import { MOROCCAN_CITIES } from "@/data/motoBrands";

export default function HabitationDevisPage() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    nom: "Koulouch",
    prenom: "Youssef",
    telephone: "+212 675 289 966",
    email: "youssefkoulouch@gmail.com",
    cin: "BE123456",
    ville: "Casablanca",
    adresse: "27 Rue Ain Asserdoune CIL",
    typeLogement: "Appartement",
    statut: "Propriétaire",
    usage: "Habitation principale",
    superficie: "120",
    valeurBatiment: "1500000",
    valeurContenu: "300000",
    objetsValeur: "50000",
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
            <span className="text-xs uppercase tracking-wider text-cyan-200 font-semibold">
              Assurance Multirisque Habitation (MRH)
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-1">
              Demandez un devis pour protéger votre habitation et vos proches
            </h1>
            <p className="text-sm text-cyan-100 mt-1">
              Obtenez les meilleures garanties auprès des assureurs leaders au Maroc à partir de 25 DHS TTC/Mois.
            </p>
          </div>
        </div>

        {/* Funnel Content */}
        <div className="max-w-4xl mx-auto px-6 mt-8">
          {step === 1 && (
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in duration-300">
              <form onSubmit={handleNext} className="space-y-6">
                {/* Section Client */}
                <div className="uppercase text-xl border-l-4 border-[#f48360] font-bold text-gray-500 pl-3">
                  Informations de l'assuré
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nom */}
                  <div>
                    <div className="bg-gray-200 rounded-full p-1.5 flex items-center space-x-1">
                      <div className="w-9 h-9 p-2 bg-[#f48360] text-white rounded-full flex items-center justify-center shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        placeholder="Nom*"
                        value={formData.nom}
                        onChange={e => setFormData({ ...formData, nom: e.target.value })}
                        className="p-2 bg-transparent border-0 flex-1 rounded-r-full text-neutral-700 outline-none text-sm font-medium"
                      />
                    </div>
                    {errors.nom && <p className="text-red-500 text-xs mt-1 pl-4">{errors.nom}</p>}
                  </div>

                  {/* Prénom */}
                  <div>
                    <div className="bg-gray-200 rounded-full p-1.5 flex items-center space-x-1">
                      <div className="w-9 h-9 p-2 bg-[#f48360] text-white rounded-full flex items-center justify-center shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        placeholder="Prénom*"
                        value={formData.prenom}
                        onChange={e => setFormData({ ...formData, prenom: e.target.value })}
                        className="p-2 bg-transparent border-0 flex-1 rounded-r-full text-neutral-700 outline-none text-sm font-medium"
                      />
                    </div>
                    {errors.prenom && <p className="text-red-500 text-xs mt-1 pl-4">{errors.prenom}</p>}
                  </div>

                  {/* Téléphone */}
                  <div>
                    <div className="bg-gray-200 rounded-full p-1.5 flex items-center space-x-1">
                      <div className="w-9 h-9 p-2 bg-[#f48360] text-white rounded-full flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        placeholder="Téléphone*"
                        value={formData.telephone}
                        onChange={e => setFormData({ ...formData, telephone: e.target.value })}
                        className="p-2 bg-transparent border-0 flex-1 rounded-r-full text-neutral-700 outline-none text-sm font-medium"
                      />
                    </div>
                    {errors.telephone && <p className="text-red-500 text-xs mt-1 pl-4">{errors.telephone}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <div className="bg-gray-200 rounded-full p-1.5 flex items-center space-x-1">
                      <div className="w-9 h-9 p-2 bg-[#f48360] text-white rounded-full flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        placeholder="Email*"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="p-2 bg-transparent border-0 flex-1 rounded-r-full text-neutral-700 outline-none text-sm font-medium"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1 pl-4">{errors.email}</p>}
                  </div>

                  {/* CIN */}
                  <div>
                    <div className="bg-gray-200 rounded-full p-1.5 flex items-center space-x-1">
                      <div className="w-9 h-9 p-2 bg-[#f48360] text-white rounded-full flex items-center justify-center shrink-0">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        placeholder="CIN*"
                        value={formData.cin}
                        onChange={e => setFormData({ ...formData, cin: e.target.value.toUpperCase() })}
                        className="p-2 bg-transparent border-0 flex-1 rounded-r-full text-neutral-700 outline-none text-sm font-medium"
                      />
                    </div>
                  </div>

                  {/* Ville */}
                  <div>
                    <div className="bg-gray-200 rounded-full p-1.5 flex items-center space-x-1">
                      <div className="w-9 h-9 p-2 bg-[#f48360] text-white rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <select
                        value={formData.ville}
                        onChange={e => setFormData({ ...formData, ville: e.target.value })}
                        className="p-2 bg-transparent border-0 flex-1 rounded-r-full text-neutral-700 outline-none text-sm font-medium cursor-pointer"
                      >
                        {MOROCCAN_CITIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section Logement */}
                <div className="uppercase text-xl border-l-4 border-[#f48360] font-bold text-gray-500 pl-3 pt-4">
                  Caractéristiques du logement
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Type de bien</label>
                    <select
                      value={formData.typeLogement}
                      onChange={e => setFormData({ ...formData, typeLogement: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    >
                      <option>Appartement</option>
                      <option>Villa</option>
                      <option>Maison traditionnelle</option>
                      <option>Duplex / Triplex</option>
                    </select>
                  </div>

                  {/* Statut */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Votre statut</label>
                    <select
                      value={formData.statut}
                      onChange={e => setFormData({ ...formData, statut: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    >
                      <option>Propriétaire</option>
                      <option>Locataire</option>
                      <option>Copropriétaire</option>
                    </select>
                  </div>

                  {/* Superficie */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Superficie (m²)</label>
                    <input
                      type="number"
                      value={formData.superficie}
                      onChange={e => setFormData({ ...formData, superficie: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                      placeholder="Ex: 120"
                    />
                  </div>
                </div>

                {/* Valeurs estimées */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Valeur du bâtiment (DH)</label>
                    <input
                      type="number"
                      value={formData.valeurBatiment}
                      onChange={e => setFormData({ ...formData, valeurBatiment: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Valeur du mobilier (DH)</label>
                    <input
                      type="number"
                      value={formData.valeurContenu}
                      onChange={e => setFormData({ ...formData, valeurContenu: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Objets précieux / Bijoux</label>
                    <input
                      type="number"
                      value={formData.objetsValeur}
                      onChange={e => setFormData({ ...formData, objetsValeur: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    />
                  </div>
                </div>

                {/* CGU */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={formData.cgu}
                      onChange={e => setFormData({ ...formData, cgu: e.target.checked })}
                      className="mt-0.5 accent-[#f48360]"
                    />
                    <span>
                      J'accepte les conditions générales d'utilisation et le traitement de mes données conformément aux normes de la CNDP.
                    </span>
                  </label>
                  {errors.cgu && <p className="text-red-500 text-xs mt-1">{errors.cgu}</p>}
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#f48360] hover:bg-[#e46e4e] text-white font-bold text-sm uppercase rounded-full shadow-lg transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Recevoir mon devis gratuit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h2 className="text-2xl text-[#f48360] md:text-3xl font-bold uppercase mb-4">
                Félicitations {formData.prenom} !
              </h2>

              <p className="text-base text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed">
                Votre demande de tarification pour votre <strong>{formData.typeLogement}</strong> ({formData.superficie} m² à {formData.ville}) a bien été enregistrée.
                Un conseiller Digiassur spécialisé vous transmettra les 3 meilleures propositions comparées à <strong>{formData.email}</strong>.
              </p>

              <div className="bg-[#fef1eb] p-6 rounded-2xl border border-orange-200 text-left max-w-md mx-auto mb-8 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Assuré :</span>
                  <strong>{formData.prenom} {formData.nom}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Téléphone :</span>
                  <strong>{formData.telephone}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimation bâtiment :</span>
                  <strong>{Number(formData.valeurBatiment).toLocaleString()} DHS</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contenu assuré :</span>
                  <strong>{Number(formData.valeurContenu).toLocaleString()} DHS</strong>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2.5 rounded-full bg-[#4b7f9c] text-white font-bold text-xs uppercase"
                >
                  Modifier ma demande
                </button>
                <Link
                  href="/"
                  className="px-6 py-2.5 rounded-full bg-[#f48360] text-white font-bold text-xs uppercase"
                >
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="mt-16">
          <PartnersSection />
        </div>
      </main>

      <FloatingWidgets />
      <DigiassurFooter />
    </div>
  );
}
