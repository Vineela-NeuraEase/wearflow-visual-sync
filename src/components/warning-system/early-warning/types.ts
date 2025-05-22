
export type WarningLevel = 'normal' | 'notice' | 'watch' | 'alert';

export interface BiometricData {
  heartRate?: number;
  hrv?: number;
  stressLevel?: number;
  timestamp: string;
}
