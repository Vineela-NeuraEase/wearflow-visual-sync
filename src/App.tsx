
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WarningSystem from './pages/WarningSystem';
import BioTracking from './pages/BioTracking';
import Resources from './pages/Resources';
import MeltdownTracking from './pages/MeltdownTracking';
import DataAccess from './pages/DataAccess';
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import Index from './pages/Index';
import ProfileAccount from './pages/ProfileAccount';
import { ProfileProvider } from './context/ProfileContext';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ProfileProvider>
          <Router>
            <SiteHeader />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              
              {/* All routes are accessible */}
              <Route path="/home" element={<Home />} />
              <Route path="/warning-system" element={<WarningSystem />} />
              <Route path="/biotracking" element={<BioTracking />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/meltdown-tracking" element={<MeltdownTracking />} />
              <Route path="/data-access" element={<DataAccess />} />
              <Route path="/profile-account" element={<ProfileAccount />} />

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <SiteFooter />
            <Toaster />
          </Router>
        </ProfileProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
