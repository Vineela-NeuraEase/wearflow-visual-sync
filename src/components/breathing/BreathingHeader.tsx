
import { Button } from "@/components/ui/button";
import { X, Music } from "lucide-react";

interface BreathingHeaderProps {
  onExit: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export function BreathingHeader({ onExit, soundEnabled, onToggleSound }: BreathingHeaderProps) {
  return (
    <div className="flex justify-between items-center p-4">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onExit}
        className="hover:bg-blue-100"
      >
        <X className="h-6 w-6" />
      </Button>
      
      <h1 className="text-2xl font-semibold text-indigo-800">Breathing Exercise</h1>
      
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onToggleSound}
        className="hover:bg-blue-100"
      >
        <Music className={`h-6 w-6 ${soundEnabled ? 'text-indigo-600' : 'text-gray-400'}`} />
      </Button>
    </div>
  );
}
