import { useState } from "react";
import EpargneFooter from "@/components/epargne/EpargneFooter";
import DigiassurHeader from "@/components/DigiassurHeader";
import EpargneAssistance, {
  SimulationDialog,
} from "@/components/epargne/EpargneAssistance";
import "./digiassur.css";
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
    <div className="digiassur-site epargne-shell">
      <DigiassurHeader />
      <div className="epargne-page">
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
                  Préparez votre avenir avec une épargne pensée pour vos projets
                </h1>
                <p>Épargner pour vos projets, à votre rythme.</p>
                <button
                  className="epargne-button epargne-button-coral"
                  type="button"
                  onClick={() => setSimulationOpen(true)}
                >
                  Découvrir la démonstration
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
              Faire le point sur votre projet d’épargne
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
                  Une épargne peut accompagner différents projets : anticiper une dépense,
                  financer une envie ou préparer un horizon plus lointain. Le choix dépend
                  notamment de votre objectif, de la durée et de la disponibilité souhaitée.
                </p>
                <p>
                  Les caractéristiques varient selon chaque solution. Avant de vous engager,
                  prenez connaissance des frais, des conditions de retrait et des éventuels
                  risques ou garanties mentionnés dans la documentation du contrat.
                </p>
                <button
                  className="epargne-button epargne-button-coral"
                  type="button"
                  onClick={() => setSimulationOpen(true)}
                >
                  Parcourir les étapes en démo
                </button>
                <p className="epargne-disclaimer"><strong>À noter :</strong> cette démonstration locale ne constitue ni un conseil financier, ni une simulation de rendement, ni une demande de souscription.</p>
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
    </div>
  );
}
