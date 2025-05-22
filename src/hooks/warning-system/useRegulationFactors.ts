
import { useState, useEffect } from "react";
import { BiometricDataPoint } from "@/hooks/biometrics/types";
import { SleepData, SensoryData, RoutineData } from "@/types/biometric";
import { RegulationFactor } from "@/pages/WarningSystem";

export function useRegulationFactors(
  dataPoints: BiometricDataPoint[],
  sleepData: SleepData | null,
  sensoryData: SensoryData | null,
  routineData: RoutineData | null
) {
  const [regulationFactors, setRegulationFactors] = useState<RegulationFactor[]>([
    {
      name: "Heart Rate",
      value: 72,
      impact: "medium",
      trend: "stable"
    },
    {
      name: "HRV",
      value: 45,
      impact: "high",
      trend: "decreasing"
    },
    {
      name: "Sleep Quality",
      value: 65,
      impact: "medium", 
      trend: "stable"
    }
  ]);
  
  // Update regulation factors based on available data
  useEffect(() => {
    const updatedFactors: RegulationFactor[] = [];
    
    // Heart rate factor from biometric data
    if (dataPoints.length > 0) {
      const latestData = dataPoints[0];
      
      updatedFactors.push({
        name: "Heart Rate",
        value: latestData.heartRate,
        impact: getHeartRateImpact(latestData.heartRate),
        trend: getHeartRateTrend(dataPoints)
      });
      
      updatedFactors.push({
        name: "HRV",
        value: latestData.hrv,
        impact: getHrvImpact(latestData.hrv),
        trend: getHrvTrend(dataPoints)
      });
    }
    
    // Sleep factor from sleep data
    if (sleepData) {
      updatedFactors.push({
        name: "Sleep Quality",
        value: sleepData.quality,
        impact: getSleepImpact(sleepData.quality),
        trend: "stable" // We'd need historical sleep data for a trend
      });
    }
    
    // Sensory factors from sensory data
    if (sensoryData) {
      const avgSensoryLoad = Math.round(
        (sensoryData.noise_level + 
         sensoryData.light_intensity + 
         sensoryData.crowding) / 3
      );
      
      updatedFactors.push({
        name: "Sensory Load",
        value: avgSensoryLoad,
        impact: getSensoryImpact(avgSensoryLoad),
        trend: "stable" // We'd need historical sensory data for a trend
      });
    }
    
    // Routine factors from routine data
    if (routineData) {
      updatedFactors.push({
        name: "Routine Change",
        value: routineData.deviation_score,
        impact: getRoutineImpact(routineData.deviation_score),
        trend: routineData.deviation_score > 50 ? "increasing" : "stable"
      });
    }
    
    if (updatedFactors.length > 0) {
      setRegulationFactors(updatedFactors);
    }
  }, [dataPoints, sleepData, sensoryData, routineData]);
  
  // Helper functions to determine impact and trends
  function getHeartRateImpact(heartRate: number): "high" | "medium" | "low" {
    if (heartRate > 90) return "high";
    if (heartRate > 80) return "medium";
    return "low";
  }
  
  function getHeartRateTrend(data: BiometricDataPoint[]): "increasing" | "decreasing" | "stable" {
    if (data.length < 3) return "stable";
    
    const recent = data.slice(0, 3).reduce((sum, item) => sum + item.heartRate, 0) / 3;
    const previous = data.slice(3, 6).reduce((sum, item) => sum + item.heartRate, 0) / 3;
    
    if (recent > previous + 5) return "increasing";
    if (recent < previous - 5) return "decreasing";
    return "stable";
  }
  
  function getHrvImpact(hrv: number): "high" | "medium" | "low" {
    if (hrv < 40) return "high";
    if (hrv < 50) return "medium";
    return "low";
  }
  
  function getHrvTrend(data: BiometricDataPoint[]): "increasing" | "decreasing" | "stable" {
    if (data.length < 3) return "stable";
    
    const recent = data.slice(0, 3).reduce((sum, item) => sum + item.hrv, 0) / 3;
    const previous = data.slice(3, 6).reduce((sum, item) => sum + item.hrv, 0) / 3;
    
    if (recent > previous + 3) return "increasing";
    if (recent < previous - 3) return "decreasing";
    return "stable";
  }
  
  function getSleepImpact(quality: number): "high" | "medium" | "low" {
    if (quality < 60) return "high";
    if (quality < 75) return "medium";
    return "low";
  }
  
  function getSensoryImpact(load: number): "high" | "medium" | "low" {
    if (load > 70) return "high";
    if (load > 50) return "medium";
    return "low";
  }
  
  function getRoutineImpact(score: number): "high" | "medium" | "low" {
    if (score > 70) return "high";
    if (score > 40) return "medium";
    return "low";
  }

  return { regulationFactors };
}
