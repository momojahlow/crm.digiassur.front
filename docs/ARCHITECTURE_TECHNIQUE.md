# 🏛️ Architecture Technique Digiassur Frontend

Ce document décrit en détail l'architecture logicielle, le système de routage, l'internationalisation, la gestion d'état et le design system de l'application Digiassur.

---

## 1. Vue d'Ensemble & Stack Logicielle

Digiassur est une Single Page Application (SPA) bâtie sur l'écosystème React / TypeScript moderne avec un outillage axé sur la performance :

* **Vite** : Bundler et serveur de développement ultra-rapide avec Hot Module Replacement (HMR).
* **React 18** : Programmation fonctionnelle avec hooks et gestion réactive du rendu.
* **TypeScript** : Typage statique strict sur l'ensemble des données de tarification, marques, villes et formulaires.
* **Wouter** : Solution de routage déclarative (< 1.5KB) remplaçant `react-router` pour une empreinte minimale.
* **Tailwind CSS v3** : Utilitaire de styles avec tokens configurés dans `tailwind.config.ts`.
* **Lucide React** : Bibliothèque d'icônes vectorielles cohérente.

---

## 2. Système de Routage (`client/src/App.tsx`)

Le routage est orchestré par Wouter via le composant `<Switch>` :

### Routes Principales (Hubs Produits) :
* `/` : Page d'accueil générale (`Home.tsx`)
* `/auto` : Hub Assurance Automobile (`AutoPage.tsx`)
* `/moto` : Hub Deux-Roues & Scooters (`MotoPage.tsx`)
* `/habitation` : Hub Multirisque Habitation (`HabitationPage.tsx`)
* `/voyage` : Hub Assurance Voyage & Schengen (`VoyagePage.tsx`)
* `/sante` : Hub Complémentaire Santé (`SantePage.tsx`)
* `/epargne` : Hub Épargne & Retraite (`EpargnePage.tsx`)
* `/loisir` : Hub Assurance Loisirs & Chasse/Sports (`LoisirPage.tsx`)
* `/accident` : Hub Individuelle Accidents (`AccidentPage.tsx`)

### Routes des Tunnels de Devis (Simulateurs & Souscription) :
* `/auto/devis-auto` : Devis Automobile (`AutoDevisPage.tsx`)
* `/moto/devis-moto` : Devis Deux-Roues (`MotoDevisPage.tsx`)
* `/habitation/obtenir-un-devis` : Devis Habitation (`HabitationDevisPage.tsx`)
* `/voyage/obtenir-un-devis` : Devis Voyage (`VoyageDevisPage.tsx`)
* `/sante/obtenir-un-devis` : Devis Santé (`SanteDevisPage.tsx`)
* `/epargne/obtenir-un-devis` : Simulateur Épargne (`EpargneDevisPage.tsx`)
* `/loisir/obtenir-un-devis` : Devis Loisirs (`LoisirDevisPage.tsx`)
* `/accident/devis-accident` : Devis Accidents (`AccidentDevisPage.tsx`)

---

## 3. Système Internationalisation & Multi-langues (i18n)

L'application intègre un contexte de langue personnalisé dans [`client/src/contexts/LanguageContext.tsx`](file:///d:/Herd/digiassur-front/client/src/contexts/LanguageContext.tsx) :

* **Langues prises en charge :** Français (`fr`, langue par défaut), Arabe (`ar`), Anglais (`en`).
* **Support RTL automatique :** 
  Lorsque l'arabe est sélectionné, l'attribut `dir="rtl"` et la classe `font-arabic` sont automatiquement appliqués sur le document HTML.
* **Fonction `t(key, fallback)` :**
  Permet d'accéder aux traductions imbriquées avec secours automatique vers le français :
  ```tsx
  const { t, language, isRTL } = useLanguage();
  return <h1>{t("epargne.title", "Mon Épargne Projet")}</h1>;
  ```

---

## 4. Composants Clés & Réutilisables

### `DigiassurHeader.tsx`
* Barre de navigation sticky avec fond blanc et ombrage subtil.
* Menu déroulant des produits d'assurance par catégorie.
* Sélecteur de langue avec drapeaux interactifs (FR, AR, EN).
* Liens directs vers l'espace client et contact téléphonique (+212 522 36 81 82).

### `DigiassurFooter.tsx`
* Pied de page institutionnel bleu nuit (`#153954`).
* Liens légaux (Mentions légales, CGU, Protection des données CNDP).
* Informations d'agrément de l'ACAPS et affiliation FMSAR.
* Coordonnées complètes du siège (Casablanca, Maroc).

### `PartnersSection.tsx`
* Carrousel ou grille présentant les grandes compagnies d'assurance marocaines partenaires :
  * AtlantaSanad
  * RMA Watanya
  * Wafa Assurance
  * Sanlam Maroc
  * AXA Assurance Maroc
  * MAMDA / MCMA

### `DevisPartnerComparator.tsx`
* Composant interactif de comparaison affichant les offres tarifaires triées par partenaire avec détails des franchises, plafonds et avantages spécifiques.

---

## 5. Gestion de l'Upload des Documents In-Page

Chaque page de devis intègre directement une zone d'upload sécurisée in-page pour éviter les pertes de conversion dues aux modales bloquantes :
* État local : `const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});`
* Gestionnaire : 
  ```tsx
  const handleFileUpload = (docKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles(prev => ({ ...prev, [docKey]: e.target.files![0] }));
    }
  };
  ```
* Chaque zone affiche le nom du fichier sélectionné ou `"Parcourir le fichier..."` avec feedback instantané.
