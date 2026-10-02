import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Internal Pages
import Home from "./pages/Home";
import EpargnePage from "./pages/EpargnePage";
import AutoPage from "./pages/AutoPage";
import AutoDevisPage from "./pages/AutoDevisPage";
import MotoPage from "./pages/MotoPage";
import MotoDevisPage from "./pages/MotoDevisPage";
import AccidentPage from "./pages/AccidentPage";
import AccidentDevisPage from "./pages/AccidentDevisPage";
import HabitationPage from "./pages/HabitationPage";
import VoyagePage from "./pages/VoyagePage";
import SantePage from "./pages/SantePage";
import LoisirPage from "./pages/LoisirPage";
import ProductPage from "./pages/ProductPage";
import ConnexionPage from "./pages/ConnexionPage";
import ContactPage from "./pages/ContactPage";
import MentionsLegalesPage from "./pages/MentionsLegalesPage";

function Router() {
  return (
    <Switch>
      {/* Home (Figma proposition-4 / Node 188-2894) */}
      <Route path="/" component={Home} />

      {/* Epargne (Figma Desktop - 24) */}
      <Route path="/epargne" component={EpargnePage} />

      {/* Auto (Figma Desktop - 8 & 5-Step Devis Funnel) */}
      <Route path="/auto" component={AutoPage} />
      <Route path="/auto/devis-auto" component={AutoDevisPage} />
      <Route path="/auto/devis" component={AutoDevisPage} />

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

      {/* Voyage */}
      <Route path="/voyage" component={VoyagePage} />

      {/* Santé / Prévoyance */}
      <Route path="/sante" component={SantePage} />

      {/* Loisir */}
      <Route path="/loisir" component={LoisirPage} />
      <Route path="/entreprise">
        {() => <ProductPage productKey="entreprise" />}
      </Route>
      <Route path="/affiliation">
        {() => <ProductPage productKey="entreprise" />}
      </Route>
      <Route path="/marocains-etranger">
        {() => <ProductPage productKey="voyage" />}
      </Route>

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
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
