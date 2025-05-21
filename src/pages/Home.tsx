
import { useState } from "react";
import HeaderSection from "@/components/home/HeaderSection";
import StatusCard from "@/components/home/StatusCard";
import AssistantCard from "@/components/home/AssistantCard";
import QuickReliefSection from "@/components/home/QuickReliefSection";
import QuickAccessSection from "@/components/home/QuickAccessSection";
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
      
      <AssistantCard />
      
      <QuickReliefSection />
      
      <QuickAccessSection />
      
      <UpcomingEventCard />

      <AccessibilityNotice />
    </div>
  );
};

export default Home;
