
import React from "react";
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
import CalmingTools from "@/pages/CalmingTools";

// Components
import { ProtectedRoute } from "@/components/ProtectedRoute";

function App() {
  return (
    <React.StrictMode>
      <Router>
        <AuthProvider>
          <AudioProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/breathing" element={<BreathingExercise />} />
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
    </React.StrictMode>
  );
}

export default App;
