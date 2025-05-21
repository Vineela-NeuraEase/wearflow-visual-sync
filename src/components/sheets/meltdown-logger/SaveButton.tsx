
import { Button } from "@/components/ui/button";

interface SaveButtonProps {
  onSave: () => void;
}

export const SaveButton = ({ onSave }: SaveButtonProps) => {
  return (
    <Button 
      onClick={onSave}
      className="w-full py-6 text-lg rounded-xl bg-amber-500 hover:bg-amber-600"
    >
      Save Meltdown Log
    </Button>
  );
};
