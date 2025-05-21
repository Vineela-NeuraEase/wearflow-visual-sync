
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import QuickRingOverlay from "./overlay/QuickRingOverlay";
import { useAudio } from "@/context/AudioContext";
import { motion } from "framer-motion";

const FloatingActionButton = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const { play } = useAudio();

  const openOverlay = () => {
    play("pop");
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <>
      <motion.div 
        className="fixed bottom-20 right-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20 
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          onClick={openOverlay}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </motion.div>
      
      <QuickRingOverlay isOpen={isOverlayOpen} onClose={closeOverlay} />
    </>
  );
};

export default FloatingActionButton;
