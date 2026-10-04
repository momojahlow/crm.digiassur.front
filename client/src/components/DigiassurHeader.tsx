import { ArrowRight, ChevronDown, Headphones, Search, ShieldCheck, UserRound, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { INSURANCES } from "@/lib/insurance-products";
import { INSURANCE_GROUPS, insuranceMatchesGroup, normalizeInsuranceSearch, type InsuranceGroupKey } from "@/lib/insurance-groups";

const officialLogo = "https://digiassur.ma/assets/img/frame-4.svg";

export default function DigiassurHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState<InsuranceGroupKey>("all");
  const [location] = useLocation();

  const visibleProducts = useMemo(() => {
    const normalizedQuery = normalizeInsuranceSearch(query);
    return INSURANCES.filter((product) => {
      const matchesGroup = insuranceMatchesGroup(product.slug, activeGroup);
      const searchText = normalizeInsuranceSearch(
        `${product.name} ${product.navName} ${product.headline} ${product.shortDescription} ${product.quoteStep}`,
      );
      return matchesGroup && (!normalizedQuery || searchText.includes(normalizedQuery));
    });
  }, [activeGroup, query]);

  const currentSlug = location.startsWith("/assurance/") ? location.split("/")[2] : "";
  const closeMenu = () => setMenuOpen(false);

  function handleMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") closeMenu();
  }

  return (
    <header className="digi-header">
      <div className="topbar">
        <div className="topbar-inner page-width">
          <div className="topbar-help">
            <Headphones size={19} aria-hidden="true" />
            <span>Un conseil ? Nos équipes sont là pour vous.</span>
          </div>
          <a className="topbar-project-link" href="https://digiassur.ma/contactez-nous">
            Parlons de votre projet <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="nav-shell">
        <div className="page-width nav-row">
          <Link href="/" className="site-logo" aria-label="Digiassur, accueil"><img className="site-logo-art" src={officialLogo} alt="Digiassur" /></Link>
          <button
            className={`insurance-menu-trigger${menuOpen ? " is-open" : ""}`}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="insurance-mega-menu"
            onClick={() => setMenuOpen((open) => !open)}
            onKeyDown={(event) => event.key === "Escape" && closeMenu()}
          >
            <ShieldCheck size={17} aria-hidden="true" />
            <span>Nos assurances</span>
            <ChevronDown className="insurance-menu-chevron" size={16} aria-hidden="true" />
          </button>
          <Link className="nav-quote" href="/comparateur-auto">Comparer les offres Auto <ArrowRight size={15} /></Link>
          <a className="client-nav-link" href="https://fr.digiassur.ma/connexion" aria-label="Espace client"><UserRound size={18} aria-hidden="true" /><span>Espace client</span></a>
        </div>
        {menuOpen && (
          <div className="insurance-menu-backdrop" onClick={closeMenu} aria-hidden="true" />
        )}
        <div
          id="insurance-mega-menu"
          className={`insurance-mega-menu${menuOpen ? " is-open" : ""}`}
          aria-label="Rechercher une assurance"
          aria-hidden={!menuOpen}
          onKeyDown={handleMenuKeyDown}
        >
          <div className="insurance-mega-inner">
            <div className="insurance-mega-heading">
              <div>
                <span className="section-kicker">Vos besoins, nos repères</span>
                <h2>Que souhaitez-vous protéger ?</h2>
                <p>Choisissez une catégorie ou recherchez directement.</p>
              </div>
              <button className="insurance-menu-close" type="button" onClick={closeMenu} aria-label="Fermer le menu des assurances"><X size={19} /></button>
            </div>
            <form className="insurance-search" role="search" onSubmit={(event) => event.preventDefault()}>
              <Search size={18} aria-hidden="true" />
              <label className="visually-hidden" htmlFor="insurance-menu-search">Rechercher parmi les assurances</label>
              <input id="insurance-menu-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex. voiture, logement, santé…" />
              {query && <button type="button" className="insurance-search-clear" onClick={() => setQuery("")} aria-label="Effacer la recherche"><X size={16} /></button>}
            </form>
            <div className="insurance-filter-row" aria-label="Filtrer les assurances par besoin">
              {INSURANCE_GROUPS.map((group) => (
                <button key={group.key} type="button" className={`insurance-filter-chip${activeGroup === group.key ? " is-active" : ""}`} aria-pressed={activeGroup === group.key} onClick={() => setActiveGroup(group.key)}>
                  {group.label}
                </button>
              ))}
            </div>
            <div className="insurance-menu-resultline" aria-live="polite">
              <span>{visibleProducts.length} {visibleProducts.length > 1 ? "catégories" : "catégorie"}</span>
              {(query || activeGroup !== "all") && <button type="button" onClick={() => { setQuery(""); setActiveGroup("all"); }}>Tout afficher</button>}
            </div>
            {visibleProducts.length ? (
              <div className="insurance-menu-grid">
                {visibleProducts.map((product) => {
                  const Icon = product.icon;
                  const active = currentSlug === product.slug;
                  return (
                    <Link key={product.slug} href={`/assurance/${product.slug}`} className={`insurance-menu-card${active ? " is-current" : ""}`} aria-current={active ? "page" : undefined} onClick={closeMenu}>
                      <span className="insurance-menu-icon"><Icon size={20} aria-hidden="true" /></span>
                      <span className="insurance-menu-card-copy"><strong>{product.name}</strong><small>{product.shortDescription}</small></span>
                      <ArrowRight className="insurance-menu-arrow" size={16} aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="insurance-menu-empty">
                <Search size={23} aria-hidden="true" />
                <strong>Aucune assurance trouvée</strong>
                <span>Essayez un autre mot ou élargissez les filtres.</span>
                <button type="button" className="text-link" onClick={() => { setQuery(""); setActiveGroup("all"); }}>Effacer les filtres <ArrowRight size={15} /></button>
              </div>
            )}
            <p className="insurance-menu-footnote">Les informations sur ce site sont des repères généraux. Les garanties et conditions dépendent des documents de chaque offre.</p>
          </div>
        </div>
      </div>
    </header>
  );
}
