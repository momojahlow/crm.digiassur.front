import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  ChevronDown, 
  Menu, 
  X,
  Phone
} from "lucide-react";

type DigiassurHeaderProps = {
  onSimulate?: () => void;
};

export default function DigiassurHeader({ onSimulate }: DigiassurHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location] = useLocation();

  const products = [
    { name: "Auto", icon: "/images/icon-car.svg", href: "/auto" },
    { name: "Moto", icon: "/images/icon-moto.svg", href: "/moto" },
    { name: "Accident", icon: "/images/icon-accident.svg", href: "/accident" },
    { name: "Habitation", icon: "/images/icon-habitation.svg", href: "/habitation" },
    { name: "Voyage", icon: "/images/icon-voyage.svg", href: "/voyage" },
    { name: "Santé/Prévoyance", icon: "/images/icon-sante.svg", href: "/sante" },
    { name: "Epargne", icon: "/images/icon-epargne.svg", href: "/epargne", defaultActive: true },
    { name: "Loisir", icon: "/images/icon-loisir.svg", href: "/loisir" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-xs border-b border-slate-100">
      {/* Top Utility Bar (Desktop) */}
      <div className="hidden lg:block border-b border-slate-100 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 h-[46px] flex items-center justify-between text-[13px]">
          {/* Left Categories */}
          <div className="flex items-center gap-2">
            <Link 
              href="/" 
              className={`font-semibold px-4 py-1.5 rounded-md shadow-xs transition ${
                location === "/" || location === "/epargne" || location === "/auto" || location === "/moto"
                  ? "bg-[#f48161] text-white" 
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Particuliers
            </Link>
            <Link 
              href="/entreprise" 
              className="text-slate-600 hover:text-[#1d4b75] font-medium px-3 py-1.5 rounded-md transition hover:bg-slate-50"
            >
              Entreprises
            </Link>
            <Link 
              href="/marocains-etranger" 
              className="text-slate-600 hover:text-[#1d4b75] font-medium px-3 py-1.5 rounded-md transition hover:bg-slate-50"
            >
              Marocains de l'étranger
            </Link>
            <Link 
              href="/affiliation" 
              className="text-slate-600 hover:text-[#1d4b75] font-medium px-3 py-1.5 rounded-md transition hover:bg-slate-50"
            >
              Affiliation
            </Link>
          </div>

          {/* Right utilities: Language + Espace Client */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#568ba9] text-white px-3 py-1 rounded-md text-xs font-semibold cursor-pointer shadow-xs hover:bg-[#4a7a96] transition">
              <img src="/images/icon-lang.png" alt="Lang" className="h-6 w-auto object-contain" />
              <span>Français</span>
              <ChevronDown className="w-3 h-3 opacity-80" />
            </div>
            <Link 
              href="/connexion" 
              className="flex items-center gap-2 bg-[#f48161] text-white px-3.5 py-1 rounded-md text-xs font-semibold shadow-xs hover:bg-[#e67050] transition"
            >
              <img src="/images/icon-user-orange.png" alt="" className="h-6 w-auto object-contain" />
              <span>Espace client</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 h-[70px] flex items-center justify-between">
        {/* Digiassur Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <img 
            src="/images/logo-digiassur.svg" 
            alt="Digiassur" 
            className="h-10 lg:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Product Navigation Links with Figma SVGs */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {products.map((item) => {
            const isActive = location === item.href || (location === "/" && item.defaultActive);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition ${
                  isActive
                    ? "text-[#f48161] bg-orange-50 border-b-2 border-[#f48161]"
                    : "text-slate-700 hover:text-[#1d4b75] hover:bg-slate-50"
                }`}
              >
                <img 
                  src={item.icon} 
                  alt="" 
                  className={`w-5 h-5 object-contain ${isActive ? "filter sepia contrast-150" : "opacity-75"}`} 
                />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* Search Trigger */}
          <button 
            type="button" 
            onClick={() => setSearchOpen(!searchOpen)}
            className="ml-2 p-2 text-slate-500 hover:text-[#1d4b75] hover:bg-slate-100 rounded-full transition cursor-pointer"
            aria-label="Recherche"
          >
            <img src="/images/icon-search.svg" alt="Search" className="w-5 h-5" />
          </button>
        </nav>

        {/* Mobile Header Right Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/contact"
            className="p-2 text-slate-600 hover:text-[#1d4b75] rounded-lg"
            aria-label="Contacter Digiassur"
          >
            <Phone className="w-5 h-5" />
          </Link>
          <Link
            href="/connexion"
            className="p-1.5 rounded-lg text-xs font-semibold"
            aria-label="Espace client"
          >
            <img src="/images/icon-user-orange.png" alt="" className="h-7 w-auto" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-[#1d4b75] rounded-lg cursor-pointer"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Search Dropdown */}
      {searchOpen && (
        <div className="border-t border-slate-100 bg-slate-50 py-3 px-6 shadow-inner animate-in fade-in duration-200">
          <div className="max-w-[1440px] mx-auto flex items-center gap-3">
            <img src="/images/icon-search.svg" alt="" className="w-4 h-4 opacity-50" />
            <input
              type="text"
              placeholder="Que recherchez-vous ? (ex: devis auto, moto, épargne...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#568ba9]"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="p-4 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="flex gap-2">
              <Link 
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center bg-[#f48161] text-white font-semibold py-2 rounded-md text-xs"
              >
                Particuliers
              </Link>
              <Link 
                href="/entreprise" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center bg-slate-100 text-slate-700 font-semibold py-2 rounded-md text-xs"
              >
                Entreprises
              </Link>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                Nos assurances
              </p>
              {products.map((item) => {
                const isActive = location === item.href || (location === "/" && item.defaultActive);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive
                        ? "bg-orange-50 text-[#f48161] font-bold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <img src={item.icon} alt="" className="w-5 h-5 object-contain" />
                    <span>{item.name}</span>
                    {isActive && <span className="ml-auto text-[10px] bg-[#f48161] text-white px-2 py-0.5 rounded-full font-bold">Actif</span>}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSimulate?.();
                }}
                className="w-full bg-[#f48161] text-white font-bold py-3 rounded-xl shadow-md text-center hover:bg-[#e67050] transition cursor-pointer"
              >
                OBTENIR UNE SIMULATION
              </button>
              <Link
                href="/connexion"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full border border-slate-200 text-[#1d4b75] font-semibold py-2.5 rounded-xl text-center text-sm"
              >
                Accéder à l'espace client
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
