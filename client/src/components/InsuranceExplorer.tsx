import { ArrowRight, CarFront, Check, HeartPulse, House, Plane, ShieldCheck } from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

type Product = {
  id: string;
  name: string;
  descriptor: string;
  detail: string;
  benefits: string[];
  icon: LucideIcon;
};

const products: Product[] = [
  {
    id: "auto",
    name: "Auto",
    descriptor: "Prenez la route sereinement.",
    detail: "Une protection qui s’adapte à votre véhicule, à vos trajets et à votre façon de conduire.",
    benefits: ["Des formules faciles à comparer", "Une assistance selon vos besoins", "Un accompagnement en cas d’imprévu"],
    icon: CarFront,
  },
  {
    id: "habitation",
    name: "Habitation",
    descriptor: "Votre chez-vous bien protégé.",
    detail: "Protégez votre logement et vos proches avec une couverture conçue autour de votre quotidien.",
    benefits: ["Des garanties essentielles et lisibles", "Une protection pour vos biens", "Des démarches simples"],
    icon: House,
  },
  {
    id: "sante",
    name: "Santé & prévoyance",
    descriptor: "Prenez soin de l’essentiel.",
    detail: "Des solutions pour vous aider à avancer avec plus de sérénité, aujourd’hui comme demain.",
    benefits: ["Un accompagnement à chaque étape", "Des options selon votre situation", "Des informations sans jargon"],
    icon: HeartPulse,
  },
  {
    id: "voyage",
    name: "Voyage",
    descriptor: "Partez l’esprit tranquille.",
    detail: "Préparez vos escapades avec une protection simple, pensée pour vous suivre loin de chez vous.",
    benefits: ["Des garanties adaptées au séjour", "Une assistance à portée de main", "Une souscription claire"],
    icon: Plane,
  },
];

type InsuranceExplorerProps = {
  onContact: () => void;
};

export default function InsuranceExplorer({ onContact }: InsuranceExplorerProps) {
  const [selectedId, setSelectedId] = useState(products[0].id);
  const selected = products.find((product) => product.id === selectedId) ?? products[0];
  const SelectedIcon = selected.icon;

  return (
    <section className="insurance-section" id="nos-assurances" aria-labelledby="insurance-title">
      <div className="container">
        <div className="section-heading insurance-heading">
          <div>
            <span className="eyebrow">Des solutions pour vous</span>
            <h2 id="insurance-title">Une protection pour<br /><em>chaque moment de vie.</em></h2>
          </div>
          <p>Choisissez le domaine qui vous concerne. Nous vous aidons à trouver la couverture qui vous correspond, en toute simplicité.</p>
        </div>

        <div className="product-grid" role="group" aria-label="Choisir un type d’assurance">
          {products.map((product, index) => {
            const Icon = product.icon;
            const isSelected = product.id === selectedId;
            return (
              <button
                className={`product-card${isSelected ? " is-selected" : ""}`}
                key={product.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedId(product.id)}
                style={{ "--card-index": index } as React.CSSProperties}
              >
                <span className="product-icon"><Icon size={23} strokeWidth={1.8} /></span>
                <span className="product-name">{product.name}</span>
                <span className="product-descriptor">{product.descriptor}</span>
                <span className="product-link">Explorer <ArrowRight size={15} /></span>
              </button>
            );
          })}
        </div>

        <div className="product-detail" aria-live="polite">
          <div className="product-detail-mark"><SelectedIcon size={24} strokeWidth={1.7} /></div>
          <div className="product-detail-copy">
            <span className="detail-kicker">L’assurance {selected.name.toLowerCase()}</span>
            <h3>{selected.descriptor}</h3>
            <p>{selected.detail}</p>
          </div>
          <ul className="product-benefits">
            {selected.benefits.map((benefit) => (
              <li key={benefit}><span className="check-mark"><Check size={12} /></span>{benefit}</li>
            ))}
          </ul>
          <button className="button button-navy" type="button" onClick={onContact}>
            Être accompagné <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
