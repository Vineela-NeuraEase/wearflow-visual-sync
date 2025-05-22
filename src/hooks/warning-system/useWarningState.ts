
import { useState } from 'react';
import { SleepData, SensoryData, RoutineData, BehavioralData } from '@/types/biometric';

export function useWarningState() {
  // Track most recent data
  const [sleepData, setSleepData] = useState<SleepData | null>(null);
  const [sensoryData, setSensoryData] = useState<SensoryData | null>(null);
  const [routineData, setRoutineData] = useState<RoutineData | null>(null);
  const [behavioralData, setBehavioralData] = useState<BehavioralData | null>(null);
  
  return {
    sleepData,
    setSleepData,
    sensoryData,
    setSensoryData,
    routineData,
    setRoutineData,
    behavioralData,
    setBehavioralData
  };
}
