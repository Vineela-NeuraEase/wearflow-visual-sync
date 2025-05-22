import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface BiometricDataPoint {
  heartRate: number;
  hrv: number;
  stressLevel: number;
  timestamp: string;
}

interface UseBiometricDataProps {
  maxDataPoints?: number;
}

export function useBiometricData({ maxDataPoints = 100 }: UseBiometricDataProps = {}) {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [dataPoints, setDataPoints] = useState<BiometricDataPoint[]>([]);
  const [offlineData, setOfflineData] = useState<BiometricDataPoint[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Local storage keys
  const DEVICE_INFO_KEY = 'hana_wearable_device';
  const OFFLINE_DATA_KEY = 'hana_offline_biometric_data';
  
  // Load stored data on mount
  useEffect(() => {
    // Load device info
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
    
    // Load offline data
    const storedData = localStorage.getItem(OFFLINE_DATA_KEY);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
          setOfflineData(parsedData);
          console.log(`Loaded ${parsedData.length} data points from storage`);
        }
      } catch (e) {
        console.error("Failed to parse stored offline data:", e);
      }
    }
  }, []);
  
  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineData();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      console.log("Device went offline. Data will be stored locally.");
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [offlineData]);
  
  // Store offline data when it changes
  useEffect(() => {
    if (offlineData.length > 0) {
      localStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(offlineData));
    }
  }, [offlineData]);
  
  // Function to handle new data points
  const addDataPoint = useCallback((data: BiometricDataPoint) => {
    // Add to main data array, keeping only the most recent points
    setDataPoints(prev => {
      const newData = [data, ...prev].slice(0, maxDataPoints);
      return newData;
    });
    
    // If offline, also add to offline data for syncing later
    if (!isOnline) {
      setOfflineData(prev => [...prev, data]);
    }
    
    console.log("New biometric data point recorded:", data);
  }, [isOnline, maxDataPoints]);
  
  // Function to sync offline data
  const syncOfflineData = useCallback(async () => {
    if (offlineData.length === 0) return;
    
    console.log(`Syncing ${offlineData.length} offline data points`);
    
    try {
      // In a real app, this would send the data to your backend
      // For this demo, we'll just consider it synced
      
      toast({
        title: "Data Synchronized",
        description: `${offlineData.length} measurements synced successfully`,
      });
      
      // Clear offline data after successful sync
      setOfflineData([]);
      localStorage.removeItem(OFFLINE_DATA_KEY);
    } catch (error) {
      console.error("Failed to sync offline data:", error);
      toast({
        variant: "destructive",
        title: "Sync Failed",
        description: "Could not sync offline data. Will retry later.",
      });
    }
  }, [offlineData, toast]);
  
  // Function to connect to device
  const connectDevice = useCallback((device: any) => {
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
  
  // Start simulated data stream if connected
  useEffect(() => {
    if (!isConnected) return;
    
    console.log("Starting simulated data stream");
    
    const intervalId = setInterval(() => {
      const newData: BiometricDataPoint = {
        heartRate: 65 + Math.floor(Math.random() * 20),
        hrv: 45 + Math.floor(Math.random() * 15),
        stressLevel: Math.floor(Math.random() * 100),
        timestamp: new Date().toISOString()
      };
      
      addDataPoint(newData);
    }, 5000); // Every 5 seconds
    
    return () => clearInterval(intervalId);
  }, [isConnected, addDataPoint]);
  
  return {
    isConnected,
    deviceInfo,
    dataPoints,
    offlineData,
    isOnline,
    connectDevice,
    disconnectDevice,
    addDataPoint,
    syncOfflineData
  };
}
