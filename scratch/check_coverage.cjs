const fs = require('fs');

const trueStrings = JSON.parse(fs.readFileSync('C:/Users/GEOSO-DEV/.gemini/antigravity-ide/brain/308ea807-b906-4801-870b-8a8091b6a9dd/scratch/true_app_strings.json', 'utf8'));
const arDictContent = fs.readFileSync('client/src/i18n/arDictionary.ts', 'utf8');

const dict = {};
const regex = /^\s*"([^"]+)":\s*"([^"]+)",?/gm;
let m;
while ((m = regex.exec(arDictContent)) !== null) {
  dict[m[1]] = m[2];
}

const missing = [];
for (const s of trueStrings) {
  const clean = s.trim();
  if (!clean || clean.length < 2) continue;
  if (/^[\d\s€$.,+\-%:—\(\)\/]+$/.test(clean)) continue;
  if (clean.includes("&&") || clean.includes("MIN_WIDTH") || clean.includes("Aspect Ratio")) continue;
  if (!dict[clean] && !dict[s]) {
    missing.push(s);
  }
}

console.log('Total checked:', trueStrings.length);
console.log('Covered in arDictionary:', trueStrings.length - missing.length);
console.log('Remaining missing:', missing.length);
fs.writeFileSync('C:/Users/GEOSO-DEV/.gemini/antigravity-ide/brain/308ea807-b906-4801-870b-8a8091b6a9dd/scratch/remaining_missing.json', JSON.stringify(missing, null, 2));
