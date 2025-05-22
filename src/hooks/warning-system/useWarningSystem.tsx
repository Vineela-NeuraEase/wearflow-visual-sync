
import { useState, useEffect } from 'react';
import { useBiometricData } from '../useBiometricData';
import { useWarningAnalysis } from './useWarningAnalysis';
import { useChartData } from './useChartData';
import { useRegulationFactors } from './useRegulationFactors';
import { useStrategies } from './useStrategies';
import { useRegulationScore } from './useRegulationScore';
import { useDataHandlers } from './useDataHandlers';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export function useWarningSystem() {
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
  
  // Access data handlers and collection methods
  const { 
    handleDeviceConnected, 
    handleDataReceived, 
    handleSaveThresholds, 
    handleSaveEnvironment,
    handleSaveSleepData,
    handleSaveSensoryData,
    handleSaveRoutineData,
    handleSaveBehavioralData
  } = useDataHandlers(
    connectDevice,
    addDataPoint,
    setSleepData,
    setSensoryData,
    setRoutineData,
    setBehavioralData
  );
  
  // Calculate regulation factors
  const regulationFactors = useRegulationFactors({
    biometricData: dataPoints,
    sleepData,
    sensoryData,
    routineData,
    behavioralData
  });
  
  // Calculate overall regulation score
  const regulationScore = useRegulationScore({
    biometricData: dataPoints,
    sleepData,
    sensoryData,
    routineData,
    behavioralData
  });
  
  // Warning state
  const [warningActive, setWarningActive] = useState(false);
  const [warningEventId, setWarningEventId] = useState(null);
  const { latestPatterns, warningLevel } = useWarningAnalysis({ biometricData: dataPoints, sensorData: null });
  
  // Check for warning condition and log warning events
  useEffect(() => {
    const handleWarningStateChange = async () => {
      if (regulationScore < 70 && !warningActive) {
        setWarningActive(true);
        
        // Only log warning events if the user is signed in
        if (user) {
          try {
            // Create a sensor data snapshot
            const sensorSnapshot = {
              biometric: dataPoints.slice(0, 5),
              sensory: sensoryData,
              sleep: sleepData,
              routine: routineData,
              behavioral: behavioralData
            };
            
            // Use the meltdown_events table instead of warning_events
            const { data, error } = await supabase
              .from('meltdown_events')
              .insert({
                user_id: user.id,
                intensity: 100 - regulationScore, // Convert regulation score to intensity
                duration: 0, // Set initial duration to 0
                notes: latestPatterns.join(', '),
                triggers: ["early warning detected"], // Add this as a trigger
              })
              .select()
              .single();
              
            if (error) {
              console.error("Error logging warning event:", error);
            } else if (data) {
              setWarningEventId(data.id);
              console.log("Warning event logged with ID:", data.id);
            }
          } catch (err) {
            console.error("Failed to log warning event:", err);
          }
        }
      } else if (regulationScore >= 70 && warningActive) {
        setWarningActive(false);
        
        // Update warning event with resolved timestamp if it exists
        if (user && warningEventId) {
          try {
            // Update the meltdown_events entry with a duration to indicate it's resolved
            const { error } = await supabase
              .from('meltdown_events')
              .update({
                duration: 15, // Set a nominal duration in minutes
                notes: (latestPatterns.join(', ') + " - Automatically resolved")
              })
              .eq('id', warningEventId);
              
            if (error) {
              console.error("Error resolving warning event:", error);
            } else {
              console.log("Warning event resolved:", warningEventId);
              setWarningEventId(null);
            }
          } catch (err) {
            console.error("Failed to resolve warning event:", err);
          }
        }
      }
    };
    
    handleWarningStateChange();
  }, [regulationScore, warningActive, user, dataPoints, sensoryData, sleepData, routineData, behavioralData, warningLevel, latestPatterns, warningEventId]);
  
  // Get strategies from the useStrategies hook
  const {
    showStrategies,
    strategies,
    handleShowStrategies,
    handleHideStrategies,
    saveStrategy,
    deleteStrategy,
    updateEffectiveness
  } = useStrategies();
  
  // Mark strategy as effective when user resolves warning
  const resolveWarningWithStrategy = async (strategyId) => {
    if (!user || !warningEventId) return;
    
    try {
      // Update the meltdown_events entry to include the strategy used
      const { error } = await supabase
        .from('meltdown_events')
        .update({
          duration: 15, // Set a nominal duration in minutes
          coping_strategies: [strategyId], // Store as an array of strategy IDs
          notes: "Resolved with strategy"
        })
        .eq('id', warningEventId);
        
      if (error) {
        console.error("Error updating warning event with strategy:", error);
        toast({
          title: "Error",
          description: "Failed to record resolution strategy",
          variant: "destructive"
        });
      } else {
        // Increase effectiveness rating for the strategy
        const strategy = strategies.find(s => s.id === strategyId);
        if (strategy && strategy.effectiveness < 5) {
          updateEffectiveness(strategyId, strategy.effectiveness + 1);
        }
        
        setWarningEventId(null);
        setWarningActive(false);
        
        toast({
          title: "Warning resolved",
          description: "Your selected strategy has been recorded",
        });
      }
    } catch (err) {
      console.error("Failed to resolve warning with strategy:", err);
    }
  };
  
  // Chart data generator
  const { getChartData } = useChartData(dataPoints);

  return {
    isConnected,
    deviceInfo,
    dataPoints,
    isOnline,
    offlineData,
    regulationFactors,
    regulationScore,
    warningActive,
    warningLevel,
    showStrategies,
    strategies,
    latestPatterns,
    getChartData,
    handleDeviceConnected,
    handleDataReceived,
    handleSaveThresholds,
    handleSaveEnvironment,
    handleShowStrategies,
    handleHideStrategies,
    saveStrategy,
    deleteStrategy,
    updateEffectiveness,
    resolveWarningWithStrategy
  };
}
