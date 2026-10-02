import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Internal Pages
import Home from "./pages/Home";
import AutoPage from "./pages/AutoPage";
import AutoDevisPage from "./pages/AutoDevisPage";
import MotoPage from "./pages/MotoPage";
import ProductPage from "./pages/ProductPage";
import ConnexionPage from "./pages/ConnexionPage";
import ContactPage from "./pages/ContactPage";
import MentionsLegalesPage from "./pages/MentionsLegalesPage";

function Router() {
  return (
    <Switch>
      {/* Home & Epargne */}
      <Route path="/" component={Home} />
      <Route path="/epargne" component={Home} />

      {/* Auto & Moto (Figma Node 299-8058 & Live Devis Funnel) */}
      <Route path="/auto" component={AutoPage} />
      <Route path="/auto/devis-auto" component={AutoDevisPage} />
      <Route path="/auto/devis" component={AutoDevisPage} />
      <Route path="/moto" component={MotoPage} />

      {/* Other insurance products */}
      <Route path="/accident">
        {() => <ProductPage productKey="accident" />}
      </Route>
      <Route path="/habitation">
        {() => <ProductPage productKey="habitation" />}
      </Route>
      <Route path="/voyage">
        {() => <ProductPage productKey="voyage" />}
      </Route>
      <Route path="/sante">
        {() => <ProductPage productKey="sante" />}
      </Route>
      <Route path="/loisir">
        {() => <ProductPage productKey="loisir" />}
      </Route>
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
