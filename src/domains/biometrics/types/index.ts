
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

export interface UseBiometricDataProps {
  maxDataPoints?: number;
}

export interface UseBiometricDataReturn {
  isConnected: boolean;
  deviceInfo: DeviceInfo | null;
  dataPoints: BiometricData[];
  offlineData: BiometricData[];
  isOnline: boolean;
  connectDevice: (device: DeviceInfo) => void;
  disconnectDevice: () => void;
  addDataPoint: (data: BiometricData) => void;
  syncOfflineData: () => Promise<void>;
}
