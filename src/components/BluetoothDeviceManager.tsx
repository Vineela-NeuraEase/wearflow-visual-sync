
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

// This is a placeholder component that would handle Bluetooth connectivity
// In a real implementation, you would use the Web Bluetooth API or a native plugin

interface BluetoothDeviceManagerProps {
  onDeviceConnected?: (device: any) => void;
  onDataReceived?: (data: any) => void;
}

export const BluetoothDeviceManager = ({ 
  onDeviceConnected, 
  onDataReceived 
}: BluetoothDeviceManagerProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [deviceName, setDeviceName] = useState<string | null>(null);
  
  const connectToDevice = async () => {
    setIsConnecting(true);
    
    try {
      // In a real app, this would use the Web Bluetooth API
      // navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] })
      
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
      
      // Simulate receiving data periodically
      startDataSimulation();
      
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
    stopDataSimulation();
    toast({
      title: "Device Disconnected",
      description: "Device has been disconnected",
    });
  };
  
  const startDataSimulation = () => {
    const intervalId = setInterval(() => {
      if (onDataReceived) {
        // Simulate heart rate and stress level data
        const mockData = {
          heartRate: 65 + Math.floor(Math.random() * 20),
          stressLevel: Math.floor(Math.random() * 100),
          timestamp: new Date().toISOString(),
        };
        
        onDataReceived(mockData);
      }
    }, 5000); // Every 5 seconds
    
    // Store the interval ID in a ref or state if you need to clear it later
    window.bluetoothInterval = intervalId;
  };
  
  const stopDataSimulation = () => {
    if (window.bluetoothInterval) {
      clearInterval(window.bluetoothInterval);
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => stopDataSimulation();
  }, []);
  
  return (
    <div className="mb-6">
      {isConnected ? (
        <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200">
          <div className="flex items-center">
            <div className="h-3 w-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="font-medium">Connected to {deviceName}</span>
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
