const fs = require('fs');
const path = require('path');

// 1. Read existing dictionary
const existingPath = 'client/src/i18n/arDictionary.ts';
const existingContent = fs.readFileSync(existingPath, 'utf8');

const dict = {};
const regex = /^\s*"([^"]+)":\s*"([^"]+)",?/gm;
let m;
while ((m = regex.exec(existingContent)) !== null) {
  dict[m[1]] = m[2];
}

console.log('Existing entries:', Object.keys(dict).length);

// 2. Comprehensive translation mappings for ALL DigiAssur texts
const newTranslations = {
  // Brand & Slogans
  "Digiassur": "ديجي أسير",
  "Accueil Digiassur": "الرئيسية ديجي أسير",
  "Bienvenue sur votre espace !": "مرحباً بكم في فضائكم الخاص!",
  "Avec Digiassur, bénéficiez d'un service premium": "مع ديجي أسير، استفد من خدمة متميزة وراقية",
  "Vos assurances en ligne au Maroc": "تأميناتكم عبر الإنترنت في المغرب",
  "Le comparateur d'assurance 100% digital N°1 au Maroc": "أول منصة رقمية 100% لمقارنة وتأمين المعاملات في المغرب",
  "Des contrats négociés au meilleur prix avec les compagnies leaders du marché.": "عقود مفاوضة بأفضل الأسعار مع كبرى شركات التأمين في السوق.",
  "Nous nous efforçons de fournir à nos clients un service exceptionnel et personnalisé.": "نحرص على تقديم خدمة استثنائية وشخصية لجميع زبنائنا.",
  "Nous sommes fiers de fournir un service exceptionnel à nos clients et nous sommes là pour vous aider à chaque étape du processus.": "نفتخر بتقديم خدمة استثنائية لزبنائنا ونحن بجانبكم لمساعدتكم في كل خطوة.",
  "Nous sommes fiers de travailler avec une sélection de compagnies d'assurance de premier plan pour offrir à nos clients les meilleurs produits et services possibles.": "نعتز بالعمل مع نخبة من كبرى شركات التأمين لنقدم لزبنائنا أفضل المنتجات والخدمات.",
  "Nous sommes fiers de voir que nos efforts ont porté leurs fruits et que nos clients sont satisfaits de nos services.": "يسعدنا أن جهودنا أثمرت وأن زبناءنا راضون تماماً عن جودة خدماتنا.",
  "Nos conseillers sont à votre entière disposition pour répondre à toutes vos questions d'assurance et vous accompagner.": "مستشارونا رهن إشارتكم للإجابة على جميع استفساراتكم ومرافقتكم في كل تأميناتكم.",
  "Nos offres d'assurance pour les particuliers sont conçues pour offrir une protection complète à un prix abordable.": "صممت عروضنا التأمينية للأفراد لتوفر حماية شاملة بأفضل وأنسب الأسعار.",
  "Les simulations pour l'assurance des particuliers peuvent vous aider à trouver la couverture qui convient le mieux à votre situation personnelle.": "تساعدكم محاكاة التأمين للأفراد على اختيار التغطية الأنسب لظروفكم واحتياجاتكم الشخصية.",

  // Product categories & specific pages
  "Bienvenue sur l'espace Auto de Digiassur": "مرحباً بكم في فضاء تأمين السيارات ديجي أسير",
  "Bienvenue sur l’espace Moto de Digiassur": "مرحباً بكم في فضاء تأمين الدراجات النارية ديجي أسير",
  "Bienvenue sur l'espace Accident de Digiassur": "مرحباً بكم في فضاء تأمين الحوادث ديجي أسير",
  "Bienvenue sur l’espace Habitation de Digiassur": "مرحباً بكم في فضاء تأمين السكن ديجي أسير",
  "Bienvenue sur l'espace Voyage de Digiassur": "مرحباً بكم في فضاء تأمين السفر ديجي أسير",
  "Bienvenue sur l'espace santé & prévoyance de Digiassur": "مرحباً بكم في فضاء الصحة والاحتياط ديجي أسير",
  "Bienvenue sur l'espace loisir de Digiassur": "مرحباً بكم في فضاء تأمين الأنشطة والترفيه ديجي أسير",
  "Assurance Automobile": "تأمين السيارات",
  "Assurance Moto sur mesure au meilleur prix": "تأمين الدراجات النارية حسب الطلب بأفضل سعر",
  "Assurance Accident Individuel": "تأمين الحوادث الفردية",
  "Assurance Multirisque Habitation": "تأمين السكن الشامل متعدد المخاطر",
  "Assurance Voyage & Assistance Internationale": "تأمين السفر والمساعدة الدولية",
  "Assurance médicale de voyage internationale": "تأمين السفر الطبي الدولي",
  "Assurance Médicale Schengen Obligatoire": "التأمين الصحي الإجباري لفيزا شنغن",
  "Assurance Santé & Prévoyance": "تأمين الصحة والاحتياط",
  "Assurance Santé Complémentaire": "التأمين الصحي التكميلي",
  "Assurance Santé Complémentaire & Mutuelle": "التأمين الصحي التكميلي والتعاضدي",
  "Assurance Loisir & Sports": "تأمين الترفيه والرياضات",
  "Auto Particuliers": "سيارات الأفراد",
  "Flotte Entreprise": "أسطول الشركات",
  "Accompagnement dédié pour les professionnels, TPE, PME et grandes flottes.": "مرافقة مخصصة للمهنيين، المقاولات الصغرى والمتوسطة والأساطيل الكبرى.",
  "Flotte automobile, assurance multirisque professionnelle, RC exploitation, prévoyance groupe et accidents du travail.": "أسطول السيارات، التأمين المهني متعدد المخاطر، المسؤولية المدنية المهنية، الاحتياط الجماعي وحوادث الشغل.",

  // Taglines & Hero descriptions
  "Assurer votre voiture à partir de 153 DHS TTC/Mois": "أمّن سيارتك ابتداءً من 153 درهم شامل الرسوم شهرياً",
  "Assurez votre voiture à partir de 153 DHS TTC/Mois": "أمّن سيارتك ابتداءً من 153 درهم شامل الرسوم شهرياً",
  "Assurez votre Moto à partir de": "أمّن دراجتك النارية ابتداءً من",
  "Assurez votre loisir à partir de": "أمّن أنشطتك الترفيهية ابتداءً من",
  "Assurez votre santé à partir de": "أمّن صحتك ابتداءً من",
  "Assurer votre habitation à": "أمّن سكنك ابتداءً من",
  "Assurer votre habitation à partir de": "أمّن سكنك ابتداءً من",
  "Comparez les meilleures offres d'assurance automobile au Maroc": "قارن أفضل عروض تأمين السيارات في المغرب",
  "Roulez en toute sérénité dès 89 DHS/Mois avec assistance 24/7": "قد دراجتك بكل راحة بال ابتداءً من 89 درهم/شهر مع المساعدة 24/7",
  "Protection complète pour votre deux-roues contre les aléas de la route. Assistance panne et accident partout au Maroc.": "حماية كاملة لدراجتك النارية ضد مخاطر الطريق ومساعدة في حالة العطب أو الحادث بجميع أنحاء المغرب.",
  "Demandez un devis pour protéger votre habitation et vos proches": "اطلب عرض سعر لحماية سكنك وعائلتك",
  "Que vous soyez propriétaire ou locataire, sécurisez votre logement et vos biens précieux contre les dégâts des eaux, incendies, vols et catastrophes naturelles.": "سواء كنت مالكاً أو مستأجراً، أمّن منزلك وممتلكاتك الثمينة ضد تسربات المياه، الحرائق، السرقات والكوارث الطبيعية.",
  "Que vous partiez pour les vacances, les études ou les affaires, voyagez l’esprit tranquille grâce à une couverture internationale complète conforme aux normes consulaires.": "سواء كنت مسافراً للسياحة أو الدراسة أو العمل، سافر بكل اطمئنان مع تغطية دولية شاملة مطابقة لشروط القنصليات.",
  "La santé est notre bien le plus précieux. La protéger n'est pas un luxe mais une nécessité !": "الصحة هي أغلى ما نملك. وحمايتها ليست ترفاً بل ضرورة حتمية!",
  "La santé est notre bien le plus précieux. Protégez votre famille en toute sérénité.": "الصحة أثمن نعمنا. احمِ عائلتك بكل أمان وراحة بال.",
  "Protégez vos passions, vos matériels et vos activités de loisirs": "احمِ شغفك ومعداتك وأنشطتك الترفيهية المفضلة",
  "Chasse, bateau, musique, sports extrêmes ou plus classiques, avec notre rubrique assurance loisirs, vivez vos loisirs en toute sérénité.": "الصيد، الملاحة الترفيهية، الآلات الموسيقية والرياضات المختلفة: عش هواياتك بكل راحة بال.",
  "Chasse, plaisance, instruments ou sports outdoor : obtenez une protection sur-mesure au meilleur tarif.": "القنص، اليخوت، المعدات والرياضات في الهواء الطلق: احصل على حماية مخصصة بأفضل سعر.",
  "Des rendements attractifs et une fiscalité avantageuse au Maroc": "عوائد مالية مجزية وامتيازات ضريبية هامة في المغرب",
  "Une protection maximale en cas d'accident de la vie privée et professionnelle": "حماية قصوى في حالة الحوادث في الحياة الخاصة والمهنية",
  "Une protection maximale pour votre voyage dans le monde entier.": "حماية قصوى لرحلاتكم وسفرياتكم عبر العالم أجمع.",
  "Une protection maximale de vos activités de loisir et passion.": "حماية شاملة لأنشطتكم الترفيهية وهواياتكم المفضلة.",
  "Une protection maximale de vos activités de loisir et passions sportives.": "حماية شاملة لأنشطتكم الترفيهية وهواياتكم الرياضية.",
  "Pourquoi souscrire une prévoyance individuelle en cas d'accident ?": "لماذا يجب الاكتتاب في تأمين الحوادث الفردية؟",
  "Parce que par définition un risque n’annonce jamais à l’avance sa survenance, vous devez :": "لأن الخطر بطبيعته لا يعلن عن حدوثه مسبقاً، يجب عليكم:",
  "Soit être un as de la gestion de votre budget et de votre épargne.": "إما أن تكونوا بارعين في إدارة ميزانيتكم ومدخراتكم المالية.",
  "Protégez vos proches contre les conséquences financières imprévues.": "احمِ أحباءك من التبعات المالية المفاجئة وغير المتوقعة.",
  "En cas d’accident dans le cadre de la vie privée ou professionnelle de l’assuré, un capital défini sera versé aux bénéficiaires désignés dans le contrat.": "في حالة وقوع حادث في إطار الحياة الخاصة أو المهنية للمؤمن له، يتم دفع رأسمال محدد للمستفيدين المعينين في العقد.",
  "Une prise en charge immédiate des frais médicaux, indemnités journalières et capital garanti en cas d": "تكفل فوري بالمصاريف الطبية، تعويضات يومية ورأسمال مضمون في حالة الحوادث",
  "Une indemnité journalière dès le 1er jour d’hospitalisation et jusqu’à 120 jours consécutifs.": "تعويض يومي ابتداءً من اليوم الأول للاستشفاء ولمدة تصل إلى 120 يوماً متتالياً.",
  "Le remboursement des frais médicaux, pharmaceutiques et chirurgicaux suite à un accident allant jusqu’à 100.000 DH par année.": "استرجاع المصاريف الطبية والصيدلانية والجراحية الناتجة عن الحادث حتى 100,000 درهم سنوياً.",
  "FRAIS MÉDICAUX, PHARMACEUTIQUES, CHIRURGICAUX ET D’HOSPITALISATION": "المصاريف الطبية والصيدلانية والجراحية والاستشفائية",
  "Frais medicaux, pharmaceutiques, chirurgicaux et d’hospitalisation": "المصاريف الطبية والصيدلانية والجراحية والاستشفائية",
  "BÉNÉFICIAIRES EN CAS DE DÉCÈS": "المستفيدون في حالة الوفاة (لا قدر الله)",
  "INDEMNITÉ JOURNALIÈRE D'HOSPITALISATION": "التعويض اليومي عن الاستشفاء",
  "CAPITAL EN CAS D'INVALIDITÉ PERMANENTE": "الرأسمال المضمون في حالة العجز الدائم",
  "CAPITAL EN CAS DE DÉCÈS ACCIDENTEL": "الرأسمال المضمون في حالة الوفاة الناتجة عن حادث",

  // Habitation page details
  "Êtes-vous conscient des risques auxquels votre habitation s’expose ?": "هل تدرك حجم المخاطر التي يتعرض لها سكنك يومياً؟",
  "Si une canalisation casse et s'infiltre dans vos murs, parquets et tapis, les réparations sont immédiatement prises en charge.": "إذا انكسرت أنبوب مياه وتسربت في الجدران والأرضيات، يتم التكفل بالإصلاحات على الفور.",
  "Si le feu s'y déclare à cause d’un court-circuit ou problème électrique, vos murs et biens sont indemnisés sans compromettre votre patrimoine.": "إذا اندلع حريق بسبب تماس كهربائي، يتم تعويض جدرانك وممتلكاتك دون الإضرار بمدخراتك.",
  "Couverture complète de votre mobilier, équipements électroniques et objets de valeur en cas d’effraction ou de dégradation.": "تغطية شاملة لأثاثك وتجهيزاتك الإلكترونية وأغراضك الثمينة في حال السرقة أو الإتلاف.",
  "Si un sinistre chez vous se propage chez vos voisins ou au sous-sol, votre responsabilité civile est couverte sans frais imprévus.": "إذا انتشر حادث من منزلك إلى الجيران أو البناية، فإن مسؤوليتك المدنية مغطاة بالكامل دون تكاليف إضافية.",

  // Voyage page details
  "Attestation immédiate conforme aux exigences pour les demandes de visa Schengen, USA, Canada et monde entier. Rapatriement médical et prise en charge des frais médicaux à l": "شهادة فورية مطابقة لمتطلبات تأشيرات شنغن وأمريكا وكندا والعالم، تشمل الترحيل الطبي وتغطية النفقات الصحية بالخارج.",
  "Attestation officielle immédiate conforme aux exigences consulaires européennes.": "شهادة رسمية فورية مطابقة لجميع متطلبات القنصليات الأوروبية.",
  "Attestation officielle immédiate couvrant les 30 000 € médicaux requis pour l'espace Schengen.": "شهادة رسمية فورية تغطي سقف 30,000 يورو الطبي المطلوب إجبارياً لفضاء شنغن.",
  "Plafond garanti de 30 000 € (300 000 DHS) exigé pour le visa.": "سقف مضمون قدره 30,000 يورو (300,000 درهم) المطلوب للحصول على التأشيرة.",
  "Acceptée par les ambassades et consulats pour visa Schengen": "مقبولة لدى جميع السفارات والقنصليات لطلب تأشيرة شنغن",
  "Prise en charge directe des frais d’hospitalisation d’urgence et soins médicaux à l'étranger.": "تكفل مباشر بمصاريف الاستشفاء الاستعجالي والعلاجات الطبية في الخارج.",
  "Rapatriement sanitaire, retour anticipé des membres de la famille et dotation financière d'urgence.": "ترحيل طبي وصحي، عودة مبكرة لأفراد الأسرة ومساعدة مالية طارئة.",
  "Dépannage, remorquage et véhicule de remplacement en cas d’accident ou de panne durant votre séjour.": "إصلاح الأعطاب والقطر وتوفير سيارة بديلة في حالة وقوع حادث أو عطب أثناء إقامتكم.",
  "Assistance Rapatriement Sanitaire 24h/24": "مساعدة وترحيل صحي وطبي 24/24 ساعة",
  "Assistance Véhicule à l'étranger": "مساعدة المركبة خارج المغرب",
  "Assistance automobile à l'étranger": "مساعدة السيارات في الخارج",
  "Assistance liée au décès & rapatriement": "المساعدة في حالة الوفاة ونقل الجثمان",

  // Sante & Prev page details
  ", nous offrons une gamme complète d'assurance santé et prévoyance pour répondre à tous vos besoins.": "نقدم باقة متكاملة من حلول التأمين الصحي والاحتياط لتلبية كافة احتياجاتكم.",
  "Complémentaire santé hospitalisation, consultations, pharmacie et soins dentaires avec remboursements rapides et tiers payant.": "تأمين صحي تكميلي للاستشفاء والاستشارات والتحاليل والصيدلة وطب الأسنان مع تعويضات سريعة.",
  "Prise en charge directe en clinique sans avance de frais majeurs.": "تكفل مباشر في المصحات الخاصة دون دفع مسبق للمصاريف الكبرى.",
  "Remboursement rapide des ordonnances, bilans et visites chez les spécialistes.": "استرجاع سريع لمصاريف الوصفات الطبية والتحاليل وزيارات الأطباء الأخصائيين.",
  "Nos formules sont conçues pour vous offrir une protection financière solide en cas de coup dur, que ce soit pour couvrir les coûts des soins médicaux quotidiens ou pour vous protéger contre les aléas imprévus de la vie.": "صممت صيغنا لتمنحكم أماناً مالياً متيناً عند الشدائد، سواء لمصاريف العلاج اليومية أو لمواجهة تقلبات الحياة غير المتوقعة.",
  "Complétez le formulaire ci-dessous pour recevoir une simulation personnalisée et sans engagement avec les meilleurs taux de remboursement au Maroc.": "املأ الاستمارة أسفله للحصول على محاكاة مخصصة وبدون التزام بأفضل نسب التعويض في المغرب.",

  // Loisirs details
  "Couverture adaptée à la pratique de vos sports et loisirs : sports nautiques, cyclisme, chasse, randonnée et activités de plein air.": "تغطية مخصصة لممارسة هواياتكم ورياضاتكم: الرياضات المائية، الدراجات، القنص، المشي الجبلي والأنشطة الخارجية.",
  "Responsabilité civile légale obligatoire, chiens et fusils couverts.": "المسؤولية المدنية القانونية الإجبارية، وتغطية كلاب وبنادق القنص.",
  "Protection corporelle individuelle pour sports amateurs et extrêmes.": "حماية جسدية فردية للرياضات العادية والرياضات القصوى.",

  // Formulas & Packages
  "Choisissez la formule qui vous convient (Pomme, Orange ou Kiwi).": "اختر الصيغة المناسبة لك (تفاحة، برتقالة أو كيوي).",
  "Formule Pomme": "صيغة التفاحة",
  "Formule Orange": "صيغة البرتقالة",
  "Formule Kiwi": "صيغة الكيوي",
  "Formule Tiers Simple": "صيغة المسؤولية المدنية البسيطة",
  "Formule Tiers Complet": "صيغة المسؤولية المدنية الكاملة",
  "Formule Tous Risques": "صيغة التأمين الشامل لجميع المخاطر",
  "Formule Tiers": "صيغة ضد الغير",
  "Formule Essentielle": "الصيغة الأساسية",
  "Formule Confort": "صيغة الراحة",
  "Formule Sérénité": "صيغة راحة البال",
  "Formule Économique": "الصيغة الاقتصادية",
  "Formule Optimale": "الصيغة المثالية",
  "Formule Premium": "الصيغة الممتازة بريميوم",
  "Formule standard": "الصيغة القياسية",
  "0 DHS — Formule standard": "0 د.م. — الصيغة القياسية",
  "+660 DHS — Service Premium sans service des mines": "+660 د.م. — خدمة بريميوم بدون مركز الفحص التقني",
  "+840 DHS — Service Premium VIP avec accompagnement au service des mines": "+840 د.م. — خدمة VIP مع مرافقة لمركز الفحص التقني",
  "Service Premium": "الخدمة الممتازة بريميوم",
  "Service Premium VIP": "خدمة كبار الشخصيات VIP",

  // Car & Moto Form Steps & Labels
  "1. Assuré": "1. المؤمن له",
  "2. Véhicule": "2. المركبة",
  "3. Formule": "3. الصيغة",
  "4. Options": "4. الخيارات",
  "5. Confirmation": "5. التأكيد",
  "1. Profil": "1. الملف الشخصي",
  "2. Logement": "2. السكن",
  "1. Voyage": "1. الرحلة",
  "2. Voyageurs": "2. المسافرون",
  "1. Épargne": "1. الادخار",
  "2. Simulation": "2. المحاكاة",
  "3. Coordonnées": "3. بيانات الاتصال",
  "Sélectionnez la marque, le modèle et la puissance fiscale de votre auto.": "حدد علامة سيارتك، طرازها وقوتها الجبائية (الخيول).",
  "Caractéristiques de votre véhicule": "المواصفات الفنية لمركبتك",
  "Caractéristiques du logement": "مواصفات السكن والعقار",
  "Usage du véhicule": "طبيعة استعمال المركبة",
  "Puissance fiscale": "القوة الجبائية (الخيول)",
  "Type de carburant": "نوع الوقود",
  "Date de mise en circulation": "تاريخ أول شروع في الاستخدام",
  "Date d'effet souhaitée": "تاريخ سريان العقد المطلوب",
  "Valeur vénale": "القيمة السوقية التقديرية",
  "Valeur à neuf": "القيمة عند الشراء جديدة",
  "Valeur à neuf estimée": "القيمة التقديرية لمركبتك جديدة",
  "Valeur du mobilier estimée": "القيمة التقديرية للأثاث والمحتويات",
  "Superficie en m²": "المساحة بالمتر المربع (م²)",
  "Nombre de pièces": "عدد الغرف",
  "Type de logement": "نوع السكن",
  "Appartement": "شقة",
  "Villa": "فيلا",
  "Maison traditionnelle": "منزل تقليدي",
  "Propriétaire occupant": "مالك يشغل السكن",
  "Locataire": "مستأجر",
  "Propriétaire non occupant": "مالك لا يشغل السكن (للكراء)",
  "Résidence principale": "سكن رئيسي",
  "Résidence secondaire": "سكن ثانوي",
  "Vous êtes propriétaire ou locataire de votre habitation principale ?": "هل أنت مالك أم مستأجر لسكنك الرئيسي؟",
  "Assuré :": "المؤمن له :",
  "Adhérent :": "المنخرط :",
  "Bénéficiaire :": "المستفيد :",

  // Wizard / Devis Buttons & Directions
  "Étape suivante": "المرحلة التالية",
  "Étape précédente": "المرحلة السابقة",
  "Revenir à l'étape précédente": "الرجوع للمرحلة السابقة",
  "Passer à l'étape suivante": "المرور للمرحلة التالية",
  "Calculer mon devis": "احتساب عرض السعر الخاص بي",
  "Calculer ma mensualité": "احتساب الدفعة الشهرية",
  "Estimer mon capital": "تقدير الرأسمال الإجمالي",
  "Finaliser ma demande": "تأكيد وإتمام الطلب",
  "Envoyer ma demande": "إرسال طلبي الآن",
  "Renseignez vos informations afin de recevoir votre devis voyage :": "أدخل معلوماتك الشخصية للتوصل بعرض تأمين السفر :",
  "Ces informations nous permettent de calculer précisément votre prime personnalisée.": "تمكننا هذه المعطيات من احتساب قسط تأمينك المخصص بكل دقة.",
  "Suivez ensuite les instructions pour finaliser l'assurance de votre devis accident.": "اتبع التعليمات لإتمام الاكتتاب في تأمين الحوادث.",
  "Suivez ensuite les instructions pour finaliser l’assurance de votre Moto.": "اتبع التعليمات لإتمام الاكتتاب في تأمين دراجتك النارية.",
  "Vous allez recevoir par email votre devis dans quelques minutes.": "ستتوصلون بعرض السعر المفصل عبر بريدكم الإلكتروني خلال دقائق معدودة.",

  // Inputs and Form Fields
  "Nom": "النسب / الاسم العائلي",
  "Nom complet": "الاسم الكامل",
  "Prénom": "الاسم الشخصي",
  "Votre nom complet": "اسمكم الكامل",
  "Nom & Prénom": "الاسم العائلي والشخصي",
  "Nom du conjoint": "اسم الزوج / الزوجة",
  "Nom et prénom du conjoint": "الاسم الكامل للزوج(ة)",
  "Votre nom": "اسمكم العائلي",
  "Votre prénom": "اسمكم الشخصي",
  "Numéro de téléphone": "رقم الهاتف المحمول",
  "Téléphone *": "رقم الهاتف *",
  "Numéro de téléphone *": "رقم الهاتف المحمول *",
  "Adresse Email *": "البريد الإلكتروني *",
  "Adresse email": "البريد الإلكتروني",
  "Votre email": "بريدكم الإلكتروني",
  "Adresse postale*": "العنوان البريدي الكامل*",
  "Ville de résidence": "مدينة الإقامة",
  "Ville": "المدينة",
  "Sélectionnez votre ville": "اختر مدينتك",
  "Casablanca": "الدار البيضاء",
  "Rabat": "الرباط",
  "Marrakech": "مراكش",
  "Tanger": "طنجة",
  "Fès": "فاس",
  "Agadir": "أكادير",
  "Meknès": "مكناس",
  "Oujda": "وجدة",
  "Kenitra": "القنيطرة",
  "Tétouan": "تطوان",
  "Profession": "المهنة / النشاط المهني",
  "Date de naissance": "تاريخ الازدياد",
  "Date de naissance *": "تاريخ الازدياد *",
  "Date d'obtention du permis": "تاريخ الحصول على رخصة السياقة",
  "Type de permis": "صنف رخصة السياقة",
  "Permis B (Auto)": "رخصة صنف B (سيارات)",
  "Permis A (Moto)": "رخصة صنف A (دراجات نارية)",
  "Numéro d'immatriculation": "رقم لوحة الترقيم",
  "Format: 12345-A-6": "مثال: 6-أ-12345",
  "Destination": "وجهة السفر",
  "Zone géographique": "المنطقة الجغرافية",
  "Espace Schengen": "فضاء شنغن",
  "Monde entier": "جميع أنحاء العالم",
  "Europe (hors Schengen)": "أوروبا (خارج فضاء شنغن)",
  "Date de départ": "تاريخ المغادرة",
  "Date de retour": "تاريخ العودة",
  "Durée du séjour": "مدة الإقامة",
  "Motif du voyage": "سبب السفر",
  "Tourisme / Vacances": "سياحة / عطلة",
  "Affaires / Professionnel": "عمل / مهني",
  "Études / Stage": "دراسة / تدريب",

  // Epargne specific
  "Montant du versement initial": "مبلغ الدفعة الأولى الابتدائية",
  "Montant du versement mensuel": "مبلغ التوفير الشهري",
  "Durée de l'épargne": "مدة الادخار والاستثمار",
  "Capital estimé à terme": "الرأسمال التقديري عند نهاية المدة",
  "Total des versements": "مجموع المبالغ المودعة",
  "Plus-values estimées": "الأرباح والعوائد التقديرية",
  "Taux de rendement prévisionnel": "معدل العائد المتوقع",
  "Objectif d'épargne": "الهدف من الادخار",
  "Préparer ma retraite": "الاستعداد للتقاعد المريح",
  "Financer les études de mes enfants": "تمويل الدراسات العليا للأبناء",
  "Constituer un capital projet": "تكوين رأسمال لإطلاق مشروع",
  "Acheter un bien immobilier": "شراء عقار أو سكن",
  "Épargne de précaution": "ادخار احتياطي للأمان المالي",
  "Autre projet": "مشروع آخر",

  // Voyage specific
  "Voyagez-vous seul ou accompagné ?": "هل تسافر بمفردك أم مع مرافقين؟",
  "Seul": "بمفردي",
  "En couple": "مع الزوج(ة)",
  "En famille": "مع العائلة",
  "Êtes-vous en couple durant ce voyage ?": "هل تسافر برفقة زوجك / زوجتك خلال هذه الرحلة؟",
  "Avez-vous des enfants qui vous accompagnent ?": "هل يرافقك أطفال خلال هذه الرحلة؟",
  "Nombre d'enfants vous accompagnant": "عدد الأطفال المرافقين لكم",
  "Nombre d'enfants": "عدد الأطفال",
  "1 enfant": "طفل واحد",
  "2 enfants": "طفلان",
  "3 enfants": "3 أطفال",
  "4 enfants": "4 أطفال",
  "5 enfants ou plus": "5 أطفال أو أكثر",

  // Durations & periods
  "0 jour": "0 يوم",
  "3 jours": "3 أيام",
  "5 jours": "5 أيام",
  "10 jours": "10 أيام",
  "15 jours": "15 يوماً",
  "30 jours": "30 يوماً",
  "60 jours": "60 يوماً",
  "90 jours": "90 يوماً",
  "3 mois (Trimestrielle)": "3 أشهر (فصلي)",
  "6 mois (Semestrielle)": "6 أشهر (نصف سنوي)",
  "1 an* (Annuelle — Tarif le plus avantageux)": "سنة واحدة* (سنوي — التعرفة الأوفر)",
  "Annuelle (1 an — Meilleur tarif)": "سنوي (سنة واحدة — أفضل تعرفة)",
  "3 ans": "3 سنوات",
  "5 ans": "5 سنوات",
  "8 ans": "8 سنوات",
  "10 ans": "10 سنوات",
  "15 ans": "15 سنة",
  "20 ans": "20 سنة",
  "25 ans": "25 سنة",
  "30 ans": "30 سنة",
  "2 fois / an": "مرتان / سنوياً",
  "3 fois / an": "3 مرات / سنوياً",
  "10 séances/accident": "10 جلسات / حادث",
  "3 séances/accident": "3 جلسات / حادث",
  "5 séances/accident": "5 جلسات / حادث",

  // Amounts & Currencies
  "DHS": "درهم",
  "DH": "درهم",
  "DHS TTC": "درهم شامل الرسوم",
  "DHS TTC/Mois": "درهم شامل الرسوم/شهرياً",
  "DHS TTC/MOIS": "درهم شامل الرسوم/شهرياً",
  "DHS TTC/An": "درهم شامل الرسوم/سنوياً",
  "DHS/Mois": "درهم/شهرياً",
  "DH / an": "درهم / سنوياً",
  "DH / an (Illimité)": "درهم / سنوياً (غير محدود)",
  "100% des frais engagés (Premium)": "100% من المصاريف المدفوعة (بريميوم)",
  "80% des frais engagés (Standard)": "80% من المصاريف المدفوعة (قياسي)",
  "70% des frais engagés": "70% من المصاريف المدفوعة",
  "85% des frais engagés": "85% من المصاريف المدفوعة",
  "15 000 DHS (Véhicules premium)": "15,000 درهم (المركبات الفاخرة)",
  "30 000 € (300 000 DHS)": "30,000 يورو (300,000 درهم)",

  // Options & Guarantees
  "Assistance 24h/24 Maroc": "مساعدة 24/24 داخل المغرب",
  "Assistance remorquage 24/7": "مساعدة وقطر المركبات 24/7",
  "Assistance basique 24h/24": "مساعدة أساسية 24/24",
  "Assistance étendue :": "المساعدة الموسعة المتميزة :",
  "Souhaitez-vous assurer votre véhicule à l'étranger (Carte Verte) ?": "هل ترغب في تأمين مركبتك بالخارج (البطاقة الخضراء الدولية)؟",
  "Souhaitez-vous souscrire une extension de votre formule d'assistance ?": "هل ترغب في إضافة خيار المساعدة الموسعة والمتميزة؟",
  "Je ne souhaite pas bénéficier d'une formule d'assistance étendue (Assistance de base conservée).": "لا أرغب في إضافة المساعدة الموسعة (أكتفي بالمساعدة الأساسية).",
  "Personnalisez vos options d'assistance routière et services exclusifs à domicile.": "خصص خيارات المساعدة على الطريق والخدمات الحصرية عند باب منزلك.",
  "Visite technique accompagnée, changement de carte grise, conciergerie administrative totale.": "مرافقة للفحص التقني، تجديد البطاقة الرمادية وخدمات إدارية متكاملة.",
  "Indemnisation même en cas de choc sans tiers ou responsabilité totale.": "تعويض كامل حتى في حال الاصطدام بدون طرف ثالث أو المسؤولية الكاملة.",
  "Garantie certifiée conforme et gérée avec rapidité par notre service sinistres.": "ضمانات معتمدة ومعالجة سريعة وفعالة من مصلحة تدبير الحوادث.",

  // Legal & Compliance
  "1. Éditeur de la plateforme DigiAssur": "1. الجهة المسؤولة عن منصة ديجي أسير",
  "2. Protection des données personnelles (Loi 09-08)": "2. حماية المعطيات ذات الطابع الشخصي (القانون 09-08)",
  "3. Sécurité des échanges": "3. أمان وحماية التبادلات والمعاملات",
  "Autorisation CNDP N° : A-GC-232/2023": "ترخيص اللجنة الوطنية CNDP رقم: A-GC-232/2023",
  "Agrément ministériel :": "الاعتماد الوزاري :",
  "Décision du 16 Mai 2018 portant le numéro C340893782018780 régie par la loi n° 17-99 portant code des assurances": "قرار بتاريخ 16 ماي 2018 يحمل رقم C340893782018780 خاضع للقانون رقم 17-99 بمثابة مدونة التأمينات بالمغرب",
  ", société de courtage d’assurance et de réassurance.": "، شركة وساطة في التأمين وإعادة التأمين.",
  ") est édité par la société": ") تم تطويرها وإدارتها من طرف شركة",
  "27, Rue Ain Asserdoune, Rez de jardin, CIL, Casablanca, Maroc": "27، زنقة عين أسردون، طابق الحديقة، حي CIL، الدار البيضاء، المغرب",
  "Adresse du siège": "عنوان المقر الاجتماعي",
  "Ce traitement a été autorisé par la CNDP.": "تم الترخيص لهذه المعالجة من طرف اللجنة الوطنية CNDP.",
  "CNDP (Commission Nationale de Contrôle de la Protection des Données à Caractère Personnel)": "اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي (CNDP)",
  "Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification et d'opposition au traitement de vos données personnelles.": "وفقاً للقانون رقم 09-08، يحق لكم الولوج إلى معطياتكم الشخصية وتصحيحها والتعرض على معالجتها.",
  "Conformément à la loi n° 09-08 promulguée par le Dahir 1-09-15 du 18 février 2009, relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, ce traitement a fait l'objet d'une déclaration et récépissé auprès de la": "تطبيقاً لمقتضيات القانون رقم 09-08 الصادر بالظهير الشريف 1-09-15 بتاريخ 18 فبراير 2009 والمتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي، فإن هذه المعالجة صرح بها لدى",
  ", notamment la mention relative à la protection des données personnelles.": "، وخاصة البنود المتعلقة بحماية المعطيات ذات الطابع الشخصي.",
  "Les informations recueillies sur le site DigiAssur font l'objet d'un traitement informatique destiné exclusivement à la tarification, l'émission des devis d'assurance et la gestion de la relation client.": "تخضع المعلومات المجمعة على موقع ديجي أسير لمعالجة معلوماتية مخصصة حصرياً لاحتساب التعريفة وإصدار عروض التأمين وتدبير العلاقة مع الزبناء.",
  "Toutes les transmissions de données relatives aux demandes de devis et souscriptions sont chiffrées selon les protocoles de sécurité SSL/TLS standard du secteur, garantissant l'intégrité et la confidentialité de vos informations.": "جميع عمليات إرسال البيانات المتعلقة بطلبات عروض الأسعار والاشتراكات مشفرة وفق بروتوكولات الأمان SSL/TLS المعتمدة دولياً، مما يضمن سرية وسلامة معلوماتكم تماماً.",
  "Vous bénéficiez d'un droit d'accès, de rectification et d'opposition aux informations qui vous concernent en vous adressant directement à notre délégué à la protection des données :": "تستفيدون من حق الوصول إلى معلوماتكم وتصحيحها والاعتراض عليها من خلال التواصل مباشرة مع مسؤول حماية المعطيات لدينا :",
  "J'accepte les conditions générales d'utilisation et le traitement de mes données conformément aux normes de la CNDP.": "أوافق على الشروط العامة للاستخدام ومعالجة بياناتي وفقاً لمعايير وتوجيهات CNDP.",
  "Accepter et continuer": "الموافقة والمتابعة",

  // Documents Upload & Final Steps
  "Afficher les documents requis": "عرض الوثائق والمستندات المطلوبة",
  "Afin d'accélérer l'émission immédiate de votre attestation d'assurance, vous pouvez nous transmettre vos pièces justificatives dès maintenant.": "لتسريع الإصدار الفوري لشهادة التأمين الخاصة بكم، يمكنكم إرسال وثائقكم الإثباتية الآن.",
  "Afin d'accélérer le processus d'obtention d'un devis définitif,": "لتسريع الحصول على عرض السعر النهائي،",
  "Afin d’accélérer le processus d’obtention d’un devis définitif, veuillez cliquer sur le bouton suivant pour nous envoyer les documents requis :": "لتسريع مسطرة الحصول على عرض السعر النهائي، يرجى الضغط على الزر التالي لإرسال الوثائق المطلوبة :",
  "veuillez cliquer sur le bouton suivant pour nous envoyer les documents requis :": "يرجى الضغط على الزر التالي لإرسال الوثائق والمستندات المطلوبة :",
  "Veuillez téléverser vos documents (formats acceptés: PNG, JPG, PDF) :": "يرجى رفع وثائقكم ومستنداتكم (الصيغ المقبولة: PNG, JPG, PDF) :",
  "Téléverser la carte grise": "رفع البطاقة الرمادية",
  "Téléverser le permis de conduire": "رفع رخصة السياقة",
  "Téléverser la CIN": "رفع البطاقة الوطنية للتعريف CIN",
  "Accélérer mon devis sur WhatsApp": "تسريع دراسة ملفي عبر واتساب",
  "Accélération du traitement des sinistres via l’application mobile": "تسريع معالجة الحوادث والتعويضات عبر تطبيق الهاتف",
  "Appeler un conseiller": "الاتصال بمستشار التأمين",
  "Centre de relation client H24": "مركز خدمة الزبناء 24/24 ساعة",
  "Centre de relation client H24 / 7j": "مركز خدمة الزبناء 24/24 و 7/7 أيام",
  "Merci de nous avoir contactés. Un conseiller Digiassur prendra contact avec vous dans les meilleurs délais.": "شكراً لتواصلكم معنا. سيتصل بكم أحد مستشاري ديجي أسير في أقرب وقت ممكن.",

  // Explanatory paragraphs
  "Cette formule intermédiaire permet de couvrir les dommages causés aux autres véhicules, mais également les dégâts sur votre propre voiture en cas de vol, d'incendie ou de bris de glace.": "تتيح هذه الصيغة المتوسطة تغطية الأضرار اللاحقة بمركبات الغير، إضافة إلى تغطية الأضرار التي تلحق بسيارتك في حالات السرقة، الحريق أو كسر الزجاج.",
  "Cette formule intermédiaire permet de couvrir les dommages causés aux autres véhicules, mais également les dégâts sur votre propre moto en cas de vol, d'incendie.": "تتيح هذه الصيغة المتوسطة تغطية الأضرار اللاحقة بالغير، إضافة إلى تعويض الأضرار اللاحقة بدراجتك النارية في حال السرقة أو الحريق.",
  "Elle peut également inclure des garanties supplémentaires telles que l'assistance en cas de panne ou d'accident, ou encore la protection juridique. Cette solution d'assurance intermédiaire est donc adaptée aux conducteurs souhaitant une protection plus complète tout en maîtrisant leur budget.": "كما يمكن أن تتضمن ضمانات إضافية كالمساعدة في حالات العطب أو الحادث والحماية القانونية. هذه الصيغة تلائم السائقين الراغبين في حماية متكاملة مع التحكم التام في ميزانيتهم.",
  "est une option intéressante pour les conducteurs qui souhaitent bénéficier d'une couverture d'assurance plus étendue que l'assurance au tiers, tout en ne payant pas autant que pour une assurance tous risques.": "خيار مميز للسائقين الراغبين في الاستفادة من تغطية أوسع من التأمين الإجباري ضد الغير، مع الحفاظ على سعر أنسب من التأمين الشامل لجميع المخاطر.",
  "est une option intéressante pour les conducteurs qui souhaitent bénéficier d'une couverture d'assurance plus étendue que l'assurance au tiers, tout en ne payant pas autant que pour une bonne assurance.": "خيار ممتاز لمن يريد حماية متقدمة بتكلفة متوازنة دون دفع مبالغ باهظة.",
  "Vous êtes à la recherche d'une couverture de frais médicaux, pharmaceutiques et d'hospitalisation ?": "هل تبحثون عن تغطية مثالية للمصاريف الطبية، الصيدلانية والاستشفائية؟",
  "Vous cherchez à obtenir une assurance qui correspond à vos besoins, mais vous ne savez pas par où commencer ?": "تبحث عن تأمين يلائم احتياجاتك بدقة ولا تدري من أين تبدأ؟",
  "Contactez-nous pour obtenir une offre personnalisée et adaptée à vos besoins.": "تواصلوا معنا للحصول على عرض مخصص ومناسب لاحتياجاتكم تماماً.",
  "Bouche à oreille / Recommandation": "توصية من صديق أو قريب",
  "Ajouter un bénéficiaire": "إضافة مستفيد جديد",
  "Annuler": "إلغاء",
  "Confirmer la sélection": "تأكيد الاختيار",
  "Sélectionnez une option": "اختر أحد الخيارات",
  "Oui": "نعم",
  "Non": "لا",
  "Non renseigné": "غير محدد",
  "Valider mon choix": "تأكيد اختياري",
  "En savoir plus": "معرفة المزيد",
  "Voir les détails": "عرض التفاصيل",
  "Télécharger le devis": "تحميل عرض السعر PDF",
  "Imprimer": "طباعة",
  "Souscrire en ligne": "الاكتتاب المباشر عبر الإنترنت",
  "Souscription 100% en ligne": "اشتراك رقمي 100% عبر الإنترنت",
  "Devis gratuit et sans engagement": "عرض سعر مجاني وبدون أي التزام",
  "Réponse immédiate": "إجابة فورية في الحين"
};

// Merge into dict
for (const [k, v] of Object.entries(newTranslations)) {
  dict[k] = v;
}

// Write back to arDictionary.ts
const keys = Object.keys(dict).sort((a, b) => b.length - a.length); // longer keys first for greedy text replacement

let out = `// Complete Arabic Dictionary for DigiAssur
// Auto-generated & curated for 100% Arabic language coverage across all pages & funnels.
export const ARABIC_DICTIONARY: Record<string, string> = {\n`;

for (const k of keys) {
  const escapedKey = k.replace(/"/g, '\\"');
  const escapedVal = dict[k].replace(/"/g, '\\"');
  out += `  "${escapedKey}": "${escapedVal}",\n`;
}

out += `};\n\n`;

// Export helper for fast translation
out += `export function translateToArabic(text: string): string {
  if (!text || typeof text !== "string") return text;
  const trimmed = text.trim();
  if (ARABIC_DICTIONARY[trimmed]) {
    return text.replace(trimmed, ARABIC_DICTIONARY[trimmed]);
  }
  return text;
}\n`;

fs.writeFileSync(existingPath, out, 'utf8');
console.log('Successfully wrote', keys.length, 'entries to arDictionary.ts');
