
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import refactored components
import { CurrentMetrics } from "@/components/biotracking/CurrentMetrics";
import { DailyTrend } from "@/components/biotracking/DailyTrend";
import { AlertThresholds } from "@/components/biotracking/AlertThresholds";
import { TrackingSettings } from "@/components/biotracking/TrackingSettings";
import { WeeklyInsights } from "@/components/biotracking/WeeklyInsights";
import { PatternRecognition } from "@/components/biotracking/PatternRecognition";

// Mock data for demonstration
const dailyData = [
  { hour: '12AM', heartRate: 65, hrv: 55 },
  { hour: '3AM', heartRate: 62, hrv: 58 },
  { hour: '6AM', heartRate: 68, hrv: 52 },
  { hour: '9AM', heartRate: 82, hrv: 43 },
  { hour: '12PM', heartRate: 75, hrv: 47 },
  { hour: '3PM', heartRate: 77, hrv: 45 },
  { hour: '6PM', heartRate: 74, hrv: 46 },
  { hour: '9PM', heartRate: 70, hrv: 48 },
];

const weeklyData = {
  sleep: [85, 72, 65, 88, 76, 80, 78],
  regulation: [90, 85, 65, 50, 75, 80, 85],
  heartRate: [72, 68, 75, 82, 76, 74, 70],
};

const BioTracking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [thresholds, setThresholds] = useState({
    heartRateHigh: 90,
    heartRateLow: 60,
    hrvHigh: 65,
    hrvLow: 35,
    sleepQuality: 70,
  });
  
  const [settings, setSettings] = useState({
    autoAdjust: true,
    notifyOnChange: true,
    collectEnvironmental: true,
    shareToCaregivers: false,
  });
  
  const handleThresholdChange = (metric: keyof typeof thresholds, value: number) => {
    setThresholds(prev => ({
      ...prev,
      [metric]: value
    }));
  };
  
  const handleToggleSetting = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your biometric tracking settings have been updated",
    });
  };
  
  return (
    <div className="space-y-6 pb-16">
      <div className="rounded-xl bg-sense-blue p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Biometric Tracking</h1>
        </div>
        
        <p className="text-sm px-4 text-muted-foreground">
          Monitor and customize how Hana uses your physiological data to detect early signs.
        </p>
      </div>
      
      <div className="px-4 space-y-6">
        <Tabs defaultValue="status" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="status" className="text-sm md:text-base py-3">Current Status</TabsTrigger>
            <TabsTrigger value="thresholds" className="text-sm md:text-base py-3">Thresholds</TabsTrigger>
            <TabsTrigger value="patterns" className="text-sm md:text-base py-3">Patterns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="status" className="space-y-6">
            <Card className="p-5">
              <h2 className="text-lg font-medium mb-4">Today's Metrics</h2>
              <CurrentMetrics 
                heartRate={75}
                restingHeartRate={68}
                hrv={45}
                sleepQuality={72}
                regulationStatus={85}
              />
            </Card>
            
            <Card className="p-5">
              <DailyTrend data={dailyData} />
            </Card>
          </TabsContent>
          
          <TabsContent value="thresholds" className="space-y-6">
            <Card className="p-5">
              <AlertThresholds 
                thresholds={thresholds}
                onThresholdChange={handleThresholdChange}
                onSave={saveSettings}
              />
            </Card>
            
            <Card className="p-5">
              <TrackingSettings 
                settings={settings}
                onToggleSetting={handleToggleSetting}
              />
            </Card>
          </TabsContent>
          
          <TabsContent value="patterns" className="space-y-6">
            <Card className="p-5">
              <WeeklyInsights data={weeklyData} />
            </Card>
            
            <Card className="p-5">
              <PatternRecognition />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BioTracking;
