
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import QuickRingOverlay from "./overlay/QuickRingOverlay";

const FloatingActionButton = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const openOverlay = () => {
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-20 right-4">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          onClick={openOverlay}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
      
      <QuickRingOverlay isOpen={isOverlayOpen} onClose={closeOverlay} />
    </>
  );
};

export default FloatingActionButton;
