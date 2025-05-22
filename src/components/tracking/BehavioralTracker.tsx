
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BehavioralData } from "@/types/biometric";

interface BehavioralTrackerProps {
  onSaveData: (data: BehavioralData) => void;
}

export const BehavioralTracker = ({ onSaveData }: BehavioralTrackerProps) => {
  const [behavioralData, setBehavioralData] = useState<Partial<BehavioralData>>({
    self_reported_mood: 70,
    stimming: 30,
    communication_difficulty: 20,
    social_withdrawal: 15,
    irritability_level: 25
  });

  const handleSave = () => {
    onSaveData({
      self_reported_mood: behavioralData.self_reported_mood || 50,
      stimming: behavioralData.stimming || 0,
      communication_difficulty: behavioralData.communication_difficulty || 0,
      social_withdrawal: behavioralData.social_withdrawal || 0,
      irritability_level: behavioralData.irritability_level || 0
    });
  };

  return (
    <Card className="p-5">
      <h2 className="text-lg font-medium mb-4">Behavioral State</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Current Mood</Label>
            <span>{behavioralData.self_reported_mood}/100</span>
          </div>
          <Slider 
            value={[behavioralData.self_reported_mood || 70]} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={(values) => setBehavioralData(prev => ({ ...prev, self_reported_mood: values[0] }))}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Stimming Intensity</Label>
            <span>{behavioralData.stimming}/100</span>
          </div>
          <Slider 
            value={[behavioralData.stimming || 30]} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={(values) => setBehavioralData(prev => ({ ...prev, stimming: values[0] }))}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Communication Difficulty</Label>
            <span>{behavioralData.communication_difficulty}/100</span>
          </div>
          <Slider 
            value={[behavioralData.communication_difficulty || 20]} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={(values) => setBehavioralData(prev => ({ ...prev, communication_difficulty: values[0] }))}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Social Withdrawal</Label>
            <span>{behavioralData.social_withdrawal}/100</span>
          </div>
          <Slider 
            value={[behavioralData.social_withdrawal || 15]} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={(values) => setBehavioralData(prev => ({ ...prev, social_withdrawal: values[0] }))}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Irritability</Label>
            <span>{behavioralData.irritability_level}/100</span>
          </div>
          <Slider 
            value={[behavioralData.irritability_level || 25]} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={(values) => setBehavioralData(prev => ({ ...prev, irritability_level: values[0] }))}
          />
        </div>
        
        <Button 
          onClick={handleSave}
          className="w-full bg-red-500 hover:bg-red-600"
        >
          Save Behavioral Data
        </Button>
      </div>
    </Card>
  );
};
