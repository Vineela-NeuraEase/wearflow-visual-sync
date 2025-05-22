
import { useState, useEffect, useCallback } from 'react';
import { AppState, NetInfo } from 'react-native';
import { useToast } from '@/hooks/use-toast';
import { BiometricData } from '../types';

export function useOnlineStatus() {
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(true);
  
  // Monitor online/offline status
  useEffect(() => {
    const handleConnectivityChange = (state: { isConnected: boolean }) => {
      setIsOnline(state.isConnected);
      
      if (state.isConnected) {
        console.log('Device is now online');
      } else {
        console.log('Device went offline. Data will be stored locally.');
      }
    };
    
    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);
    
    // Check initial connectivity state
    NetInfo.fetch().then(state => {
      setIsOnline(state.isConnected || false);
    });
    
    // Also listen for app state changes to check connectivity when app comes to foreground
    const appStateSubscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        NetInfo.fetch().then(state => {
          setIsOnline(state.isConnected || false);
        });
      }
    });
    
    return () => {
      unsubscribe();
      appStateSubscription.remove();
    };
  }, []);
  
  // Function to sync offline data when coming back online
  const syncOfflineData = useCallback(async (data: BiometricData[], onDataReceived?: (data: BiometricData) => void) => {
    if (!isOnline || data.length === 0) return;
    
    console.log(`Syncing ${data.length} offline data points`);
    
    try {
      // In a real app, this would send the data to your backend/Supabase
      // For now, we'll just process it locally
      if (onDataReceived) {
        data.forEach(item => {
          onDataReceived(item);
        });
      }
      
      toast({
        title: "Data Synchronized",
        description: `${data.length} measurements synced successfully`,
      });
      
    } catch (error) {
      console.error("Failed to sync offline data:", error);
      toast({
        variant: "destructive",
        title: "Sync Failed",
        description: "Could not sync offline data. Will retry later.",
      });
    }
  }, [isOnline, toast]);
  
  return {
    isOnline,
    syncOfflineData
  };
}
