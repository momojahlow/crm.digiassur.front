const fs = require('fs');
const content = fs.readFileSync('client/src/i18n/arDictionary.ts', 'utf8');
const checkList = [
  "Pourquoi choisir Digiassur ?",
  "Bienvenue sur l’espace Moto de Digiassur",
  "Bienvenue sur l'espace Moto de Digiassur",
  "Assurer votre Moto à",
  "partir de",
  "62.5 DHS TTC/Mois",
  "Recevez votre attestation à domicile ou au bureau",
  "OBTENIR MON TARIF MOTO",
  "COMPARER MON DEVIS ACTUEL",
  "L'assurance moto de",
  "Contactez-nous pour obtenir une offre personnalisée et adaptée à vos besoins."
];

for (const c of checkList) {
  const found = content.includes(c);
  console.log((found ? "OK   : " : "MISS : ") + c);
}
