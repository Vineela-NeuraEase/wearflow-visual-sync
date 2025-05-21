
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

interface StrategiesSectionProps {
  strategies: string[];
  selectedStrategies: string[];
  onToggleStrategy: (strategy: string) => void;
  onAddCustomStrategy: (strategy: string) => void;
}

export const StrategiesSection = ({ 
  strategies, 
  selectedStrategies, 
  onToggleStrategy, 
  onAddCustomStrategy 
}: StrategiesSectionProps) => {
  const [customStrategy, setCustomStrategy] = useState<string>("");
  
  const handleAddCustomStrategy = () => {
    if (customStrategy.trim() && !selectedStrategies.includes(customStrategy)) {
      onAddCustomStrategy(customStrategy);
      setCustomStrategy("");
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {strategies.map((strategy) => (
          <Button
            key={strategy}
            type="button"
            variant={selectedStrategies.includes(strategy) ? "default" : "outline"}
            className={`justify-start h-auto py-2 px-3 ${
              selectedStrategies.includes(strategy) ? "bg-blue-500" : ""
            }`}
            onClick={() => onToggleStrategy(strategy)}
          >
            {strategy}
          </Button>
        ))}
      </div>
      
      {selectedStrategies.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Selected Strategies:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedStrategies.map((strategy) => (
              <div 
                key={strategy} 
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {strategy}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 ml-1 p-0"
                  onClick={() => onToggleStrategy(strategy)}
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
          placeholder="Add custom strategy"
          value={customStrategy}
          onChange={(e) => setCustomStrategy(e.target.value)}
          className="mr-2"
        />
        <Button onClick={handleAddCustomStrategy} size="icon" disabled={!customStrategy.trim()}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
