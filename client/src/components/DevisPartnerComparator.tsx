import { useState, useMemo } from "react";
import { Check, Star, ShieldCheck, Zap, Award, ThumbsUp, ArrowRight, Sparkles, Filter } from "lucide-react";

export interface PartnerOffer {
  id: string;
  name: string;
  logo: string;
  fallbackLogo: string;
  badge: string;
  badgeColor: string;
  rating: number;
  reviewCount: number;
  discountPercent?: number;
  features: string[];
  deductibleBdg?: string;
  replacementVehicle?: string;
  assistanceHighlight: string;
  isRecommended?: boolean;
}

interface DevisPartnerComparatorProps {
  type: "auto" | "moto";
  basePrice: number;
  duree: string;
  formuleActive?: string;
  selectedCompagnie?: string;
  onSelectCompagnie: (compagnieName: string, calculatedPrice: number) => void;
  onProceed: () => void;
}

export default function DevisPartnerComparator({
  type,
  basePrice,
  duree,
  formuleActive = "Formule Standard",
  selectedCompagnie,
  onSelectCompagnie,
  onProceed
}: DevisPartnerComparatorProps) {
  const [sortBy, setSortBy] = useState<"recommended" | "price_asc" | "rating">("recommended");

  // Définition des offres partenaires
  const partnerOffers: PartnerOffer[] = useMemo(() => {
    if (type === "moto") {
      return [
        {
          id: "atlanta",
          name: "AtlantaSanad",
          logo: "/images/atlanta.png",
          fallbackLogo: "https://digiassur.ma/assets/img/rectangle-9@2x.png",
          badge: "Partenaire Privilège • Prix Web Négocié",
          badgeColor: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
          rating: 4.9,
          reviewCount: 980,
          discountPercent: 5,
          features: [
            "Responsabilité Civile légale ACAPS",
            "Défense & Recours incluse",
            "Assistance crevaison & panne batterie 24/7",
            "Attestation provisoire immédiate par e-mail"
          ],
          assistanceHighlight: "Dépannage moto spécialisé 0 km",
          isRecommended: true
        },
        {
          id: "sanlam",
          name: "Sanlam Maroc",
          logo: "/images/sanlam.png",
          fallbackLogo: "https://digiassur.ma/assets/img/groupe-2798@2x.png",
          badge: "N°1 Réseau Deux-Roues",
          badgeColor: "bg-blue-600 text-white",
          rating: 4.8,
          reviewCount: 1240,
          discountPercent: 2,
          features: [
            "Responsabilité Civile obligatoire",
            "Défense et Recours amiable & judiciaire",
            "Remorquage plateau adapté deux-roues",
            "Service client dédié motards"
          ],
          assistanceHighlight: "Intervention en moins de 45 minutes",
          isRecommended: false
        },
        {
          id: "rma",
          name: "RMA",
          logo: "/images/rma.svg",
          fallbackLogo: "https://digiassur.ma/assets/img/rma-1-1.svg",
          badge: "Indemnisation Accélérée",
          badgeColor: "bg-emerald-600 text-white",
          rating: 4.7,
          reviewCount: 860,
          features: [
            "RC officielle barème FMSAR",
            "Défense & Recours 0 DH",
            "Prise en charge directe garages agréés",
            "Déclaration de sinistre sur smartphone"
          ],
          assistanceHighlight: "Réseau de réparateurs agréés partout au Maroc",
          isRecommended: false
        },
        {
          id: "axa",
          name: "AXA Assurance",
          logo: "/images/axa.svg",
          fallbackLogo: "https://digiassur.ma/assets/img/axa-768-1-2.svg",
          badge: "Solidité Internationale",
          badgeColor: "bg-[#153954] text-white",
          rating: 4.7,
          reviewCount: 1450,
          features: [
            "Responsabilité Civile moto complète",
            "Défense et Recours juridique",
            "Assistance d'urgence disponible 24h/24",
            "Conseiller personnel assigné"
          ],
          assistanceHighlight: "Assistance internationale reconnue",
          isRecommended: false
        }
      ];
    }

    // Offres pour l'Automobile
    return [
      {
        id: "atlanta",
        name: "AtlantaSanad",
        logo: "/images/atlanta.png",
        fallbackLogo: "https://digiassur.ma/assets/img/rectangle-9@2x.png",
        badge: "Coup de Cœur Digiassur • Meilleur Prix Web",
        badgeColor: "bg-gradient-to-r from-[#f48161] to-[#e46e4e] text-white",
        rating: 4.9,
        reviewCount: 2340,
        discountPercent: 8,
        features: [
          "Franchise Bris de Glace : 0 DH (Offerte)",
          "Constat amiable 100% digitalisé par smartphone",
          "Remorquage 0 km panne & accident partout au Maroc",
          "Règlement direct réparateur sans avance d'argent"
        ],
        deductibleBdg: "0 DH (Franchise offerte)",
        replacementVehicle: "5 jours inclus",
        assistanceHighlight: "Dépannage 0 km sous 35 min garanti",
        isRecommended: true
      },
      {
        id: "sanlam",
        name: "Sanlam Maroc",
        logo: "/images/sanlam.png",
        fallbackLogo: "https://digiassur.ma/assets/img/groupe-2798@2x.png",
        badge: "Réseau d'Agences N°1 au Maroc",
        badgeColor: "bg-blue-600 text-white",
        rating: 4.8,
        reviewCount: 3890,
        discountPercent: 5,
        features: [
          "Plus de 450 garages conventionnés partenaires",
          "Expertise à distance rapide en visio",
          "Protection conducteur et passagers renforcée",
          "Assistance rapatriement médical incluse"
        ],
        deductibleBdg: "200 DH ou 5%",
        replacementVehicle: "7 jours inclus",
        assistanceHighlight: "Prise en charge immédiate 24/7",
        isRecommended: false
      },
      {
        id: "rma",
        name: "RMA",
        logo: "/images/rma.svg",
        fallbackLogo: "https://digiassur.ma/assets/img/rma-1-1.svg",
        badge: "Service Client 5 Étoiles",
        badgeColor: "bg-emerald-600 text-white",
        rating: 4.8,
        reviewCount: 1980,
        discountPercent: 4,
        features: [
          "Indemnisation accélérée sous 48h",
          "Véhicule de remplacement équivalent",
          "Protection juridique automobile complète",
          "Suivi du dossier sinistre en temps réel"
        ],
        deductibleBdg: "300 DH",
        replacementVehicle: "6 jours inclus",
        assistanceHighlight: "Centre de relation client certifié",
        isRecommended: false
      },
      {
        id: "axa",
        name: "AXA Assurance",
        logo: "/images/axa.svg",
        fallbackLogo: "https://digiassur.ma/assets/img/axa-768-1-2.svg",
        badge: "Marque Mondiale de Référence",
        badgeColor: "bg-[#153954] text-white",
        rating: 4.7,
        reviewCount: 4120,
        discountPercent: 3,
        features: [
          "Garantie Véhicule Relais jusqu'à 10 jours",
          "Assistance internationale Carte Verte",
          "Réseau de spécialistes carrosserie premium",
          "Assurance conducteur jusqu'à 500 000 DH"
        ],
        deductibleBdg: "250 DH",
        replacementVehicle: "10 jours inclus",
        assistanceHighlight: "Réseau international d'assistance",
        isRecommended: false
      },
      {
        id: "allianz",
        name: "Allianz Maroc",
        logo: "/images/allianz.svg",
        fallbackLogo: "https://digiassur.ma/assets/img/allianz-2-1-2.svg",
        badge: "Excellence Garantie",
        badgeColor: "bg-indigo-600 text-white",
        rating: 4.6,
        reviewCount: 1150,
        features: [
          "Dépannage toutes causes (erreur carburant, crevaison)",
          "Option valeur à neuf étendue",
          "Assistance voyage Europe comprise",
          "Plateforme client digitale intuitive"
        ],
        deductibleBdg: "350 DH",
        replacementVehicle: "5 jours inclus",
        assistanceHighlight: "Assistance globale Allianz Global Assistance",
        isRecommended: false
      }
    ];
  }, [type]);

  // Calcul du prix par offre avec d'éventuelles remises partenaires négociées
  const offersWithPricing = useMemo(() => {
    return partnerOffers.map(offer => {
      const discount = offer.discountPercent ? (basePrice * offer.discountPercent) / 100 : 0;
      const finalPrice = Math.round(basePrice - discount);
      return {
        ...offer,
        originalPrice: Math.round(basePrice),
        discountAmount: Math.round(discount),
        finalPrice: finalPrice
      };
    });
  }, [partnerOffers, basePrice]);

  // Tri des offres
  const sortedOffers = useMemo(() => {
    const list = [...offersWithPricing];
    if (sortBy === "price_asc") {
      return list.sort((a, b) => a.finalPrice - b.finalPrice);
    }
    if (sortBy === "rating") {
      return list.sort((a, b) => b.rating - a.rating);
    }
    // "recommended" : l'assureur recommandé d'abord puis par prix
    return list.sort((a, b) => {
      if (a.isRecommended && !b.isRecommended) return -1;
      if (!a.isRecommended && b.isRecommended) return 1;
      return a.finalPrice - b.finalPrice;
    });
  }, [offersWithPricing, sortBy]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* En-tête du comparateur avec filtres de tri */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              {offersWithPricing.length} devis officiels en direct
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-0.5">
            Tarifs calculés pour votre profil • Barème officiel garanti & remises négociées Digiassur
          </p>
        </div>

        {/* Boutons de tri */}
        <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs">
          <span className="text-slate-400 px-2 flex items-center gap-1 font-semibold">
            <Filter className="w-3.5 h-3.5" />
            <span>Trier :</span>
          </span>
          <button
            type="button"
            onClick={() => setSortBy("recommended")}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              sortBy === "recommended"
                ? "bg-[#153954] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Recommandés
          </button>
          <button
            type="button"
            onClick={() => setSortBy("price_asc")}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              sortBy === "price_asc"
                ? "bg-[#153954] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Prix le plus bas
          </button>
          <button
            type="button"
            onClick={() => setSortBy("rating")}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              sortBy === "rating"
                ? "bg-[#153954] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Avis clients
          </button>
        </div>
      </div>

      {/* Liste des cartes d'offres partenaires */}
      <div className="space-y-4">
        {sortedOffers.map((offer) => {
          const isSelected = selectedCompagnie === offer.name;

          return (
            <div
              key={offer.id}
              onClick={() => onSelectCompagnie(offer.name, offer.finalPrice)}
              className={`rounded-2xl bg-white border-2 transition-all duration-300 relative overflow-hidden cursor-pointer ${
                isSelected
                  ? "border-[#f48161] shadow-xl ring-2 ring-[#f48161]/30 -translate-y-0.5"
                  : "border-slate-200 hover:border-[#153954] hover:shadow-lg"
              }`}
            >
              {/* Top Banner Badge si présent */}
              <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-2.5 bg-slate-50 border-b border-slate-100 gap-2">
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-2xs ${offer.badgeColor}`}>
                  {offer.badge}
                </span>

                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-black text-slate-800 ml-1">{offer.rating}</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">({offer.reviewCount} avis)</span>
                </div>
              </div>

              {/* Corps principal : 3 Colonnes (Logo & Compagnie | Garanties Clés | Prix & Bouton) */}
              <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Colonne 1 : Logo & Nom Assureur */}
                <div className="md:col-span-3 flex md:flex-col items-center md:items-start justify-between md:justify-center gap-3">
                  <div className="h-12 flex items-center">
                    <img
                      src={offer.logo}
                      alt={offer.name}
                      className="max-h-10 max-w-[130px] object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = offer.fallbackLogo;
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">{offer.name}</h4>
                    <p className="text-[11px] text-slate-400">{formuleActive} • {duree}</p>
                  </div>
                </div>

                {/* Colonne 2 : Avantages & Garanties phares */}
                <div className="md:col-span-5 space-y-2 text-xs border-y md:border-y-0 md:border-x border-slate-100 py-3 md:py-0 md:px-5">
                  <div className="flex items-center gap-2 text-[#153954] font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{offer.assistanceHighlight}</span>
                  </div>

                  <ul className="space-y-1.5 pt-1">
                    {offer.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {offer.deductibleBdg && (
                    <div className="pt-1 flex items-center gap-3 text-[11px] text-slate-500">
                      <span>Franchise BDG : <strong className="text-slate-800">{offer.deductibleBdg}</strong></span>
                      {offer.replacementVehicle && (
                        <span>• Véhicule relais : <strong className="text-slate-800">{offer.replacementVehicle}</strong></span>
                      )}
                    </div>
                  )}
                </div>

                {/* Colonne 3 : Tarification & Bouton de souscription */}
                <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center text-center md:text-right gap-2">
                  {offer.discountAmount && offer.discountAmount > 0 ? (
                    <div>
                      <div className="flex items-center justify-center md:justify-end gap-2">
                        <span className="text-xs text-slate-400 line-through">
                          {offer.originalPrice.toLocaleString()} DH
                        </span>
                        <span className="text-[10px] font-black bg-orange-100 text-[#f48161] px-2 py-0.5 rounded-full border border-orange-200">
                          -{offer.discountPercent}% Négocié
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-[#153954]">
                        {offer.finalPrice.toLocaleString()} <span className="text-sm font-bold text-[#f48161]">DHS TTC</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-2xl sm:text-3xl font-black text-[#153954]">
                      {offer.finalPrice.toLocaleString()} <span className="text-sm font-bold text-[#f48161]">DHS TTC</span>
                    </div>
                  )}

                  <p className="text-[11px] text-slate-400 font-medium">
                    Taxes FMSAR & ACAPS incluses
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCompagnie(offer.name, offer.finalPrice);
                      onProceed();
                    }}
                    className={`w-full sm:w-auto px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-md transform hover:-translate-y-0.5 cursor-pointer ${
                      isSelected
                        ? "bg-[#f48161] hover:bg-[#e46e4e] text-white ring-2 ring-[#f48161]/50"
                        : "bg-[#153954] hover:bg-[#102c42] text-white"
                    }`}
                  >
                    <span>{isSelected ? "Continuer avec cette offre" : "Choisir cette offre"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bandeau d'engagement Digiassur */}
      <div className="bg-gradient-to-r from-slate-50 via-orange-50/30 to-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Tarifs officiels certifiés ACAPS</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Aucun frais de dossier caché</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Attestation provisoire immédiate 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
}
