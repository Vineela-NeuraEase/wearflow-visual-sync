
import { useCallback } from "react";
import { BiometricDataPoint } from "@/hooks/biometrics/types";
import { SleepData, SensoryData, RoutineData, BehavioralData } from "@/types/biometric";

type SetStateFunction<T> = (data: T) => void;

export function useDataHandlers(
  connectDevice: (device: any) => void,
  addDataPoint: (data: BiometricDataPoint) => void,
  setSleepData: SetStateFunction<SleepData>,
  setSensoryData: SetStateFunction<SensoryData>,
  setRoutineData: SetStateFunction<RoutineData>,
  setBehavioralData: SetStateFunction<BehavioralData>
) {
  const handleDeviceConnected = useCallback((device: any) => {
    console.log("Device connected:", device);
    connectDevice(device);
  }, [connectDevice]);
  
  const handleDataReceived = useCallback((data: any) => {
    console.log("Data received:", data);
    addDataPoint(data);
  }, [addDataPoint]);
  
  const handleSaveThresholds = useCallback((settings: any) => {
    console.log("Saving threshold settings:", settings);
    // In a real app, this would save to a database or local storage
    // Example thresholds: heartRateThreshold, hrvThreshold, stressThreshold
    localStorage.setItem('warningThresholds', JSON.stringify(settings));
  }, []);
  
  const handleSaveEnvironment = useCallback((factors: any) => {
    console.log("Environment tracked:", factors);
    // Update sensory data based on environmental factors
    const newSensoryData: SensoryData = {
      timestamp: new Date().toISOString(),
      noise_level: factors.find((f: any) => f.name === "Noise Level")?.value || 50,
      light_level: factors.find((f: any) => f.name === "Brightness")?.value || 60,
      light_intensity: factors.find((f: any) => f.name === "Brightness")?.value || 60, // Add this for DB compatibility
      temperature: factors.find((f: any) => f.name === "Temperature")?.value || 72,
      crowding: factors.find((f: any) => f.name === "Crowding")?.value || 30,
    };
    setSensoryData(newSensoryData);
  }, [setSensoryData]);
  
  // New handlers for additional metrics
  const handleSaveSleepData = useCallback((data: SleepData) => {
    console.log("Sleep data saved:", data);
    setSleepData(data);
  }, [setSleepData]);
  
  const handleSaveSensoryData = useCallback((data: SensoryData) => {
    console.log("Sensory data saved:", data);
    setSensoryData(data);
  }, [setSensoryData]);
  
  const handleSaveRoutineData = useCallback((data: RoutineData) => {
    console.log("Routine data saved:", data);
    setRoutineData(data);
  }, [setRoutineData]);
  
  const handleSaveBehavioralData = useCallback((data: BehavioralData) => {
    console.log("Behavioral data saved:", data);
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
