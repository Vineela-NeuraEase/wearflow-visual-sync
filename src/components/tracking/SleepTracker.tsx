
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SleepData } from "@/types/biometric";

interface SleepTrackerProps {
  onSaveData: (data: SleepData) => void;
}

export const SleepTracker = ({ onSaveData }: SleepTrackerProps) => {
  const [sleepData, setSleepData] = useState<Partial<SleepData>>({
    date: new Date().toISOString().split('T')[0],
    quality: 75,
    duration: 7.5,
    deep_sleep_percentage: 20,
    rem_sleep_percentage: 25,
    awakenings: 2
  });

  const handleSave = () => {
    onSaveData({
      date: sleepData.date || new Date().toISOString().split('T')[0],
      quality: sleepData.quality || 50,
      duration: sleepData.duration || 7,
      deep_sleep_percentage: sleepData.deep_sleep_percentage || 15,
      rem_sleep_percentage: sleepData.rem_sleep_percentage || 20,
      awakenings: sleepData.awakenings || 0
    });
  };

  return (
    <Card className="p-5">
      <h2 className="text-lg font-medium mb-4">Sleep Data</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input 
            type="date" 
            id="date" 
            value={sleepData.date}
            onChange={(e) => setSleepData(prev => ({ ...prev, date: e.target.value }))}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Sleep Quality</Label>
            <span>{sleepData.quality}%</span>
          </div>
          <Slider 
            value={[sleepData.quality || 75]} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={(values) => setSleepData(prev => ({ ...prev, quality: values[0] }))}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Sleep Duration (hours)</Label>
            <span>{sleepData.duration}</span>
          </div>
          <Slider 
            value={[sleepData.duration || 7.5]} 
            min={0} 
            max={12} 
            step={0.1}
            onValueChange={(values) => setSleepData(prev => ({ ...prev, duration: values[0] }))}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Deep Sleep (%)</Label>
            <span>{sleepData.deep_sleep_percentage}%</span>
          </div>
          <Slider 
            value={[sleepData.deep_sleep_percentage || 20]} 
            min={0} 
            max={50} 
            step={1}
            onValueChange={(values) => setSleepData(prev => ({ ...prev, deep_sleep_percentage: values[0] }))}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>REM Sleep (%)</Label>
            <span>{sleepData.rem_sleep_percentage}%</span>
          </div>
          <Slider 
            value={[sleepData.rem_sleep_percentage || 25]} 
            min={0} 
            max={50} 
            step={1}
            onValueChange={(values) => setSleepData(prev => ({ ...prev, rem_sleep_percentage: values[0] }))}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Night Awakenings</Label>
            <span>{sleepData.awakenings}</span>
          </div>
          <Slider 
            value={[sleepData.awakenings || 2]} 
            min={0} 
            max={10} 
            step={1}
            onValueChange={(values) => setSleepData(prev => ({ ...prev, awakenings: values[0] }))}
          />
        </div>
        
        <Button 
          onClick={handleSave}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          Save Sleep Data
        </Button>
      </div>
    </Card>
  );
};
