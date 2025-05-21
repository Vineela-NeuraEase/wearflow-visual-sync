
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MeltdownListItemProps {
  meltdown: {
    id: number;
    date: string;
    intensity: number;
    duration: number;
    triggers: string[];
    strategies: string[];
    notes?: string;
    time: string;
  };
}

const getIntensityColor = (intensity: number) => {
  if (intensity <= 3) return "bg-green-100 text-green-800";
  if (intensity <= 6) return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
};

const getIntensityLabel = (intensity: number) => {
  if (intensity <= 3) return "Mild";
  if (intensity <= 6) return "Moderate";
  return "Severe";
};

export const MeltdownListItem = ({ meltdown }: MeltdownListItemProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className={`px-3 py-1 rounded-full text-sm ${getIntensityColor(meltdown.intensity)}`}>
            {getIntensityLabel(meltdown.intensity)} ({meltdown.intensity}/10)
          </span>
          <div className="mt-1 text-gray-600">
            {new Date(meltdown.date).toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })} at {meltdown.time}
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gray-500" />
            <span>{meltdown.duration} min</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-medium mb-1">Triggers:</h3>
          <div className="flex flex-wrap gap-2">
            {meltdown.triggers.map((trigger) => (
              <span 
                key={trigger} 
                className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs"
              >
                {trigger}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-1">Strategies Used:</h3>
          <div className="flex flex-wrap gap-2">
            {meltdown.strategies.map((strategy) => (
              <span 
                key={strategy} 
                className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
              >
                {strategy}
              </span>
            ))}
          </div>
        </div>
        
        {meltdown.notes && (
          <div>
            <h3 className="text-sm font-medium mb-1">Notes:</h3>
            <p className="text-sm text-gray-600">{meltdown.notes}</p>
          </div>
        )}
      </div>
      
      <Button 
        variant="link" 
        className="mt-2 px-0 text-amber-600"
        onClick={() => navigate(`/meltdown-details/${meltdown.id}`)}
      >
        View Details
      </Button>
    </Card>
  );
};
