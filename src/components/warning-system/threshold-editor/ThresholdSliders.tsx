
import { ThresholdSlider } from "./ThresholdSlider";
import { ThresholdSettings } from "./types";

interface ThresholdSlidersProps {
  settings: ThresholdSettings;
  onChange: (key: keyof ThresholdSettings, value: number) => void;
}

export const ThresholdSliders = ({ settings, onChange }: ThresholdSlidersProps) => {
  return (
    <div className="space-y-6">
      <ThresholdSlider
        label="Heart Rate (High)"
        value={settings.heartRateHigh}
        onChange={(value) => onChange('heartRateHigh', value)}
        min={70}
        max={140}
        step={1}
        unit=" bpm"
        description="Alert when heart rate exceeds this threshold."
      />
      
      <ThresholdSlider
        label="Heart Rate (Low)"
        value={settings.heartRateLow}
        onChange={(value) => onChange('heartRateLow', value)}
        min={40}
        max={65}
        step={1}
        unit=" bpm"
        description="Alert when heart rate drops below this threshold."
      />
      
      <ThresholdSlider
        label="HRV (Minimum)"
        value={settings.hrvLow}
        onChange={(value) => onChange('hrvLow', value)}
        min={20}
        max={60}
        step={1}
        unit=" ms"
        description="Low HRV can indicate stress or dysregulation."
      />
      
      <ThresholdSlider
        label="Sleep Quality (Minimum)"
        value={settings.sleepQualityMin}
        onChange={(value) => onChange('sleepQualityMin', value)}
        min={40}
        max={90}
        step={5}
        unit="%"
        description="Quality sleep is essential for regulation."
      />
      
      <ThresholdSlider
        label="Regulation Score (Warning Level)"
        value={settings.regulationScore}
        onChange={(value) => onChange('regulationScore', value)}
        min={30}
        max={90}
        step={5}
        unit="%"
        description="Alert when regulation score drops below this threshold."
      />
    </div>
  );
};
