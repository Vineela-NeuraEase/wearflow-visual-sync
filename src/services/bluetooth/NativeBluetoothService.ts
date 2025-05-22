
import { BleClient, BleDevice, ScanMode } from '@capacitor-community/bluetooth-le';
import { HEART_RATE_SERVICE, HEART_RATE_CHARACTERISTIC } from './constants';
import { parseHeartRateValue, calculateStressLevel, generateSimulatedHrv } from './utils';
import { BiometricReading, BluetoothServiceInterface, ConnectionListener, DataListener } from './types';

class NativeBluetoothService implements BluetoothServiceInterface {
  private initialized: boolean = false;
  private connectedDevice: BleDevice | null = null;
  private dataListeners: DataListener[] = [];
  private connectionListeners: ConnectionListener[] = [];
  
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
      const device = await BleClient.requestDevice({
        services: [HEART_RATE_SERVICE],
        namePrefix: '',
        scanMode: ScanMode.SCAN_MODE_LOW_LATENCY,
      });
      
      // Wrap single device in array to match expected return type
      return device ? [device] : [];
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
            const heartRate = parseHeartRateValue(value);
            
            // Generate a biometric reading with the heart rate
            const reading: BiometricReading = {
              heartRate,
              // Calculate an hrv value based on the heart rate (simulated)
              hrv: generateSimulatedHrv(),
              // Calculate a stress level based on heart rate
              stressLevel: calculateStressLevel(heartRate),
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
  
  addDataListener(listener: DataListener): void {
    this.dataListeners.push(listener);
  }
  
  removeDataListener(listener: DataListener): void {
    const index = this.dataListeners.indexOf(listener);
    if (index > -1) {
      this.dataListeners.splice(index, 1);
    }
  }
  
  addConnectionListener(listener: ConnectionListener): void {
    this.connectionListeners.push(listener);
  }
  
  removeConnectionListener(listener: ConnectionListener): void {
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
}

// Export singleton instance
export const nativeBluetoothService = new NativeBluetoothService();
