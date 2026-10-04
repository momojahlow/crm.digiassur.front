import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AutoComparatorPage from "./pages/AutoComparatorPage";
import Epargne from "./pages/Epargne";
import Home from "./pages/Home";
import InsuranceProductPage from "./pages/InsuranceProductPage";
import QuotePage from "./pages/QuotePage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/comparateur-auto" component={AutoComparatorPage} />
      <Route path="/epargne" component={Epargne} />
      <Route path="/assurance/epargne" component={Epargne} />
      <Route path="/assurance/:slug" component={InsuranceProductPage} />
      <Route path="/devis/:slug" component={QuotePage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
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
