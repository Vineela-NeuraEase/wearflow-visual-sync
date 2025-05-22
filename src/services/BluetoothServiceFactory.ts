
import { bluetoothService, BiometricReading } from './BluetoothService';
import { mockBluetoothService } from './MockBluetoothService';

// Check if the app is running in a Capacitor environment (native mobile)
const isNativePlatform = (): boolean => {
  return window.hasOwnProperty('Capacitor');
};

// Export the appropriate service based on platform
export const getBiometricService = () => {
  if (isNativePlatform()) {
    console.log('Using native Bluetooth service');
    return bluetoothService;
  } else {
    console.log('Using mock Bluetooth service for web');
    return mockBluetoothService;
  }
};

export type { BiometricReading };
