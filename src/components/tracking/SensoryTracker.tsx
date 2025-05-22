import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { SensoryTrackerProps } from './TrackerProps';
import { SensoryData } from '@/types/biometric';

export const SensoryTracker = ({ onSave, isLoading }: SensoryTrackerProps) => {
  const [noiseLevel, setNoiseLevel] = useState<number>(5);
  const [lightLevel, setLightLevel] = useState<number>(5);
  const [crowding, setCrowding] = useState<number>(5);
  const [temperature, setTemperature] = useState<number>(5);
  const [sensoryTriggers, setSensoryTriggers] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>("");
  
  const handleTriggerChange = (trigger: string) => {
    setSensoryTriggers(prev => 
      prev.includes(trigger) 
        ? prev.filter(t => t !== trigger) 
        : [...prev, trigger]
    );
  };
  
  const handleSubmit = async () => {
    const data: Omit<SensoryData, "user_id"> = {
      timestamp: new Date().toISOString(),
      noise_level: noiseLevel,
      light_level: lightLevel,
      crowding: crowding,
      temperature: temperature,
      sensory_triggers: sensoryTriggers,
      notes: notes
    };
    
    await onSave(data);
    
    // Reset form
    setNoiseLevel(5);
    setLightLevel(5);
    setCrowding(5);
    setTemperature(5);
    setSensoryTriggers([]);
    setNotes("");
  };
  
  const triggers = [
    { id: "bright-lights", label: "Bright lights" },
    { id: "loud-sounds", label: "Loud sounds" },
    { id: "certain-textures", label: "Certain textures" },
    { id: "strong-smells", label: "Strong smells" },
    { id: "crowded-spaces", label: "Crowded spaces" },
    { id: "unexpected-touch", label: "Unexpected touch" },
    { id: "visual-movement", label: "Visual movement/patterns" },
    { id: "temperature", label: "Temperature discomfort" }
  ];
  
  return (
    <Card className="p-4 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Sensory Environment</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Track your sensory environment to identify potential triggers
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <Label>Noise Level</Label>
              <span className="text-sm text-muted-foreground">
                {noiseLevel === 1 ? "Very quiet" : 
                 noiseLevel === 10 ? "Very loud" : 
                 noiseLevel < 5 ? "Quiet" : 
                 noiseLevel > 7 ? "Loud" : "Moderate"}
              </span>
            </div>
            <Slider 
              value={[noiseLevel]} 
              min={1} 
              max={10} 
              step={1} 
              onValueChange={(value) => setNoiseLevel(value[0])} 
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <Label>Light Level</Label>
              <span className="text-sm text-muted-foreground">
                {lightLevel === 1 ? "Very dim" : 
                 lightLevel === 10 ? "Very bright" : 
                 lightLevel < 5 ? "Dim" : 
                 lightLevel > 7 ? "Bright" : "Moderate"}
              </span>
            </div>
            <Slider 
              value={[lightLevel]} 
              min={1} 
              max={10} 
              step={1} 
              onValueChange={(value) => setLightLevel(value[0])} 
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <Label>Crowding</Label>
              <span className="text-sm text-muted-foreground">
                {crowding === 1 ? "Empty" : 
                 crowding === 10 ? "Extremely crowded" : 
                 crowding < 5 ? "Few people" : 
                 crowding > 7 ? "Crowded" : "Moderate"}
              </span>
            </div>
            <Slider 
              value={[crowding]} 
              min={1} 
              max={10} 
              step={1} 
              onValueChange={(value) => setCrowding(value[0])} 
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <Label>Temperature</Label>
              <span className="text-sm text-muted-foreground">
                {temperature === 1 ? "Very cold" : 
                 temperature === 10 ? "Very hot" : 
                 temperature < 5 ? "Cool" : 
                 temperature > 7 ? "Warm" : "Comfortable"}
              </span>
            </div>
            <Slider 
              value={[temperature]} 
              min={1} 
              max={10} 
              step={1} 
              onValueChange={(value) => setTemperature(value[0])} 
            />
          </div>
        </div>
        
        <div>
          <Label className="block mb-3">Sensory Triggers Present</Label>
          <div className="grid grid-cols-2 gap-3">
            {triggers.map((trigger) => (
              <div key={trigger.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={trigger.id} 
                  checked={sensoryTriggers.includes(trigger.id)}
                  onCheckedChange={() => handleTriggerChange(trigger.id)}
                />
                <label 
                  htmlFor={trigger.id}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {trigger.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea 
            id="notes"
            placeholder="Any other sensory factors or observations..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <Button 
          onClick={handleSubmit} 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Sensory Data"}
        </Button>
      </div>
    </Card>
  );
};
