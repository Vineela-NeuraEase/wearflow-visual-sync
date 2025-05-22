
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { BehavioralTrackerProps } from './TrackerProps';

export const BehavioralTracker = ({ onSave, isLoading }: BehavioralTrackerProps) => {
  // Initialize with all required fields
  const [formData, setFormData] = useState({
    timestamp: new Date().toISOString(),
    anxiety_level: 3,
    irritability_level: 3,
    stimming_behavior: '',
    notes: '',
    // Required fields based on the BehavioralData type
    self_reported_mood: 5,
    stimming: 3,
    communication_difficulty: 2,
    social_withdrawal: 2
  });
  
  const handleSliderChange = (name: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [name]: value[0] }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    // Reset form
    setFormData({
      timestamp: new Date().toISOString(),
      anxiety_level: 3,
      irritability_level: 3,
      stimming_behavior: '',
      notes: '',
      self_reported_mood: 5,
      stimming: 3,
      communication_difficulty: 2,
      social_withdrawal: 2
    });
  };
  
  return (
    <Card className="p-4 space-y-4">
      <h3 className="font-medium text-lg">Track Current Behavioral State</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Anxiety Level: {formData.anxiety_level}</label>
          <Slider 
            value={[formData.anxiety_level]} 
            min={0} 
            max={10} 
            step={1}
            onValueChange={(value) => handleSliderChange('anxiety_level', value)}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Irritability Level: {formData.irritability_level}</label>
          <Slider 
            value={[formData.irritability_level]} 
            min={0} 
            max={10} 
            step={1}
            onValueChange={(value) => handleSliderChange('irritability_level', value)}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Calm</span>
            <span>Irritated</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Stimming Level: {formData.stimming}</label>
          <Slider 
            value={[formData.stimming]} 
            min={0} 
            max={10} 
            step={1}
            onValueChange={(value) => handleSliderChange('stimming', value)}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>None</span>
            <span>Intense</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Self-reported Mood: {formData.self_reported_mood}</label>
          <Slider 
            value={[formData.self_reported_mood]} 
            min={0} 
            max={10} 
            step={1}
            onValueChange={(value) => handleSliderChange('self_reported_mood', value)}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Communication Difficulty: {formData.communication_difficulty}</label>
          <Slider 
            value={[formData.communication_difficulty]} 
            min={0} 
            max={10} 
            step={1}
            onValueChange={(value) => handleSliderChange('communication_difficulty', value)}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Easy</span>
            <span>Difficult</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Social Withdrawal: {formData.social_withdrawal}</label>
          <Slider 
            value={[formData.social_withdrawal]} 
            min={0} 
            max={10} 
            step={1}
            onValueChange={(value) => handleSliderChange('social_withdrawal', value)}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Engaged</span>
            <span>Withdrawn</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Stimming Behavior (if any)</label>
          <Textarea 
            name="stimming_behavior"
            value={formData.stimming_behavior}
            onChange={handleInputChange}
            placeholder="Describe any stimming behaviors"
            className="resize-none h-20"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Notes</label>
          <Textarea 
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Any additional notes on your current state"
            className="resize-none h-20"
          />
        </div>
        
        <Button 
          className="w-full" 
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Behavioral Data"}
        </Button>
      </div>
    </Card>
  );
};
