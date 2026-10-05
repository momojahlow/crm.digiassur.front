const fs = require('fs');

const arDictContent = fs.readFileSync('client/src/i18n/arDictionary.ts', 'utf8');
const dict = {};
const regex = /^\s*"([^"]+)":\s*"([^"]+)",?/gm;
let m;
while ((m = regex.exec(arDictContent)) !== null) {
  dict[m[1]] = m[2];
}

// Normalize map
const normDict = {};
for (const [k, v] of Object.entries(dict)) {
  const normK = k.replace(/’/g, "'").trim();
  normDict[normK] = v;
}

function translateText(text) {
  if (!text || typeof text !== 'string') return text;
  const leadMatch = text.match(/^\s*/);
  const trailMatch = text.match(/\s*$/);
  const lead = leadMatch ? leadMatch[0] : '';
  const trail = trailMatch ? trailMatch[0] : '';
  const trimmed = text.trim();
  if (!trimmed) return text;

  // 1. Direct match with normalized apostrophes
  const norm = trimmed.replace(/’/g, "'");
  if (normDict[norm]) {
    return lead + normDict[norm] + trail;
  }

  // 2. Direct match with punctuation stripped
  const stripNorm = norm.replace(/[:?*!.]+$/, '').trim();
  if (normDict[stripNorm]) {
    const punct = norm.slice(stripNorm.length);
    const arPunct = punct.replace(/\?/g, '؟').replace(/:/g, ' :');
    return lead + normDict[stripNorm] + arPunct + trail;
  }

  // 3. Price & currency replacements
  let res = text;
  res = res.replace(/(\d+(?:\.\d+)?)\s*DHS\s*TTC\s*\/\s*Mois/gi, '$1 درهم شامل الرسوم/شهرياً');
  res = res.replace(/(\d+(?:\.\d+)?)\s*DHS\s*TTC\s*\/\s*An/gi, '$1 درهم شامل الرسوم/سنوياً');
  res = res.replace(/(\d+(?:\.\d+)?)\s*DHS\s*TTC/gi, '$1 درهم شامل الرسوم');
  res = res.replace(/(\d+(?:\.\d+)?)\s*DHS\s*\/\s*Mois/gi, '$1 درهم/شهرياً');
  res = res.replace(/(\d+(?:\.\d+)?)\s*DH\s*\/\s*an/gi, '$1 درهم/سنوياً');
  res = res.replace(/(\d+(?:\.\d+)?)\s*DHS/gi, '$1 درهم');
  res = res.replace(/(\d+(?:\.\d+)?)\s*DH/gi, '$1 درهم');

  return res;
}

// Test against the exact elements in the user screenshot
const sampleSnippets = [
  "Assurer votre Moto à ",
  "partir de ",
  "62.5 DHS TTC/Mois",
  "Recevez votre attestation à domicile ou au bureau",
  "OBTENIR MON TARIF MOTO",
  "COMPARER MON DEVIS ACTUEL",
  "Bienvenue sur l’espace Moto de Digiassur",
  "Bienvenue sur l'espace Moto de Digiassur",
  "L'assurance moto de ",
  "Digiassur",
  " est une option intéressante pour les conducteurs qui souhaitent bénéficier d'une couverture d'assurance plus étendue que l'assurance au tiers, tout en ne payant pas autant que pour une bonne assurance.",
  "Cette formule intermédiaire permet de couvrir les dommages causés aux autres véhicules, mais également les dégâts sur votre propre moto en cas de vol, d'incendie.",
  "Elle peut également inclure des garanties supplémentaires telles que l'assistance en cas de panne ou d'accident, ou encore la protection juridique. Cette solution d'assurance intermédiaire est donc adaptée aux conducteurs souhaitant une protection plus complète tout en maîtrisant leur budget.",
  "Contactez-nous pour obtenir une offre personnalisée et adaptée à vos besoins."
];

console.log("=== TRANSLATION ENGINE RESULTS ===");
for (const s of sampleSnippets) {
  const trans = translateText(s);
  console.log(`ORIG: "${s.trim()}"`);
  console.log(`ARAB: "${trans.trim()}"\n`);
}
