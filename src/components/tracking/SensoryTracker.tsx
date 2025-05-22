
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Save, Volume2, Sun, Thermometer, Users, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SensoryData } from "@/types/biometric";

interface SensoryTrackerProps {
  onSave: (sensoryData: SensoryData) => void;
}

export const SensoryTracker = ({ onSave }: SensoryTrackerProps) => {
  const { toast } = useToast();
  const [noiseLevel, setNoiseLevel] = useState<number>(50);
  const [lightIntensity, setLightIntensity] = useState<number>(50);
  const [temperature, setTemperature] = useState<number>(72);
  const [crowding, setCrowding] = useState<number>(30);
  const [textureSensitivity, setTextureSensitivity] = useState<number>(50);
  const [smellSensitivity, setSmellSensitivity] = useState<number>(50);

  const handleSave = () => {
    const sensoryData: SensoryData = {
      timestamp: new Date().toISOString(),
      noiseLevel,
      lightIntensity,
      temperature,
      crowding,
      textureSensitivity,
      smellSensitivity
    };

    onSave(sensoryData);
    toast({
      title: "Sensory data saved",
      description: "Your current sensory environment has been recorded"
    });
  };

  const handleAutoDetect = () => {
    toast({
      title: "Auto-detecting environment",
      description: "Using device sensors to measure environmental factors"
    });
    
    // Simulate auto-detection with a slight delay
    setTimeout(() => {
      setNoiseLevel(Math.floor(Math.random() * 80) + 10);
      setLightIntensity(Math.floor(Math.random() * 80) + 10);
      setTemperature(Math.floor(Math.random() * 20) + 65);
      setCrowding(Math.floor(Math.random() * 60) + 10);
      
      toast({
        title: "Environment detected",
        description: "Sensor readings have been applied"
      });
    }, 1500);
  };

  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Sensory Environment</h2>
        <Activity className="text-green-500" />
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-1">
            <div className="flex items-center">
              <Volume2 className="mr-2 h-4 w-4" />
              <Label>Noise Level</Label>
            </div>
            <span>{noiseLevel}</span>
          </div>
          <Slider
            value={[noiseLevel]}
            onValueChange={(values) => setNoiseLevel(values[0])}
            min={0}
            max={100}
            step={1}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Quiet</span>
            <span>Moderate</span>
            <span>Loud</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <div className="flex items-center">
              <Sun className="mr-2 h-4 w-4" />
              <Label>Light Intensity</Label>
            </div>
            <span>{lightIntensity}</span>
          </div>
          <Slider
            value={[lightIntensity]}
            onValueChange={(values) => setLightIntensity(values[0])}
            min={0}
            max={100}
            step={1}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Dark</span>
            <span>Medium</span>
            <span>Bright</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <div className="flex items-center">
              <Thermometer className="mr-2 h-4 w-4" />
              <Label>Temperature (°F)</Label>
            </div>
            <span>{temperature}°F</span>
          </div>
          <Slider
            value={[temperature]}
            onValueChange={(values) => setTemperature(values[0])}
            min={60}
            max={85}
            step={1}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Cool</span>
            <span>Comfortable</span>
            <span>Warm</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <Label>Crowding</Label>
            </div>
            <span>{crowding}</span>
          </div>
          <Slider
            value={[crowding]}
            onValueChange={(values) => setCrowding(values[0])}
            min={0}
            max={100}
            step={1}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Empty</span>
            <span>Few People</span>
            <span>Crowded</span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button 
            className="flex-1"
            variant="outline"
            onClick={handleAutoDetect}
          >
            Auto-Detect
          </Button>
          <Button 
            className="flex-1" 
            onClick={handleSave}
          >
            <Save className="mr-2 h-4 w-4" />
            Record
          </Button>
        </div>
      </div>
    </Card>
  );
};
