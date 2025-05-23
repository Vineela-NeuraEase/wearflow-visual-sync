
import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCw } from "lucide-react";

interface BreathingControlsProps {
  isBreathing: boolean;
  onToggleBreathing: () => void;
  onReset: () => void;
}

const BreathingControls: React.FC<BreathingControlsProps> = ({ 
  isBreathing, 
  onToggleBreathing,
  onReset
}) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <Button 
        onClick={onToggleBreathing}
        variant={isBreathing ? "destructive" : "default"}
        className="px-6 w-32"
        size="lg"
      >
        {isBreathing ? (
          <>
            <Pause className="mr-2 h-4 w-4" />
            Stop
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4" />
            Start
          </>
        )}
      </Button>
      
      {isBreathing && (
        <Button 
          onClick={onReset}
          variant="outline"
          size="lg"
        >
          <RotateCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      )}
    </div>
  );
};

export default BreathingControls;
