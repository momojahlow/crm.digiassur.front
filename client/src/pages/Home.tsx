import { useState, useEffect, useRef } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import { Link } from "wouter";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Headphones, 
  FileText, 
  Smartphone, 
  Scale, 
  Truck, 
  CreditCard, 
  HeartHandshake
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t, isRTL } = useLanguage();
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [activeSimPage, setActiveSimPage] = useState(0);
  const [activePartnerPage, setActivePartnerPage] = useState(0);
  const [activeTestimonialPage, setActiveTestimonialPage] = useState(0);
  const offersScrollRef = useRef<HTMLDivElement>(null);
  const [isOffersHovered, setIsOffersHovered] = useState(false);
  const [userTookControl, setUserTookControl] = useState(false);

  // Hero Slides avec les différentes offres qui existent (Auto, Moto, Habitation, Santé, Épargne)
  const heroSlides = [
    {
      titlePrefix: t("home.hero.slide1.titlePrefix", "Assurer votre voiture"),
      fromPrice: t("home.hero.slide1.fromPrice", "à partir de"),
      price: t("home.hero.slide1.price", "153 DHS TTC/Mois"),
      subtitle: t("home.hero.slide1.subtitle", "Recevez votre attestation à domicile ou au bureau"),
      ctaPrimary: t("home.hero.slide1.ctaPrimary", "OBTENIR MON TARIF AUTO"),
      ctaPrimaryLink: "/auto/devis-auto",
      ctaSecondary: t("home.hero.slide1.ctaSecondary", "COMPARER MON DEVIS ACTUEL"),
      ctaSecondaryLink: "/auto/devis-auto?mode=comparateur",
      image: "/images/hero-car-dealership.png",
      tag: t("home.hero.slide1.tag", "Auto")
    },
    {
      titlePrefix: t("home.hero.slide2.titlePrefix", "Assurance Moto sur mesure"),
      fromPrice: t("home.hero.slide2.fromPrice", "à partir de"),
      price: t("home.hero.slide2.price", "89 DHS TTC/Mois"),
      subtitle: t("home.hero.slide2.subtitle", "Roulez en toute sérénité avec assistance dépannage 24/7 partout au Maroc"),
      ctaPrimary: t("home.hero.slide2.ctaPrimary", "OBTENIR MON TARIF MOTO"),
      ctaPrimaryLink: "/moto/devis-moto",
      ctaSecondary: t("home.hero.slide2.ctaSecondary", "COMPARER MON DEVIS MOTO"),
      ctaSecondaryLink: "/moto/devis-moto?mode=comparateur",
      image: "/images/banner-moto-welcome.png",
      tag: t("home.hero.slide2.tag", "Moto")
    },
    {
      titlePrefix: t("home.hero.slideAccident.titlePrefix", "Assurance Individuelle Accident"),
      fromPrice: t("home.hero.slideAccident.fromPrice", "dès"),
      price: t("home.hero.slideAccident.price", "35 DHS TTC/Mois"),
      subtitle: t("home.hero.slideAccident.subtitle", "Une protection financière immédiate pour vous et vos proches en cas d'accident de la vie quotidienne"),
      ctaPrimary: t("home.hero.slideAccident.ctaPrimary", "OBTENIR MON TARIF ACCIDENT"),
      ctaPrimaryLink: "/accident",
      ctaSecondary: t("home.hero.slideAccident.ctaSecondary", "EN SAVOIR PLUS"),
      ctaSecondaryLink: "/accident",
      image: "/images/banner-accident.jpg",
      tag: t("home.hero.slideAccident.tag", "Accident")
    },
    {
      titlePrefix: t("home.hero.slideHabitation.titlePrefix", "Assurance Habitation multirisque"),
      fromPrice: t("home.hero.slideHabitation.fromPrice", "dès"),
      price: t("home.hero.slideHabitation.price", "45 DHS TTC/Mois"),
      subtitle: t("home.hero.slideHabitation.subtitle", "Protégez votre domicile, vos biens et votre famille contre les dégâts des eaux, incendie et vol"),
      ctaPrimary: t("home.hero.slideHabitation.ctaPrimary", "SIMULER MON HABITATION"),
      ctaPrimaryLink: "/habitation",
      ctaSecondary: t("home.hero.slideHabitation.ctaSecondary", "EN SAVOIR PLUS"),
      ctaSecondaryLink: "/habitation",
      image: "/images/banner-habitation.jpg",
      tag: t("home.hero.slideHabitation.tag", "Habitation")
    },
    {
      titlePrefix: t("home.hero.slideSante.titlePrefix", "Complémentaire Santé & Prévoyance"),
      fromPrice: t("home.hero.slideSante.fromPrice", "dès"),
      price: t("home.hero.slideSante.price", "120 DHS TTC/Mois"),
      subtitle: t("home.hero.slideSante.subtitle", "Remboursements rapides sous 48h et prise en charge directe dans les cliniques conventionnées"),
      ctaPrimary: t("home.hero.slideSante.ctaPrimary", "SIMULER MON TARIF SANTÉ"),
      ctaPrimaryLink: "/sante",
      ctaSecondary: t("home.hero.slideSante.ctaSecondary", "DÉCOUVRIR LES GARANTIES"),
      ctaSecondaryLink: "/sante",
      image: "/images/banner-sante.jpg",
      tag: t("home.hero.slideSante.tag", "Santé")
    },
    {
      titlePrefix: t("home.hero.slide3.titlePrefix", "Construisez votre épargne en toute sécurité"),
      fromPrice: t("home.hero.slide3.fromPrice", "dès"),
      price: t("home.hero.slide3.price", "200 DHS / Mois"),
      subtitle: t("home.hero.slide3.subtitle", "Des rendements attractifs et une fiscalité avantageuse au Maroc"),
      ctaPrimary: t("home.hero.slide3.ctaPrimary", "SIMULER MON ÉPARGNE"),
      ctaPrimaryLink: "/epargne",
      ctaSecondary: t("home.hero.slide3.ctaSecondary", "EN SAVOIR PLUS"),
      ctaSecondaryLink: "/epargne",
      image: "/images/epargne-pic.jpg",
      tag: t("home.hero.slide3.tag", "Épargne")
    },
    {
      titlePrefix: t("home.hero.slideLoisir.titlePrefix", "Assurance Loisir & Passions"),
      fromPrice: t("home.hero.slideLoisir.fromPrice", "dès"),
      price: t("home.hero.slideLoisir.price", "60 DHS TTC/Mois"),
      subtitle: t("home.hero.slideLoisir.subtitle", "Profitez de vos activités de plein air, sports et loisirs avec une protection complète pour vous et vos équipements"),
      ctaPrimary: t("home.hero.slideLoisir.ctaPrimary", "DÉCOUVRIR L'OFFRE LOISIR"),
      ctaPrimaryLink: "/loisir",
      ctaSecondary: t("home.hero.slideLoisir.ctaSecondary", "EN SAVOIR PLUS"),
      ctaSecondaryLink: "/loisir",
      image: "/images/banner-loisir.jpg",
      tag: t("home.hero.slideLoisir.tag", "Loisir")
    },
    {
      titlePrefix: t("home.hero.slideVoyage.titlePrefix", "Assurance Voyage Internationale"),
      fromPrice: t("home.hero.slideVoyage.fromPrice", "dès"),
      price: t("home.hero.slideVoyage.price", "150 DHS TTC"),
      subtitle: t("home.hero.slideVoyage.subtitle", "Partez l'esprit tranquille avec notre assistance rapatriement et couverture médicale dans le monde entier"),
      ctaPrimary: t("home.hero.slideVoyage.ctaPrimary", "SIMULER MON VOYAGE"),
      ctaPrimaryLink: "/voyage",
      ctaSecondary: t("home.hero.slideVoyage.ctaSecondary", "EN SAVOIR PLUS"),
      ctaSecondaryLink: "/voyage",
      image: "/images/banner-voyage.jpg",
      tag: t("home.hero.slideVoyage.tag", "Voyage")
    }
  ];

  const currentHero = heroSlides[activeHeroSlide] || heroSlides[0];

  // Rotation automatique animée des slides du hero toutes les 5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Défilement automatique horizontal des offres : s'arrête dès que l'utilisateur prend la main ou survole
  useEffect(() => {
    if (isOffersHovered || userTookControl) return;

    const interval = setInterval(() => {
      const container = offersScrollRef.current;
      if (!container || userTookControl) return;

      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScrollLeft - 30) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 260, behavior: "smooth" });
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isOffersHovered, userTookControl]);

  // Scroll horizontal manuel des offres (arrête aussi l'auto-scroll car l'utilisateur a pris la main)
  const scrollOffers = (direction: "left" | "right") => {
    setUserTookControl(true);
    if (offersScrollRef.current) {
      const offset = direction === "left" ? -280 : 280;
      offersScrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // 8 Offres avec largeur généreuse et shadow utilisant la couleur thématique
  const offres = [
    {
      title: t("home.offres.auto.title", "Auto"),
      desc: t("home.offres.auto.desc", "L'assurance auto pour particulier est une couverture qui protège les propriétaires de voitures..."),
      icon: "/images/icon-cat-auto.svg",
      bgColor: "bg-[#dbf2f4]",
      accentColor: "#28a2b5",
      shadowColor: "rgba(40, 162, 181, 0.28)",
      link: "/auto"
    },
    {
      title: t("home.offres.moto.title", "Moto"),
      desc: t("home.offres.moto.desc", "L'assurance moto est une couverture qui protège les motocyclistes contre les risques..."),
      icon: "/images/icon-cat-moto.svg",
      bgColor: "bg-[#fde4dd]",
      accentColor: "#f48161",
      shadowColor: "rgba(244, 129, 97, 0.28)",
      link: "/moto"
    },
    {
      title: t("home.offres.accident.title", "Accident"),
      desc: t("home.offres.accident.desc", "L'assurance accident est une couverture qui protège les assurés contre les conséquences financières..."),
      icon: "/images/icon-cat-accident.svg",
      bgColor: "bg-[#fde9df]",
      accentColor: "#ea6e3c",
      shadowColor: "rgba(234, 110, 60, 0.28)",
      link: "/accident"
    },
    {
      title: t("home.offres.habitation.title", "Habitation"),
      desc: t("home.offres.habitation.desc", "L'assurance habitation est une couverture qui protège les propriétaires et locataires d'une habitation contre les risques..."),
      icon: "/images/icon-habitation.svg",
      bgColor: "bg-[#fef0e7]",
      accentColor: "#d97706",
      shadowColor: "rgba(217, 119, 6, 0.28)",
      link: "/habitation"
    },
    {
      title: t("home.offres.voyage.title", "Voyage"),
      desc: t("home.offres.voyage.desc", "L'assurance voyage est une couverture qui protège les voyageurs contre les risques financiers liés à..."),
      icon: "/images/icon-cat-voyage.svg",
      bgColor: "bg-[#e0f5f0]",
      accentColor: "#10b981",
      shadowColor: "rgba(16, 185, 129, 0.28)",
      link: "/voyage"
    },
    {
      title: t("home.offres.sante.title", "Santé/Prévoyance"),
      desc: t("home.offres.sante.desc", "L'assurance santé/prévoyance est une couverture qui protège les assurés contre les coûts financiers liés aux soins..."),
      icon: "/images/icon-sante.svg",
      bgColor: "bg-[#fce4ec]",
      accentColor: "#e11d48",
      shadowColor: "rgba(225, 29, 72, 0.28)",
      link: "/sante"
    },
    {
      title: t("home.offres.epargne.title", "Épargne"),
      desc: t("home.offres.epargne.desc", "Des solutions de placement et d'épargne avec des rendements attractifs et une fiscalité très avantageuse."),
      icon: "/images/icon-epargne.svg",
      bgColor: "bg-[#e8edfc]",
      accentColor: "#3b82f6",
      shadowColor: "rgba(59, 130, 246, 0.28)",
      link: "/epargne"
    },
    {
      title: t("home.offres.loisir.title", "Loisir"),
      desc: t("home.offres.loisir.desc", "Vivez vos passions et vos loisirs en toute sécurité avec une protection complète pour vous et vos équipements."),
      icon: "/images/icon-loisir.svg",
      bgColor: "bg-[#f3e8ff]",
      accentColor: "#9333ea",
      shadowColor: "rgba(147, 51, 234, 0.28)",
      link: "/loisir"
    }
  ];

  // 3 Simulation Cards
  const simulations = [
    {
      title: t("home.simulations.auto.title", "Simulateur Auto"),
      subtitle: t("home.simulations.auto.subtitle", "Effectuez gratuitement votre devis Auto"),
      buttonText: t("home.simulations.auto.buttonText", "Demandez votre simulation"),
      image: "/images/sim-auto.png",
      link: "/auto/devis-auto"
    },
    {
      title: t("home.simulations.sante.title", "Simulateur Santé"),
      subtitle: t("home.simulations.sante.subtitle", "Découvrez nos tarifs plan Santé et protégez vous!"),
      buttonText: t("home.simulations.sante.buttonText", "Découvrez votre simulation"),
      image: "/images/sim-sante.png",
      link: "/sante"
    },
    {
      title: t("home.simulations.habitation.title", "Simulateur Habitation"),
      subtitle: t("home.simulations.habitation.subtitle", "Effectuez gratuitement votre devis Habitation"),
      buttonText: t("home.simulations.habitation.buttonText", "Découvrez votre simulation"),
      image: "/images/sim-habitation.png",
      link: "/habitation"
    }
  ];

  // 6 Partners
  const partners = [
    { name: "AXA", logo: "/images/axa.svg", height: "h-12" },
    { name: "Allianz", logo: "/images/allianz.svg", height: "h-8" },
    { name: "Sanlam", logo: "/images/sanlam.png", height: "h-7" },
    { name: "RMA", logo: "/images/rma.svg", height: "h-9" },
    { name: "Assur'wi", logo: "/images/assurwi.png", height: "h-9" },
    { name: "AtlantaSanad", logo: "/images/atlanta.png", height: "h-11" }
  ];

  // Testimonials
  const testimonials = [
    {
      name: t("home.testimonials.t1.name", "Rida Kamal"),
      role: t("home.testimonials.t1.role", "Directeur général"),
      avatar: "/images/avatar-rida.png",
      quote: t("home.testimonials.t1.quote", "J'ai récemment travaillé avec Digiassur pour obtenir une couverture d'assurance pour mon entreprise. Je suis très impressionné par le niveau de service que j'ai reçu.")
    },
    {
      name: t("home.testimonials.t2.name", "Aya Sultan"),
      role: t("home.testimonials.t2.role", "Directrice Artistique"),
      avatar: "/images/avatar-aya.png",
      quote: t("home.testimonials.t2.quote", "J'ai comparé et souscrit mon assurance auto en 5 minutes. Attestation reçue directement chez moi le lendemain, service impeccable !")
    },
    {
      name: t("home.testimonials.t3.name", "Mehdi Benjelloun"),
      role: t("home.testimonials.t3.role", "Cadre financier"),
      avatar: "/images/avatar-rida.png",
      quote: t("home.testimonials.t3.quote", "Une expérience 100% digitale fluide et transparente. Les conseillers sont réactifs et les tarifs sont les plus compétitifs du marché.")
    }
  ];

  // 4 Blog Articles
  const articles = [
    {
      category: t("home.articles.categoryHealth", "Santé"),
      title: t("home.articles.art1.title", "Les bienfaits de la mousse de mer."),
      excerpt: t("home.articles.art1.excerpt", "La mousse de mer est une excellente source de vitamines et de minéraux. Elle contient notamment des vitamines A, B, C et E, ainsi que des minéraux tels que le calcium, ..."),
      image: "/images/blog-mousse-mer.png"
    },
    {
      category: t("home.articles.categoryHealth", "Santé"),
      title: t("home.articles.art2.title", "Sensehacking : Qu'est ce que c'est et comment ça marche?"),
      excerpt: t("home.articles.art2.excerpt", "Le terme \"sensehacking\" désigne une pratique visant à exploiter les sens de l'être humain pour améliorer sa santé mentale et physique..."),
      image: "/images/blog-sensehacking.png"
    },
    {
      category: t("home.articles.categoryHealth", "Santé"),
      title: t("home.articles.art3.title", "Notre santé dépend de notre alimentation"),
      excerpt: t("home.articles.art3.excerpt", "L'alimentation joue un rôle crucial dans notre santé. Une alimentation équilibrée et variée, riche en fruits, légumes, céréales complètes, protéines maigres ..."),
      image: "/images/blog-alimentation.png"
    },
    {
      category: t("home.articles.categoryHealth", "Santé"),
      title: t("home.articles.art4.title", "L'importance de la vitamine D"),
      excerpt: t("home.articles.art4.excerpt", "La vitamine D est une vitamine liposoluble produite naturellement par le corps lorsque la peau est exposée aux rayons du soleil. Elle est également présente dans ..."),
      image: "/images/blog-vitamine-d.png"
    }
  ];

  // 7 Key Advantages
  const advantages = [
    {
      title: t("home.whyChoose.adv1", "Accélération du traitement des sinistres via l’application mobile"),
      icon: <Smartphone className="w-8 h-8 text-[#4d7f9a]" />
    },
    {
      title: t("home.whyChoose.adv2", "Accompagnement juridique et administratif"),
      icon: <Scale className="w-8 h-8 text-[#4d7f9a]" />
    },
    {
      title: t("home.whyChoose.adv3", "Centre de relation client H24"),
      icon: <Headphones className="w-8 h-8 text-[#4d7f9a]" />
    },
    {
      title: t("home.whyChoose.adv4", "Livraison gratuite de votre attestation"),
      icon: <Truck className="w-8 h-8 text-[#4d7f9a]" />
    },
    {
      title: t("home.whyChoose.adv5", "Espace client en ligne et sur l’application mobile"),
      icon: <Smartphone className="w-8 h-8 text-[#4d7f9a]" />
    },
    {
      title: t("home.whyChoose.adv6", "Paiement par mensualité (crédit gratuit sofac)"),
      icon: <CreditCard className="w-8 h-8 text-[#4d7f9a]" />
    },
    {
      title: t("home.whyChoose.adv7", "Plateforme d’écoute psychologique en cas d’accident"),
      icon: <HeartHandshake className="w-8 h-8 text-[#4d7f9a]" />
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#f48161] selection:text-white overflow-x-hidden">
      {/* Official Header */}
      <DigiassurHeader />
      <FloatingWidgets />

      <main className="flex-1 pt-[116px]">
        {/* ========================================================
            1. HERO CAROUSEL (Figma Desktop proposition-4)
           ======================================================== */}
        <section className="relative w-full overflow-hidden bg-slate-100">
          <div className="relative w-full h-[480px] md:h-[500px]">
            {/* Background Full Image */}
            <div className="absolute inset-0">
              <img
                key={currentHero.image}
                src={currentHero.image}
                alt={currentHero.titlePrefix}
                className="w-full h-full object-cover object-center transition-all duration-700 animate-in fade-in"
              />
              <div className="absolute inset-0 bg-black/15" />
            </div>

            {/* Diagonal Blue Slate Overlay Polygon (Figma Mask with RTL support) */}
            <div 
              key={`overlay-${activeHeroSlide}`}
              className={`absolute inset-y-0 ${isRTL ? "right-0" : "left-0"} w-full md:w-[62%] lg:w-[56%] bg-[#4d7f9a]/95 text-white flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-20 z-10 transition-all`}
              style={{
                clipPath: isRTL 
                  ? "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)" 
                  : "polygon(0 0, 100% 0, 88% 100%, 0 100%)"
              }}
            >
              <div className="max-w-[520px] animate-in fade-in slide-in-from-left-6 duration-500">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-[#f48161] animate-pulse"></span>
                  <span>{currentHero.tag}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight mb-4 tracking-tight drop-shadow-xs">
                  <span>{currentHero.titlePrefix}</span>
                  {currentHero.price && (
                    <>
                      <br />
                      <span>{currentHero.fromPrice ? `${currentHero.fromPrice} ` : ""}</span>
                      <span className="text-[#f48161]">
                        {currentHero.price}
                      </span>
                    </>
                  )}
                </h1>

                <p className="text-lg sm:text-xl text-cyan-50 font-normal mb-8 leading-snug">
                  {currentHero.subtitle}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={currentHero.ctaPrimaryLink}
                    className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer rounded-lg"
                  >
                    <span>{currentHero.ctaPrimary}</span>
                    <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                  </Link>

                  <Link
                    href={currentHero.ctaSecondaryLink}
                    className="inline-flex items-center gap-2 bg-[#689ebd] hover:bg-[#588da9] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer rounded-lg"
                  >
                    <span>{currentHero.ctaSecondary}</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Slider Navigation Arrows */}
            <button
              type="button"
              onClick={() => setActiveHeroSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
              className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer`}
              aria-label={t("home.hero.prevSlide", "Slide précédent")}
            >
              {isRTL ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
            </button>

            <button
              type="button"
              onClick={() => setActiveHeroSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
              className={`absolute ${isRTL ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer`}
              aria-label={t("home.hero.nextSlide", "Slide suivant")}
            >
              {isRTL ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
            </button>

            {/* Slider Pagination Dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveHeroSlide(idx)}
                  className={`h-3 rounded-full transition-all cursor-pointer ${
                    activeHeroSlide === idx ? "bg-[#f48161] w-6" : "w-3 bg-white/60 hover:bg-white"
                  }`}
                  aria-label={`${t("home.hero.goToSlide", "Aller au slide")} ${idx + 1}`}
                />
              ))}
            </div>

            {/* "Appeler un conseiller" Sticky Badge on Hero (Figma Group 143) */}
            <a
              href="tel:0522368182"
              className={`hidden lg:flex absolute bottom-5 ${isRTL ? "left-6" : "right-6"} z-20 items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white px-5 py-2.5 rounded-full shadow-xl transition transform hover:scale-105`}
            >
              <Headphones className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">{t("home.hero.callAdvisor", "Appeler un conseiller")}</span>
            </a>
          </div>
        </section>

        {/* ========================================================
            2. NOS OFFRES D'ASSURANCE (Défilement horizontal & cartes compactes)
           ======================================================== */}
        <section className="py-10 md:py-12 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-black text-[#153954] mb-2 tracking-tight">
                  {t("home.offres.title", "Nos offres d’assurance")}
                </h2>
                <p className="text-slate-500 max-w-2xl text-xs md:text-sm leading-relaxed">
                  {t("home.offres.subtitle", "Nos offres d'assurance pour les particuliers sont conçues pour offrir une protection complète à un prix abordable.")}
                </p>
              </div>

              {/* Boutons de navigation manuelle du carrousel */}
              <div className="flex items-center justify-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => scrollOffers("left")}
                  className="w-9 h-9 rounded-full bg-slate-50 hover:bg-[#153954] text-slate-700 hover:text-white border border-slate-200 flex items-center justify-center transition shadow-xs hover:shadow-md cursor-pointer"
                  aria-label="Défiler vers la gauche"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollOffers("right")}
                  className="w-9 h-9 rounded-full bg-slate-50 hover:bg-[#153954] text-slate-700 hover:text-white border border-slate-200 flex items-center justify-center transition shadow-xs hover:shadow-md cursor-pointer"
                  aria-label="Défiler vers la droite"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Carrousel d'offres à défilement horizontal fluide avec scrollbar orange soft transparent */}
            <div
              ref={offersScrollRef}
              onMouseEnter={() => setIsOffersHovered(true)}
              onMouseLeave={() => setIsOffersHovered(false)}
              onMouseDown={() => setUserTookControl(true)}
              onTouchStart={() => setUserTookControl(true)}
              onWheel={() => setUserTookControl(true)}
              onScroll={() => {
                // Dès que l'utilisateur scroll manuellement, on coupe l'auto-scroll
                if (isOffersHovered) {
                  setUserTookControl(true);
                }
              }}
              className="flex items-stretch gap-5 overflow-x-auto orange-soft-scrollbar scroll-smooth pt-2 pb-5 px-2"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {offres.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  className="w-[230px] sm:w-[250px] shrink-0 bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 flex flex-col items-center text-center group cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 select-none"
                  style={{
                    boxShadow: `0 10px 24px -6px ${item.shadowColor}`,
                    scrollSnapAlign: "start"
                  }}
                >
                  <div 
                    className={`w-14 h-14 rounded-xl ${item.bgColor} flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-105 border-2 border-white`}
                    style={{
                      boxShadow: `0 4px 12px -2px ${item.shadowColor}`
                    }}
                  >
                    <img src={item.icon} alt={item.title} className="w-7 h-7 object-contain" />
                  </div>
                  <h3 className="font-bold text-base text-slate-800 mb-1 group-hover:text-[#f48161] transition">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3 flex-1">
                    {item.desc}
                  </p>
                  <span 
                    className="mt-auto text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                    style={{ color: item.accentColor }}
                  >
                    <span>{t("home.offres.discover", "Découvrir l'offre")}</span>
                    <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            3. NOS SIMULATIONS (Figma Group 71)
           ======================================================== */}
        <section className="py-16 md:py-20 bg-slate-50 relative overflow-hidden">
          {/* Subtle curved background lines */}
          <div className="absolute right-0 top-0 w-96 h-96 rounded-full border border-orange-200/40 pointer-events-none -mr-48 -mt-24" />
          <div className="absolute right-12 top-12 w-80 h-80 rounded-full border border-orange-200/30 pointer-events-none -mr-40" />

          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h2 className="text-3xl md:text-[34px] font-black text-[#153954] mb-3 tracking-tight">
              {t("home.simulations.title", "Nos simulations")}
            </h2>
            <p className="text-slate-500 max-w-3xl mx-auto text-sm md:text-base mb-12 leading-relaxed">
              {t("home.simulations.subtitle", "Vous cherchez à obtenir une assurance qui correspond à vos besoins, mais vous ne savez pas par où commencer ? Les simulations pour l'assurance des particuliers peuvent vous aider à trouver la couverture qui convient le mieux à votre situation personnelle.")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {simulations.map((sim, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-xl transition-all duration-300 flex flex-col text-start group"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={sim.image}
                      alt={sim.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#153954] mb-1">
                        {sim.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-6">
                        {sim.subtitle}
                      </p>
                    </div>

                    <Link
                      href={sim.link}
                      className="w-full py-3 px-5 rounded-full bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase tracking-wider text-center shadow-md transition transform hover:-translate-y-0.5 inline-block cursor-pointer"
                    >
                      {sim.buttonText}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2 mt-10">
              {[0, 1, 2].map((dot) => (
                <button
                  key={dot}
                  type="button"
                  onClick={() => setActiveSimPage(dot)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    activeSimPage === dot ? "bg-[#f48161]" : "bg-slate-300"
                  }`}
                  aria-label={`Sim page ${dot + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            4. NOS PARTENAIRES (Figma Group 70)
           ======================================================== */}
        <section className="py-16 md:py-20 bg-white text-center">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-[34px] font-black text-[#153954] mb-3 tracking-tight">
              {t("home.partners.title", "Nos partenaires")}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base mb-12 leading-relaxed">
              {t("home.partners.subtitle", "Nous sommes fiers de travailler avec une sélection de compagnies d'assurance de premier plan pour offrir à nos clients les meilleurs produits et services possibles.")}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
              {partners.map((partner, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-xs border border-slate-100 p-6 h-28 flex items-center justify-center hover:shadow-md transition"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={`${partner.height} max-w-[140px] object-contain filter grayscale hover:grayscale-0 transition duration-300`}
                  />
                </div>
              ))}
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2 mt-8">
              <button 
                type="button" 
                onClick={() => setActivePartnerPage(0)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${activePartnerPage === 0 ? "bg-[#f48161]" : "bg-slate-300"}`} 
                aria-label="Partner page 1"
              />
              <button 
                type="button" 
                onClick={() => setActivePartnerPage(1)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${activePartnerPage === 1 ? "bg-[#f48161]" : "bg-slate-300"}`} 
                aria-label="Partner page 2"
              />
            </div>
          </div>
        </section>

        {/* ========================================================
            5. TÉMOIGNAGES (Figma Group 69)
           ======================================================== */}
        <section className="py-16 md:py-20 bg-slate-50 relative overflow-hidden">
          {/* Subtle concentric wave lines */}
          <div className="absolute left-0 bottom-0 w-[500px] h-[500px] rounded-full border border-cyan-200/30 pointer-events-none -ml-64 -mb-48" />
          <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full border border-cyan-200/30 pointer-events-none -mr-64 -mt-48" />

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-[34px] font-black text-[#153954] mb-3 tracking-tight">
              {t("home.testimonials.title", "Témoignages")}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base mb-14 leading-relaxed">
              {t("home.testimonials.subtitle", "Nous nous efforçons de fournir à nos clients un service exceptionnel et personnalisé. Nous sommes fiers de voir que nos efforts ont porté leurs fruits et que nos clients sont satisfaits de nos services.")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
              {testimonials.map((tItem, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between hover:shadow-lg transition duration-300"
                >
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                    "{tItem.quote}"
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <img
                      src={tItem.avatar}
                      alt={tItem.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{tItem.name}</h4>
                      <p className="text-xs text-slate-400">{tItem.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2 mt-10">
              {[0, 1, 2].map((dot) => (
                <button
                  key={dot}
                  type="button"
                  onClick={() => setActiveTestimonialPage(dot)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    activeTestimonialPage === dot ? "bg-[#f48161]" : "bg-slate-300"
                  }`}
                  aria-label={`Testimonial page ${dot + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            6. INFOS ET CONSEILS POUR VOTRE SÉCURITÉ (Figma Group 68)
           ======================================================== */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-[34px] font-black text-[#153954] mb-3 tracking-tight">
              {t("home.articles.title", "Infos et conseils pour votre sécurité")}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base mb-14 leading-relaxed">
              {t("home.articles.subtitle", "Nous sommes fiers de fournir un service exceptionnel à nos clients et nous sommes là pour vous aider à chaque étape du processus.")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-start">
              {articles.map((art, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className={`absolute top-3 ${isRTL ? "right-3" : "left-3"} bg-[#f48161] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
                      {art.category}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base text-slate-800 mb-2 line-clamp-2 group-hover:text-[#f48161] transition">
                        {art.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className={`flex ${isRTL ? "justify-start" : "justify-end"} pt-2`}>
                      <button
                        type="button"
                        className="w-9 h-9 rounded-lg bg-[#f48161] hover:bg-[#e46e4e] text-white flex items-center justify-center transition shadow-xs cursor-pointer"
                        aria-label={t("home.articles.readArticleAria", "Lire l'article")}
                      >
                        <ChevronRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Read more button */}
            <div className="mt-12">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>{t("home.articles.readMore", "Lire plus de conseils et infos")}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================
            7. POURQUOI CHOISIR DIGIASSUR ? (Figma Group 65)
           ======================================================== */}
        <section className="py-20 bg-[#4d7f9a] text-white text-center">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-[38px] font-black text-white mb-14 tracking-tight">
              {t("home.whyChoose.title", "Pourquoi choisir Digiassur ?")}
            </h2>

            {/* Row 1: 4 circular items */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {advantages.slice(0, 4).map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4 shadow-lg border-4 border-white/40 transition hover:scale-105 duration-300">
                    {item.icon}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold max-w-[200px] leading-snug">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Row 2: 3 circular items */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {advantages.slice(4, 7).map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4 shadow-lg border-4 border-white/40 transition hover:scale-105 duration-300">
                    {item.icon}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold max-w-[220px] leading-snug">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Official Footer */}
      <DigiassurFooter />
    </div>
  );
}

