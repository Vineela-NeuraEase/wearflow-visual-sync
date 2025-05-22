
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { BiometricData } from '@/types/biometric';
import { getBiometricService } from '../services/BluetoothServiceFactory';

interface UseBluetoothConnectionProps {
  onDeviceConnected?: (device: any) => void;
  onDataReceived?: (data: BiometricData) => void;
}

export function useBluetoothConnection({
  onDeviceConnected,
  onDataReceived
}: UseBluetoothConnectionProps = {}) {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [deviceName, setDeviceName] = useState<string | null>(null);
  
  // Get the appropriate Bluetooth service for the platform
  const bluetoothService = getBiometricService();
  
  // Initialize Bluetooth on hook mount
  useEffect(() => {
    bluetoothService.initialize().catch(error => {
      console.error("Failed to initialize Bluetooth:", error);
    });
    
    // Add connection listener
    const connectionListener = (connected: boolean, device?: any) => {
      setIsConnected(connected);
      if (connected && device) {
        setDeviceName(device.name || "Connected Device");
      } else {
        setDeviceName(null);
      }
    };
    
    bluetoothService.addConnectionListener(connectionListener);
    
    // Add data listener for Bluetooth readings
    const dataListener = (data: any) => {
      if (onDataReceived) {
        // Convert to our BiometricData format
        const biometricData: BiometricData = {
          heartRate: data.heartRate,
          hrv: data.hrv || 0,
          stressLevel: data.stressLevel || 0,
          timestamp: data.timestamp,
        };
        onDataReceived(biometricData);
      }
    };
    
    // Register data listener
    bluetoothService.addDataListener(dataListener);
    
    // Check for already connected device
    if (bluetoothService.isConnected()) {
      const device = bluetoothService.getConnectedDevice();
      setIsConnected(true);
      setDeviceName(device?.name || "Connected Device");
    }
    
    // Clean up on unmount
    return () => {
      bluetoothService.removeConnectionListener(connectionListener);
      bluetoothService.removeDataListener(dataListener);
    };
  }, [onDataReceived]);
  
  const connectToDevice = useCallback(async () => {
    setIsConnecting(true);
    
    try {
      // Request Bluetooth permissions
      const permissionsGranted = await bluetoothService.requestPermissions();
      
      if (!permissionsGranted) {
        toast({
          variant: "destructive",
          title: "Permission Error",
          description: "Bluetooth permissions are required to connect to devices.",
        });
        setIsConnecting(false);
        return;
      }
      
      // Scan for devices
      const devices = await bluetoothService.scanForDevices(5000);
      
      if (devices.length === 0) {
        toast({
          variant: "destructive",
          title: "No Devices Found",
          description: "No compatible devices were found nearby. Please make sure your device is on and in range.",
        });
        setIsConnecting(false);
        return;
      }
      
      // Connect to the first device found
      const device = devices[0];
      const connected = await bluetoothService.connectToDevice(device.deviceId);
      
      if (connected) {
        toast({
          title: "Device Connected",
          description: `Successfully connected to ${device.name || 'wearable device'}`,
        });
        
        // Call the callback if provided
        if (onDeviceConnected) {
          onDeviceConnected({
            name: device.name || "Bluetooth Device",
            id: device.deviceId
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Connection Failed",
          description: "Could not connect to the selected device. Please try again.",
        });
      }
    } catch (error) {
      console.error("Bluetooth connection error:", error);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "An error occurred while connecting to the device.",
      });
    } finally {
      setIsConnecting(false);
    }
  }, [toast, onDeviceConnected]);
  
  const disconnectDevice = useCallback(async () => {
    try {
      await bluetoothService.disconnectDevice();
      
      toast({
        title: "Device Disconnected",
        description: "Device has been disconnected",
      });
    } catch (error) {
      console.error("Error disconnecting:", error);
      toast({
        variant: "destructive", 
        title: "Disconnection Error",
        description: "Failed to disconnect from the device",
      });
    }
  }, [toast]);

  return {
    isConnected,
    isConnecting,
    deviceName,
    connectToDevice,
    disconnectDevice
  };
}
