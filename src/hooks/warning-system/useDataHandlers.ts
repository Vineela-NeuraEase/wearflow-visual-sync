
import { useCallback } from "react";
import { BiometricDataPoint } from "@/hooks/biometrics/types";
import { SleepData, SensoryData, RoutineData, BehavioralData } from "@/types/biometric";

export function useDataHandlers(
  connectDevice: (device: any) => void,
  addDataPoint: (data: BiometricDataPoint) => void,
  setSleepData: (data: SleepData) => void,
  setSensoryData: (data: SensoryData) => void,
  setRoutineData: (data: RoutineData) => void,
  setBehavioralData: (data: BehavioralData) => void
) {
  const handleDeviceConnected = useCallback((device: any) => {
    connectDevice(device);
  }, [connectDevice]);
  
  const handleDataReceived = useCallback((data: any) => {
    addDataPoint(data);
  }, [addDataPoint]);
  
  const handleSaveThresholds = useCallback((settings: any) => {
    console.log("Saving threshold settings:", settings);
    // In a real app, this would save to a database or local storage
  }, []);
  
  const handleSaveEnvironment = useCallback((factors: any) => {
    console.log("Environment tracked:", factors);
    // Update sensory data based on environmental factors
    const newSensoryData: SensoryData = {
      timestamp: new Date().toISOString(),
      noise_level: factors.find((f: any) => f.name === "Noise Level")?.value || 50,
      light_level: factors.find((f: any) => f.name === "Brightness")?.value || 60, // Changed from light_intensity to light_level
      temperature: factors.find((f: any) => f.name === "Temperature")?.value || 72,
      crowding: factors.find((f: any) => f.name === "Crowding")?.value || 30,
    };
    setSensoryData(newSensoryData);
  }, [setSensoryData]);
  
  // New handlers for additional metrics
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
