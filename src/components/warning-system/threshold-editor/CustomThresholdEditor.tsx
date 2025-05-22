import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PresetSelector } from "./PresetSelector";
import { ThresholdSliders } from "./ThresholdSliders";
import { SettingSwitches } from "./SettingSwitches";
import { ThresholdSettings, ThresholdPreset } from "./types";
import { defaultPresets } from "./defaultPresets";

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
  
  const [presets, setPresets] = useState<ThresholdPreset[]>(defaultPresets);
  const [selectedPreset, setSelectedPreset] = useState<string>("custom");

  const handleNumericChange = (key: keyof ThresholdSettings, value: number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    // When manually changing settings, switch to custom mode
    if (selectedPreset !== "custom") {
      setSelectedPreset("custom");
    }
  };

  const handleBooleanChange = (key: keyof ThresholdSettings, value: boolean) => {
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
    
    // Find the selected preset and apply its settings
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      setSettings(preset.settings);
      setSelectedPreset(presetId);
      
      toast({
        title: "Preset applied",
        description: `${preset.name} thresholds have been applied`,
      });
    }
  };

  const handleSaveNewPreset = (presetName: string, currentSettings: ThresholdSettings) => {
    // Create new preset from current settings
    const newPreset: ThresholdPreset = {
      id: `custom-${Date.now()}`,
      name: presetName,
      settings: { ...currentSettings }
    };
    
    setPresets(prev => [...prev, newPreset]);
    setSelectedPreset(newPreset.id);
    
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
      
      <PresetSelector
        presets={presets}
        selectedPreset={selectedPreset}
        onPresetChange={handlePresetChange}
        currentSettings={settings}
        onSaveNewPreset={handleSaveNewPreset}
      />
      
      <div className="space-y-6">
        <ThresholdSliders 
          settings={settings} 
          onChange={handleNumericChange} 
        />
        
        <SettingSwitches 
          settings={settings} 
          onChange={handleBooleanChange} 
        />
        
        <Button onClick={handleSave} className="w-full">Save Custom Thresholds</Button>
      </div>
    </Card>
  );
};
