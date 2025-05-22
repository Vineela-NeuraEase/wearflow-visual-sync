
export interface BiometricData {
  heartRate: number;
  hrv: number;
  stressLevel: number;
  timestamp: string;
}

export interface DeviceInfo {
  name: string;
  id: string;
  [key: string]: any;
}

export type BiometricDataPoint = BiometricData;

export interface UseBiometricDataProps {
  maxDataPoints?: number;
}

export interface UseBiometricDataReturn {
  isConnected: boolean;
  deviceInfo: DeviceInfo | null;
  dataPoints: BiometricDataPoint[];
  offlineData: BiometricDataPoint[];
  isOnline: boolean;
  connectDevice: (device: any) => void;
  disconnectDevice: () => void;
  addDataPoint: (data: BiometricDataPoint) => void;
  syncOfflineData: () => void;
}
