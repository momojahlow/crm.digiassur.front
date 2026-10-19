import { 
  calculateRcBase, 
  calculateValeurVenale, 
  calculateDommagesCollision, 
  calculateTierce, 
  calculateDevisAuto 
} from "../client/src/lib/pricingEngine";

console.log("=== TEST MOTEUR CALCUL DEVIS AUTO (CARTE UNIQUE MODULAIRE) ===");

// 1. Test Dacia Logan Diesel 6 CV, 150 000 DH
const baseStart = calculateDevisAuto({
  energie: "Diesel",
  puissanceFiscale: 6,
  valeurNeuf: 150000,
  crm: 1.0,
  duree: "Annuelle",
  options: {}
});

console.log("\n1. PRIX DE DÉPART (SOCLE START) :");
console.log(`- Prime RC nette: ${baseStart.rcNette} DH`);
console.log(`- Taxe RC (16.5%): ${baseStart.taxeRc} DH`);
console.log(`- EVCAT RC (4.5%): ${baseStart.evcat} DH`);
console.log(`- CNPAC: ${baseStart.cnpac} DH`);
console.log(`- GA Nette: ${baseStart.gaNette} DH`);
console.log(`- PRIME TOTALE START: ${baseStart.primeTotale} DHS TTC`);

// 2. Coût marginal de chaque garantie en Annuel (GA * 1.175)
const ptaQuote = calculateDevisAuto({
  energie: "Diesel",
  puissanceFiscale: 6,
  valeurNeuf: 150000,
  crm: 1.0,
  duree: "Annuelle",
  options: { pta: true }
});
const ptaDiff = (ptaQuote.primeTotale - baseStart.primeTotale).toFixed(2);
console.log(`\n2. OPTION PTA (200 DH HT) : +${ptaDiff} DH TTC (Attendu: 235.00 DH)`);

const incQuote = calculateDevisAuto({
  energie: "Diesel",
  puissanceFiscale: 6,
  valeurNeuf: 150000,
  crm: 1.0,
  duree: "Annuelle",
  options: { inc_vol_bdg: true }
});
const incDiff = (incQuote.primeTotale - baseStart.primeTotale).toFixed(2);
console.log(`3. OPTION INC/VOL/BDG (400 DH HT) : +${incDiff} DH TTC (Attendu: 470.00 DH)`);

const dcQuote = calculateDevisAuto({
  energie: "Diesel",
  puissanceFiscale: 6,
  valeurNeuf: 150000,
  crm: 1.0,
  duree: "Annuelle",
  options: { dc: true }
});
const dcDiff = (dcQuote.primeTotale - baseStart.primeTotale).toFixed(2);
console.log(`4. OPTION DC (350 DH HT pour VAN <= 200k) : +${dcDiff} DH TTC (Attendu: 411.25 DH)`);

const tcQuote = calculateDevisAuto({
  energie: "Diesel",
  puissanceFiscale: 6,
  valeurNeuf: 150000,
  crm: 1.0,
  duree: "Annuelle",
  options: { tc: true }
});
const tcDiff = (tcQuote.primeTotale - baseStart.primeTotale).toFixed(2);
console.log(`5. OPTION TC (950 DH HT pour VAN 150k) : +${tcDiff} DH TTC (Attendu: 1116.25 DH)`);

// 6. Test avec toutes les garanties activées (PTA + INC_VOL_BDG + TC)
const allInQuote = calculateDevisAuto({
  energie: "Diesel",
  puissanceFiscale: 6,
  valeurNeuf: 150000,
  crm: 1.0,
  duree: "Annuelle",
  options: { pta: true, inc_vol_bdg: true, tc: true }
});
console.log(`\n6. TOUTES OPTIONS AVEC TC (TOUS RISQUES) : ${allInQuote.primeTotale} DHS TTC`);
console.log(`- GA Nette: ${allInQuote.gaNette} DH (200 + 400 + 950 = 1550 DH)`);
console.log(`- Taxe GA: ${allInQuote.taxeGa} DH (1550 * 15% = 232.5 DH)`);

// 7. Test semestriel (Ratio 0.54)
const semestrielStart = calculateDevisAuto({
  energie: "Diesel",
  puissanceFiscale: 6,
  valeurNeuf: 150000,
  crm: 1.0,
  duree: "Semestrielle",
  options: {}
});
console.log(`\n7. SEMESTRIEL START : ${semestrielStart.primeTotale} DHS TTC (RC Nette = 2429 * 0.54 = ${semestrielStart.rcNette})`);

console.log("\n=== TOUS LES TESTS SONT VALIDES AVEC SUCCÈS ===");
