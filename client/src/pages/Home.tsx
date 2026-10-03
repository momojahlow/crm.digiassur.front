import { ArrowRight, CarFront, HeartPulse, House, Plane, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import DigiassurFooter from "@/components/DigiassurFooter";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurHero from "@/components/DigiassurHero";
import InsuranceExplorer from "@/components/InsuranceExplorer";
import InsuranceSelectionGuide from "@/components/InsuranceSelectionGuide";
import TrustSection from "@/components/TrustSection";
import { INSURANCES } from "@/lib/insurance-products";
import "./digiassur.css";

const demonstrations = [
  { slug: "auto", title: "Auto", text: "Parcourez les informations sur le véhicule, son année et son usage.", icon: CarFront },
  { slug: "habitation", title: "Habitation", text: "Découvrez les renseignements utiles sur le logement et votre statut.", icon: House },
  { slug: "voyage", title: "Voyage", text: "Explorez les étapes liées à la destination, aux dates et aux voyageurs.", icon: Plane },
] as const;

export default function Home() {
  return (
    <div className="digiassur-site home-page">
      <DigiassurHeader />
      <main>
        <DigiassurHero />
        <section className="home-intro page-width" aria-labelledby="home-intro-title">
          <span className="section-kicker">Digiassur · Courtier digital à Casablanca</span>
          <h2 id="home-intro-title">Faire le point sur votre besoin,<br /><em>avant de choisir vos garanties.</em></h2>
          <p>Véhicule et usage, statut du logement, destination, composition du foyer ou projet d’épargne : les bonnes questions dépendent de ce que vous souhaitez protéger. Commencez par choisir votre besoin.</p>
        </section>
        <InsuranceExplorer />
        <InsuranceSelectionGuide />
        <section className="simulations-section" id="simulations" aria-labelledby="simulations-title">
          <div className="page-width">
            <div className="section-heading">
              <div><span className="section-kicker">Pour découvrir les étapes</span><h2 id="simulations-title">Parcours de démonstration</h2></div>
              <p>Ces formulaires illustrent les informations à préparer. Ils ne calculent pas de tarif, ne constituent pas un devis et ne transmettent aucune demande.</p>
            </div>
            <div className="simulations-grid">
              {demonstrations.map(({ slug, title, text, icon: Icon }) => (
                <article className="simulation-card" key={slug}>
                  <span className="simulation-card-icon"><Icon size={25} /></span>
                  <span className="simulation-card-kicker">Démonstration · {INSURANCES.find((item) => item.slug === slug)?.name}</span>
                  <h3>Parcours {title}</h3>
                  <p>{text}</p>
                  <Link href={`/devis/${slug}`} className="text-link">Voir les étapes <ArrowRight size={15} /></Link>
                </article>
              ))}
            </div>
            <p className="demo-privacy-note"><ShieldCheck size={16} aria-hidden="true" /> Les réponses restent dans cette démonstration locale; elles ne sont ni envoyées ni enregistrées.</p>
          </div>
        </section>
        <TrustSection />
        <section className="home-cta" aria-labelledby="home-cta-title">
          <div className="page-width home-cta-inner">
            <div>
              <span className="section-kicker">À vos côtés</span>
              <h2 id="home-cta-title">Vous hésitez entre plusieurs protections ?</h2>
              <p>Commencez par comparer les garanties, leurs limites, les franchises et les modalités de chaque offre.</p>
            </div>
            <Link className="button button-orange" href="#nos-assurances">Choisir un besoin <ArrowRight size={16} /></Link>
            <span className="cta-watermark"><ShieldCheck size={110} aria-hidden="true" /></span>
          </div>
        </section>
      </main>
      <DigiassurFooter />
    </div>
  );
}
