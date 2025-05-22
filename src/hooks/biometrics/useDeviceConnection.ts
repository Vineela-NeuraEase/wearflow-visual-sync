
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DeviceInfo, UseDeviceConnectionReturn } from './types';

const DEVICE_INFO_KEY = 'hana_wearable_device';

export function useDeviceConnection(): UseDeviceConnectionReturn {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  
  // Load stored device info on mount
  useEffect(() => {
    const storedDeviceInfo = localStorage.getItem(DEVICE_INFO_KEY);
    if (storedDeviceInfo) {
      try {
        const parsedInfo = JSON.parse(storedDeviceInfo);
        setDeviceInfo(parsedInfo);
        // If we had a connected device stored, consider it connected
        setIsConnected(true);
      } catch (e) {
        console.error("Failed to parse stored device info:", e);
      }
    }
  }, []);
  
  // Function to connect to device
  const connectDevice = useCallback((device: DeviceInfo) => {
    setDeviceInfo(device);
    setIsConnected(true);
    localStorage.setItem(DEVICE_INFO_KEY, JSON.stringify(device));
    
    toast({
      title: "Device Connected",
      description: `Connected to ${device.name || 'wearable device'}`,
    });
  }, [toast]);
  
  // Function to disconnect device
  const disconnectDevice = useCallback(() => {
    setIsConnected(false);
    localStorage.removeItem(DEVICE_INFO_KEY);
    
    toast({
      title: "Device Disconnected",
      description: "Wearable device has been disconnected",
    });
  }, [toast]);
  
  return {
    isConnected,
    deviceInfo,
    connectDevice,
    disconnectDevice
  };
}
