import { ArrowRight, Globe2, Menu, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { INSURANCES } from "@/lib/insurance-products";

const officialLogo = "https://digiassur.ma/assets/img/frame-4.svg";

export default function DigiassurHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="digi-header">
      <div className="topbar">
        <div className="topbar-inner page-width">
          <nav className="topbar-links" aria-label="Navigation secondaire">
            <Link href="/" className="topbar-active">Particuliers</Link>
            <a href="https://digiassur.ma/entreprise">Entreprises</a>
            <a href="https://digiassur.ma/demande-affiliation">Affiliation</a>
          </nav>
          <div className="topbar-actions">
            <button className="language-button" type="button" aria-label="Langue : français"><Globe2 size={15} /> Français <span aria-hidden="true">⌄</span></button>
            <a className="client-button" href="https://fr.digiassur.ma/connexion"><UserRound size={16} /> Espace client</a>
          </div>
        </div>
      </div>
      <div className="nav-shell">
        <div className="page-width nav-row">
          <Link href="/" className="site-logo" aria-label="Digiassur, accueil"><img className="site-logo-art" src={officialLogo} alt="Digiassur" /></Link>
          <nav className={`product-nav${menuOpen ? " is-open" : ""}`} aria-label="Nos assurances">
            {INSURANCES.map((product) => {
              const Icon = product.icon;
              return (
                <Link key={product.slug} href={`/assurance/${product.slug}`} onClick={closeMenu} className="product-nav-link">
                  <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                  <span>{product.navName}</span>
                </Link>
              );
            })}
            <Link className="mobile-quote-link" href="/devis/auto" onClick={closeMenu}>Obtenir un devis <ArrowRight size={16} /></Link>
          </nav>
          <Link className="nav-quote" href="/devis/auto">Obtenir mon tarif <ArrowRight size={15} /></Link>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
