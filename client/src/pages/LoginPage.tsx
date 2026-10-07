import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { NumerisBrand } from "@/components/NumerisHeader";
import "./numeris.css";
import "./login-page.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Connexion — Numeris | Smart Print";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const handleDemoLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.assign("/dashboard");
  };

  return (
    <div className="numeris-site login-site" id="accueil">
      <main className="login-page" id="login-panel">
        <section className="login-card" aria-labelledby="login-title">
          <header className="login-card-header">
            <NumerisBrand />
            <span className="login-kicker">ESPACE DOCUMENTAIRE</span>
            <h1 id="login-title">Connexion</h1>
            <p>Accédez à votre espace Numeris</p>
          </header>

          <form className="login-form" onSubmit={handleDemoLogin}>
            <div className="login-field">
              <label htmlFor="login-email">Adresse e-mail</label>
              <div className="login-input-wrap">
                <Mail size={16} aria-hidden="true" />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  placeholder="vous@entreprise.fr"
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="login-password">Mot de passe</label>
              <div className="login-input-wrap">
                <LockKeyhole size={16} aria-hidden="true" />
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Votre mot de passe"
                  required
                />
                <button
                  className="login-password-toggle"
                  type="button"
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword(value => !value)}
                >
                  {showPassword ? (
                    <EyeOff size={16} aria-hidden="true" />
                  ) : (
                    <Eye size={16} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="login-form-options">
              <button
                className="login-forgot"
                type="button"
                onClick={() =>
                  setNotice(
                    "La récupération du mot de passe n’est pas activée dans cette démonstration."
                  )
                }
              >
                Mot de passe oublié ?
              </button>
            </div>

            {notice && (
              <p className="login-notice" role="status" aria-live="polite">
                {notice}
              </p>
            )}

            <button className="login-submit" type="submit">
              <span>Se connecter</span>
              <ArrowRight size={17} aria-hidden="true" />
            </button>

            <p className="login-demo-note">
              Démonstration uniquement : vos identifiants ne sont ni transmis ni
              enregistrés. Toute adresse e-mail valide ouvre le dashboard
              fictif.
            </p>
          </form>

          <div className="login-card-bottom">
            <a href="/">
              <ArrowLeft size={14} aria-hidden="true" /> Retour au site
            </a>
          </div>
        </section>
        <p className="login-footnote">
          Smart Print · Espace documentaire Numeris · Maquette de démonstration
        </p>
      </main>
    </div>
  );
}
