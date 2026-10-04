import { useMemo, useState, type FormEvent } from "react";
import { ArrowRight, BadgeCheck, CarFront, Check, Info, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import DigiassurFooter from "@/components/DigiassurFooter";
import DigiassurHeader from "@/components/DigiassurHeader";
import TrustSection from "@/components/TrustSection";
import "./digiassur.css";

type CoverageKey = "liability" | "theftFire" | "glass" | "vehicleDamage" | "assistance";
type Offer = {
  provider: string;
  amount: string;
  period: "year" | "month";
  coverages: Record<CoverageKey, boolean>;
  notes: string;
};
type VehicleProfile = { make: string; model: string; year: string; use: string };
type ComparedOffer = Offer & { index: number; annualCost: number };

const coverageOptions: { key: CoverageKey; label: string }[] = [
  { key: "liability", label: "Responsabilité civile" },
  { key: "theftFire", label: "Vol et/ou incendie" },
  { key: "glass", label: "Bris de glace" },
  { key: "vehicleDamage", label: "Dommages au véhicule" },
  { key: "assistance", label: "Assistance" },
];

const blankOffer = (): Offer => ({
  provider: "",
  amount: "",
  period: "year",
  coverages: { liability: false, theftFire: false, glass: false, vehicleDamage: false, assistance: false },
  notes: "",
});

const formatDhs = (amount: number) => new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 2 }).format(amount);

export default function AutoComparatorPage() {
  const [vehicle, setVehicle] = useState<VehicleProfile>({ make: "", model: "", year: "", use: "" });
  const [offers, setOffers] = useState<Offer[]>([blankOffer(), blankOffer(), blankOffer()]);
  const [showResults, setShowResults] = useState(false);
  const [message, setMessage] = useState("");

  const comparedOffers = useMemo<ComparedOffer[]>(() => offers.flatMap((offer, index) => {
    const amount = Number(offer.amount);
    if (!offer.provider.trim() || !Number.isFinite(amount) || amount <= 0) return [];
    return [{ ...offer, index, annualCost: offer.period === "month" ? amount * 12 : amount }];
  }), [offers]);
  const lowestAnnualCost = comparedOffers.length ? Math.min(...comparedOffers.map((offer) => offer.annualCost)) : 0;

  const updateVehicle = (key: keyof VehicleProfile, value: string) => {
    setVehicle((current) => ({ ...current, [key]: value }));
    setShowResults(false);
    setMessage("");
  };

  const updateOffer = (index: number, patch: Partial<Offer>) => {
    setOffers((current) => current.map((offer, offerIndex) => offerIndex === index ? { ...offer, ...patch } : offer));
    setShowResults(false);
    setMessage("");
  };

  const updateCoverage = (index: number, key: CoverageKey, checked: boolean) => {
    const currentOffer = offers[index];
    updateOffer(index, { coverages: { ...currentOffer.coverages, [key]: checked } });
  };

  const compare = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (comparedOffers.length < 2) {
      setShowResults(false);
      setMessage("Renseignez le nom de l’assureur et la prime d’au moins deux offres pour les comparer.");
      return;
    }
    setMessage("");
    setShowResults(true);
    window.requestAnimationFrame(() => document.getElementById("auto-comparison-results")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div className="digiassur-site auto-comparator-page">
      <DigiassurHeader />
      <main>
        <section className="auto-comparator-hero" aria-labelledby="auto-comparator-title">
          <div className="auto-comparator-hero-photo" aria-hidden="true" />
          <div className="page-width auto-comparator-hero-inner">
            <nav className="product-breadcrumb" aria-label="Fil d’Ariane"><Link href="/">Accueil</Link><span aria-hidden="true">/</span><Link href="/assurance/auto">Auto</Link><span aria-hidden="true">/</span><span>Simuler et comparer</span></nav>
            <div className="auto-comparator-hero-copy">
              <span className="auto-comparator-icon"><CarFront size={25} aria-hidden="true" /></span>
              <span className="section-kicker">Votre assurance Auto, en clair</span>
              <h1 id="auto-comparator-title">Simulez votre profil.<br /><em>Comparez vos offres.</em></h1>
              <p>Rassemblez jusqu’à trois propositions reçues et comparez leurs primes et garanties sur une même page.</p>
              <div className="auto-comparator-trust"><ShieldCheck size={17} aria-hidden="true" /><span>Outil local : aucun tarif n’est généré, aucune offre n’est demandée et rien n’est transmis.</span></div>
            </div>
          </div>
        </section>

        <section className="auto-comparator-intro page-width" aria-labelledby="auto-comparator-intro-title">
          <div><span className="section-kicker">Une comparaison utile</span><h2 id="auto-comparator-intro-title">Comparez des propositions à garanties comparables.</h2></div>
          <p>Renseignez le véhicule, puis reportez les montants et protections figurant dans les documents que vous avez reçus. Les montants sont convertis en équivalent annuel pour faciliter la lecture — ce n’est pas un calcul de tarif d’assurance.</p>
        </section>

        <form className="auto-comparator-form" onSubmit={compare}>
          <section className="auto-comparator-section page-width" aria-labelledby="vehicle-profile-title">
            <div className="auto-comparator-section-heading"><span className="auto-step-number">01</span><div><span className="section-kicker">Votre véhicule</span><h2 id="vehicle-profile-title">Posez le contexte de la comparaison.</h2><p>Ces informations restent dans cette page pendant votre visite.</p></div></div>
            <div className="auto-vehicle-fields">
              <label className="field-control"><span>Marque <span className="required-star">*</span></span><input required value={vehicle.make} onChange={(event) => updateVehicle("make", event.target.value)} placeholder="Ex. Dacia" autoComplete="off" /></label>
              <label className="field-control"><span>Modèle <span className="required-star">*</span></span><input required value={vehicle.model} onChange={(event) => updateVehicle("model", event.target.value)} placeholder="Ex. Sandero" autoComplete="off" /></label>
              <label className="field-control"><span>Année de mise en circulation <span className="required-star">*</span></span><input required type="number" inputMode="numeric" min="1980" max={new Date().getFullYear()} value={vehicle.year} onChange={(event) => updateVehicle("year", event.target.value)} placeholder="2022" /></label>
              <label className="field-control"><span>Usage déclaré dans l’offre <span className="required-star">*</span></span><select required value={vehicle.use} onChange={(event) => updateVehicle("use", event.target.value)}><option value="">Sélectionner</option><option>Privé</option><option>Professionnel</option><option>Mixte</option></select></label>
            </div>
          </section>

          <section className="auto-comparator-section auto-offers-section" aria-labelledby="received-offers-title">
            <div className="page-width">
              <div className="auto-comparator-section-heading"><span className="auto-step-number">02</span><div><span className="section-kicker">Vos propositions</span><h2 id="received-offers-title">Saisissez les offres que vous souhaitez comparer.</h2><p>Ajoutez au moins deux offres. Cochez une garantie uniquement si elle apparaît dans les documents de l’offre.</p></div></div>
              <div className="auto-offer-entry-grid">
                {offers.map((offer, index) => (
                  <article className="auto-offer-entry" key={index} style={{ "--offer-index": index } as React.CSSProperties}>
                    <div className="auto-offer-entry-heading"><span className="auto-offer-entry-icon"><CarFront size={19} aria-hidden="true" /></span><div><span className="section-kicker">Proposition 0{index + 1}</span><h3>Offre {String.fromCharCode(65 + index)}</h3></div></div>
                    <label className="field-control"><span>Assureur ou nom de l’offre</span><input value={offer.provider} onChange={(event) => updateOffer(index, { provider: event.target.value })} placeholder="Ex. offre reçue par email" maxLength={60} autoComplete="off" /></label>
                    <div className="auto-premium-row">
                      <label className="field-control"><span>Prime indiquée (DHS)</span><input type="number" inputMode="decimal" min="0.01" step="0.01" value={offer.amount} onChange={(event) => updateOffer(index, { amount: event.target.value })} placeholder="Ex. 2 400" /></label>
                      <label className="field-control"><span>Périodicité</span><select value={offer.period} onChange={(event) => updateOffer(index, { period: event.target.value as Offer["period"] })}><option value="year">Par an</option><option value="month">Par mois</option></select></label>
                    </div>
                    <fieldset className="auto-coverage-fieldset"><legend>Garanties relevées dans le document</legend>{coverageOptions.map(({ key, label }) => <label className="auto-coverage-check" key={key}><input type="checkbox" checked={offer.coverages[key]} onChange={(event) => updateCoverage(index, key, event.target.checked)} /><span>{label}</span></label>)}</fieldset>
                    <label className="field-control auto-offer-notes"><span>Franchise, plafond ou remarque (facultatif)</span><textarea rows={3} value={offer.notes} onChange={(event) => updateOffer(index, { notes: event.target.value })} placeholder="Notez un élément important à vérifier…" maxLength={220} /></label>
                    {offer.provider.trim() && Number(offer.amount) > 0 && <p className="auto-offer-preview" aria-live="polite">Équivalent indicatif : <strong>{formatDhs(offer.period === "month" ? Number(offer.amount) * 12 : Number(offer.amount))} DHS/an</strong></p>}
                  </article>
                ))}
              </div>
              <p className="auto-coverage-legend"><Info size={16} aria-hidden="true" /> Une case non cochée signifie « non vérifiée ici », pas nécessairement « garantie exclue ». Consultez les conditions de chaque contrat.</p>
              <div className="auto-compare-action-row"><div className="auto-compare-error" aria-live="polite" role={message ? "alert" : undefined}>{message}</div><button className="button button-orange auto-compare-submit" type="submit">Comparer les offres <ArrowRight size={16} /></button></div>
            </div>
          </section>
        </form>

        {showResults && comparedOffers.length >= 2 && (
          <section className="auto-comparison-results" id="auto-comparison-results" aria-labelledby="auto-comparison-results-title" aria-live="polite">
            <div className="page-width">
              <div className="auto-comparator-section-heading"><span className="auto-step-number"><BadgeCheck size={20} /></span><div><span className="section-kicker">Comparaison préparée</span><h2 id="auto-comparison-results-title">Vos offres, mises côte à côte.</h2><p>{vehicle.make} {vehicle.model} · {vehicle.year} · usage {vehicle.use.toLowerCase()}</p></div></div>
              <p className="auto-result-disclaimer"><Info size={17} aria-hidden="true" /> Le coût annuel sert uniquement à comparer les montants saisis. Le prix le plus bas ne signifie pas nécessairement une protection équivalente ou adaptée.</p>
              <div className="auto-comparison-result-grid">
                {comparedOffers.map((offer) => {
                  const lowest = offer.annualCost === lowestAnnualCost;
                  return (
                    <article className={`auto-comparison-result-card${lowest ? " is-lowest" : ""}`} key={offer.index}>
                      <div className="auto-result-card-topline"><span className="auto-result-provider">{offer.provider}</span>{lowest && <span className="auto-lowest-badge"><Check size={13} aria-hidden="true" /> Prime saisie la plus basse</span>}</div>
                      <span className="auto-result-price">{formatDhs(offer.annualCost)} <small>DHS/an</small></span>
                      <span className="auto-result-source">Saisie : {formatDhs(Number(offer.amount))} DHS/{offer.period === "month" ? "mois" : "an"}</span>
                      <div className="auto-result-coverages"><strong>Garanties relevées</strong>{coverageOptions.map(({ key, label }) => <span key={key} className={offer.coverages[key] ? "is-listed" : "is-unverified"}>{offer.coverages[key] ? <Check size={14} /> : <span className="auto-unverified-mark">?</span>}{label}<small>{offer.coverages[key] ? "cochée" : "non vérifiée"}</small></span>)}</div>
                      {offer.notes.trim() && <p className="auto-result-notes"><strong>Votre note</strong>{offer.notes}</p>}
                      <span className="auto-result-offer-id">Offre {String.fromCharCode(65 + offer.index)}</span>
                    </article>
                  );
                })}
              </div>
              <div className="auto-result-next-step"><span className="auto-result-next-icon"><ShieldCheck size={22} aria-hidden="true" /></span><div><strong>Avant de choisir</strong><p>Vérifiez franchises, exclusions, plafonds, dates et conditions de résiliation dans les documents contractuels.</p></div><Link className="button button-secondary" href="/devis/auto">Voir la démo du parcours Auto <ArrowRight size={15} /></Link></div>
            </div>
          </section>
        )}

        <section className="auto-comparator-footnote"><div className="page-width"><ShieldCheck size={18} aria-hidden="true" /><p><strong>Confidentialité :</strong> ce prototype ne conserve pas les données après fermeture ou actualisation de la page. Il ne se connecte à aucun assureur, n’établit aucun devis et ne transmet aucune demande.</p></div></section>
        <TrustSection />
      </main>
      <DigiassurFooter />
    </div>
  );
}
