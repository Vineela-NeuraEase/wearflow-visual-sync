
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
import Auth from './pages/Auth';
import Index from './pages/Index';
import ProfileAccount from './pages/ProfileAccount';
import { AuthGuard } from './components/auth/AuthGuard';
import { ProfileProvider } from './context/ProfileContext';
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
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Index />} />
              
              {/* Protected routes */}
              <Route path="/home" element={<AuthGuard><Home /></AuthGuard>} />
              <Route path="/warning-system" element={<AuthGuard><WarningSystem /></AuthGuard>} />
              <Route path="/biotracking" element={<AuthGuard><BioTracking /></AuthGuard>} />
              <Route path="/resources" element={<AuthGuard><Resources /></AuthGuard>} />
              <Route path="/meltdown-tracking" element={<AuthGuard><MeltdownTracking /></AuthGuard>} />
              <Route path="/data-access" element={<AuthGuard><DataAccess /></AuthGuard>} />
              <Route path="/profile-account" element={<AuthGuard><ProfileAccount /></AuthGuard>} />

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
