
import { nativeBluetoothService } from './bluetooth/NativeBluetoothService';
import { mockBluetoothService } from './bluetooth/MockBluetoothService';
import { BiometricReading, BluetoothServiceInterface } from './bluetooth/types';

// Check if the app is running in a Capacitor environment (native mobile)
const isNativePlatform = (): boolean => {
  return window.hasOwnProperty('Capacitor');
};

// Export the appropriate service based on platform
export const getBiometricService = (): BluetoothServiceInterface => {
  if (isNativePlatform()) {
    console.log('Using native Bluetooth service');
    return nativeBluetoothService;
  } else {
    console.log('Using mock Bluetooth service for web');
    return mockBluetoothService;
  }
};

export type { BiometricReading, BluetoothServiceInterface };
export { isNativePlatform };
