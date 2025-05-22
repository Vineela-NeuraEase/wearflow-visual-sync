
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { BiometricData } from '@/types/biometric';

interface UseBluetoothConnectionProps {
  onDeviceConnected?: (device: any) => void;
  onDataReceived?: (data: BiometricData) => void;
}

export function useBluetoothConnection({
  onDeviceConnected,
  onDataReceived
}: UseBluetoothConnectionProps) {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [deviceName, setDeviceName] = useState<string | null>(null);
  
  const connectToDevice = useCallback(async () => {
    setIsConnecting(true);
    
    try {
      // Simulating connection delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulating successful connection
      setIsConnected(true);
      setDeviceName("Wellness Tracker");
      
      toast({
        title: "Device Connected",
        description: "Successfully connected to Wellness Tracker",
      });
      
      if (onDeviceConnected) {
        // In a real app, this would be the actual device object
        onDeviceConnected({ name: "Wellness Tracker", id: "12345" });
      }
      
    } catch (error) {
      console.error("Bluetooth connection failed:", error);
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Could not connect to a device. Please try again.",
      });
    } finally {
      setIsConnecting(false);
    }
  }, [toast, onDeviceConnected]);
  
  const disconnectDevice = useCallback(() => {
    setIsConnected(false);
    setDeviceName(null);
    
    toast({
      title: "Device Disconnected",
      description: "Device has been disconnected",
    });
  }, [toast]);

  return {
    isConnected,
    isConnecting,
    deviceName,
    connectToDevice,
    disconnectDevice
  };
}
