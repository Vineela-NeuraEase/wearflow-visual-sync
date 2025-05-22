
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { BiometricDataPoint, UseOfflineStorageReturn } from './types';

const OFFLINE_DATA_KEY = 'hana_offline_biometric_data';

export function useOfflineStorage(): UseOfflineStorageReturn {
  const { toast } = useToast();
  const [offlineData, setOfflineData] = useState<BiometricDataPoint[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
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
  }, []);
  
  // Load stored data on mount
  useEffect(() => {
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
  
  // Store offline data when it changes
  useEffect(() => {
    if (offlineData.length > 0) {
      localStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(offlineData));
    }
  }, [offlineData]);
  
  const addOfflineDataPoint = useCallback((data: BiometricDataPoint) => {
    setOfflineData(prev => [...prev, data]);
    console.log("Data stored locally for offline use");
  }, []);
  
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
  
  return {
    isOnline,
    offlineData,
    addOfflineDataPoint,
    syncOfflineData
  };
}
