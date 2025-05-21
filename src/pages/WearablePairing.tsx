
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Info, Plus } from "lucide-react";
import { useState } from "react";

const WearablePairing = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  
  const startScan = () => {
    setIsScanning(true);
    // In a real app, this would initiate Bluetooth scanning
    setTimeout(() => {
      setIsScanning(false);
    }, 2000);
  };
  
  const connectDevice = (device: string) => {
    console.log(`Connecting to ${device}...`);
    // In a real app, this would initiate Bluetooth connection
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
          Optional: Connect a wearable device to track heart rate and other metrics 
          for better insights.
        </p>
        
        <div className="mb-8 w-full max-w-xs">
          <div className="w-32 h-32 mx-auto bg-blue-200 rounded-full flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="6" width="12" height="12" rx="2" stroke="#3B82F6" strokeWidth="2"/>
                <path d="M6 10H4C3.44772 10 3 10.4477 3 11V13C3 13.5523 3.44772 14 4 14H6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                <path d="M18 10H20C20.5523 10 21 10.4477 21 11V13C21 13.5523 20.5523 14 20 14H18" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                <path d="M10 6V4C10 3.44772 10.4477 3 11 3H13C13.5523 3 14 3.44772 14 4V6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                <path d="M10 18V20C10 20.5523 10.4477 21 11 21H13C13.5523 21 14 20.5523 14 20V18" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          
          <Card className="w-full p-6">
            <h2 className="text-xl font-bold mb-4">Available Devices</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <div className="flex items-center">
                  <Plus className="h-5 w-5 mr-3 text-blue-500" />
                  <div>
                    <h3 className="font-medium">Fitbit Sense</h3>
                    <p className="text-sm text-gray-500">Tap to connect</p>
                  </div>
                </div>
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <div className="flex items-center">
                  <Plus className="h-5 w-5 mr-3 text-blue-500" />
                  <div>
                    <h3 className="font-medium">Apple Watch</h3>
                    <p className="text-sm text-gray-500">Tap to connect</p>
                  </div>
                </div>
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="flex items-start bg-blue-100 p-4 rounded-lg mb-8 max-w-md">
          <Info className="text-blue-500 mr-3 flex-shrink-0 mt-1" />
          <p className="text-sm">
            You can skip this step and connect a device later in settings.
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
