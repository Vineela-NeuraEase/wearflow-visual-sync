
import { useState } from "react";
import HeaderSection from "@/components/home/HeaderSection";
import StatusCard from "@/components/home/StatusCard";
import QuickActionsSection from "@/components/home/QuickActionsSection";
import UpcomingEventCard from "@/components/home/UpcomingEventCard";
import AccessibilityNotice from "@/components/home/AccessibilityNotice";

const Home = () => {
  // Mock data for biometric status
  const regulationScore = 85;
  const heartRate = 72;
  const hrv = 48;
  
  return (
    <div className="space-y-6">
      <HeaderSection />
      
      {/* Biometric Status Card */}
      <StatusCard 
        regulationScore={regulationScore} 
        heartRate={heartRate} 
        hrv={hrv} 
      />
      
      <QuickActionsSection />
      
      <UpcomingEventCard />

      <AccessibilityNotice />
    </div>
  );
};

export default Home;
