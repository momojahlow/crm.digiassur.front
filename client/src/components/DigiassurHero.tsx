import { ArrowDown, ArrowRight, BadgeCheck, Sparkles } from "lucide-react";

type DigiassurHeroProps = {
  onExplore: () => void;
};

export default function DigiassurHero({ onExplore }: DigiassurHeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img
        className="hero-image"
        src="/manus-storage/async-images/glW4jrBAdfbYVnVMsCzgE7/image-1.webp"
        alt="Une famille profite d’un moment paisible à la maison"
      />
      <div className="hero-shade" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><Sparkles size={15} /> L’assurance, en plus simple</div>
          <h1 id="hero-title">Votre quotidien,<br /><em>bien protégé.</em></h1>
          <p className="hero-description">
            Des solutions claires et un accompagnement humain pour protéger ce qui compte, à chaque étape de votre vie.
          </p>
          <div className="hero-actions">
            <button className="button button-coral button-large" type="button" onClick={onExplore}>
              Découvrir nos assurances <ArrowRight size={18} />
            </button>
            <a className="hero-secondary" href="#accompagnement"><span className="play-dot"><ArrowDown size={15} /></span> Notre engagement</a>
          </div>
          <div className="hero-assurance-note"><BadgeCheck size={17} /> Des garanties pensées pour vous, sans jargon.</div>
        </div>
        <a className="hero-scroll" href="#nos-assurances" aria-label="Faire défiler vers les assurances">
          <span>Explorer</span><ArrowDown size={15} />
        </a>
      </div>
      <div className="hero-caption"><span className="caption-line" /> Une protection qui vous ressemble</div>
    </section>
  );
}
