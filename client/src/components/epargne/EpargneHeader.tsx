import { useState } from "react";
import { ChevronDown, Menu, UserRound, X } from "lucide-react";

const products = [
  { label: "Auto", href: "https://digiassur.ma/auto", icon: "nav-auto.svg" },
  { label: "Moto", href: "https://digiassur.ma/moto", icon: "nav-moto.svg" },
  {
    label: "Accident",
    href: "https://digiassur.ma/accident",
    icon: "nav-accident.svg",
  },
  {
    label: "Habitation",
    href: "https://digiassur.ma/habitation",
    icon: "nav-habitation.svg",
  },
  {
    label: "Voyage",
    href: "https://digiassur.ma/voyage",
    icon: "nav-voyage.svg",
  },
  {
    label: "Santé/Prévoyance",
    href: "https://digiassur.ma/sante",
    icon: "nav-sante.svg",
  },
  { label: "Épargne", href: "/epargne", icon: "nav-epargne.svg", active: true },
  {
    label: "Loisir",
    href: "https://digiassur.ma/loisir",
    icon: "nav-loisir.svg",
  },
];

export function EpargneBrand({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`epargne-brand${light ? " epargne-brand--light" : ""}`}
      href="/"
      aria-label="Digiassur, accueil"
    >
      <img
        className="epargne-brand-image"
        src="/images/epargne/digiassur-logo.svg"
        alt=""
        aria-hidden="true"
      />
    </a>
  );
}

export default function EpargneHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [audienceOpen, setAudienceOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="epargne-header" id="top">
      <div className="epargne-utility">
        <div className="epargne-utility-left">
          <button
            className="epargne-audience-trigger"
            type="button"
            aria-expanded={audienceOpen}
            onClick={() => setAudienceOpen(open => !open)}
          >
            Particuliers <ChevronDown size={15} aria-hidden="true" />
          </button>
          <div
            className={`epargne-audience-links${audienceOpen ? " is-open" : ""}`}
          >
            <a href="#footer" onClick={() => setAudienceOpen(false)}>
              Entreprises
            </a>
            <a href="#footer" onClick={() => setAudienceOpen(false)}>
              Marocains de l’étranger
            </a>
            <a href="#footer" onClick={() => setAudienceOpen(false)}>
              Parrainage
            </a>
            <a
              className="epargne-pip"
              href="#footer"
              onClick={() => setAudienceOpen(false)}
            >
              <span aria-hidden="true">●</span> PipPipYalah
            </a>
          </div>
        </div>
        <div className="epargne-utility-right">
          <div className="epargne-language-wrap">
            <button
              className="epargne-language-trigger"
              type="button"
              aria-expanded={languageOpen}
              onClick={() => setLanguageOpen(open => !open)}
            >
              <img
                className="epargne-language-icon"
                src="/images/epargne/language-icon.png"
                alt=""
              />{" "}
              <span>Français</span> <ChevronDown size={14} aria-hidden="true" />
            </button>
            {languageOpen && (
              <div
                className="epargne-language-menu"
                role="group"
                aria-label="Langue du site"
              >
                <span aria-current="true">Français ✓</span>
                <span lang="en">English</span>
                <span lang="ar" dir="rtl">
                  العربية
                </span>
              </div>
            )}
          </div>
          <a className="epargne-client-link" href="#espace-client">
            <UserRound size={17} aria-hidden="true" /> Espace client
          </a>
          <button
            className="epargne-icon-button epargne-search-mobile"
            type="button"
            aria-label={
              searchOpen ? "Fermer la recherche" : "Ouvrir la recherche"
            }
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen(open => !open)}
          >
            {searchOpen ? (
              <X size={21} />
            ) : (
              <img
                className="epargne-search-icon"
                src="/images/epargne/search.svg"
                alt=""
              />
            )}
          </button>
          <button
            className="epargne-icon-button epargne-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(open => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      <div className="epargne-primary-row">
        <EpargneBrand />
        <nav
          className={`epargne-product-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Nos assurances"
        >
          {products.map(product => (
            <a
              href={product.href}
              key={product.label}
              className={product.active ? "is-active" : ""}
              aria-current={product.active ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              <img
                className="epargne-product-icon"
                src={`/images/epargne/${product.icon}`}
                alt=""
              />
              {product.label}
            </a>
          ))}
          <button
            className="epargne-icon-button epargne-search-desktop"
            type="button"
            aria-label={
              searchOpen ? "Fermer la recherche" : "Ouvrir la recherche"
            }
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen(open => !open)}
          >
            {searchOpen ? (
              <X size={19} />
            ) : (
              <img
                className="epargne-search-icon"
                src="/images/epargne/search.svg"
                alt=""
              />
            )}
          </button>
        </nav>
        <a
          className="epargne-mobile-account"
          href="#espace-client"
          aria-label="Espace client"
        >
          <img src="/images/epargne/account-icon.png" alt="" />
        </a>
      </div>

      {searchOpen && (
        <form
          className="epargne-search-panel"
          role="search"
          onSubmit={event => event.preventDefault()}
        >
          <label htmlFor="epargne-search">Rechercher sur Digiassur</label>
          <input
            id="epargne-search"
            type="search"
            placeholder="Que recherchez-vous ?"
            autoFocus
          />
          <button type="submit">Rechercher</button>
        </form>
      )}
    </header>
  );
}
