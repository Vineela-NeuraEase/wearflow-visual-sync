
export interface BiometricDataPoint {
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
  dataPoints: BiometricDataPoint[];
  offlineData: BiometricDataPoint[];
  isOnline: boolean;
  connectDevice: (device: DeviceInfo) => void;
  disconnectDevice: () => void;
  addDataPoint: (data: BiometricDataPoint) => void;
  syncOfflineData: () => Promise<void>;
}

export interface UseOfflineStorageReturn {
  isOnline: boolean;
  offlineData: BiometricDataPoint[];
  addOfflineDataPoint: (data: BiometricDataPoint) => void;
  syncOfflineData: () => Promise<void>;
}

export interface UseDeviceConnectionReturn {
  isConnected: boolean;
  deviceInfo: DeviceInfo | null;
  connectDevice: (device: DeviceInfo) => void;
  disconnectDevice: () => void;
}
