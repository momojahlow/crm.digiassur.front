import { useState } from "react";
import { Link } from "wouter";
import { 
  User, 
  Phone, 
  Mail, 
  PiggyBank, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Calculator,
  Shield,
  Coins
} from "lucide-react";

export default function EpargneSimulatorForm() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    typeEpargne: "Épargne Projet",
    montantMensuel: 1000,
    dureeAnnees: 10,
    cgu: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Financial simulation math
  // Formula: Compound interest on monthly annuity: S = PMT * (((1 + r/12)^(n*12) - 1) / (r/12))
  const annualRate = 0.045; // 4.5% annual estimated average return
  const monthlyRate = annualRate / 12;
  const totalMonths = formData.dureeAnnees * 12;
  const totalContributed = formData.montantMensuel * totalMonths;
  const estimatedCapital = Math.round(
    formData.montantMensuel * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
  );
  const estimatedGains = Math.max(0, estimatedCapital - totalContributed);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.nom.trim()) errs.nom = "Le nom est obligatoire";
    if (!formData.prenom.trim()) errs.prenom = "Le prénom est obligatoire";
    if (!formData.telephone.trim()) {
      errs.telephone = "Le numéro de téléphone est obligatoire";
    } else if (!/^[0-9+() -]{8,15}$/.test(formData.telephone.trim())) {
      errs.telephone = "Numéro de téléphone invalide";
    }
    if (!formData.email.trim()) {
      errs.email = "L'adresse email est obligatoire";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Adresse email invalide";
    }
    if (!formData.cgu) {
      errs.cgu = "Veuillez accepter les conditions générales d'utilisation";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-white" id="simulation">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#f48161]/10 text-[#f48161] font-bold text-xs uppercase px-4 py-1.5 rounded-full mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulateur & Devis Gratuit</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#153954] mb-3">
            Souhaitez-vous être contacté ?
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            Renseignez ce formulaire, nos conseillers Digiassur vous rappelleront gratuitement pour vous proposer la formule la plus adaptée.
          </p>
        </div>

        {submitted ? (
          /* Confirmation State */
          <div className="max-w-2xl mx-auto bg-white p-8 lg:p-12 rounded-2xl shadow-xl border border-emerald-100 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-[#153954] mb-3">
              Félicitations, {formData.prenom} !
            </h3>
            <p className="text-slate-600 text-base mb-6 leading-relaxed">
              Votre demande de simulation pour un capital estimé de{" "}
              <strong className="text-[#f48161]">{estimatedCapital.toLocaleString("fr-FR")} DHS</strong> a bien été enregistrée.
              Un conseiller Digiassur va prendre contact avec vous au <strong>{formData.telephone}</strong> dans les plus brefs délais.
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500 mb-8 text-left">
              <p className="font-semibold text-slate-700 mb-1">Détails de votre simulation :</p>
              <ul className="space-y-1">
                <li>• Formule : {formData.typeEpargne}</li>
                <li>• Versement mensuel : {formData.montantMensuel.toLocaleString("fr-FR")} DHS/mois</li>
                <li>• Durée projetée : {formData.dureeAnnees} ans</li>
                <li>• Estimation reçue à : {formData.email}</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  nom: "",
                  prenom: "",
                  telephone: "",
                  email: "",
                  typeEpargne: "Épargne Projet",
                  montantMensuel: 1000,
                  dureeAnnees: 10,
                  cgu: false,
                });
              }}
              className="bg-[#153954] hover:bg-[#0d283c] text-white px-8 py-3 rounded-full text-sm font-semibold transition"
            >
              Faire une nouvelle simulation
            </button>
          </div>
        ) : (
          /* Interactive Form & Live Calculator (2 Columns) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg border border-slate-100">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nom */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nom *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4 text-[#f48161]" />
                      </div>
                      <input
                        type="text"
                        placeholder="Votre nom de famille"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${
                          errors.nom ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#568ba9]"
                        } rounded-xl text-sm focus:outline-none focus:bg-white transition`}
                      />
                    </div>
                    {errors.nom && <p className="text-red-500 text-xs mt-1 pl-1">{errors.nom}</p>}
                  </div>

                  {/* Prénom */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Prénom *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4 text-[#f48161]" />
                      </div>
                      <input
                        type="text"
                        placeholder="Votre prénom"
                        value={formData.prenom}
                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${
                          errors.prenom ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#568ba9]"
                        } rounded-xl text-sm focus:outline-none focus:bg-white transition`}
                      />
                    </div>
                    {errors.prenom && <p className="text-red-500 text-xs mt-1 pl-1">{errors.prenom}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Téléphone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Téléphone *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4 text-[#f48161]" />
                      </div>
                      <input
                        type="tel"
                        placeholder="06 XX XX XX XX"
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${
                          errors.telephone ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#568ba9]"
                        } rounded-xl text-sm focus:outline-none focus:bg-white transition`}
                      />
                    </div>
                    {errors.telephone && <p className="text-red-500 text-xs mt-1 pl-1">{errors.telephone}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4 text-[#f48161]" />
                      </div>
                      <input
                        type="email"
                        placeholder="exemple@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${
                          errors.email ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#568ba9]"
                        } rounded-xl text-sm focus:outline-none focus:bg-white transition`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1 pl-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Type d'épargne */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Type d'épargne souhaité *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <PiggyBank className="w-4 h-4 text-[#f48161]" />
                    </div>
                    <select
                      value={formData.typeEpargne}
                      onChange={(e) => setFormData({ ...formData, typeEpargne: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#568ba9] rounded-xl text-sm focus:outline-none focus:bg-white transition appearance-none cursor-pointer"
                    >
                      <option value="Épargne Projet">Épargne Projet (Acquisition, Voyage, Investissement)</option>
                      <option value="Épargne Retraite">Épargne Retraite (Garantir ses revenus futurs)</option>
                      <option value="Épargne Éducation / Enfants">Épargne Éducation (Études supérieures des enfants)</option>
                      <option value="Épargne Sécurité / Imprévus">Épargne Sécurité (Trésorerie de précaution)</option>
                    </select>
                  </div>
                </div>

                {/* Amount Slider */}
                <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-[#153954] uppercase tracking-wide">
                      Capacité d'épargne mensuelle
                    </span>
                    <span className="text-base font-extrabold text-[#f48161] bg-white px-3 py-1 rounded-md border border-orange-200">
                      {formData.montantMensuel.toLocaleString("fr-FR")} DHS / mois
                    </span>
                  </div>
                  <input
                    type="range"
                    min={200}
                    max={10000}
                    step={100}
                    value={formData.montantMensuel}
                    onChange={(e) => setFormData({ ...formData, montantMensuel: Number(e.target.value) })}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#f48161]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>200 DHS</span>
                    <span>2 500 DHS</span>
                    <span>5 000 DHS</span>
                    <span>10 000 DHS</span>
                  </div>
                </div>

                {/* Duration Slider */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-[#153954] uppercase tracking-wide">
                      Durée de placement envisagée
                    </span>
                    <span className="text-sm font-bold text-[#153954] bg-white px-3 py-1 rounded-md border border-slate-200">
                      {formData.dureeAnnees} ans ({formData.dureeAnnees * 12} mois)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={30}
                    step={1}
                    value={formData.dureeAnnees}
                    onChange={(e) => setFormData({ ...formData, dureeAnnees: Number(e.target.value) })}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#568ba9]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>3 ans</span>
                    <span>10 ans</span>
                    <span>20 ans</span>
                    <span>30 ans</span>
                  </div>
                </div>

                {/* CGU Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.cgu}
                      onChange={(e) => setFormData({ ...formData, cgu: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded-md border-slate-300 text-[#f48161] focus:ring-[#f48161] cursor-pointer"
                    />
                    <span className="text-xs text-slate-600 leading-normal">
                      J'ai lu et j'accepte les{" "}
                      <Link href="/mentions-legales" className="text-[#153954] underline font-bold">
                        conditions générales
                      </Link>{" "}
                      d'utilisation notamment la mention relative à la protection des données personnelles.
                    </span>
                  </label>
                  {errors.cgu && <p className="text-red-500 text-xs mt-1 pl-7">{errors.cgu}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>OBTENIR MON DEVIS ÉPARGNE</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Live Simulation Summary Card (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#153954] text-white p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/5 rounded-full blur-xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-[#f48161]" />
                    <span className="text-xs uppercase tracking-widest font-bold text-cyan-200">
                      Estimation en direct
                    </span>
                  </div>
                  <span className="text-[11px] bg-white/10 px-2.5 py-0.5 rounded-full text-slate-200">
                    Taux indicatif : 4.5%
                  </span>
                </div>

                {/* Capital Target */}
                <div className="mb-6">
                  <span className="text-xs text-cyan-100 block mb-1">Capital net projeté au terme</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#f48161] tracking-tight">
                    {estimatedCapital.toLocaleString("fr-FR")} DHS
                  </div>
                  <span className="text-[11px] text-cyan-200/80">
                    Soit {(estimatedCapital / formData.dureeAnnees).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} DHS par an
                  </span>
                </div>

                {/* Breakdown details */}
                <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Total de vos versements :</span>
                    <strong className="text-white">{totalContributed.toLocaleString("fr-FR")} DHS</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Intérêts & plus-values estimés :</span>
                    <strong className="text-emerald-400">+{estimatedGains.toLocaleString("fr-FR")} DHS</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Fréquence des versements :</span>
                    <strong className="text-white">Mensuelle ({formData.montantMensuel} DHS/m)</strong>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2.5 text-[11px] text-cyan-100/90">
                  <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Fonds sécurisé et garanti par nos compagnies partenaires agréées (AXA, Allianz, RMA, Sanlam).</span>
                </div>
              </div>

              {/* Assistance Callout */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f48161]/10 text-[#f48161] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#153954]">Besoin d'un conseil immédiat ?</h4>
                  <p className="text-xs text-slate-500 mb-1">Nos experts répondent à vos questions du lundi au vendredi.</p>
                  <a href="tel:+212522368182" className="text-xs font-bold text-[#f48161] hover:underline">
                    (+212) 522 36 81 82
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
