import { useState } from "react";
import { 
  Car, 
  Bike, 
  ShieldAlert, 
  Home, 
  Plane, 
  HeartPulse, 
  PiggyBank, 
  Bike as LeisureIcon, 
  Search, 
  User, 
  Globe, 
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

  const products = [
    { name: "Auto", icon: Car, href: "#auto" },
    { name: "Moto", icon: Bike, href: "#moto" },
    { name: "Accident", icon: ShieldAlert, href: "#accident" },
    { name: "Habitation", icon: Home, href: "#habitation" },
    { name: "Voyage", icon: Plane, href: "#voyage" },
    { name: "Santé/Prévoyance", icon: HeartPulse, href: "#sante" },
    { name: "Epargne", icon: PiggyBank, href: "#", active: true },
    { name: "Loisir", icon: LeisureIcon, href: "#loisir" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-xs border-b border-slate-100">
      {/* Top Utility Bar (Desktop) */}
      <div className="hidden lg:block border-b border-slate-100 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 h-[46px] flex items-center justify-between text-[13px]">
          {/* Left Categories */}
          <div className="flex items-center gap-2">
            <span className="bg-[#f48161] text-white font-semibold px-4 py-1.5 rounded-md shadow-xs transition hover:bg-[#e67050] cursor-pointer">
              Particuliers
            </span>
            <a 
              href="https://digiassur.ma/entreprise" 
              className="text-slate-600 hover:text-[#1d4b75] font-medium px-3 py-1.5 rounded-md transition hover:bg-slate-50"
            >
              Entreprises
            </a>
            <a 
              href="https://digiassur.ma" 
              className="text-slate-600 hover:text-[#1d4b75] font-medium px-3 py-1.5 rounded-md transition hover:bg-slate-50"
            >
              Marocains de l'étranger
            </a>
            <a 
              href="https://digiassur.ma/demande-affiliation" 
              className="text-slate-600 hover:text-[#1d4b75] font-medium px-3 py-1.5 rounded-md transition hover:bg-slate-50"
            >
              Affiliation
            </a>
            <a 
              href="https://pippipyalah.com/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-600 hover:text-[#1d4b75] font-medium px-3 py-1.5 rounded-md transition hover:bg-slate-50 flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              PipPipYalah
            </a>
          </div>

          {/* Right utilities: Language + Espace Client */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#568ba9] text-white px-3.5 py-1.5 rounded-md text-xs font-semibold cursor-pointer shadow-xs hover:bg-[#4a7a96] transition">
              <Globe className="w-3.5 h-3.5" />
              <span>Français</span>
              <ChevronDown className="w-3 h-3 opacity-80" />
            </div>
            <a 
              href="https://fr.digiassur.ma/connexion" 
              className="flex items-center gap-2 bg-[#f48161] text-white px-4 py-1.5 rounded-md text-xs font-semibold shadow-xs hover:bg-[#e67050] transition"
            >
              <User className="w-3.5 h-3.5" />
              <span>Espace client</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 h-[70px] flex items-center justify-between">
        {/* Digiassur Logo */}
        <a href="/" className="flex items-center gap-2">
          <img 
            src="/images/logo-digiassur.svg" 
            alt="Digiassur" 
            className="h-10 lg:h-12 w-auto object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "https://digiassur.ma/assets/img/frame-4.svg";
            }}
          />
        </a>

        {/* Desktop Product Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {products.map((item) => {
            const Icon = item.icon;
            const isActive = item.active;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition ${
                  isActive
                    ? "text-[#f48161] bg-orange-50 border-b-2 border-[#f48161]"
                    : "text-slate-700 hover:text-[#1d4b75] hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#f48161]" : "text-slate-500"}`} />
                <span>{item.name}</span>
              </a>
            );
          })}

          {/* Search Trigger */}
          <button 
            type="button" 
            onClick={() => setSearchOpen(!searchOpen)}
            className="ml-2 p-2 text-slate-500 hover:text-[#1d4b75] hover:bg-slate-100 rounded-full transition"
            aria-label="Recherche"
          >
            <Search className="w-4 h-4" />
          </button>
        </nav>

        {/* Mobile Header Right Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="tel:+212522368182"
            className="p-2 text-slate-600 hover:text-[#1d4b75] rounded-lg"
            aria-label="Appeler Digiassur"
          >
            <Phone className="w-5 h-5" />
          </a>
          <a
            href="https://fr.digiassur.ma/connexion"
            className="bg-[#f48161] text-white p-2 rounded-lg text-xs font-semibold"
            aria-label="Espace client"
          >
            <User className="w-5 h-5" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-[#1d4b75] rounded-lg"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Search Input Bar (Dropdown) */}
      {searchOpen && (
        <div className="border-t border-slate-100 bg-slate-50 py-3 px-6 shadow-inner animate-in fade-in duration-200">
          <div className="max-w-[1440px] mx-auto flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Que recherchez-vous ? (ex: devis épargne, auto, retraite...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#568ba9]"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xs font-medium text-slate-500 hover:text-slate-800"
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
            {/* Quick Segments */}
            <div className="flex gap-2">
              <span className="flex-1 text-center bg-[#f48161] text-white font-semibold py-2 rounded-md text-xs">
                Particuliers
              </span>
              <a 
                href="https://digiassur.ma/entreprise" 
                className="flex-1 text-center bg-slate-100 text-slate-700 font-semibold py-2 rounded-md text-xs"
              >
                Entreprises
              </a>
            </div>

            {/* Insurance products */}
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                Nos assurances
              </p>
              {products.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                      item.active
                        ? "bg-orange-50 text-[#f48161] font-bold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-5 h-5 text-[#f48161]" />
                    <span>{item.name}</span>
                    {item.active && <span className="ml-auto text-[10px] bg-[#f48161] text-white px-2 py-0.5 rounded-full font-bold">Actif</span>}
                  </a>
                );
              })}
            </div>

            {/* Mobile CTAs */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSimulate?.();
                }}
                className="w-full bg-[#f48161] text-white font-bold py-3 rounded-xl shadow-md text-center hover:bg-[#e67050] transition"
              >
                OBTENIR UNE SIMULATION
              </button>
              <a
                href="https://fr.digiassur.ma/connexion"
                className="block w-full border border-slate-200 text-[#1d4b75] font-semibold py-2.5 rounded-xl text-center text-sm"
              >
                Accéder à l'espace client
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
