
import { Button } from "@/components/ui/button";

interface SaveButtonProps {
  onSave: () => void;
  label?: string;
}

export const SaveButton = ({ onSave, label = "Save Meltdown Log" }: SaveButtonProps) => {
  return (
    <Button 
      onClick={onSave}
      className="w-full py-6 text-lg rounded-xl bg-amber-500 hover:bg-amber-600"
    >
      {label}
    </Button>
  );
};
