
import { useState } from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useAudio } from "@/context/AudioContext";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

// Import reusable components for meltdown tracking
import { IntensitySlider } from "@/components/meltdown/IntensitySlider";
import { DurationInput } from "@/components/meltdown/DurationInput";
import { TriggersSection } from "@/components/meltdown/TriggersSection";
import { StrategiesSection } from "@/components/meltdown/StrategiesSection";

// Import refactored components
import { SheetHeader } from "@/components/sheets/meltdown-logger/SheetHeader";
import { NotesSection } from "@/components/sheets/meltdown-logger/NotesSection";
import { SaveButton } from "@/components/sheets/meltdown-logger/SaveButton";

// Import trigger categories and coping strategies
import { triggerCategories, copingStrategies } from "@/components/sheets/meltdown-logger/meltdownData";

// Define props for MeltdownLoggerSheet
interface MeltdownLoggerSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

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
        <SheetHeader formattedDate={formattedDate} onClose={onClose} />

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
          
          {/* Notes section */}
          <NotesSection notes={notes} setNotes={setNotes} />
          
          {/* Save button */}
          <SaveButton onSave={handleSave} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MeltdownLoggerSheet;
