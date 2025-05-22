
import { BleClient, BleDevice, numberToUUID } from '@capacitor-community/bluetooth-le';

// Standard Heart Rate Service UUID
const HEART_RATE_SERVICE = '0000180d-0000-1000-8000-00805f9b34fb';
// Standard Heart Rate Measurement characteristic
const HEART_RATE_CHARACTERISTIC = '00002a37-0000-1000-8000-00805f9b34fb';

// Optional HRV Service - proprietary or using standard battery service as example
const HRV_SERVICE = '0000180f-0000-1000-8000-00805f9b34fb';
const HRV_CHARACTERISTIC = '00002a19-0000-1000-8000-00805f9b34fb';

export interface BiometricReading {
  heartRate: number;
  hrv?: number;
  stressLevel?: number;
  timestamp: string;
}

class BluetoothService {
  private initialized: boolean = false;
  private connectedDevice: BleDevice | null = null;
  private dataListeners: ((data: BiometricReading) => void)[] = [];
  private connectionListeners: ((connected: boolean, device?: BleDevice) => void)[] = [];
  
  async initialize(): Promise<boolean> {
    if (this.initialized) return true;
    
    try {
      await BleClient.initialize();
      this.initialized = true;
      console.log('Bluetooth initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize Bluetooth', error);
      return false;
    }
  }
  
  async requestPermissions(): Promise<boolean> {
    try {
      // Request BLE permissions
      await this.initialize();
      return true;
    } catch (error) {
      console.error('Error requesting Bluetooth permissions:', error);
      return false;
    }
  }
  
  async scanForDevices(timeoutMs: number = 5000): Promise<BleDevice[]> {
    try {
      await this.initialize();
      
      // Start scanning for devices with heart rate service
      const devices: BleDevice[] = await BleClient.requestDevice({
        services: [HEART_RATE_SERVICE],
        namePrefix: '',
        scanMode: 'low_latency',
        timeoutMs
      });
      
      return Array.isArray(devices) ? devices : [devices];
    } catch (error) {
      console.error('Error scanning for Bluetooth devices:', error);
      return [];
    }
  }
  
  async connectToDevice(deviceId: string): Promise<boolean> {
    try {
      await this.initialize();
      
      // Connect to the device
      await BleClient.connect(deviceId);
      console.log(`Connected to device: ${deviceId}`);
      
      // Get device information to store
      const connectedDevice = { deviceId };
      this.connectedDevice = connectedDevice as BleDevice;
      
      // Notify listeners of connection
      this.notifyConnectionListeners(true, connectedDevice as BleDevice);
      
      // Start notifications for heart rate
      try {
        await BleClient.startNotifications(
          deviceId,
          HEART_RATE_SERVICE,
          HEART_RATE_CHARACTERISTIC,
          (value) => {
            const heartRate = this.parseHeartRateValue(value);
            
            // Generate a biometric reading with the heart rate
            const reading: BiometricReading = {
              heartRate,
              // Calculate an hrv value based on the heart rate (simulated)
              hrv: Math.round(50 + (Math.random() * 10 - 5)),
              // Calculate a stress level based on heart rate and HRV (simulated)
              stressLevel: Math.round(Math.max(30, Math.min(90, 
                100 - (heartRate < 70 ? 70 : 100 - heartRate)))),
              timestamp: new Date().toISOString()
            };
            
            this.notifyDataListeners(reading);
          }
        );
        
        console.log('Started heart rate notifications');
      } catch (err) {
        console.error('Failed to start heart rate notifications:', err);
      }
      
      return true;
    } catch (error) {
      console.error('Error connecting to device:', error);
      return false;
    }
  }
  
  async disconnectDevice(): Promise<boolean> {
    if (!this.connectedDevice) {
      return true; // Already disconnected
    }
    
    try {
      await BleClient.disconnect(this.connectedDevice.deviceId);
      console.log('Disconnected from device');
      this.connectedDevice = null;
      this.notifyConnectionListeners(false);
      return true;
    } catch (error) {
      console.error('Error disconnecting from device:', error);
      return false;
    }
  }
  
  isConnected(): boolean {
    return this.connectedDevice !== null;
  }
  
  getConnectedDevice(): BleDevice | null {
    return this.connectedDevice;
  }
  
  addDataListener(listener: (data: BiometricReading) => void): void {
    this.dataListeners.push(listener);
  }
  
  removeDataListener(listener: (data: BiometricReading) => void): void {
    const index = this.dataListeners.indexOf(listener);
    if (index > -1) {
      this.dataListeners.splice(index, 1);
    }
  }
  
  addConnectionListener(listener: (connected: boolean, device?: BleDevice) => void): void {
    this.connectionListeners.push(listener);
  }
  
  removeConnectionListener(listener: (connected: boolean, device?: BleDevice) => void): void {
    const index = this.connectionListeners.indexOf(listener);
    if (index > -1) {
      this.connectionListeners.splice(index, 1);
    }
  }
  
  private notifyDataListeners(data: BiometricReading): void {
    this.dataListeners.forEach(listener => {
      try {
        listener(data);
      } catch (error) {
        console.error('Error in data listener:', error);
      }
    });
  }
  
  private notifyConnectionListeners(connected: boolean, device?: BleDevice): void {
    this.connectionListeners.forEach(listener => {
      try {
        listener(connected, device);
      } catch (error) {
        console.error('Error in connection listener:', error);
      }
    });
  }
  
  // Parse heart rate value from DataView according to Bluetooth GATT spec
  private parseHeartRateValue(value: DataView): number {
    const flags = value.getUint8(0);
    const rate16Bits = flags & 0x1;
    let heartRate: number;
    
    if (rate16Bits) {
      heartRate = value.getUint16(1, true);
    } else {
      heartRate = value.getUint8(1);
    }
    
    return heartRate;
  }
}

// Export singleton instance
export const bluetoothService = new BluetoothService();
