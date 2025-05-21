
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

interface TriggerCategory {
  name: string;
  examples: string;
}

interface TriggersSectionProps {
  categories: TriggerCategory[];
  selectedTriggers: string[];
  onToggleTrigger: (trigger: string) => void;
  onAddCustomTrigger: (trigger: string) => void;
}

export const TriggersSection = ({ 
  categories, 
  selectedTriggers, 
  onToggleTrigger, 
  onAddCustomTrigger 
}: TriggersSectionProps) => {
  const { play } = useAudio();
  const [customTrigger, setCustomTrigger] = useState<string>("");
  
  const handleAddCustomTrigger = () => {
    if (customTrigger.trim() && !selectedTriggers.includes(customTrigger)) {
      onAddCustomTrigger(customTrigger);
      setCustomTrigger("");
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category) => (
          <Button
            key={category.name}
            type="button"
            variant={selectedTriggers.includes(category.name) ? "default" : "outline"}
            className={`justify-start h-auto py-2 px-3 ${
              selectedTriggers.includes(category.name) ? "bg-amber-500" : ""
            }`}
            onClick={() => onToggleTrigger(category.name)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      
      {selectedTriggers.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Selected Triggers:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedTriggers.map((trigger) => (
              <div 
                key={trigger} 
                className="flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
              >
                {trigger}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 ml-1 p-0"
                  onClick={() => onToggleTrigger(trigger)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex items-center mt-4">
        <Input
          placeholder="Add custom trigger"
          value={customTrigger}
          onChange={(e) => setCustomTrigger(e.target.value)}
          className="mr-2"
        />
        <Button onClick={handleAddCustomTrigger} size="icon" disabled={!customTrigger.trim()}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
