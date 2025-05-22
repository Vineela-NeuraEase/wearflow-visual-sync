
import { useState, useEffect } from "react";
import { useBiometricData } from "@/hooks/useBiometricData";
import { RegulationFactor, RegulationFactorTrend } from "@/pages/WarningSystem";

export function useWarningSystem() {
  const [showStrategies, setShowStrategies] = useState(false);
  
  // Use our biometric data hook
  const { 
    isConnected, 
    dataPoints, 
    isOnline,
    offlineData,
    connectDevice,
    addDataPoint
  } = useBiometricData({ maxDataPoints: 50 });
  
  // State for current status
  const [regulationFactors, setRegulationFactors] = useState<RegulationFactor[]>([
    { name: "Heart Rate", value: 78, impact: "medium", trend: "increasing" },
    { name: "HRV", value: 42, impact: "high", trend: "decreasing" },
    { name: "Sleep Quality", value: 65, impact: "medium", trend: "stable" },
    { name: "Environmental", value: 40, impact: "low", trend: "stable" }
  ]);
  
  const [regulationScore, setRegulationScore] = useState(72);
  const [warningActive, setWarningActive] = useState(true);
  
  // Update regulation factors and score based on real-time data
  useEffect(() => {
    if (dataPoints.length === 0) return;
    
    // Get the most recent data point
    const latestData = dataPoints[0];
    
    // Update regulation factors with real values
    const updatedFactors = [...regulationFactors];
    
    // Update Heart Rate
    if (latestData.heartRate) {
      const hrTrend = dataPoints.length > 1 && latestData.heartRate > dataPoints[1].heartRate 
        ? "increasing" 
        : dataPoints.length > 1 && latestData.heartRate < dataPoints[1].heartRate
          ? "decreasing"
          : "stable";
          
      updatedFactors[0] = {
        name: "Heart Rate",
        value: latestData.heartRate,
        impact: latestData.heartRate > 85 ? "high" : latestData.heartRate > 75 ? "medium" : "low",
        trend: hrTrend as RegulationFactorTrend
      };
    }
    
    // Update HRV
    if (latestData.hrv) {
      const hrvTrend = dataPoints.length > 1 && latestData.hrv < dataPoints[1].hrv 
        ? "decreasing" 
        : dataPoints.length > 1 && latestData.hrv > dataPoints[1].hrv
          ? "increasing"
          : "stable";
          
      updatedFactors[1] = {
        name: "HRV",
        value: latestData.hrv,
        impact: latestData.hrv < 45 ? "high" : latestData.hrv < 55 ? "medium" : "low",
        trend: hrvTrend as RegulationFactorTrend
      };
    }
    
    // Calculate a regulation score (inverse of stress level)
    const newScore = Math.max(0, 100 - latestData.stressLevel);
    
    setRegulationFactors(updatedFactors);
    setRegulationScore(newScore);
    
    // Set warning state based on regulation score
    setWarningActive(newScore < 80);
    
  }, [dataPoints]);
  
  // Convert dataPoints to SignalAnalysisChart format
  const getChartData = () => {
    // Mock data for demonstration (will be replaced by real-time data)
    const mockChartData = [
      { time: '8 AM', heartRate: 65, hrv: 55, regulationScore: 90, environmentalStress: 20 },
      { time: '10 AM', heartRate: 68, hrv: 52, regulationScore: 88, environmentalStress: 25 },
      { time: '12 PM', heartRate: 75, hrv: 48, regulationScore: 82, environmentalStress: 30 },
      { time: '2 PM', heartRate: 82, hrv: 42, regulationScore: 75, environmentalStress: 40 },
      { time: '4 PM', heartRate: 78, hrv: 44, regulationScore: 70, environmentalStress: 45 },
      { time: '6 PM', heartRate: 72, hrv: 46, regulationScore: 78, environmentalStress: 35 },
    ];
    
    if (dataPoints.length === 0) return mockChartData;
    
    return dataPoints.slice(0, 10).reverse().map(point => {
      const date = new Date(point.timestamp);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      
      return {
        time: `${hours}:${minutes}`,
        heartRate: point.heartRate,
        hrv: point.hrv,
        regulationScore: 100 - point.stressLevel,
        environmentalStress: point.stressLevel
      };
    });
  };
  
  // Handlers
  const handleDeviceConnected = (device: any) => {
    connectDevice(device);
  };
  
  const handleDataReceived = (data: any) => {
    addDataPoint(data);
  };
  
  const handleSaveThresholds = (settings: any) => {
    console.log("Saving threshold settings:", settings);
    // In a real app, this would save to a database or local storage
  };
  
  const handleSaveEnvironment = (factors: any) => {
    console.log("Environment tracked:", factors);
    // This would update the regulation score based on environmental factors
  };
  
  const handleShowStrategies = () => setShowStrategies(true);
  const handleHideStrategies = () => setShowStrategies(false);

  return {
    isConnected,
    dataPoints,
    isOnline,
    offlineData,
    regulationFactors,
    regulationScore,
    warningActive,
    showStrategies,
    getChartData,
    handleDeviceConnected,
    handleDataReceived,
    handleSaveThresholds,
    handleSaveEnvironment,
    handleShowStrategies,
    handleHideStrategies
  };
}
