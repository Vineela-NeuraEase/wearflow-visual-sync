
import { useState, useEffect, useCallback } from 'react';
import { Device } from 'react-native-ble-plx';
import BluetoothService from '@/services/BluetoothService';
import { useToast } from '@/hooks/use-toast';
import { BiometricData } from '../types';

export function useBluetoothDevices() {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [biometricData, setBiometricData] = useState<BiometricData[]>([]);
  const { toast } = useToast();
  
  // Start scanning for devices
  const startScan = useCallback(async () => {
    try {
      setIsScanning(true);
      setDevices([]);
      
      const isBluetoothOn = await BluetoothService.checkBluetoothState();
      
      if (!isBluetoothOn) {
        toast({
          title: "Bluetooth is off",
          description: "Please turn on Bluetooth to scan for devices",
          variant: "destructive"
        });
        setIsScanning(false);
        return;
      }
      
      await BluetoothService.scanForDevices((device) => {
        setDevices((prevDevices) => {
          // Check if device already exists in the array
          if (!prevDevices.find((d) => d.id === device.id)) {
            return [...prevDevices, device];
          }
          return prevDevices;
        });
      });
      
      // Stop scan after 10 seconds
      setTimeout(() => {
        BluetoothService.stopScan();
        setIsScanning(false);
      }, 10000);
    } catch (error) {
      console.error('Error starting scan:', error);
      toast({
        title: "Scan Error",
        description: "There was an error scanning for devices",
        variant: "destructive"
      });
      setIsScanning(false);
    }
  }, [toast]);
  
  // Connect to a device
  const connectToDevice = useCallback(async (device: Device) => {
    try {
      const connected = await BluetoothService.connectToDevice(device);
      setConnectedDevice(connected);
      setIsConnected(true);
      
      // Subscribe to heart rate data
      const unsubscribe = await BluetoothService.subscribeToHeartRate((data) => {
        setBiometricData((prevData) => [data, ...prevData.slice(0, 99)]);
      });
      
      toast({
        title: "Device Connected",
        description: `Connected to ${device.name || 'Unknown Device'}`,
      });
      
      // Store unsubscribe function on window for cleanup
      window.bluetoothUnsubscribe = unsubscribe;
      
      return connected;
    } catch (error) {
      console.error('Error connecting to device:', error);
      toast({
        title: "Connection Error",
        description: "Could not connect to the device",
        variant: "destructive"
      });
      return null;
    }
  }, [toast]);
  
  // Disconnect from device
  const disconnectDevice = useCallback(async () => {
    try {
      await BluetoothService.disconnectDevice();
      
      // Call unsubscribe if it exists
      if (window.bluetoothUnsubscribe) {
        window.bluetoothUnsubscribe();
        window.bluetoothUnsubscribe = undefined;
      }
      
      setConnectedDevice(null);
      setIsConnected(false);
      
      toast({
        title: "Device Disconnected",
        description: "The device has been disconnected",
      });
    } catch (error) {
      console.error('Error disconnecting from device:', error);
    }
  }, [toast]);
  
  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      if (window.bluetoothUnsubscribe) {
        window.bluetoothUnsubscribe();
      }
      BluetoothService.stopScan();
    };
  }, []);
  
  return {
    isScanning,
    devices,
    connectedDevice,
    isConnected,
    biometricData,
    startScan,
    connectToDevice,
    disconnectDevice
  };
}

// Add this to make TypeScript happy about the window.bluetoothUnsubscribe
declare global {
  interface Window {
    bluetoothUnsubscribe: (() => void) | undefined;
  }
}
