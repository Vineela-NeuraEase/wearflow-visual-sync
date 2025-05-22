
import { useEffect } from 'react';
import { useBiometricData } from './useBiometricData';
import { useWarningAnalysis } from './warning-system/useWarningAnalysis';
import { useChartData } from './warning-system/useChartData';
import { useRegulationFactors } from './warning-system/useRegulationFactors';
import { useStrategies } from './warning-system/useStrategies';
import { useRegulationScore } from './warning-system/useRegulationScore';
import { useDataHandlers } from './warning-system/useDataHandlers';
import { useWarningState } from './warning-system/useWarningState';
import { useWarningEvents } from './warning-system/useWarningEvents';

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
  
  // Track most recent data state
  const {
    sleepData,
    setSleepData,
    sensoryData,
    setSensoryData,
    routineData,
    setRoutineData,
    behavioralData,
    setBehavioralData
  } = useWarningState();
  
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
  
  // Warning analysis
  const { latestPatterns, warningLevel } = useWarningAnalysis({ 
    biometricData: dataPoints, 
    sensorData: null 
  });
  
  // Warning event handling
  const { 
    warningActive,
    warningEventId,
    resolveWarningWithStrategy: resolveWarning
  } = useWarningEvents({
    regulationScore,
    dataPoints,
    sensoryData,
    sleepData,
    routineData,
    behavioralData,
    warningLevel,
    latestPatterns
  });
  
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
  
  // Wrap the resolveWarningWithStrategy to include strategy effectiveness update
  const resolveWarningWithStrategy = async (strategyId: string) => {
    // Pass the strategies array directly without type conversion
    const success = await resolveWarning(strategyId, strategies);
    
    if (success) {
      // Increase effectiveness rating for the strategy
      const strategy = strategies.find(s => s.id === strategyId);
      if (strategy && strategy.effectiveness < 5) {
        updateEffectiveness(strategyId, strategy.effectiveness + 1);
      }
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
