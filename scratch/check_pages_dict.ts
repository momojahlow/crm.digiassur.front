import fs from 'fs';
import path from 'path';
import { ARABIC_DICTIONARY } from '../client/src/i18n/arDictionary';
import { ENGLISH_DICTIONARY } from '../client/src/i18n/enDictionary';

const files = [
  'client/src/pages/AutoPage.tsx',
  'client/src/pages/MotoPage.tsx',
  'client/src/pages/HabitationPage.tsx',
  'client/src/pages/AccidentPage.tsx',
  'client/src/pages/VoyagePage.tsx',
  'client/src/pages/SantePage.tsx',
  'client/src/pages/LoisirPage.tsx',
  'client/src/pages/EpargnePage.tsx',
  'client/src/components/EpargneHero.tsx',
  'client/src/components/EpargneWelcome.tsx',
  'client/src/pages/ContactPage.tsx',
  'client/src/pages/ConnexionPage.tsx',
  'client/src/pages/MentionsLegalesPage.tsx',
];

const textRegex = />([^<>{}\n]+)</g;
const foundStrings = new Set<string>();

files.forEach(file => {
  const content = fs.readFileSync(path.join(process.cwd(), file), 'utf-8');
  let match;
  while ((match = textRegex.exec(content)) !== null) {
    const text = match[1].trim();
    if (text.length > 2 && !text.match(/^[\d\s\.\,\:\;\-\+\*\/\(\)]+$/)) {
      foundStrings.add(text);
    }
  }
});

const missingAr: string[] = [];
const missingEn: string[] = [];

foundStrings.forEach(str => {
  if (!ARABIC_DICTIONARY[str]) {
    missingAr.push(str);
  }
  if (!ENGLISH_DICTIONARY[str]) {
    missingEn.push(str);
  }
});

console.log(`Total text strings found: ${foundStrings.size}`);
console.log(`Missing in Arabic: ${missingAr.length}`);
console.log(`Missing in English: ${missingEn.length}`);

fs.writeFileSync(
  path.join(process.cwd(), 'scratch/missing_strings.json'),
  JSON.stringify({ missingAr, missingEn }, null, 2),
  'utf-8'
);
console.log('Saved to scratch/missing_strings.json');
