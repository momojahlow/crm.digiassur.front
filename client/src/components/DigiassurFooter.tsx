import { ArrowUpRight, ShieldCheck } from "lucide-react";

function FooterBrand() {
  return (
    <a className="brand footer-brand" href="#accueil" aria-label="Digiassur, retour en haut">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" fill="none">
          <path d="M20 3.8 34 9v9.8c0 8.1-5.3 14.2-14 17.4C11.3 33 6 26.9 6 18.8V9l14-5.2Z" fill="currentColor" />
          <path d="m12.5 19.6 7.5-6.2 7.5 6.2v8.1h-5v-5.3h-5v5.3h-5v-8.1Z" fill="#123B5A" />
          <path d="m10.9 18.9 9.1-7.5 9.1 7.5" stroke="#123B5A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="brand-name">digi<span>assur</span></span>
    </a>
  );
}

export default function DigiassurFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-main">
        <div className="footer-about">
          <FooterBrand />
          <p>Une assurance plus claire, plus proche de vous.</p>
          <a className="footer-contact" href="#nos-assurances"><ShieldCheck size={17} /> Choisir une protection <ArrowUpRight size={15} /></a>
        </div>
        <div className="footer-column">
          <h2>Nos assurances</h2>
          <a href="#nos-assurances">Auto</a>
          <a href="#nos-assurances">Habitation</a>
          <a href="#nos-assurances">Santé & prévoyance</a>
          <a href="#nos-assurances">Voyage</a>
        </div>
        <div className="footer-column" id="conseils">
          <h2>À découvrir</h2>
          <a href="#accompagnement">Notre approche</a>
          <a href="#conseils">Conseils pratiques</a>
          <a href="#contact">Nous contacter</a>
          <a href="#contact">Espace client</a>
        </div>
        <div className="footer-callout">
          <span className="footer-callout-tag">À vos côtés</span>
          <h2>Un conseil pour<br />faire le bon choix ?</h2>
          <a href="#nos-assurances" className="footer-arrow-link" aria-label="Découvrir les assurances"><ArrowUpRight size={20} /></a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Digiassur. Tous droits réservés.</span>
        <div><a href="#mentions">Mentions légales</a><a href="#confidentialite">Confidentialité</a><span className="footer-status"><span /> Protection et clarté</span></div>
      </div>
    </footer>
  );
}
