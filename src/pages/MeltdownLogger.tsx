
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAudio } from "@/context/AudioContext";

// Import refactored components
import { IntensitySlider } from "@/components/meltdown/IntensitySlider";
import { DurationInput } from "@/components/meltdown/DurationInput";
import { TriggersSection } from "@/components/meltdown/TriggersSection";
import { StrategiesSection } from "@/components/meltdown/StrategiesSection";

// Predefined trigger categories
const triggerCategories = [
  { name: "Noise", examples: "Loud sounds, sudden noises, specific frequencies" },
  { name: "Visual", examples: "Bright lights, flashing, visual patterns" },
  { name: "Tactile", examples: "Certain textures, tight clothing, touch" },
  { name: "Social", examples: "Crowds, social expectations, communication" },
  { name: "Change", examples: "Unexpected changes, transitions, surprises" },
  { name: "Environmental", examples: "Temperature, smells, air quality" },
  { name: "Internal", examples: "Hunger, fatigue, pain, illness" },
  { name: "Emotional", examples: "Stress, anxiety, frustration, excitement" }
];

// Predefined coping strategies
const copingStrategies = [
  "Deep breathing",
  "Sensory tool use",
  "Removing from situation",
  "Pressure/weighted items",
  "Sound dampening",
  "Stim toys/fidgets",
  "Visual blockers",
  "Verbal scripts",
  "Movement/exercise",
  "Quiet space",
  "Support person",
  "Other"
];

const MeltdownLogger = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { play } = useAudio();
  
  // State for meltdown data
  const [intensity, setIntensity] = useState<number>(5);
  const [duration, setDuration] = useState<string>("15");
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>("");
  
  // Handle trigger selection
  const toggleTrigger = (trigger: string) => {
    if (selectedTriggers.includes(trigger)) {
      setSelectedTriggers(selectedTriggers.filter(t => t !== trigger));
    } else {
      setSelectedTriggers([...selectedTriggers, trigger]);
      play("pop");
    }
  };
  
  // Handle adding custom trigger
  const addCustomTrigger = (customTrigger: string) => {
    setSelectedTriggers([...selectedTriggers, customTrigger]);
    play("pop");
  };
  
  // Handle strategy selection
  const toggleStrategy = (strategy: string) => {
    if (selectedStrategies.includes(strategy)) {
      setSelectedStrategies(selectedStrategies.filter(s => s !== strategy));
    } else {
      setSelectedStrategies([...selectedStrategies, strategy]);
      play("pop");
    }
  };
  
  // Handle adding custom strategy
  const addCustomStrategy = (customStrategy: string) => {
    setSelectedStrategies([...selectedStrategies, customStrategy]);
    play("pop");
  };
  
  // Handle save
  const handleSave = () => {
    // Here you would typically save the data to your state management or database
    toast({
      title: "Meltdown logged",
      description: "Your meltdown data has been saved successfully.",
    });
    play("success");
    navigate("/emotion-hub");
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="rounded-xl bg-amber-100 p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Log Meltdown</h1>
        </div>
      </div>

      <div className="px-4 space-y-6">
        <Card className="p-4 bg-amber-50 rounded-xl">
          <p className="text-sm text-gray-600 mb-4">
            Track meltdown details to identify patterns and develop better coping strategies.
          </p>
        </Card>
        
        {/* Intensity slider */}
        <Card className="p-4">
          <h2 className="text-lg font-medium mb-4">Intensity</h2>
          <IntensitySlider 
            intensity={intensity} 
            onChange={setIntensity} 
          />
        </Card>
        
        {/* Duration input */}
        <Card className="p-4">
          <h2 className="text-lg font-medium mb-4">Duration (minutes)</h2>
          <DurationInput 
            duration={duration} 
            onChange={setDuration} 
          />
        </Card>
        
        {/* Triggers selection */}
        <Card className="p-4">
          <h2 className="text-lg font-medium mb-4">Triggers</h2>
          <TriggersSection 
            categories={triggerCategories}
            selectedTriggers={selectedTriggers}
            onToggleTrigger={toggleTrigger}
            onAddCustomTrigger={addCustomTrigger}
          />
        </Card>
        
        {/* Coping strategies */}
        <Card className="p-4">
          <h2 className="text-lg font-medium mb-4">Coping Strategies Used</h2>
          <StrategiesSection 
            strategies={copingStrategies}
            selectedStrategies={selectedStrategies}
            onToggleStrategy={toggleStrategy}
            onAddCustomStrategy={addCustomStrategy}
          />
        </Card>
        
        {/* Notes */}
        <Card className="p-4">
          <h2 className="text-lg font-medium mb-4">Notes</h2>
          <Textarea
            placeholder="Add any additional notes or observations..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </Card>
        
        {/* Save button */}
        <Button 
          onClick={handleSave}
          className="w-full py-6 text-lg rounded-xl bg-amber-500 hover:bg-amber-600"
        >
          Save Meltdown Log
        </Button>
      </div>
    </div>
  );
};

export default MeltdownLogger;
