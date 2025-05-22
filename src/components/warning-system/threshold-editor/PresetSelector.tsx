
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ThresholdSettings, ThresholdPreset } from "./types";

interface PresetSelectorProps {
  presets: ThresholdPreset[];
  selectedPreset: string;
  onPresetChange: (presetId: string) => void;
  currentSettings: ThresholdSettings;
  onSaveNewPreset: (name: string, settings: ThresholdSettings) => void;
}

export const PresetSelector = ({
  presets,
  selectedPreset,
  onPresetChange,
  currentSettings,
  onSaveNewPreset
}: PresetSelectorProps) => {
  const { toast } = useToast();
  const [showSavePresetOption, setShowSavePresetOption] = useState<boolean>(false);
  const [presetName, setPresetName] = useState<string>("");

  const handlePresetChange = (presetId: string) => {
    if (presetId === "save-new") {
      setShowSavePresetOption(true);
      return;
    }
    
    onPresetChange(presetId);
    setShowSavePresetOption(false);
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
    
    onSaveNewPreset(presetName, currentSettings);
    setPresetName("");
    setShowSavePresetOption(false);
  };

  return (
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
  );
};
