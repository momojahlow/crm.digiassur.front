import { useState } from "react";
import EpargneFooter from "@/components/epargne/EpargneFooter";
import EpargneHeader from "@/components/epargne/EpargneHeader";
import EpargneAssistance, {
  SimulationDialog,
} from "@/components/epargne/EpargneAssistance";
import "./epargne.css";

const partners = [
  { name: "AXA", image: "partner-axa.svg" },
  { name: "Allianz", image: "partner-allianz.svg" },
  { name: "Sanlam", image: "partner-sanlam.png" },
  { name: "RMA", image: "partner-rma.svg" },
  { name: "Assur’Wi", image: "partner-assurwi.png" },
  { name: "AtlantaSanad", image: "partner-atlanta.png" },
];

function PartnerStrip() {
  const [page, setPage] = useState(0);
  return (
    <section
      className="epargne-partners epargne-container"
      aria-label="Nos partenaires"
    >
      <div className="epargne-partner-grid">
        {partners.map((partner, index) => {
          const hiddenOnMobile = index < page * 2 || index >= page * 2 + 2;
          return (
            <div
              className={`epargne-partner${hiddenOnMobile ? " is-mobile-hidden" : ""}`}
              key={partner.name}
            >
              <img
                src={`/images/epargne/${partner.image}`}
                alt={partner.name}
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
      <div
        className="epargne-partner-dots"
        role="group"
        aria-label="Pages des partenaires"
      >
        {[0, 1, 2].map(index => (
          <button
            type="button"
            key={index}
            className={page === index ? "is-current" : ""}
            aria-label={`Afficher les partenaires ${index * 2 + 1} et ${index * 2 + 2}`}
            aria-pressed={page === index}
            onClick={() => setPage(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default function Epargne() {
  const [simulationOpen, setSimulationOpen] = useState(false);

  return (
    <div className="epargne-page">
      <EpargneHeader />
      <main>
        <section className="epargne-hero" aria-labelledby="epargne-hero-title">
          <div className="epargne-hero-photo">
            <img
              src="/images/epargne/banner-epargne.jpg"
              alt="Une personne dépose une pièce dans une tirelire pour préparer ses projets"
            />
          </div>
          <div className="epargne-hero-panel">
            <img
              className="epargne-piggy-watermark"
              src="/images/epargne/epargne-drawer.png"
              alt=""
              aria-hidden="true"
            />
            <div className="epargne-hero-copy">
              <h1 id="epargne-hero-title">
                Assurez-vous une épargne confortable pour réaliser vos projets
              </h1>
              <p>Épargnez pour réaliser vos rêves.</p>
              <button
                className="epargne-button epargne-button-coral"
                type="button"
                onClick={() => setSimulationOpen(true)}
              >
                Obtenir une simulation
              </button>
            </div>
          </div>
          <div className="epargne-savings-badge" aria-hidden="true">
            <img src="/images/epargne/badge-epargne.svg" alt="" />
          </div>
        </section>

        <section
          className="epargne-intro"
          aria-labelledby="epargne-intro-title"
        >
          <h2 id="epargne-intro-title">
            Bienvenue sur l’espace Épargne de Digiassur
          </h2>
          <div className="epargne-intro-layout epargne-container">
            <div className="epargne-intro-photo">
              <img
                src="/images/epargne/epargne-pic.jpg"
                alt="Une jeune femme souriante auprès d’un bocal rempli de pièces"
                loading="lazy"
              />
            </div>
            <div className="epargne-intro-copy">
              <p>
                Nous pouvons tous, à un moment donné, économiser de l’argent
                pour faire face à des situations imprévues, financer un projet
                ou encore préparer sa retraite.
              </p>
              <p>
                Pour faire face à cela, nous mettons à votre disposition un
                produit d’épargne qui vous permet de constituer une épargne
                progressive en toute sécurité.
              </p>
              <button
                className="epargne-button epargne-button-coral"
                type="button"
                onClick={() => setSimulationOpen(true)}
              >
                Obtenir une simulation
              </button>
            </div>
          </div>
        </section>

        <PartnerStrip />
      </main>
      <EpargneFooter />
      <EpargneAssistance />
      <SimulationDialog
        open={simulationOpen}
        onClose={() => setSimulationOpen(false)}
      />
    </div>
  );
}
