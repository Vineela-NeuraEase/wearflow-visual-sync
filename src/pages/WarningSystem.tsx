
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell, Settings2, History } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import components
import { CustomThresholdEditor } from "@/components/warning-system/CustomThresholdEditor";
import { RegulationStatus } from "@/components/warning-system/RegulationStatus";
import { EnvironmentalTracker } from "@/components/warning-system/EnvironmentalTracker";
import { SignalAnalysisChart } from "@/components/warning-system/SignalAnalysisChart";
import { PatternDetectionInsights } from "@/components/warning-system/PatternDetectionInsights";
import { PersonalizedStrategies } from "@/components/warning-system/PersonalizedStrategies";

// Mock data for demonstration
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
  
  // State for current status
  const [regulationFactors, setRegulationFactors] = useState([
    { name: "Heart Rate", value: 78, impact: "medium" as const, trend: "increasing" as const },
    { name: "HRV", value: 42, impact: "high" as const, trend: "decreasing" as const },
    { name: "Sleep Quality", value: 65, impact: "medium" as const, trend: "stable" as const },
    { name: "Environmental", value: 40, impact: "low" as const, trend: "stable" as const }
  ]);
  
  // Placeholder handlers
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
        <RegulationStatus 
          score={72}
          factors={regulationFactors}
          timeLeft="45 minutes"
          isWarningActive={true}
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
                data={mockChartData} 
                title="Today's Signals"
              />
              
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
            </TabsContent>
            
            <TabsContent value="patterns" className="space-y-6">
              <PatternDetectionInsights detectedPatterns={[]} />
            </TabsContent>
            
            <TabsContent value="environment" className="space-y-6">
              <EnvironmentalTracker onSave={handleSaveEnvironment} />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <CustomThresholdEditor onSave={handleSaveThresholds} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default WarningSystem;
