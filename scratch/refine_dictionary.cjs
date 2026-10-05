const fs = require('fs');

const arDictPath = 'client/src/i18n/arDictionary.ts';
const content = fs.readFileSync(arDictPath, 'utf8');

const dict = {};
const regex = /^\s*"([^"]+)":\s*"([^"]+)",?/gm;
let m;
while ((m = regex.exec(content)) !== null) {
  dict[m[1]] = m[2];
}

const refinements = {
  "Assurer votre Moto à": "أمّن دراجتك النارية",
  "Assurer votre voiture à": "أمّن سيارتك",
  "Assurer votre habitation à": "أمّن سكنك",
  "Assurez votre Moto à": "أمّن دراجتك النارية",
  "Assurez votre voiture à": "أمّن سيارتك",
  "Assurez votre loisir à": "أمّن أنشطتك الترفيهية",
  "Assurez votre santé à": "أمّن صحتك",
  "Assurez votre Moto à partir de": "أمّن دراجتك النارية ابتداءً من",
  "Assurez votre voiture à partir de": "أمّن سيارتك ابتداءً من",
  "Assurer votre habitation à partir de": "أمّن سكنك ابتداءً من",
  "partir de": "ابتداءً من",
  "à partir de": "ابتداءً من",
  "corporel à partir de": "الجسدية ابتداءً من",
  "62.5 DHS TTC/Mois": "62.5 درهم شامل الرسوم/شهرياً",
  "153 DHS TTC/Mois": "153 درهم شامل الرسوم/شهرياً",
  "25 DHS TTC/Mois": "25 درهم شامل الرسوم/شهرياً",
  "26 DHS TTC/Mois": "26 درهم شامل الرسوم/شهرياً",
  "26 DHS TTC/MOIS": "26 درهم شامل الرسوم/شهرياً",
  "120 DHS TTC/Mois": "120 درهم شامل الرسوم/شهرياً",
  "650 DHS TTC/An": "650 درهم شامل الرسوم/سنوياً",
  "650 DHS TTC": "650 درهم شامل الرسوم",
  "89 DHS/Mois": "89 درهم/شهرياً",
  "150 DHS": "150 درهم",
  "200 DHS": "200 درهم",
  "300 DHS": "300 درهم",
  "450 DHS": "450 درهم",
  "500 DHS": "500 درهم",
  "10 000 DHS": "10,000 درهم",
  "30 000 DHS": "30,000 درهم",
  "50 000 DHS": "50,000 درهم",
  "70 000 DHS": "70,000 درهم",
  "100 000 DHS": "100,000 درهم",
  "150 000 DHS": "150,000 درهم",
  "250 000 DH / an": "250,000 درهم / سنوياً",
  "50 000 DH / an": "50,000 درهم / سنوياً",
  "100 000 DH / an": "100,000 درهم / سنوياً",
  "500 000 DH / an (Illimité)": "500,000 درهم / سنوياً (غير محدود)",
  "Bienvenue sur l'espace Moto de Digiassur": "مرحباً بكم في فضاء تأمين الدراجات النارية ديجي أسير",
  "Bienvenue sur l’espace Moto de Digiassur": "مرحباً بكم في فضاء تأمين الدراجات النارية ديجي أسير",
  "Bienvenue sur l'espace Auto de Digiassur": "مرحباً بكم في فضاء تأمين السيارات ديجي أسير",
  "Bienvenue sur l'espace Habitation de Digiassur": "مرحباً بكم في فضاء تأمين السكن ديجي أسير",
  "Bienvenue sur l’espace Habitation de Digiassur": "مرحباً بكم في فضاء تأمين السكن ديجي أسير",
  "Bienvenue sur l'espace Voyage de Digiassur": "مرحباً بكم في فضاء تأمين السفر ديجي أسير",
  "Bienvenue sur l'espace santé & prévoyance de Digiassur": "مرحباً بكم في فضاء الصحة والاحتياط ديجي أسير",
  "Bienvenue sur l'espace loisir de Digiassur": "مرحباً بكم في فضاء تأمين الأنشطة والترفيه ديجي أسير",
  "Bienvenue sur l'espace Accident de Digiassur": "مرحباً بكم في فضاء تأمين الحوادث ديجي أسير",
  "Pourquoi choisir Digiassur ?": "لماذا تختارون ديجي أسير؟",
  "Le site DigiAssur appartient à": "موقع ديجي أسير تابع لشركة",
  ", courtier d’assurance et de réassurance,": "، وسيط في التأمين وإعادة التأمين،",
  ", courtier d'assurance et de réassurance,": "، وسيط في التأمين وإعادة التأمين،"
};

for (const [k, v] of Object.entries(refinements)) {
  dict[k] = v;
}

const keys = Object.keys(dict).sort((a, b) => b.length - a.length);

let out = `// Complete Arabic Dictionary for DigiAssur
// Auto-generated & curated for 100% Arabic language coverage across all pages & funnels.
export const ARABIC_DICTIONARY: Record<string, string> = {\n`;

for (const k of keys) {
  const escapedKey = k.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const escapedVal = dict[k].replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  out += `  "${escapedKey}": "${escapedVal}",\n`;
}

out += `};\n\n`;

out += `export function translateToArabic(text: string): string {
  if (!text || typeof text !== "string") return text;
  const trimmed = text.trim();
  if (ARABIC_DICTIONARY[trimmed]) {
    return text.replace(trimmed, ARABIC_DICTIONARY[trimmed]);
  }
  return text;
}\n`;

fs.writeFileSync(arDictPath, out, 'utf8');
console.log('Dictionary successfully refined. Total entries:', keys.length);
