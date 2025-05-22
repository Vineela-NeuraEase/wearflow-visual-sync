
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WarningSystem from './pages/WarningSystem';
import BioTracking from './pages/BioTracking';
import Resources from './pages/Resources';
import MeltdownTracking from './pages/MeltdownTracking';
import DataAccess from './pages/DataAccess';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <SiteHeader />
          <Routes>
            <Route path="/" element={<WarningSystem />} />
            <Route path="/biotracking" element={<BioTracking />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/meltdown-tracking" element={<MeltdownTracking />} />
            <Route path="/data-access" element={<DataAccess />} />
          </Routes>
          <SiteFooter />
          <Toaster />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
