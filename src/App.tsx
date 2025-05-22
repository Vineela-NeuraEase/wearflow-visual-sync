
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Index from "@/pages/Index";
import AuthPage from "@/pages/AuthPage";
import WarningSystem from "@/pages/WarningSystem";
import DataCollectionHub from "@/pages/DataCollectionHub";
import ResourceLibrary from "@/pages/ResourceLibrary";

// Components
import { ProtectedRoute } from "@/components/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          
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
      </AuthProvider>
    </Router>
  );
}

export default App;
