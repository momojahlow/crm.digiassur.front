import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import { ShieldCheck, FileText, Lock, Building } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MentionsLegalesPage() {
  const { t, isRTL, language } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <DigiassurHeader />

      <main className="flex-1 pt-[130px] pb-20">
        <div className="max-w-[1000px] mx-auto px-6">
          {/* Header */}
          <div className={`bg-white p-8 lg:p-12 rounded-2xl shadow-sm border border-slate-100 mb-8 ${isRTL ? "text-right" : "text-left"}`}>
            <div className="inline-flex items-center gap-2 bg-[#f48161]/10 text-[#f48161] font-bold text-xs uppercase px-3.5 py-1.5 rounded-full mb-4">
              <FileText className="w-3.5 h-3.5" />
              <span>Informations Légales & Réglementaires</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-[#153954] mb-4">
              Mentions Légales & Politique de Confidentialité
            </h1>
            <p className="text-sm text-slate-500">
              Dernière mise à jour : {new Date().toLocaleDateString(language === "ar" ? "ar-MA" : language === "en" ? "en-US" : "fr-FR", { year: "numeric", month: "long" })}
            </p>
          </div>

          {/* Legal Sections */}
          <div className="space-y-6">
            {/* 1. Éditeur du site */}
            <div className={`bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-100 ${isRTL ? "text-right" : "text-left"}`}>
              <div className="flex items-center gap-3 text-[#153954] font-bold text-lg mb-4">
                <Building className="w-5 h-5 text-[#f48161]" />
                <h2>1. Éditeur de la plateforme DigiAssur</h2>
              </div>
              <div className="text-sm text-slate-600 leading-relaxed space-y-3">
                <p>
                  Le site <strong>DigiAssur</strong> (<span className="text-[#153954]">digiassur.ma</span>) est édité par la société <strong>Assur'wi</strong>, société de courtage d’assurance et de réassurance.
                </p>
                <ul className={`list-disc ${isRTL ? "pr-5" : "pl-5"} space-y-1.5 text-slate-600`}>
                  <li><strong>Forme juridique :</strong> Société à Responsabilité Limitée d'Assurance</li>
                  <li><strong>Agrément ministériel :</strong> Décision du 16 Mai 2018 portant le numéro C340893782018780 régie par la loi n° 17-99 portant code des assurances</li>
                  <li><strong>Siège social :</strong> 27, Rue Ain Asserdoune, Rez de jardin, CIL, Casablanca, Maroc</li>
                  <li><strong>Téléphone :</strong> (+212) 522 36 81 82</li>
                  <li><strong>Email :</strong> contact@digiassur.ma</li>
                </ul>
              </div>
            </div>

            {/* 2. Protection des données personnelles (CNDP) */}
            <div className={`bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-100 ${isRTL ? "text-right" : "text-left"}`}>
              <div className="flex items-center gap-3 text-[#153954] font-bold text-lg mb-4">
                <ShieldCheck className="w-5 h-5 text-[#f48161]" />
                <h2>2. Protection des données personnelles (Loi 09-08)</h2>
              </div>
              <div className="text-sm text-slate-600 leading-relaxed space-y-3">
                <p>
                  Les informations recueillies sur le site DigiAssur font l'objet d'un traitement informatique destiné exclusivement à la tarification, l'émission des devis d'assurance et la gestion de la relation client.
                </p>
                <p>
                  Conformément à la loi n° 09-08 promulguée par le Dahir 1-09-15 du 18 février 2009, relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, ce traitement a fait l'objet d'une déclaration et récépissé auprès de la <strong>CNDP (Commission Nationale de Contrôle de la Protection des Données à Caractère Personnel)</strong> sous le numéro d'autorisation : <strong className="text-[#153954]">A-GC-232/2023</strong>.
                </p>
                <p>
                  Vous bénéficiez d'un droit d'accès, de rectification et d'opposition aux informations qui vous concernent en vous adressant directement à notre délégué à la protection des données : <strong>contact@digiassur.ma</strong>.
                </p>
              </div>
            </div>

            {/* 3. Sécurité & Confidentialité */}
            <div className={`bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-100 ${isRTL ? "text-right" : "text-left"}`}>
              <div className="flex items-center gap-3 text-[#153954] font-bold text-lg mb-4">
                <Lock className="w-5 h-5 text-[#f48161]" />
                <h2>3. Sécurité des échanges</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Toutes les transmissions de données relatives aux demandes de devis et souscriptions sont chiffrées selon les protocoles de sécurité SSL/TLS standard du secteur, garantissant l'intégrité et la confidentialité de vos informations.
              </p>
            </div>
          </div>
        </div>
      </main>

      <FloatingWidgets />
      <DigiassurFooter />
    </div>
  );
}
