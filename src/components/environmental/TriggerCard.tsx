
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Trigger {
  name: string;
  category: string;
  sensitivity: number;
  notes?: string;
}

interface TriggerCardProps {
  trigger: Trigger;
}

export const TriggerCard = ({ trigger }: TriggerCardProps) => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{trigger.name}</h3>
          <span className="text-sm text-muted-foreground">Category: {trigger.category}</span>
        </div>
        <span className={`px-2 py-1 rounded text-xs ${
          trigger.sensitivity > 80 ? 'bg-red-100 text-red-800' :
          trigger.sensitivity > 60 ? 'bg-amber-100 text-amber-800' :
          'bg-green-100 text-green-800'
        }`}>
          {trigger.sensitivity}% sensitivity
        </span>
      </div>
      
      {trigger.notes && (
        <p className="mt-2 text-sm">
          {trigger.notes}
        </p>
      )}
      
      <div className="flex gap-2 mt-3">
        <Button size="sm" variant="outline" className="text-xs">
          Edit
        </Button>
        <Button size="sm" variant="outline" className="text-xs">
          Log Occurrence
        </Button>
      </div>
    </Card>
  );
};
