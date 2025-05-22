
import { useEffect } from 'react';
import { useBluetoothConnection } from '@/hooks/useBluetoothConnection';
import { useDataCollection } from '@/hooks/useDataCollection';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { ConnectedDevice } from '@/components/bluetooth/ConnectedDevice';
import { ConnectDeviceButton } from '@/components/bluetooth/ConnectDeviceButton';
import { BiometricData } from '@/types/biometric';

interface BluetoothDeviceManagerProps {
  onDeviceConnected?: (device: any) => void;
  onDataReceived?: (data: BiometricData) => void;
}

export const BluetoothDeviceManager = ({ 
  onDeviceConnected, 
  onDataReceived 
}: BluetoothDeviceManagerProps) => {
  const { isOnline } = useOnlineStatus();
  
  const { 
    isConnected, 
    isConnecting, 
    deviceName, 
    connectToDevice, 
    disconnectDevice 
  } = useBluetoothConnection({ 
    onDeviceConnected 
  });
  
  const { collectData } = useDataCollection({ 
    isConnected, 
    isOnline, 
    onDataReceived 
  });
  
  // When coming back online, sync any stored offline data
  useEffect(() => {
    if (isOnline && collectData) {
      collectData();
    }
  }, [isOnline, collectData]);
  
  return (
    <div className="mb-6">
      {isConnected ? (
        <ConnectedDevice
          deviceName={deviceName || "Unknown Device"}
          isOnline={isOnline}
          offlineDataCount={0}
          onDisconnect={disconnectDevice}
        />
      ) : (
        <ConnectDeviceButton
          isConnecting={isConnecting}
          onConnect={connectToDevice}
        />
      )}
    </div>
  );
};

// Add this line to make TypeScript happy about the window.bluetoothInterval
declare global {
  interface Window {
    bluetoothInterval: NodeJS.Timeout | undefined;
  }
}
