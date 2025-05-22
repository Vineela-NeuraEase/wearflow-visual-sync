
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { BiometricData } from '../types';

const OFFLINE_DATA_KEY = 'hana_offline_biometric_data';

export function useOfflineStorage() {
  const [isOnline, setIsOnline] = useState(true);
  const [offlineData, setOfflineData] = useState<BiometricData[]>([]);
  
  // Monitor online/offline status
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? true);
      
      if (state.isConnected === false) {
        console.log("Device went offline. Data will be stored locally.");
      }
    });
    
    // Load stored data on mount
    const loadStoredData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(OFFLINE_DATA_KEY);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (Array.isArray(parsedData)) {
            setOfflineData(parsedData);
            console.log(`Loaded ${parsedData.length} data points from storage`);
          }
        }
      } catch (e) {
        console.error("Failed to parse stored offline data:", e);
      }
    };
    
    loadStoredData();
    
    return () => {
      unsubscribe();
    };
  }, []);
  
  // Store offline data when it changes
  useEffect(() => {
    const storeData = async () => {
      if (offlineData.length > 0) {
        try {
          await AsyncStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(offlineData));
        } catch (e) {
          console.error("Failed to store offline data:", e);
        }
      }
    };
    
    storeData();
  }, [offlineData]);
  
  const addOfflineDataPoint = useCallback((data: BiometricData) => {
    setOfflineData(prev => [...prev, data]);
    console.log("Data stored locally for offline use");
  }, []);
  
  // Function to sync offline data
  const syncOfflineData = useCallback(async () => {
    if (offlineData.length === 0) return;
    
    console.log(`Syncing ${offlineData.length} offline data points`);
    
    try {
      // In a real app, this would send the data to your backend
      // For now, we'll just clear it and simulate a sync
      
      // Clear offline data after successful sync
      setOfflineData([]);
      await AsyncStorage.removeItem(OFFLINE_DATA_KEY);
      
      return true;
    } catch (error) {
      console.error("Failed to sync offline data:", error);
      return false;
    }
  }, [offlineData]);
  
  return {
    isOnline,
    offlineData,
    addOfflineDataPoint,
    syncOfflineData
  };
}
