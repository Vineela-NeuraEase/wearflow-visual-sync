
import { useState, useEffect } from "react";
import { BiometricDataPoint } from "@/hooks/biometrics/types";
import { SleepData, SensoryData, RoutineData, BehavioralData } from "@/types/biometric";

export function useRegulationScore(
  dataPoints: BiometricDataPoint[],
  sleepData: SleepData | null,
  sensoryData: SensoryData | null,
  routineData: RoutineData | null,
  behavioralData: BehavioralData | null
) {
  const [regulationScore, setRegulationScore] = useState(72);
  const [warningActive, setWarningActive] = useState(true);
  
  // Calculate regulation score based on all factors
  useEffect(() => {
    if (dataPoints.length === 0) return;
    
    const latestData = dataPoints[0];
    
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
    
    setRegulationScore(newScore);
    
    // Set warning state based on regulation score
    setWarningActive(newScore < 80);
  }, [dataPoints, sleepData, sensoryData, routineData, behavioralData]);

  return { regulationScore, warningActive };
}
