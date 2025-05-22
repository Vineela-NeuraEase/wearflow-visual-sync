
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
import { Layout } from "./components/layout/Layout";
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
import Index from "./pages/Index";

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
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/welcome" element={<MinimalLayout><Welcome /></MinimalLayout>} />
                  <Route path="/welcome/personalize" element={<MinimalLayout><PersonalizeExperience /></MinimalLayout>} />
                  <Route path="/welcome/wearable" element={<MinimalLayout><WearablePairing /></MinimalLayout>} />
                  <Route path="/welcome/add-ons" element={<MinimalLayout><AddOns /></MinimalLayout>} />
                  
                  {/* Protected routes */}
                  <Route path="/home" element={
                    <AuthGuard>
                      <Layout />
                    </AuthGuard>
                  }>
                    <Route index element={<Home />} />
                  </Route>
                  <Route path="/settings" element={
                    <AuthGuard>
                      <Layout />
                    </AuthGuard>
                  }>
                    <Route index element={<Settings />} />
                  </Route>
                  <Route path="/settings/accessibility" element={
                    <AuthGuard>
                      <Layout />
                    </AuthGuard>
                  }>
                    <Route index element={<Accessibility />} />
                  </Route>
                  <Route path="/emotion-logger" element={
                    <AuthGuard>
                      <MinimalLayout><EmotionLogger /></MinimalLayout>
                    </AuthGuard>
                  } />
                  <Route path="/meltdown-logger" element={
                    <AuthGuard>
                      <MinimalLayout><MeltdownLogger /></MinimalLayout>
                    </AuthGuard>
                  } />
                  <Route path="/meltdown-history" element={
                    <AuthGuard>
                      <Layout />
                    </AuthGuard>
                  }>
                    <Route index element={<MeltdownHistory />} />
                  </Route>
                  <Route path="/emotion-hub" element={
                    <AuthGuard>
                      <Layout />
                    </AuthGuard>
                  }>
                    <Route index element={<EmotionHub />} />
                  </Route>
                  <Route path="/warning-system" element={
                    <AuthGuard>
                      <Layout />
                    </AuthGuard>
                  }>
                    <Route index element={<WarningSystem />} />
                  </Route>
                  <Route path="/data-collection" element={
                    <AuthGuard>
                      <Layout />
                    </AuthGuard>
                  }>
                    <Route index element={<DataCollectionHub />} />
                  </Route>
                  <Route path="/insights" element={
                    <AuthGuard>
                      <Layout />
                    </AuthGuard>
                  }>
                    <Route index element={<Insights />} />
                  </Route>
                  <Route path="/learn" element={
                    <AuthGuard>
                      <Layout />
                    </AuthGuard>
                  }>
                    <Route index element={<Learn />} />
                  </Route>
                  <Route path="/learn/:resourceId" element={
                    <AuthGuard>
                      <Layout />
                    </AuthGuard>
                  }>
                    <Route index element={<ResourceDetail />} />
                  </Route>
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
