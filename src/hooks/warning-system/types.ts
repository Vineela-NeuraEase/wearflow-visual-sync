
import { BiometricDataPoint } from '@/hooks/biometrics/types';
import { SleepData, SensoryData, RoutineData, BehavioralData } from '@/types/biometric';

export interface WarningStrategy {
  id: string;
  name: string;
  description: string;
  effectiveness: number;
  tags: string[];
  created_at: string;
}

export type WarningLevel = 'normal' | 'notice' | 'watch' | 'alert';

export interface BiometricData {
  heartRate?: number;
  hrv?: number;
  stressLevel?: number;
  timestamp: string;
}
