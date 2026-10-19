import fs from 'fs';
import path from 'path';

function cleanDictionary(filePath: string, exportName: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const uniqueEntries = new Map<string, string>();
  let header = '';
  let inDict = false;

  for (const line of lines) {
    if (line.includes(`export const ${exportName}`)) {
      header = line;
      inDict = true;
      continue;
    }
    if (!inDict) continue;
    if (line.trim().startsWith('};')) break;

    // Match key: "..." : "..."
    const match = line.match(/^\s*("(?:\\.|[^"\\])*")\s*:\s*("(?:\\.|[^"\\])*"),?/);
    if (match) {
      const key = JSON.parse(match[1]);
      const val = JSON.parse(match[2]);
      uniqueEntries.set(key, val);
    }
  }

  const outLines: string[] = [];
  outLines.push(`export const ${exportName}: Record<string, string> = {`);
  for (const [k, v] of uniqueEntries) {
    outLines.push(`  ${JSON.stringify(k)}: ${JSON.stringify(v)},`);
  }
  outLines.push('};');
  outLines.push('');

  fs.writeFileSync(filePath, outLines.join('\n'), 'utf-8');
  console.log(`Cleaned ${filePath}: ${uniqueEntries.size} unique keys.`);
}

cleanDictionary(path.join(process.cwd(), 'client/src/i18n/arDictionary.ts'), 'ARABIC_DICTIONARY');
cleanDictionary(path.join(process.cwd(), 'client/src/i18n/enDictionary.ts'), 'ENGLISH_DICTIONARY');
