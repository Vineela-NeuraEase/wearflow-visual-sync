
import { BiometricReading } from './BluetoothService';

// Mock BLE Device interface
export interface MockBleDevice {
  deviceId: string;
  name?: string;
}

class MockBluetoothService {
  private initialized: boolean = false;
  private connectedDevice: MockBleDevice | null = null;
  private dataListeners: ((data: BiometricReading) => void)[] = [];
  private connectionListeners: ((connected: boolean, device?: MockBleDevice) => void)[] = [];
  private mockDataInterval: NodeJS.Timeout | null = null;
  
  async initialize(): Promise<boolean> {
    if (this.initialized) return true;
    
    console.log('Mock Bluetooth initialized successfully');
    this.initialized = true;
    return true;
  }
  
  async requestPermissions(): Promise<boolean> {
    return this.initialize();
  }
  
  async scanForDevices(timeoutMs: number = 5000): Promise<MockBleDevice[]> {
    await this.initialize();
    
    // Simulate a device scan delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { deviceId: 'mock-device-1', name: 'Mock Heart Rate Monitor' },
          { deviceId: 'mock-device-2', name: 'Mock Fitness Tracker' }
        ]);
      }, Math.min(timeoutMs, 2000)); // Cap the delay at 2 seconds
    });
  }
  
  async connectToDevice(deviceId: string): Promise<boolean> {
    await this.initialize();
    
    // Simulate connection delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const device = { deviceId, name: 'Mock Device ' + deviceId.substring(0, 4) };
        this.connectedDevice = device;
        this.notifyConnectionListeners(true, device);
        
        // Start sending mock data
        this.startMockDataGeneration();
        
        resolve(true);
      }, 1500);
    });
  }
  
  async disconnectDevice(): Promise<boolean> {
    if (!this.connectedDevice) {
      return true; // Already disconnected
    }
    
    if (this.mockDataInterval) {
      clearInterval(this.mockDataInterval);
      this.mockDataInterval = null;
    }
    
    this.connectedDevice = null;
    this.notifyConnectionListeners(false);
    
    return true;
  }
  
  isConnected(): boolean {
    return this.connectedDevice !== null;
  }
  
  getConnectedDevice(): MockBleDevice | null {
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
  
  addConnectionListener(listener: (connected: boolean, device?: MockBleDevice) => void): void {
    this.connectionListeners.push(listener);
  }
  
  removeConnectionListener(listener: (connected: boolean, device?: MockBleDevice) => void): void {
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
  
  private notifyConnectionListeners(connected: boolean, device?: MockBleDevice): void {
    this.connectionListeners.forEach(listener => {
      try {
        listener(connected, device);
      } catch (error) {
        console.error('Error in connection listener:', error);
      }
    });
  }
  
  private startMockDataGeneration(): void {
    // Clear any existing interval
    if (this.mockDataInterval) {
      clearInterval(this.mockDataInterval);
    }
    
    // Generate mock heart rate data every second
    this.mockDataInterval = setInterval(() => {
      // Generate a random heart rate between 60 and 100 bpm
      const heartRate = Math.floor(60 + Math.random() * 40);
      
      // Calculate an HRV value based on the heart rate (simulated)
      const hrv = Math.round(50 + (Math.random() * 10 - 5));
      
      // Calculate a stress level based on heart rate and HRV (simulated)
      const stressLevel = Math.round(Math.max(30, Math.min(90, 
        100 - (heartRate < 70 ? 70 : 100 - heartRate))));
      
      // Create a mock reading
      const mockReading: BiometricReading = {
        heartRate,
        hrv,
        stressLevel,
        timestamp: new Date().toISOString()
      };
      
      // Notify listeners
      this.notifyDataListeners(mockReading);
    }, 1000);
  }
}

// Export singleton instance
export const mockBluetoothService = new MockBluetoothService();
