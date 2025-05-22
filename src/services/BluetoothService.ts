
import { getBiometricService } from './BluetoothServiceFactory';

// Export singleton service that auto-selects the right implementation
export const bluetoothService = getBiometricService();

// Re-export types and utility functions
export * from './bluetooth/types';
export * from './bluetooth/constants';
export * from './bluetooth/utils';
export * from './BluetoothServiceFactory';
