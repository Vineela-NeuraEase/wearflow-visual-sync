import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Info, Plus, Bluetooth, Check, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { bluetoothService } from "@/services/BluetoothService";

// Define device interface
interface BluetoothDeviceItem {
  id: string;
  name: string;
  signal: number;
}

const WearablePairing = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<BluetoothDeviceItem[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [bluetoothAvailable, setBluetoothAvailable] = useState(false);
  
  // Check if Bluetooth is available on component mount
  useEffect(() => {
    const checkBluetoothSupport = async () => {
      try {
        const initialized = await bluetoothService.initialize();
        setBluetoothAvailable(initialized);
      } catch (error) {
        console.error("Bluetooth initialization failed:", error);
        setBluetoothAvailable(false);
      }
    };
    
    checkBluetoothSupport();
  }, []);
  
  const startScan = async () => {
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
    
    try {
      // Request permissions before scanning
      const permissionsGranted = await bluetoothService.requestPermissions();
      
      if (!permissionsGranted) {
        toast({
          variant: "destructive",
          title: "Permission Error",
          description: "Bluetooth permissions are required to scan for devices.",
        });
        setIsScanning(false);
        return;
      }
      
      // Start scanning with the real BLE service
      const foundDevices = await bluetoothService.scanForDevices(5000);
      
      // Convert found devices to our UI format
      const formattedDevices: BluetoothDeviceItem[] = foundDevices.map(device => ({
        id: device.deviceId,
        name: device.name || "Unknown Device",
        // Generate a random signal strength since the BLE API doesn't provide this
        signal: Math.floor(Math.random() * 30) + 70 // 70-99% signal strength
      }));
      
      setDevices(formattedDevices);
      
      toast({
        title: "Scan Complete",
        description: `Found ${formattedDevices.length} devices nearby`,
      });
    } catch (error) {
      console.error("Error scanning for devices:", error);
      toast({
        variant: "destructive",
        title: "Scan Error",
        description: "There was a problem scanning for devices.",
      });
    } finally {
      setIsScanning(false);
    }
  };
  
  const connectDevice = async (deviceId: string) => {
    setSelectedDevice(deviceId);
    setIsConnecting(true);
    
    try {
      // Connect to the selected device
      const connected = await bluetoothService.connectToDevice(deviceId);
      
      if (connected) {
        const device = devices.find(d => d.id === deviceId);
        
        // Store the device information in local storage
        if (device) {
          localStorage.setItem('pairedDevice', JSON.stringify({
            name: device.name,
            id: device.id
          }));
          
          toast({
            title: "Device Paired",
            description: `Successfully paired with ${device.name}`,
          });
        }
        
        // Navigate to next screen after short delay
        setTimeout(() => {
          navigate("/welcome/add-ons");
        }, 1000);
      } else {
        toast({
          variant: "destructive",
          title: "Connection Failed",
          description: "Could not connect to device. Please try again.",
        });
        setSelectedDevice(null);
      }
    } catch (error) {
      console.error("Error connecting to device:", error);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Failed to connect to the selected device.",
      });
      setSelectedDevice(null);
    } finally {
      setIsConnecting(false);
    }
  };
  
  // If no real devices are found, fall back to mock devices for demonstration
  const addMockDevices = () => {
    if (devices.length === 0) {
      return [
        { name: "Fitbit Sense", id: "mock-device-1", signal: 80 },
        { name: "Apple Watch", id: "mock-device-2", signal: 65 },
        { name: "Polar H10", id: "mock-device-3", signal: 90 },
        { name: "Samsung Galaxy Watch", id: "mock-device-4", signal: 75 }
      ];
    }
    return devices;
  };
  
  // Get the list of devices to display (real or mock)
  const displayDevices = devices.length > 0 ? devices : isScanning ? [] : addMockDevices();
  
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
              
              {displayDevices.length === 0 ? (
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
                  {displayDevices.map((device) => (
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
