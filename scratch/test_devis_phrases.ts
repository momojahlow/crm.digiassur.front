import { ARABIC_DICTIONARY } from '../client/src/i18n/arDictionary';
import { ENGLISH_DICTIONARY } from '../client/src/i18n/enDictionary';

const testPhrases = [
  'Votre devis en 3 étapes',
  'Informations du véhicule',
  'Usage du véhicule',
  'Garanties souhaitées',
  'Coordonnées',
  'Vos garanties personnalisées',
  'Souscrire en ligne',
  'Immatriculation',
  'Puissance fiscale',
  'Carburant',
  'Date de mise en circulation',
  'Formule Essentielle',
  'Formule Confort',
  'Formule Tous Risques',
  'Responsabilité Civile',
  'Bris de glace',
  'Vol et Incendie',
  'Dommages Collision',
  'Tierce Complète',
  'Prime annuelle TTC',
  'Paiement en ligne sécurisé',
  'Votre devis a été envoyé par email'
];

let okAr = 0;
let okEn = 0;
testPhrases.forEach(p => {
  if (ARABIC_DICTIONARY[p]) okAr++;
  else console.log('Missing AR devis phrase:', p);
  if (ENGLISH_DICTIONARY[p]) okEn++;
  else console.log('Missing EN devis phrase:', p);
});
console.log(`Devis coverage - AR: ${okAr}/${testPhrases.length}, EN: ${okEn}/${testPhrases.length}`);
