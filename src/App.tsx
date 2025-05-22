// Import necessary dependencies
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { AudioProvider } from "@/context/AudioContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

// Import layouts
import Layout from "@/components/layout/Layout";
import MinimalLayout from "@/components/layout/MinimalLayout";

// Import pages
import Home from "@/pages/Home";
import Settings from "@/pages/Settings";
import Accessibility from "@/pages/Accessibility";
import EmotionLogger from "@/pages/EmotionLogger";
import MeltdownLogger from "@/pages/MeltdownLogger";
import EmotionHub from "@/pages/EmotionHub";
import WarningSystem from "@/pages/WarningSystem";
import Learn from "@/pages/Learn";
import ResourceDetail from "@/pages/ResourceDetail";
import Welcome from "@/pages/onboarding/Welcome";
import PersonalizeExperience from "@/pages/onboarding/PersonalizeExperience";
import WearablePairing from "@/pages/onboarding/WearablePairing";
import AddOns from "@/pages/onboarding/AddOns";
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
    <ThemeProvider>
      <AccessibilityProvider>
        <AudioProvider>
          <QueryClientProvider client={queryClient}>
            <Router>
              <Routes>
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/settings" element={<Layout><Settings /></Layout>} />
                <Route path="/settings/accessibility" element={<Layout><Accessibility /></Layout>} />
                <Route path="/emotion-logger" element={<MinimalLayout><EmotionLogger /></MinimalLayout>} />
                <Route path="/meltdown-logger" element={<MinimalLayout><MeltdownLogger /></MinimalLayout>} />
                <Route path="/emotion-hub" element={<Layout><EmotionHub /></Layout>} />
                <Route path="/warning-system" element={<Layout><WarningSystem /></Layout>} />
                <Route path="/data-collection" element={<Layout><DataCollectionHub /></Layout>} />
                <Route path="/learn" element={<Layout><Learn /></Layout>} />
                <Route path="/learn/:resourceId" element={<Layout><ResourceDetail /></Layout>} />
                <Route path="/welcome" element={<MinimalLayout><Welcome /></MinimalLayout>} />
                <Route path="/welcome/personalize" element={<MinimalLayout><PersonalizeExperience /></MinimalLayout>} />
                <Route path="/welcome/wearable" element={<MinimalLayout><WearablePairing /></MinimalLayout>} />
                <Route path="/welcome/add-ons" element={<MinimalLayout><AddOns /></MinimalLayout>} />
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
