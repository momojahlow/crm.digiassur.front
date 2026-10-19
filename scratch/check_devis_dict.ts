import fs from 'fs';
import path from 'path';
import { ARABIC_DICTIONARY } from '../client/src/i18n/arDictionary';
import { ENGLISH_DICTIONARY } from '../client/src/i18n/enDictionary';

const devisFiles = [
  'client/src/pages/AutoDevisPage.tsx',
  'client/src/pages/MotoDevisPage.tsx',
  'client/src/pages/HabitationDevisPage.tsx',
  'client/src/pages/AccidentDevisPage.tsx',
  'client/src/pages/VoyageDevisPage.tsx',
  'client/src/pages/SanteDevisPage.tsx',
  'client/src/pages/LoisirDevisPage.tsx',
  'client/src/pages/EpargneDevisPage.tsx',
];

const foundStrings = new Set<string>();

devisFiles.forEach(file => {
  const content = fs.readFileSync(path.join(process.cwd(), file), 'utf-8');
  
  // Match text between JSX tags
  const textRegex = />([^<>{}\n]+)</g;
  let match;
  while ((match = textRegex.exec(content)) !== null) {
    const text = match[1].trim();
    if (text.length > 1 && !text.match(/^[\d\s\.\,\:\;\-\+\*\/\(\)\%€\$]+$/)) {
      foundStrings.add(text);
    }
  }

  // Match placeholders and labels
  const placeholderRegex = /placeholder="([^"]+)"/g;
  while ((match = placeholderRegex.exec(content)) !== null) {
    const text = match[1].trim();
    if (text.length > 1) foundStrings.add(text);
  }

  const labelRegex = /label="([^"]+)"/g;
  while ((match = labelRegex.exec(content)) !== null) {
    const text = match[1].trim();
    if (text.length > 1) foundStrings.add(text);
  }

  const titleRegex = /title="([^"]+)"/g;
  while ((match = titleRegex.exec(content)) !== null) {
    const text = match[1].trim();
    if (text.length > 1) foundStrings.add(text);
  }
});

const missing: string[] = [];
foundStrings.forEach(str => {
  if (!ARABIC_DICTIONARY[str] || !ENGLISH_DICTIONARY[str]) {
    missing.push(str);
  }
});

console.log(`Total strings checked from all devis pages: ${foundStrings.size}`);
console.log(`Missing translations: ${missing.length}`);
fs.writeFileSync(
  path.join(process.cwd(), 'scratch/missing_devis_strings.json'),
  JSON.stringify(missing, null, 2),
  'utf-8'
);
