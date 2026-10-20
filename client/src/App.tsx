import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

// Internal Pages
import Home from "./pages/Home";
import EpargnePage from "./pages/EpargnePage";
import EpargneDevisPage from "./pages/EpargneDevisPage";
import AutoPage from "./pages/AutoPage";
import AutoDevisPage from "./pages/AutoDevisPage";
import AutoDevisPageOld from "./pages/AutoDevisPage_old";
import MotoPage from "./pages/MotoPage";
import MotoDevisPage from "./pages/MotoDevisPage";
import AccidentPage from "./pages/AccidentPage";
import AccidentDevisPage from "./pages/AccidentDevisPage";
import HabitationPage from "./pages/HabitationPage";
import HabitationDevisPage from "./pages/HabitationDevisPage";
import VoyagePage from "./pages/VoyagePage";
import VoyageDevisPage from "./pages/VoyageDevisPage";
import SantePage from "./pages/SantePage";
import SanteDevisPage from "./pages/SanteDevisPage";
import LoisirPage from "./pages/LoisirPage";
import LoisirDevisPage from "./pages/LoisirDevisPage";
import EntreprisePage from "./pages/EntreprisePage";
import MrePage from "./pages/MrePage";
import AffiliationPage from "./pages/AffiliationPage";
import ProductPage from "./pages/ProductPage";
import ConnexionPage from "./pages/ConnexionPage";
import ContactPage from "./pages/ContactPage";
import MentionsLegalesPage from "./pages/MentionsLegalesPage";

function Router() {
  return (
    <Switch>
      {/* Home (Figma proposition-4 / Node 188-2894) */}
      <Route path="/" component={Home} />

      {/* Epargne (Figma Desktop - 24 & Obtenir un devis) */}
      <Route path="/epargne" component={EpargnePage} />
      <Route path="/epargne/obtenir-un-devis" component={EpargneDevisPage} />
      <Route path="/epargne/devis-epargne" component={EpargneDevisPage} />
      <Route path="/epargne/devis" component={EpargneDevisPage} />

      {/* Auto (Figma Desktop - 8 & 5-Step Devis Funnel) */}
      <Route path="/auto" component={AutoPage} />
      <Route path="/auto/devis-auto" component={AutoDevisPage} />
      <Route path="/auto/devis" component={AutoDevisPage} />
      <Route path="/auto/devis-auto-old" component={AutoDevisPageOld} />
      <Route path="/auto/devis-old" component={AutoDevisPageOld} />

      {/* Moto (Figma Desktop - 8, 9, 10, 11, 13) */}
      <Route path="/moto" component={MotoPage} />
      <Route path="/moto/devis-moto" component={MotoDevisPage} />
      <Route path="/moto/devis" component={MotoDevisPage} />

      {/* Accident (Desktop - 14, 15, 16, 17 & Devis Pomme/Orange/Kiwi) */}
      <Route path="/accident" component={AccidentPage} />
      <Route path="/accident/devis-accident" component={AccidentDevisPage} />
      <Route path="/accident/devis" component={AccidentDevisPage} />
      <Route path="/accident/obtenir-un-devis" component={AccidentDevisPage} />

      {/* Habitation */}
      <Route path="/habitation" component={HabitationPage} />
      <Route path="/habitation/obtenir-un-devis" component={HabitationDevisPage} />
      <Route path="/habitation/devis-habitation" component={HabitationDevisPage} />
      <Route path="/habitation/devis" component={HabitationDevisPage} />

      {/* Voyage */}
      <Route path="/voyage" component={VoyagePage} />
      <Route path="/voyage/obtenir-un-devis" component={VoyageDevisPage} />
      <Route path="/voyage/devis-voyage" component={VoyageDevisPage} />
      <Route path="/voyage/devis" component={VoyageDevisPage} />

      {/* Santé / Prévoyance */}
      <Route path="/sante" component={SantePage} />
      <Route path="/sante/obtenir-un-devis" component={SanteDevisPage} />
      <Route path="/sante/devis-sante" component={SanteDevisPage} />
      <Route path="/sante/devis" component={SanteDevisPage} />

      {/* Loisir */}
      <Route path="/loisir" component={LoisirPage} />
      <Route path="/loisir/obtenir-un-devis" component={LoisirDevisPage} />
      <Route path="/loisir/devis-loisir" component={LoisirDevisPage} />
      <Route path="/loisir/devis" component={LoisirDevisPage} />
      <Route path="/entreprise" component={EntreprisePage} />
      <Route path="/affiliation" component={AffiliationPage} />
      <Route path="/marocains-etranger" component={MrePage} />

      {/* Utilities */}
      <Route path="/connexion" component={ConnexionPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/mentions-legales" component={MentionsLegalesPage} />
      <Route path="/cgv" component={MentionsLegalesPage} />

      {/* 404 Fallback */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
