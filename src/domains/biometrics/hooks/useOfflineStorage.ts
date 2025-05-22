
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { BiometricData } from '../types';

export function useOfflineStorage() {
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineData, setOfflineData] = useState<BiometricData[]>([]);
  
  // Add offline data point
  const addOfflineDataPoint = useCallback((data: BiometricData) => {
    setOfflineData(prev => [...prev, data]);
    console.log("Data stored for offline sync", data);
  }, []);
  
  // Sync offline data when back online
  const syncOfflineData = useCallback(async () => {
    if (offlineData.length === 0) return;
    
    console.log(`Syncing ${offlineData.length} offline data points`);
    
    try {
      // In a real app, this would send the data to your backend
      // For now, we'll just clear it and simulate a sync
      
      toast({
        title: "Data Synchronized",
        description: `${offlineData.length} measurements synced successfully`,
      });
      
      // Clear offline data after successful sync
      setOfflineData([]);
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
