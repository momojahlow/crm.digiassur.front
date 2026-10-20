# 🤖 Guide Spécifique pour Agents IA (AGENTS.md)
> **Ce document est destiné aux modèles d'IA (Antigravity, Claude, ChatGPT, etc.) et aux développeurs intervenant sur le projet Digiassur.**  
> Il synthétise l'architecture, les règles de tarification, les standards UX et les conventions strictes du code.

---

## 📌 1. Vue d'Ensemble du Projet

**Digiassur** est la première plateforme marocaine d'InsurTech de comparaison et souscription en ligne de devis d'assurance (Courtage & Comparateur multi-compagnies agréé).

* **Domaine métier :** Assurance Automobile, Deux-Roues (Moto), Habitation (MRH), Voyage international, Complémentaire Santé, Épargne & Retraite, Loisirs & Équipements, Individuelle Accidents.
* **Public cible :** Particuliers et professionnels au Maroc.
* **Langues supportées :** Français (défaut), Arabe (`ar`, avec support RTL natif), Anglais (`en`).

---

## 🛠️ 2. Stack Technique & Architecture

| Couche | Technologies |
| :--- | :--- |
| **Framework Frontend** | React 18, TypeScript, Vite |
| **Routage** | `wouter` (routeur ultra-léger et déclaratif) |
| **Styles & CSS** | Tailwind CSS v3, Vanilla CSS personnalisé (`client/src/index.css`) |
| **Icônes** | `lucide-react` |
| **Carrousels & Sliders** | `embla-carousel-react` |
| **Composants UI Radix** | `@radix-ui/react-*` (dialog, dropdown, tabs, accordion, etc.) |
| **Internationalisation** | `LanguageContext` personnalisé (`client/src/contexts/LanguageContext.tsx`) avec support RTL |
| **Backend & API** | Node.js, Express, tRPC (starter web-db-user) |
| **Port de développement** | `http://localhost:3000` (`npm run dev`) |

---

## 📂 3. Organisation des Fichiers

```text
digiassur-front/
├── client/
│   ├── public/               # Assets statiques (logos compagnies, images hero, drapeaux, svg)
│   └── src/
│       ├── components/       # Composants réutilisables (Header, Footer, Comparateurs, Widgets)
│       │   ├── DigiassurHeader.tsx       # En-tête avec navigation produits et sélecteur de langue
│       │   ├── DigiassurFooter.tsx       # Pied de page officiel avec liens et coordonnées
│       │   ├── DevisPartnerComparator.tsx # Comparateur d'offres partenaires (AtlantaSanad, RMA, Wafa, etc.)
│       │   ├── PartnersSection.tsx       # Carrousel des partenaires assureurs
│       │   └── FloatingWidgets.tsx       # Widget flottant d'assistance
│       ├── contexts/
│       │   └── LanguageContext.tsx       # Gestion i18n (FR, AR, EN) et direction RTL
│       ├── data/
│       │   ├── motoBrands.ts             # Marques motos et liste des villes marocaines (MOROCCAN_CITIES)
│       │   ├── autoBrands.ts             # Marques et modèles automobiles marocains
│       │   └── partners.ts               # Données des compagnies partenaires
│       ├── pages/                        # Pages principales et parcours de devis
│       │   ├── Home.tsx                  # Page d'accueil générale
│       │   ├── AutoPage.tsx              # Hub Assurance Auto
│       │   ├── AutoDevisPage.tsx         # Tunnel Devis Auto multi-étapes
│       │   ├── MotoPage.tsx              # Hub Assurance Moto
│       │   ├── MotoDevisPage.tsx         # Tunnel Devis Moto
│       │   ├── HabitationPage.tsx        # Hub Assurance Habitation
│       │   ├── HabitationDevisPage.tsx   # Tunnel Devis Habitation
│       │   ├── VoyagePage.tsx            # Hub Assurance Voyage
│       │   ├── VoyageDevisPage.tsx       # Tunnel Devis Voyage
│       │   ├── SantePage.tsx             # Hub Assurance Santé
│       │   ├── SanteDevisPage.tsx        # Tunnel Devis Santé
│       │   ├── EpargnePage.tsx           # Hub Épargne & Retraite
│       │   ├── EpargneDevisPage.tsx      # Simulateur & Devis Épargne
│       │   ├── LoisirPage.tsx            # Hub Assurance Loisirs
│       │   ├── LoisirDevisPage.tsx       # Tunnel Devis Loisirs
│       │   ├── AccidentPage.tsx          # Hub Individuelle Accidents
│       │   └── AccidentDevisPage.tsx     # Tunnel Devis Accidents (Formules Pomme, Pêche, etc.)
│       ├── App.tsx                       # Déclaration des routes wouter
│       └── main.tsx                      # Point d'entrée de l'application
├── docs/                             # Documentation technique et métier détaillée
│   ├── regles_calcul_devis_auto.md   # Barème officiel ACAPS / FMSAR automobile
│   ├── regles_calcul_devis_moto.md   # Barème officiel Deux-Roues au Maroc
│   ├── ARCHITECTURE_TECHNIQUE.md     # Architecture détaillée des composants et du state
│   └── GUIDE_PARCOURS_ET_DEVIS.md    # Guide des 8 parcours devis et pièces requises
└── AGENTS.md                         # Ce présent guide pour agents IA
```

---

## 🎨 4. Charte Graphique & Design System

Tout agent IA doit rigoureusement respecter les codes couleurs et composants visuels de Digiassur :

* **Bleu Nuit Primaire (Header / Titres / Footer) :** `#153954`
* **Corail / Orange Digiassur (Boutons CTA & Accents) :** `#f48360` (ou hover `#e46e4e`)
* **Bleu Océan Secondaire :** `#4b7f9c`
* **Fond Pastel Chaud Récapitulatif :** `#fef1eb` avec bordure `border-orange-200`
* **Vert Émeraude Succès :** `bg-emerald-100 text-emerald-600` (Icônes et validation)
* **Gris de contraste :** `text-slate-800` (titres), `text-slate-600` (textes), `border-slate-200` (bordures douces)

---

## 🛡️ 5. Standard Obligatoire des Écrans de Félicitations / Confirmation

Lorsqu'un devis est finalisé (ex: `step === 2` ou étape finale), l'interface **DOIT** suivre le standard unifié :

1. **Badge Icone Central :**
   ```tsx
   <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
     <CheckCircle2 className="w-12 h-12" />
   </div>
   ```
2. **Titre Principal :**
   `text-2xl md:text-3xl font-black uppercase text-[#153954]` -> `FÉLICITATIONS, VOTRE DEVIS EST PRÊT !`
3. **Numéro Officiel de Devis :**
   Format : `N° D[Lettre]-[Chiffres]` (ex: `N° DA-...` pour Auto, `N° DM-...` pour Moto, `N° DH-...` pour Habitation, `N° DV-...` pour Voyage, `N° DS-...` pour Santé, `N° DE-...` pour Épargne, `N° DL-...` pour Loisir).
4. **Encart Récapitulatif :**
   Conteneur stylisé en `bg-[#fef1eb] p-6 rounded-2xl border border-orange-200 text-left max-w-xl mx-auto shadow-xs`.
5. **🚫 RÈGLE STRICTE SUR LE BOUTON WHATSAPP :**
   Ne **JAMAIS** réinsérer de bouton de redirection WhatsApp (`wa.me`) sur les pages de devis (supprimé explicitement sur Santé, Épargne, Loisir, etc.).
6. **Pièces Justificatives (Téléversement In-Page) :**
   Les pièces requises sont strictement calibrées par métier :
   * **Auto & Moto :** Carte Grise (Recto/Verso), Permis de conduire (Recto/Verso), CIN.
   * **Habitation :** CIN (Recto & Verso) uniquement.
   * **Santé :** CIN (Recto & Verso) uniquement.
   * **Accident :** CIN (Recto & Verso) uniquement.
   * **Loisir :** CIN (Recto & Verso) uniquement.
   * **Voyage :** CIN (Recto & Verso) **ET** Passeport international (page identité photo).
7. **Boutons d'Action Inférieurs (Space-Between) :**
   * À gauche : `Retour à la page [Produit]` (`ArrowLeft`, fond `bg-slate-100 text-slate-700`).
   * À droite : Bouton de modification (`RotateCcw`) et bouton de transmission `Envoyer mes documents` (`Send`, fond `#153954` ou `#f48360`).

---

## 🧮 6. Moteurs de Calcul & Barèmes Marocains

1. **Assurance Auto :**
   * Régie par le barème officiel marocain ACAPS/FMSAR.
   * Dépend de : Puissance fiscale (CV), Carburant (Essence/Diesel), Usage (Tourisme / Commercial), Âge du permis, Zone géographique (Casablanca/Rabat vs autres).
   * Formules : Tiers Simple (RC + DR + Défense), Tiers Étendu (Vol/Incendie + Bris de glaces), Tous Risques (avec franchise 2% ou 5%).
   * Document de référence : `docs/regles_calcul_devis_auto.md`.

2. **Assurance Moto :**
   * Catégories 1 à 5 selon la cylindrée (< 50cc, 50-125cc, > 125cc, 3 roues).
   * Responsabilité Civile obligatoire + Défense & Recours offerte.
   * Document de référence : `docs/regles_calcul_devis_moto.md`.

3. **Épargne & Retraite :**
   * Calcul d'intérêts composés capitalisés mensuellement à un taux annuel net de **4.5%**.
   * Formule : $V_F = PMT \times \frac{(1 + i)^n - 1}{i}$ avec $i = 0.045 / 12$ et $n = \text{durée en années} \times 12$.

4. **Assurance Voyage :**
   * Couverture conforme aux exigences consulaires Visa Schengen (Plafond médical minimum garanti de **30 000 € / 300 000 DHS**).
   * Tarification calculée au prorata de la durée exacte du séjour (7j, 15j, 1 mois, 3 mois, annuel multivoages).

---

## ⚠️ 7. Commandements & Bonnes Pratiques pour les Agents IA

* ✅ **Toujours lancer `npx tsc --noEmit`** depuis le répertoire `client/` pour valider les types avant de finaliser une tâche.
* ✅ **Conserver les traductions i18n :** Si vous modifiez un texte clé, utilisez `t("cle.traduction", "Texte français par défaut")` afin de préserver la compatibilité Arabe et Anglais.
* ❌ **Ne jamais exécuter de commande `cd` :** Spécifiez toujours l'argument `Cwd`.
* ❌ **Ne pas créer de fichiers temporaires polluants :** Ne laissez pas de fichiers `.bak`, `.tmp` ou de dossiers `scratch/` dans le repository.
* ❌ **Ne pas toucher au serveur dev en arrière-plan :** Le serveur Vite tourne déjà sur le port 3000 (`npm run dev`), ne lancez pas de second serveur.
