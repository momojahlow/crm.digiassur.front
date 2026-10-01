import { useState } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import { Lock, Mail, User, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

export default function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <DigiassurHeader />

      <main className="flex-1 pt-[130px] pb-20 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#f48161]/10 text-[#f48161] rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#153954]">
              {isRegister ? "Créer votre Espace Client" : "Espace Client Digiassur"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isRegister
                ? "Gérez tous vos contrats d'assurance en un seul clic"
                : "Connectez-vous pour consulter vos contrats et attestations"}
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-6 animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#153954] mb-2">Bienvenue sur votre espace !</h3>
              <p className="text-xs text-slate-600 mb-6">
                Connexion réussie pour {email}. Vous allez être redirigé vers votre tableau de bord.
              </p>
              <Link
                href="/"
                className="inline-block bg-[#153954] text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-[#0d283c] transition"
              >
                Retour à l'accueil
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email ou Numéro de police
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4 text-[#f48161]" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="votre.email@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#568ba9] rounded-xl text-sm focus:outline-none focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4 text-[#f48161]" />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#568ba9] rounded-xl text-sm focus:outline-none focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input type="checkbox" className="rounded border-slate-300 text-[#f48161]" />
                  <span>Se souvenir de moi</span>
                </label>
                <a href="#forgot" className="text-[#f48161] hover:underline font-medium">
                  Mot de passe oublié ?
                </a>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-sm uppercase py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isRegister ? "S'inscrire" : "Se connecter"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-600">
                {isRegister ? (
                  <p>
                    Vous possédez déjà un compte ?{" "}
                    <button
                      type="button"
                      onClick={() => setIsRegister(false)}
                      className="text-[#153954] font-bold hover:underline"
                    >
                      Se connecter
                    </button>
                  </p>
                ) : (
                  <p>
                    Pas encore de compte ?{" "}
                    <button
                      type="button"
                      onClick={() => setIsRegister(true)}
                      className="text-[#f48161] font-bold hover:underline"
                    >
                      Créer un nouveau compte
                    </button>
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </main>

      <FloatingWidgets />
      <DigiassurFooter />
    </div>
  );
}
