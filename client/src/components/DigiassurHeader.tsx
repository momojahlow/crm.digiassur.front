import { ArrowRight, Headphones, Menu, X } from "lucide-react";
import { useState } from "react";

type DigiassurHeaderProps = {
  onExplore: () => void;
};

const navigation = [
  { label: "Nos assurances", href: "#nos-assurances" },
  { label: "Notre approche", href: "#accompagnement" },
  { label: "Conseils", href: "#conseils" },
];

function BrandMark() {
  return (
    <a className="brand" href="#accueil" aria-label="Digiassur, accueil">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" fill="none">
          <path d="M20 3.8 34 9v9.8c0 8.1-5.3 14.2-14 17.4C11.3 33 6 26.9 6 18.8V9l14-5.2Z" fill="currentColor" />
          <path d="m12.5 19.6 7.5-6.2 7.5 6.2v8.1h-5v-5.3h-5v5.3h-5v-8.1Z" fill="white" />
          <path d="m10.9 18.9 9.1-7.5 9.1 7.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="brand-name">digi<span>assur</span></span>
    </a>
  );
}

export default function DigiassurHeader({ onExplore }: DigiassurHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header" id="accueil">
      <div className="topline">
        <div className="container topline-inner">
          <span className="topline-note"><Headphones size={15} strokeWidth={1.8} /> Un conseil ? Nos équipes sont là pour vous.</span>
          <a href="#contact" className="topline-link">Parlons de votre projet <ArrowRight size={14} /></a>
        </div>
      </div>
      <div className="nav-wrap">
        <div className="container nav-inner">
          <BrandMark />
          <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Navigation principale">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
            ))}
            <button className="nav-mobile-cta" type="button" onClick={() => { closeMenu(); onExplore(); }}>
              Découvrir les offres <ArrowRight size={16} />
            </button>
          </nav>
          <div className="nav-actions">
            <a href="#contact" className="client-link">Espace client</a>
            <button className="button button-coral button-nav" type="button" onClick={onExplore}>
              Faire un devis <ArrowRight size={16} />
            </button>
          </div>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
