import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useBiometricData } from "@/domains/biometrics/hooks";

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

export const useBioTrackingState = () => {
  const { toast } = useToast();
  
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
  
  // Weekly data for insights tab
  const weeklyData = {
    sleep: [85, 72, 65, 88, 76, 80, 78],
    regulation: [90, 85, 65, 50, 75, 80, 85],
    heartRate: [72, 68, 75, 82, 76, 74, 70],
  };
  
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
  
  return {
    isConnected,
    dataPoints,
    offlineData,
    isOnline,
    thresholds,
    settings,
    weeklyData,
    handleThresholdChange,
    handleToggleSetting,
    saveSettings,
    handleDeviceConnected,
    handleDataReceived,
    getCurrentMetrics,
    formatDailyTrendData
  };
};
