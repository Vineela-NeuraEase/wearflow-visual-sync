
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ToolCircle from "./ToolCircle";

type QuickRingOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

const QuickRingOverlay = ({ isOpen, onClose }: QuickRingOverlayProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-screen bg-black/60 p-0 rounded-none border-none">
        <ToolCircle onClose={onClose} />
      </SheetContent>
    </Sheet>
  );
};

export default QuickRingOverlay;
