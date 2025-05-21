import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ThresholdSettings {
  heartRateHigh: number;
  heartRateLow: number;
  hrvLow: number;
  sleepQualityMin: number;
  regulationScore: number;
  enableNotifications: boolean;
  enableAutoAdjust: boolean;
}

interface ThresholdPreset {
  id: string;
  name: string;
  settings: ThresholdSettings;
}

interface CustomThresholdEditorProps {
  initialSettings?: Partial<ThresholdSettings>;
  onSave: (settings: ThresholdSettings) => void;
}

// Default presets that users can choose from
const defaultPresets: ThresholdPreset[] = [
  {
    id: "standard",
    name: "Standard",
    settings: {
      heartRateHigh: 90,
      heartRateLow: 55,
      hrvLow: 35,
      sleepQualityMin: 65,
      regulationScore: 70,
      enableNotifications: true,
      enableAutoAdjust: false
    }
  },
  {
    id: "sensitive",
    name: "High Sensitivity",
    settings: {
      heartRateHigh: 85,
      heartRateLow: 60,
      hrvLow: 40,
      sleepQualityMin: 70,
      regulationScore: 80,
      enableNotifications: true,
      enableAutoAdjust: true
    }
  },
  {
    id: "relaxed",
    name: "Low Sensitivity",
    settings: {
      heartRateHigh: 100,
      heartRateLow: 50,
      hrvLow: 30,
      sleepQualityMin: 60,
      regulationScore: 65,
      enableNotifications: true,
      enableAutoAdjust: false
    }
  },
  {
    id: "sleep",
    name: "Sleep Focus",
    settings: {
      heartRateHigh: 85,
      heartRateLow: 50,
      hrvLow: 35,
      sleepQualityMin: 80,
      regulationScore: 75,
      enableNotifications: false,
      enableAutoAdjust: true
    }
  }
];

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
  
  const [presets, setPresets] = useState<ThresholdPreset[]>(defaultPresets);
  const [selectedPreset, setSelectedPreset] = useState<string>("custom");
  const [presetName, setPresetName] = useState<string>("");
  const [showSavePresetOption, setShowSavePresetOption] = useState<boolean>(false);

  const handleChange = (key: keyof ThresholdSettings, value: number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    // When manually changing settings, switch to custom mode
    if (selectedPreset !== "custom") {
      setSelectedPreset("custom");
    }
  };

  const handlePresetChange = (presetId: string) => {
    if (presetId === "custom") {
      // Keep current settings when switching to custom
      setSelectedPreset("custom");
      return;
    }
    
    if (presetId === "save-new") {
      setShowSavePresetOption(true);
      return;
    }
    
    // Find the selected preset and apply its settings
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      setSettings(preset.settings);
      setSelectedPreset(presetId);
      setShowSavePresetOption(false);
      
      toast({
        title: "Preset applied",
        description: `${preset.name} thresholds have been applied`,
      });
    }
  };

  const handleSaveNewPreset = () => {
    if (!presetName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your preset",
        variant: "destructive"
      });
      return;
    }
    
    // Create new preset from current settings
    const newPreset: ThresholdPreset = {
      id: `custom-${Date.now()}`,
      name: presetName,
      settings: { ...settings }
    };
    
    setPresets(prev => [...prev, newPreset]);
    setSelectedPreset(newPreset.id);
    setPresetName("");
    setShowSavePresetOption(false);
    
    toast({
      title: "Preset saved",
      description: `${newPreset.name} preset has been saved`,
    });
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
      
      <div className="mb-6">
        <Label className="text-base mb-2 block">Threshold Preset</Label>
        <Select value={selectedPreset} onValueChange={handlePresetChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a preset" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="custom">Custom Settings</SelectItem>
            {presets.map(preset => (
              <SelectItem key={preset.id} value={preset.id}>
                {preset.name}
              </SelectItem>
            ))}
            <SelectItem value="save-new">+ Save Current as New Preset</SelectItem>
          </SelectContent>
        </Select>
        
        {showSavePresetOption && (
          <div className="mt-4 space-y-2">
            <Label htmlFor="preset-name">Preset Name</Label>
            <div className="flex gap-2">
              <input 
                id="preset-name"
                type="text" 
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                placeholder="Enter preset name"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button 
                onClick={handleSaveNewPreset}
                variant="outline"
              >
                Save
              </Button>
              <Button 
                onClick={() => setShowSavePresetOption(false)}
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      
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
