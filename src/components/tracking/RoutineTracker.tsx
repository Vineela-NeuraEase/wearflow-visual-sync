
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { RoutineData } from "@/types/biometric";

interface RoutineTrackerProps {
  onSaveData: (data: RoutineData) => void;
}

export const RoutineTracker = ({ onSaveData }: RoutineTrackerProps) => {
  const [routineData, setRoutineData] = useState<Partial<RoutineData>>({
    expected_activity: "",
    actual_activity: "",
    deviation_score: 50,
    location: "",
    is_unexpected_change: false
  });

  const handleSave = () => {
    onSaveData({
      expected_activity: routineData.expected_activity || "Unspecified",
      actual_activity: routineData.actual_activity || "Unspecified",
      deviation_score: routineData.deviation_score || 0,
      location: routineData.location || "Unspecified",
      is_unexpected_change: routineData.is_unexpected_change || false
    });
  };

  return (
    <Card className="p-5">
      <h2 className="text-lg font-medium mb-4">Routine & Change Tracking</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="expected">Expected Activity</Label>
          <Input 
            id="expected" 
            value={routineData.expected_activity}
            onChange={(e) => setRoutineData(prev => ({ ...prev, expected_activity: e.target.value }))}
            placeholder="What was planned?"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="actual">Actual Activity</Label>
          <Input 
            id="actual" 
            value={routineData.actual_activity}
            onChange={(e) => setRoutineData(prev => ({ ...prev, actual_activity: e.target.value }))}
            placeholder="What actually happened?"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            value={routineData.location}
            onChange={(e) => setRoutineData(prev => ({ ...prev, location: e.target.value }))}
            placeholder="Where did this happen?"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Deviation Score</Label>
            <span>{routineData.deviation_score}/100</span>
          </div>
          <Slider 
            value={[routineData.deviation_score || 50]} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={(values) => setRoutineData(prev => ({ ...prev, deviation_score: values[0] }))}
          />
          <p className="text-xs text-gray-500">
            How different was the actual activity from what was expected?
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            checked={routineData.is_unexpected_change}
            onCheckedChange={(checked) => setRoutineData(prev => ({ ...prev, is_unexpected_change: checked }))}
          />
          <Label>Was this change unexpected?</Label>
        </div>
        
        <Button 
          onClick={handleSave}
          className="w-full bg-purple-500 hover:bg-purple-600"
        >
          Save Routine Data
        </Button>
      </div>
    </Card>
  );
};
