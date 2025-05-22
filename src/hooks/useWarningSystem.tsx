
import { useState, useEffect } from "react";
import { useBiometricData } from "@/hooks/useBiometricData";
import { RegulationFactor, RegulationFactorTrend } from "@/pages/WarningSystem";
import { SleepData, SensoryData, RoutineData, BehavioralData } from "@/types/biometric";

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
  
  // Add state for new tracking metrics
  const [sleepData, setSleepData] = useState<SleepData | null>(null);
  const [sensoryData, setSensoryData] = useState<SensoryData | null>(null);
  const [routineData, setRoutineData] = useState<RoutineData | null>(null);
  const [behavioralData, setBehavioralData] = useState<BehavioralData | null>(null);
  
  // State for current status
  const [regulationFactors, setRegulationFactors] = useState<RegulationFactor[]>([
    { name: "Heart Rate", value: 78, impact: "medium", trend: "increasing" },
    { name: "HRV", value: 42, impact: "high", trend: "decreasing" },
    { name: "Sleep Quality", value: 65, impact: "medium", trend: "stable" },
    { name: "Environmental", value: 40, impact: "low", trend: "stable" },
    { name: "Sensory Load", value: 45, impact: "medium", trend: "stable" },
    { name: "Routine Deviation", value: 20, impact: "low", trend: "stable" }
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
    
    // Update Sleep Quality if available
    if (latestData.sleepQuality !== undefined) {
      updatedFactors[2] = {
        name: "Sleep Quality",
        value: latestData.sleepQuality,
        impact: latestData.sleepQuality < 50 ? "high" : latestData.sleepQuality < 70 ? "medium" : "low",
        trend: "stable" // We don't have previous sleep data in this context
      };
    } else if (sleepData) {
      updatedFactors[2] = {
        name: "Sleep Quality",
        value: sleepData.quality,
        impact: sleepData.quality < 50 ? "high" : sleepData.quality < 70 ? "medium" : "low",
        trend: "stable"
      };
    }
    
    // Update Sensory Load if available
    if (latestData.sensoryLoad !== undefined) {
      updatedFactors[4] = {
        name: "Sensory Load",
        value: latestData.sensoryLoad,
        impact: latestData.sensoryLoad > 70 ? "high" : latestData.sensoryLoad > 50 ? "medium" : "low",
        trend: "stable" // We need more context to determine trend
      };
    } else if (sensoryData) {
      const avgSensoryLoad = (
        sensoryData.noiseLevel + 
        sensoryData.lightIntensity + 
        Math.abs(sensoryData.temperature - 72) * 2 + 
        sensoryData.crowding
      ) / 4;
      
      updatedFactors[4] = {
        name: "Sensory Load",
        value: Math.min(100, avgSensoryLoad),
        impact: avgSensoryLoad > 70 ? "high" : avgSensoryLoad > 50 ? "medium" : "low",
        trend: "stable"
      };
    }
    
    // Update Routine Deviation if available
    if (latestData.routineDeviation !== undefined) {
      updatedFactors[5] = {
        name: "Routine Deviation",
        value: latestData.routineDeviation,
        impact: latestData.routineDeviation > 70 ? "high" : latestData.routineDeviation > 40 ? "medium" : "low",
        trend: "stable"
      };
    } else if (routineData) {
      updatedFactors[5] = {
        name: "Routine Deviation",
        value: routineData.deviationScore,
        impact: routineData.deviationScore > 70 ? "high" : routineData.deviationScore > 40 ? "medium" : "low",
        trend: "stable"
      };
    }
    
    // Calculate a regulation score based on all factors
    // This is a simplified algorithm - a real system would have a more sophisticated model
    let newScore = 100;
    
    // Heart rate factor
    if (latestData.heartRate > 90) newScore -= 15;
    else if (latestData.heartRate > 80) newScore -= 10;
    else if (latestData.heartRate > 70) newScore -= 5;
    
    // HRV factor
    if (latestData.hrv < 40) newScore -= 15;
    else if (latestData.hrv < 50) newScore -= 10;
    else if (latestData.hrv < 60) newScore -= 5;
    
    // Sleep quality factor
    if (sleepData && sleepData.quality < 50) newScore -= 15;
    else if (sleepData && sleepData.quality < 70) newScore -= 10;
    
    // Sensory load factor
    if (sensoryData) {
      const avgSensory = (sensoryData.noiseLevel + sensoryData.lightIntensity + sensoryData.crowding) / 3;
      if (avgSensory > 70) newScore -= 15;
      else if (avgSensory > 50) newScore -= 10;
    }
    
    // Routine deviation factor
    if (routineData && routineData.isUnexpectedChange) newScore -= 15;
    else if (routineData && routineData.deviationScore > 50) newScore -= 10;
    
    // Behavioral state factor
    if (behavioralData) {
      if (behavioralData.irritabilityLevel > 60) newScore -= 15;
      if (behavioralData.stimming > 70) newScore -= 10;
      if (behavioralData.communicationDifficulty > 50) newScore -= 10;
      if (behavioralData.socialWithdrawal > 70) newScore -= 10;
      if (behavioralData.selfReportedMood < 40) newScore -= 10;
    }
    
    // Ensure score stays within bounds
    newScore = Math.max(0, Math.min(100, newScore));
    
    setRegulationFactors(updatedFactors);
    setRegulationScore(newScore);
    
    // Set warning state based on regulation score
    setWarningActive(newScore < 80);
    
  }, [dataPoints, sleepData, sensoryData, routineData, behavioralData]);
  
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
    // Update sensory data based on environmental factors
    const newSensoryData: SensoryData = {
      timestamp: new Date().toISOString(),
      noiseLevel: factors.find((f: any) => f.name === "Noise Level")?.value || 50,
      lightIntensity: factors.find((f: any) => f.name === "Brightness")?.value || 60,
      temperature: factors.find((f: any) => f.name === "Temperature")?.value || 72,
      crowding: factors.find((f: any) => f.name === "Crowding")?.value || 30,
    };
    setSensoryData(newSensoryData);
  };

  // New handlers for additional metrics
  const handleSaveSleepData = (data: SleepData) => {
    setSleepData(data);
  };
  
  const handleSaveSensoryData = (data: SensoryData) => {
    setSensoryData(data);
  };
  
  const handleSaveRoutineData = (data: RoutineData) => {
    setRoutineData(data);
  };
  
  const handleSaveBehavioralData = (data: BehavioralData) => {
    setBehavioralData(data);
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
    sleepData,
    sensoryData,
    routineData,
    behavioralData,
    getChartData,
    handleDeviceConnected,
    handleDataReceived,
    handleSaveThresholds,
    handleSaveEnvironment,
    handleSaveSleepData,
    handleSaveSensoryData,
    handleSaveRoutineData,
    handleSaveBehavioralData,
    handleShowStrategies,
    handleHideStrategies
  };
}
