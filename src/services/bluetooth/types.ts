
import { BleDevice } from '@capacitor-community/bluetooth-le';

export interface BiometricReading {
  heartRate: number;
  hrv?: number;
  stressLevel?: number;
  timestamp: string;
}

export interface ConnectionListener {
  (connected: boolean, device?: BleDevice): void;
}

export interface DataListener {
  (data: BiometricReading): void;
}

export interface BluetoothServiceInterface {
  initialize(): Promise<boolean>;
  requestPermissions(): Promise<boolean>;
  scanForDevices(timeoutMs?: number): Promise<BleDevice[]>;
  connectToDevice(deviceId: string): Promise<boolean>;
  disconnectDevice(): Promise<boolean>;
  isConnected(): boolean;
  getConnectedDevice(): BleDevice | null;
  addDataListener(listener: DataListener): void;
  removeDataListener(listener: DataListener): void;
  addConnectionListener(listener: ConnectionListener): void;
  removeConnectionListener(listener: ConnectionListener): void;
}
