import { useState } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import { 
  Plane, 
  User, 
  Users, 
  Car, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Calendar as CalendarIcon, 
  Phone, 
  Mail, 
  CreditCard, 
  Globe2, 
  Upload, 
  FileText,
  RotateCcw
} from "lucide-react";
import { Link } from "wouter";

export default function VoyageDevisPage() {
  const [step, setStep] = useState<number>(1);
  const lastStep = 5;

  // Step 1: Assuré & Voyage
  const [assure, setAssure] = useState({
    nom: "Koulouch",
    prenom: "Youssef",
    telephone: "+212 675 289 966",
    email: "youssefkoulouch@gmail.com",
    cin: "BE123456",
    passeport: "FA1234567",
    dateNaissance: "1988-06-15",
    destination: "Espace Schengen (Visa Schengen)",
    dateDepart: "2026-10-15",
    dateRetour: "2026-10-30",
  });

  // Step 2: Famille
  const [famille, setFamille] = useState({
    enCouple: "non",
    conjointNom: "",
    conjointPrenom: "",
    avecEnfants: "non",
    nombreEnfants: "1",
  });

  // Step 3: Véhicule
  const [vehicule, setVehicule] = useState({
    avecVehicule: "non",
    marque: "",
    modele: "",
    immatriculation: "",
  });

  // Step 4: Formule & Options
  const [formule, setFormule] = useState({
    duree: "15 jours",
    pack: "Schengen Standard (30 000 €)",
    fraisMedicaux: "300 000 DH (30 000 €)",
    rapatriement: true,
    bagages: true,
    prixTTC: "650 DHS",
  });

  const [cgu, setCgu] = useState<boolean>(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (s: number) => {
    const errs: Record<string, string> = {};
    if (s === 1) {
      if (!assure.nom.trim()) errs.nom = "Nom obligatoire";
      if (!assure.prenom.trim()) errs.prenom = "Prénom obligatoire";
      if (!assure.telephone.trim()) errs.telephone = "Téléphone obligatoire";
      if (!assure.email.trim()) errs.email = "Email obligatoire";
      if (!assure.passeport.trim()) errs.passeport = "Numéro de passeport obligatoire";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(s => Math.min(s + 1, lastStep));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setStep(s => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-[#f48360] selection:text-white">
      <DigiassurHeader />

      <main className="flex-1 pt-[116px] pb-16">
        {/* Banner Top */}
        <div className="bg-[#4b7f9c] text-white py-8 border-b border-[#3d6880]">
          <div className="max-w-4xl mx-auto px-6">
            <span className="text-xs uppercase tracking-wider text-cyan-200 font-semibold">
              Assurance Voyage & Assistance Internationale
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-1">
              Obtenir mon tarif assurance voyage (Visa Schengen & Monde)
            </h1>
            <p className="text-sm text-cyan-100 mt-1">
              Attestation officielle immédiate conforme aux exigences consulaires européennes.
            </p>
          </div>
        </div>

        {/* Stepper Timeline 5 Steps */}
        <section className="bg-white border-b border-slate-200 py-6">
          <div className="max-w-3xl mx-auto px-4">
            <div className="relative flex justify-between items-center">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-6 right-6 h-1 bg-slate-200 -translate-y-3 z-0" />
              <div 
                className="absolute top-1/2 left-6 h-1 bg-[#f48360] -translate-y-3 transition-all duration-300 z-0"
                style={{ width: `${((step - 1) / (lastStep - 1)) * 100}%` }}
              />

              {[
                { title: "Assuré", icon: User },
                { title: "Famille", icon: Users },
                { title: "Véhicule", icon: Car },
                { title: "Options", icon: ShieldCheck },
                { title: "Confirmation", icon: CheckCircle2 },
              ].map((item, idx) => {
                const sNum = idx + 1;
                const IconComponent = item.icon;
                const isActive = step === sNum;
                const isCompleted = step > sNum;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (step > sNum) setStep(sNum);
                    }}
                    className="flex flex-col items-center relative z-10 cursor-pointer group"
                  >
                    <div
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-4 border-white shadow-md transition-all ${
                        isActive
                          ? "bg-[#f48360] ring-4 ring-[#f48360]/20 scale-105 text-white"
                          : isCompleted
                          ? "bg-[#4b7f9c] text-white"
                          : "bg-gray-200 text-slate-500"
                      }`}
                    >
                      <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <span
                      className={`mt-2 text-xs md:text-sm font-bold uppercase tracking-tight ${
                        isActive ? "text-[#f48360]" : "text-slate-500"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Funnel Body */}
        <div className="max-w-3xl mx-auto px-6 mt-8">
          <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200">
            {/* STEP 1: ASSURÉ */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                  Renseignez vos informations afin de recevoir votre devis voyage :
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nom *</label>
                    <input
                      type="text"
                      value={assure.nom}
                      onChange={e => setAssure({ ...assure, nom: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                      placeholder="Nom*"
                    />
                    {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Prénom *</label>
                    <input
                      type="text"
                      value={assure.prenom}
                      onChange={e => setAssure({ ...assure, prenom: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                      placeholder="Prénom*"
                    />
                    {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Téléphone *</label>
                    <input
                      type="tel"
                      value={assure.telephone}
                      onChange={e => setAssure({ ...assure, telephone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                      placeholder="Téléphone*"
                    />
                    {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email *</label>
                    <input
                      type="email"
                      value={assure.email}
                      onChange={e => setAssure({ ...assure, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                      placeholder="Email*"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">N° Passeport *</label>
                    <input
                      type="text"
                      value={assure.passeport}
                      onChange={e => setAssure({ ...assure, passeport: e.target.value.toUpperCase() })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                      placeholder="N° de Passeport*"
                    />
                    {errors.passeport && <p className="text-red-500 text-xs mt-1">{errors.passeport}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Destination *</label>
                    <select
                      value={assure.destination}
                      onChange={e => setAssure({ ...assure, destination: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    >
                      <option>Espace Schengen (Visa Schengen)</option>
                      <option>Europe hors Schengen</option>
                      <option>Monde entier (hors USA/Canada)</option>
                      <option>Monde entier (y compris USA/Canada)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date de départ *</label>
                    <input
                      type="date"
                      value={assure.dateDepart}
                      onChange={e => setAssure({ ...assure, dateDepart: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date de retour *</label>
                    <input
                      type="date"
                      value={assure.dateRetour}
                      onChange={e => setAssure({ ...assure, dateRetour: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3 bg-[#f48360] hover:bg-[#e46e4e] text-white font-bold text-sm uppercase rounded-full shadow-md transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Suivant</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: FAMILLE */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                  Voyagez-vous en famille ou accompagné(e) ?
                </h2>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="font-bold text-sm text-[#153954]">Êtes-vous en couple durant ce voyage ?</div>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="couple"
                        checked={famille.enCouple === "oui"}
                        onChange={() => setFamille({ ...famille, enCouple: "oui" })}
                        className="accent-[#f48360]"
                      />
                      <span>Oui</span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="couple"
                        checked={famille.enCouple === "non"}
                        onChange={() => setFamille({ ...famille, enCouple: "non" })}
                        className="accent-[#f48360]"
                      />
                      <span>Non</span>
                    </label>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="font-bold text-sm text-[#153954]">Avez-vous des enfants qui vous accompagnent ?</div>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="enfants"
                        checked={famille.avecEnfants === "oui"}
                        onChange={() => setFamille({ ...famille, avecEnfants: "oui" })}
                        className="accent-[#f48360]"
                      />
                      <span>Oui</span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="enfants"
                        checked={famille.avecEnfants === "non"}
                        onChange={() => setFamille({ ...famille, avecEnfants: "non" })}
                        className="accent-[#f48360]"
                      />
                      <span>Non</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-6 py-2.5 border rounded-full text-slate-700 font-bold text-sm cursor-pointer"
                  >
                    Précédent
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3 bg-[#f48360] hover:bg-[#e46e4e] text-white font-bold text-sm uppercase rounded-full shadow-md transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Suivant</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: VÉHICULE */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                  Assistance Véhicule à l'étranger
                </h2>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="font-bold text-sm text-[#153954]">Voyagez-vous avec votre propre véhicule ?</div>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="vehicule"
                        checked={vehicule.avecVehicule === "oui"}
                        onChange={() => setVehicule({ ...vehicule, avecVehicule: "oui" })}
                        className="accent-[#f48360]"
                      />
                      <span>Oui (carte verte & assistance panne)</span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="vehicule"
                        checked={vehicule.avecVehicule === "non"}
                        onChange={() => setVehicule({ ...vehicule, avecVehicule: "non" })}
                        className="accent-[#f48360]"
                      />
                      <span>Non (voyage en avion/bateau)</span>
                    </label>
                  </div>
                </div>

                {vehicule.avecVehicule === "oui" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-orange-50 border border-orange-100">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Marque</label>
                      <input
                        type="text"
                        placeholder="Ex: Peugeot"
                        value={vehicule.marque}
                        onChange={e => setVehicule({ ...vehicule, marque: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Modèle</label>
                      <input
                        type="text"
                        placeholder="Ex: 3008"
                        value={vehicule.modele}
                        onChange={e => setVehicule({ ...vehicule, modele: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Immatriculation</label>
                      <input
                        type="text"
                        placeholder="Ex: 12345-A-6"
                        value={vehicule.immatriculation}
                        onChange={e => setVehicule({ ...vehicule, immatriculation: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4 border-t">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-6 py-2.5 border rounded-full text-slate-700 font-bold text-sm cursor-pointer"
                  >
                    Précédent
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3 bg-[#f48360] hover:bg-[#e46e4e] text-white font-bold text-sm uppercase rounded-full shadow-md transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Suivant</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: OPTIONS */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                  Choisissez vos options & garanties de voyage :
                </h2>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-[#153954]">Assurance Médicale Schengen Obligatoire</div>
                      <div className="text-xs text-slate-500">Plafond garanti de 30 000 € (300 000 DHS) exigé pour le visa.</div>
                    </div>
                    <span className="font-bold text-xs uppercase px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                      Incluse
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-[#153954]">Assistance Rapatriement Sanitaire 24h/24</div>
                      <div className="text-xs text-slate-500">Prise en charge intégrale des frais de retour médicalisé.</div>
                    </div>
                    <span className="font-bold text-xs uppercase px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                      Incluse
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-[#153954]">Garantie Perte & Retard de Bagages</div>
                      <div className="text-xs text-slate-500">Indemnisation forfaitaire d'urgence jusqu'à 5 000 DH.</div>
                    </div>
                    <span className="font-bold text-xs uppercase px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                      Incluse
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-bold">Tarif Total Estimé TTC</div>
                      <div className="text-2xl font-extrabold text-[#f48360]">650.00 DHS</div>
                    </div>
                    <span className="text-xs text-slate-500">Valable pour votre séjour complet</span>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-6 py-2.5 border rounded-full text-slate-700 font-bold text-sm cursor-pointer"
                  >
                    Précédent
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3 bg-[#f48360] hover:bg-[#e46e4e] text-white font-bold text-sm uppercase rounded-full shadow-md transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Finaliser mon devis</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: CONFIRMATION */}
            {step === 5 && (
              <div className="text-center space-y-6 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h2 className="text-2xl text-[#f48360] md:text-3xl font-bold uppercase">
                  Félicitations {assure.prenom} !
                </h2>

                <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                  Votre devis d'assurance voyage pour <strong>{assure.destination}</strong> (du {assure.dateDepart} au {assure.dateRetour}) a été validé.
                  Votre attestation consulaire pour visa vous a été transmise à <strong>{assure.email}</strong>.
                </p>

                <div className="bg-[#fef1eb] p-6 rounded-2xl border border-orange-200 text-left max-w-md mx-auto text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Souscripteur :</span>
                    <strong>{assure.prenom} {assure.nom}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Passeport :</span>
                    <strong>{assure.passeport}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Plafond médical :</span>
                    <strong>30 000 € (300 000 DHS)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Prime TTC :</span>
                    <strong className="text-base text-[#f48360]">650.00 DHS</strong>
                  </div>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-2.5 rounded-full bg-[#4b7f9c] text-white font-bold text-xs uppercase"
                  >
                    Nouveau devis voyage
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
