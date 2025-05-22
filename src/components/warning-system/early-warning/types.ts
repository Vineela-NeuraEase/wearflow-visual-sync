
export interface BiometricData {
  heartRate: number;
  hrv: number;
  stressLevel: number;
  timestamp: string;
}

export type WarningLevel = 'normal' | 'notice' | 'watch' | 'alert';
