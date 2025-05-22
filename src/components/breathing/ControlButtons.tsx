
import { Button } from "@/components/ui/button";
import { X, Music } from "lucide-react";

type ControlButtonsProps = {
  onStop: () => void;
  onToggleSound: () => void;
  soundEnabled: boolean;
};

export const ControlButtons = ({ onStop, onToggleSound, soundEnabled }: ControlButtonsProps) => {
  return (
    <div className="w-full max-w-md flex justify-between mt-6 mb-6 space-x-4">
      <Button 
        variant="outline" 
        className="flex-1 bg-white dark:bg-transparent border-blue-200 dark:border-blue-800"
        onClick={onStop}
      >
        <X className="mr-2 h-4 w-4" /> Stop
      </Button>
      
      <Button 
        variant="outline" 
        className={`flex-1 ${soundEnabled ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-white dark:bg-transparent'}`}
        onClick={onToggleSound}
      >
        <Music className="mr-2 h-4 w-4" /> Sound
      </Button>
    </div>
  );
};
