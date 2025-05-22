
import { useState } from "react";
import { useBiometricData } from "@/hooks/useBiometricData";
import { SleepData, SensoryData, RoutineData, BehavioralData } from "@/types/biometric";
import { useRegulationFactors } from "./warning-system/useRegulationFactors";
import { useRegulationScore } from "./warning-system/useRegulationScore";
import { useChartData } from "./warning-system/useChartData";
import { useStrategies } from "./warning-system/useStrategies";
import { useDataHandlers } from "./warning-system/useDataHandlers";

export function useWarningSystem() {
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
  
  // Use our extracted hooks
  const { regulationFactors } = useRegulationFactors(dataPoints, sleepData, sensoryData, routineData);
  const { regulationScore, warningActive } = useRegulationScore(dataPoints, sleepData, sensoryData, routineData, behavioralData);
  const { getChartData } = useChartData(dataPoints);
  const { showStrategies, handleShowStrategies, handleHideStrategies } = useStrategies();
  
  const { 
    handleDeviceConnected,
    handleDataReceived,
    handleSaveThresholds,
    handleSaveEnvironment,
    handleSaveSleepData,
    handleSaveSensoryData,
    handleSaveRoutineData,
    handleSaveBehavioralData
  } = useDataHandlers(
    connectDevice, 
    addDataPoint,
    setSleepData,
    setSensoryData,
    setRoutineData,
    setBehavioralData
  );

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
