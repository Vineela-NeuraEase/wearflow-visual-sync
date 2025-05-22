
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AudioProvider } from "./context/AudioContext";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Index from "@/pages/Index";
import AuthPage from "@/pages/AuthPage";
import WarningSystem from "@/pages/WarningSystem";
import DataCollectionHub from "@/pages/DataCollectionHub";
import ResourceLibrary from "@/pages/ResourceLibrary";
import BreathingExercise from "@/pages/BreathingExercise";
import SOSCalm from "@/pages/SOSCalm";
import CalmingTools from "@/pages/CalmingTools";
import Visual from "@/pages/Visual";
import Sounds from "@/pages/Sounds";

// Components
import { ProtectedRoute } from "@/components/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AudioProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Calming tools and SOS routes */}
            <Route path="/breathing" element={<BreathingExercise />} />
            <Route path="/visual" element={<Visual />} />
            <Route path="/sounds" element={<Sounds />} />
            <Route path="/sos" element={<SOSCalm />} />
            <Route path="/tools" element={<CalmingTools />} />
            
            {/* Protected routes */}
            <Route
              path="/warning-system"
              element={
                <ProtectedRoute>
                  <WarningSystem />
                </ProtectedRoute>
              }
            />
            <Route
              path="/data-collection"
              element={
                <ProtectedRoute>
                  <DataCollectionHub />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resource-library"
              element={
                <ProtectedRoute>
                  <ResourceLibrary />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </AudioProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
