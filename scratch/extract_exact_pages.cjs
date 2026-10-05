const fs = require('fs');
const path = require('path');

const targetFiles = [
  'client/src/pages/Home.tsx',
  'client/src/pages/EpargnePage.tsx',
  'client/src/pages/EpargneDevisPage.tsx',
  'client/src/pages/AutoPage.tsx',
  'client/src/pages/AutoDevisPage.tsx',
  'client/src/pages/MotoPage.tsx',
  'client/src/pages/MotoDevisPage.tsx',
  'client/src/pages/AccidentPage.tsx',
  'client/src/pages/AccidentDevisPage.tsx',
  'client/src/pages/HabitationPage.tsx',
  'client/src/pages/HabitationDevisPage.tsx',
  'client/src/pages/VoyagePage.tsx',
  'client/src/pages/VoyageDevisPage.tsx',
  'client/src/pages/SantePage.tsx',
  'client/src/pages/SanteDevisPage.tsx',
  'client/src/pages/LoisirPage.tsx',
  'client/src/pages/LoisirDevisPage.tsx',
  'client/src/pages/ProductPage.tsx',
  'client/src/pages/ConnexionPage.tsx',
  'client/src/pages/ContactPage.tsx',
  'client/src/pages/MentionsLegalesPage.tsx',
  'client/src/components/DigiassurHeader.tsx',
  'client/src/components/DigiassurFooter.tsx',
  'client/src/components/StickyCTA.tsx'
];

const textRegex = />\s*([^<>{}\n]+?)\s*</g;
const attrRegex = /(?:placeholder|title|aria-label)=["\x27]([^"\x27]+)["\x27]/g;
const propRegex = /(?:label|title|description|subtitle|badge|text|helpText|heading|subheading):\s*["\x27]([^"\x27]+)["\x27]/g;

const exactStrings = new Set();

for (const file of targetFiles) {
  if (!fs.existsSync(file)) {
    console.warn("File missing:", file);
    continue;
  }
  const content = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = textRegex.exec(content)) !== null) {
    const s = m[1].trim();
    if (s && s.length > 1 && !/^[0-9\s:;,./()%\-+€$]+$/.test(s) && !s.includes('const ') && !s.includes('import ') && !s.startsWith('w-') && !s.startsWith('bg-')) {
      exactStrings.add(s);
    }
  }
  while ((m = attrRegex.exec(content)) !== null) {
    const s = m[1].trim();
    if (s && s.length > 1) exactStrings.add(s);
  }
  while ((m = propRegex.exec(content)) !== null) {
    const s = m[1].trim();
    if (s && s.length > 1) exactStrings.add(s);
  }
}

const arr = Array.from(exactStrings).sort();
console.log('Real customer-facing strings in DigiAssur:', arr.length);
fs.writeFileSync('C:/Users/GEOSO-DEV/.gemini/antigravity-ide/brain/308ea807-b906-4801-870b-8a8091b6a9dd/scratch/exact_app_strings.json', JSON.stringify(arr, null, 2));

// Compare with arDictionary
const dictContent = fs.readFileSync('client/src/i18n/arDictionary.ts', 'utf8');
const dict = {};
const dRegex = /^\s*"([^"]+)":\s*"([^"]+)",?/gm;
while ((m = dRegex.exec(dictContent)) !== null) {
  dict[m[1]] = m[2];
}

const missing = arr.filter(s => !dict[s] && !dict[s.trim()]);
console.log('Already in arDictionary:', arr.length - missing.length);
console.log('Still missing:', missing.length);
fs.writeFileSync('C:/Users/GEOSO-DEV/.gemini/antigravity-ide/brain/308ea807-b906-4801-870b-8a8091b6a9dd/scratch/exact_missing.json', JSON.stringify(missing, null, 2));
