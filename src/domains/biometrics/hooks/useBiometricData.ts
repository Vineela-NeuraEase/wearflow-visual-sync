
import { useCallback, useEffect } from 'react';
import { useOfflineStorage } from './useOfflineStorage';
import { useDeviceConnection } from './useDeviceConnection';
import { useDataStream } from './useDataStream';
import { UseBiometricDataProps, UseBiometricDataReturn, BiometricData } from '../types';

export function useBiometricData({ 
  maxDataPoints = 100 
}: UseBiometricDataProps = {}): UseBiometricDataReturn {
  // Combine our specialized hooks
  const { 
    isOnline, 
    offlineData, 
    addOfflineDataPoint, 
    syncOfflineData: originalSyncOfflineData 
  } = useOfflineStorage();
  
  const { 
    isConnected, 
    deviceInfo, 
    connectDevice, 
    disconnectDevice 
  } = useDeviceConnection();
  
  const { 
    dataPoints, 
    addDataPoint: addStreamDataPoint 
  } = useDataStream({ isConnected, maxDataPoints });
  
  // Wrapper for adding data that handles online/offline state
  const addDataPoint = useCallback((data: BiometricData) => {
    // Add to main data stream
    addStreamDataPoint(data);
    
    // If offline, also add to offline data for syncing later
    if (!isOnline) {
      addOfflineDataPoint(data);
    }
  }, [isOnline, addStreamDataPoint, addOfflineDataPoint]);
  
  // Create a wrapper for syncOfflineData that returns void
  const syncOfflineData = useCallback(async () => {
    if (offlineData.length > 0) {
      await originalSyncOfflineData();
    }
    // No return value (void)
  }, [offlineData.length, originalSyncOfflineData]);
  
  // Sync offline data when online status changes
  useEffect(() => {
    if (isOnline && offlineData.length > 0) {
      syncOfflineData();
    }
  }, [isOnline, offlineData.length, syncOfflineData]);
  
  return {
    isConnected,
    deviceInfo,
    dataPoints,
    offlineData,
    isOnline,
    connectDevice,
    disconnectDevice,
    addDataPoint,
    syncOfflineData
  };
}
