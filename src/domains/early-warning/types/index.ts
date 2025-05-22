
export interface BiometricData {
  heartRate: number;
  hrv: number;
  stressLevel: number;
  timestamp: string;
}

export type WarningLevel = 'normal' | 'notice' | 'watch' | 'alert';

export interface Pattern {
  id: string;
  name: string;
  description: string;
  confidence: number;
  indicators: string[];
  category: 'physiological' | 'environmental' | 'behavioral' | 'temporal';
}

export interface PatternDetectionInsightsProps {
  detectedPatterns?: Pattern[];
  realtimeData?: any[];
}
