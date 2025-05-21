
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import refactored components
import { CurrentEnvironment } from "@/components/environmental/CurrentEnvironment";
import { EnvironmentalRiskLevel } from "@/components/environmental/EnvironmentalRiskLevel";
import { TriggerForm } from "@/components/environmental/TriggerForm";
import { TriggerCard } from "@/components/environmental/TriggerCard";
import { TriggerCorrelation } from "@/components/environmental/TriggerCorrelation";
import { EnvironmentalRecommendations } from "@/components/environmental/EnvironmentalRecommendations";

// Mock data for environmental factors
const factors = [
  { name: "Noise Level", value: 65, unit: "dB", threshold: 70, icon: "🔊" },
  { name: "Brightness", value: 80, unit: "%", threshold: 85, icon: "💡" },
  { name: "Temperature", value: 72, unit: "°F", threshold: 78, icon: "🌡️" },
  { name: "Crowding", value: 45, unit: "%", threshold: 70, icon: "👥" },
  { name: "Sensory Input", value: 60, unit: "%", threshold: 75, icon: "👁️" },
];

const knownTriggers = [
  { 
    name: "Loud Unexpected Noises", 
    category: "Auditory",
    sensitivity: 90,
    notes: "Especially door slams, alarms, or dropping objects."
  },
  { 
    name: "Fluorescent Lighting", 
    category: "Visual",
    sensitivity: 75,
    notes: "Particularly in grocery stores or office buildings."
  },
  { 
    name: "Dense Crowds", 
    category: "Social/Physical",
    sensitivity: 80,
    notes: "Shopping malls, events, or public transport during rush hour."
  },
  { 
    name: "Clothing Tags", 
    category: "Tactile",
    sensitivity: 60,
    notes: "Tags on shirts or certain fabric textures."
  },
];

const correlations = [
  {
    level: "High",
    percentage: 85,
    factor: "Noise levels above 75dB",
    description: "have a strong correlation with reduced HRV and early signs of dysregulation."
  },
  {
    level: "Medium",
    percentage: 65,
    factor: "Crowded environments",
    description: "show a moderate correlation with increased heart rate, particularly when combined with bright lighting."
  },
  {
    level: "Medium",
    percentage: 60,
    factor: "Temperature above 78°F",
    description: "shows correlation with reduced comfort levels and increased self-reported sensory sensitivity."
  }
];

const recommendations = [
  {
    icon: "🔊",
    title: "Sound Management",
    description: "Based on your patterns, consider using noise-canceling headphones during commute times and in public spaces with unpredictable sounds."
  },
  {
    icon: "💡",
    title: "Lighting Adjustments",
    description: "Your data suggests benefits from reduced lighting in the evening and avoiding fluorescent lighting when possible."
  },
  {
    icon: "📆",
    title: "Scheduling Strategies",
    description: "Consider scheduling demanding activities earlier in the day when your regulation scores are typically higher."
  }
];

const EnvironmentalFactors = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [showAddForm, setShowAddForm] = useState(false);
  
  const handleSaveTrigger = (newTrigger: any) => {
    toast({
      title: "Trigger added",
      description: "Your new trigger has been saved"
    });
    
    setShowAddForm(false);
  };
  
  const logCurrentEnvironment = () => {
    toast({
      title: "Environment logged",
      description: "Current environmental factors have been recorded"
    });
  };
  
  return (
    <div className="space-y-6 pb-16">
      <div className="rounded-xl bg-sense-green p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Environmental Factors</h1>
        </div>
        
        <p className="text-sm px-4 text-muted-foreground">
          Identify and track environmental factors that may affect your regulation.
        </p>
      </div>
      
      <div className="px-4 space-y-6">
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="triggers">Triggers</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-6">
            <Card className="p-5">
              <CurrentEnvironment 
                factors={factors}
                onLogEnvironment={logCurrentEnvironment}
              />
            </Card>
            
            <Card className="p-5">
              <EnvironmentalRiskLevel
                riskLevel="Moderate"
                riskPercentage={65}
                message="Current noise level and brightness are approaching your personal thresholds. Consider adjusting your environment if possible."
                suggestions={[
                  "Reduce brightness or use blue light filter",
                  "Use noise-canceling headphones if available",
                  "Take a brief break in a quieter space if possible"
                ]}
              />
            </Card>
          </TabsContent>
          
          <TabsContent value="triggers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Known Triggers</h2>
              <Button 
                size="sm" 
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> 
                <span>Add New</span>
              </Button>
            </div>
            
            {showAddForm && (
              <TriggerForm 
                onSave={handleSaveTrigger} 
                onCancel={() => setShowAddForm(false)}
              />
            )}
            
            <div className="space-y-3">
              {knownTriggers.map((trigger, i) => (
                <TriggerCard key={i} trigger={trigger} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-6">
            <Card className="p-5">
              <TriggerCorrelation correlations={correlations} />
            </Card>
            
            <Card className="p-5">
              <EnvironmentalRecommendations recommendations={recommendations} />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnvironmentalFactors;
