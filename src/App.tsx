
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AudioProvider } from "@/context/AudioContext";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ChatAssistant from "./pages/ChatAssistant";
import CalmingTools from "./pages/CalmingTools";
import BreathingExercise from "./pages/BreathingExercise";
import VisualStim from "./pages/VisualStim";
import SoundScape from "./pages/SoundScape";
import SOSCalm from "./pages/SOSCalm";
import DailyRoutine from "./pages/DailyRoutine";
import GentleBuzz from "./pages/GentleBuzz";
import NotFound from "./pages/NotFound";
import BreakTimer from "./pages/BreakTimer";
import EmotionLogger from "./pages/EmotionLogger";
import RoutineWizard from "./pages/RoutineWizard";
import JournalEntry from "./pages/JournalEntry";
import FocusMode from "./pages/FocusMode";
import BodyStats from "./pages/BodyStats";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AudioProvider>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="chat" element={<ChatAssistant />} />
            <Route path="tools" element={<CalmingTools />} />
            <Route path="breathing" element={<BreathingExercise />} />
            <Route path="visual" element={<VisualStim />} />
            <Route path="sounds" element={<SoundScape />} />
            <Route path="sos" element={<SOSCalm />} />
            <Route path="routine" element={<DailyRoutine />} />
            <Route path="haptic" element={<GentleBuzz />} />
            <Route path="break-timer" element={<BreakTimer />} />
            <Route path="emotion-logger" element={<EmotionLogger />} />
            <Route path="routine-wizard" element={<RoutineWizard />} />
            <Route path="journal" element={<JournalEntry mode="quick" />} />
            <Route path="journal/prompted" element={<JournalEntry mode="prompted" />} />
            <Route path="journal/free" element={<JournalEntry mode="free" />} />
            <Route path="journal/voice" element={<JournalEntry mode="voice" />} />
            <Route path="focus" element={<FocusMode />} />
            <Route path="body-stats" element={<BodyStats />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AudioProvider>
  </QueryClientProvider>
);

export default App;
