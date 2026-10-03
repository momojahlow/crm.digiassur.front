import { ArrowRight, Info, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { INSURANCES } from "@/lib/insurance-products";

export default function InsuranceExplorer() {
  return (
    <section className="offers-section" id="nos-assurances" aria-labelledby="offers-heading">
      <div className="page-width">
        <div className="section-heading offers-heading">
          <div><span className="section-kicker">Par où commencer ?</span><h2 id="offers-heading">Choisissez l’assurance liée à votre besoin.</h2></div>
          <p>Explorez une catégorie puis ses points de vigilance. Les tarifs, garanties et conditions doivent être confirmés sur l’offre concernée.</p>
        </div>
        <div className="offers-grid">
          {INSURANCES.map((product, index) => {
            const Icon = product.icon;
            return (
              <article className="offer-card" key={product.slug} style={{ "--offer-index": index } as React.CSSProperties}>
                <Link className="offer-icon" href={`/assurance/${product.slug}`} aria-label={`Explorer l’assurance ${product.name}`}><Icon size={27} strokeWidth={1.7} /></Link>
                <div className="offer-card-copy">
                  <h3><Link href={`/assurance/${product.slug}`}>{product.name}</Link></h3>
                  <p>{product.shortDescription}</p>
                  {product.startingPrice && <><span className="offer-price">{product.startingPrice}</span><span className="offer-price-note">Repère indicatif, à confirmer.</span></>}
                </div>
                <Link className="offer-arrow" href={`/assurance/${product.slug}`} aria-label={`Explorer ${product.name}`}><ArrowRight size={17} /></Link>
              </article>
            );
          })}
        </div>
        <div className="offer-note"><span className="offer-note-icon"><Info size={20} aria-hidden="true" /></span><div><strong>Un contrat se compare au-delà du prix.</strong><span>Vérifiez garanties, exclusions, franchises, plafonds et modalités dans les documents de l’offre.</span></div><ShieldCheck size={18} className="offer-note-check" aria-hidden="true" /></div>
      </div>
    </section>
  );
}
