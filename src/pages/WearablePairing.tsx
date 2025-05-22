
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Info, Plus, Bluetooth, Check, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

const WearablePairing = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<{name: string, id: string, signal: number}[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [bluetoothAvailable, setBluetoothAvailable] = useState(true);
  
  // Check if Bluetooth is available
  useEffect(() => {
    // For a real mobile app, we would check if the BLE API is available
    // For this demo, we'll just assume it is, but in a real app using
    // react-native-ble-plx, we would check for BLE availability
    checkBluetoothAvailability();
  }, []);
  
  const checkBluetoothAvailability = () => {
    // In a real mobile app with react-native-ble-plx:
    // const manager = new BleManager();
    // manager.state().then(state => {
    //   setBluetoothAvailable(state === 'PoweredOn');
    // });
    
    // For this demo:
    // Use feature detection to check for Web Bluetooth API
    if (typeof navigator !== 'undefined' && 'bluetooth' in navigator) {
      setBluetoothAvailable(true);
    } else {
      // This will happen in browsers that don't support Web Bluetooth API
      console.log("Web Bluetooth API not available");
      setBluetoothAvailable(false);
    }
  };
  
  const startScan = () => {
    if (!bluetoothAvailable) {
      toast({
        variant: "destructive",
        title: "Bluetooth Not Available",
        description: "Please make sure Bluetooth is enabled on your device.",
      });
      return;
    }
    
    setIsScanning(true);
    setDevices([]); // Clear previous results
    
    // In a real app with react-native-ble-plx, we would:
    // 1. Request permissions
    // 2. Start scanning for devices with specific services
    // 3. Add discovered devices to our list
    
    // For this demo, we'll simulate finding devices after a delay
    setTimeout(() => {
      const mockDevices = [
        { name: "Fitbit Sense", id: "12:34:56:78:90:AB", signal: 80 },
        { name: "Apple Watch", id: "AB:CD:EF:12:34:56", signal: 65 },
        { name: "Polar H10", id: "FE:DC:BA:98:76:54", signal: 90 },
        { name: "Samsung Galaxy Watch", id: "AA:BB:CC:DD:EE:FF", signal: 75 }
      ];
      
      setDevices(mockDevices);
      setIsScanning(false);
      
      toast({
        title: "Scan Complete",
        description: `Found ${mockDevices.length} devices nearby`,
      });
    }, 2000);
  };
  
  const connectDevice = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setIsConnecting(true);
    
    // In a real app with react-native-ble-plx, we would:
    // 1. Connect to the device
    // 2. Discover services and characteristics
    // 3. Set up notifications for the required characteristics
    
    // For this demo, we'll simulate connection after a delay
    setTimeout(() => {
      setIsConnecting(false);
      
      // Store the device information in local storage
      const device = devices.find(d => d.id === deviceId);
      if (device) {
        localStorage.setItem('pairedDevice', JSON.stringify(device));
        
        toast({
          title: "Device Paired",
          description: `Successfully paired with ${device.name}`,
        });
      }
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col p-6">
      <div className="flex justify-between space-x-4 mb-6">
        <div className="h-2 bg-blue-500 rounded-full w-1/4"></div>
        <div className="h-2 bg-blue-500 rounded-full w-1/4"></div>
        <div className="h-2 bg-blue-500 rounded-full w-1/4"></div>
        <div className="h-2 bg-blue-500 rounded-full w-1/4"></div>
      </div>
      
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-center">Connect a Wearable</h1>
        
        <p className="text-center text-gray-600 mb-8 max-w-md">
          Connect a wearable device to track heart rate and other metrics 
          for better insights and early warning detection.
        </p>
        
        <div className="mb-8 w-full max-w-xs">
          <div className="w-32 h-32 mx-auto bg-blue-200 rounded-full flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center">
              <Bluetooth className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          
          {!bluetoothAvailable ? (
            <Card className="w-full p-6 bg-amber-50 border-amber-200">
              <div className="flex items-start">
                <AlertCircle className="text-amber-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">Bluetooth Not Available</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    This device doesn't support Bluetooth Low Energy or permissions are not granted.
                  </p>
                </div>
              </div>
              <Button 
                className="w-full mt-4"
                onClick={() => navigate("/welcome/add-ons")}
              >
                Continue Without Wearable
              </Button>
            </Card>
          ) : (
            <Card className="w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Available Devices</h2>
                <Button 
                  size="sm" 
                  onClick={startScan} 
                  disabled={isScanning}
                >
                  {isScanning ? "Scanning..." : "Scan"}
                </Button>
              </div>
              
              {devices.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {isScanning ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                      <p>Scanning for devices...</p>
                    </div>
                  ) : (
                    <p>No devices found. Tap "Scan" to search for nearby wearables.</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {devices.map((device) => (
                    <div 
                      key={device.id}
                      className={`flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${
                        selectedDevice === device.id ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                      }`}
                      onClick={() => !isConnecting && connectDevice(device.id)}
                    >
                      <div className="flex items-center">
                        {selectedDevice === device.id ? (
                          isConnecting ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-3"></div>
                          ) : (
                            <Check className="h-5 w-5 mr-3 text-green-500" />
                          )
                        ) : (
                          <Plus className="h-5 w-5 mr-3 text-blue-500" />
                        )}
                        <div>
                          <h3 className="font-medium">{device.name}</h3>
                          <p className="text-sm text-gray-500">
                            {selectedDevice === device.id 
                              ? (isConnecting ? 'Connecting...' : 'Connected') 
                              : 'Tap to connect'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-2 text-xs text-gray-500">Signal: {device.signal}%</div>
                        <div className={`w-3 h-3 rounded-full ${device.signal > 70 ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}
        </div>
        
        <div className="flex items-start bg-blue-100 p-4 rounded-lg mb-8 max-w-md">
          <Info className="text-blue-500 mr-3 flex-shrink-0 mt-1" />
          <p className="text-sm">
            You can skip this step and connect a device later in settings. Continuous data collection helps provide better early warnings.
          </p>
        </div>
      </div>
      
      <div className="mt-auto flex justify-end">
        <Button 
          onClick={() => navigate("/welcome/add-ons")} 
          className="bg-blue-500 hover:bg-blue-600"
          size="lg"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default WearablePairing;
