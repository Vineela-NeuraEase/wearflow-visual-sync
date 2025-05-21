
import { Slider } from "@/components/ui/slider";

interface IntensitySliderProps {
  intensity: number;
  onChange: (value: number) => void;
}

export const IntensitySlider = ({ intensity, onChange }: IntensitySliderProps) => {
  return (
    <div className="space-y-6">
      <Slider
        value={[intensity]}
        min={1}
        max={10}
        step={1}
        onValueChange={(value) => onChange(value[0])}
        className="mb-2"
      />
      <div className="flex justify-between text-sm text-gray-500">
        <span>Mild (1)</span>
        <span>Moderate (5)</span>
        <span>Severe (10)</span>
      </div>
      <div className="text-center">
        <span className="font-medium text-lg">{intensity}/10</span>
      </div>
    </div>
  );
};
