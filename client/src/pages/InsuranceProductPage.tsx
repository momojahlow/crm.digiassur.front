import { ArrowRight, BadgeCheck, Check, ClipboardList, FileSearch, Info, ShieldCheck } from "lucide-react";
import { Link, useRoute } from "wouter";
import DigiassurFooter from "@/components/DigiassurFooter";
import DigiassurHeader from "@/components/DigiassurHeader";
import TrustSection from "@/components/TrustSection";
import { getInsuranceProduct } from "@/lib/insurance-products";
import NotFound from "@/pages/NotFound";

const comparisonPoints = [
  { title: "Garanties", text: "Vérifiez ce qui est inclus et les situations prévues par la notice du contrat.", icon: BadgeCheck },
  { title: "Exclusions", text: "Repérez les limites, conditions et cas qui ne sont pas couverts.", icon: FileSearch },
  { title: "Franchises & plafonds", text: "Comparez les sommes qui peuvent rester à votre charge et les limites d’indemnisation.", icon: Info },
];

export default function InsuranceProductPage() {
  const [, params] = useRoute("/assurance/:slug");
  const product = getInsuranceProduct(params?.slug);
  if (!product) return <NotFound />;
  const Icon = product.icon;
  const productHeadline = product.startingPrice
    ? product.headline.replace(/\s+à partir de\s+[\d\s,.]+DHS.*$/i, "")
    : product.headline;

  return (
    <div className={`digiassur-site product-page product-${product.slug}`}>
      <DigiassurHeader />
      <main>
        <section className="product-hero product-hero-modern" aria-labelledby="product-title">
          <div className="product-hero-shape" aria-hidden="true"><Icon size={120} strokeWidth={0.8} /></div>
          <div className="page-width product-hero-inner">
            <div className="product-hero-copy">
              <nav className="product-breadcrumb" aria-label="Fil d’Ariane"><Link href="/">Accueil</Link><span aria-hidden="true">/</span><span>{product.name}</span></nav>
              <span className="product-type-label"><span className="product-type-dot" /> Assurance {product.name}</span>
              <h1 id="product-title">{productHeadline}</h1>
              <p>{product.description}</p>
              {product.startingPrice && <div className="product-price-block"><span>{product.startingPrice}</span><small>Prix d’appel indicatif. Vérifiez l’éligibilité, les garanties et les conditions applicables.</small></div>}
              <Link className="button button-orange" href={`/devis/${product.slug}`}>Découvrir le parcours démo <ArrowRight size={16} /></Link>
              <span className="product-hero-disclaimer"><ShieldCheck size={15} aria-hidden="true" /> Aucune demande ni donnée personnelle n’est transmise par cette démonstration.</span>
            </div>
            <aside className="product-hero-aside" aria-label="Repères pour comparer une assurance">
              <span className="product-aside-icon"><Icon size={23} aria-hidden="true" /></span>
              <span className="section-kicker">Avant de choisir</span>
              <h2>Les bons repères font la différence.</h2>
              <p>Le niveau de protection ne se résume pas au prix affiché. Prenez le temps de lire les documents de l’offre.</p>
              <div className="product-aside-checks"><span><Check size={14} /> Garanties et limites</span><span><Check size={14} /> Exclusions et conditions</span><span><Check size={14} /> Franchises et plafonds</span></div>
              <Link href="#comparer-offres" className="text-link">Voir les points à comparer <ArrowRight size={15} /></Link>
            </aside>
          </div>
        </section>

        <section className="product-overview page-width" aria-labelledby="product-overview-title">
          <div className="product-overview-main">
            <span className="section-kicker">L’essentiel à savoir</span>
            <h2 id="product-overview-title">{product.coverTitle}</h2>
            <p className="product-overview-lead">{product.description}</p>
            <div className="product-feature-list">
              {product.coverPoints.map((point) => <div className="product-feature" key={point}><span><Check size={14} /></span><p>{point}</p></div>)}
            </div>
            <p className="contract-terms-note"><Info size={16} aria-hidden="true" /> Ces éléments sont des repères généraux, pas une promesse de couverture. Les garanties exactes et leur mise en œuvre dépendent du contrat et de votre situation.</p>
          </div>
          <aside className="product-prep-card" aria-labelledby="product-prep-title">
            <span className="product-prep-icon"><ClipboardList size={21} /></span>
            <span className="section-kicker">Pour découvrir le parcours</span>
            <h2 id="product-prep-title">Les informations demandées en démonstration</h2>
            <p>Le formulaire d’exemple peut vous demander :</p>
            <ul>{product.detailFields.slice(0, 4).map((field) => <li key={field.name}><Check size={14} aria-hidden="true" />{field.label}</li>)}</ul>
            <Link href={`/devis/${product.slug}`} className="text-link">Voir les étapes <ArrowRight size={15} /></Link>
            <small>Les champs illustrent le parcours et ne sont pas transmis ni enregistrés.</small>
          </aside>
        </section>

        <section className="product-comparison" id="comparer-offres" aria-labelledby="comparison-title">
          <div className="page-width">
            <div className="section-heading"><div><span className="section-kicker">Comparer avec méthode</span><h2 id="comparison-title">Trois points à vérifier dans l’offre.</h2></div><p>Les conditions précises varient selon le produit, l’assureur et votre situation. Référez-vous aux documents contractuels.</p></div>
            <div className="product-comparison-grid">{comparisonPoints.map(({ title, text, icon: PointIcon }, index) => <article className="product-comparison-card" key={title}><span className="comparison-card-index">0{index + 1}</span><span className="comparison-card-icon"><PointIcon size={21} /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
          </div>
        </section>

        <section className="product-simulation">
          <div className="page-width simulation-inner"><span className="simulation-icon"><ShieldCheck size={24} /></span><div><span className="section-kicker">Démonstration locale</span><h2>Découvrez les étapes, à votre rythme.</h2><p>Ce parcours ne calcule aucun tarif, ne soumet pas de demande et ne crée pas de contrat.</p></div><Link className="button button-orange" href={`/devis/${product.slug}`}>Voir les étapes <ArrowRight size={16} /></Link></div>
        </section>
        <TrustSection />
      </main>
      <DigiassurFooter />
    </div>
  );
}
