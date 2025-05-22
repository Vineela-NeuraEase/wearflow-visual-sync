
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Wifi, WifiOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import refactored components
import { BluetoothDeviceManager } from "@/components/BluetoothDeviceManager";
import { CurrentMetrics } from "@/components/biotracking/CurrentMetrics";
import { DailyTrend } from "@/components/biotracking/DailyTrend";
import { AlertThresholds } from "@/components/biotracking/AlertThresholds";
import { TrackingSettings } from "@/components/biotracking/TrackingSettings";
import { WeeklyInsights } from "@/components/biotracking/WeeklyInsights";
import { PatternRecognition } from "@/components/biotracking/PatternRecognition";
import { PatternDetectionInsights } from "@/components/warning-system/PatternDetectionInsights";
import { useBiometricData } from "@/hooks/useBiometricData";

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
  
  // Use our custom hook for biometric data
  const {
    isConnected,
    deviceInfo,
    dataPoints,
    offlineData,
    isOnline,
    connectDevice,
    addDataPoint
  } = useBiometricData();
  
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
  
  const handleDeviceConnected = (device: any) => {
    connectDevice(device);
  };
  
  const handleDataReceived = (data: any) => {
    addDataPoint(data);
  };
  
  // Calculate current metrics from the most recent data point
  const getCurrentMetrics = () => {
    if (dataPoints.length === 0) {
      return {
        heartRate: 72,
        restingHeartRate: 65,
        hrv: 48,
        sleepQuality: 75,
        regulationStatus: 80
      };
    }
    
    const latestDataPoint = dataPoints[0];
    return {
      heartRate: latestDataPoint.heartRate,
      restingHeartRate: Math.min(65, latestDataPoint.heartRate - 5),
      hrv: latestDataPoint.hrv,
      sleepQuality: 75, // We don't have this in our data yet
      regulationStatus: 100 - latestDataPoint.stressLevel
    };
  };
  
  // Format data points for the daily trend
  const formatDailyTrendData = () => {
    if (dataPoints.length === 0) return dailyData;
    
    return dataPoints.slice(0, 8).reverse().map(point => {
      const date = new Date(point.timestamp);
      const hours = date.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hour = hours % 12 || 12;
      
      return {
        hour: `${hour}${ampm}`,
        heartRate: point.heartRate,
        hrv: point.hrv
      };
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
          
          <div className="ml-auto flex items-center">
            {!isOnline && (
              <div className="mr-2 flex items-center text-amber-500 bg-amber-50 px-2 py-1 rounded text-xs">
                <WifiOff className="h-3 w-3 mr-1" />
                Offline
              </div>
            )}
            {offlineData && offlineData.length > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  toast({
                    title: "Syncing Data",
                    description: `${offlineData.length} measurements being uploaded...`
                  });
                }}
                className="mr-2 text-xs"
                disabled={!isOnline}
              >
                <Upload className="h-3 w-3 mr-1" />
                Sync ({offlineData.length})
              </Button>
            )}
          </div>
        </div>
        
        <p className="text-sm px-4 text-muted-foreground">
          Monitor and customize how Hana uses your physiological data to detect early signs.
        </p>
      </div>
      
      <div className="px-4 space-y-6">
        <BluetoothDeviceManager 
          onDeviceConnected={handleDeviceConnected}
          onDataReceived={handleDataReceived}
        />
        
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
                {...getCurrentMetrics()}
              />
              
              {!isConnected && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
                  Connect a wearable device for real-time metrics and continuous monitoring.
                </div>
              )}
            </Card>
            
            <Card className="p-5">
              <DailyTrend data={formatDailyTrendData()} />
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
              <PatternDetectionInsights realtimeData={dataPoints} />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BioTracking;
