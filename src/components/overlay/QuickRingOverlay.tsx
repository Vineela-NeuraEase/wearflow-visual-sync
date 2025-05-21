
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ToolCircle from "./ToolCircle";

type QuickRingOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

const QuickRingOverlay = ({ isOpen, onClose }: QuickRingOverlayProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-screen bg-gray-500/70 p-0 rounded-none">
        <ToolCircle onClose={onClose} />
      </SheetContent>
    </Sheet>
  );
};

export default QuickRingOverlay;
