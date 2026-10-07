import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { NumerisBrand } from "@/components/NumerisHeader";

type NumerisFooterProps = {
  isHome?: boolean;
};

export default function NumerisFooter({ isHome = false }: NumerisFooterProps) {
  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <footer className="numeris-footer">
      <div className="footer-main">
        <div className="footer-brand-block">
          <NumerisBrand footer />
          <p>
            Vos documents.
            <br />
            Enfin intelligents.
          </p>
          <span className="footer-caption">
            Numérisation · IA · Recherche documentaire
          </span>
        </div>
        <div className="footer-column">
          <span>LA PLATEFORME</span>
          <a href={sectionHref("plateforme")}>Traitement documentaire</a>
          <a href={sectionHref("technologie")}>Technologie RAG</a>
          <a href={sectionHref("usages")}>Cas d’usage</a>
        </div>
        <div className="footer-column">
          <span>POUR EXPLORER</span>
          <a href={sectionHref("demo")}>Démo interactive</a>
          <a href={sectionHref("questions")}>Questions fréquentes</a>
          <a href="/devis#quote-form">Demander un devis</a>
          <a href="/connexion">Se connecter</a>
          <a href="/admin">Espace admin</a>
        </div>
        <div className="footer-promise">
          <span className="footer-promise-icon">
            <Check size={15} />
          </span>
          <p>
            Vos documents deviennent une connaissance que vos équipes peuvent
            interroger.
          </p>
          <a href="#accueil">
            Retour en haut <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © 2026 Smart Print. Numeris est notre application documentaire.
        </span>
        <span>Numériser. Comprendre. Retrouver.</span>
        <a href="#accueil" aria-label="Langue : français">
          FR <ChevronDown size={13} />
        </a>
      </div>
    </footer>
  );
}
