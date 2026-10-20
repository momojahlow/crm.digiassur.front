# 📋 Guide des Parcours Devis & Pièces Justificatives

Ce guide détaille les 8 parcours de devis Digiassur, leurs règles de saisie, les pièces requises pour l'émission du contrat et les numérotations officielles.

---

## 📑 Récapitulatif Global

| Produit | URL du Devis | Préfixe Devis | Pièces Justificatives Requises | Bouton WhatsApp ? |
| :--- | :--- | :---: | :--- | :---: |
| **Automobile** | `/auto/devis-auto` | `N° DA-...` | Carte Grise (R/V), Permis (R/V), CIN (R/V) | ❌ Non |
| **Deux-Roues (Moto)** | `/moto/devis-moto` | `N° DM-...` | Carte Grise (R/V), Permis (R/V), CIN (R/V) | ❌ Non |
| **Habitation (MRH)** | `/habitation/obtenir-un-devis` | `N° DH-...` | **CIN uniquement (Recto et Verso)** | ❌ Non |
| **Santé Complémentaire** | `/sante/obtenir-un-devis` | `N° DS-...` | **CIN uniquement (Recto et Verso)** | ❌ Non |
| **Individuelle Accident** | `/accident/devis-accident` | `N° DA-...` | **CIN uniquement (Recto et Verso)** | ❌ Non |
| **Loisirs & Chasse** | `/loisir/obtenir-un-devis` | `N° DL-...` | **CIN uniquement (Recto et Verso)** | ❌ Non |
| **Voyage International** | `/voyage/obtenir-un-devis` | `N° DV-...` | **CIN (Recto/Verso) + Passeport international** | ❌ Non |
| **Épargne & Retraite** | `/epargne/obtenir-un-devis` | `N° DE-...` | CIN (R/V), RIB Bancaire | ❌ Non |

---

## 🚗 1. Assurance Automobile (`/auto/devis-auto`)
* **Tunnel en 3 étapes :**
  1. Caractéristiques du véhicule (Marque, Modèle, Carburant, Puissance fiscale, Date de mise en circulation, Valeur vénale).
  2. Profil du conducteur (Âge, Ville de circulation, Bonus/Malus, Ancienneté du permis).
  3. Comparateur d'offres partenaires & validation.
* **Pièces à fournir :**
  * Carte Grise (Recto et Verso)
  * Permis de conduire (Recto et Verso)
  * Carte d'Identité Nationale (CIN)

---

## 🏍️ 2. Assurance Moto & Scooter (`/moto/devis-moto`)
* **Barème officiel par catégorie :**
  * Cat. 1 : Cyclomoteurs $\le$ 50 cm³ standard (602 DH/an)
  * Cat. 2 : Cyclomoteurs $\le$ 50 cm³ rapides (> 60 km/h) (1 217 DH/an)
  * Cat. 3 : Motos & Scooters 50 à 125 cm³ (1 581 DH/an)
  * Cat. 4 : Grosses cylindrées $\ge$ 125 cm³ (2 216 DH/an)
  * Cat. 5 : Tricycles & Triporteurs (1 883 DH/an)
* **Pièces à fournir :**
  * Carte Grise ou récépissé d'immatriculation
  * Permis moto (ou dispense si 50cc)
  * CIN (Recto et Verso)

---

## 🏠 3. Multirisque Habitation (`/habitation/obtenir-un-devis`)
* **Caractéristiques saisies :**
  * Statut (Propriétaire occupant, Locataire)
  * Type de bien (Appartement, Villa, Riad)
  * Nombre de pièces et superficie
  * Valeur estimée du bâtiment et valeur du contenu mobilier
* **Confirmation & Documents :**
  * Numéro officiel généré : `N° DH-XXXXXX`
  * **Pièce requise : Carte d'Identité Nationale (CIN Recto & Verso) uniquement.**

---

## 🏥 4. Complémentaire Santé (`/sante/obtenir-un-devis`)
* **Caractéristiques saisies :**
  * Couverture (Individuelle, Famille, Senior)
  * Taux de remboursement souhaité (80%, 90%, 100%)
  * Plafond annuel médical
* **Confirmation & Documents :**
  * Numéro officiel généré : `N° DS-XXXXXX`
  * **Pièce requise : Carte d'Identité Nationale (CIN Recto & Verso) uniquement.**

---

## ✈️ 5. Assurance Voyage & Schengen (`/voyage/obtenir-un-devis`)
* **Tunnel en 5 étapes :**
  1. Type de séjour & destination (Zone Schengen, Monde entier, etc.)
  2. Coordonnées de l'assuré et dates du séjour
  3. Options complémentaires (Option véhicule avec carte verte internationale)
  4. Récapitulatif avec attestation conforme Visa Schengen (Plafond 30 000 € / 300 000 DHS)
  5. Écran de félicitations et transmission des pièces
* **Confirmation & Documents :**
  * Numéro officiel généré : `N° DV-XXXXXX`
  * **Pièces requises :**
    1. Carte d'Identité Nationale (CIN Recto & Verso)
    2. Passeport international (Page d'identité photo)

---

## 🎯 6. Individuelle Accidents (`/accident/devis-accident`)
* **Formules proposées :**
  * Formule Pomme (Décès 50 000 DH, Frais médicaux 30 000 DH, etc.)
  * Formule Pêche
  * Options : Assistance et Écoute psychologique
* **Confirmation & Documents :**
  * Numéro officiel généré : `N° DA-XXXXXX`
  * **Pièce requise : Carte d'Identité Nationale (CIN Recto & Verso) uniquement.**

---

## 🎣 7. Assurance Loisirs & Chasse (`/loisir/obtenir-un-devis`)
* **Catégories couvertes :** Chasse, Tir sportif, Activités nautiques, Équitation, Matériel musical/audiovisuel.
* **Confirmation & Documents :**
  * Numéro officiel généré : `N° DL-XXXXXX`
  * **Pièce requise : Carte d'Identité Nationale (CIN Recto & Verso) uniquement.**

---

## 💰 8. Épargne & Retraite (`/epargne/obtenir-un-devis`)
* **Simulateur en temps réel :**
  * Versement mensuel (slider 500 DH à 20 000 DH)
  * Durée envisagée (slider 5 ans à 30 ans)
  * Calcul composé automatique à 4.5% net annuel
* **Confirmation & Documents :**
  * Numéro officiel généré : `N° DE-XXXXXX`
  * Pièces : CIN (Recto & Verso) et RIB bancaire pour prélèvements programmés.

---

## 🏢 9. Entreprises & Professionnels (`/entreprise`)
* **Public cible :** TPE, PME, Grandes Entreprises, Industriels, Commerçants et Professions libérales.
* **Solutions couvertes :**
  * Accidents du Travail (Obligation légale Loi 18-12)
  * Flottes Automobiles & Utilitaires (dès 3 véhicules)
  * Multirisque Professionnelle & Industrielle (Bureaux, Entrepôts, Stocks, Perte d'exploitation)
  * Santé & Prévoyance Groupe pour les salariés
  * Responsabilité Civile Exploitation, Professionnelle et Décennale BTP
  * Transport & Marchandises
* **Confirmation :**
  * Numéro officiel de dossier : `N° B2B-XXXXXX`
  * Prise en charge par un Chargé de Comptes Grands Comptes sous 24h ouvrées.

---

## 🌍 10. Marocains Résidant à l'Étranger — MRE (`/marocains-etranger`)
* **Public cible :** Communauté marocaine résidant en France, Espagne, Belgique, Italie, Allemagne, Canada, Golfe, etc.
* **Garanties spécifiques :**
  * Assistance Rapatriement de corps et sanitaire 24/7 vers le Maroc
  * Assurance Résidence Secondaire inoccupée au Maroc (sans franchise d'absence)
  * Assurance Temporaire Véhicule & Transit / Carte Verte (traversées maritimes)
  * Prise en charge des urgences et soins en cliniques privées au Maroc
* **Confirmation :**
  * Numéro officiel généré : `N° MRE-XXXXXX`
  * Prise en charge dédiée par le Pôle Spécial Diaspora.

---

## 🤝 11. Programme Partenaires & Affiliation (`/affiliation`)
* **Public cible :** Courtiers indépendants, jeunes auto-entrepreneurs, agents commerciaux, apporteurs d'affaires.
* **Outils & Fonctionnalités clés :**
  * Gestion autonome d'un portefeuille de prospects et clients
  * Suivi des polices souscrites et alertes d'échéances pour commissions récurrentes
  * Simulateur interactif de commissions mensuelles (jusqu'à 15% de commission nette)
  * Paiement automatique des gains par virement bancaire chaque fin de mois
  * Kit marketing & liens trackés personnalisés
* **Confirmation :**
  * Numéro d'affilié généré : `N° AFF-XXXXXX`
  * Activation du compte et remise des accès par le Responsable Réseau Digiassur.
