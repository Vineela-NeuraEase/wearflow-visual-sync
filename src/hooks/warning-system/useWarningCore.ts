
import { useState, useEffect } from 'react';
import { useBiometricData } from '../useBiometricData';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

/**
 * Core hook for the warning system that handles device connection and basic state
 */
export function useWarningCore() {
  // Get biometric data from device connection
  const {
    isConnected,
    deviceInfo,
    dataPoints,
    isOnline,
    offlineData,
    connectDevice,
    addDataPoint
  } = useBiometricData();
  
  // Auth context and toast
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Track most recent data
  const [sleepData, setSleepData] = useState(null);
  const [sensoryData, setSensoryData] = useState(null);
  const [routineData, setRoutineData] = useState(null);
  const [behavioralData, setBehavioralData] = useState(null);
  
  // Warning state
  const [warningActive, setWarningActive] = useState(false);
  const [warningEventId, setWarningEventId] = useState(null);
  
  // Strategies UI state
  const [showStrategies, setShowStrategies] = useState(false);
  
  const handleShowStrategies = () => setShowStrategies(true);
  const handleHideStrategies = () => setShowStrategies(false);

  return {
    isConnected,
    deviceInfo,
    dataPoints,
    isOnline,
    offlineData,
    connectDevice,
    addDataPoint,
    user,
    toast,
    sleepData,
    setSleepData,
    sensoryData,
    setSensoryData,
    routineData,
    setRoutineData,
    behavioralData,
    setBehavioralData,
    warningActive,
    setWarningActive,
    warningEventId,
    setWarningEventId,
    showStrategies,
    handleShowStrategies,
    handleHideStrategies
  };
}
