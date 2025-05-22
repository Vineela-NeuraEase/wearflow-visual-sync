
// Import necessary dependencies
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { AudioProvider } from "@/context/AudioContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

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
            <Router>
              <Routes>
                <Route path="/" element={<Layout children={<Home />} />} />
                <Route path="/settings" element={<Layout children={<Settings />} />} />
                <Route path="/settings/accessibility" element={<Layout children={<Accessibility />} />} />
                <Route path="/emotion-logger" element={<MinimalLayout children={<EmotionLogger />} />} />
                <Route path="/meltdown-logger" element={<MinimalLayout children={<MeltdownLogger />} />} />
                <Route path="/emotion-hub" element={<Layout children={<EmotionHub />} />} />
                <Route path="/warning-system" element={<Layout children={<WarningSystem />} />} />
                <Route path="/data-collection" element={<Layout children={<DataCollectionHub />} />} />
                <Route path="/learn" element={<Layout children={<Learn />} />} />
                <Route path="/learn/:resourceId" element={<Layout children={<ResourceDetail />} />} />
                <Route path="/welcome" element={<MinimalLayout children={<Welcome />} />} />
                <Route path="/welcome/personalize" element={<MinimalLayout children={<PersonalizeExperience />} />} />
                <Route path="/welcome/wearable" element={<MinimalLayout children={<WearablePairing />} />} />
                <Route path="/welcome/add-ons" element={<MinimalLayout children={<AddOns />} />} />
              </Routes>
            </Router>
            <Toaster />
          </QueryClientProvider>
        </AudioProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  );
}

export default App;
