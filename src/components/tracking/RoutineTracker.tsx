
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Save, Calendar, MapPin, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RoutineData } from "@/types/biometric";

interface RoutineTrackerProps {
  onSave: (routineData: RoutineData) => void;
}

export const RoutineTracker = ({ onSave }: RoutineTrackerProps) => {
  const { toast } = useToast();
  const [expectedActivity, setExpectedActivity] = useState("");
  const [actualActivity, setActualActivity] = useState("");
  const [deviationScore, setDeviationScore] = useState(0);
  const [location, setLocation] = useState("home");
  const [isUnexpectedChange, setIsUnexpectedChange] = useState(false);

  const locationOptions = [
    { value: "home", label: "Home" },
    { value: "school", label: "School" },
    { value: "work", label: "Work" },
    { value: "public", label: "Public Place" },
    { value: "transit", label: "In Transit" },
    { value: "unfamiliar", label: "Unfamiliar Place" },
    { value: "other", label: "Other" }
  ];

  const handleSave = () => {
    if (!expectedActivity || !actualActivity) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in both expected and actual activities"
      });
      return;
    }

    const routineData: RoutineData = {
      timestamp: new Date().toISOString(),
      expectedActivity,
      actualActivity,
      deviationScore,
      location,
      isUnexpectedChange
    };

    onSave(routineData);
    toast({
      title: "Routine change recorded",
      description: "Your schedule deviation has been logged"
    });
  };

  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Routine & Schedule</h2>
        <Calendar className="text-purple-500" />
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="expected">Expected Activity</Label>
          <Input
            id="expected"
            placeholder="What was scheduled?"
            value={expectedActivity}
            onChange={(e) => setExpectedActivity(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="actual">Actual Activity</Label>
          <Input
            id="actual"
            placeholder="What actually happened?"
            value={actualActivity}
            onChange={(e) => setActualActivity(e.target.value)}
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <Label>Deviation Impact</Label>
            <span className="text-sm">{
              deviationScore === 0 ? "None" :
              deviationScore < 30 ? "Minimal" :
              deviationScore < 60 ? "Moderate" :
              "Significant"
            }</span>
          </div>
          <Slider
            value={[deviationScore]}
            onValueChange={(values) => setDeviationScore(values[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="unexpected-change">Unexpected Change?</Label>
            <Switch
              id="unexpected-change"
              checked={isUnexpectedChange}
              onCheckedChange={setIsUnexpectedChange}
            />
            {isUnexpectedChange && (
              <AlertCircle className="h-4 w-4 text-amber-500" />
            )}
          </div>
          {isUnexpectedChange && (
            <p className="text-xs text-muted-foreground mt-1">
              Unexpected changes may have a greater impact on regulation
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center mb-1">
            <MapPin className="h-4 w-4 mr-1" />
            <Label>Location</Label>
          </div>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locationOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full"
          onClick={handleSave}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Routine Change
        </Button>
      </div>
    </Card>
  );
};
