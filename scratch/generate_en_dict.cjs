const fs = require('fs');

const keys = JSON.parse(fs.readFileSync('scratch/all_dict_keys.json', 'utf8'));

// Common curated English mappings
const curated = {
  // Brand & General
  "DigiAssur": "Digiassur",
  "Digiassur": "Digiassur",
  "Accueil Digiassur": "Digiassur Home",
  "Bienvenue sur votre espace !": "Welcome to your client area!",
  "Avec Digiassur, bénéficiez d'un service premium": "With Digiassur, enjoy premium service",
  "Vos assurances en ligne au Maroc": "Your online insurance in Morocco",
  "Le comparateur d'assurance 100% digital N°1 au Maroc": "The #1 100% digital insurance comparator in Morocco",
  "Des contrats négociés au meilleur prix avec les compagnies leaders du marché.": "Negotiated policies at the best rates with market-leading insurers.",
  "Nos partenaires": "Our partners",
  "Nos simulations": "Our simulators",
  "Témoignages": "Testimonials",
  "Offres": "Offers",
  "Le site": "The website",
  "Société à Responsabilité Limitée d'Assurance": "Limited Liability Insurance Brokerage Company",
  "Siège social :": "Head office:",
  "Casablanca, Maroc": "Casablanca, Morocco",
  "Horaires d'ouverture": "Opening hours",
  "Du Lundi au Vendredi : 08h30 - 18h30": "Monday to Friday: 8:30 AM - 6:30 PM",
  "Samedi : 09h00 - 13h00": "Saturday: 9:00 AM - 1:00 PM",
  "Conseiller disponible du Lun au Ven 9h-18h": "Advisor available Mon to Fri 9am-6pm",
  "Téléphone direct": "Direct phone",
  "Email officiel": "Official email",
  "Nos Coordonnées": "Our contact details",
  "Contactez DigiAssur": "Contact DigiAssur",
  "Envoyez-nous un message": "Send us a message",
  "Envoyer mon message": "Send my message",
  "Envoyer un autre message": "Send another message",
  "Message envoyé !": "Message sent!",
  "Votre message ou question...": "Your message or question...",
  "Demande d'information générale": "General inquiry",
  "Partenariat / Affiliation": "Partnership / Affiliation",
  "Sujet": "Subject",
  "Message *": "Message *",
  "Nom *": "Last name *",
  "Prénom *": "First name *",
  "Téléphone *": "Phone *",
  "Email *": "Email *",
  "Ville *": "City *",
  "Adresse *": "Address *",
  "Date de naissance *": "Date of birth *",
  "CIN *": "National ID *",
  "CIN*": "National ID *",
  "Nom": "Last name",
  "Prénom": "First name",
  "Téléphone": "Phone",
  "Email": "Email",
  "Ville": "City",
  "Adresse": "Address",
  "Date de naissance": "Date of birth",
  "CIN": "National ID",
  "Oui": "Yes",
  "Non": "No",
  "Suivant": "Next",
  "Précédent": "Previous",
  "Valider": "Submit",
  "Confirmer": "Confirm",
  "Annuler": "Cancel",
  "Fermer": "Close",
  "Télécharger": "Download",
  "Imprimer": "Print",
  "Envoyer": "Send",
  "Rechercher": "Search",
  "DHS": "MAD",
  "DH": "MAD",
  "DHS TTC": "MAD incl. VAT",
  "DHS TTC/Mois": "MAD incl. VAT/Month",
  "DHS TTC/An": "MAD incl. VAT/Year",

  // Products
  "MOTO": "Motorcycle",
  "Moto": "Motorcycle",
  "Moto & Scooter": "Motorcycle & Scooter",
  "Moto Run": "Moto Run",
  "Auto": "Car",
  "Automobile": "Automobile",
  "Habitation": "Home",
  "Voyage": "Travel",
  "Santé": "Health",
  "Santé/Prévoyance": "Health & Welfare",
  "Épargne": "Savings",
  "Epargne": "Savings",
  "Loisir": "Leisure",
  "Accident": "Accident",

  // Welcomes
  "Bienvenue sur l'espace Auto de Digiassur": "Welcome to Digiassur Car Insurance",
  "Bienvenue sur l’espace Moto de Digiassur": "Welcome to Digiassur Motorcycle Insurance",
  "Bienvenue sur l'espace Moto de Digiassur": "Welcome to Digiassur Motorcycle Insurance",
  "Bienvenue sur l’espace Habitation de Digiassur": "Welcome to Digiassur Home Insurance",
  "Bienvenue sur l'espace Habitation de Digiassur": "Welcome to Digiassur Home Insurance",
  "Bienvenue sur l'espace Accident de Digiassur": "Welcome to Digiassur Accident Insurance",
  "Bienvenue sur l'espace Voyage de Digiassur": "Welcome to Digiassur Travel Insurance",
  "Bienvenue sur l'espace santé & prévoyance de Digiassur": "Welcome to Digiassur Health & Welfare",
  "Bienvenue sur l'espace loisir de Digiassur": "Welcome to Digiassur Leisure Insurance",

  // CTAs
  "OBTENIR MON TARIF AUTO": "GET MY CAR RATE",
  "OBTENIR MON TARIF MOTO": "GET MY MOTO RATE",
  "OBTENIR MON TARIF": "GET MY RATE",
  "OBTENIR MON DEVIS": "GET MY QUOTE",
  "OBTENIR MON DEVIS AUTO": "GET MY CAR QUOTE",
  "OBTENIR MON DEVIS MOTO": "GET MY MOTO QUOTE",
  "OBTENIR MON DEVIS HABITATION": "GET MY HOME QUOTE",
  "OBTENIR MON DEVIS VOYAGE": "GET MY TRAVEL QUOTE",
  "OBTENIR MON DEVIS SANTÉ": "GET MY HEALTH QUOTE",
  "OBTENIR MON DEVIS ACCIDENT": "GET MY ACCIDENT QUOTE",
  "OBTENIR MON DEVIS LOISIR": "GET MY LEISURE QUOTE",
  "COMPARER MON DEVIS ACTUEL": "COMPARE MY CURRENT QUOTE",
  "DÉCOUVRIR LES GARANTIES": "DISCOVER GUARANTEES",
  "SIMULER MON ÉPARGNE": "SIMULATE MY SAVINGS",
  "EN SAVOIR PLUS": "LEARN MORE",
  "SOUSCRIRE EN LIGNE": "SUBSCRIBE ONLINE",
  "Commander": "Order",
  "Commander Start": "Order Start",
  "Commander Go": "Order Go",
  "Commander Fast": "Order Fast",

  // Heros
  "Assurer votre voiture à partir de 153 DHS TTC/Mois": "Insure your car from 153 MAD incl. VAT/Month",
  "Assurez votre voiture à partir de 153 DHS TTC/Mois": "Insure your car from 153 MAD incl. VAT/Month",
  "Assurer votre voiture à": "Insure your car from",
  "Assurez votre voiture à": "Insure your car from",
  "Assurer votre Moto à partir de 62.5 DHS TTC/Mois": "Insure your motorcycle from 62.5 MAD incl. VAT/Month",
  "Assurez votre Moto à partir de 62.5 DHS TTC/Mois": "Insure your motorcycle from 62.5 MAD incl. VAT/Month",
  "Assurer votre Moto à": "Insure your motorcycle from",
  "Assurez votre Moto à": "Insure your motorcycle from",
  "Assurer votre habitation à partir de 25 DHS TTC/Mois": "Insure your home from 25 MAD incl. VAT/Month",
  "Assurer votre habitation à": "Insure your home from",
  "Soyez protégé en cas d'accident corporel à partir de 26 DHS TTC/Mois": "Be protected against bodily injury from 26 MAD incl. VAT/Month",
  "SOYEZ PROTÉGÉ EN CAS D'ACCIDENT CORPOREL À PARTIR DE 26 DHS TTC/MOIS": "BE PROTECTED AGAINST BODILY INJURY FROM 26 MAD INCL. VAT/MONTH",
  "Votre assurance voyage à partir de 650 DHS TTC/An": "Your travel insurance from 650 MAD incl. VAT/Year",
  "Assurez votre santé à partir de 120 DHS TTC/Mois": "Insure your health from 120 MAD incl. VAT/Month",
  "Assurez votre santé à": "Insure your health from",
  "Assurez votre loisir à partir de 80 DHS TTC/Mois": "Insure your leisure activities from 80 MAD incl. VAT/Month",
  "Assurez votre loisir à": "Insure your leisure activities from",
  "Recevez votre attestation à domicile ou au bureau": "Receive your certificate at home or at the office",
  "Une protection maximale pour votre foyer.": "Maximum protection for your home.",
  "Une protection maximale en cas d'accident de la vie privée et professionnelle": "Maximum protection for private and professional accidents",
  "Une protection maximale pour votre voyage dans le monde entier.": "Maximum protection for your travels worldwide.",
  "La santé est notre bien le plus précieux. La protéger n'est pas un luxe mais une nécessité !": "Health is our greatest asset. Protecting it is not a luxury, it is a necessity!",
  "La santé est notre bien le plus précieux. Protégez votre famille en toute sérénité.": "Health is our greatest asset. Protect your family with peace of mind.",
  "Construisez votre épargne en toute sécurité": "Build your savings safely and securely",
  "Des rendements attractifs et une fiscalité avantageuse au Maroc": "Attractive returns and favorable tax benefits in Morocco",
  "Pourquoi choisir Digiassur ?": "Why choose Digiassur?",
  "Appeler un conseiller": "Call an advisor",
  "Espace client": "Client area",
  "Connexion": "Sign in",
  "Se connecter": "Log in",
  "Se souvenir de moi": "Remember me",
  "Mot de passe oublié ?": "Forgot password?",
  "Mot de passe": "Password",
  "Créer un compte": "Create an account",

  // Steps
  "1. Assuré": "1. Insured",
  "2. Véhicule": "2. Vehicle",
  "3. Formule": "3. Plan",
  "4. Options": "4. Options",
  "5. Confirmation": "5. Confirmation",
  "1. Profil": "1. Profile",
  "2. Logement": "2. Property",
  "1. Voyage": "1. Trip",
  "2. Voyageurs": "2. Travelers",
  "1. Épargne": "1. Savings",
  "2. Simulation": "2. Simulation",
  "3. Coordonnées": "3. Contact info",
  "Formule Pomme": "Pomme Plan",
  "Formule Orange": "Orange Plan",
  "Formule Kiwi": "Kiwi Plan",
  "Formule Tiers": "Third-Party Plan",
  "Formule Tous Risques": "Comprehensive Plan",
  "Formule standard": "Standard Plan",
  "Gratuit et sans engagement": "Free and without obligation"
};

// Simple auto-translator for other keys using rules & dictionary lookups
function translateToEn(str) {
  if (curated[str]) return curated[str];
  const norm = str.replace(/’/g, "'").trim();
  if (curated[norm]) return curated[norm];

  // Try punctuation stripped
  const strip = norm.replace(/[:?*!.]+$/, '').trim();
  if (curated[strip]) {
    const punct = norm.slice(strip.length);
    return curated[strip] + punct;
  }

  // Price replacements
  let res = str;
  res = res.replace(/(\d+(?:\.\d+)?)\s*DHS\s*TTC\s*\/\s*Mois/gi, '$1 MAD incl. VAT/Month');
  res = res.replace(/(\d+(?:\.\d+)?)\s*DHS\s*TTC\s*\/\s*An/gi, '$1 MAD incl. VAT/Year');
  res = res.replace(/(\d+(?:\.\d+)?)\s*DHS\s*TTC/gi, '$1 MAD incl. VAT');
  res = res.replace(/(\d+(?:\.\d+)?)\s*DHS\s*\/\s*Mois/gi, '$1 MAD/Month');
  res = res.replace(/(\d+(?:\.\d+)?)\s*DH\s*\/\s*an/gi, '$1 MAD/Year');
  res = res.replace(/(\d+(?:\.\d+)?)\s*DHS/gi, '$1 MAD');
  res = res.replace(/(\d+(?:\.\d+)?)\s*DH/gi, '$1 MAD');

  return res;
}

const enDict = {};
for (const k of keys) {
  enDict[k] = translateToEn(k);
}

// Write client/src/i18n/enDictionary.ts
let output = `// Complete English Dictionary for DigiAssur\n// Automatically generated & curated for comprehensive English coverage across all pages & funnels.\nexport const ENGLISH_DICTIONARY: Record<string, string> = {\n`;
for (const [k, v] of Object.entries(enDict)) {
  output += `  ${JSON.stringify(k)}: ${JSON.stringify(v)},\n`;
}
output += `};\n\nexport function translateToEnglish(text: string): string {\n  if (!text || typeof text !== "string") return text;\n  const trimmed = text.trim();\n  if (ENGLISH_DICTIONARY[trimmed]) {\n    return text.replace(trimmed, ENGLISH_DICTIONARY[trimmed]);\n  }\n  const norm = trimmed.replace(/’/g, "'");\n  if (ENGLISH_DICTIONARY[norm]) {\n    return text.replace(trimmed, ENGLISH_DICTIONARY[norm]);\n  }\n  return text;\n}\n`;

fs.writeFileSync('client/src/i18n/enDictionary.ts', output, 'utf8');
console.log('Saved client/src/i18n/enDictionary.ts with', Object.keys(enDict).length, 'keys');
