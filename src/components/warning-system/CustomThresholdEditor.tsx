
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ThresholdSettings {
  heartRateHigh: number;
  heartRateLow: number;
  hrvLow: number;
  sleepQualityMin: number;
  regulationScore: number;
  enableNotifications: boolean;
  enableAutoAdjust: boolean;
}

interface CustomThresholdEditorProps {
  initialSettings?: Partial<ThresholdSettings>;
  onSave: (settings: ThresholdSettings) => void;
}

export const CustomThresholdEditor = ({
  initialSettings = {},
  onSave
}: CustomThresholdEditorProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<ThresholdSettings>({
    heartRateHigh: initialSettings.heartRateHigh || 90,
    heartRateLow: initialSettings.heartRateLow || 55,
    hrvLow: initialSettings.hrvLow || 35,
    sleepQualityMin: initialSettings.sleepQualityMin || 65,
    regulationScore: initialSettings.regulationScore || 70,
    enableNotifications: initialSettings.enableNotifications ?? true,
    enableAutoAdjust: initialSettings.enableAutoAdjust ?? false
  });

  const handleChange = (key: keyof ThresholdSettings, value: number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    onSave(settings);
    toast({
      title: "Thresholds updated",
      description: "Your custom thresholds have been saved",
    });
  };

  return (
    <Card className="p-5">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        Personalized Warning Thresholds 
        <Info className="h-4 w-4 ml-2 text-muted-foreground" />
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Adjust these values to determine when Hana will notify you about potential regulation challenges.
      </p>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-1">
            <Label>Heart Rate (High)</Label>
            <span>{settings.heartRateHigh} bpm</span>
          </div>
          <Slider 
            value={[settings.heartRateHigh]} 
            onValueChange={(values) => handleChange('heartRateHigh', values[0])}
            min={70}
            max={140}
            step={1}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Alert when heart rate exceeds this threshold.
          </p>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <Label>Heart Rate (Low)</Label>
            <span>{settings.heartRateLow} bpm</span>
          </div>
          <Slider 
            value={[settings.heartRateLow]} 
            onValueChange={(values) => handleChange('heartRateLow', values[0])}
            min={40}
            max={65}
            step={1}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Alert when heart rate drops below this threshold.
          </p>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <Label>HRV (Minimum)</Label>
            <span>{settings.hrvLow} ms</span>
          </div>
          <Slider 
            value={[settings.hrvLow]} 
            onValueChange={(values) => handleChange('hrvLow', values[0])}
            min={20}
            max={60}
            step={1}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Low HRV can indicate stress or dysregulation.
          </p>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <Label>Sleep Quality (Minimum)</Label>
            <span>{settings.sleepQualityMin}%</span>
          </div>
          <Slider 
            value={[settings.sleepQualityMin]} 
            onValueChange={(values) => handleChange('sleepQualityMin', values[0])}
            min={40}
            max={90}
            step={5}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Quality sleep is essential for regulation.
          </p>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <Label>Regulation Score (Warning Level)</Label>
            <span>{settings.regulationScore}%</span>
          </div>
          <Slider 
            value={[settings.regulationScore]} 
            onValueChange={(values) => handleChange('regulationScore', values[0])}
            min={30}
            max={90}
            step={5}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Alert when regulation score drops below this threshold.
          </p>
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div>
            <Label htmlFor="notifications" className="text-base">Enable Notifications</Label>
            <p className="text-xs text-muted-foreground mt-1">
              Receive alerts when thresholds are crossed.
            </p>
          </div>
          <Switch 
            id="notifications" 
            checked={settings.enableNotifications} 
            onCheckedChange={(checked) => handleChange('enableNotifications', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div>
            <Label htmlFor="auto-adjust" className="text-base">Auto-Adjust Thresholds</Label>
            <p className="text-xs text-muted-foreground mt-1">
              Allow Hana to learn from your patterns and adjust thresholds automatically.
            </p>
          </div>
          <Switch 
            id="auto-adjust" 
            checked={settings.enableAutoAdjust} 
            onCheckedChange={(checked) => handleChange('enableAutoAdjust', checked)}
          />
        </div>
        
        <Button onClick={handleSave} className="w-full">Save Custom Thresholds</Button>
      </div>
    </Card>
  );
};

