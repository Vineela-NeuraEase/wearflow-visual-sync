
import { useState } from "react";
import HeaderSection from "@/components/home/HeaderSection";
import StatusCard from "@/components/home/StatusCard";
import QuickActionsSection from "@/components/home/QuickActionsSection";
import UpcomingEventCard from "@/components/home/UpcomingEventCard";
import AccessibilityNotice from "@/components/home/AccessibilityNotice";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const Home = () => {
  // Mock data for biometric status
  const regulationScore = 85;
  const heartRate = 72;
  const hrv = 48;
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-primary/10 via-purple-500/5 to-blue-500/10 rounded-xl p-3 shadow-sm border border-primary/10 dark:border-primary/5"
      >
        <HeaderSection />
      </motion.div>
      
      {/* Biometric Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <StatusCard 
          regulationScore={regulationScore} 
          heartRate={heartRate} 
          hrv={hrv} 
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <QuickActionsSection />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <UpcomingEventCard />
      </motion.div>

      <motion.div 
        className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 p-4 rounded-xl border border-green-200 dark:border-green-900/20 shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <h2 className="text-lg font-medium mb-2 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">Daily Tip</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Taking a 5-minute break every hour can help reduce sensory overload and improve focus.</p>
      </motion.div>

      <AccessibilityNotice />
    </div>
  );
};

export default Home;
