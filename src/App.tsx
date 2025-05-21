
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AudioProvider } from "@/context/AudioContext";
import { AccessibilityProvider } from "@/context/AccessibilityContext";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ChatAssistant from "./pages/ChatAssistant";

// Support tools
import CalmingTools from "./pages/CalmingTools";
import BreathingExercise from "./pages/BreathingExercise";
import VisualStim from "./pages/VisualStim";
import SoundScape from "./pages/SoundScape";
import SOSCalm from "./pages/SOSCalm";
import GentleBuzz from "./pages/GentleBuzz";

// Plan tools
import DailyRoutine from "./pages/DailyRoutine";
import BreakTimer from "./pages/BreakTimer";
import RoutineWizard from "./pages/RoutineWizard";
import FocusMode from "./pages/FocusMode";

// Monitor tools
import EmotionLogger from "./pages/EmotionLogger";
import JournalEntry from "./pages/JournalEntry";
import BodyStats from "./pages/BodyStats";
import BioTracking from "./pages/BioTracking";
import EnvironmentalFactors from "./pages/EnvironmentalFactors";
import WarningSystem from "./pages/WarningSystem";
import EmotionHub from "./pages/EmotionHub";
import MeltdownLogger from "./pages/MeltdownLogger";
import MeltdownHistory from "./pages/MeltdownHistory";

// Learn tools
import Insights from "./pages/Insights";
import ResourceLibrary from "./pages/ResourceLibrary";
import EmotionInsights from "./pages/EmotionInsights";

// New section components
import Monitor from "./pages/sections/Monitor";
import Support from "./pages/sections/Support";
import Plan from "./pages/sections/Plan";
import Learn from "./pages/sections/Learn";
import Data from "./pages/sections/Data";

// Settings pages
import Settings from "./pages/Settings";
import DisplaySettings from "./pages/DisplaySettings";
import FeedbackSettings from "./pages/FeedbackSettings";
import PrivacySettings from "./pages/PrivacySettings";
import AdvancedViewsSettings from "./pages/AdvancedViewsSettings";
import AccessibilitySettings from "./pages/AccessibilitySettings";

// Welcome flow pages
import WelcomeIntro from "./pages/WelcomeIntro";
import EmojiCalibration from "./pages/EmojiCalibration";
import ChooseSOSSide from "./pages/ChooseSOSSide";
import WearablePairing from "./pages/WearablePairing";
import AddOnsMarketplace from "./pages/AddOnsMarketplace";
import WelcomeFinish from "./pages/WelcomeFinish";

// New pages
import SOSHistory from "./pages/SOSHistory";
import CaregiverView from "./pages/CaregiverView";
import NotificationCenter from "./pages/NotificationCenter";
import ProfileAccount from "./pages/ProfileAccount";
import SensoryProfile from "./pages/SensoryProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccessibilityProvider>
      <AudioProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Welcome/Onboarding flow - no layout */}
            <Route path="/welcome/intro" element={<WelcomeIntro />} />
            <Route path="/welcome/emoji-calibration" element={<EmojiCalibration />} />
            <Route path="/welcome/choose-sos-side" element={<ChooseSOSSide />} />
            <Route path="/welcome/wearable-pairing" element={<WearablePairing />} />
            <Route path="/welcome/add-ons" element={<AddOnsMarketplace />} />
            <Route path="/welcome/finish" element={<WelcomeFinish />} />

            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="chat" element={<ChatAssistant />} />
              
              {/* New section routes */}
              <Route path="monitor" element={<Monitor />} />
              <Route path="support" element={<Support />} />
              <Route path="plan" element={<Plan />} />
              <Route path="learn" element={<Learn />} />
              <Route path="data" element={<Data />} />
              
              {/* Support tools */}
              <Route path="tools" element={<CalmingTools />} />
              <Route path="breathing" element={<BreathingExercise />} />
              <Route path="visual" element={<VisualStim />} />
              <Route path="sounds" element={<SoundScape />} />
              <Route path="sos" element={<SOSCalm />} />
              <Route path="haptic" element={<GentleBuzz />} />
              
              {/* Monitor tools */}
              <Route path="emotion-logger" element={<EmotionLogger />} />
              <Route path="journal" element={<JournalEntry mode="quick" />} />
              <Route path="journal/prompted" element={<JournalEntry mode="prompted" />} />
              <Route path="journal/free" element={<JournalEntry mode="free" />} />
              <Route path="journal/voice" element={<JournalEntry mode="voice" />} />
              <Route path="body-stats" element={<BodyStats />} />
              <Route path="bio-tracking" element={<BioTracking />} />
              <Route path="environmental" element={<EnvironmentalFactors />} />
              <Route path="warning-system" element={<WarningSystem />} />
              <Route path="emotion-hub" element={<EmotionHub />} />
              <Route path="meltdown-logger" element={<MeltdownLogger />} />
              <Route path="meltdown-history" element={<MeltdownHistory />} />
              
              {/* Plan tools */}
              <Route path="break-timer" element={<BreakTimer />} />
              <Route path="routine" element={<DailyRoutine />} />
              <Route path="routine-wizard" element={<RoutineWizard />} />
              <Route path="focus" element={<FocusMode />} />
              
              {/* Learn tools */}
              <Route path="insights" element={<Insights />} />
              <Route path="emotion-insights" element={<EmotionInsights />} />
              <Route path="resource-library" element={<ResourceLibrary />} />
              
              {/* Settings routes */}
              <Route path="settings" element={<Settings />} />
              <Route path="settings/display" element={<DisplaySettings />} />
              <Route path="settings/feedback" element={<FeedbackSettings />} />
              <Route path="settings/privacy" element={<PrivacySettings />} />
              <Route path="settings/advanced-views" element={<AdvancedViewsSettings />} />
              <Route path="settings/add-ons" element={<AddOnsMarketplace />} />
              <Route path="settings/accessibility" element={<AccessibilitySettings />} />
              
              {/* New page routes */}
              <Route path="sos-history" element={<SOSHistory />} />
              <Route path="caregiver-view" element={<CaregiverView />} />
              <Route path="notification-center" element={<NotificationCenter />} />
              <Route path="profile-account" element={<ProfileAccount />} />
              <Route path="sensory-profile" element={<SensoryProfile />} />
              
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AudioProvider>
    </AccessibilityProvider>
  </QueryClientProvider>
);

export default App;
