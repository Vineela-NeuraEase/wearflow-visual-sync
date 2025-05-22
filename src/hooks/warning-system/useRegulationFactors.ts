
import { useState, useEffect, useMemo } from 'react';
import { BiometricDataPoint } from '@/hooks/biometrics/types';
import { SleepData, SensoryData, RoutineData, BehavioralData } from '@/types/biometric';
import { RegulationFactor } from '@/pages/WarningSystem';

export interface UseRegulationFactorsProps {
  biometricData: BiometricDataPoint[];
  sleepData?: SleepData | null;
  sensoryData?: SensoryData | null;
  routineData?: RoutineData | null;
  behavioralData?: BehavioralData | null;
}

export const useRegulationFactors = ({
  biometricData,
  sleepData,
  sensoryData,
  routineData,
  behavioralData
}: UseRegulationFactorsProps) => {
  const [factors, setFactors] = useState<RegulationFactor[]>([]);
  
  const latestBiometricData = useMemo(() => {
    return biometricData?.[0];
  }, [biometricData]);
  
  // Calculate factors based on available data
  useEffect(() => {
    const newFactors: RegulationFactor[] = [];
    
    // Heart rate factor
    if (latestBiometricData?.heartRate) {
      const heartRate = latestBiometricData.heartRate;
      let impact: "high" | "medium" | "low" = "low";
      if (heartRate > 90) impact = "high";
      else if (heartRate > 80) impact = "medium";
      
      newFactors.push({
        name: "Heart Rate",
        value: heartRate,
        impact,
        trend: getTrend(biometricData.slice(0, 5).map(d => d.heartRate || 0))
      });
    }
    
    // HRV factor
    if (latestBiometricData?.hrv) {
      const hrv = latestBiometricData.hrv;
      let impact: "high" | "medium" | "low" = "low";
      if (hrv < 40) impact = "high";
      else if (hrv < 55) impact = "medium";
      
      newFactors.push({
        name: "Heart Rate Variability",
        value: hrv,
        impact, 
        trend: getTrend(biometricData.slice(0, 5).map(d => d.hrv || 0))
      });
    }
    
    // Sensory factors
    if (sensoryData) {
      // Noise level
      if (sensoryData.noise_level > 40) {
        const impact = sensoryData.noise_level > 70 ? "high" : "medium";
        
        newFactors.push({
          name: "Noise Level",
          value: sensoryData.noise_level,
          impact,
          trend: "stable" // No historical data to determine trend
        });
      }
      
      // Light level
      if (sensoryData.light_level > 60) {
        const impact = sensoryData.light_level > 80 ? "high" : "medium";
        
        newFactors.push({
          name: "Light Level",
          value: sensoryData.light_level,
          impact,
          trend: "stable" // No historical data to determine trend
        });
      }
    }
    
    // Routine factors
    if (routineData && routineData.is_unexpected_change) {
      newFactors.push({
        name: "Routine Change",
        value: routineData.deviation_score,
        impact: routineData.deviation_score > 7 ? "high" : "medium",
        trend: "increasing" // A change just happened
      });
    }
    
    // Sleep factors
    if (sleepData) {
      if (sleepData.quality < 7) {
        newFactors.push({
          name: "Sleep Quality",
          value: sleepData.quality,
          impact: sleepData.quality < 4 ? "high" : "medium",
          trend: "stable" // No historical data to determine trend
        });
      }
      
      if (sleepData.duration < 7) {
        newFactors.push({
          name: "Sleep Duration",
          value: sleepData.duration,
          impact: sleepData.duration < 5 ? "high" : "medium",
          trend: "stable" // No historical data to determine trend
        });
      }
    }
    
    // Behavioral factors
    if (behavioralData) {
      if (behavioralData.irritability_level > 5) {
        newFactors.push({
          name: "Irritability",
          value: behavioralData.irritability_level,
          impact: behavioralData.irritability_level > 7 ? "high" : "medium",
          trend: "stable" // No historical data to determine trend
        });
      }
      
      if (behavioralData.stimming > 5) {
        newFactors.push({
          name: "Stimming",
          value: behavioralData.stimming,
          impact: behavioralData.stimming > 7 ? "high" : "medium",
          trend: "increasing" // Assume increasing if high enough to be a factor
        });
      }
    }
    
    setFactors(newFactors);
  }, [biometricData, latestBiometricData, sleepData, sensoryData, routineData, behavioralData]);

  return factors;
};

// Determine trend based on a series of values
function getTrend(values: number[]): "increasing" | "decreasing" | "stable" {
  if (values.length < 2) return "stable";
  
  let increasing = 0;
  let decreasing = 0;
  
  for (let i = 1; i < values.length; i++) {
    if (values[i] > values[i-1]) increasing++;
    else if (values[i] < values[i-1]) decreasing++;
  }
  
  if (increasing > decreasing + 1) return "increasing";
  if (decreasing > increasing + 1) return "decreasing";
  return "stable";
}
