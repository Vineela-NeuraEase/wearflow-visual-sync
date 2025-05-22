import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BehavioralTrackerProps } from './TrackerProps';
import { BehavioralData } from '@/types/biometric';

export const BehavioralTracker = ({ onSave, isLoading }: BehavioralTrackerProps) => {
  const [anxietyLevel, setAnxietyLevel] = useState<number>(0);
  const [irritabilityLevel, setIrritabilityLevel] = useState<number>(0);
  const [stimming, setStimming] = useState<string>("none");
  const [notes, setNotes] = useState<string>("");
  
  const handleSave = async () => {
    const data: Omit<BehavioralData, "user_id"> = {
      timestamp: new Date().toISOString(),
      anxiety_level: anxietyLevel,
      irritability_level: irritabilityLevel,
      stimming_behavior: stimming,
      notes: notes
    };
    
    await onSave(data);
    
    // Reset form
    setAnxietyLevel(0);
    setIrritabilityLevel(0);
    setStimming("none");
    setNotes("");
  };
  
  return (
    <Card className="p-4 space-y-6">
      <div>
        <h3 className="font-medium mb-2">Anxiety Level</h3>
        <div className="space-y-2">
          <Slider
            value={[anxietyLevel]}
            min={0}
            max={10}
            step={1}
            onValueChange={(value) => setAnxietyLevel(value[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>None (0)</span>
            <span>Moderate (5)</span>
            <span>Severe (10)</span>
          </div>
          <p className="text-sm font-medium text-center mt-2">
            Current: {anxietyLevel}/10
          </p>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Irritability Level</h3>
        <div className="space-y-2">
          <Slider
            value={[irritabilityLevel]}
            min={0}
            max={10}
            step={1}
            onValueChange={(value) => setIrritabilityLevel(value[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>None (0)</span>
            <span>Moderate (5)</span>
            <span>Severe (10)</span>
          </div>
          <p className="text-sm font-medium text-center mt-2">
            Current: {irritabilityLevel}/10
          </p>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Stimming Behavior</h3>
        <Select value={stimming} onValueChange={setStimming}>
          <SelectTrigger>
            <SelectValue placeholder="Select stimming behavior" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="rocking">Rocking</SelectItem>
            <SelectItem value="hand_flapping">Hand flapping</SelectItem>
            <SelectItem value="pacing">Pacing</SelectItem>
            <SelectItem value="spinning">Spinning</SelectItem>
            <SelectItem value="verbal">Verbal (repeating words/phrases)</SelectItem>
            <SelectItem value="tapping">Tapping</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Notes</h3>
        <Textarea
          placeholder="Add any additional notes about your current state"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
      </div>
      
      <Button 
        className="w-full" 
        onClick={handleSave}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Behavioral Data"}
      </Button>
    </Card>
  );
};
