import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

// In a real app, we would use a proper BLE library like react-native-ble-plx for mobile
// This is a simulated version that mimics the behavior
interface BiometricData {
  heartRate: number;
  hrv: number;
  stressLevel: number;
  timestamp: string;
}

interface BluetoothDeviceManagerProps {
  onDeviceConnected?: (device: any) => void;
  onDataReceived?: (data: BiometricData) => void;
}

export const BluetoothDeviceManager = ({ 
  onDeviceConnected, 
  onDataReceived 
}: BluetoothDeviceManagerProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [deviceName, setDeviceName] = useState<string | null>(null);
  const [offlineData, setOfflineData] = useState<BiometricData[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineData();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      console.log("Device went offline. Data will be stored locally.");
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Function to sync offline data when coming back online
  const syncOfflineData = async () => {
    if (offlineData.length === 0) return;
    
    console.log(`Syncing ${offlineData.length} offline data points`);
    
    try {
      // In a real app, this would send the data to your backend/Supabase
      // For now, we'll just process it locally
      offlineData.forEach(data => {
        if (onDataReceived) {
          onDataReceived(data);
        }
      });
      
      // Clear offline data after successful sync
      setOfflineData([]);
      
      toast({
        title: "Data Synchronized",
        description: `${offlineData.length} measurements synced successfully`,
      });
    } catch (error) {
      console.error("Failed to sync offline data:", error);
      toast({
        variant: "destructive",
        title: "Sync Failed",
        description: "Could not sync offline data. Will retry later.",
      });
    }
  };
  
  const connectToDevice = async () => {
    setIsConnecting(true);
    
    try {
      // In a real mobile app using react-native-ble-plx, we would:
      // 1. Request permissions
      // 2. Scan for devices
      // 3. Connect to selected device
      // 4. Discover services and characteristics
      // 5. Subscribe to notifications
      
      // Simulating connection delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulating successful connection
      setIsConnected(true);
      setDeviceName("Wellness Tracker");
      
      toast({
        title: "Device Connected",
        description: "Successfully connected to Wellness Tracker",
      });
      
      if (onDeviceConnected) {
        // In a real app, this would be the actual device object
        onDeviceConnected({ name: "Wellness Tracker", id: "12345" });
      }
      
      // Start collecting data
      startDataCollection();
      
    } catch (error) {
      console.error("Bluetooth connection failed:", error);
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Could not connect to a device. Please try again.",
      });
    } finally {
      setIsConnecting(false);
    }
  };
  
  const disconnectDevice = () => {
    setIsConnected(false);
    setDeviceName(null);
    stopDataCollection();
    
    toast({
      title: "Device Disconnected",
      description: "Device has been disconnected",
    });
  };
  
  const startDataCollection = () => {
    // In a real app with react-native-ble-plx, we would subscribe to notifications here
    
    // For simulation, we'll use an interval to generate data
    const intervalId = setInterval(() => {
      // Generate simulated biometric data
      const newData: BiometricData = {
        heartRate: 65 + Math.floor(Math.random() * 20),
        hrv: 45 + Math.floor(Math.random() * 15),
        stressLevel: Math.floor(Math.random() * 100),
        timestamp: new Date().toISOString(),
      };
      
      // Store data locally regardless of online status
      storeDataLocally(newData);
      
      // If online, send data immediately
      if (isOnline && onDataReceived) {
        onDataReceived(newData);
      }
    }, 5000); // Every 5 seconds
    
    // Store the interval ID to clear it later
    window.bluetoothInterval = intervalId;
  };
  
  const storeDataLocally = (data: BiometricData) => {
    // In a real app, we would use IndexedDB or AsyncStorage
    // For this demo, we'll just keep it in component state
    setOfflineData(prev => [...prev, data]);
    
    // In a production app, we'd persist this to device storage:
    // localStorage.setItem('offlineData', JSON.stringify([...offlineData, data]));
    
    console.log("Data stored locally", data);
  };
  
  const stopDataCollection = () => {
    if (window.bluetoothInterval) {
      clearInterval(window.bluetoothInterval);
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => stopDataCollection();
  }, []);
  
  return (
    <div className="mb-6">
      {isConnected ? (
        <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-900/30">
          <div className="flex items-center">
            <div className="h-3 w-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <div>
              <span className="font-medium">Connected to {deviceName}</span>
              {!isOnline && (
                <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                  Offline mode - Data stored locally ({offlineData.length})
                </div>
              )}
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={disconnectDevice}
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Button
          className="w-full"
          onClick={connectToDevice}
          disabled={isConnecting}
        >
          {isConnecting ? "Connecting..." : "Connect Wearable Device"}
        </Button>
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
