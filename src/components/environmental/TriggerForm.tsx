
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

interface TriggerFormProps {
  onSave: (trigger: any) => void;
  onCancel: () => void;
}

export const TriggerForm = ({ onSave, onCancel }: TriggerFormProps) => {
  const { toast } = useToast();
  
  const [newTrigger, setNewTrigger] = useState({
    name: "",
    category: "Other",
    sensitivity: 50,
    notes: ""
  });
  
  const handleSaveTrigger = () => {
    if (newTrigger.name.trim() === "") {
      toast({
        title: "Missing information",
        description: "Please provide a name for the trigger",
        variant: "destructive"
      });
      return;
    }
    
    onSave(newTrigger);
    
    setNewTrigger({
      name: "",
      category: "Other",
      sensitivity: 50,
      notes: ""
    });
  };
  
  return (
    <Card className="p-5 bg-blue-50">
      <h3 className="font-medium mb-4">Add New Trigger</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="trigger-name">Trigger Name</Label>
          <input
            id="trigger-name"
            className="w-full p-2 rounded border mt-1"
            value={newTrigger.name}
            onChange={(e) => setNewTrigger({...newTrigger, name: e.target.value})}
            placeholder="e.g., Specific fabric texture, sound type"
          />
        </div>
        
        <div>
          <Label htmlFor="trigger-category">Category</Label>
          <select
            id="trigger-category"
            className="w-full p-2 rounded border mt-1"
            value={newTrigger.category}
            onChange={(e) => setNewTrigger({...newTrigger, category: e.target.value})}
          >
            <option value="Auditory">Auditory</option>
            <option value="Visual">Visual</option>
            <option value="Tactile">Tactile</option>
            <option value="Social/Physical">Social/Physical</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div>
          <div className="flex justify-between">
            <Label>Sensitivity Level</Label>
            <span>{newTrigger.sensitivity}%</span>
          </div>
          <Slider
            value={[newTrigger.sensitivity]}
            onValueChange={(values) => setNewTrigger({...newTrigger, sensitivity: values[0]})}
            max={100}
            step={5}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="trigger-notes">Notes (Optional)</Label>
          <textarea
            id="trigger-notes"
            className="w-full p-2 rounded border mt-1"
            value={newTrigger.notes}
            onChange={(e) => setNewTrigger({...newTrigger, notes: e.target.value})}
            placeholder="Any specific details about this trigger"
            rows={3}
          />
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={handleSaveTrigger}
            className="flex-1"
          >
            Save Trigger
          </Button>
          <Button 
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  );
};
