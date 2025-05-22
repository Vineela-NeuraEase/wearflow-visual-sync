import { useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { BiometricData } from '@/types/strategy';

export function useWarningCore() {
  // User authentication state
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Device connection state
  const [isConnected, setIsConnected] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  
  // Data collection state
  const [dataPoints, setDataPoints] = useState<BiometricData[]>([]);
  const [sleepData, setSleepData] = useState<any>([]);
  const [sensoryData, setSensoryData] = useState<any>([]);
  const [routineData, setRoutineData] = useState<any>([]);
  const [behavioralData, setBehavioralData] = useState<any>([]);
  
  // Network state
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineData, setOfflineData] = useState<BiometricData[]>([]);
  
  // Warning state
  const [warningActive, setWarningActive] = useState(false);
  const [warningEventId, setWarningEventId] = useState<string | null>(null);
  
  // UI state
  const [showStrategies, setShowStrategies] = useState(false);
  
  // Initialize network status listeners
  useState(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  });
  
  // Connect to a biometric device
  const connectDevice = useCallback((device: any) => {
    setIsConnected(true);
    setDeviceInfo(device);
    toast({
      title: "Device connected",
      description: `Connected to ${device.name || 'biometric device'}`,
    });
  }, [toast]);
  
  // Add a data point from the device
  const addDataPoint = useCallback((data: BiometricData) => {
    setDataPoints(prev => {
      // Keep only the latest 50 data points to avoid performance issues
      const newDataPoints = [data, ...prev];
      if (newDataPoints.length > 50) {
        return newDataPoints.slice(0, 50);
      }
      return newDataPoints;
    });
    
    // If offline, store data for later sync
    if (!isOnline) {
      setOfflineData(prev => [...prev, data]);
    }
  }, [isOnline]);
  
  // Show strategies UI
  const handleShowStrategies = useCallback(() => {
    setShowStrategies(true);
  }, []);
  
  // Hide strategies UI
  const handleHideStrategies = useCallback(() => {
    setShowStrategies(false);
  }, []);

  return {
    user,
    toast,
    isConnected,
    deviceInfo,
    dataPoints,
    isOnline,
    offlineData,
    sleepData,
    sensoryData,
    routineData,
    behavioralData,
    warningActive,
    warningEventId,
    showStrategies,
    connectDevice,
    addDataPoint,
    setSleepData,
    setSensoryData,
    setRoutineData,
    setBehavioralData,
    setWarningActive,
    setWarningEventId,
    handleShowStrategies,
    handleHideStrategies
  };
}
