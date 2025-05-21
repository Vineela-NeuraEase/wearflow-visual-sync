
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";

interface DurationInputProps {
  duration: string;
  onChange: (value: string) => void;
}

export const DurationInput = ({ duration, onChange }: DurationInputProps) => {
  return (
    <div className="flex items-center">
      <Clock className="h-5 w-5 mr-2 text-gray-500" />
      <Input
        type="number"
        value={duration}
        onChange={(e) => onChange(e.target.value)}
        className="max-w-xs"
        min="1"
      />
    </div>
  );
};
