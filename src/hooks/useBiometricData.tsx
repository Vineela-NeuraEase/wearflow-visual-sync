
import { useCallback, useEffect } from 'react';
import { useOfflineStorage } from './biometrics/useOfflineStorage';
import { useDeviceConnection } from './biometrics/useDeviceConnection';
import { useDataStream } from './biometrics/useDataStream';
import { UseBiometricDataProps, UseBiometricDataReturn, BiometricDataPoint } from './biometrics/types';

export function useBiometricData({ 
  maxDataPoints = 100 
}: UseBiometricDataProps = {}): UseBiometricDataReturn {
  // Combine our specialized hooks
  const { 
    isOnline, 
    offlineData, 
    addOfflineDataPoint, 
    syncOfflineData 
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
  const addDataPoint = useCallback((data: BiometricDataPoint) => {
    // Add to main data stream
    addStreamDataPoint(data);
    
    // If offline, also add to offline data for syncing later
    if (!isOnline) {
      addOfflineDataPoint(data);
    }
  }, [isOnline, addStreamDataPoint, addOfflineDataPoint]);
  
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
