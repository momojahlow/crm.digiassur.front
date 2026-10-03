import { ArrowRight, CarFront, Info } from "lucide-react";
import { Link } from "wouter";

export default function DigiassurHero() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero-photo" aria-hidden="true" />
      <div className="home-hero-tint" aria-hidden="true" />
      <div className="page-width home-hero-inner">
        <div className="hero-copy-card">
          <span className="hero-brand-stamp"><CarFront size={25} /></span>
          <span className="hero-kicker">Focus auto · Courtier digital à Casablanca</span>
          <h1 id="home-hero-title">Assurer votre voiture<br />à partir de <em>153 DHS</em><br /><span className="hero-unit">TTC / mois</span></h1>
          <p>Le montant « à partir de » est un repère indicatif affiché par Digiassur. Le tarif et les garanties sont à confirmer selon l’offre et votre situation.</p>
          <div className="hero-actions">
            <Link className="button button-orange" href="/devis/auto">Tester le parcours Auto <ArrowRight size={16} /></Link>
            <a className="button button-outline-light" href="#nos-assurances">Explorer les assurances</a>
          </div>
          <div className="hero-footnote"><Info size={16} aria-hidden="true" /> Démonstration locale : aucun devis réel n’est établi et aucune demande n’est transmise.</div>
        </div>
        <div className="hero-side-note"><span className="hero-side-line" /> Protéger mieux, simplement</div>
      </div>
      <div className="hero-pagination" aria-label="Diapositive 1 sur 3"><span className="is-active" /><span /><span /></div>
    </section>
  );
}
