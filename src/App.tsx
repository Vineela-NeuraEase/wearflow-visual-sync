
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AudioProvider } from "./context/AudioContext";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Home from "@/pages/Home";
import Index from "@/pages/Index";
import AuthPage from "@/pages/AuthPage";
import WarningSystem from "@/pages/WarningSystem";
import DataCollectionHub from "@/pages/DataCollectionHub";
import ResourceLibrary from "@/pages/ResourceLibrary";
import CalmingTools from "@/pages/CalmingTools";
import SOSCalm from "@/pages/SOSCalm";
import BreathingExercise from "@/pages/BreathingExercise";
import VisualStim from "@/pages/VisualStim";

// Components
import { ProtectedRoute } from "@/components/ProtectedRoute";

function App() {
  return (
    <Router>
      <AccessibilityProvider>
        <AuthProvider>
          <AudioProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/index" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/tools" element={<CalmingTools />} />
              <Route path="/sos" element={<SOSCalm />} />
              <Route path="/breathing" element={<BreathingExercise />} />
              <Route path="/visual" element={<VisualStim />} />
              
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
      </AccessibilityProvider>
    </Router>
  );
}

export default App;
