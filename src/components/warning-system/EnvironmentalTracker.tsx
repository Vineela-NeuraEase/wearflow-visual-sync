
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Plus, Save, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnvironmentalFactor {
  name: string;
  value: number;
  maxValue: number;
  icon: string;
}

interface EnvironmentalTrackerProps {
  onSave: (factors: EnvironmentalFactor[]) => void;
  initialFactors?: EnvironmentalFactor[];
}

export const EnvironmentalTracker = ({ 
  onSave,
  initialFactors = [
    { name: "Noise Level", value: 50, maxValue: 100, icon: "🔊" },
    { name: "Brightness", value: 60, maxValue: 100, icon: "💡" },
    { name: "Crowding", value: 30, maxValue: 100, icon: "👥" },
    { name: "Temperature", value: 68, maxValue: 100, icon: "🌡️" }
  ] 
}: EnvironmentalTrackerProps) => {
  const { toast } = useToast();
  const [factors, setFactors] = useState<EnvironmentalFactor[]>(initialFactors);
  const [currentTimestamp, setCurrentTimestamp] = useState<string>(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
  
  const handleValueChange = (index: number, newValue: number) => {
    const updatedFactors = [...factors];
    updatedFactors[index].value = newValue;
    setFactors(updatedFactors);
  };
  
  const handleSave = () => {
    // Update timestamp
    setCurrentTimestamp(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    onSave(factors);
    toast({
      title: "Environment logged",
      description: "Current environmental factors have been recorded"
    });
  };
  
  // Auto-detect is just a placeholder function in the frontend
  const handleAutoDetect = () => {
    toast({
      title: "Auto-detecting environment",
      description: "Using device sensors to measure environmental factors"
    });
    
    // Simulate auto-detection with a slight delay
    setTimeout(() => {
      const updatedFactors = factors.map(factor => ({
        ...factor,
        value: Math.floor(Math.random() * (factor.maxValue - 20) + 20)
      }));
      
      setFactors(updatedFactors);
      setCurrentTimestamp(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      
      toast({
        title: "Environment detected",
        description: "Sensor readings have been applied"
      });
    }, 1500);
  };

  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Environmental Factors</h2>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          Last updated: {currentTimestamp}
        </div>
      </div>
      
      <div className="space-y-6">
        {factors.map((factor, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <Label className="flex items-center">
                <span className="mr-2 text-xl">{factor.icon}</span>
                {factor.name}
              </Label>
              <span>{factor.value}</span>
            </div>
            <Slider 
              value={[factor.value]} 
              onValueChange={(values) => handleValueChange(index, values[0])}
              min={0}
              max={factor.maxValue}
              step={1}
            />
          </div>
        ))}
      </div>
      
      <div className="flex gap-3 mt-6">
        <Button 
          className="flex-1"
          variant="outline"
          onClick={handleAutoDetect}
        >
          <Plus className="h-4 w-4 mr-2" />
          Auto-Detect
        </Button>
        <Button 
          className="flex-1" 
          onClick={handleSave}
        >
          <Save className="h-4 w-4 mr-2" />
          Log Environment
        </Button>
      </div>
    </Card>
  );
};
