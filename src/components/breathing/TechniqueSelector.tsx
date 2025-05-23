
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BREATHING_TECHNIQUES, BreathingTechnique } from "@/data/breathingTechniques";

interface TechniqueSelectorProps {
  selectedTechnique: string;
  onTechniqueChange: (value: string) => void;
  technique: BreathingTechnique;
}

const TechniqueSelector: React.FC<TechniqueSelectorProps> = ({
  selectedTechnique,
  onTechniqueChange,
  technique
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex-1">
        <div className="flex items-center">
          <Select value={selectedTechnique} onValueChange={onTechniqueChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select technique" />
            </SelectTrigger>
            <SelectContent>
              {BREATHING_TECHNIQUES.map(tech => (
                <SelectItem key={tech.id} value={tech.id}>{tech.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Info className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-2">
                <h3 className="font-medium">{technique.name}</h3>
                <p className="text-sm text-muted-foreground">{technique.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {technique.phases.filter(p => p).map((phase, idx) => (
                    <div key={idx} className="text-xs bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded flex items-center">
                      <span className="mr-1">{phase}:</span> 
                      <span className="font-medium">{technique.pattern[idx]}s</span>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default TechniqueSelector;
