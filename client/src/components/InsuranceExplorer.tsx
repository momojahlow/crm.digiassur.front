import { ArrowRight, Info, Search, ShieldCheck, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { INSURANCES } from "@/lib/insurance-products";
import { INSURANCE_GROUPS, insuranceGroupLabel, insuranceMatchesGroup, normalizeInsuranceSearch, type InsuranceGroupKey } from "@/lib/insurance-groups";

export default function InsuranceExplorer() {
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState<InsuranceGroupKey>("all");
  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalizeInsuranceSearch(query);
    return INSURANCES.filter((product) => {
      const searchable = normalizeInsuranceSearch(`${product.name} ${product.navName} ${product.shortDescription} ${product.headline} ${product.quoteStep}`);
      return insuranceMatchesGroup(product.slug, activeGroup) && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeGroup, query]);

  return (
    <section className="offers-section" id="nos-assurances" aria-labelledby="offers-heading">
      <div className="page-width">
        <div className="section-heading offers-heading">
          <div><span className="section-kicker">Par où commencer ?</span><h2 id="offers-heading">Choisissez l’assurance liée à votre besoin.</h2></div>
          <p>Filtrez les catégories ou recherchez un sujet. Puis vérifiez les garanties, exclusions et conditions de l’offre concernée.</p>
        </div>
        <div className="insurance-catalog-tools">
          <label className="catalog-search" htmlFor="insurance-catalog-search"><Search size={18} aria-hidden="true" /><span className="visually-hidden">Rechercher une assurance</span><input id="insurance-catalog-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher : auto, logement, santé…" />{query && <button type="button" aria-label="Effacer la recherche" onClick={() => setQuery("")}><X size={16} /></button>}</label>
          <div className="catalog-filter-list" aria-label="Filtrer par besoin">
            {INSURANCE_GROUPS.map((group) => <button key={group.key} type="button" className={`catalog-filter-chip${activeGroup === group.key ? " is-active" : ""}`} aria-pressed={activeGroup === group.key} onClick={() => setActiveGroup(group.key)}>{group.label}</button>)}
          </div>
        </div>
        <div className="catalog-result-summary" aria-live="polite">
          <span><strong>{filteredProducts.length}</strong> {filteredProducts.length > 1 ? "assurances affichées" : "assurance affichée"}</span>
          {(query || activeGroup !== "all") && <button type="button" onClick={() => { setQuery(""); setActiveGroup("all"); }}>Réinitialiser les filtres</button>}
        </div>
        {filteredProducts.length ? (
          <div className="offers-grid">
            {filteredProducts.map((product, index) => {
              const Icon = product.icon;
              return (
                <article className="offer-card" key={product.slug} style={{ "--offer-index": index } as React.CSSProperties}>
                  <div className="offer-card-topline"><Link className="offer-icon" href={`/assurance/${product.slug}`} aria-label={`Explorer l’assurance ${product.name}`}><Icon size={25} strokeWidth={1.7} /></Link><span className="offer-group-tag">{insuranceGroupLabel(product.slug)}</span></div>
                  <div className="offer-card-copy">
                    <h3><Link href={`/assurance/${product.slug}`}>{product.name}</Link></h3>
                    <p>{product.shortDescription}</p>
                    {product.startingPrice && <><span className="offer-price">{product.startingPrice}</span><span className="offer-price-note">Prix d’appel indicatif, conditions à vérifier.</span></>}
                  </div>
                  <Link className="offer-arrow" href={`/assurance/${product.slug}`} aria-label={`Découvrir l’assurance ${product.name}`}><ArrowRight size={17} /></Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="catalog-empty-state">
            <span className="catalog-empty-icon"><Search size={23} /></span>
            <div><strong>Aucun résultat dans cette sélection</strong><p>Essayez un autre mot-clé ou affichez toutes les assurances.</p></div>
            <button type="button" className="button button-secondary" onClick={() => { setQuery(""); setActiveGroup("all"); }}>Afficher toutes les assurances</button>
          </div>
        )}
        <div className="offer-note"><span className="offer-note-icon"><Info size={20} aria-hidden="true" /></span><div><strong>Un contrat se compare au-delà du prix.</strong><span>Vérifiez garanties, exclusions, franchises, plafonds et modalités dans les documents de l’offre.</span></div><ShieldCheck size={18} className="offer-note-check" aria-hidden="true" /></div>
      </div>
    </section>
  );
}
