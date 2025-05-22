
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell, Settings2, History, WifiOff } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Import components
import { CustomThresholdEditor } from "@/components/warning-system/CustomThresholdEditor";
import { RegulationStatus } from "@/components/warning-system/RegulationStatus";
import { EnvironmentalTracker } from "@/components/warning-system/EnvironmentalTracker";
import { SignalAnalysisChart } from "@/components/warning-system/SignalAnalysisChart";
import { PatternDetectionInsights } from "@/components/warning-system/PatternDetectionInsights";
import { PersonalizedStrategies } from "@/components/warning-system/PersonalizedStrategies";
import { BluetoothDeviceManager } from "@/components/BluetoothDeviceManager";
import { useBiometricData } from "@/hooks/useBiometricData";

// Define the RegulationFactor type
export type RegulationFactorImpact = "high" | "medium" | "low";
export type RegulationFactorTrend = "increasing" | "decreasing" | "stable";

export interface RegulationFactor {
  name: string;
  value: number;
  impact: RegulationFactorImpact;
  trend: RegulationFactorTrend;
}

// Mock data for demonstration (will be replaced by real-time data)
const mockChartData = [
  { time: '8 AM', heartRate: 65, hrv: 55, regulationScore: 90, environmentalStress: 20 },
  { time: '10 AM', heartRate: 68, hrv: 52, regulationScore: 88, environmentalStress: 25 },
  { time: '12 PM', heartRate: 75, hrv: 48, regulationScore: 82, environmentalStress: 30 },
  { time: '2 PM', heartRate: 82, hrv: 42, regulationScore: 75, environmentalStress: 40 },
  { time: '4 PM', heartRate: 78, hrv: 44, regulationScore: 70, environmentalStress: 45 },
  { time: '6 PM', heartRate: 72, hrv: 46, regulationScore: 78, environmentalStress: 35 },
];

const WarningSystem = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("analysis");
  const [showStrategies, setShowStrategies] = useState(false);
  
  // Use our biometric data hook
  const { 
    isConnected, 
    dataPoints, 
    isOnline,
    offlineData,
    connectDevice,
    addDataPoint
  } = useBiometricData({ maxDataPoints: 50 });
  
  // State for current status
  const [regulationFactors, setRegulationFactors] = useState<RegulationFactor[]>([
    { name: "Heart Rate", value: 78, impact: "medium", trend: "increasing" },
    { name: "HRV", value: 42, impact: "high", trend: "decreasing" },
    { name: "Sleep Quality", value: 65, impact: "medium", trend: "stable" },
    { name: "Environmental", value: 40, impact: "low", trend: "stable" }
  ]);
  
  const [regulationScore, setRegulationScore] = useState(72);
  const [warningActive, setWarningActive] = useState(true);
  
  // Update regulation factors and score based on real-time data
  useEffect(() => {
    if (dataPoints.length === 0) return;
    
    // Get the most recent data point
    const latestData = dataPoints[0];
    
    // Update regulation factors with real values
    const updatedFactors = [...regulationFactors];
    
    // Update Heart Rate
    if (latestData.heartRate) {
      const hrTrend = dataPoints.length > 1 && latestData.heartRate > dataPoints[1].heartRate 
        ? "increasing" 
        : dataPoints.length > 1 && latestData.heartRate < dataPoints[1].heartRate
          ? "decreasing"
          : "stable";
          
      updatedFactors[0] = {
        name: "Heart Rate",
        value: latestData.heartRate,
        impact: latestData.heartRate > 85 ? "high" : latestData.heartRate > 75 ? "medium" : "low",
        trend: hrTrend as RegulationFactorTrend
      };
    }
    
    // Update HRV
    if (latestData.hrv) {
      const hrvTrend = dataPoints.length > 1 && latestData.hrv < dataPoints[1].hrv 
        ? "decreasing" 
        : dataPoints.length > 1 && latestData.hrv > dataPoints[1].hrv
          ? "increasing"
          : "stable";
          
      updatedFactors[1] = {
        name: "HRV",
        value: latestData.hrv,
        impact: latestData.hrv < 45 ? "high" : latestData.hrv < 55 ? "medium" : "low",
        trend: hrvTrend as RegulationFactorTrend
      };
    }
    
    // Calculate a regulation score (inverse of stress level)
    const newScore = Math.max(0, 100 - latestData.stressLevel);
    
    setRegulationFactors(updatedFactors);
    setRegulationScore(newScore);
    
    // Set warning state based on regulation score
    setWarningActive(newScore < 80);
    
  }, [dataPoints]);
  
  // Convert dataPoints to SignalAnalysisChart format
  const getChartData = () => {
    if (dataPoints.length === 0) return mockChartData;
    
    return dataPoints.slice(0, 10).reverse().map(point => {
      const date = new Date(point.timestamp);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      
      return {
        time: `${hours}:${minutes}`,
        heartRate: point.heartRate,
        hrv: point.hrv,
        regulationScore: 100 - point.stressLevel,
        environmentalStress: point.stressLevel
      };
    });
  };
  
  // Handlers
  const handleDeviceConnected = (device: any) => {
    connectDevice(device);
  };
  
  const handleDataReceived = (data: any) => {
    addDataPoint(data);
  };
  
  const handleSaveThresholds = (settings: any) => {
    console.log("Saving threshold settings:", settings);
    // In a real app, this would save to a database or local storage
  };
  
  const handleSaveEnvironment = (factors: any) => {
    console.log("Environment tracked:", factors);
    // This would update the regulation score based on environmental factors
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="rounded-xl bg-blue-100 p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Early Warning System</h1>
          
          <div className="ml-auto flex gap-2">
            {!isOnline && (
              <div className="flex items-center text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs">
                <WifiOff className="h-3 w-3 mr-1" />
                Offline
              </div>
            )}
            <Button variant="ghost" size="icon">
              <History className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <p className="text-sm px-4 text-muted-foreground">
          Monitor your regulation indicators and get personalized early warnings before meltdowns.
        </p>
      </div>
      
      <div className="px-4 space-y-6">
        <BluetoothDeviceManager 
          onDeviceConnected={handleDeviceConnected}
          onDataReceived={handleDataReceived}
        />
        
        {!isConnected && dataPoints.length === 0 && (
          <Alert className="bg-amber-50 border-amber-200 text-amber-800">
            <AlertDescription>
              Connect a wearable device to enable real-time monitoring and early warnings. The system will use historical and simulated data until a device is connected.
            </AlertDescription>
          </Alert>
        )}
        
        <RegulationStatus 
          score={regulationScore}
          factors={regulationFactors}
          timeLeft={regulationScore < 70 ? "45 minutes" : null}
          isWarningActive={warningActive}
        />
        
        {showStrategies ? (
          <div className="mb-6">
            <PersonalizedStrategies 
              onClose={() => setShowStrategies(false)} 
              warningLevel="watch"
            />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="analysis" className="text-sm">Analysis</TabsTrigger>
              <TabsTrigger value="patterns" className="text-sm">Patterns</TabsTrigger>
              <TabsTrigger value="environment" className="text-sm">Environment</TabsTrigger>
              <TabsTrigger value="settings" className="text-sm">Thresholds</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analysis" className="space-y-6">
              <SignalAnalysisChart 
                data={getChartData()} 
                title="Today's Signals"
              />
              
              {warningActive && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h3 className="font-medium text-amber-800 flex items-center">
                    <Bell className="h-4 w-4 mr-2" />
                    Potential Early Warning
                  </h3>
                  <p className="text-sm text-amber-700 mt-1">
                    Your heart rate is increasing while HRV is decreasing. This pattern has 
                    preceded regulation challenges in the past.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setShowStrategies(true)}
                    >
                      Suggest Strategies
                    </Button>
                    <Button size="sm" variant="outline">Dismiss</Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="patterns" className="space-y-6">
              <PatternDetectionInsights realtimeData={dataPoints} />
            </TabsContent>
            
            <TabsContent value="environment" className="space-y-6">
              <EnvironmentalTracker onSave={handleSaveEnvironment} />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <CustomThresholdEditor onSave={handleSaveThresholds} />
            </TabsContent>
          </Tabs>
        )}
        
        {offlineData && offlineData.length > 0 && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between">
            <p className="text-sm text-amber-800">
              {offlineData.length} measurements stored locally while offline.
            </p>
            <Button 
              size="sm" 
              variant="outline" 
              className="bg-white"
              disabled={!isOnline}
            >
              {isOnline ? "Sync Now" : "Waiting for connection..."}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WarningSystem;
