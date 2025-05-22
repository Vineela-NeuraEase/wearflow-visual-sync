
import { useState, useCallback, useEffect } from 'react';
import { useBiometricData } from './useBiometricData';
import { useDataCollection } from './useDataCollection';
import { useWarningAnalysis } from './warning-system/useWarningAnalysis';
import { useChartData } from './warning-system/useChartData';
import { useRegulationFactors } from './warning-system/useRegulationFactors';
import { useStrategies } from './warning-system/useStrategies';
import { useRegulationScore } from './warning-system/useRegulationScore';
import { useDataHandlers } from './warning-system/useDataHandlers';
import { RegulationFactor } from '@/pages/WarningSystem';
import { SleepData, SensoryData, RoutineData, BehavioralData } from '@/types/biometric';
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
  const [sleepData, setSleepData] = useState<SleepData | null>(null);
  const [sensoryData, setSensoryData] = useState<SensoryData | null>(null);
  const [routineData, setRoutineData] = useState<RoutineData | null>(null);
  const [behavioralData, setBehavioralData] = useState<BehavioralData | null>(null);
  
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
  const [warningEventId, setWarningEventId] = useState<string | null>(null);
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
            
            // Cast the supabase client to any to bypass type checking for this call
            const { data, error } = await (supabase as any)
              .from('warning_events')
              .insert({
                user_id: user.id,
                warning_level: warningLevel || 'watch',
                regulation_score: regulationScore,
                sensor_data_snapshot: sensorSnapshot,
                notes: latestPatterns.join(', ')
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
            // Cast the supabase client to any to bypass type checking for this call
            const { error } = await (supabase as any)
              .from('warning_events')
              .update({
                resolved_at: new Date().toISOString()
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
  const resolveWarningWithStrategy = async (strategyId: string) => {
    if (!user || !warningEventId) return;
    
    try {
      // Cast the supabase client to any to bypass type checking for this call
      const { error } = await (supabase as any)
        .from('warning_events')
        .update({
          resolved_at: new Date().toISOString(),
          resolution_strategy_id: strategyId
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
