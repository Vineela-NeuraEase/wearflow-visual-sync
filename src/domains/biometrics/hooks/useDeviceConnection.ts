
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DeviceInfo } from '../types';

export function useDeviceConnection() {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  
  // Connect to a device
  const connectDevice = useCallback((device: any) => {
    setIsConnected(true);
    setDeviceInfo({
      name: device.name || "Unknown Device",
      id: device.id || "unknown",
      ...device
    });
    
    toast({
      title: "Device Connected",
      description: `Connected to ${device.name || "device"}`,
    });
  }, [toast]);
  
  // Disconnect from current device
  const disconnectDevice = useCallback(() => {
    setIsConnected(false);
    setDeviceInfo(null);
    
    toast({
      title: "Device Disconnected",
      description: "The device has been disconnected",
    });
  }, [toast]);
  
  return {
    isConnected,
    deviceInfo,
    connectDevice,
    disconnectDevice
  };
}
