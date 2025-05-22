
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Activity, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BluetoothDeviceManager } from "@/components/BluetoothDeviceManager";
import { SleepTracker } from "@/components/tracking/SleepTracker";
import { SensoryTracker } from "@/components/tracking/SensoryTracker";
import { RoutineTracker } from "@/components/tracking/RoutineTracker";
import { BehavioralTracker } from "@/components/tracking/BehavioralTracker";
import { useDataCollection } from "@/hooks/data-collection";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  SleepData as BiometricSleepData,
  SensoryData as BiometricSensoryData, 
  RoutineData as BiometricRoutineData, 
  BehavioralData as BiometricBehavioralData 
} from "@/types/biometric";

const DataCollectionHub = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("biometric");
  const [isConnected, setIsConnected] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Initialize network status listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const { 
    isLoading,
    collectData,
    saveSleepData,
    saveSensoryData,
    saveRoutineData,
    saveBehavioralData,
    fetchSleepData,
    fetchSensoryData,
    fetchRoutineData,
    fetchBehavioralData
  } = useDataCollection({
    isConnected,
    isOnline,
    onDataReceived: (data) => {
      console.log("Biometric data received:", data);
      toast({
        title: "Data received",
        description: "New biometric data point recorded",
      });
    }
  });
  
  // Fetch initial data
  useEffect(() => {
    if (user) {
      fetchSleepData();
      fetchSensoryData();
      fetchRoutineData();
      fetchBehavioralData();
    }
  }, [user, fetchSleepData, fetchSensoryData, fetchRoutineData, fetchBehavioralData]);
  
  // Handlers for saving different types of data
  const handleSaveSleepData = async (data: Omit<BiometricSleepData, "user_id">) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save data",
        variant: "destructive"
      });
      return;
    }
    await saveSleepData(data);
  };
  
  const handleSaveSensoryData = async (data: Omit<BiometricSensoryData, "user_id">) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save data",
        variant: "destructive"
      });
      return;
    }
    await saveSensoryData(data);
  };
  
  const handleSaveRoutineData = async (data: Omit<BiometricRoutineData, "user_id">) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save data",
        variant: "destructive"
      });
      return;
    }
    await saveRoutineData(data);
  };
  
  const handleSaveBehavioralData = async (data: Omit<BiometricBehavioralData, "user_id">) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save data",
        variant: "destructive"
      });
      return;
    }
    await saveBehavioralData(data);
  };

  const handleDeviceConnected = (device: any) => {
    setIsConnected(true);
    setDeviceInfo(device);
    toast({
      title: "Device connected",
      description: `Connected to ${device.name || 'biometric device'}`,
    });
  };

  const handleDataReceived = (data: any) => {
    collectData(data);
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Data Collection</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Track various metrics to help identify patterns that may lead to meltdowns
        </p>
      </div>

      <div className="px-4 space-y-6">
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="flex items-center gap-3">
            <Database className="h-5 w-5 text-blue-500" />
            <div>
              <h3 className="font-medium">Enhanced Data Collection</h3>
              <p className="text-sm text-muted-foreground">
                The more consistently you track these metrics, the better the warning system will work
              </p>
            </div>
          </div>
        </Card>

        <BluetoothDeviceManager 
          onDeviceConnected={handleDeviceConnected}
          onDataReceived={handleDataReceived}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="biometric">Biometric</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="sensory">Sensory</TabsTrigger>
            <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
          </TabsList>
          
          <TabsContent value="biometric" className="mt-0">
            <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg mb-4">
              <Activity className="h-16 w-16 text-blue-400 opacity-70" />
            </div>
            <p className="text-center text-sm text-muted-foreground mb-6">
              {isConnected ? 
                `Connected to ${deviceInfo?.name || 'device'} - collecting data automatically` :
                'Connect a wearable device above to automatically track biometric data'}
            </p>
            <RoutineTracker onSave={handleSaveRoutineData} isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="sleep" className="mt-0">
            <SleepTracker onSave={handleSaveSleepData} isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="sensory" className="mt-0">
            <SensoryTracker onSave={handleSaveSensoryData} isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="behavioral" className="mt-0">
            <BehavioralTracker onSave={handleSaveBehavioralData} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DataCollectionHub;
