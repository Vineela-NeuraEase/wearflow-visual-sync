
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { BiometricData } from '../types';

export function useOnlineStatus() {
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineData, setOfflineData] = useState<BiometricData[]>([]);
  
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
  
  // Function to sync offline data when coming back online
  const syncOfflineData = useCallback(async (data: BiometricData[], onDataReceived?: (data: BiometricData) => void) => {
    if (data.length === 0) return;
    
    console.log(`Syncing ${data.length} offline data points`);
    
    try {
      // In a real app, this would send the data to your backend/Supabase
      // For now, we'll just process it locally
      if (onDataReceived) {
        data.forEach(item => {
          onDataReceived(item);
        });
      }
      
      // Clear offline data after successful sync
      setOfflineData([]);
      
      toast({
        title: "Data Synchronized",
        description: `${data.length} measurements synced successfully`,
      });
      
      return [];
    } catch (error) {
      console.error("Failed to sync offline data:", error);
      toast({
        variant: "destructive",
        title: "Sync Failed",
        description: "Could not sync offline data. Will retry later.",
      });
      
      return data;
    }
  }, [toast]);
  
  return {
    isOnline,
    syncOfflineData
  };
}
