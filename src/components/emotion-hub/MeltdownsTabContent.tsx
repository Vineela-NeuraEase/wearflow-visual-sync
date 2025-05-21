
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MeltdownLogItemProps {
  intensity: string;
  trigger: string;
  date: string;
  duration: string;
  triggers: string[];
}

export const MeltdownLogItem = ({ intensity, trigger, date, duration, triggers }: MeltdownLogItemProps) => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800">
            {intensity}
          </span>
          <h4 className="font-medium mt-1">{trigger}</h4>
        </div>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <div className="flex mt-2">
        <div className="mr-4">
          <span className="text-xs text-gray-500">Duration</span>
          <p>{duration}</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Triggers</span>
          <p>{triggers.join(", ")}</p>
        </div>
      </div>
    </Card>
  );
};

interface MeltdownsTabContentProps {
  setIsMeltdownLoggerOpen: (isOpen: boolean) => void;
}

const MeltdownsTabContent = ({ setIsMeltdownLoggerOpen }: MeltdownsTabContentProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-amber-50 rounded-xl">
        <h2 className="text-lg font-medium mb-2">Meltdown Tracking</h2>
        <p className="text-sm text-gray-600 mb-4">
          Log and monitor meltdowns to identify triggers and effective coping strategies.
        </p>
        <Button 
          className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-6"
          onClick={() => setIsMeltdownLoggerOpen(true)}
        >
          <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
          Log New Meltdown
        </Button>
      </Card>
      
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Recent Meltdowns</h3>
        <Button variant="link" onClick={() => navigate("/meltdown-history")}>
          View History
        </Button>
      </div>
      
      <div className="space-y-3">
        <MeltdownLogItem
          intensity="Moderate Intensity"
          trigger="Loud environment"
          date="3 days ago"
          duration="25 min"
          triggers={["Noise", "Crowds"]}
        />
      </div>
    </div>
  );
};

export default MeltdownsTabContent;
