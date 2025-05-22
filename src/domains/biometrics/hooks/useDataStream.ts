import { useState, useCallback } from 'react';
import { BiometricDataPoint } from '../types';

interface UseDataStreamProps {
  isConnected: boolean;
  maxDataPoints: number;
}

export function useDataStream({ isConnected, maxDataPoints }: UseDataStreamProps) {
  const [dataPoints, setDataPoints] = useState<BiometricDataPoint[]>([]);
  
  // Add a new data point to the stream
  const addDataPoint = useCallback((data: BiometricDataPoint) => {
    setDataPoints(prev => {
      const newData = [data, ...prev];
      // Keep only the most recent points up to the maximum
      return newData.slice(0, maxDataPoints);
    });
  }, [maxDataPoints]);
  
  return {
    dataPoints,
    addDataPoint
  };
}
