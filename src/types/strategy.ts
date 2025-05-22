
export interface Strategy {
  id: string;
  user_id?: string;
  name: string;
  description?: string;
  category: string;
  effectiveness: number;
  created_at?: string;
  updated_at?: string;
}

export interface WarningEvent {
  id: string;
  user_id: string;
  timestamp: string;
  intensity: number;
  duration?: number;
  triggers?: string[];
  coping_strategies?: string[];
  notes?: string;
}

export interface BiometricData {
  heartRate?: number;
  hrv?: number;
  stressLevel?: number;
  timestamp?: string;
}

export interface SleepData {
  user_id?: string;
  id?: string;
  date: string;
  duration: number;
  quality: number;
  deep_sleep_percentage: number;
  rem_sleep_percentage: number;
  awakenings: number;
}

export interface SensoryData {
  user_id?: string;
  id?: string;
  timestamp?: string;
  noise_level: number;
  light_level: number;
  temperature: number;
  crowding: number;
  texture_sensitivity?: number;
  smell_sensitivity?: number;
}

export interface RoutineData {
  user_id?: string;
  id?: string;
  timestamp?: string;
  expected_activity?: string;
  actual_activity?: string;
  location?: string;
  is_unexpected_change?: boolean;
  is_planned?: boolean;
  deviation_score?: number;
  disruption_level?: number;
  routine_change?: string;
}

export interface BehavioralData {
  user_id?: string;
  id?: string;
  timestamp?: string;
  irritability_level: number;
  communication_difficulty?: number;
  social_withdrawal?: number;
  self_reported_mood?: number;
  stimming?: number;
  notes?: string;
}
