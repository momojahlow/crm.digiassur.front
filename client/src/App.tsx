import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

const AdminPage = lazy(() => import("./pages/AdminPage"));
const DemoDashboard = lazy(() => import("./pages/DemoDashboard"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const QuoteRequest = lazy(() => import("./pages/QuoteRequest"));

function PageFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 text-sm font-medium text-slate-500">
      Chargement de Numeris…
    </div>
  );
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={<PageFallback />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/devis"} component={QuoteRequest} />
        <Route path={"/connexion"} component={LoginPage} />
        <Route path={"/dashboard"} component={DemoDashboard} />
        <Route path={"/admin"} component={AdminPage} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
