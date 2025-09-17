import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";

// Component Examples (for development/preview)
import PanicButtonExample from "@/components/examples/PanicButton";
import LanguageSelectorExample from "@/components/examples/LanguageSelector";
import SafetyScoreWidgetExample from "@/components/examples/SafetyScoreWidget";
import LocationCardExample from "@/components/examples/LocationCard";
import DigitalIDCardExample from "@/components/examples/DigitalIDCard";
import SaarthiCardExample from "@/components/examples/SaarthiCard";
import InteractiveMapExample from "@/components/examples/InteractiveMap";
import NavigationHeaderExample from "@/components/examples/NavigationHeader";
import FeatureGridExample from "@/components/examples/FeatureGrid";
import HeroSectionExample from "@/components/examples/HeroSection";
import PoliceAlertCardExample from "@/components/examples/PoliceAlertCard";

function Router() {
  return (
    <Switch>
      {/* Main Application Routes */}
      <Route path="/" component={Landing} />
      <Route path="/dashboard" component={Dashboard} />
      
      {/* Component Examples (for development) */}
      <Route path="/examples/panic-button" component={PanicButtonExample} />
      <Route path="/examples/language-selector" component={LanguageSelectorExample} />
      <Route path="/examples/safety-score" component={SafetyScoreWidgetExample} />
      <Route path="/examples/location-card" component={LocationCardExample} />
      <Route path="/examples/digital-id" component={DigitalIDCardExample} />
      <Route path="/examples/saarthi" component={SaarthiCardExample} />
      <Route path="/examples/map" component={InteractiveMapExample} />
      <Route path="/examples/navigation" component={NavigationHeaderExample} />
      <Route path="/examples/features" component={FeatureGridExample} />
      <Route path="/examples/hero" component={HeroSectionExample} />
      <Route path="/examples/police-alerts" component={PoliceAlertCardExample} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;