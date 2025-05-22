
export interface BiometricDataPoint {
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

export interface UseBiometricDataProps {
  maxDataPoints?: number;
}

export interface UseBiometricDataReturn {
  isConnected: boolean;
  deviceInfo: any;
  dataPoints: BiometricDataPoint[];
  offlineData: BiometricDataPoint[];
  isOnline: boolean;
  connectDevice: (device: any) => void;
  disconnectDevice: () => void;
  addDataPoint: (data: BiometricDataPoint) => void;
  syncOfflineData: () => void;
}
