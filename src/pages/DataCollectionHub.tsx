
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Activity, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SleepData, SensoryData, RoutineData, BehavioralData } from "@/types/biometric";
import { SleepTracker } from "@/components/tracking/SleepTracker";
import { SensoryTracker } from "@/components/tracking/SensoryTracker";
import { RoutineTracker } from "@/components/tracking/RoutineTracker";
import { BehavioralTracker } from "@/components/tracking/BehavioralTracker";
import { BluetoothDeviceManager } from "@/components/BluetoothDeviceManager";

const DataCollectionHub = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("biometric");
  
  // Handlers for saving different types of data
  const handleSaveSleepData = (data: SleepData) => {
    console.log("Saving sleep data:", data);
    // In a real implementation, this would sync with the database
    toast({
      title: "Sleep data saved",
      description: "Your sleep information has been recorded"
    });
  };
  
  const handleSaveSensoryData = (data: SensoryData) => {
    console.log("Saving sensory data:", data);
    // In a real implementation, this would sync with the database
    toast({
      title: "Sensory data saved",
      description: "Your sensory environment has been recorded"
    });
  };
  
  const handleSaveRoutineData = (data: RoutineData) => {
    console.log("Saving routine data:", data);
    // In a real implementation, this would sync with the database
    toast({
      title: "Routine data saved",
      description: "Your schedule change has been recorded"
    });
  };
  
  const handleSaveBehavioralData = (data: BehavioralData) => {
    console.log("Saving behavioral data:", data);
    // In a real implementation, this would sync with the database
    toast({
      title: "Behavioral data saved",
      description: "Your current state has been recorded"
    });
  };

  const handleDeviceConnected = (device: any) => {
    console.log("Device connected:", device);
    toast({
      title: "Device Connected",
      description: `Connected to ${device.name || "your device"}`
    });
  };

  const handleDataReceived = (data: any) => {
    console.log("Data received:", data);
    // In a real implementation, this would process and store the data
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="bg-blue-50 p-4 rounded-lg">
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
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
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
            <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg mb-4">
              <Activity className="h-16 w-16 text-blue-400 opacity-70" />
            </div>
            <p className="text-center text-sm text-muted-foreground mb-6">
              Connect a wearable device above to automatically track biometric data
            </p>
            <RoutineTracker onSave={handleSaveRoutineData} />
          </TabsContent>
          
          <TabsContent value="sleep" className="mt-0">
            <SleepTracker onSave={handleSaveSleepData} />
          </TabsContent>
          
          <TabsContent value="sensory" className="mt-0">
            <SensoryTracker onSave={handleSaveSensoryData} />
          </TabsContent>
          
          <TabsContent value="behavioral" className="mt-0">
            <BehavioralTracker onSave={handleSaveBehavioralData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DataCollectionHub;
