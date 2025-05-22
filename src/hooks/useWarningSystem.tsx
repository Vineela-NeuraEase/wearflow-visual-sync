
import { useState, useCallback, useEffect } from 'react';
import { useBiometricData } from './useBiometricData';
import { useDataCollection } from './useDataCollection';
import { useWarningAnalysis } from './warning-system/useWarningAnalysis';
import { useChartData } from './warning-system/useChartData';
import { useRegulationFactors } from './warning-system/useRegulationFactors';
import { useStrategies } from './warning-system/useStrategies';
import { useRegulationScore } from './warning-system/useRegulationScore';
import { RegulationFactor } from '@/pages/WarningSystem';
import { SleepData, SensoryData, RoutineData, BehavioralData } from '@/types/biometric';

export function useWarningSystem() {
  // Get biometric data from device connection
  const {
    isConnected,
    deviceInfo,
    dataPoints,
    isOnline,
    offlineData,
    connectDevice,
    addDataPoint
  } = useBiometricData();
  
  // Track most recent data
  const [sleepData, setSleepData] = useState<SleepData | null>(null);
  const [sensoryData, setSensoryData] = useState<SensoryData | null>(null);
  const [routineData, setRoutineData] = useState<RoutineData | null>(null);
  const [behavioralData, setBehavioralData] = useState<BehavioralData | null>(null);
  
  // Access data handlers and collection methods
  const { 
    handleDeviceConnected, 
    handleDataReceived, 
    handleSaveThresholds, 
    handleSaveEnvironment,
    handleSaveSleepData,
    handleSaveSensoryData,
    handleSaveRoutineData,
    handleSaveBehavioralData
  } = useWarningSystemHandlers({
    connectDevice,
    addDataPoint,
    setSleepData,
    setSensoryData,
    setRoutineData,
    setBehavioralData
  });
  
  // Calculate regulation factors
  const regulationFactors = useRegulationFactors({
    biometricData: dataPoints,
    sleepData,
    sensoryData,
    routineData,
    behavioralData
  });
  
  // Calculate overall regulation score
  const regulationScore = useRegulationScore({
    biometricData: dataPoints,
    sleepData,
    sensoryData,
    routineData,
    behavioralData
  });
  
  // Warning state
  const [warningActive, setWarningActive] = useState(false);
  const { latestPatterns } = useWarningAnalysis({ biometricData: dataPoints, sensorData: null });
  
  // Check for warning condition
  useEffect(() => {
    if (regulationScore < 70) {
      setWarningActive(true);
    } else {
      setWarningActive(false);
    }
  }, [regulationScore]);
  
  // Get strategies from the useStrategies hook
  const {
    showStrategies,
    strategies,
    handleShowStrategies,
    handleHideStrategies,
    saveStrategy,
    deleteStrategy,
    updateEffectiveness
  } = useStrategies();
  
  // Chart data generator
  const { getChartData } = useChartData(dataPoints);

  return {
    isConnected,
    deviceInfo,
    dataPoints,
    isOnline,
    offlineData,
    regulationFactors,
    regulationScore,
    warningActive,
    showStrategies,
    strategies,
    latestPatterns,
    getChartData,
    handleDeviceConnected,
    handleDataReceived,
    handleSaveThresholds,
    handleSaveEnvironment,
    handleShowStrategies,
    handleHideStrategies,
    saveStrategy,
    deleteStrategy,
    updateEffectiveness
  };
}

// Separate hooks for warning system handlers
function useWarningSystemHandlers({
  connectDevice,
  addDataPoint,
  setSleepData,
  setSensoryData,
  setRoutineData,
  setBehavioralData
}) {
  // Data handlers
  const handleDeviceConnected = useCallback((device) => {
    connectDevice(device);
  }, [connectDevice]);
  
  const handleDataReceived = useCallback((data) => {
    addDataPoint(data);
  }, [addDataPoint]);
  
  const handleSaveThresholds = useCallback((settings) => {
    console.log("Saving threshold settings:", settings);
    // In a real app, this would save to a database or local storage
  }, []);
  
  const handleSaveEnvironment = useCallback((factors) => {
    console.log("Environment tracked:", factors);
    
    // Update sensory data based on environmental factors
    const newSensoryData: SensoryData = {
      timestamp: new Date().toISOString(),
      noise_level: factors.find((f) => f.name === "Noise Level")?.value || 50,
      light_level: factors.find((f) => f.name === "Brightness")?.value || 60,
      temperature: factors.find((f) => f.name === "Temperature")?.value || 72,
      crowding: factors.find((f) => f.name === "Crowding")?.value || 30,
    };
    
    setSensoryData(newSensoryData);
  }, [setSensoryData]);
  
  // Additional data type handlers
  const handleSaveSleepData = useCallback((data: SleepData) => {
    setSleepData(data);
  }, [setSleepData]);
  
  const handleSaveSensoryData = useCallback((data: SensoryData) => {
    setSensoryData(data);
  }, [setSensoryData]);
  
  const handleSaveRoutineData = useCallback((data: RoutineData) => {
    setRoutineData(data);
  }, [setRoutineData]);
  
  const handleSaveBehavioralData = useCallback((data: BehavioralData) => {
    setBehavioralData(data);
  }, [setBehavioralData]);

  return {
    handleDeviceConnected,
    handleDataReceived,
    handleSaveThresholds,
    handleSaveEnvironment,
    handleSaveSleepData,
    handleSaveSensoryData,
    handleSaveRoutineData,
    handleSaveBehavioralData
  };
}
