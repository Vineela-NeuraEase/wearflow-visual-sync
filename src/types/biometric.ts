
// Define biometric data types

export interface SleepData {
  user_id?: string;
  date: string;
  quality: number;
  duration: number;
  deep_sleep_percentage: number;
  rem_sleep_percentage: number;
  awakenings: number;
}

export interface SensoryData {
  user_id?: string;
  timestamp?: string;
  noise_level: number;
  light_intensity: number;
  temperature: number;
  crowding: number;
  texture_sensitivity?: number;
  smell_sensitivity?: number;
}

export interface RoutineData {
  user_id?: string;
  timestamp?: string;
  expected_activity: string;
  actual_activity: string;
  deviation_score: number;
  location: string;
  is_unexpected_change: boolean;
}

export interface BehavioralData {
  user_id?: string;
  timestamp?: string;
  self_reported_mood: number;
  stimming: number;
  communication_difficulty: number;
  social_withdrawal: number;
  irritability_level: number;
}

export interface BiometricData {
  timestamp?: string;
  heartRate?: number;
  hrv?: number;
  stressLevel?: number;
  temperature?: number;
  skinConductance?: number;
  movementIntensity?: number;
}
