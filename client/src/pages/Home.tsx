import { ArrowRight, CarFront, HeartPulse, House, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import DigiassurFooter from "@/components/DigiassurFooter";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurHero from "@/components/DigiassurHero";
import InsuranceExplorer from "@/components/InsuranceExplorer";
import TrustSection from "@/components/TrustSection";
import { INSURANCES } from "@/lib/insurance-products";
import "./digiassur.css";

const simulations = [
  { slug: "auto", title: "Simulateur Auto", text: "Effectuez gratuitement votre devis Auto.", icon: CarFront },
  { slug: "sante", title: "Simulateur Santé", text: "Découvrez les solutions santé et prévoyance.", icon: HeartPulse },
  { slug: "habitation", title: "Simulateur Habitation", text: "Protégez votre logement et vos biens.", icon: House },
] as const;

export default function Home() {
  return (
    <div className="digiassur-site home-page">
      <DigiassurHeader />
      <main>
        <DigiassurHero />
        <section className="home-intro page-width"><span className="section-kicker">Digiassur · Courtier digital à Casablanca</span><h2>Bienvenue sur Digiassur,<br /><em>votre assurance plus accessible.</em></h2><p>Nous vous aidons à trouver la protection qui correspond à votre situation, avec des informations claires et un accompagnement de proximité.</p></section>
        <InsuranceExplorer />
        <section className="simulations-section" id="simulations">
          <div className="page-width">
            <div className="section-heading"><div><span className="section-kicker">Avancez à votre rythme</span><h2>Nos simulations</h2></div><p>Choisissez un parcours et renseignez les éléments utiles pour préparer une simulation de démonstration.</p></div>
            <div className="simulations-grid">{simulations.map(({ slug, title, text, icon: Icon }) => <article className="simulation-card" key={slug}><span className="simulation-card-icon"><Icon size={25} /></span><span className="simulation-card-kicker">Digiassur · {INSURANCES.find((item) => item.slug === slug)?.name}</span><h3>{title}</h3><p>{text}</p><Link href={`/devis/${slug}`} className="text-link">Demandez votre simulation <ArrowRight size={15} /></Link></article>)}</div>
          </div>
        </section>
        <TrustSection />
        <section className="home-cta"><div className="page-width home-cta-inner"><div><span className="section-kicker">À vos côtés</span><h2>Besoin d’un conseil<br />pour faire le bon choix ?</h2><p>Explorez les garanties ou démarrez une simulation guidée, sans engagement.</p></div><Link className="button button-orange" href="/devis/auto">Commencer une simulation <ArrowRight size={16} /></Link><span className="cta-watermark"><ShieldCheck size={110} /></span></div></section>
      </main>
      <DigiassurFooter />
    </div>
  );
}
