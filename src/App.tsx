
// Import necessary dependencies
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { AudioProvider } from "@/context/AudioContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";

// Import layouts
import Layout from "./components/layout/Layout";
import MinimalLayout from "./components/layout/MinimalLayout";

// Import pages
import Home from "@/pages/Home";
import Settings from "@/pages/Settings";
import Accessibility from "./pages/Accessibility";
import EmotionLogger from "@/pages/EmotionLogger";
import MeltdownLogger from "@/pages/MeltdownLogger";
import EmotionHub from "@/pages/EmotionHub";
import WarningSystem from "@/pages/WarningSystem";
import Learn from "./pages/Learn";
import ResourceDetail from "./pages/ResourceDetail";
import Welcome from "./pages/onboarding/Welcome";
import PersonalizeExperience from "./pages/onboarding/PersonalizeExperience";
import WearablePairing from "./pages/onboarding/WearablePairing";
import AddOns from "./pages/onboarding/AddOns";
import DataCollectionHub from "./pages/DataCollectionHub";
import Auth from "./pages/Auth";
import MeltdownHistory from "./pages/MeltdownHistory";
import Insights from "./pages/Insights";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <AccessibilityProvider>
        <AudioProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Router>
                <Routes>
                  {/* Public routes */}
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/welcome" element={<MinimalLayout children={<Welcome />} />} />
                  <Route path="/welcome/personalize" element={<MinimalLayout children={<PersonalizeExperience />} />} />
                  <Route path="/welcome/wearable" element={<MinimalLayout children={<WearablePairing />} />} />
                  <Route path="/welcome/add-ons" element={<MinimalLayout children={<AddOns />} />} />
                  
                  {/* Protected routes */}
                  <Route path="/" element={
                    <AuthGuard>
                      <Layout children={<Home />} />
                    </AuthGuard>
                  } />
                  <Route path="/settings" element={
                    <AuthGuard>
                      <Layout children={<Settings />} />
                    </AuthGuard>
                  } />
                  <Route path="/settings/accessibility" element={
                    <AuthGuard>
                      <Layout children={<Accessibility />} />
                    </AuthGuard>
                  } />
                  <Route path="/emotion-logger" element={
                    <AuthGuard>
                      <MinimalLayout children={<EmotionLogger />} />
                    </AuthGuard>
                  } />
                  <Route path="/meltdown-logger" element={
                    <AuthGuard>
                      <MinimalLayout children={<MeltdownLogger />} />
                    </AuthGuard>
                  } />
                  <Route path="/meltdown-history" element={
                    <AuthGuard>
                      <Layout children={<MeltdownHistory />} />
                    </AuthGuard>
                  } />
                  <Route path="/emotion-hub" element={
                    <AuthGuard>
                      <Layout children={<EmotionHub />} />
                    </AuthGuard>
                  } />
                  <Route path="/warning-system" element={
                    <AuthGuard>
                      <Layout children={<WarningSystem />} />
                    </AuthGuard>
                  } />
                  <Route path="/data-collection" element={
                    <AuthGuard>
                      <Layout children={<DataCollectionHub />} />
                    </AuthGuard>
                  } />
                  <Route path="/insights" element={
                    <AuthGuard>
                      <Layout children={<Insights />} />
                    </AuthGuard>
                  } />
                  <Route path="/learn" element={
                    <AuthGuard>
                      <Layout children={<Learn />} />
                    </AuthGuard>
                  } />
                  <Route path="/learn/:resourceId" element={
                    <AuthGuard>
                      <Layout children={<ResourceDetail />} />
                    </AuthGuard>
                  } />
                </Routes>
              </Router>
              <Toaster />
            </AuthProvider>
          </QueryClientProvider>
        </AudioProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  );
}

export default App;
