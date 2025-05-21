
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { ChevronLeft } from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

// Import reusable components for meltdown tracking
import { IntensitySlider } from "@/components/meltdown/IntensitySlider";
import { DurationInput } from "@/components/meltdown/DurationInput";
import { TriggersSection } from "@/components/meltdown/TriggersSection";
import { StrategiesSection } from "@/components/meltdown/StrategiesSection";

// Define props for MeltdownLoggerSheet
interface MeltdownLoggerSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

// Predefined trigger categories - same as in MeltdownLogger.tsx
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

// Predefined coping strategies - same as in MeltdownLogger.tsx
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

const MeltdownLoggerSheet = ({ isOpen, onClose }: MeltdownLoggerSheetProps) => {
  const { play } = useAudio();
  const { toast } = useToast();
  
  // State for meltdown data
  const [intensity, setIntensity] = useState<number>(5);
  const [duration, setDuration] = useState<string>("15");
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>("");
  
  // Current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  
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
    
    // Reset form and close sheet
    resetForm();
    onClose();
  };
  
  // Reset form fields
  const resetForm = () => {
    setIntensity(5);
    setDuration("15");
    setSelectedTriggers([]);
    setSelectedStrategies([]);
    setNotes("");
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
      }
    }}>
      <DrawerContent className="max-w-md mx-auto rounded-t-[30px] p-0">
        <div className="bg-amber-100 p-4 rounded-t-[30px]">
          <DrawerHeader className="text-left p-0">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <h2 className="text-2xl font-bold ml-2">Log Meltdown</h2>
            </div>
          </DrawerHeader>
          
          <p className="mt-2 text-sm text-gray-700 px-2">
            {formattedDate}
          </p>
        </div>

        <div className="p-4 overflow-y-auto max-h-[75vh]">
          {/* Intensity slider */}
          <Card className="p-4 mb-4">
            <h2 className="text-lg font-medium mb-4">Intensity</h2>
            <IntensitySlider 
              intensity={intensity} 
              onChange={setIntensity} 
            />
          </Card>
          
          {/* Duration input */}
          <Card className="p-4 mb-4">
            <h2 className="text-lg font-medium mb-4">Duration (minutes)</h2>
            <DurationInput 
              duration={duration} 
              onChange={setDuration} 
            />
          </Card>
          
          {/* Triggers selection */}
          <Card className="p-4 mb-4">
            <h2 className="text-lg font-medium mb-4">Triggers</h2>
            <TriggersSection 
              categories={triggerCategories}
              selectedTriggers={selectedTriggers}
              onToggleTrigger={toggleTrigger}
              onAddCustomTrigger={addCustomTrigger}
            />
          </Card>
          
          {/* Coping strategies */}
          <Card className="p-4 mb-4">
            <h2 className="text-lg font-medium mb-4">Coping Strategies Used</h2>
            <StrategiesSection 
              strategies={copingStrategies}
              selectedStrategies={selectedStrategies}
              onToggleStrategy={toggleStrategy}
              onAddCustomStrategy={addCustomStrategy}
            />
          </Card>
          
          {/* Notes */}
          <Card className="p-4 mb-6">
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
      </DrawerContent>
    </Drawer>
  );
};

export default MeltdownLoggerSheet;
