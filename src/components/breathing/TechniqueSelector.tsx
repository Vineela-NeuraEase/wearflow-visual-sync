
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { BreathingTechnique } from "./types";
import { breathingTechniques } from "./breathingTechniques";

type TechniqueSelectorProps = {
  selectedTechnique: BreathingTechnique;
  onTechniqueChange: (techniqueId: string) => void;
  disabled: boolean;
};

export const TechniqueSelector = ({
  selectedTechnique,
  onTechniqueChange,
  disabled,
}: TechniqueSelectorProps) => {
  return (
    <div className="w-full max-w-md mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">Breathing Technique</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Info className="h-4 w-4 text-blue-500" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">{selectedTechnique.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedTechnique.description}
                    </p>
                    <h4 className="text-sm font-medium mt-2">Benefits:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedTechnique.benefits}
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
            <TooltipContent>
              <p>View technique details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Select
        value={selectedTechnique.id}
        onValueChange={onTechniqueChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select technique" />
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
};
