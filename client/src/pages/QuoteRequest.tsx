import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import NumerisLayout from "@/components/NumerisLayout";
import { trpc } from "@/lib/trpc";
import "./numeris.css";
import "./quote-page.css";

export default function QuoteRequest() {
  const formRef = useRef<HTMLFormElement>(null);
  const [reference, setReference] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Demander un devis — Numeris | Smart Print";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    const scrollToForm = () => {
      if (window.location.hash !== "#quote-form") return;
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.getElementById("quote-form")?.scrollIntoView({
            block: "start",
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
          });
        });
      });
    };

    scrollToForm();
    window.addEventListener("hashchange", scrollToForm);
    return () => window.removeEventListener("hashchange", scrollToForm);
  }, []);

  const submitQuote = trpc.quote.submit.useMutation({
    onSuccess: result => {
      setReference(result.reference);
      setSubmitError("");
      formRef.current?.reset();
    },
    onError: () => {
      setSubmitError(
        "Votre demande n’a pas pu être enregistrée. Vos coordonnées n’ont pas été conservées. Réessayez dans quelques instants."
      );
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    const formData = new FormData(event.currentTarget);
    submitQuote.mutate({
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      projectType: String(formData.get("projectType") ?? "") as
        | "digitization"
        | "ocr"
        | "rag"
        | "complete",
      volume: String(formData.get("volume") ?? "") as
        | "under-500"
        | "500-5000"
        | "5000-50000"
        | "over-50000"
        | "unknown",
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
      companyWebsite: String(formData.get("companyWebsite") ?? ""),
    });
  };

  return (
    <NumerisLayout className="quote-site">
      <main className="quote-page">
        <section className="quote-hero" aria-labelledby="quote-title">
          <div className="quote-hero-inner">
            <div>
              <span className="quote-kicker">
                <span /> DEMANDE DE DEVIS · SANS ENGAGEMENT
              </span>
              <h1 id="quote-title">
                Parlons de votre projet <em>documentaire.</em>
              </h1>
              <p>
                Dites-nous ce que vous souhaitez numériser, structurer ou rendre
                consultable. Nous étudierons le besoin décrit dans votre
                demande.
              </p>
            </div>
            <div className="quote-hero-note">
              <ShieldCheck size={23} />
              <span>
                <strong>Vos documents restent chez vous</strong>
                Aucun fichier n’est demandé dans ce formulaire.
              </span>
            </div>
          </div>
        </section>

        <section className="quote-content">
          <div className="quote-content-inner">
            <aside className="quote-aside">
              <span className="eyebrow">
                <i className="eyebrow-mark" /> VOTRE PROJET, À VOTRE RYTHME
              </span>
              <h2>
                Un premier échange,
                <br />
                <em>sans jargon.</em>
              </h2>
              <p>
                Quelques informations suffisent pour nous aider à comprendre
                votre contexte et à préparer une réponse adaptée.
              </p>
              <div className="quote-steps">
                <div>
                  <span>01</span>
                  <p>
                    <strong>Vous décrivez votre besoin</strong>
                    Type de documents, volume et objectifs.
                  </p>
                </div>
                <div>
                  <span>02</span>
                  <p>
                    <strong>Nous étudions votre demande</strong>
                    Vos informations servent au suivi de cette demande.
                  </p>
                </div>
                <div>
                  <span>03</span>
                  <p>
                    <strong>Nous revenons vers vous</strong>
                    Avec les éléments utiles pour la suite.
                  </p>
                </div>
              </div>
              <a className="quote-back-link" href="/#technologie">
                Découvrir la technologie <ArrowRight size={15} />
              </a>
            </aside>

            <div className="quote-form-card" id="quote-form">
              {reference ? (
                <div className="quote-success" role="status">
                  <span className="quote-success-icon">
                    <CheckCircle2 size={27} />
                  </span>
                  <span className="quote-form-eyebrow">
                    DEMANDE ENREGISTRÉE
                  </span>
                  <h2>Merci pour votre demande.</h2>
                  <p>
                    Votre projet a bien été enregistré. Conservez cette
                    référence pour le suivi de votre demande.
                  </p>
                  <div className="quote-reference">
                    Référence <strong>{reference}</strong>
                  </div>
                  <button
                    className="quote-secondary-button"
                    type="button"
                    onClick={() => {
                      setReference("");
                      submitQuote.reset();
                    }}
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <>
                  <div className="quote-form-heading">
                    <span className="quote-form-eyebrow">VOTRE DEMANDE</span>
                    <h2>Parlez-nous de votre besoin</h2>
                    <p>Les champs marqués d’un astérisque sont obligatoires.</p>
                  </div>
                  <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="quote-fields-grid">
                      <label className="quote-field">
                        <span>
                          Prénom <i>*</i>
                        </span>
                        <input
                          autoComplete="given-name"
                          name="firstName"
                          placeholder="Votre prénom"
                          maxLength={100}
                          required
                        />
                      </label>
                      <label className="quote-field">
                        <span>
                          Nom <i>*</i>
                        </span>
                        <input
                          autoComplete="family-name"
                          name="lastName"
                          placeholder="Votre nom"
                          maxLength={100}
                          required
                        />
                      </label>
                      <label className="quote-field quote-field-wide">
                        <span>
                          Entreprise / organisation <i>*</i>
                        </span>
                        <input
                          autoComplete="organization"
                          name="company"
                          placeholder="Nom de votre organisation"
                          maxLength={191}
                          required
                        />
                      </label>
                      <label className="quote-field">
                        <span>
                          E-mail professionnel <i>*</i>
                        </span>
                        <input
                          autoComplete="email"
                          type="email"
                          name="email"
                          placeholder="vous@entreprise.fr"
                          maxLength={320}
                          required
                        />
                      </label>
                      <label className="quote-field">
                        <span>
                          Téléphone <small>facultatif</small>
                        </span>
                        <input
                          autoComplete="tel"
                          type="tel"
                          name="phone"
                          placeholder="+33 …"
                          maxLength={32}
                        />
                      </label>
                      <label className="quote-field">
                        <span>
                          Votre besoin <i>*</i>
                        </span>
                        <select name="projectType" defaultValue="" required>
                          <option value="" disabled>
                            Choisir une prestation
                          </option>
                          <option value="digitization">
                            Numérisation de documents
                          </option>
                          <option value="ocr">
                            OCR et extraction de données
                          </option>
                          <option value="rag">
                            Recherche documentaire avec RAG
                          </option>
                          <option value="complete">
                            Projet global / à définir
                          </option>
                        </select>
                      </label>
                      <label className="quote-field">
                        <span>
                          Volume estimé <i>*</i>
                        </span>
                        <select name="volume" defaultValue="" required>
                          <option value="" disabled>
                            Choisir un volume
                          </option>
                          <option value="under-500">
                            Moins de 500 pages / mois
                          </option>
                          <option value="500-5000">
                            500 à 5 000 pages / mois
                          </option>
                          <option value="5000-50000">
                            5 000 à 50 000 pages / mois
                          </option>
                          <option value="over-50000">
                            Plus de 50 000 pages / mois
                          </option>
                          <option value="unknown">Je ne sais pas encore</option>
                        </select>
                      </label>
                      <label className="quote-field quote-field-wide">
                        <span>Quelques mots sur votre projet</span>
                        <textarea
                          name="message"
                          rows={2}
                          maxLength={2000}
                          placeholder="Votre contexte, vos objectifs ou vos contraintes…"
                        />
                      </label>
                    </div>

                    <div className="quote-honeypot" aria-hidden="true">
                      <label htmlFor="company-website">Ne pas remplir</label>
                      <input
                        id="company-website"
                        name="companyWebsite"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <label className="quote-consent">
                      <input type="checkbox" name="consent" required />
                      <span>
                        J’accepte d’être recontacté au sujet de cette demande de
                        devis. Mes coordonnées seront utilisées pour traiter
                        cette demande. <i>*</i>
                      </span>
                    </label>
                    <p className="quote-privacy-note">
                      Pour votre sécurité, ne transmettez pas de document
                      contenant des informations personnelles ou sensibles dans
                      ce formulaire.
                    </p>
                    {submitError && (
                      <p className="quote-error" role="alert">
                        {submitError}
                      </p>
                    )}
                    <button
                      className="quote-submit"
                      type="submit"
                      disabled={submitQuote.isPending}
                    >
                      {submitQuote.isPending
                        ? "Envoi en cours…"
                        : "Envoyer ma demande"}
                      {!submitQuote.isPending && <ArrowRight size={17} />}
                    </button>
                    <p className="quote-required-note">
                      <ShieldCheck size={14} /> Aucun document n’est téléversé.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </NumerisLayout>
  );
}
