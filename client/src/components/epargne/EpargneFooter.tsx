import {
  Languages,
  LogIn,
  Mail,
  MapPin,
  Phone,
  UserRoundPlus,
} from "lucide-react";
import { EpargneBrand } from "./EpargneHeader";

const offers = [
  { label: "Particuliers", href: "https://digiassur.ma/" },
  { label: "Entreprises", href: "https://digiassur.ma/entreprise" },
  { label: "Marocains de l’étranger", href: "#footer" },
  { label: "Parrainage", href: "https://digiassur.ma/demande-affiliation" },
  { label: "Auto", href: "https://digiassur.ma/auto" },
  { label: "Moto", href: "https://digiassur.ma/moto" },
  { label: "Accident", href: "https://digiassur.ma/accident" },
  { label: "Habitation", href: "https://digiassur.ma/habitation" },
  { label: "Voyage", href: "https://digiassur.ma/voyage" },
  { label: "Santé/Prévoyance", href: "https://digiassur.ma/sante" },
  { label: "Épargne", href: "/epargne" },
  { label: "Loisir", href: "https://digiassur.ma/loisir" },
];

export default function EpargneFooter() {
  return (
    <footer className="epargne-footer" id="footer">
      <div className="epargne-footer-main epargne-container">
        <section
          className="epargne-footer-about"
          aria-label="À propos de Digiassur"
        >
          <EpargneBrand light />
          <p>
            Bienvenue sur <strong>Digiassur</strong>, le site qui vous aide à
            trouver la meilleure assurance et qui défend au mieux vos intérêts !
            Digiassur est la plateforme digitale du courtier{" "}
            <strong>Assur’Wi</strong> basé à Casablanca.{" "}
            <strong>Assur’Wi</strong> offre des solutions d’assurance notamment
            en ligne, innovantes et accessibles à tous.
          </p>
        </section>

        <section
          className="epargne-client-area"
          id="espace-client"
          aria-labelledby="epargne-client-title"
        >
          <h2 id="epargne-client-title">Espace client</h2>
          <a
            className="epargne-client-pill"
            href="http://new.digiassur.com/connexion"
          >
            <UserRoundPlus size={17} /> Créer un nouveau compte
          </a>
          <a
            className="epargne-client-pill"
            href="http://new.digiassur.com/connexion"
          >
            <LogIn size={17} /> Se connecter
          </a>
        </section>

        <div className="epargne-footer-link-grid">
          <section
            className="epargne-footer-column"
            aria-labelledby="epargne-offers-title"
          >
            <h2 id="epargne-offers-title">Nos offres d’assurance</h2>
            {offers.map(offer => (
              <a href={offer.href} key={offer.label}>
                {offer.label}
              </a>
            ))}
            <a href="https://pippipyalah.com/" className="epargne-pip">
              <span aria-hidden="true">●</span> PipPipYalah
            </a>
          </section>
          <section
            className="epargne-footer-column"
            aria-labelledby="epargne-links-title"
          >
            <h2 id="epargne-links-title">Liens utiles</h2>
            <strong>Association⌄</strong>
            <a href="#footer">Association par métier</a>
            <a href="#footer">Association par besoin</a>
            <strong>RSE⌄</strong>
            <a href="#footer">Conscious days</a>
            <a href="#footer">Aji tkhdam</a>
            <div className="epargne-footer-languages">
              <h3>
                <Languages size={18} /> Langues
              </h3>
              <span>
                Français <b>✓</b>
              </span>
              <span lang="en">English</span>
              <span lang="ar" dir="rtl">
                العربية
              </span>
            </div>
          </section>
        </div>

        <div className="epargne-footer-contact-grid">
          <section
            className="epargne-footer-column"
            aria-labelledby="epargne-about-title"
          >
            <h2 id="epargne-about-title">Nous connaître</h2>
            <a href="https://digiassur.ma/">Qui sommes-nous ?</a>
            <a href="https://digiassur.ma/contactez-nous">Contact</a>
            <a href="https://digiassur.ma/blogs">Blog</a>
          </section>
          <section
            className="epargne-footer-column epargne-contact-column"
            aria-labelledby="epargne-contact-title"
          >
            <h2 id="epargne-contact-title">Nous contacter</h2>
            <a className="epargne-contact-line" href="tel:+212522368182">
              <Phone size={18} /> (+212) 522 36 81 82
            </a>
            <a
              className="epargne-contact-line"
              href="mailto:contact@digiassur.ma"
            >
              <Mail size={18} /> contact@digiassur.ma
            </a>
            <a
              className="epargne-contact-line"
              href="https://maps.google.com/?q=27+Rue+Ain+Asserdoune+CIL+Casablanca+Maroc"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={18} />
              <span>
                27, Rue Ain Asserdoune CIL
                <br />- Casablanca - Maroc
              </span>
            </a>
          </section>
        </div>

        <section className="epargne-social" aria-label="Réseaux sociaux">
          <h2>Suivez-nous sur</h2>
          <div>
            <a
              href="https://www.facebook.com/digiassur.ma/"
              target="_blank"
              rel="noreferrer"
            >
              f&nbsp; Facebook
            </a>
            <a
              href="https://www.linkedin.com/company/digiassur/"
              target="_blank"
              rel="noreferrer"
            >
              in&nbsp; Linkedin
            </a>
            <a
              href="https://www.instagram.com/digiassur.ma/"
              target="_blank"
              rel="noreferrer"
            >
              ◎&nbsp; Instagram
            </a>
            <a
              href="https://www.youtube.com/channel/UCN4K0mt2lmuigcyoz7XqCkQ"
              target="_blank"
              rel="noreferrer"
            >
              ▷&nbsp; Youtube
            </a>
          </div>
        </section>
      </div>
      <div className="epargne-legal-band">
        <div className="epargne-container epargne-legal-links">
          <a
            href="https://digiassur.ma/pdf/CGV.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Conditions générales de vente
          </a>
          <a
            href="https://digiassur.ma/mentions-legales"
            target="_blank"
            rel="noreferrer"
          >
            Politique de confidentialité
          </a>
          <a
            href="https://digiassur.ma/pdf/mentions_legales-digiassur.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Mentions légales
          </a>
        </div>
      </div>
      <div className="epargne-copyright">
        <div className="epargne-container">
          Copyright {new Date().getFullYear()}{" "}
          <strong>© DigiAssur - By AssurWi.</strong> Tous droits réservés
        </div>
      </div>
    </footer>
  );
}
