import { ArrowLeft, ArrowRight, BadgeCheck, Check, CheckCircle2, CircleHelp, RotateCcw, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { InsuranceField, InsuranceProduct } from "@/lib/insurance-products";
import { REFERRAL_OPTIONS } from "@/lib/insurance-products";

type WizardValues = Record<string, string | boolean>;

type InsuranceWizardProps = { product: InsuranceProduct };

const profileFields: InsuranceField[] = [
  { name: "lastName", label: "Nom", placeholder: "Votre nom", type: "text", required: true },
  { name: "firstName", label: "Prénom", placeholder: "Votre prénom", type: "text", required: true },
  { name: "email", label: "Email", placeholder: "nom@exemple.ma", type: "email", required: true },
  { name: "phone", label: "Téléphone", placeholder: "+212 6 00 00 00 00", type: "tel", required: true },
  { name: "city", label: "Ville", placeholder: "Ex. Casablanca", type: "text", required: true },
  { name: "referral", label: "Comment avez-vous connu Digiassur ?", type: "select", options: REFERRAL_OPTIONS },
];

const formulas = [
  { id: "essentielle", title: "Essentielle", text: "Les garanties indispensables pour démarrer votre comparaison." },
  { id: "confort", title: "Confort", text: "Un équilibre de garanties pour protéger votre quotidien." },
  { id: "serenite", title: "Sérénité", text: "Une couverture renforcée à étudier avec un conseiller." },
];

const stepIcons = [BadgeCheck, ShieldCheck, CircleHelp, CheckCircle2];

export default function InsuranceWizard({ product }: InsuranceWizardProps) {
  const stepLabels = ["Assuré", product.quoteStep, "Formule", "Confirmation"];
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<WizardValues>({ formula: "confort" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState(false);

  const updateValue = (name: string, value: string | boolean) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const fields = step === 0 ? profileFields : step === 1 ? product.detailFields : [];
    const nextErrors: Record<string, string> = {};
    for (const field of fields) {
      const value = String(values[field.name] ?? "").trim();
      if (field.required && !value) nextErrors[field.name] = "Ce champ est obligatoire.";
      if (field.name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) nextErrors[field.name] = "Saisissez une adresse email valide.";
      if (field.name === "phone" && value && value.replace(/\D/g, "").length < 9) nextErrors[field.name] = "Saisissez un numéro de téléphone valide.";
      if (field.type === "date" && value && new Date(value) < new Date(new Date().toDateString())) nextErrors[field.name] = "La date ne peut pas être dans le passé.";
    }
    if (step === 0 && values.consent !== true) nextErrors.consent = "Votre accord est nécessaire pour poursuivre la simulation.";
    if (step === 3 && values.accuracy !== true) nextErrors.accuracy = "Veuillez confirmer les informations de cette simulation.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    if (step < 3) {
      setStep((current) => current + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setConfirmed(true);
  };

  const reset = () => {
    setValues({ formula: "confort" });
    setErrors({});
    setStep(0);
    setConfirmed(false);
  };

  const back = () => {
    setErrors({});
    setStep((current) => Math.max(0, current - 1));
  };

  const title = step === 0 ? "Renseignez vos informations afin de recevoir votre devis" : step === 1 ? `Parlez-nous de votre ${product.slug === "habitation" ? "logement" : product.slug === "voyage" ? "voyage" : product.name.toLowerCase()}` : step === 2 ? "Choisissez la formule à explorer" : "Vérifiez les informations de votre simulation";

  return (
    <section className="wizard-section" aria-labelledby="wizard-title">
      <div className="page-width wizard-wrap">
        <div className="wizard-progress" aria-label={`Étape ${step + 1} sur ${stepLabels.length}`}>
          {stepLabels.map((label, index) => {
            const Icon = stepIcons[index];
            const state = index === step ? "is-current" : index < step ? "is-complete" : "";
            return (
              <div className={`wizard-progress-step ${state}`} key={label} aria-current={index === step ? "step" : undefined}>
                <span className="wizard-step-icon">{index < step ? <Check size={19} /> : <Icon size={19} />}</span>
                <span className="wizard-step-label">{label}</span>
              </div>
            );
          })}
        </div>

        <div className="wizard-main">
          <form className="wizard-form" onSubmit={goNext} noValidate>
            {!confirmed ? (
              <>
                <div key={step} className={`wizard-step-panel wizard-step-panel-${step}`}>
                <div className="wizard-heading">
                  <span className="wizard-product-mark"><product.icon size={19} /></span>
                  <div><span className="section-kicker">Simulation {product.name}</span><h1 id="wizard-title">{title}</h1></div>
                </div>

                {step === 0 && <>
                  <div className="wizard-fields">
                    {profileFields.map((field) => <FieldControl key={field.name} field={field} value={values[field.name]} error={errors[field.name]} onChange={updateValue} />)}
                  </div>
                  <label className="consent-row">
                    <input type="checkbox" checked={values.consent === true} onChange={(event) => updateValue("consent", event.target.checked)} aria-invalid={Boolean(errors.consent)} />
                    <span>J’ai lu et j’accepte les <a href="https://digiassur.ma/mentions-legales" target="_blank" rel="noreferrer">conditions générales</a> d’utilisation, notamment la mention relative à la protection des données personnelles.</span>
                  </label>
                  {errors.consent && <p className="field-error consent-error" role="alert">{errors.consent}</p>}
                  <p className="privacy-note"><ShieldCheck size={16} /> Mode démonstration : aucune donnée saisie n’est envoyée ni enregistrée.</p>
                </>}

                {step === 1 && <>
                  <div className="wizard-fields">
                    {product.detailFields.map((field) => <FieldControl key={field.name} field={field} value={values[field.name]} error={errors[field.name]} onChange={updateValue} />)}
                  </div>
                  <p className="privacy-note"><ShieldCheck size={16} /> Ces réponses servent uniquement à personnaliser cette simulation locale.</p>
                </>}

                {step === 2 && <div className="formula-options" role="radiogroup" aria-label="Choisir une formule">
                  {formulas.map((formula, index) => (
                    <label className={`formula-option${values.formula === formula.id ? " is-selected" : ""}`} key={formula.id}>
                      <input type="radio" name="formula" value={formula.id} checked={values.formula === formula.id} onChange={() => updateValue("formula", formula.id)} />
                      <span className="formula-option-top"><span className="formula-check"><Check size={15} /></span><span className="formula-index">0{index + 1}</span></span>
                      <strong>{formula.title}</strong><span>{formula.text}</span>
                    </label>
                  ))}
                </div>}

                {step === 3 && <>
                  <div className="review-grid">
                    {[
                      ["Nom", values.lastName], ["Prénom", values.firstName], ["Email", values.email], ["Téléphone", values.phone], ["Ville", values.city], [product.quoteStep, product.detailFields.map((field) => values[field.name] ? String(values[field.name]) : "").filter(Boolean).join(" · ")], ["Formule", formulas.find((formula) => formula.id === values.formula)?.title],
                    ].map(([label, value]) => <div className="review-item" key={String(label)}><span>{label}</span><strong>{String(value || "—")}</strong></div>)}
                  </div>
                  <label className="consent-row final-consent">
                    <input type="checkbox" checked={values.accuracy === true} onChange={(event) => updateValue("accuracy", event.target.checked)} aria-invalid={Boolean(errors.accuracy)} />
                    <span>Je confirme que ces renseignements sont fournis pour une simulation de démonstration.</span>
                  </label>
                  {errors.accuracy && <p className="field-error consent-error" role="alert">{errors.accuracy}</p>}
                  <p className="privacy-note"><CircleHelp size={16} /> Cette étape ne crée aucun contrat et ne transmet pas de demande à un assureur.</p>
                </>}
                </div>

                <div className="wizard-actions">
                  <div className="wizard-action-left">
                    {step > 0 && <button type="button" className="button button-secondary" onClick={back}><ArrowLeft size={16} /> Précédent</button>}
                    {step === 0 && <button type="button" className="button button-reset" onClick={reset}><RotateCcw size={15} /> Réinitialiser les champs</button>}
                  </div>
                  <button type="submit" className="button button-orange wizard-next">{step === 3 ? "Terminer la démonstration" : "Suivant"} <ArrowRight size={16} /></button>
                </div>
              </>
            ) : (
              <div className="wizard-success" role="status">
                <span className="success-icon"><CheckCircle2 size={35} /></span>
                <span className="section-kicker">Simulation terminée</span>
                <h1 id="wizard-title">Votre parcours de démonstration est complet.</h1>
                <p>Aucune demande réelle n’a été soumise. Les réponses saisies ne sont pas enregistrées et ne quittent pas cette page.</p>
                <button type="button" className="button button-orange" onClick={reset}><RotateCcw size={15} /> Recommencer</button>
              </div>
            )}
          </form>

          <aside className="wizard-notice">
            <span className="notice-icon"><ShieldCheck size={21} /></span>
            <h2>Vos informations restent sous votre contrôle.</h2>
            <p>Les données de ce prototype sont traitées uniquement dans l’interface pendant votre démonstration. Elles ne sont ni transmises à un assureur ni conservées.</p>
            <a href="https://digiassur.ma/mentions-legales" target="_blank" rel="noreferrer">Protection des données <ArrowRight size={14} /></a>
            <div className="notice-footer"><span className="notice-dot" /> Parcours guidé · sans engagement</div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function FieldControl({ field, value, error, onChange }: { field: InsuranceField; value: string | boolean | undefined; error?: string; onChange: (name: string, value: string) => void }) {
  const id = `field-${field.name}`;
  const commonProps = { id, name: field.name, required: field.required, "aria-invalid": Boolean(error), "aria-describedby": error ? `${id}-error` : undefined };
  return (
    <div className={`field-control${error ? " has-error" : ""}`}>
      <label htmlFor={id}>{field.label}{field.required && <span className="required-star">*</span>}</label>
      {field.type === "select" ? (
        <select {...commonProps} value={String(value ?? "")} onChange={(event) => onChange(field.name, event.target.value)}>
          <option value="">Choisir une réponse</option>{field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : (
        <input {...commonProps} type={field.type} value={String(value ?? "")} placeholder={field.placeholder} min={field.min} max={field.max} onChange={(event) => onChange(field.name, event.target.value)} />
      )}
      {error && <span className="field-error" id={`${id}-error`} role="alert">{error}</span>}
    </div>
  );
}
