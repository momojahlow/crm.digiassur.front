import { Link } from "wouter";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  UserPlus, 
  LogIn 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DigiassurFooter() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1d4b75] text-white" id="contact">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & Presentation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <Link href="/" className="inline-block cursor-pointer">
              <img
                src="/images/logo-digiassur-white.svg"
                alt="Digiassur"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed pt-2">
              {t("footer.aboutText", "Digiassur est le premier courtier digital d'assurance au Maroc, agréé par l'ACAPS et certifié CNDP pour la protection absolue de vos données.")}
            </p>
          </div>

          {/* Column 2: Nos offres d'assurance (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-white/10">
              {t("nav.ourInsurances", "Nos offres d’assurance")}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <Link href="/" className="font-semibold text-white hover:text-[#f48161] transition">
                  {t("nav.particuliers", "Particuliers")}
                </Link>
              </li>
              <li>
                <Link href="/entreprise" className="font-semibold text-white hover:text-[#f48161] transition">
                  {t("nav.entreprises", "Entreprises")}
                </Link>
              </li>
              <li>
                <Link href="/marocains-etranger" className="font-semibold text-white hover:text-[#f48161] transition">
                  {t("nav.mre", "Marocains de l'étranger")}
                </Link>
              </li>
              <li>
                <Link href="/affiliation" className="font-semibold text-white hover:text-[#f48161] transition">
                  {t("nav.affiliation", "Affiliation")}
                </Link>
              </li>
              <li className="pt-2"><Link href="/auto" className="hover:text-white transition">{t("nav.auto", "Auto")}</Link></li>
              <li><Link href="/moto" className="hover:text-white transition">{t("nav.moto", "Moto")}</Link></li>
              <li><Link href="/accident" className="hover:text-white transition">{t("nav.accident", "Accident")}</Link></li>
              <li><Link href="/habitation" className="hover:text-white transition">{t("nav.habitation", "Habitation")}</Link></li>
              <li><Link href="/voyage" className="hover:text-white transition">{t("nav.voyage", "Voyage")}</Link></li>
              <li><Link href="/sante" className="hover:text-white transition">{t("nav.sante", "Santé / Prévoyance")}</Link></li>
              <li>
                <Link href="/epargne" className="text-[#f48161] font-bold flex items-center gap-1">
                  <span>{t("nav.epargne", "Épargne")}</span>
                </Link>
              </li>
              <li><Link href="/loisir" className="hover:text-white transition">{t("nav.loisir", "Loisir")}</Link></li>
            </ul>
          </div>

          {/* Column 3: Nous connaître & Liens utiles (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-white/10 mb-3">
                {t("footer.quickLinks", "Liens utiles")}
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li><Link href="/contact" className="hover:text-white transition">{t("common.contactUs", "Contact")}</Link></li>
                <li><Link href="/mentions-legales" className="hover:text-white transition">{t("footer.legal", "Mentions légales")}</Link></li>
                <li><Link href="/cgv" className="hover:text-white transition">{t("footer.cgu", "Conditions Générales")}</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 4: Espace client & Contact (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-white/10 mb-3">
                {t("common.clientArea", "Espace client")}
              </h4>
              <div className="space-y-2">
                <Link
                  href="/connexion"
                  className="flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs transition"
                >
                  <img src="/images/icon-user-orange.png" alt="" className="h-5 w-auto" />
                  <span>{t("common.clientArea", "Espace client")}</span>
                </Link>
                <Link
                  href="/connexion"
                  className="flex items-center gap-2 bg-[#568ba9] hover:bg-[#4a7a96] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t("common.connect", "Se connecter")}</span>
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-white/10 mb-2">
                {t("common.contactUs", "Contactez-nous")}
              </h4>
              <div className="space-y-1.5 text-xs text-slate-300">
                <a href="tel:+212522368182" className="flex items-center gap-2 hover:text-white transition">
                  <Phone className="w-3.5 h-3.5 text-[#f48161]" />
                  <span>(+212) 522 36 81 82</span>
                </a>
                <a href="mailto:contact@digiassur.ma" className="flex items-center gap-2 hover:text-white transition">
                  <Mail className="w-3.5 h-3.5 text-[#f48161]" />
                  <span>contact@digiassur.ma</span>
                </a>
                <div className="flex items-start gap-2 pt-1 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-[#f48161] shrink-0 mt-0.5" />
                  <span>Casablanca, Maroc</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 5: Legal & Accreditations (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-white/10">
              ACAPS & CNDP
            </h4>
            <div className="space-y-2">
              <img
                src="/images/logo-cndp.png"
                alt="CNDP"
                className="h-10 w-auto bg-white/90 p-1.5 rounded-sm object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://digiassur.ma/assets/img/cndp.png";
                }}
              />
              <p className="text-[11px] text-slate-400 leading-snug">
                {t("footer.accreditation", "Agréé par l'ACAPS n° C245893 • Déclaration CNDP n° D-W-2024")}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Digiassur. {t("common.allRightsReserved", "Tous droits réservés.")}</p>
          <div className="flex items-center gap-4">
            <Link href="/mentions-legales" className="hover:text-white transition">{t("footer.legal", "Mentions légales")}</Link>
            <span>•</span>
            <Link href="/cgv" className="hover:text-white transition">{t("footer.cgu", "Conditions Générales")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
