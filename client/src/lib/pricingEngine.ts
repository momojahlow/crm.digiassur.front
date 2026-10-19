/**
 * Moteur de Tarification & Simulation de Devis Auto - Digiassur Maroc
 * Conforme aux règles ACAPS / FMSAR et fiscalité marocaine en vigueur.
 */

export type EnergieType = "Diesel" | "Essence" | "Electrique" | "Hybrid";
export type DureeType = "Annuelle" | "Semestrielle" | "Trimestrielle";

export interface DevisAutoOptions {
  pta?: boolean;          // Personnes Transportées (200 DH)
  inc_vol_bdg?: boolean;  // Incendie, Vol, Bris de Glace (400 DH)
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
  return valeurNeuf <= 200000 ? 350 : 500;
}

/**
 * 4. Barème Tierce Complète (TC)
 */
export function calculateTierce(valeurNeuf: number): number {
  if (valeurNeuf <= 100000) return 800;
  if (valeurNeuf <= 150000) return 950;
  if (valeurNeuf <= 200000) return 1275;
  if (valeurNeuf <= 300000) return 1750;
  if (valeurNeuf <= 400000) return 2450;
  if (valeurNeuf <= 500000) return 3150;
  return Math.round((valeurNeuf * 0.7) / 100);
}

/**
 * 5. Moteur de calcul global d'un devis unitaire
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

  // Garanties Annexes
  const dr = 0; // Défense & Recours incluse d'office (0 DH)
  const pta = options.pta ? 200 : 0;
  const inc_vol_bdg = options.inc_vol_bdg ? 400 : 0;
  const dc = options.dc ? calculateDommagesCollision(vn) : 0;
  const tc = options.tc ? calculateTierce(vn) : 0;

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
  const { energie, puissanceFiscale, valeurNeuf, dateMec, crm = 1.0, duree, ptaForStart = false } = params;

  // Formule Start : RC + DR (DR=0), PTA si cochée
  const startRes = calculateDevisAuto({
    energie,
    puissanceFiscale,
    valeurNeuf,
    dateMec,
    crm,
    duree,
    options: { pta: ptaForStart }
  });

  const startAnnual = calculateDevisAuto({
    energie,
    puissanceFiscale,
    valeurNeuf,
    dateMec,
    crm,
    duree: "Annuelle",
    options: { pta: ptaForStart }
  });

  // Formule Go : RC + DR + PTA(200) + INC_VOL_BDG(400) + DC(350 ou 500)
  const goRes = calculateDevisAuto({
    energie,
    puissanceFiscale,
    valeurNeuf,
    dateMec,
    crm,
    duree,
    options: { pta: true, inc_vol_bdg: true, dc: true }
  });

  const goAnnual = calculateDevisAuto({
    energie,
    puissanceFiscale,
    valeurNeuf,
    dateMec,
    crm,
    duree: "Annuelle",
    options: { pta: true, inc_vol_bdg: true, dc: true }
  });

  // Formule Fast (Tous Risques) : Go + Tierce Complète (TC)
  const fastRes = calculateDevisAuto({
    energie,
    puissanceFiscale,
    valeurNeuf,
    dateMec,
    crm,
    duree,
    options: { pta: true, inc_vol_bdg: true, dc: true, tc: true }
  });

  const fastAnnual = calculateDevisAuto({
    energie,
    puissanceFiscale,
    valeurNeuf,
    dateMec,
    crm,
    duree: "Annuelle",
    options: { pta: true, inc_vol_bdg: true, dc: true, tc: true }
  });

  return {
    Start: startRes.primeTotale,
    Go: goRes.primeTotale,
    Fast: fastRes.primeTotale,
    annual: {
      Start: startAnnual.primeTotale,
      Go: goAnnual.primeTotale,
      Fast: fastAnnual.primeTotale
    },
    details: {
      Start: startRes,
      Go: goRes,
      Fast: fastRes
    }
  };
}
