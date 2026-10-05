import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  ChevronDown, 
  Menu, 
  X,
  Phone,
  Check
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/i18n/translations";

type DigiassurHeaderProps = {
  onSimulate?: () => void;
};

export default function DigiassurHeader({ onSimulate }: DigiassurHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();
  const { language, setLanguage, isRTL, t } = useLanguage();

  const languages: { code: Language; label: string; flag?: string }[] = [
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
  ];

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const topCategories = [
    {
      name: t("nav.particuliers", "Particuliers"),
      href: "/",
      isActive: (loc: string) => 
        !loc.startsWith("/entreprise") && 
        !loc.startsWith("/marocains-etranger") && 
        !loc.startsWith("/affiliation"),
    },
    {
      name: t("nav.entreprises", "Entreprises"),
      href: "/entreprise",
      isActive: (loc: string) => loc.startsWith("/entreprise"),
    },
    {
      name: t("nav.mre", "Marocains de l'étranger"),
      href: "/marocains-etranger",
      isActive: (loc: string) => loc.startsWith("/marocains-etranger"),
    },
    {
      name: t("nav.affiliation", "Affiliation"),
      href: "/affiliation",
      isActive: (loc: string) => loc.startsWith("/affiliation"),
    },
  ];

  const products = [
    { name: t("nav.auto", "Auto"), icon: "/images/icon-car.svg", href: "/auto" },
    { name: t("nav.moto", "Moto"), icon: "/images/icon-moto.svg", href: "/moto" },
    { name: t("nav.accident", "Accident"), icon: "/images/icon-accident.svg", href: "/accident" },
    { name: t("nav.habitation", "Habitation"), icon: "/images/icon-habitation.svg", href: "/habitation" },
    { name: t("nav.voyage", "Voyage"), icon: "/images/icon-voyage.svg", href: "/voyage" },
    { name: t("nav.sante", "Santé/Prévoyance"), icon: "/images/icon-sante.svg", href: "/sante" },
    { name: t("nav.epargne", "Epargne"), icon: "/images/icon-epargne.svg", href: "/epargne" },
    { name: t("nav.loisir", "Loisir"), icon: "/images/icon-loisir.svg", href: "/loisir" },
  ];

  const isProductActive = (href: string) => {
    if (location === "/" && href === "/auto") return true;
    if (location !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-xs border-b border-slate-100">
      {/* Top Utility Bar (Desktop) */}
      <div className="hidden lg:block border-b border-slate-100 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 h-[46px] flex items-center justify-between text-[13px]">
          {/* Left Categories */}
          <div className="flex items-center gap-2">
            {topCategories.map((cat) => {
              const active = cat.isActive(location);
              return (
                <Link 
                  key={cat.href}
                  href={cat.href} 
                  className={`font-semibold px-4 py-1.5 rounded-md transition shadow-xs ${
                    active
                      ? "bg-[#f48161] text-white ring-2 ring-[#f48161]/30" 
                      : "text-slate-600 hover:text-[#1d4b75] font-medium hover:bg-slate-100"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>

          {/* Right utilities: Language Selector Dropdown + Espace Client */}
          <div className="flex items-center gap-3">
            {/* Interactive Language Selector */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 bg-[#568ba9] hover:bg-[#4a7a96] text-white px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer shadow-xs transition select-none"
                aria-expanded={langDropdownOpen}
                aria-haspopup="true"
              >
                <img src="/images/icon-lang.png" alt="Lang" className="h-5 w-auto object-contain" />
                <span>{currentLangObj.label}</span>
                <ChevronDown className={`w-3 h-3 opacity-80 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu (Matches User Screenshot Style) */}
              {langDropdownOpen && (
                <div 
                  className={`absolute ${isRTL ? "left-0" : "right-0"} mt-1.5 w-32 bg-[#1d4b75] text-white rounded-lg shadow-xl py-1 z-50 border border-white/10 animate-in fade-in zoom-in-95 duration-150`}
                >
                  {languages.map((l) => {
                    const isSelected = language === l.code;
                    return (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setLanguage(l.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full px-3.5 py-2 text-xs font-semibold hover:bg-white/15 transition flex items-center justify-between cursor-pointer ${
                          isSelected ? "text-[#f48161] bg-white/10 font-bold" : "text-white"
                        }`}
                        dir={l.code === "ar" ? "rtl" : "ltr"}
                      >
                        <span className={l.code === "ar" ? "font-bold text-sm" : ""}>{l.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#f48161]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Espace Client */}
            <Link 
              href="/connexion" 
              className="flex items-center gap-2 bg-[#f48161] text-white px-3.5 py-1.5 rounded-md text-xs font-semibold shadow-xs hover:bg-[#e67050] transition"
            >
              <img src="/images/icon-user-orange.png" alt="" className="h-5 w-auto object-contain" />
              <span>{t("common.clientArea", "Espace client")}</span>
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

        {/* Desktop Product Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {products.map((item) => {
            const isActive = isProductActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition ${
                  isActive
                    ? "text-[#f48161] bg-orange-50 border-b-2 border-[#f48161] shadow-2xs"
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
            aria-label={t("common.search", "Recherche")}
          >
            <img src="/images/icon-search.svg" alt="Search" className="w-5 h-5" />
          </button>
        </nav>

        {/* Mobile Header Right Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Quick mobile language pill */}
          <button
            type="button"
            onClick={() => {
              const nextIndex = (languages.findIndex(l => l.code === language) + 1) % languages.length;
              setLanguage(languages[nextIndex].code);
            }}
            className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-md"
          >
            {currentLangObj.label}
          </button>
          <Link
            href="/contact"
            className="p-2 text-slate-600 hover:text-[#1d4b75] rounded-lg"
            aria-label={t("common.contactUs", "Contacter Digiassur")}
          >
            <Phone className="w-5 h-5" />
          </Link>
          <Link
            href="/connexion"
            className="p-1.5 rounded-lg text-xs font-semibold"
            aria-label={t("common.clientArea", "Espace client")}
          >
            <img src="/images/icon-user-orange.png" alt="" className="h-7 w-auto" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-[#1d4b75] rounded-lg cursor-pointer"
            aria-label={mobileMenuOpen ? t("common.close", "Fermer le menu") : "Menu"}
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
              placeholder={t("common.searchPlaceholder", "Que recherchez-vous ? (ex: devis auto, moto, épargne...)")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#568ba9]"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              {t("common.close", "Fermer")}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="p-4 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
            {/* Mobile Categories */}
            <div className="grid grid-cols-2 gap-2">
              {topCategories.map((cat) => {
                const active = cat.isActive(location);
                return (
                  <Link 
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-center font-semibold py-2 px-2 rounded-md text-xs transition ${
                      active
                        ? "bg-[#f48161] text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Language Switcher Selector */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Langue / Language / اللغة
              </span>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      setLanguage(l.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition ${
                      language === l.code 
                        ? "bg-[#1d4b75] text-white border-[#1d4b75]" 
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Products List */}
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                {t("nav.ourInsurances", "Nos assurances")}
              </p>
              {products.map((item) => {
                const isActive = isProductActive(item.href);
                return (
                  <Link
                    key={item.href}
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
                    {isActive && (
                      <span className="ml-auto text-[10px] bg-[#f48161] text-white px-2 py-0.5 rounded-full font-bold">
                        {t("common.active", "Actif")}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <Link
                href="/auto/devis-auto"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full bg-[#f48161] text-white font-bold py-3 rounded-xl shadow-md text-center hover:bg-[#e67050] transition cursor-pointer"
              >
                {t("common.getMyQuote", "OBTENIR MON DEVIS")}
              </Link>
              <Link
                href="/connexion"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full border border-slate-200 text-[#1d4b75] font-semibold py-2.5 rounded-xl text-center text-sm"
              >
                {t("common.clientArea", "Accéder à l'espace client")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
