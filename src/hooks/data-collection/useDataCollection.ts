
import { useState } from 'react';
import { useAuth } from "@/context/AuthContext";
import { useSleepData } from './useSleepData';
import { useSensoryData } from './useSensoryData';
import { useRoutineData } from './useRoutineData';
import { useBehavioralData } from './useBehavioralData';
import { useSensorData } from './useSensorData';
import { BiometricData } from '@/types/biometric';

interface UseDataCollectionProps {
  isConnected?: boolean;
  isOnline?: boolean;
  onDataReceived?: (data: BiometricData) => void;
}

export const useDataCollection = ({
  isConnected = false,
  isOnline = true,
  onDataReceived
}: UseDataCollectionProps = {}) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Import functionalities from smaller hooks
  const { saveSensorData, collectData } = useSensorData({ 
    isConnected, 
    isOnline, 
    onDataReceived,
    user 
  });
  
  const { 
    saveSleepData, 
    fetchSleepData 
  } = useSleepData({ user, setIsLoading });
  
  const { 
    saveSensoryData, 
    fetchSensoryData 
  } = useSensoryData({ user, setIsLoading });
  
  const { 
    saveRoutineData, 
    fetchRoutineData 
  } = useRoutineData({ user, setIsLoading });
  
  const { 
    saveBehavioralData, 
    fetchBehavioralData 
  } = useBehavioralData({ user, setIsLoading });

  return {
    isLoading,
    collectData,
    saveSleepData,
    saveSensoryData,
    saveRoutineData,
    saveBehavioralData,
    fetchSleepData,
    fetchSensoryData,
    fetchRoutineData,
    fetchBehavioralData
  };
};
