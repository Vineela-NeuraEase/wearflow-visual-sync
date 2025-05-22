
export interface BiometricData {
  heartRate: number;
  hrv: number;
  stressLevel: number;
  timestamp: string;
  sleepQuality?: number;
  sleepDuration?: number;
  sensoryLoad?: number;
  routineDeviation?: number;
  behavioralState?: number;
}

export interface DeviceInfo {
  name: string;
  id: string;
  [key: string]: any;
}

export interface SleepData {
  date: string;
  quality: number;
  duration: number;
  deepSleepPercentage: number;
  remSleepPercentage: number;
  awakenings: number;
}

export interface SensoryData {
  timestamp: string;
  noiseLevel: number;
  lightIntensity: number;
  temperature: number;
  crowding: number;
  textureSensitivity?: number;
  smellSensitivity?: number;
}

export interface RoutineData {
  timestamp: string;
  expectedActivity: string;
  actualActivity: string;
  deviationScore: number;
  location: string;
  isUnexpectedChange: boolean;
}

export interface BehavioralData {
  timestamp: string;
  selfReportedMood: number;
  stimming: number;
  communicationDifficulty: number;
  socialWithdrawal: number;
  irritabilityLevel: number;
}
