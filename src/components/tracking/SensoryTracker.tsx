
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SensoryData } from "@/types/biometric";

interface SensoryTrackerProps {
  onSaveData: (data: SensoryData) => void;
}

export const SensoryTracker = ({ onSaveData }: SensoryTrackerProps) => {
  const [sensoryData, setSensoryData] = useState<Partial<SensoryData>>({
    noise_level: 50,
    light_intensity: 60,
    temperature: 72,
    crowding: 30,
    texture_sensitivity: 40,
    smell_sensitivity: 35
  });

  const handleSave = () => {
    onSaveData({
      noise_level: sensoryData.noise_level || 50,
      light_intensity: sensoryData.light_intensity || 60,
      temperature: sensoryData.temperature || 72,
      crowding: sensoryData.crowding || 30,
      texture_sensitivity: sensoryData.texture_sensitivity,
      smell_sensitivity: sensoryData.smell_sensitivity
    });
  };

  return (
    <Card className="p-5">
      <h2 className="text-lg font-medium mb-4">Sensory Environment</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Noise Level</Label>
            <span>{sensoryData.noise_level}/100</span>
          </div>
          <Slider 
            value={[sensoryData.noise_level || 50]} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={(values) => setSensoryData(prev => ({ ...prev, noise_level: values[0] }))}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Light Intensity</Label>
            <span>{sensoryData.light_intensity}/100</span>
          </div>
          <Slider 
            value={[sensoryData.light_intensity || 60]} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={(values) => setSensoryData(prev => ({ ...prev, light_intensity: values[0] }))}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Temperature (°F)</Label>
            <span>{sensoryData.temperature}°F</span>
          </div>
          <Slider 
            value={[sensoryData.temperature || 72]} 
            min={60} 
            max={90} 
            step={0.5}
            onValueChange={(values) => setSensoryData(prev => ({ ...prev, temperature: values[0] }))}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Crowding</Label>
            <span>{sensoryData.crowding}/100</span>
          </div>
          <Slider 
            value={[sensoryData.crowding || 30]} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={(values) => setSensoryData(prev => ({ ...prev, crowding: values[0] }))}
          />
        </div>
        
        <Button 
          onClick={handleSave}
          className="w-full bg-green-500 hover:bg-green-600"
        >
          Save Sensory Data
        </Button>
      </div>
    </Card>
  );
};
