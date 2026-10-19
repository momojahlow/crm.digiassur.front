# 📋 Règles et Formules de Calcul de Devis Assurance Automobile

Ce document définit les règles et algorithmes officiels de tarification de l'assurance automobile au Maroc.
Le calcul est entièrement **modulaire et fondé sur les garanties souscrites** (RC, DR, PTA, INC_VOL_BDG, DC, TC), la durée du contrat et la fiscalité légale.

---

## 📑 Sommaire
1. [Responsabilité Civile (RC de base)](#1-responsabilité-civile-rc-de-base)
2. [Calcul de la Valeur Vénale (Décote & Dépréciation du Véhicule)](#2-calcul-de-la-valeur-vénale-décote--dépréciation-du-véhicule)
3. [Garanties Annexes (GA)](#3-garanties-annexes-ga)
   - [Défense et Recours (DR)](#défense-et-recours-dr)
   - [Personnes Transportées (PTA)](#personnes-transportées-pta)
   - [Incendie, Vol et Bris de Glace (INC_VOL_BDG)](#incendie-vol-et-bris-de-glace-inc_vol_bdg)
   - [Dommages Collision (DC)](#dommages-collision-dc)
   - [Tierce Complète (TC)](#tierce-complète-tc)
4. [Coefficients de Durée (Fractionnement)](#4-coefficients-de-durée-fractionnement)
5. [Régime Fiscal Marocain (Taxes & Prélèvements)](#5-régime-fiscal-marocain-taxes--prélèvements)
6. [Formule Algorithmique Complète](#6-formule-algorithmique-complète)
7. [Exemples de Calcul Chiffrés](#7-exemples-de-calcul-chiffrés)

---

## 1. Responsabilité Civile (RC de base)

La prime nette annuelle de la **Responsabilité Civile (RC)** est obligatoire et fixée selon l'énergie et la puissance fiscale (CV) du véhicule.

### 🚗 Barème Diesel
| Puissance Fiscale (CV) | Prime Nette Annuelle (RC) |
| :--- | :--- |
| **≤ 4 CV** | **1 840 DH** |
| **5 CV** | **2 238 DH** |
| **6 CV ou 7 CV** | **2 429 DH** |
| **≥ 8 CV** | **3 490 DH** |

### ⚡ Barème Essence & Autres (Hybride, Électrique)
| Puissance Fiscale (CV) | Prime Nette Annuelle (RC) |
| :--- | :--- |
| **≤ 6 CV** | **1 840 DH** |
| **7 CV ou 8 CV** | **2 238 DH** |
| **9 CV ou 10 CV** | **2 429 DH** |
| **≥ 11 CV** | **3 490 DH** |

```javascript
var RC = 0;
switch (energie) {
  case "Diesel":
    if (puissance_fiscale <= 4) RC = 1840;
    else if (puissance_fiscale == 5) RC = 2238;
    else if (puissance_fiscale == 6 || puissance_fiscale == 7) RC = 2429;
    else RC = 3490;
    break;
  default: // Essence, Hybride, Electrique
    if (puissance_fiscale <= 6) RC = 1840;
    else if (puissance_fiscale == 7 || puissance_fiscale == 8) RC = 2238;
    else if (puissance_fiscale == 9 || puissance_fiscale == 10) RC = 2429;
    else RC = 3490;
    break;
}
```

### 🎯 Application du Coefficient Bonus-Malus (CRM)
La prime nette de RC peut être ajustée par le **Coefficient de Réduction-Majoration (CRM)** selon l'historique du conducteur (réglementé par l'arrêté ministériel n° 1053-06) :

$$\text{RC}_{\text{nette}} = \text{RC}_{\text{base}} \times \text{CRM}$$

| Coefficient (CRM) | Statut Conducteur | Impact sur la RC |
| :--- | :--- | :--- |
| **0.50** | Bonus maximal (5 ans sans sinistre) | **-50 %** |
| **0.60** | Bonus 40% | **-40 %** |
| **0.70** | Bonus 30% | **-30 %** |
| **0.80** | Bonus 20% | **-20 %** |
| **0.90** | Bonus 10% | **-10 %** |
| **1.00** | Standard (Neutre / Aucun sinistre récent) | **Tarif plein (100%)** |
| **1.20** | Malus (1 sinistre responsable) | **+20 %** |
| **1.40** | Jeune permis (< 2 ans) ou malus aggravé | **+40 %** |

---

## 2. Calcul de la Valeur Vénale (Décote & Dépréciation du Véhicule)

La **Valeur Vénale** correspond à la valeur marchande du véhicule dépréciée par le temps à partir de sa **Valeur à Neuf (`val_neuf`)** et de sa **Date de 1ère mise en circulation (`date_mise`)**.

### 📉 Règle de Décote Mensuelle Progressive :
* **Mois 1 à 12 (1ère année)** : Décote mensuelle composée de **1.5% par mois** (`com = 0.015`).
* **Mois 13 à 54 (jusqu'à 4.5 ans)** : Décote mensuelle composée de **1.0% par mois** (`com = 0.010`).
* **Au-delà de 54 mois (> 4.5 ans)** : Plancher forfaitaire fixé à **54% de la valeur à neuf** (`val_neuf * 0.54`).

### Algorithme JavaScript Officiel :
```javascript
function calculerValeurVenale(date_mise_en_circulation, valeur_a_neuf) {
  var date_mise = new Date(date_mise_en_circulation);
  var today = new Date();
  var val_neuf = parseFloat(valeur_a_neuf) || 0;
  var com = 0.015;
  var val_venal = val_neuf;

  if (date_mise_en_circulation && val_neuf > 0) {
    // Calcul de l'écart en mois
    var months = (today.getFullYear() - date_mise.getFullYear()) * 12 + (today.getMonth() - date_mise.getMonth());
    if (today.getDate() < date_mise.getDate()) months--;
    months = Math.max(0, months);

    if (months <= 54) {
      for (var i = 1; i <= months; i++) {
        val_venal = val_venal - (val_venal * com);
        if (i === 12) com = 0.01; // Passage à 1% après la première année
      }
    } else {
      val_venal = val_neuf * 0.54; // Plancher à 54%
    }

    return Math.round(val_venal);
  }
  return val_neuf;
}
```

| Âge du Véhicule | Décote Appliquée | Valeur Vénale Résiduelle |
| :--- | :--- | :--- |
| **0 mois (Neuf)** | 0 % | **100 %** de la valeur à neuf |
| **12 mois (1 an)** | 1.5% par mois composé | $\approx$ **83.4 %** de la valeur à neuf |
| **24 mois (2 ans)** | 1.0% par mois composé | $\approx$ **73.9 %** de la valeur à neuf |
| **36 mois (3 ans)** | 1.0% par mois composé | $\approx$ **65.5 %** de la valeur à neuf |
| **48 mois (4 ans)** | 1.0% par mois composé | $\approx$ **58.1 %** de la valeur à neuf |
| **≥ 54 mois (> 4.5 ans)** | Forfait plancher fixe | **54.0 %** de la valeur à neuf |

---

## 3. Garanties Annexes (GA)

Le total des Garanties Annexes (`GA`) est la somme des garanties souscrites :

$$\text{GA} = \text{DR} + \text{PTA} + \text{INC\_VOL\_BDG} + \text{DC} + \text{TC}$$

### Défense et Recours (DR)
* **Montant** : `DR = 0;`
* **Règle** : Incluse d'office par défaut avec la Responsabilité Civile sans surcoût.

### Personnes Transportées (PTA)
* **Montant** : `PTA = 200;` *(ou 0 si non souscrite)*
* **Règle** : Couvre les dommages corporels des passagers et du conducteur.

### Incendie, Vol et Bris de Glace (INC_VOL_BDG)
* **Montant** : `INC_VOL_BDG = 400;` *(ou 0 si non souscrite)*
* **Règle** : Pack couvrant le vol du véhicule, l'incendie/explosion et le bris de glaces.

### Dommages Collision (DC)
* **Règle** : Calculé en fonction de la valeur à neuf (`valeur_neuf`) du véhicule :
```javascript
var DC = 0;
if (inclure_DC) {
  if (parseFloat(valeur_neuf) <= 200000) {
    DC = 350;
  } else {
    DC = 500;
  }
}
```

| Valeur à Neuf (DH) | Prime DC |
| :--- | :--- |
| **≤ 200 000 DH** | **350 DH** |
| **> 200 000 DH** | **500 DH** |

---

### Tierce Complète (TC)
* **Règle** : Barème par paliers progressifs selon la valeur à neuf (`valeur_neuf`), et au-delà de 500 000 DH à un taux proportionnel de 0.7% :

```javascript
var TC = 0;
if (inclure_TC) {
  if (parseFloat(valeur_neuf) <= 100000) TC = 800;
  else if (valeur_neuf <= 150000) TC = 950;
  else if (valeur_neuf <= 200000) TC = 1275;
  else if (valeur_neuf <= 300000) TC = 1750;
  else if (valeur_neuf <= 400000) TC = 2450;
  else if (valeur_neuf <= 500000) TC = 3150;
  else TC = (valeur_neuf * 0.7) / 100;
}
```

| Palier Valeur à Neuf (DH) | Prime Nette TC (DH) |
| :--- | :--- |
| **≤ 100 000 DH** | **800 DH** |
| **100 001 à 150 000 DH** | **950 DH** |
| **150 001 à 200 000 DH** | **1 275 DH** |
| **200 001 à 300 000 DH** | **1 750 DH** |
| **300 001 à 400 000 DH** | **2 450 DH** |
| **400 001 à 500 000 DH** | **3 150 DH** |
| **> 500 000 DH** | **0.7% de la valeur à neuf** : `(valeur_neuf * 0.7) / 100` |

---

## 4. Coefficients de Durée (Fractionnement)

La prime nette (`RC` et `GA`) est ajustée selon la période de couverture :

| Durée | Ratio / Multiplicateur | Règle de Calcul |
| :--- | :--- | :--- |
| **Annuelle (1 an)** | **1.00 (100%)** | `RC = RC * 1; GA = GA * 1;` |
| **Semestrielle (6 mois)** | **0.54 (54%)** | `RC = RC * 0.54; GA = GA * 0.54;` |
| **Trimestrielle (3 mois)** | **0.27 (27%)** | `RC = RC * 0.27; GA = GA * 0.27;` |

---

## 5. Régime Fiscal Marocain (Taxes & Prélèvements)

Les taxes légales obligatoires applicables sur chaque quittance sont :

| Taxe | Taux / Assiette | Formule JavaScript |
| :--- | :--- | :--- |
| **Taxe sur RC** | **16.5 %** sur la prime RC nette | `var Taxe_RC = (RC * 16.5) / 100;` |
| **Taxe sur GA** | **15.0 %** sur la prime GA nette | `var Taxe_GA = (GA * 15) / 100;` |
| **EVCAT** (Fonds Événements Catastrophiques) | **4.5 %** sur RC + **2.5 %** sur GA | `var EVCAT = ((RC * 4.5) / 100) + ((GA * 2.5) / 100);` |
| **CNPAC** (Prévention Routière) | Montant forfaitaire fixe | `var CNPAC = 17;` |

---

## 6. Formule Algorithmique Complète

```javascript
function calculerDevisAuto(params) {
  var energie = params.energie;
  var puissance_fiscale = parseInt(params.puissance_fiscale);
  var valeur_neuf = parseFloat(params.valeur_neuf) || 0;
  var date_mise_en_circulation = params.date_mise_en_circulation;
  var crm = parseFloat(params.crm) || 1.0;
  var duree = params.duree || "annuel"; // "annuel", "semestriel", "trimestriel"

  // Options de garanties
  var inclure_PTA = params.inclure_PTA || false;
  var inclure_INC_VOL_BDG = params.inclure_INC_VOL_BDG || false;
  var inclure_DC = params.inclure_DC || false;
  var inclure_TC = params.inclure_TC || false;

  // Calcul dynamique de la Valeur Vénale (décote mensuelle progressive et plancher 54%)
  var valeur_venale = valeur_neuf;
  if (date_mise_en_circulation && valeur_neuf > 0) {
    var date_mise = new Date(date_mise_en_circulation);
    var today = new Date();
    var months = (today.getFullYear() - date_mise.getFullYear()) * 12 + (today.getMonth() - date_mise.getMonth());
    if (today.getDate() < date_mise.getDate()) months--;
    months = Math.max(0, months);

    var com = 0.015;
    if (months <= 54) {
      for (var i = 1; i <= months; i++) {
        valeur_venale = valeur_venale - (valeur_venale * com);
        if (i === 12) com = 0.01;
      }
    } else {
      valeur_venale = valeur_neuf * 0.54;
    }
    valeur_venale = Math.round(valeur_venale);
  }

  // 1. Calcul RC de base selon énergie et puissance fiscale, ajustée par le CRM
  var RC_base = 0;
  switch (energie) {
    case "Diesel":
      if (puissance_fiscale <= 4) RC_base = 1840;
      else if (puissance_fiscale == 5) RC_base = 2238;
      else if (puissance_fiscale == 6 || puissance_fiscale == 7) RC_base = 2429;
      else RC_base = 3490;
      break;
    default:
      if (puissance_fiscale <= 6) RC_base = 1840;
      else if (puissance_fiscale == 7 || puissance_fiscale == 8) RC_base = 2238;
      else if (puissance_fiscale == 9 || puissance_fiscale == 10) RC_base = 2429;
      else RC_base = 3490;
      break;
  }
  var RC = RC_base * crm;

  // 2. Calcul des Garanties Annexes (GA)
  var DR = 0; // Défense et Recours toujours incluse d'office (0 DH)
  
  // Convention officielle des 3 Formules :
  // • Start : DR = 0, PTA = 0 DH (uniquement RC obligatoire + DR 0 DH) -> GA = 0 DH
  // • Go    : DR = 0, PTA = 125 DH, INC_VOL_BDG = 400 DH, DC = (VN<=200k ? 350 : 500) -> GA = DR+PTA+INC_VOL_BDG+DC
  // • Fast (Tous Risques) : DR = 0, PTA = 200 DH, INC_VOL_BDG = 400 DH, TC = Paliers -> GA = DR+PTA+INC_VOL_BDG+TC (SANS DC !)
  var PTA = 0;
  var INC_VOL_BDG = 0;
  var DC = 0;
  var TC = 0;

  if (inclure_TC) {
    if (valeur_neuf <= 100000) TC = 800;
    else if (valeur_neuf <= 150000) TC = 950;
    else if (valeur_neuf <= 200000) TC = 1275;
    else if (valeur_neuf <= 300000) TC = 1750;
    else if (valeur_neuf <= 400000) TC = 2450;
    else if (valeur_neuf <= 500000) TC = 3150;
    else TC = (valeur_neuf * 0.7) / 100;

    PTA = 200;
    INC_VOL_BDG = 400;
    DC = 0; // Inclus / remplacé par TC
  } else {
    PTA = inclure_PTA ? 125 : 1;
    INC_VOL_BDG = inclure_INC_VOL_BDG ? 400 : 0;
    if (inclure_DC) {
      if (valeur_neuf <= 200000) DC = 350;
      else DC = 500;
    }
  }

  var GA = DR + PTA + INC_VOL_BDG + DC + TC;

  // 3. Coefficient de fractionnement selon la durée
  if (duree === "semestriel") {
    RC = RC * 0.54;
    GA = GA * 0.54;
  } else if (duree === "trimestriel") {
    RC = RC * 0.27;
    GA = GA * 0.27;
  }

  // 4. Calcul des taxes et prélèvements
  var Taxe_RC = (RC * 16.5) / 100;
  var Taxe_GA = (GA * 15) / 100;
  var EVCAT = ((RC * 4.5) / 100) + ((GA * 2.5) / 100);
  var CNPAC = 17;

  // 5. Prime totale TTC
  var prime_totale = (RC + Taxe_RC + GA + Taxe_GA + EVCAT + CNPAC).toFixed(2);

  return {
    RC: RC,
    GA: GA,
    valeur_venale: valeur_venale,
    details_GA: { DR: DR, PTA: PTA, INC_VOL_BDG: INC_VOL_BDG, DC: DC, TC: TC },
    Taxe_RC: Taxe_RC,
    Taxe_GA: Taxe_GA,
    EVCAT: EVCAT,
    CNPAC: CNPAC,
    prime_totale: prime_totale
  };
}
```

---

## 7. Exemples de Calcul Chiffrés

### Exemple A : Véhicule Diesel 6 CV — RC + DR uniquement (Annuel)
* `RC` = **2 429.00 DH**
* `GA` = `DR (0)` = **0.00 DH**
* `Taxe_RC` = $2\,429 \times 16.5\% = \mathbf{400.785\text{ DH}}$
* `Taxe_GA` = $\mathbf{0.00\text{ DH}}$
* `EVCAT` = $2\,429 \times 4.5\% = \mathbf{109.305\text{ DH}}$
* `CNPAC` = $\mathbf{17.00\text{ DH}}$
* **Prime Totale Annuelle** : $2429 + 400.785 + 0 + 0 + 109.305 + 17 =$ **2 956.09 DHS TTC**

---

### Exemple B : Véhicule Diesel 6 CV — RC + DR + PTA (200 DH) + INC_VOL_BDG (400 DH) + DC (350 DH car VN = 150 000 DH)
* `RC` = **2 429.00 DH**
* `GA` = $0 + 200 + 400 + 350 =$ **950.00 DH**
* `Taxe_RC` = $2\,429 \times 16.5\% = \mathbf{400.785\text{ DH}}$
* `Taxe_GA` = $950 \times 15\% = \mathbf{142.50\text{ DH}}$
* `EVCAT` = $(2\,429 \times 4.5\%) + (950 \times 2.5\%) = 109.305 + 23.75 = \mathbf{133.055\text{ DH}}$
* `CNPAC` = $\mathbf{17.00\text{ DH}}$
* **Prime Totale Annuelle** : $2429 + 400.785 + 950 + 142.50 + 133.055 + 17 =$ **4 072.34 DHS TTC**

---

### Exemple C : Même véhicule avec Tierce Complète (TC = 950 DH car VN = 150 000 DH)
* `RC` = **2 429.00 DH**
* `GA` = $950 + 950\text{ (TC)} =$ **1 900.00 DH**
* `Taxe_RC` = $\mathbf{400.785\text{ DH}}$
* `Taxe_GA` = $1\,900 \times 15\% = \mathbf{285.00\text{ DH}}$
* `EVCAT` = $109.305 + (1\,900 \times 2.5\%) = 109.305 + 47.50 = \mathbf{156.805\text{ DH}}$
* `CNPAC` = $\mathbf{17.00\text{ DH}}$
* **Prime Totale Annuelle** : $2429 + 400.785 + 1900 + 285.00 + 156.805 + 17 =$ **5 188.59 DHS TTC**

---

## 8. Expérience Utilisateur : Carte Unique Interactive & Options Supplémentaires

Sur `/auto/devis-auto` :
1. **Socle de départ inclus (Formule Start)** :
   - Contient **uniquement** :
     - **Responsabilité Civile** (Obligatoire au Maroc)
     - **Défense et Recours** (Inclus 0 DH)
2. **Options de couverture cochables / décochables (Étape 3)** :
   - **PTA** : $+235.00\text{ DH TTC}$ en annuel ($200 \times 1.175$)
   - **Incendie, Vol & Bris de Glace** : $+470.00\text{ DH TTC}$ en annuel ($400 \times 1.175$)
   - **Dommages Collision (DC)** : $+411.25\text{ DH}$ ou $+587.50\text{ DH TTC}$ en annuel
   - **Tierce Complète (TC)** : Selon barème VAN $\times 1.175$
   - *Règle d'exclusivité* : DC et TC sont mutuellement exclusives (cocher l'une désactive l'autre).
3. **Options supplémentaires (Étape 4)** :
   - **Formules d'assistance** (grille 2x2 compacte) :
     - *Sans formule d'assistance* : 0 DHS (par défaut)
     - *F1* : 85 DHS
     - *F2* : 135 DHS
     - *F3* : 250 DHS
   - **Service Conciergerie Automobile (Servicing VIP)** :
     - Sans service des mines : +660 DHS
     - VIP avec accompagnement au service des mines : +840 DHS
     - Sélection exclusive avec bascule (toggle).
   - **Carte Verte (Assurance Internationale Europe)** :
     - Non : 0 DH (coché par défaut)
     - Oui : +500 DHS TTC
4. **Documents & Confirmation (Étape 5)** :
   - Formulaire des documents requis (CIN, Carte Grise, Permis) toujours ouvert par défaut.
   - Boutons alignés en space-between (`Retour` à gauche, `Envoyer mes documents` à droite).

---

> [!NOTE]
> Pour consulter les règles de calcul de l'assurance Deux-Roues & Moto (Catégories 1 à 5, fiscalité ACAPS et garanties exclusives RC + Défense & Recours), veuillez vous référer au document dédié : **[Règles de Calcul Devis Moto](file:///d:/Herd/digiassur-front/docs/regles_calcul_devis_moto.md)**.
