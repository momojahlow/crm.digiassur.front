# 🏍️ Règles et Formules de Calcul de Devis Assurance Moto & Deux-Roues

Ce document définit les règles et algorithmes officiels de tarification de l'assurance Deux-Roues et Tricycles à moteur au Maroc (Barème officiel ACAPS / FMSAR).

---

## 📑 Sommaire
1. [Responsabilité Civile (RC de base Moto)](#1-responsabilité-civile-rc-de-base-moto)
2. [Garanties Incluses](#2-garanties-incluses)
3. [Coefficients de Durée (Fractionnement)](#3-coefficients-de-durée-fractionnement)
4. [Régime Fiscal Marocain (Taxes & Prélèvements)](#4-régime-fiscal-marocain-taxes--prélèvements)
5. [Tableau Récapitulatif des Primes Annuelles TTC](#5-tableau-récapitulatif-des-primes-annuelles-ttc)
6. [Parcours Devis Moto (/moto/devis-moto)](#6-parcours-devis-moto-motodevis-moto)

---

## 1. Responsabilité Civile (RC de base Moto)

La prime annuelle nette de la **Responsabilité Civile (RC)** est obligatoire au Maroc et fixée strictement par la catégorie et la puissance fiscale :

| Catégorie | Code interne (`puissance_fiscale`) | Description technique & Cylindrée | Exemples de modèles | Prime Nette Annuelle (RC) |
| :---: | :---: | :--- | :--- | :---: |
| **Catégorie 1** | `1` | **Vélomoteurs $\le$ 50 cm³ et vitesse $\le$ 60 Km/h** | Mobylettes, petits cyclomoteurs 50cc standards | **602.00 DHS** |
| **Catégorie 2** | `2` | **Vélomoteurs $\le$ 50 cm³ et vitesse > 60 Km/h** | Scooters 50cc rapides / débridés | **1 217.00 DHS** |
| **Catégorie 3** | `3` | **Vélo à 2 Roues avec Cylindrée entre 50 et 125 cm³** | Honda SH 125, PCX 125, Yamaha NMAX 125, SYM Symphony 125 | **1 581.00 DHS** |
| **Catégorie 4** | `4` | **Vélo à 2 Roues avec Cylindrée $\ge$ 125 cm³** | Yamaha TMAX, Honda X-ADV, Kawasaki Z900, BMW R1250 GS | **2 216.00 DHS** |
| **Catégorie 5** | `5` | **Vélo à 3 Roues avec Cylindrée > 125 cm³** | Tricycles motorisés, Piaggio MP3, Trikes, Triporteurs | **1 883.00 DHS** |

> [!NOTE]
> **Correspondance technique (`puissance_fiscale`) :**
> En réalité au Maroc, les cyclomoteurs $\le$ 50 cm³ n'ont pas de « 1 CV » sur leur carte grise. La variable `puissance_fiscale` (valeurs 1 à 5) est une clé de correspondance interne au développement afin de lever les blocages algorithmiques et assurer la liaison avec le barème RC. Côté interface utilisateur, seul le libellé de la catégorie technique est affiché, sans mention de puissance fiscale fictive.


### Algorithme de sélection de la RC Moto
```javascript
var RC = 0;
if (puissance_fiscale == 1) {
  RC = 602; // Vélomoteurs <= 50 cm3 et <= 60 Km/h
} else if (puissance_fiscale == 2) {
  RC = 1217; // Vélomoteurs <= 50 cm3 et > 60 Km/h
} else if (puissance_fiscale == 3) {
  RC = 1581; // Vélo à 2 Roues ac Cylindrée entre 50 et 125 cm3
} else if (puissance_fiscale == 4) {
  RC = 2216; // Vélo à 2 Roues ac Cylindrée >= 125 cm3
} else if (puissance_fiscale == 5) {
  RC = 1883; // Vélo à 3 Roues ac Cylindrée > 125 cm3
}
```

---

## 2. Garanties Incluses

Pour l'assurance moto, la formule Digiassur (**Moto Run**) comprend **exclusivement** :
1. **Responsabilité Civile (RC)** : Couvre les dommages corporels et matériels causés aux tiers lors de la circulation (Obligatoire).
2. **Défense et Recours (DR)** : Prise en charge de la défense juridique et du recours amiable ou judiciaire contre le tiers responsable (**Toujours incluse d'office à 0.00 DH**).

> [!IMPORTANT]
> **Aucune autre garantie n'est incluse ni requise** (pas d'assistance remorquage, pas de dommages matériel ou vol/incendie dans la formule standard moto).

---

## 3. Coefficients de Durée (Fractionnement)

La prime nette s'ajuste selon la périodicité choisie :

| Périodicité | Durée | Coefficient (Ratio) | Formule Prime Nette |
| :--- | :---: | :---: | :--- |
| **Annuelle** | 12 mois | **1.00** | $RC = RC_{\text{annuelle}} \times 1.00$ |
| **Semestrielle** | 6 mois | **0.54** | $RC = RC_{\text{annuelle}} \times 0.54$ |
| **Trimestrielle** | 3 mois | **0.27** | $RC = RC_{\text{annuelle}} \times 0.27$ |

---

## 4. Régime Fiscal Marocain (Taxes & Prélèvements)

Sur la prime nette RC calculée s'appliquent les prélèvements fiscaux et parafiscaux légaux obligatoires :

1. **Taxe sur les conventions d'assurance (Taxe RC)** :
   $$\text{Taxe}_{RC} = RC \times 16.5\%$$
2. **Taxe EVCAT (Fonds de Solidarité contre les Événements Catastrophiques - FSEC)** :
   $$\text{EVCAT} = RC \times 4.5\%$$
3. **Contribution FGA / CNPAC (Sécurité Routière)** :
   $$\text{CNPAC} = \mathbf{17.00\text{ DH}}\quad\text{(Forfait fixe légal)}$$
4. **Prime Totale TTC** :
   $$\text{Prime Totale TTC} = RC + \text{Taxe}_{RC} + \text{EVCAT} + \text{CNPAC}$$

---

## 5. Tableau Récapitulatif des Primes Annuelles TTC

| Puissance / Catégorie | RC Nette | Taxe RC (16.5%) | EVCAT (4.5%) | CNPAC | **Prime Totale Annuelle TTC** |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **1 : Vélomoteurs $\le$ 50 cm³ ($\le$ 60 Km/h)** | 602.00 DH | 99.33 DH | 27.09 DH | 17.00 DH | **745.42 DHS TTC** |
| **2 : Vélomoteurs $\le$ 50 cm³ (> 60 Km/h)** | 1 217.00 DH | 200.81 DH | 54.77 DH | 17.00 DH | **1 489.57 DHS TTC** |
| **3 : 2 Roues 50 à 125 cm³** | 1 581.00 DH | 260.87 DH | 71.15 DH | 17.00 DH | **1 930.01 DHS TTC** |
| **4 : 2 Roues $\ge$ 125 cm³ (Grosses cylindrées)** | 2 216.00 DH | 365.64 DH | 99.72 DH | 17.00 DH | **2 698.36 DHS TTC** |
| **5 : 3 Roues (Tricycles > 125 cm³)** | 1 883.00 DH | 310.70 DH | 84.74 DH | 17.00 DH | **2 295.43 DHS TTC** |

---

## 6. Parcours Devis Moto (`/moto/devis-moto`)

Le tunnel de souscription moto comprend 4 étapes :

1. **Étape 1 : Coordonnées**
   - Nom complet, Téléphone, Email, Ville de résidence.
2. **Étape 2 : Votre Moto**
   - Marque (sélection dynamique)
   - Modèle (filtré selon la marque)
   - Catégorie & Puissance fiscale (1 à 5 selon le barème officiel)
   - Immatriculation marocaine (Numéro | Lettre arabe & française | N° Préfecture)
   - Date de 1ère mise en circulation, Date d'effet du contrat, Valeur à neuf (DHS)
3. **Étape 3 : Devis & Formule**
   - Formule unique **Moto Run** avec uniquement **Responsabilité Civile** et **Défense & Recours (0 DH)**
   - Choix de la durée (1 an, 6 mois, 3 mois)
   - Affichage transparent du détail des taxes ACAPS (RC, Taxe 16.5%, EVCAT 4.5%, CNPAC 17 DH)
4. **Étape 4 : Confirmation & Documents** (Identique à l'étape finale Automobile)
   - Badge vert de succès et référence devis Digiassur
   - Documents requis (**CIN**, **Carte Grise**, **Permis de conduire**) **ouverts d'office**
   - Boutons de bas de page en `space-between` :
     - À gauche : `← Retour à la page Moto`
     - À droite : `Envoyer mes documents ➔`
