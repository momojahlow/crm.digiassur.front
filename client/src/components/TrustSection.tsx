import { HeartHandshake, MessageCircle, ShieldCheck } from "lucide-react";

const promises = [
  {
    title: "Des garanties lisibles",
    text: "Des informations claires pour comprendre vos choix et avancer en confiance.",
    icon: ShieldCheck,
  },
  {
    title: "Un accompagnement humain",
    text: "Une équipe à votre écoute pour vous guider lorsque vous en avez besoin.",
    icon: HeartHandshake,
  },
  {
    title: "Une relation simple",
    text: "Des démarches pensées pour vous faire gagner du temps, sans perdre le fil.",
    icon: MessageCircle,
  },
];

export default function TrustSection() {
  return (
    <>
      <section className="trust-strip" aria-label="Les engagements Digiassur">
        <div className="container trust-items">
          {promises.map(({ title, text, icon: Icon }) => (
            <article className="trust-item" key={title}>
              <span className="trust-icon"><Icon size={22} strokeWidth={1.7} /></span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>
      <section className="approach-section" id="accompagnement" aria-labelledby="approach-title">
        <div className="container approach-layout">
          <div className="approach-intro">
            <span className="eyebrow">Notre approche</span>
            <h2 id="approach-title">L’assurance devrait être <em>facile à vivre.</em></h2>
          </div>
          <div className="approach-body">
            <p>Chez Digiassur, nous croyons qu’une bonne protection commence par une bonne compréhension. Nous rendons les options plus lisibles et restons à vos côtés pour vous aider à choisir.</p>
            <a className="text-link" href="#contact">Découvrir notre engagement <span aria-hidden="true">↗</span></a>
          </div>
          <div className="approach-note">
            <span className="note-ornament" aria-hidden="true">“</span>
            <p>Des réponses claires. Des choix qui vous ressemblent.</p>
            <span className="note-caption">L’esprit Digiassur</span>
          </div>
        </div>
      </section>
    </>
  );
}
