
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Save, MoonStar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SleepData } from "@/types/biometric";

interface SleepTrackerProps {
  onSave: (sleepData: SleepData) => void;
  initialData?: Partial<SleepData>;
}

export const SleepTracker = ({ onSave, initialData }: SleepTrackerProps) => {
  const { toast } = useToast();
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [quality, setQuality] = useState(initialData?.quality || 50);
  const [duration, setDuration] = useState(initialData?.duration || 7.5);
  const [deepSleep, setDeepSleep] = useState(initialData?.deepSleepPercentage || 20);
  const [remSleep, setRemSleep] = useState(initialData?.remSleepPercentage || 25);
  const [awakenings, setAwakenings] = useState(initialData?.awakenings || 2);

  const handleSave = () => {
    const sleepData: SleepData = {
      date,
      quality,
      duration,
      deepSleepPercentage: deepSleep,
      remSleepPercentage: remSleep,
      awakenings
    };

    onSave(sleepData);
    toast({
      title: "Sleep data saved",
      description: "Your sleep information has been recorded"
    });
  };

  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Sleep Tracking</h2>
        <MoonStar className="text-blue-500" />
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <Label>Sleep Quality</Label>
            <span>{quality}%</span>
          </div>
          <Slider
            value={[quality]}
            onValueChange={(values) => setQuality(values[0])}
            min={0}
            max={100}
            step={1}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Poor</span>
            <span>Average</span>
            <span>Excellent</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <Label>Sleep Duration (hours)</Label>
            <span>{duration} hrs</span>
          </div>
          <Slider
            value={[duration]}
            onValueChange={(values) => setDuration(values[0])}
            min={0}
            max={12}
            step={0.5}
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <Label>Deep Sleep Percentage</Label>
            <span>{deepSleep}%</span>
          </div>
          <Slider
            value={[deepSleep]}
            onValueChange={(values) => setDeepSleep(values[0])}
            min={0}
            max={50}
            step={1}
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <Label>REM Sleep Percentage</Label>
            <span>{remSleep}%</span>
          </div>
          <Slider
            value={[remSleep]}
            onValueChange={(values) => setRemSleep(values[0])}
            min={0}
            max={50}
            step={1}
          />
        </div>

        <div>
          <Label htmlFor="awakenings">Awakenings</Label>
          <div className="flex items-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setAwakenings(Math.max(0, awakenings - 1))}
            >
              -
            </Button>
            <span className="mx-4">{awakenings}</span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setAwakenings(awakenings + 1)}
            >
              +
            </Button>
          </div>
        </div>

        <Button
          className="w-full"
          onClick={handleSave}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Sleep Data
        </Button>
      </div>
    </Card>
  );
};
