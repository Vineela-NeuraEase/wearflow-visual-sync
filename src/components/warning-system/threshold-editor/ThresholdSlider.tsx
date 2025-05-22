
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface ThresholdSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  description?: string;
}

export const ThresholdSlider = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit = "",
  description
}: ThresholdSliderProps) => {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <Label>{label}</Label>
        <span>{value}{unit}</span>
      </div>
      <Slider 
        value={[value]} 
        onValueChange={(values) => onChange(values[0])}
        min={min}
        max={max}
        step={step}
      />
      {description && (
        <p className="text-xs text-muted-foreground mt-1">
          {description}
        </p>
      )}
    </div>
  );
};
