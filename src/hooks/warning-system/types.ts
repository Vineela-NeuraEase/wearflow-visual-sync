
import { BiometricDataPoint } from '@/hooks/biometrics/types';
import { SleepData, SensoryData, RoutineData, BehavioralData } from '@/types/biometric';
import { Strategy } from '@/types/strategy';

export type WarningStrategy = Strategy & {
  tags: string[];
};

export type WarningLevel = 'normal' | 'notice' | 'watch' | 'alert';

export interface BiometricData {
  heartRate?: number;
  hrv?: number;
  stressLevel?: number;
  timestamp: string;
}
