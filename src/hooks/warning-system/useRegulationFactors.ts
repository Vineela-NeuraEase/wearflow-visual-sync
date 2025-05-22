
import { useState, useEffect } from "react";
import { BiometricDataPoint } from "@/hooks/biometrics/types";
import { SleepData, SensoryData, RoutineData } from "@/types/biometric";
import { RegulationFactor, RegulationFactorImpact, RegulationFactorTrend } from '@/pages/WarningSystem';

export function useRegulationFactors(
  dataPoints: BiometricDataPoint[],
  sleepData: SleepData | null,
  sensoryData: SensoryData | null,
  routineData: RoutineData | null
) {
  const [regulationFactors, setRegulationFactors] = useState<RegulationFactor[]>([
    { name: "Heart Rate", value: 70, impact: "medium", trend: "stable" },
    { name: "HRV", value: 60, impact: "high", trend: "stable" },
    { name: "Stress Level", value: 40, impact: "high", trend: "stable" },
    { name: "Sleep Quality", value: 70, impact: "high", trend: "stable" },
    { name: "Sensory Load", value: 30, impact: "medium", trend: "stable" },
    { name: "Routine Stability", value: 80, impact: "low", trend: "stable" }
  ]);
  
  // Update regulation factors based on biometric data
  useEffect(() => {
    if (dataPoints.length === 0) return;
    
    const latestData = dataPoints[0];
    const updatedFactors = [...regulationFactors];
    
    // Find and update heart rate factor
    const heartRateIndex = updatedFactors.findIndex(f => f.name === "Heart Rate");
    if (heartRateIndex !== -1 && latestData.heartRate) {
      const prevValue = updatedFactors[heartRateIndex].value;
      updatedFactors[heartRateIndex] = {
        ...updatedFactors[heartRateIndex],
        value: latestData.heartRate,
        trend: latestData.heartRate > prevValue ? "increasing" : 
               latestData.heartRate < prevValue ? "decreasing" : "stable"
      };
    }
    
    // Find and update HRV factor
    const hrvIndex = updatedFactors.findIndex(f => f.name === "HRV");
    if (hrvIndex !== -1 && latestData.hrv) {
      const prevValue = updatedFactors[hrvIndex].value;
      updatedFactors[hrvIndex] = {
        ...updatedFactors[hrvIndex],
        value: latestData.hrv,
        trend: latestData.hrv > prevValue ? "increasing" : 
               latestData.hrv < prevValue ? "decreasing" : "stable"
      };
    }
    
    // Find and update stress level factor
    const stressIndex = updatedFactors.findIndex(f => f.name === "Stress Level");
    if (stressIndex !== -1 && latestData.stressLevel) {
      const prevValue = updatedFactors[stressIndex].value;
      updatedFactors[stressIndex] = {
        ...updatedFactors[stressIndex],
        value: latestData.stressLevel,
        trend: latestData.stressLevel > prevValue ? "increasing" : 
               latestData.stressLevel < prevValue ? "decreasing" : "stable"
      };
    }
    
    // Update sleep quality factor if sleep data is available
    if (sleepData) {
      const sleepIndex = updatedFactors.findIndex(f => f.name === "Sleep Quality");
      if (sleepIndex !== -1) {
        updatedFactors[sleepIndex] = {
          ...updatedFactors[sleepIndex],
          value: sleepData.quality
        };
      }
    }
    
    // Update sensory load factor if sensory data is available
    if (sensoryData) {
      const sensoryIndex = updatedFactors.findIndex(f => f.name === "Sensory Load");
      if (sensoryIndex !== -1) {
        const avgSensory = (sensoryData.noise_level + sensoryData.light_level + sensoryData.crowding) / 3;
        updatedFactors[sensoryIndex] = {
          ...updatedFactors[sensoryIndex],
          value: avgSensory
        };
      }
    }
    
    // Update routine stability factor if routine data is available
    if (routineData) {
      const routineIndex = updatedFactors.findIndex(f => f.name === "Routine Stability");
      if (routineIndex !== -1) {
        const stabilityValue = routineData.is_unexpected_change ? 
          30 + Math.max(0, 50 - routineData.deviation_score) : 
          80;
        updatedFactors[routineIndex] = {
          ...updatedFactors[routineIndex],
          value: stabilityValue,
          impact: routineData.is_unexpected_change ? "high" as RegulationFactorImpact : "low" as RegulationFactorImpact
        };
      }
    }
    
    setRegulationFactors(updatedFactors);
  }, [dataPoints, sleepData, sensoryData, routineData]);
  
  return { regulationFactors };
}
