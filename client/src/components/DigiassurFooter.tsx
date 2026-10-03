import { ArrowUpRight, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { INSURANCES } from "@/lib/insurance-products";

const footerLogo = "https://digiassur.ma/assets/img/frame-2.svg";

export default function DigiassurFooter() {
  return (
    <footer className="site-footer" id="footer">
      <div className="page-width footer-main">
        <div className="footer-about">
          <Link className="site-logo footer-logo" href="/" aria-label="Digiassur, accueil"><img className="site-logo-art" src={footerLogo} alt="Digiassur" /></Link>
          <p>La plateforme digitale du courtier Assur’wi, basée à Casablanca. Des solutions d’assurance en ligne, innovantes et accessibles.</p>
          <span className="footer-supervised"><ShieldCheck size={15} /> Courtier d’assurance et de réassurance</span>
        </div>
        <div className="footer-column"><h2>Nos offres d’assurance</h2>{INSURANCES.map((product) => <Link key={product.slug} href={`/assurance/${product.slug}`}>{product.navName}</Link>)}</div>
        <div className="footer-column"><h2>Nous connaître</h2><a href="https://digiassur.ma/contactez-nous">Contact</a><a href="https://digiassur.ma/mentions-legales">Mentions légales</a><a href="https://digiassur.ma/mentions-legales">Politique de confidentialité</a><a href="https://digiassur.ma">Digiassur.ma</a></div>
        <div className="footer-contact-card"><span className="footer-contact-tag">Besoin d’un conseil ?</span><h2>Notre équipe est là pour vous.</h2><a href="tel:+212522368182"><Phone size={15} /> (+212) 522 36 81 82</a><span><MapPin size={15} /> Casablanca, Maroc</span><a className="footer-contact-link" href="https://digiassur.ma/contactez-nous">Nous contacter <ArrowUpRight size={16} /></a></div>
      </div>
      <div className="footer-bottom"><div className="page-width footer-bottom-inner"><span>© {new Date().getFullYear()} Digiassur · Assur’wi</span><span>Prototype React · Les formulaires sont des démonstrations locales.</span><a href="https://digiassur.ma/mentions-legales">Conditions & confidentialité</a></div></div>
    </footer>
  );
}
