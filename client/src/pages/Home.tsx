import { useState } from "react";
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
  const [activeOffrePage, setActiveOffrePage] = useState(0);
  const [activeSimPage, setActiveSimPage] = useState(0);
  const [activePartnerPage, setActivePartnerPage] = useState(0);
  const [activeTestimonialPage, setActiveTestimonialPage] = useState(0);

  // Hero Slides
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
      titlePrefix: t("home.hero.slide2.titlePrefix", "Assurance Moto sur mesure au meilleur prix"),
      fromPrice: "",
      price: "",
      subtitle: t("home.hero.slide2.subtitle", "Roulez en toute sérénité dès 89 DHS/Mois avec assistance 24/7"),
      ctaPrimary: t("home.hero.slide2.ctaPrimary", "OBTENIR MON TARIF MOTO"),
      ctaPrimaryLink: "/moto",
      ctaSecondary: t("home.hero.slide2.ctaSecondary", "DÉCOUVRIR LES GARANTIES"),
      ctaSecondaryLink: "/moto",
      image: "/images/banner-moto-welcome.png",
      tag: t("home.hero.slide2.tag", "Moto")
    },
    {
      titlePrefix: t("home.hero.slide3.titlePrefix", "Construisez votre épargne en toute sécurité"),
      fromPrice: "",
      price: "",
      subtitle: t("home.hero.slide3.subtitle", "Des rendements attractifs et une fiscalité avantageuse au Maroc"),
      ctaPrimary: t("home.hero.slide3.ctaPrimary", "SIMULER MON ÉPARGNE"),
      ctaPrimaryLink: "/epargne",
      ctaSecondary: t("home.hero.slide3.ctaSecondary", "EN SAVOIR PLUS"),
      ctaSecondaryLink: "/epargne",
      image: "/images/epargne-pic.jpg",
      tag: t("home.hero.slide3.tag", "Épargne")
    }
  ];

  const currentHero = heroSlides[activeHeroSlide];

  // 6 Circular Offers
  const offres = [
    {
      title: t("home.offres.auto.title", "Auto"),
      desc: t("home.offres.auto.desc", "L'assurance auto pour particulier est une couverture qui protège les propriétaires de voitures..."),
      icon: "/images/icon-cat-auto.svg",
      bgColor: "bg-[#dbf2f4]",
      link: "/auto"
    },
    {
      title: t("home.offres.moto.title", "Moto"),
      desc: t("home.offres.moto.desc", "L'assurance moto est une couverture qui protège les motocyclistes contre les risques..."),
      icon: "/images/icon-cat-moto.svg",
      bgColor: "bg-[#fde4dd]",
      link: "/moto"
    },
    {
      title: t("home.offres.accident.title", "Accident"),
      desc: t("home.offres.accident.desc", "L'assurance accident est une couverture qui protège les assurés contre les conséquences financières..."),
      icon: "/images/icon-cat-accident.svg",
      bgColor: "bg-[#fde9df]",
      link: "/accident"
    },
    {
      title: t("home.offres.habitation.title", "Habitation"),
      desc: t("home.offres.habitation.desc", "L'assurance habitation est une couverture qui protège les propriétaires et locataires d'une habitation contre les risques..."),
      icon: "/images/icon-habitation.svg",
      bgColor: "bg-[#fef0e7]",
      link: "/habitation"
    },
    {
      title: t("home.offres.voyage.title", "Voyage"),
      desc: t("home.offres.voyage.desc", "L'assurance voyage est une couverture qui protège les voyageurs contre les risques financiers liés à..."),
      icon: "/images/icon-cat-voyage.svg",
      bgColor: "bg-[#e0f5f0]",
      link: "/voyage"
    },
    {
      title: t("home.offres.sante.title", "Santé/Prévoyance"),
      desc: t("home.offres.sante.desc", "L'assurance santé/prévoyance est une couverture qui protège les assurés contre les coûts financiers liés aux soins..."),
      icon: "/images/icon-sante.svg",
      bgColor: "bg-[#fce4ec]",
      link: "/sante"
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
                src={currentHero.image}
                alt={currentHero.titlePrefix}
                className="w-full h-full object-cover object-center transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Diagonal Blue Slate Overlay Polygon (Figma Mask with RTL support) */}
            <div 
              className={`absolute inset-y-0 ${isRTL ? "right-0" : "left-0"} w-full md:w-[62%] lg:w-[56%] bg-[#4d7f9a]/95 text-white flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-20 z-10`}
              style={{
                clipPath: isRTL 
                  ? "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)" 
                  : "polygon(0 0, 100% 0, 88% 100%, 0 100%)"
              }}
            >
              <div className="max-w-[520px] animate-in fade-in slide-in-from-left-4 duration-500">
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
                    className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>{currentHero.ctaPrimary}</span>
                    <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                  </Link>

                  <Link
                    href={currentHero.ctaSecondaryLink}
                    className="inline-flex items-center gap-2 bg-[#689ebd] hover:bg-[#588da9] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
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
            2. NOS OFFRES D'ASSURANCE (Figma Group 72)
           ======================================================== */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-[34px] font-black text-[#153954] mb-3 tracking-tight">
              {t("home.offres.title", "Nos offres d’assurance")}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base mb-14 leading-relaxed">
              {t("home.offres.subtitle", "Nos offres d'assurance pour les particuliers sont conçues pour offrir une protection complète à un prix abordable.")}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
              {offres.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full ${item.bgColor} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-xs border-2 border-white`}>
                    <img src={item.icon} alt={item.title} className="w-12 h-12 object-contain" />
                  </div>
                  <h3 className="font-bold text-base text-slate-800 mb-2 group-hover:text-[#f48161] transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed px-1">
                    {item.desc}
                  </p>
                </Link>
              ))}
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2 mt-10">
              <button 
                type="button" 
                onClick={() => setActiveOffrePage(0)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${activeOffrePage === 0 ? "bg-[#f48161]" : "bg-slate-300"}`} 
                aria-label="Page 1"
              />
              <button 
                type="button" 
                onClick={() => setActiveOffrePage(1)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${activeOffrePage === 1 ? "bg-[#f48161]" : "bg-slate-300"}`} 
                aria-label="Page 2"
              />
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

