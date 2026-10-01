import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  ChevronRight, 
  UserPlus, 
  LogIn 
} from "lucide-react";

export default function DigiassurFooter() {
  return (
    <footer className="bg-[#1d4b75] text-white" id="contact">
      {/* Main Footer Container */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & Presentation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <a href="/" className="inline-block">
              <img
                src="/images/logo-digiassur-white.svg"
                alt="Digiassur"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://digiassur.ma/assets/img/frame-2.svg";
                }}
              />
            </a>
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
                <a href="https://digiassur.ma" className="font-semibold text-white hover:text-[#f48161] transition">
                  Particuliers
                </a>
              </li>
              <li>
                <a href="https://digiassur.ma/entreprise" className="font-semibold text-white hover:text-[#f48161] transition">
                  Entreprises
                </a>
              </li>
              <li>
                <a href="https://digiassur.ma" className="font-semibold text-white hover:text-[#f48161] transition">
                  Marocains de l'étranger
                </a>
              </li>
              <li>
                <a href="https://digiassur.ma/demande-affiliation" className="font-semibold text-white hover:text-[#f48161] transition">
                  Affiliation
                </a>
              </li>
              <li className="pt-2"><a href="#auto" className="hover:text-white transition">Auto</a></li>
              <li><a href="#moto" className="hover:text-white transition">Moto</a></li>
              <li><a href="#accident" className="hover:text-white transition">Accident</a></li>
              <li><a href="#habitation" className="hover:text-white transition">Habitation</a></li>
              <li><a href="#voyage" className="hover:text-white transition">Voyage</a></li>
              <li><a href="#sante" className="hover:text-white transition">Santé / Prévoyance</a></li>
              <li>
                <a href="#" className="text-[#f48161] font-bold flex items-center gap-1">
                  <span>Épargne</span>
                  <span className="text-[9px] bg-[#f48161] text-white px-1.5 py-0.2 rounded-full font-bold">Ici</span>
                </a>
              </li>
              <li><a href="#loisir" className="hover:text-white transition">Loisir</a></li>
              <li className="pt-2">
                <a href="https://pippipyalah.com/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-emerald-400 font-semibold hover:underline">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  PipPipYalah
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Nous connaître & Liens utiles (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-white/10 mb-3">
                Nous connaître
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li><a href="https://digiassur.ma" className="hover:text-white transition">Qui sommes-nous ?</a></li>
                <li><a href="https://digiassur.ma/contactez-nous" className="hover:text-white transition">Contact</a></li>
                <li><a href="https://digiassur.ma/blogs" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-white/10 mb-3">
                Liens utiles
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li><a href="#association" className="hover:text-white transition">Association</a></li>
                <li><a href="#metier" className="hover:text-white transition">Association par métier</a></li>
                <li><a href="#besoin" className="hover:text-white transition">Association par besoin</a></li>
                <li><a href="#rse" className="hover:text-white transition">RSE</a></li>
                <li><a href="#conscious" className="hover:text-white transition">Conscious days</a></li>
                <li><a href="https://digiassur.ma/programme-aji-tkhdem" className="hover:text-white transition">Aji tkhdam</a></li>
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
                <a
                  href="https://fr.digiassur.ma/connexion"
                  className="flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white px-3 py-2 rounded-full text-xs font-semibold shadow-xs transition"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Créer un compte</span>
                </a>
                <a
                  href="https://fr.digiassur.ma/connexion"
                  className="flex items-center gap-2 bg-[#568ba9] hover:bg-[#4a7a96] text-white px-3 py-2 rounded-full text-xs font-semibold shadow-xs transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Se connecter</span>
                </a>
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
                  <a href="mailto:contact@digiassur.ma" className="hover:text-white transition break-all">
                    contact@digiassur.ma
                  </a>
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
                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">f</span>
                  <span>Facebook</span>
                </a>
                <a href="https://www.linkedin.com/company/digiassur/" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">in</span>
                  <span>LinkedIn</span>
                </a>
                <a href="https://www.instagram.com/digiassur.ma/" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">ig</span>
                  <span>Instagram</span>
                </a>
                <a href="https://www.youtube.com/channel/UCN4K0mt2lmuigcyoz7XqCkQ" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">yt</span>
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
            <a href="https://digiassur.ma/pdf/CGV.pdf" target="_blank" rel="noreferrer" className="hover:text-white transition">
              Conditions générales de vente
            </a>
            <span>•</span>
            <a href="https://digiassur.ma/mentions-legales" target="_blank" rel="noreferrer" className="hover:text-white transition">
              Politique de confidentialité
            </a>
            <span>•</span>
            <a href="https://digiassur.ma/pdf/mentions_legales-digiassur.pdf" target="_blank" rel="noreferrer" className="hover:text-white transition">
              Mentions légales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
