import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { INSURANCES } from "@/lib/insurance-products";

export default function InsuranceExplorer() {
  return (
    <section className="offers-section" id="nos-assurances" aria-labelledby="offers-heading">
      <div className="page-width">
        <div className="section-heading offers-heading">
          <div><span className="section-kicker">Une assurance pour chaque besoin</span><h2 id="offers-heading">Nos offres d’assurance</h2></div>
          <p>Des solutions pour les particuliers, pensées pour offrir une protection complète à un prix abordable.</p>
        </div>
        <div className="offers-grid">
          {INSURANCES.map((product, index) => {
            const Icon = product.icon;
            return (
              <article className="offer-card" key={product.slug} style={{ "--offer-index": index } as React.CSSProperties}>
                <Link className="offer-icon" href={`/assurance/${product.slug}`} aria-label={`Découvrir l’assurance ${product.name}`}><Icon size={27} strokeWidth={1.7} /></Link>
                <div className="offer-card-copy">
                  <h3><Link href={`/assurance/${product.slug}`}>{product.name}</Link></h3>
                  <p>{product.shortDescription}</p>
                  {product.startingPrice && <span className="offer-price">{product.startingPrice}</span>}
                </div>
                <Link className="offer-arrow" href={`/assurance/${product.slug}`} aria-label={`Découvrir ${product.name}`}><ArrowRight size={17} /></Link>
              </article>
            );
          })}
        </div>
        <div className="offer-note"><span className="offer-note-icon"><ShieldCheck size={20} /></span><div><strong>Vous ne savez pas par où commencer ?</strong><span>Choisissez une catégorie et obtenez une simulation guidée.</span></div><Check size={17} className="offer-note-check" /></div>
      </div>
    </section>
  );
}
