import { CircleDollarSign, FileText, Scale } from "lucide-react";

const checkpoints = [
  {
    title: "Ce qui est couvert",
    text: "Repérez les garanties incluses, les exclusions et les conditions qui s’appliquent à votre situation.",
    icon: FileText,
  },
  {
    title: "Les limites et franchises",
    text: "Vérifiez les plafonds d’indemnisation, les franchises et les montants qui pourraient rester à votre charge.",
    icon: Scale,
  },
  {
    title: "Le coût et les modalités",
    text: "Regardez le montant, l’échéancier, la durée et les services associés, pas seulement le prix d’appel.",
    icon: CircleDollarSign,
  },
];

export default function InsuranceSelectionGuide() {
  return (
    <section className="coverage-guide" aria-labelledby="coverage-guide-title">
      <div className="page-width">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Un repère avant de choisir</span>
            <h2 id="coverage-guide-title">Comparez les garanties, pas seulement le prix.</h2>
          </div>
          <p>Le bon niveau de protection dépend de votre besoin, de votre situation et des conditions propres à chaque contrat.</p>
        </div>
        <div className="coverage-guide-grid">
          {checkpoints.map(({ title, text, icon: Icon }, index) => (
            <article className="coverage-guide-card" key={title}>
              <span className="coverage-guide-index">0{index + 1}</span>
              <span className="coverage-guide-icon"><Icon size={22} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="coverage-guide-note">Les présentes indications sont générales. Les documents contractuels de l’offre concernée font foi.</p>
      </div>
    </section>
  );
}
