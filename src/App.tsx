
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
