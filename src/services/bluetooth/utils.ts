
import { DataView } from '@capacitor-community/bluetooth-le';

/**
 * Parse heart rate value from DataView according to Bluetooth GATT spec
 */
export function parseHeartRateValue(value: DataView): number {
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

/**
 * Generate a random stress level based on heart rate
 */
export function calculateStressLevel(heartRate: number): number {
  return Math.round(Math.max(30, Math.min(90, 
    100 - (heartRate < 70 ? 70 : 100 - heartRate))));
}

/**
 * Generate a simulated HRV value
 */
export function generateSimulatedHrv(): number {
  return Math.round(50 + (Math.random() * 10 - 5));
}
