
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  warningLevel: 'normal' | 'notice' | 'watch' | 'alert';
  onShowStrategies: () => void;
  onDismiss: () => void;
}

export const ActionButtons = ({ warningLevel, onShowStrategies, onDismiss }: ActionButtonsProps) => {
  return (
    <div className="flex gap-2 mt-3">
      <Button 
        onClick={onShowStrategies} 
        className={`flex-1 ${
          warningLevel === 'alert' ? 'bg-red-600 hover:bg-red-700' : 
          warningLevel === 'watch' ? 'bg-amber-600 hover:bg-amber-700' : 
          'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        View Strategies
      </Button>
      <Button 
        variant="outline" 
        onClick={onDismiss}
        className="flex-1"
      >
        <Check className="h-4 w-4 mr-2" />
        Acknowledge
      </Button>
    </div>
  );
};
