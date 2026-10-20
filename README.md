# 🇲🇦 Digiassur — Comparateur & Courtier d'Assurance en Ligne au Maroc

Bienvenue sur le dépôt officiel du frontend **Digiassur**, la plateforme InsurTech de référence au Maroc pour la comparaison et la souscription immédiate de contrats d'assurance.

---

## 🚀 Démarrage Rapide

### Prérequis
* Node.js (version 18 ou supérieure recommandée)
* npm ou pnpm

### Installation & Lancement
```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement (Port 3000)
npm run dev

# Vérification des types TypeScript
npm run check
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).

---

## 🌟 Gamme de Produits & Tunnels de Devis

| Branche d'Assurance | Page d'Accueil Produit | Tunnel Devis / Souscription |
| :--- | :--- | :--- |
| **Automobile** | [`/auto`](http://localhost:3000/auto) | [`/auto/devis-auto`](http://localhost:3000/auto/devis-auto) |
| **Moto & Scooters** | [`/moto`](http://localhost:3000/moto) | [`/moto/devis-moto`](http://localhost:3000/moto/devis-moto) |
| **Habitation (MRH)** | [`/habitation`](http://localhost:3000/habitation) | [`/habitation/obtenir-un-devis`](http://localhost:3000/habitation/obtenir-un-devis) |
| **Voyage International** | [`/voyage`](http://localhost:3000/voyage) | [`/voyage/obtenir-un-devis`](http://localhost:3000/voyage/obtenir-un-devis) |
| **Complémentaire Santé** | [`/sante`](http://localhost:3000/sante) | [`/sante/obtenir-un-devis`](http://localhost:3000/sante/obtenir-un-devis) |
| **Épargne & Retraite** | [`/epargne`](http://localhost:3000/epargne) | [`/epargne/obtenir-un-devis`](http://localhost:3000/epargne/obtenir-un-devis) |
| **Loisirs & Chasse** | [`/loisir`](http://localhost:3000/loisir) | [`/loisir/obtenir-un-devis`](http://localhost:3000/loisir/obtenir-un-devis) |
| **Individuelle Accident** | [`/accident`](http://localhost:3000/accident) | [`/accident/devis-accident`](http://localhost:3000/accident/devis-accident) |
| **Entreprises & PME** | [`/entreprise`](http://localhost:3000/entreprise) | Étude B2B en ligne (Loi 18-12, Flottes, MRP) |
| **Marocains de l'Étranger (MRE)** | [`/marocains-etranger`](http://localhost:3000/marocains-etranger) | Rapatriement, Résidence secondaire, Transit |
| **Programme Affiliation** | [`/affiliation`](http://localhost:3000/affiliation) | Espace Partenaire, Portefeuille prospects & Commissions |

---

## 📚 Documentation Technique

Le dossier [`docs/`](file:///d:/Herd/digiassur-front/docs) contient toutes les documentations spécialisées :

* **[Guide pour Agents IA & Développeurs (`AGENTS.md`)](file:///d:/Herd/digiassur-front/AGENTS.md)** : Guide exhaustif des conventions de code, design tokens, règles et pièges à éviter.
* **[Architecture Technique (`docs/ARCHITECTURE_TECHNIQUE.md`)](file:///d:/Herd/digiassur-front/docs/ARCHITECTURE_TECHNIQUE.md)** : Routage wouter, internationalisation i18n/RTL, composants partagés.
* **[Guide des Parcours Devis & Pièces (`docs/GUIDE_PARCOURS_ET_DEVIS.md`)](file:///d:/Herd/digiassur-front/docs/GUIDE_PARCOURS_ET_DEVIS.md)** : Spécifications des formulaires et pièces d'identité requises.
* **[Règles de Calcul Devis Auto (`docs/regles_calcul_devis_auto.md`)](file:///d:/Herd/digiassur-front/docs/regles_calcul_devis_auto.md)** : Barème officiel marocain ACAPS/FMSAR.
* **[Règles de Calcul Devis Moto (`docs/regles_calcul_devis_moto.md`)](file:///d:/Herd/digiassur-front/docs/regles_calcul_devis_moto.md)** : Barème des 5 catégories deux-roues au Maroc.

---

## 🎨 Charte Graphique Digiassur

* **Bleu Nuit :** `#153954`
* **Orange Corail :** `#f48360`
* **Bleu Océan :** `#4b7f9c`
* **Fond Pastel Récapitulatif :** `#fef1eb`
* **Vert Succès :** `bg-emerald-100 text-emerald-600`

---

## 🤝 Compagnies d'Assurance Partenaires

Digiassur compare en temps réel les offres des grands acteurs agréés par l'ACAPS :
* **AtlantaSanad Assurance**
* **RMA (Royale Marocaine d'Assurance)**
* **Wafa Assurance**
* **Sanlam Maroc**
* **AXA Assurance Maroc**
