
import { useState, useCallback } from 'react';

interface UseBluetoothConnectionProps {
  onDeviceConnected?: (device: any) => void;
}

export const useBluetoothConnection = ({ onDeviceConnected }: UseBluetoothConnectionProps = {}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [deviceName, setDeviceName] = useState<string | null>(null);
  const [device, setDevice] = useState<any>(null);
  
  // Connect to a Bluetooth device
  const connectToDevice = useCallback(async () => {
    setIsConnecting(true);
    
    try {
      // In a real app, this would use Web Bluetooth API
      // For demo purposes, we'll simulate a connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockDevice = {
        name: "HeartSense Pro",
        id: "mock-device-id",
        sendData: () => {},
      };
      
      setIsConnected(true);
      setDeviceName(mockDevice.name);
      setDevice(mockDevice);
      
      if (onDeviceConnected) {
        onDeviceConnected(mockDevice);
      }
      
      // Start sending mock data
      window.bluetoothInterval = setInterval(() => {
        // Random biometric data simulation
        const mockData = {
          timestamp: new Date().toISOString(),
          heartRate: Math.floor(Math.random() * 30) + 60, // 60-90
          hrv: Math.floor(Math.random() * 30) + 40, // 40-70
          stressLevel: Math.floor(Math.random() * 40) + 20, // 20-60
          temperature: 98.6 - (Math.random() * 2) + Math.random(), // Around 98.6
          skinConductance: Math.random() * 10 + 5,
          movementIntensity: Math.random() * 100
        };
        
        // Dispatch an event with the mock data
        const dataEvent = new CustomEvent('bluetoothData', { detail: mockData });
        window.dispatchEvent(dataEvent);
      }, 5000);
      
    } catch (error) {
      console.error('Error connecting to device:', error);
    } finally {
      setIsConnecting(false);
    }
  }, [onDeviceConnected]);
  
  // Disconnect from the device
  const disconnectDevice = useCallback(() => {
    if (window.bluetoothInterval) {
      clearInterval(window.bluetoothInterval);
      window.bluetoothInterval = undefined;
    }
    
    setIsConnected(false);
    setDeviceName(null);
    setDevice(null);
  }, []);
  
  return {
    isConnected,
    isConnecting,
    deviceName,
    device,
    connectToDevice,
    disconnectDevice
  };
};
