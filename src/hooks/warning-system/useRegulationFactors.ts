
import { useState, useEffect } from "react";
import { BiometricDataPoint } from "@/hooks/biometrics/types";
import { SleepData, SensoryData, RoutineData } from "@/types/biometric";
import { RegulationFactor, RegulationFactorTrend } from "@/pages/WarningSystem";

export function useRegulationFactors(
  dataPoints: BiometricDataPoint[], 
  sleepData: SleepData | null, 
  sensoryData: SensoryData | null,
  routineData: RoutineData | null
) {
  const [regulationFactors, setRegulationFactors] = useState<RegulationFactor[]>([
    { name: "Heart Rate", value: 78, impact: "medium", trend: "increasing" },
    { name: "HRV", value: 42, impact: "high", trend: "decreasing" },
    { name: "Sleep Quality", value: 65, impact: "medium", trend: "stable" },
    { name: "Environmental", value: 40, impact: "low", trend: "stable" },
    { name: "Sensory Load", value: 45, impact: "medium", trend: "stable" },
    { name: "Routine Deviation", value: 20, impact: "low", trend: "stable" }
  ]);
  
  // Update regulation factors based on real-time data
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
    
    setRegulationFactors(updatedFactors);
  }, [dataPoints, sleepData, sensoryData, routineData, regulationFactors]);

  return { regulationFactors };
}
