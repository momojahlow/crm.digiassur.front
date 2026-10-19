const fs = require('fs');

const arContent = fs.readFileSync('client/src/i18n/arDictionary.ts', 'utf8');
const regex = /^\s*"([^"]+)":\s*"([^"]+)",?/gm;
let m;
const keys = [];
while ((m = regex.exec(arContent)) !== null) {
  keys.push(m[1]);
}
console.log('Total keys to process:', keys.length);
fs.writeFileSync('scratch/all_dict_keys.json', JSON.stringify(keys, null, 2));
