import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { applyPageMeta } from "@/lib/seoMeta";
import { lazy, Suspense, useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Payment = lazy(() => import("./pages/Payment"));
const Support = lazy(() => import("./pages/Support"));
const About = lazy(() => import("./pages/About"));
const AiVideoComingSoon = lazy(() => import("./pages/AiVideoComingSoon"));
const CampaignRequest = lazy(() => import("./pages/CampaignRequest"));
const UgcVideoService = lazy(() => import("./pages/UgcVideoService"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function RouteLoading() {
  return <div dir="rtl" className="grid min-h-screen place-items-center bg-[#020a20] px-6 text-center text-white"><div><span className="inline-flex h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-[#ffd400]" /><p className="mt-4 text-sm font-bold text-slate-200">جارٍ تجهيز الصفحة...</p></div></div>;
}

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    applyPageMeta(location);
  }, [location]);

  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={<RouteLoading />}><Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/services"} component={Services} />
      <Route path={"/portfolio"} component={Portfolio} />
      <Route path={"/payment"} component={Payment} />
      <Route path={"/support"} component={Support} />
      <Route path={"/about"} component={About} />
      <Route path={"/campaign-request"} component={CampaignRequest} />
      <Route path={"/ugc-video"} component={UgcVideoService} />
      <Route path={"/ai-video-preview"} component={AiVideoComingSoon} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch></Suspense>
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
        defaultTheme="dark"
        // switchable
      >
        <LanguageProvider><TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider></LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
