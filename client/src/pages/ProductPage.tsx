import { useState } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import PartnersSection from "@/components/PartnersSection";
import WhyDigiassur from "@/components/WhyDigiassur";
import AssurwiBanner from "@/components/AssurwiBanner";
import { 
  Car, 
  Bike, 
  ShieldAlert, 
  Home as House, 
  Plane, 
  HeartPulse, 
  Bike as LeisureIcon, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Phone
} from "lucide-react";

type ProductConfig = {
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  icon: typeof Car;
  features: string[];
  startingPrice: string;
};

const configs: Record<string, ProductConfig> = {
  auto: {
    title: "Assurance Automobile",
    subtitle: "Prenez la route l'esprit tranquille avec les meilleures garanties au Maroc.",
    description: "Comparez et obtenez les meilleurs tarifs d'assurance auto auprès des plus grandes compagnies du Royaume (AXA, Allianz, RMA, Sanlam). Attestation livrée directement chez vous.",
    badge: "Auto Particuliers",
    icon: Car,
    features: [
      "Responsabilité civile obligatoire",
      "Défense et recours avec assistance juridique",
      "Assistance 24h/24 et 7j/7 avec remorquage rapide",
      "Dommages tous accidents et bris de glace sans franchise",
      "Vol, incendie et protection du conducteur",
    ],
    startingPrice: "À partir de 153 DHS TTC / mois",
  },
  moto: {
    title: "Assurance Moto & Scooter",
    subtitle: "Une couverture sur-mesure pour tous les motocyclistes.",
    description: "Protection complète pour votre deux-roues contre les aléas de la route. Assistance panne et accident partout au Maroc.",
    badge: "Moto & Scooter",
    icon: Bike,
    features: [
      "Responsabilité civile moto",
      "Garantie corporelle du conducteur",
      "Assistance dépannage et remorquage moto 24/7",
      "Options vol et équipement motard",
    ],
    startingPrice: "À partir de 89 DHS TTC / mois",
  },
  accident: {
    title: "Assurance Accident Individuel",
    subtitle: "Protégez vos proches contre les conséquences financières imprévues.",
    description: "Une prise en charge immédiate des frais médicaux, indemnités journalières et capital garanti en cas d'accident de la vie quotidienne ou professionnelle.",
    badge: "Individuelle Accident",
    icon: ShieldAlert,
    features: [
      "Versement d'un capital garanti",
      "Prise en charge des soins d'urgence et hospitalisation",
      "Indemnités journalières en cas d'arrêt de travail",
      "Assistance psychologique et accompagnement familial",
    ],
    startingPrice: "À partir de 45 DHS TTC / mois",
  },
  habitation: {
    title: "Assurance Multirisque Habitation",
    subtitle: "Votre maison ou appartement protégé en toutes circonstances.",
    description: "Que vous soyez propriétaire ou locataire, sécurisez votre logement et vos biens précieux contre les dégâts des eaux, incendies, vols et catastrophes naturelles.",
    badge: "Habitation",
    icon: House,
    features: [
      "Dégâts des eaux et infiltrations",
      "Incendie et explosion",
      "Vol avec effraction et vandalisme",
      "Responsabilité civile chef de famille",
      "Dépannage plomberie et serrurerie d'urgence",
    ],
    startingPrice: "À partir de 65 DHS TTC / mois",
  },
  voyage: {
    title: "Assurance Voyage & Visa Schengen",
    subtitle: "Partez à l'étranger en toute sérénité avec une attestation conforme aux ambassades.",
    description: "Attestation immédiate conforme aux exigences pour les demandes de visa Schengen, USA, Canada et monde entier. Rapatriement médical et prise en charge des frais médicaux à l'étranger.",
    badge: "Voyage International",
    icon: Plane,
    features: [
      "Attestation visa Schengen officielle immédiate",
      "Frais médicaux à l'étranger jusqu'à 30 000 € et plus",
      "Rapatriement sanitaire d'urgence",
      "Assistance perte ou vol de bagages",
    ],
    startingPrice: "À partir de 180 DHS par voyage",
  },
  sante: {
    title: "Assurance Santé & Prévoyance",
    subtitle: "Prenez soin de votre santé et de celle de votre famille.",
    description: "Complémentaire santé hospitalisation, consultations, pharmacie et soins dentaires avec remboursements rapides et tiers payant.",
    badge: "Santé Complémentaire",
    icon: HeartPulse,
    features: [
      "Remboursement des consultations et médicaments",
      "Prise en charge à 100% de l'hospitalisation chirurgicale",
      "Soins optiques et dentaires renforcés",
      "Réseau de cliniques partenaires au Maroc",
    ],
    startingPrice: "À partir de 120 DHS TTC / mois",
  },
  loisir: {
    title: "Assurance Loisir & Sports",
    subtitle: "Vivez vos passions en toute sécurité.",
    description: "Couverture adaptée à la pratique de vos sports et loisirs : sports nautiques, cyclisme, chasse, randonnée et activités de plein air.",
    badge: "Loisir & Sports",
    icon: LeisureIcon,
    features: [
      "Responsabilité civile sportive",
      "Frais de recherche et secours",
      "Assurance matériel de sport",
      "Indemnisation en cas d'accident lors de votre activité",
    ],
    startingPrice: "À partir de 35 DHS TTC / mois",
  },
  entreprise: {
    title: "Solutions d'Assurance Entreprises",
    subtitle: "Accompagnement dédié pour les professionnels, TPE, PME et grandes flottes.",
    description: "Flotte automobile, assurance multirisque professionnelle, RC exploitation, prévoyance groupe et accidents du travail.",
    badge: "Entreprises & Professionnels",
    icon: Building2,
    features: [
      "Flottes de véhicules d'entreprise",
      "Assurance Accident du Travail (Loi 18-12)",
      "Assurance Multirisque Industrielle et Commerciale",
      "Mutuelle Santé Groupe pour vos salariés",
    ],
    startingPrice: "Sur devis personnalisé",
  },
};

type ProductPageProps = {
  productKey: string;
};

export default function ProductPage({ productKey }: ProductPageProps) {
  const config = configs[productKey] || configs.auto;
  const Icon = config.icon;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ nom: "", telephone: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      <DigiassurHeader />

      <main className="flex-1 pt-[116px]">
        {/* Product Hero Banner */}
        <section className="bg-gradient-to-r from-[#153954] via-[#1d4b75] to-[#4b7f9c] text-white py-16 lg:py-24">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 bg-white/10 text-cyan-200 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Icon className="w-4 h-4 text-[#f48161]" />
                  <span>{config.badge}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  {config.title}
                </h1>

                <p className="text-lg lg:text-xl text-cyan-100 font-normal leading-relaxed">
                  {config.subtitle}
                </p>

                <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                  {config.description}
                </p>

                <div className="pt-2">
                  <span className="inline-block bg-[#f48161] text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-md">
                    {config.startingPrice}
                  </span>
                </div>
              </div>

              {/* Quick Quote Form on Hero */}
              <div className="lg:col-span-5 bg-white text-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20">
                <h3 className="text-lg font-bold text-[#153954] mb-1">
                  Demander un tarif {config.title}
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Devis gratuit et sans engagement en moins de 5 minutes.
                </p>

                {submitted ? (
                  <div className="text-center py-6 animate-in zoom-in-95 duration-200">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-base text-[#153954]">Demande bien reçue !</h4>
                    <p className="text-xs text-slate-600 mt-1 mb-4">
                      Un conseiller Digiassur va vous appeler au <strong>{formData.telephone}</strong> pour vous transmettre votre tarif.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-[#f48161] font-bold underline"
                    >
                      Nouvelle demande
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nom & Prénom *</label>
                      <input
                        type="text"
                        required
                        placeholder="Votre nom complet"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#568ba9]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Numéro de téléphone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="06 XX XX XX XX"
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#568ba9]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Adresse Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="exemple@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#568ba9]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-3 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>OBTENIR MON TARIF</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features & Guarantees */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-[#153954] mb-3">
                Garanties et Avantages Inclus
              </h2>
              <p className="text-slate-600 text-sm">
                Des contrats négociés au meilleur prix avec les compagnies leaders du marché.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {config.features.map((feat, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-xs border border-slate-100 flex items-start gap-4"
                >
                  <div className="p-2 rounded-xl bg-orange-50 text-[#f48161] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#153954] mb-1">{feat}</h4>
                    <p className="text-xs text-slate-500">
                      Garantie certifiée conforme et gérée avec rapidité par notre service sinistres.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <PartnersSection />

        {/* Why Digiassur */}
        <WhyDigiassur />

        {/* Assurwi Legal Banner */}
        <AssurwiBanner />
      </main>

      <FloatingWidgets />
      <DigiassurFooter />
    </div>
  );
}
