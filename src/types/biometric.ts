
// Define biometric data types

export interface SleepData {
  user_id?: string;
  date: string;
  quality: number;
  duration: number;
  deep_sleep_percentage: number;
  rem_sleep_percentage: number;
  awakenings: number;
  sleep_onset?: string;
  wake_time?: string;
  sleep_aid?: string;
  created_at?: string;
}

export interface SensoryData {
  user_id?: string;
  timestamp?: string;
  noise_level: number;
  light_level: number; // Main property for UI components
  light_intensity?: number; // For database compatibility
  temperature: number;
  crowding: number;
  texture_sensitivity?: number;
  smell_sensitivity?: number;
  sensory_triggers?: string[];
  notes?: string;
}

export interface RoutineData {
  user_id?: string;
  timestamp?: string;
  expected_activity: string;
  actual_activity: string;
  deviation_score: number;
  location: string;
  is_unexpected_change: boolean;
  date?: string;
  routine_change?: string;
  routine_type?: string;
  disruption_level?: number;
  is_planned?: boolean;
  notes?: string;
}

export interface BehavioralData {
  user_id?: string;
  timestamp?: string;
  anxiety_level?: number;
  irritability_level: number;
  stimming_behavior?: string;
  notes?: string;
  self_reported_mood: number; // Made required to match DB schema
  stimming: number; // Made required to match DB schema
  communication_difficulty: number; // Made required to match DB schema
  social_withdrawal: number; // Made required to match DB schema
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
