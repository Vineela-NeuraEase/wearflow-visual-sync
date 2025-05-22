
import { useState, useEffect, useMemo } from 'react';
import { BiometricDataPoint } from '@/hooks/biometrics/types';
import { SleepData, SensoryData, RoutineData, BehavioralData } from '@/types/biometric';

export interface UseRegulationScoreProps {
  biometricData: BiometricDataPoint[];
  sleepData?: SleepData | null;
  sensoryData?: SensoryData | null;
  routineData?: RoutineData | null;
  behavioralData?: BehavioralData | null;
}

export const useRegulationScore = ({
  biometricData,
  sleepData,
  sensoryData,
  routineData,
  behavioralData
}: UseRegulationScoreProps) => {
  const [score, setScore] = useState(100);
  
  const latestBiometricData = useMemo(() => {
    return biometricData?.[0];
  }, [biometricData]);
  
  // Calculate regulation score based on all available metrics
  useEffect(() => {
    let newScore = 100; // Start with perfect score
    
    // Adjust based on biometric data
    if (latestBiometricData) {
      if (latestBiometricData.stressLevel) {
        newScore -= latestBiometricData.stressLevel / 2; // Reduce score by half of stress level (0-50)
      }
      
      if (latestBiometricData.heartRate && latestBiometricData.heartRate > 85) {
        newScore -= (latestBiometricData.heartRate - 85) / 2; // Reduce for high heart rate
      }
      
      if (latestBiometricData.hrv && latestBiometricData.hrv < 50) {
        newScore -= (50 - latestBiometricData.hrv) / 2; // Reduce for low HRV
      }
    }
    
    // Adjust based on sensory data
    if (sensoryData) {
      if (sensoryData.noise_level > 60) {
        newScore -= (sensoryData.noise_level - 60) / 3; // Reduce for high noise
      }
      
      if (sensoryData.light_level > 70) {
        newScore -= (sensoryData.light_level - 70) / 3; // Reduce for high light levels
      }
      
      if (sensoryData.crowding > 50) {
        newScore -= (sensoryData.crowding - 50) / 3; // Reduce for high crowding
      }
    }
    
    // Adjust based on routine data
    if (routineData) {
      if (routineData.is_unexpected_change) {
        newScore -= 10; // Significant reduction for unexpected change
        
        if (routineData.deviation_score > 5) {
          newScore -= (routineData.deviation_score - 5) * 2; // More reduction for higher deviation
        }
      }
    }
    
    // Adjust based on sleep data
    if (sleepData) {
      if (sleepData.quality < 7) {
        newScore -= (7 - sleepData.quality) * 2; // Reduce for poor sleep quality
      }
      
      if (sleepData.duration < 7) {
        newScore -= (7 - sleepData.duration) * 2; // Reduce for insufficient sleep
      }
    }
    
    // Adjust based on behavioral data
    if (behavioralData) {
      if (behavioralData.irritability_level > 5) {
        newScore -= (behavioralData.irritability_level - 5) * 2; // Reduce for high irritability
      }
      
      if (behavioralData.stimming > 6) {
        newScore -= (behavioralData.stimming - 6) * 1.5; // Reduce for increased stimming
      }
      
      if (behavioralData.social_withdrawal > 6) {
        newScore -= (behavioralData.social_withdrawal - 6) * 1.5; // Reduce for social withdrawal
      }
    }
    
    // Ensure score stays within bounds
    newScore = Math.max(0, Math.min(100, newScore));
    
    setScore(Math.round(newScore));
  }, [latestBiometricData, sleepData, sensoryData, routineData, behavioralData]);
  
  return score;
};
