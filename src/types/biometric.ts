
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
