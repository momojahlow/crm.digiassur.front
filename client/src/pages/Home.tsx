import { useCallback } from "react";
import DigiassurFooter from "@/components/DigiassurFooter";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurHero from "@/components/DigiassurHero";
import InsuranceExplorer from "@/components/InsuranceExplorer";
import TrustSection from "@/components/TrustSection";
import "./digiassur.css";

export default function Home() {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="digiassur-site">
      <DigiassurHeader onExplore={() => scrollTo("nos-assurances")} />
      <main>
        <DigiassurHero onExplore={() => scrollTo("nos-assurances")} />
        <TrustSection />
        <InsuranceExplorer onContact={() => scrollTo("contact")} />
        <section className="contact-banner" aria-labelledby="contact-banner-title">
          <div className="container contact-banner-inner">
            <div>
              <span className="eyebrow">À vos côtés, tout simplement</span>
              <h2 id="contact-banner-title">Vous avez une question ?<br /><em>On est là pour vous.</em></h2>
            </div>
            <a className="button button-coral button-large" href="#contact">Parlons de votre projet <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>
      <DigiassurFooter />
    </div>
  );
}
