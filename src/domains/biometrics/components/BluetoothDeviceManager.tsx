
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useBluetoothDevices } from '../hooks/useBluetoothDevices';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { ConnectedDevice } from './ConnectedDevice';
import { ConnectDeviceButton } from './ConnectDeviceButton';
import { DeviceList } from './DeviceList';
import { BiometricData } from '../types';

interface BluetoothDeviceManagerProps {
  onDeviceConnected?: (device: any) => void;
  onDataReceived?: (data: BiometricData) => void;
}

export const BluetoothDeviceManager = ({ 
  onDeviceConnected, 
  onDataReceived 
}: BluetoothDeviceManagerProps) => {
  const { isOnline, syncOfflineData } = useOnlineStatus();
  
  const { 
    isScanning,
    devices,
    connectedDevice,
    isConnected,
    biometricData,
    startScan,
    connectToDevice,
    disconnectDevice 
  } = useBluetoothDevices();
  
  // Pass collected data to parent component
  useEffect(() => {
    if (biometricData.length > 0 && onDataReceived) {
      onDataReceived(biometricData[0]);
    }
  }, [biometricData, onDataReceived]);
  
  // Notify parent when device is connected
  useEffect(() => {
    if (isConnected && connectedDevice && onDeviceConnected) {
      onDeviceConnected({
        name: connectedDevice.name || 'Unknown Device',
        id: connectedDevice.id,
        device: connectedDevice
      });
    }
  }, [isConnected, connectedDevice, onDeviceConnected]);
  
  // When coming back online, sync any stored offline data
  useEffect(() => {
    if (isOnline && biometricData.length > 0) {
      syncOfflineData(biometricData, onDataReceived);
    }
  }, [isOnline, biometricData, syncOfflineData, onDataReceived]);
  
  return (
    <View style={styles.container}>
      {isConnected ? (
        <ConnectedDevice
          deviceName={connectedDevice?.name || "Unknown Device"}
          isOnline={isOnline}
          offlineDataCount={biometricData.length}
          onDisconnect={disconnectDevice}
        />
      ) : (
        <View>
          <ConnectDeviceButton
            isConnecting={isScanning}
            onConnect={startScan}
          />
          
          {isScanning && devices.length > 0 && (
            <DeviceList
              devices={devices}
              onSelectDevice={connectToDevice}
              isConnecting={isScanning}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  }
});
