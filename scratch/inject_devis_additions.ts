import fs from 'fs';
import path from 'path';

const arPath = path.join(process.cwd(), 'client/src/i18n/arDictionary.ts');
const enPath = path.join(process.cwd(), 'client/src/i18n/enDictionary.ts');

const arAdditions: Record<string, string> = {
  "Votre devis en 3 étapes": "عرض السعر الخاص بكم في 3 خطوات",
  "Informations du véhicule": "معلومات المركبة",
  "Garanties souhaitées": "الضمانات المطلوبة",
  "Coordonnées": "معلومات الاتصال",
  "Vos garanties personnalisées": "ضماناتكم المخصصة",
  "Tierce Complète": "تأمين شامل كامل",
  "Paiement en ligne sécurisé": "دفع آمن عبر الإنترنت",
  "Votre devis a été envoyé par email": "تم إرسال عرض السعر إلى بريدكم الإلكتروني",
  "Accompagnement juridique & administratif": "المرافقة القانونية والإدارية",
  "Prise en charge des formalités, convoyage du véhicule en cas de réparation et assistance personnalisée.": "التكفل بالإجراءات، نقل المركبة في حالة الإصلاح ومساعدة شخصية مخصصة.",
  "Décès accidentel": "الوفاة الناتجة عن حادث",
  "Tél :": "الهاتف:",
  "Description :": "الوصف:",
  "50 000 DH / an": "50,000 درهم / سنوياً",
  "100 000 DH / an": "100,000 درهم / سنوياً",
  "250 000 DH / an": "250,000 درهم / سنوياً",
  "500 000 DH / an (Illimité)": "500,000 درهم / سنوياً (غير محدود)",
  "5 000 DHS": "5,000 درهم",
  "10 000 DHS": "10,000 درهم",
  "85 DHS": "85 درهم",
  "135 DHS": "135 درهم",
  "150 DHS": "150 درهم",
  "50 000 DHS": "50,000 درهم",
  "30 000 DHS": "30,000 درهم",
  "500 DHS": "500 درهم",
  "312.50 DHS": "312.50 درهم",
  "70 000 DHS": "70,000 درهم",
  "300 DHS": "300 درهم",
  "427.50 DHS": "427.50 درهم",
  "150 000 DHS": "150,000 درهم",
  "100 000 DHS": "100,000 درهم",
  "450 DHS": "450 درهم",
  "738.50 DHS": "738.50 درهم",
  "650.00 DHS": "650.00 درهم",
  "200 DHS": "200 درهم",
  "2 500 DHS": "2,500 درهم",
};

const enAdditions: Record<string, string> = {
  "Votre devis en 3 étapes": "Your quote in 3 steps",
  "Informations du véhicule": "Vehicle Information",
  "Garanties souhaitées": "Selected Coverages",
  "Coordonnées": "Contact Details",
  "Vos garanties personnalisées": "Your Tailored Coverages",
  "Tierce Complète": "Comprehensive Coverage",
  "Paiement en ligne sécurisé": "Secure Online Payment",
  "Votre devis a été envoyé par email": "Your quote has been sent by email",
  "Accompagnement juridique & administratif": "Legal & Administrative Support",
  "Prise en charge des formalités, convoyage du véhicule en cas de réparation et assistance personnalisée.": "Handling formalities, vehicle towing for repairs, and personalized support.",
  "Décès accidentel": "Accidental Death",
  "Tél :": "Tel:",
  "Description :": "Description:",
  "50 000 DH / an": "50,000 MAD / year",
  "100 000 DH / an": "100,000 MAD / year",
  "250 000 DH / an": "250,000 MAD / year",
  "500 000 DH / an (Illimité)": "500,000 MAD / year (Unlimited)",
  "5 000 DHS": "5,000 MAD",
  "10 000 DHS": "10,000 MAD",
  "85 DHS": "85 MAD",
  "135 DHS": "135 MAD",
  "150 DHS": "150 MAD",
  "50 000 DHS": "50,000 MAD",
  "30 000 DHS": "30,000 MAD",
  "500 DHS": "500 MAD",
  "312.50 DHS": "312.50 MAD",
  "70 000 DHS": "70,000 MAD",
  "300 DHS": "300 MAD",
  "427.50 DHS": "427.50 MAD",
  "150 000 DHS": "150,000 MAD",
  "100 000 DHS": "100,000 MAD",
  "450 DHS": "450 MAD",
  "738.50 DHS": "738.50 MAD",
  "650.00 DHS": "650.00 MAD",
  "200 DHS": "200 MAD",
  "2 500 DHS": "2,500 MAD",
};

function addEntries(filePath: string, exportName: string, additions: Record<string, string>) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const entries = new Map<string, string>();
  let inDict = false;

  for (const line of lines) {
    if (line.includes(`export const ${exportName}`)) {
      inDict = true;
      continue;
    }
    if (!inDict) continue;
    if (line.trim().startsWith('};')) break;

    const match = line.match(/^\s*("(?:\\.|[^"\\])*")\s*:\s*("(?:\\.|[^"\\])*"),?/);
    if (match) {
      const key = JSON.parse(match[1]);
      const val = JSON.parse(match[2]);
      entries.set(key, val);
    }
  }

  // Merge additions
  for (const [k, v] of Object.entries(additions)) {
    entries.set(k, v);
  }

  const outLines: string[] = [];
  outLines.push(`export const ${exportName}: Record<string, string> = {`);
  for (const [k, v] of entries) {
    outLines.push(`  ${JSON.stringify(k)}: ${JSON.stringify(v)},`);
  }
  outLines.push('};');
  outLines.push('');

  fs.writeFileSync(filePath, outLines.join('\n'), 'utf-8');
  console.log(`Updated ${filePath}: now has ${entries.size} unique entries.`);
}

addEntries(arPath, 'ARABIC_DICTIONARY', arAdditions);
addEntries(enPath, 'ENGLISH_DICTIONARY', enAdditions);
