/**
 * Moteur de Tarification & Simulation de Devis Auto - Digiassur Maroc
 * Conforme aux formules exactes de l'application Digiassur et barème ACAPS / FMSAR.
 */

export type EnergieType = "Diesel" | "Essence" | "Electrique" | "Hybrid";
export type DureeType = "Annuelle" | "Semestrielle" | "Trimestrielle";

export interface DevisAutoOptions {
  pta?: boolean;          // Personnes Transportées
  inc_vol_bdg?: boolean;  // Incendie, Vol, Bris de Glace
  dc?: boolean;           // Dommages Collision (350 ou 500 DH)
  tc?: boolean;           // Tierce Complète (par paliers ou 0.7%)
}

export interface DevisAutoParams {
  energie: EnergieType;
  puissanceFiscale: number;
  valeurNeuf: number;
  dateMec?: string | Date;
  crm?: number; // Coefficient Bonus-Malus (0.50 à 1.40, défaut 1.0)
  duree?: DureeType;
  options?: DevisAutoOptions;
}

export interface DevisAutoResult {
  rcBase: number;
  rcNette: number;
  valeurVenale: number;
  gaNette: number;
  detailsGA: {
    dr: number;
    pta: number;
    inc_vol_bdg: number;
    dc: number;
    tc: number;
  };
  taxeRc: number;
  taxeGa: number;
  evcat: number;
  cnpac: number;
  primeTotale: number;
}

/**
 * 1. Barème officiel Responsabilité Civile (RC de base) par énergie et CV
 */
export function calculateRcBase(energie: EnergieType, cv: number): number {
  const puissance = Number(cv) || 6;
  if (energie === "Diesel") {
    if (puissance <= 4) return 1840;
    if (puissance === 5) return 2238;
    if (puissance === 6 || puissance === 7) return 2429;
    return 3490;
  } else {
    if (puissance <= 6) return 1840;
    if (puissance === 7 || puissance === 8) return 2238;
    if (puissance === 9 || puissance === 10) return 2429;
    return 3490;
  }
}

/**
 * 2. Calcul dynamique de la Valeur Vénale (Décote mensuelle progressive et plancher 54%)
 */
export function calculateValeurVenale(valeurNeuf: number, dateMec?: string | Date): number {
  const val_neuf = Number(valeurNeuf) || 0;
  if (!val_neuf || !dateMec) return val_neuf;

  const date_mise = new Date(dateMec);
  const today = new Date();
  let months = (today.getFullYear() - date_mise.getFullYear()) * 12 + (today.getMonth() - date_mise.getMonth());
  if (today.getDate() < date_mise.getDate()) months--;
  months = Math.max(0, months);

  let val_venal = val_neuf;
  let com = 0.015; // 1.5% par mois la 1ère année

  if (months <= 54) {
    for (let i = 1; i <= months; i++) {
      val_venal = val_venal - (val_venal * com);
      if (i === 12) com = 0.01; // 1.0% par mois après 12 mois
    }
  } else {
    val_venal = val_neuf * 0.54; // Plancher garanti à 54%
  }

  return Math.round(val_venal);
}

/**
 * 3. Barème Dommages Collision (DC)
 */
export function calculateDommagesCollision(valeurNeuf: number): number {
  return Number(valeurNeuf) <= 200000 ? 350 : 500;
}

/**
 * 4. Barème Tierce Complète (TC)
 */
export function calculateTierce(valeurNeuf: number): number {
  const vn = Number(valeurNeuf) || 0;
  if (vn <= 100000) return 800;
  if (vn <= 150000) return 950;
  if (vn <= 200000) return 1275;
  if (vn <= 300000) return 1750;
  if (vn <= 400000) return 2450;
  if (vn <= 500000) return 3150;
  return Math.round((vn * 0.7) / 100);
}

/**
 * ============================================================================
 * FONCTIONS OFFICIELLES DE L'ANCIENNE APPLICATION DIGIASSUR
 * ============================================================================
 */

export function devis_provisoire_start(duree: string, RC: number): number {
  let rc = Number(RC) || 0;
  const DR = 0;
  const PTA = 0; // PTA = 0 dans la formule Start (uniquement RC + DR à 0 DH)
  let GA = DR + PTA;

  const d = duree.toLowerCase();
  if (d.includes("semestri")) {
    rc = rc * 0.54;
    GA = GA * 0.54;
  } else if (d.includes("trimestri")) {
    rc = rc * 0.27;
    GA = GA * 0.27;
  }

  const Taxe_RC = (rc * 16.5) / 100;
  const Taxe_GA = (GA * 15) / 100; 
  const EVCAT = ((rc * 4.5) / 100) + ((GA * 2.5) / 100);
  const CNPAC = 17;
  const prime_totale = Number((rc + Taxe_RC + GA + Taxe_GA + EVCAT + CNPAC).toFixed(2));
  return prime_totale;
}

export function devis_provisoire_go(duree: string, RC: number, valeur_neuf: number): number {
  let rc = Number(RC) || 0;
  const DR = 0;
  const PTA = 125;
  const INC_VOL_BDG = 400;
  let DC = 0;
  if (parseFloat(String(valeur_neuf)) <= 200000) DC = 350;
  else DC = 500;
  let GA = DR + PTA + INC_VOL_BDG + DC;

  const d = duree.toLowerCase();
  if (d.includes("semestri")) {
    rc = rc * 0.54;
    GA = GA * 0.54;
  } else if (d.includes("trimestri")) {
    rc = rc * 0.27;
    GA = GA * 0.27;
  }

  const Taxe_RC = (rc * 16.5) / 100;
  const Taxe_GA = (GA * 15) / 100; 
  const EVCAT = ((rc * 4.5) / 100) + ((GA * 2.5) / 100);
  const CNPAC = 17;
  const prime_totale = Number((rc + Taxe_RC + GA + Taxe_GA + EVCAT + CNPAC).toFixed(2));
  return prime_totale;
}

export function devis_provisoire_fast(duree: string, RC: number, valeur_neuf: number): number {
  let rc = Number(RC) || 0;
  const DR = 0;
  const PTA = 200;
  const INC_VOL_BDG = 400;
  let TC = 0;
  const vn = parseFloat(String(valeur_neuf)) || 0;

  if (vn <= 100000) TC = 800;
  else if (vn <= 150000) TC = 950;
  else if (vn <= 200000) TC = 1275;
  else if (vn <= 300000) TC = 1750;
  else if (vn <= 400000) TC = 2450;
  else if (vn <= 500000) TC = 3150;
  else TC = (vn * 0.7) / 100;

  let GA = DR + PTA + INC_VOL_BDG + TC;

  const d = duree.toLowerCase();
  if (d.includes("semestri")) {
    rc = rc * 0.54;
    GA = GA * 0.54;
  } else if (d.includes("trimestri")) {
    rc = rc * 0.27;
    GA = GA * 0.27;
  }

  const Taxe_RC = (rc * 16.5) / 100;
  const Taxe_GA = (GA * 15) / 100; 
  const EVCAT = ((rc * 4.5) / 100) + ((GA * 2.5) / 100);
  const CNPAC = 17;
  const prime_totale = Number((rc + Taxe_RC + GA + Taxe_GA + EVCAT + CNPAC).toFixed(2));
  return prime_totale;
}

/**
 * 5. Moteur de calcul global d'un devis unitaire (mode modulaire sur-mesure)
 */
export function calculateDevisAuto(params: DevisAutoParams): DevisAutoResult {
  const vn = Number(params.valeurNeuf) || 150000;
  const crm = Number(params.crm) || 1.0;
  const duree = params.duree || "Annuelle";
  const options = params.options || {};

  // RC de base et application du Bonus-Malus CRM
  const rcBase = calculateRcBase(params.energie, params.puissanceFiscale);
  let RC = rcBase * crm;

  // Calcul Valeur Vénale
  const valeurVenale = calculateValeurVenale(vn, params.dateMec);

  // Garanties Annexes selon les conventions officielles
  const dr = 0; // Défense & Recours incluse d'office (0 DH)
  
  let pta = 0;
  let inc_vol_bdg = 0;
  let dc = 0;
  let tc = 0;

  if (options.tc) {
    // Si Tierce Complète (Tous Risques) :
    // Conformément à devis_provisoire_fast :
    // GA = DR(0) + PTA(200) + INC_VOL_BDG(400) + TC
    // Pas de Dommages Collision (DC = 0) car remplacé par TC
    tc = calculateTierce(vn);
    pta = 200;
    inc_vol_bdg = 400;
    dc = 0;
  } else if (options.dc) {
    // Si Dommages Collision :
    // Conformément à devis_provisoire_go :
    // Même comportement que Tierce : inclut d'office PTA (125) et INC_VOL_BDG (400)
    // GA = DR(0) + PTA(125) + INC_VOL_BDG(400) + DC(350 ou 500)
    tc = 0;
    dc = calculateDommagesCollision(vn);
    pta = 125;
    inc_vol_bdg = 400;
  } else {
    tc = 0;
    dc = 0;
    inc_vol_bdg = options.inc_vol_bdg ? 400 : 0;
    pta = options.pta ? 200 : 0;
  }

  let GA = dr + pta + inc_vol_bdg + dc + tc;

  // Coefficients de durée
  const d = duree.toLowerCase();
  if (d.includes("semestri")) {
    RC = RC * 0.54;
    GA = GA * 0.54;
  } else if (d.includes("trimestri")) {
    RC = RC * 0.27;
    GA = GA * 0.27;
  }

  // Taxes légales marocaines
  const taxeRc = (RC * 16.5) / 100;
  const taxeGa = (GA * 15.0) / 100;
  const evcat = ((RC * 4.5) / 100) + ((GA * 2.5) / 100);
  const cnpac = 17;

  const primeTotale = Number((RC + taxeRc + GA + taxeGa + evcat + cnpac).toFixed(2));

  return {
    rcBase,
    rcNette: Number(RC.toFixed(2)),
    valeurVenale,
    gaNette: Number(GA.toFixed(2)),
    detailsGA: { dr, pta, inc_vol_bdg, dc, tc },
    taxeRc: Number(taxeRc.toFixed(2)),
    taxeGa: Number(taxeGa.toFixed(2)),
    evcat: Number(evcat.toFixed(2)),
    cnpac,
    primeTotale
  };
}

/**
 * 6. Calcul des 3 formules de référence (Start, Go, Fast)
 * Utilise strictement devis_provisoire_start, devis_provisoire_go et devis_provisoire_fast
 */
export function calculateFormules(params: {
  energie: EnergieType;
  puissanceFiscale: number;
  valeurNeuf: number;
  dateMec?: string | Date;
  crm?: number;
  duree: DureeType;
  ptaForStart?: boolean;
}) {
  const { energie, puissanceFiscale, valeurNeuf, crm = 1.0, duree } = params;
  const rcBase = calculateRcBase(energie, puissanceFiscale);
  const rcNette = rcBase * crm;

  const startTtc = devis_provisoire_start(duree, rcNette);
  const goTtc = devis_provisoire_go(duree, rcNette, valeurNeuf);
  const fastTtc = devis_provisoire_fast(duree, rcNette, valeurNeuf);

  const startAnnual = devis_provisoire_start("Annuelle", rcNette);
  const goAnnual = devis_provisoire_go("Annuelle", rcNette, valeurNeuf);
  const fastAnnual = devis_provisoire_fast("Annuelle", rcNette, valeurNeuf);

  return {
    Start: startTtc,
    Go: goTtc,
    Fast: fastTtc,
    annual: {
      Start: startAnnual,
      Go: goAnnual,
      Fast: fastAnnual
    }
  };
}
