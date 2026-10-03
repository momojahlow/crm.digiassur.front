import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link, useRoute } from "wouter";
import DigiassurFooter from "@/components/DigiassurFooter";
import DigiassurHeader from "@/components/DigiassurHeader";
import InsuranceWizard from "@/components/InsuranceWizard";
import TrustSection from "@/components/TrustSection";
import { getInsuranceProduct } from "@/lib/insurance-products";
import NotFound from "@/pages/NotFound";

export default function QuotePage() {
  const [, params] = useRoute("/devis/:slug");
  const product = getInsuranceProduct(params?.slug);
  if (!product) return <NotFound />;
  const Icon = product.icon;

  return (
    <div className={`digiassur-site quote-page quote-${product.slug}`}>
      <DigiassurHeader />
      <main>
        <section className="quote-banner" aria-labelledby="quote-title">
          <div className="page-width quote-banner-inner">
            <Link className="quote-back" href={`/assurance/${product.slug}`}><ArrowLeft size={15} /> Retour à {product.name}</Link>
            <span className="quote-banner-icon"><Icon size={24} /></span>
            <span className="quote-banner-kicker">Digiassur · Simulation guidée</span>
            <h1 id="quote-title">Obtenir mon tarif {product.name}</h1>
            <p>Quelques étapes pour préparer votre simulation.</p>
            <span className="quote-banner-dots" aria-hidden="true"><i /><i /><i /></span>
          </div>
        </section>
        <InsuranceWizard product={product} />
        <section className="quote-trust"><div className="page-width"><ShieldCheck size={18} /><span>Simulation de démonstration — aucun contrat ni demande réelle n’est créé.</span></div></section>
        <TrustSection />
      </main>
      <DigiassurFooter />
    </div>
  );
}
