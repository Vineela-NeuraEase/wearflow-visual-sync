
import { BleManager, Device, State, Characteristic } from 'react-native-ble-plx';
import { Platform, PermissionsAndroid } from 'react-native';
import { BiometricData } from '@/domains/biometrics/types';

// Standard GATT service UUIDs for health devices
const HEART_RATE_SERVICE = '0000180d-0000-1000-8000-00805f9b34fb';
const HEART_RATE_CHARACTERISTIC = '00002a37-0000-1000-8000-00805f9b34fb';

class BluetoothService {
  private manager: BleManager;
  private device: Device | null = null;
  private isScanning: boolean = false;
  
  constructor() {
    this.manager = new BleManager();
  }
  
  async requestPermissions(): Promise<boolean> {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Bluetooth Permission",
          message: "This app requires access to your location to scan for Bluetooth devices.",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission denied');
        return false;
      }
    }
    
    return true;
  }
  
  async checkBluetoothState(): Promise<boolean> {
    return new Promise((resolve) => {
      this.manager.onStateChange((state) => {
        if (state === State.PoweredOn) {
          resolve(true);
        } else if (state === State.PoweredOff) {
          resolve(false);
        }
      }, true);
    });
  }
  
  async scanForDevices(onDeviceFound: (device: Device) => void): Promise<void> {
    const hasPermission = await this.requestPermissions();
    
    if (!hasPermission) {
      throw new Error("Bluetooth permission denied");
    }
    
    if (this.isScanning) {
      await this.stopScan();
    }
    
    this.isScanning = true;
    
    try {
      this.manager.startDeviceScan(
        null, // Scan for all services
        { allowDuplicates: false },
        (error, device) => {
          if (error) {
            console.log('Scan error:', error);
            this.isScanning = false;
            return;
          }
          
          if (device && device.name) {
            // Only report devices with names
            onDeviceFound(device);
          }
        }
      );
    } catch (error) {
      this.isScanning = false;
      throw error;
    }
  }
  
  async stopScan(): Promise<void> {
    this.manager.stopDeviceScan();
    this.isScanning = false;
  }
  
  async connectToDevice(device: Device): Promise<Device> {
    try {
      const connectedDevice = await device.connect();
      const discoveredDevice = await connectedDevice.discoverAllServicesAndCharacteristics();
      this.device = discoveredDevice;
      return discoveredDevice;
    } catch (error) {
      console.log('Connection error:', error);
      throw error;
    }
  }
  
  async disconnectDevice(): Promise<void> {
    if (this.device) {
      await this.device.cancelConnection();
      this.device = null;
    }
  }
  
  async subscribeToHeartRate(onData: (data: BiometricData) => void): Promise<() => void> {
    if (!this.device) {
      throw new Error('No device connected');
    }
    
    // Subscribe to heart rate measurements
    const subscription = this.device.monitorCharacteristicForService(
      HEART_RATE_SERVICE,
      HEART_RATE_CHARACTERISTIC,
      (error, characteristic) => {
        if (error) {
          console.log('Monitoring error:', error);
          return;
        }
        
        if (!characteristic?.value) {
          return;
        }
        
        const heartRate = this.parseHeartRate(characteristic);
        
        // In a real app, you would get HRV from a specific characteristic
        // Here we're simulating HRV values based on heart rate
        const hrv = Math.max(30, 60 - Math.abs(70 - heartRate));
        const stressLevel = Math.round(100 - (hrv / 60 * 100));
        
        onData({
          heartRate,
          hrv,
          stressLevel,
          timestamp: new Date().toISOString()
        });
      }
    );
    
    // Return a cleanup function
    return () => {
      subscription.remove();
    };
  }
  
  // Parse heart rate value from characteristic
  private parseHeartRate(characteristic: Characteristic): number {
    const buffer = Buffer.from(characteristic.value || '', 'base64');
    
    // Check if the heart rate value format is uint8 or uint16
    const firstByte = buffer.readUInt8(0);
    const isUint16 = (firstByte & 0x1) === 1;
    
    if (isUint16) {
      return buffer.readUInt16LE(1);
    } else {
      return buffer.readUInt8(1);
    }
  }
  
  // Clean up resources
  destroy(): void {
    if (this.device) {
      this.device.cancelConnection();
    }
    this.manager.destroy();
  }
}

export default new BluetoothService();
