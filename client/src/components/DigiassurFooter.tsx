import { Link } from "wouter";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  UserPlus, 
  LogIn 
} from "lucide-react";

export default function DigiassurFooter() {
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
              Bienvenue sur <strong className="text-white">Digiassur</strong>, le site qui vous aide à trouver la meilleure assurance et qui défend au mieux vos intérêts !
              <br /><br />
              Digiassur est la plateforme digitale du courtier <strong className="text-white">Assur'wi</strong> basé à Casablanca.
              Assur'wi offre des solutions d'assurance notamment en ligne, innovantes et accessibles à tous.
            </p>
          </div>

          {/* Column 2: Nos offres d'assurance (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-white/10">
              Nos offres d’assurance
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <Link href="/" className="font-semibold text-white hover:text-[#f48161] transition">
                  Particuliers
                </Link>
              </li>
              <li>
                <Link href="/entreprise" className="font-semibold text-white hover:text-[#f48161] transition">
                  Entreprises
                </Link>
              </li>
              <li>
                <Link href="/marocains-etranger" className="font-semibold text-white hover:text-[#f48161] transition">
                  Marocains de l'étranger
                </Link>
              </li>
              <li>
                <Link href="/affiliation" className="font-semibold text-white hover:text-[#f48161] transition">
                  Affiliation
                </Link>
              </li>
              <li className="pt-2"><Link href="/auto" className="hover:text-white transition">Auto</Link></li>
              <li><Link href="/moto" className="hover:text-white transition">Moto</Link></li>
              <li><Link href="/accident" className="hover:text-white transition">Accident</Link></li>
              <li><Link href="/habitation" className="hover:text-white transition">Habitation</Link></li>
              <li><Link href="/voyage" className="hover:text-white transition">Voyage</Link></li>
              <li><Link href="/sante" className="hover:text-white transition">Santé / Prévoyance</Link></li>
              <li>
                <Link href="/epargne" className="text-[#f48161] font-bold flex items-center gap-1">
                  <span>Épargne</span>
                </Link>
              </li>
              <li><Link href="/loisir" className="hover:text-white transition">Loisir</Link></li>
            </ul>
          </div>

          {/* Column 3: Nous connaître & Liens utiles (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-white/10 mb-3">
                Nous connaître
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li><Link href="/qui-sommes-nous" className="hover:text-white transition">Qui sommes-nous ?</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-white/10 mb-3">
                Liens utiles
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li><Link href="/association" className="hover:text-white transition">Association</Link></li>
                <li><Link href="/association-metier" className="hover:text-white transition">Association par métier</Link></li>
                <li><Link href="/association-besoin" className="hover:text-white transition">Association par besoin</Link></li>
                <li><Link href="/rse" className="hover:text-white transition">RSE</Link></li>
                <li><Link href="/conscious-days" className="hover:text-white transition">Conscious days</Link></li>
                <li><Link href="/aji-tkhdem" className="hover:text-white transition">Aji tkhdam</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 4: Espace client & Contact (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-white/10 mb-3">
                Espace client
              </h4>
              <div className="space-y-2">
                <Link
                  href="/connexion"
                  className="flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs transition"
                >
                  <img src="/images/icon-user-orange.png" alt="" className="h-5 w-auto" />
                  <span>Créer un compte</span>
                </Link>
                <Link
                  href="/connexion"
                  className="flex items-center gap-2 bg-[#568ba9] hover:bg-[#4a7a96] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Se connecter</span>
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-white/10 mb-3">
                Nous contacter
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5 text-[#f48161]" />
                  </div>
                  <a href="tel:+212522368182" className="hover:text-white transition">
                    (+212) 522 36 81 82
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-[#f48161]" />
                  </div>
                  <Link href="/contact" className="hover:text-white transition break-all">
                    contact@digiassur.ma
                  </Link>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#f48161]" />
                  </div>
                  <span>27, Rue Ain Asserdoune CIL - Casablanca - Maroc</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 5: Langues & Réseaux sociaux (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-white/10 mb-3 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>Langues</span>
              </h4>
              <div className="space-y-1.5 text-xs text-slate-300">
                <p className="font-bold text-white flex items-center justify-between">
                  <span>Français</span>
                  <span className="text-[10px] bg-[#f48161] text-white px-2 py-0.5 rounded-full">Actif</span>
                </p>
                <p className="hover:text-white cursor-pointer transition">English</p>
                <p className="hover:text-white cursor-pointer transition font-arabic text-sm">العربية</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-white/10 mb-3">
                Suivez-nous sur
              </h4>
              <div className="flex flex-col gap-2 text-xs text-slate-300">
                <a href="https://www.facebook.com/digiassur.ma/" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-2">
                  <img src="/images/facebook.png" alt="" className="w-4 h-4 object-contain" />
                  <span>Facebook</span>
                </a>
                <a href="https://www.linkedin.com/company/digiassur/" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-2">
                  <img src="/images/linkedin.png" alt="" className="w-4 h-4 object-contain" />
                  <span>LinkedIn</span>
                </a>
                <a href="https://www.instagram.com/digiassur.ma/" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-2">
                  <img src="/images/instagram.png" alt="" className="w-4 h-4 object-contain" />
                  <span>Instagram</span>
                </a>
                <a href="https://www.youtube.com/channel/UCN4K0mt2lmuigcyoz7XqCkQ" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-2">
                  <img src="/images/youtube.png" alt="" className="w-4 h-4 object-contain" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="border-t border-white/10 bg-[#163a5b] text-[11px] text-slate-400 py-5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>
            Copyright {new Date().getFullYear()} © <strong className="text-white">DigiAssur - By Assur'wi</strong>. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <Link href="/cgv" className="hover:text-white transition">
              Conditions générales de vente
            </Link>
            <span>•</span>
            <Link href="/mentions-legales" className="hover:text-white transition">
              Politique de confidentialité
            </Link>
            <span>•</span>
            <Link href="/mentions-legales" className="hover:text-white transition">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
