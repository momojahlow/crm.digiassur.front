import { HeartHandshake, Headphones, ShieldCheck } from "lucide-react";

const partners = [
  { name: "AXA", src: "https://digiassur.ma/assets/img/axa-768-1-2.svg" },
  { name: "Allianz", src: "https://digiassur.ma/assets/img/allianz-2-1-2.svg" },
  { name: "Sanlam", src: "https://digiassur.ma/assets/img/groupe-2798@2x.png" },
  { name: "RMA", src: "https://digiassur.ma/assets/img/rma-1-1.svg" },
  { name: "Assur'wi", src: "https://digiassur.ma/assets/img/group-138@2x.png" },
  { name: "AtlantaSanad", src: "https://digiassur.ma/assets/img/rectangle-9@2x.png" },
];

const promises = [
  { title: "Des informations claires", text: "Des garanties présentées simplement, sans jargon.", icon: ShieldCheck },
  { title: "Un accompagnement humain", text: "Une équipe à l’écoute pour vous guider à chaque étape.", icon: HeartHandshake },
  { title: "Une relation de proximité", text: "Digiassur, courtier digital basé à Casablanca.", icon: Headphones },
];

export default function TrustSection() {
  return (
    <>
      <section className="partners-section" aria-label="Partenaires assureurs">
        <div className="page-width"><div className="partners-heading"><span className="section-kicker">À vos côtés</span><h2>Nos partenaires</h2><p>Nous travaillons avec des compagnies d’assurance reconnues pour vous proposer des solutions adaptées.</p></div>
          <div className="partners-row">{partners.map((partner) => <div className="partner-logo" key={partner.name}><img src={partner.src} alt={partner.name} decoding="async" /></div>)}</div>
        </div>
      </section>
      <section className="promise-section" aria-label="Pourquoi choisir Digiassur">
        <div className="page-width promise-grid">{promises.map(({ title, text, icon: Icon }) => <article className="promise-card" key={title}><span className="promise-icon"><Icon size={22} /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
    </>
  );
}
