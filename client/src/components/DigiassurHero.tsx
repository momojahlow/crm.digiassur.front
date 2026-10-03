import { ArrowRight, BadgeCheck, CarFront } from "lucide-react";
import { Link } from "wouter";

export default function DigiassurHero() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero-photo" aria-hidden="true" />
      <div className="home-hero-tint" aria-hidden="true" />
      <div className="page-width home-hero-inner">
        <div className="hero-copy-card">
          <span className="hero-brand-stamp"><CarFront size={25} /></span>
          <span className="hero-kicker">Votre assurance auto, en toute simplicité</span>
          <h1 id="home-hero-title">Assurer votre voiture<br />à partir de <em>153 DHS</em><br /><span className="hero-unit">TTC / Mois</span></h1>
          <p>Recevez votre attestation à domicile ou au bureau. Des garanties claires et un accompagnement qui reste à vos côtés.</p>
          <div className="hero-actions">
            <Link className="button button-orange" href="/devis/auto">Obtenir mon tarif <ArrowRight size={16} /></Link>
            <Link className="button button-outline-light" href="/assurance/auto">Découvrir l’assurance auto</Link>
          </div>
          <div className="hero-footnote"><BadgeCheck size={16} /> Une simulation simple, sans engagement.</div>
        </div>
        <div className="hero-side-note"><span className="hero-side-line" /> Protéger mieux, simplement</div>
      </div>
      <div className="hero-pagination" aria-label="Diapositive 1 sur 3"><span className="is-active" /><span /><span /></div>
    </section>
  );
}
