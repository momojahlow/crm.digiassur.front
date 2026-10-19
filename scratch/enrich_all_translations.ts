import fs from 'fs';
import path from 'path';

// 1. Update arDictionary.ts
const arDictPath = path.join(process.cwd(), 'client/src/i18n/arDictionary.ts');
let arDictContent = fs.readFileSync(arDictPath, 'utf-8');

const arAdditions = `
  "153 DHS TTC/Mois": "153 درهم شامل الضريبة/شهرياً",
  "62.5 DHS TTC/Mois": "62.5 درهم شامل الضريبة/شهرياً",
  "25 DHS TTC/Mois": "25 درهم شامل الضريبة/شهرياً",
  "26 DHS TTC/Mois": "26 درهم شامل الضريبة/شهرياً",
  "26 DHS TTC/MOIS": "26 درهم شامل الضريبة/شهرياً",
  "650 DHS TTC/An": "650 درهم شامل الضريبة/سنوياً",
  "650 DHS TTC": "650 درهم شامل الضريبة",
  "120 DHS TTC/Mois": "120 درهم شامل الضريبة/شهرياً",
  "Votre avenir garanti": "مستقبلكم مضمون",
  "Solutions Épargne & Avenir": "حلول الادخار والمستقبل",
  "Capital Garanti": "رأس مال مضمون",
  "Sécurité maximale pour vos économies": "أقصى درجات الأمان لمدخراتكم",
  "Rendement attractif": "عائد مجزٍ ومربح",
  "Taux avantageux & défiscalisation": "نسبة تفضيلية وإعفاء ضريبي",
  "Partenaire agréé :": "شريك معتمد:",
  "digiassur.ma": "digiassur.ma",
  "Assur'wi": "Assur'wi",
  "contact@digiassur.ma": "contact@digiassur.ma",
  "Bienvenue sur l'espace Auto de Digiassur": "مرحباً بكم في فضاء السيارات ديجي آسور",
  "Bienvenue sur l'espace Moto de Digiassur": "مرحباً بكم في فضاء الدراجات النارية ديجي آسور",
  "Bienvenue sur l'espace Habitation de Digiassur": "مرحباً بكم في فضاء السكن ديجي آسور",
  "Bienvenue sur l'espace Accident de Digiassur": "مرحباً بكم في فضاء الحوادث ديجي آسور",
  "Bienvenue sur l'espace Voyage de Digiassur": "مرحباً بكم في فضاء السفر ديجي آسور",
  "Bienvenue sur l'espace Santé de Digiassur": "مرحباً بكم في فضاء الصحة ديجي آسور",
  "Bienvenue sur l'espace Loisir de Digiassur": "مرحباً بكم في فضاء الترفيه ديجي آسور",
  "Bienvenue sur l'espace Epargne de Digiassur": "مرحباً بكم في فضاء الادخار ديجي آسور",
  "Contactez DigiAssur": "اتصلوا بـ ديجي آسور",
  "Nos Coordonnées": "معلومات الاتصال بنا",
  "Téléphone direct": "الهاتف المباشر",
  "Email officiel": "البريد الإلكتروني الرسمي",
  "Adresse du siège": "عنوان المقر الرئيسي",
  "Horaires d'ouverture": "أوقات العمل",
  "Envoyez-nous un message": "أرسلوا لنا رسالة",
  "Sujet de votre message": "موضوع رسالتكم",
  "Votre message...": "اكتبوا رسالتكم هنا...",
  "Envoyer mon message": "إرسال رسالتي",
  "Message envoyé !": "تم إرسال رسالتكم بنجاح!",
  "Espace Client Digiassur": "فضاء الزبناء ديجي آسور",
  "Créer votre Espace Client": "إنشاء حساب في فضاء الزبناء",
  "Connectez-vous pour consulter vos contrats et attestations": "سجلوا الدخول للاطلاع على عقودكم وشهادات التأمين",
  "Gérez tous vos contrats d'assurance en un seul clic": "أديروا جميع عقود تأمينكم بنقرة واحدة",
  "Email ou Numéro de police": "البريد الإلكتروني أو رقم وثيقة التأمين",
  "Se souvenir de moi": "تذكرني",
  "Mot de passe oublié ?": "نسيت كلمة المرور؟",
  "Pas encore de compte ?": "ليس لديكم حساب بعد؟",
  "Créer un compte": "إنشاء حساب جديد",
  "Déjà un compte ?": "لديكم حساب بالفعل؟",
  "Mentions Légales & Politique de Confidentialité": "المعلومات القانونية وسياسة الخصوصية",
  "Informations Légales & Réglementaires": "المعلومات القانونية والتنظيمية",
  "1. Éditeur de la plateforme DigiAssur": "1. الجهة المسؤولة عن منصة ديجي آسور",
  "2. Protection des données personnelles (Loi 09-08)": "2. حماية المعطيات ذات الطابع الشخصي (القانون 09-08)",
  "3. Sécurité des échanges": "3. أمان المعاملات والبيانات",
`;

if (!arDictContent.includes('"153 DHS TTC/Mois"')) {
  arDictContent = arDictContent.replace('export const ARABIC_DICTIONARY: Record<string, string> = {', 'export const ARABIC_DICTIONARY: Record<string, string> = {' + arAdditions);
  fs.writeFileSync(arDictPath, arDictContent, 'utf-8');
  console.log('Updated arDictionary.ts');
}

// 2. Update enDictionary.ts
const enDictPath = path.join(process.cwd(), 'client/src/i18n/enDictionary.ts');
let enDictContent = fs.readFileSync(enDictPath, 'utf-8');

const enAdditions = `
  "153 DHS TTC/Mois": "153 MAD incl. VAT/Month",
  "62.5 DHS TTC/Mois": "62.5 MAD incl. VAT/Month",
  "25 DHS TTC/Mois": "25 MAD incl. VAT/Month",
  "26 DHS TTC/Mois": "26 MAD incl. VAT/Month",
  "26 DHS TTC/MOIS": "26 MAD incl. VAT/Month",
  "650 DHS TTC/An": "650 MAD incl. VAT/Year",
  "650 DHS TTC": "650 MAD incl. VAT",
  "120 DHS TTC/Mois": "120 MAD incl. VAT/Month",
  "Votre avenir garanti": "Your future guaranteed",
  "Solutions Épargne & Avenir": "Savings & Future Solutions",
  "Capital Garanti": "Guaranteed Capital",
  "Sécurité maximale pour vos économies": "Maximum security for your savings",
  "Rendement attractif": "Attractive returns",
  "Taux avantageux & défiscalisation": "Favorable rates & tax exemptions",
  "Partenaire agréé :": "Licensed Partner:",
  "digiassur.ma": "digiassur.ma",
  "Assur'wi": "Assur'wi",
  "contact@digiassur.ma": "contact@digiassur.ma",
  "Bienvenue sur l'espace Auto de Digiassur": "Welcome to Digiassur Car Insurance",
  "Bienvenue sur l'espace Moto de Digiassur": "Welcome to Digiassur Motorcycle Insurance",
  "Bienvenue sur l'espace Habitation de Digiassur": "Welcome to Digiassur Home Insurance",
  "Bienvenue sur l'espace Accident de Digiassur": "Welcome to Digiassur Accident Insurance",
  "Bienvenue sur l'espace Voyage de Digiassur": "Welcome to Digiassur Travel Insurance",
  "Bienvenue sur l'espace Santé de Digiassur": "Welcome to Digiassur Health Insurance",
  "Bienvenue sur l'espace Loisir de Digiassur": "Welcome to Digiassur Leisure Insurance",
  "Bienvenue sur l'espace Epargne de Digiassur": "Welcome to Digiassur Savings Space",
  "Contactez DigiAssur": "Contact DigiAssur",
  "Nos Coordonnées": "Our Contact Details",
  "Téléphone direct": "Direct Phone",
  "Email officiel": "Official Email",
  "Adresse du siège": "Head Office Address",
  "Horaires d'ouverture": "Opening Hours",
  "Envoyez-nous un message": "Send us a message",
  "Sujet de votre message": "Message subject",
  "Votre message...": "Your message...",
  "Envoyer mon message": "Send my message",
  "Message envoyé !": "Message sent!",
  "Espace Client Digiassur": "Digiassur Client Area",
  "Créer votre Espace Client": "Create your Client Account",
  "Connectez-vous pour consulter vos contrats et attestations": "Log in to view your policies and certificates",
  "Gérez tous vos contrats d'assurance en un seul clic": "Manage all your insurance policies in one click",
  "Email ou Numéro de police": "Email or Policy Number",
  "Se souvenir de moi": "Remember me",
  "Mot de passe oublié ?": "Forgot password?",
  "Pas encore de compte ?": "Don't have an account yet?",
  "Créer un compte": "Create an account",
  "Déjà un compte ?": "Already have an account?",
  "Mentions Légales & Politique de Confidentialité": "Legal Notice & Privacy Policy",
  "Informations Légales & Réglementaires": "Legal & Regulatory Information",
  "1. Éditeur de la plateforme DigiAssur": "1. DigiAssur Platform Publisher",
  "2. Protection des données personnelles (Loi 09-08)": "2. Personal Data Protection (Law 09-08)",
  "3. Sécurité des échanges": "3. Security & Confidentiality",
`;

if (!enDictContent.includes('"153 DHS TTC/Mois"')) {
  enDictContent = enDictContent.replace('export const ENGLISH_DICTIONARY: Record<string, string> = {', 'export const ENGLISH_DICTIONARY: Record<string, string> = {' + enAdditions);
  fs.writeFileSync(enDictPath, enDictContent, 'utf-8');
  console.log('Updated enDictionary.ts');
}

console.log('Dictionaries enriched successfully!');
