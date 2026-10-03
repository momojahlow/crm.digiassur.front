import { Activity, Bike, CarFront, Dumbbell, HeartPulse, House, PiggyBank, Plane } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type InsuranceSlug = "auto" | "moto" | "accident" | "habitation" | "voyage" | "sante" | "epargne" | "loisir";
export type InsuranceFieldType = "text" | "email" | "tel" | "number" | "date" | "select";

export type InsuranceField = {
  name: string;
  label: string;
  placeholder?: string;
  type: InsuranceFieldType;
  required?: boolean;
  options?: string[];
  min?: number;
  max?: number;
};

export type InsuranceProduct = {
  slug: InsuranceSlug;
  name: string;
  navName: string;
  headline: string;
  description: string;
  shortDescription: string;
  icon: LucideIcon;
  startingPrice?: string;
  quoteStep: string;
  coverTitle: string;
  coverPoints: string[];
  detailFields: InsuranceField[];
};

export const INSURANCES: InsuranceProduct[] = [
  {
    slug: "auto", name: "Auto", navName: "Auto", headline: "Assurer votre voiture à partir de 153 DHS TTC/Mois", description: "Recevez votre attestation à domicile ou au bureau. Comparez les garanties et avancez avec un accompagnement clair.", shortDescription: "Prenez la route sereinement.", icon: CarFront, startingPrice: "À partir de 153 DHS TTC/Mois", quoteStep: "Véhicule", coverTitle: "Votre voiture, vos trajets, votre tranquillité.", coverPoints: ["Des formules faciles à comparer", "Une assistance selon vos besoins", "Un accompagnement en cas d’imprévu"], detailFields: [
      { name: "vehicleMake", label: "Marque du véhicule", placeholder: "Ex. Dacia", type: "text", required: true },
      { name: "vehicleModel", label: "Modèle", placeholder: "Ex. Sandero", type: "text", required: true },
      { name: "vehicleYear", label: "Année de mise en circulation", placeholder: "2022", type: "number", min: 1980, max: 2026, required: true },
      { name: "vehicleUse", label: "Usage du véhicule", type: "select", required: true, options: ["Privé", "Professionnel", "Mixte"] },
    ] },
  {
    slug: "moto", name: "Moto", navName: "Moto", headline: "Votre moto bien protégée, l’esprit libre.", description: "Une protection pensée pour vos trajets et votre deux-roues, avec un parcours simple et des informations lisibles.", shortDescription: "Roulez avec plus de sérénité.", icon: Bike, quoteStep: "Moto", coverTitle: "Une couverture adaptée à votre moto.", coverPoints: ["Des garanties à comparer clairement", "Un parcours guidé en quelques étapes", "Un accompagnement humain"], detailFields: [
      { name: "vehicleMake", label: "Marque de la moto", placeholder: "Ex. Yamaha", type: "text", required: true },
      { name: "vehicleModel", label: "Modèle", placeholder: "Nom du modèle", type: "text", required: true },
      { name: "engineSize", label: "Cylindrée (cm³)", placeholder: "Ex. 125", type: "number", min: 50, max: 2500, required: true },
      { name: "vehicleYear", label: "Année de mise en circulation", placeholder: "2022", type: "number", min: 1980, max: 2026, required: true },
      { name: "vehicleUse", label: "Usage de la moto", type: "select", required: true, options: ["Privé", "Professionnel", "Mixte"] },
    ] },
  {
    slug: "accident", name: "Accident", navName: "Accident", headline: "Protégez l’essentiel face aux imprévus.", description: "Des garanties pour vous accompagner après un accident et vous aider à faire face aux conséquences du quotidien.", shortDescription: "Un appui lorsque la vie change de rythme.", icon: Activity, quoteStep: "Garanties", coverTitle: "Une protection qui pense aussi à l’après.", coverPoints: ["Des garanties à la carte", "Des réponses plus lisibles", "Un soutien au fil des démarches"], detailFields: [
      { name: "insuredPeople", label: "Nombre de personnes à couvrir", placeholder: "1", type: "number", min: 1, max: 12, required: true },
      { name: "coverageType", label: "Protection recherchée", type: "select", required: true, options: ["Individuelle", "Famille", "Activité professionnelle"] },
      { name: "occupation", label: "Votre activité", placeholder: "Votre profession", type: "text" },
      { name: "startDate", label: "Date souhaitée de prise d’effet", type: "date", required: true },
    ] },
  {
    slug: "habitation", name: "Habitation", navName: "Habitation", headline: "Votre chez-vous mérite une protection à sa mesure.", description: "Propriétaire ou locataire, indiquez-nous les caractéristiques de votre logement pour orienter votre simulation.", shortDescription: "Votre logement et vos biens mieux protégés.", icon: House, quoteStep: "Logement", coverTitle: "Protégez votre logement et ce qu’il abrite.", coverPoints: ["Des garanties pour le logement", "Une protection de vos biens", "Des démarches simples"], detailFields: [
      { name: "housingStatus", label: "Vous êtes", type: "select", required: true, options: ["Locataire", "Propriétaire occupant", "Propriétaire non occupant"] },
      { name: "housingType", label: "Type de logement", type: "select", required: true, options: ["Appartement", "Maison", "Autre"] },
      { name: "city", label: "Ville du logement", placeholder: "Ex. Casablanca", type: "text", required: true },
      { name: "surface", label: "Surface approximative (m²)", placeholder: "Ex. 80", type: "number", min: 10, max: 2000, required: true },
    ] },
  {
    slug: "voyage", name: "Voyage", navName: "Voyage", headline: "Partez l’esprit plus léger.", description: "Préparez votre prochain séjour avec une protection pensée pour vous suivre, de votre départ jusqu’au retour.", shortDescription: "Un voyage mieux préparé, où que vous alliez.", icon: Plane, quoteStep: "Voyage", coverTitle: "Une assistance qui vous accompagne loin de chez vous.", coverPoints: ["Une protection selon votre destination", "Des dates et voyageurs pris en compte", "Une assistance à portée de main"], detailFields: [
      { name: "destination", label: "Destination principale", placeholder: "Pays ou région", type: "text", required: true },
      { name: "departureDate", label: "Date de départ", type: "date", required: true },
      { name: "returnDate", label: "Date de retour", type: "date", required: true },
      { name: "travellers", label: "Nombre de voyageurs", placeholder: "1", type: "number", min: 1, max: 20, required: true },
    ] },
  {
    slug: "sante", name: "Santé/Prévoyance", navName: "Santé/Prévoyance", headline: "Prenez soin de vous et de vos proches.", description: "Décrivez votre situation et vos priorités pour explorer les solutions santé et prévoyance qui peuvent vous convenir.", shortDescription: "Des solutions pour avancer avec confiance.", icon: HeartPulse, quoteStep: "Besoins", coverTitle: "Des réponses adaptées à votre situation.", coverPoints: ["Des options selon votre foyer", "Des garanties présentées clairement", "Un accompagnement à chaque étape"], detailFields: [
      { name: "coverageType", label: "Qui souhaitez-vous couvrir ?", type: "select", required: true, options: ["Moi", "Moi et mon conjoint", "Toute ma famille"] },
      { name: "insuredPeople", label: "Nombre de personnes à couvrir", placeholder: "1", type: "number", min: 1, max: 12, required: true },
      { name: "priority", label: "Votre priorité", type: "select", required: true, options: ["Soins courants", "Hospitalisation", "Optique et dentaire", "Prévoyance"] },
      { name: "startDate", label: "Date souhaitée de prise d’effet", type: "date" },
    ] },
  {
    slug: "epargne", name: "Épargne", navName: "Epargne", headline: "Donnez une direction à vos projets.", description: "Précisez votre objectif et votre horizon pour commencer une simulation adaptée à votre projet d’épargne.", shortDescription: "Faites avancer vos projets à votre rythme.", icon: PiggyBank, quoteStep: "Projet", coverTitle: "Une épargne qui commence par vos objectifs.", coverPoints: ["Un projet défini à votre rythme", "Des paramètres simples à renseigner", "Une simulation sans engagement"], detailFields: [
      { name: "savingsGoal", label: "Votre objectif", type: "select", required: true, options: ["Préparer l’avenir", "Constituer un capital", "Préparer la retraite", "Autre projet"] },
      { name: "monthlyBudget", label: "Versement mensuel envisagé (DHS)", placeholder: "Ex. 500", type: "number", min: 50, max: 100000, required: true },
      { name: "duration", label: "Horizon du projet", type: "select", required: true, options: ["Moins de 5 ans", "5 à 10 ans", "Plus de 10 ans"] },
      { name: "startDate", label: "Date souhaitée de démarrage", type: "date" },
    ] },
  {
    slug: "loisir", name: "Loisir", navName: "Loisir", headline: "Vivez vos loisirs en toute sérénité.", description: "Chasse, bateau, musique ou sport : partagez quelques détails sur votre activité pour orienter votre demande.", shortDescription: "Une protection pensée pour vos activités.", icon: Dumbbell, startingPrice: "À partir de 120 DHS TTC/Mois", quoteStep: "Activité", coverTitle: "Une protection pour les activités qui vous passionnent.", coverPoints: ["Des activités variées", "Des garanties à explorer simplement", "Une équipe pour vous guider"], detailFields: [
      { name: "activityType", label: "Votre activité", type: "select", required: true, options: ["Chasse", "Bateau", "Musique", "Sport", "Autre loisir"] },
      { name: "equipmentValue", label: "Valeur estimée de l’équipement (DHS)", placeholder: "Ex. 5 000", type: "number", min: 0, max: 5000000 },
      { name: "insuredPeople", label: "Nombre de personnes concernées", placeholder: "1", type: "number", min: 1, max: 20, required: true },
      { name: "startDate", label: "Date souhaitée de prise d’effet", type: "date" },
    ] },
];

export const REFERRAL_OPTIONS = ["Bannière publicitaire", "Google", "Facebook", "Instagram", "LinkedIn", "Bouche à oreille", "Autre"];

export function getInsuranceProduct(slug?: string) {
  return INSURANCES.find((product) => product.slug === slug);
}
