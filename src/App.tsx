
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WarningSystem from './pages/WarningSystem';
import BioTracking from './pages/BioTracking';
import Resources from './pages/Resources';
import MeltdownTracking from './pages/MeltdownTracking';
import DataAccess from './pages/DataAccess';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { Layout } from './components/layout/Layout';
import Index from './pages/Index';
import Learn from './pages/Learn';
import ResourceLibrary from './pages/ResourceLibrary';
import ResourceDetail from './pages/ResourceDetail';
import Auth from './pages/Auth';
import { AuthGuard } from './components/auth/AuthGuard';
import DataCollectionHub from './pages/DataCollectionHub';
import ProfileAccount from './pages/ProfileAccount';
import Settings from './pages/Settings';
import EmotionHub from './pages/EmotionHub';
import EmotionInsights from './pages/Insights';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Routes with Layout */}
            <Route element={<Layout />}>
              <Route path="/home" element={<Navigate to="/warning-system" replace />} />
              <Route path="/warning-system" element={<WarningSystem />} />
              <Route path="/biotracking" element={<BioTracking />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/meltdown-tracking" element={<MeltdownTracking />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/resource-library" element={<ResourceLibrary />} />
              <Route path="/resource-library/:resourceId" element={<ResourceDetail />} />
              <Route path="/data-collection" element={<DataCollectionHub />} />
              <Route path="/emotion-hub" element={<EmotionHub />} />
              <Route path="/insights" element={<EmotionInsights />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile-account" element={<ProfileAccount />} />
              
              {/* Protected routes */}
              <Route path="/data-access" element={
                <AuthGuard>
                  <DataAccess />
                </AuthGuard>
              } />
            </Route>
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
