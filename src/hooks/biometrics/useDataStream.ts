import { useState, useEffect, useCallback } from 'react';
import { BiometricDataPoint } from './types';

interface UseDataStreamProps {
  isConnected: boolean;
  maxDataPoints?: number;
}

export function useDataStream({ 
  isConnected, 
  maxDataPoints = 100 
}: UseDataStreamProps) {
  const [dataPoints, setDataPoints] = useState<BiometricDataPoint[]>([]);
  
  // Function to handle new data points
  const addDataPoint = useCallback((data: BiometricDataPoint) => {
    // Add to main data array, keeping only the most recent points
    setDataPoints(prev => {
      const newData = [data, ...prev].slice(0, maxDataPoints);
      return newData;
    });
    
    console.log("New biometric data point recorded:", data);
  }, [maxDataPoints]);
  
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
    dataPoints,
    addDataPoint
  };
}
