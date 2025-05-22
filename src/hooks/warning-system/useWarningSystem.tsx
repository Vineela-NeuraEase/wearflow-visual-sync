
import { useWarningCore } from './useWarningCore';
import { useWarningAnalysis } from './useWarningAnalysis';
import { useChartData } from './useChartData';
import { useRegulationFactors } from './useRegulationFactors';
import { useStrategies } from './strategy/useStrategies';
import { useRegulationScore } from './useRegulationScore';
import { useDataHandlers } from './useDataHandlers';
import { useWarningDetection } from './useWarningDetection';
import { useStrategyResolution } from './useStrategyResolution';

export function useWarningSystem() {
  // Get core state and functions
  const core = useWarningCore();
  
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
    core.connectDevice,
    core.addDataPoint,
    core.setSleepData,
    core.setSensoryData,
    core.setRoutineData,
    core.setBehavioralData
  );
  
  // Calculate regulation factors
  const regulationFactors = useRegulationFactors({
    biometricData: core.dataPoints,
    sleepData: core.sleepData,
    sensoryData: core.sensoryData,
    routineData: core.routineData,
    behavioralData: core.behavioralData
  });
  
  // Calculate overall regulation score
  const regulationScore = useRegulationScore({
    biometricData: core.dataPoints,
    sleepData: core.sleepData,
    sensoryData: core.sensoryData,
    routineData: core.routineData,
    behavioralData: core.behavioralData
  });
  
  // Analyze data for warning patterns
  const { latestPatterns, warningLevel } = useWarningAnalysis({
    biometricData: core.dataPoints,
    sensorData: null
  });
  
  // Handle warning detection and logging
  useWarningDetection({
    user: core.user,
    regulationScore,
    warningActive: core.warningActive,
    setWarningActive: core.setWarningActive,
    warningEventId: core.warningEventId,
    setWarningEventId: core.setWarningEventId,
    dataPoints: core.dataPoints,
    sensoryData: core.sensoryData,
    sleepData: core.sleepData,
    routineData: core.routineData,
    behavioralData: core.behavioralData,
    latestPatterns
  });
  
  // Get strategies from the useStrategies hook
  const {
    strategies,
    saveStrategy,
    deleteStrategy,
    updateEffectiveness
  } = useStrategies();
  
  // Strategy resolution handler
  const { resolveWarningWithStrategy } = useStrategyResolution({
    user: core.user,
    warningEventId: core.warningEventId,
    setWarningEventId: core.setWarningEventId,
    setWarningActive: core.setWarningActive,
    strategies,
    updateEffectiveness,
    toast: core.toast
  });
  
  // Chart data generator
  const { getChartData } = useChartData(core.dataPoints);

  return {
    isConnected: core.isConnected,
    deviceInfo: core.deviceInfo,
    dataPoints: core.dataPoints,
    isOnline: core.isOnline,
    offlineData: core.offlineData,
    regulationFactors,
    regulationScore,
    warningActive: core.warningActive,
    warningLevel,
    showStrategies: core.showStrategies,
    strategies,
    latestPatterns,
    getChartData,
    handleDeviceConnected,
    handleDataReceived,
    handleSaveThresholds,
    handleSaveEnvironment,
    handleShowStrategies: core.handleShowStrategies,
    handleHideStrategies: core.handleHideStrategies,
    saveStrategy,
    deleteStrategy,
    updateEffectiveness,
    resolveWarningWithStrategy
  };
}
