
import { useState, useEffect, useCallback } from 'react';
import { BiometricData } from '@/types/biometric';

interface UseDataCollectionProps {
  isConnected: boolean;
  isOnline: boolean;
  onDataReceived?: (data: BiometricData) => void;
}

export function useDataCollection({
  isConnected,
  isOnline,
  onDataReceived
}: UseDataCollectionProps) {
  const [offlineData, setOfflineData] = useState<BiometricData[]>([]);
  
  // Store data locally
  const storeDataLocally = useCallback((data: BiometricData) => {
    setOfflineData(prev => [...prev, data]);
    console.log("Data stored locally", data);
  }, []);
  
  // Start/stop data collection based on connection status
  useEffect(() => {
    if (!isConnected) return;
    
    console.log("Starting simulated data collection");
    
    const intervalId = setInterval(() => {
      // Generate simulated biometric data
      const newData: BiometricData = {
        heartRate: 65 + Math.floor(Math.random() * 20),
        hrv: 45 + Math.floor(Math.random() * 15),
        stressLevel: Math.floor(Math.random() * 100),
        timestamp: new Date().toISOString(),
      };
      
      // Store data locally regardless of online status
      storeDataLocally(newData);
      
      // If online, send data immediately
      if (isOnline && onDataReceived) {
        onDataReceived(newData);
      }
    }, 5000); // Every 5 seconds
    
    // Store the interval ID to clear it later
    window.bluetoothInterval = intervalId;
    
    return () => {
      if (window.bluetoothInterval) {
        clearInterval(window.bluetoothInterval);
      }
    };
  }, [isConnected, isOnline, storeDataLocally, onDataReceived]);
  
  return {
    offlineData
  };
}
