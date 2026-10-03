import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Link, useRoute } from "wouter";
import DigiassurFooter from "@/components/DigiassurFooter";
import DigiassurHeader from "@/components/DigiassurHeader";
import TrustSection from "@/components/TrustSection";
import { getInsuranceProduct } from "@/lib/insurance-products";
import NotFound from "@/pages/NotFound";

export default function InsuranceProductPage() {
  const [, params] = useRoute("/assurance/:slug");
  const product = getInsuranceProduct(params?.slug);
  if (!product) return <NotFound />;
  const Icon = product.icon;

  return (
    <div className={`digiassur-site product-page product-${product.slug}`}>
      <DigiassurHeader />
      <main>
        <section className="product-hero" aria-labelledby="product-title">
          <div className="product-hero-shape" aria-hidden="true"><Icon size={120} strokeWidth={0.8} /></div>
          <div className="page-width product-hero-inner">
            <div className="product-hero-copy">
              <span className="product-breadcrumb"><Link href="/">Accueil</Link><span>/</span>{product.name}</span>
              <span className="product-hero-icon"><Icon size={25} /></span>
              <h1 id="product-title">{product.headline}</h1>
              <p>{product.description}</p>
              {product.startingPrice && <span className="product-price-note">{product.startingPrice}</span>}
              <Link className="button button-orange" href={`/devis/${product.slug}`}>Obtenir mon devis <ArrowRight size={16} /></Link>
            </div>
            <div className="product-hero-art" aria-hidden="true"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><Icon size={116} strokeWidth={1.1} /></div>
          </div>
        </section>

        <section className="product-intro page-width">
          <div className="product-intro-heading"><span className="section-kicker">L’assurance {product.name.toLowerCase()}</span><h2>{product.coverTitle}</h2></div>
          <div className="product-intro-content"><p>{product.description}</p><ul className="coverage-list">{product.coverPoints.map((point) => <li key={point}><span><Check size={14} /></span>{point}</li>)}</ul><Link className="text-link" href={`/devis/${product.slug}`}>Démarrer une simulation <ArrowRight size={15} /></Link></div>
        </section>

        <section className="product-simulation">
          <div className="page-width simulation-inner"><span className="simulation-icon"><ShieldCheck size={24} /></span><div><span className="section-kicker">Un parcours guidé</span><h2>Quelques questions, une simulation plus claire.</h2><p>Décrivez votre situation, explorez les formules et vérifiez vos réponses dans un parcours adapté à l’assurance {product.name.toLowerCase()}.</p></div><Link className="button button-orange" href={`/devis/${product.slug}`}>Obtenir un devis <ArrowRight size={16} /></Link></div>
        </section>
        <TrustSection />
      </main>
      <DigiassurFooter />
    </div>
  );
}
