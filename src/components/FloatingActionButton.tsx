
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
        className="fixed bottom-20 right-4 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20 
        }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 relative overflow-hidden"
          onClick={openOverlay}
        >
          <motion.div
            className="absolute inset-0 bg-purple-400 opacity-30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.2, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <Plus className="h-6 w-6" />
        </Button>
      </motion.div>
      
      <QuickRingOverlay isOpen={isOverlayOpen} onClose={closeOverlay} />
    </>
  );
};

export default FloatingActionButton;
