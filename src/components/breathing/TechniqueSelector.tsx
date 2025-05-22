
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import { breathingTechniques, BreathingTechnique } from "./types";

interface TechniqueSelectorProps {
  selectedTechnique: BreathingTechnique;
  onTechniqueChange: (techniqueId: string) => void;
}

export function TechniqueSelector({ 
  selectedTechnique, 
  onTechniqueChange 
}: TechniqueSelectorProps) {
  return (
    <div className="w-full max-w-md mb-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium text-indigo-700">Choose Technique</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                    <Info className="h-4 w-4 text-indigo-600" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">About {selectedTechnique.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedTechnique.description}</p>
                    <h4 className="text-sm font-medium pt-2">Benefits:</h4>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      {selectedTechnique.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
            <TooltipContent>
              <p>Learn about this technique</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Select
        value={selectedTechnique.id}
        onValueChange={(value) => onTechniqueChange(value)}
      >
        <SelectTrigger className="w-full bg-white border-indigo-200">
          <SelectValue placeholder="Select a breathing technique" />
        </SelectTrigger>
        <SelectContent>
          {breathingTechniques.map((technique) => (
            <SelectItem key={technique.id} value={technique.id}>
              {technique.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
