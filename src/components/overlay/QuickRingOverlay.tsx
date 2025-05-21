
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, AlertTriangle, Wind, Mic, Music } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAudio } from "@/context/AudioContext";
import { motion } from "framer-motion";

type QuickRingOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

const QuickRingOverlay = ({ isOpen, onClose }: QuickRingOverlayProps) => {
  const navigate = useNavigate();
  const { play } = useAudio();

  const handleNavigation = (path: string) => {
    play("whoosh");
    navigate(path);
    onClose();
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: custom * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }),
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const closeButtonVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3,
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: { 
      scale: 1.1,
      rotate: 90,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-screen bg-gray-500/70 p-0 rounded-none">
        <div className="flex justify-center items-center h-full">
          <div className="grid grid-cols-3 gap-4 max-w-xs">
            {/* Top button */}
            <div className="col-start-2">
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                custom={1}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  className="bg-calm-blue w-28 h-28 rounded-xl hover:bg-calm-blue/80 flex flex-col items-center"
                  onClick={() => handleNavigation("/breathing")}
                >
                  <Wind className="h-10 w-10 text-tool-blue mb-2" />
                  <span>Breathe</span>
                </Button>
              </motion.div>
            </div>

            {/* Left button */}
            <div className="col-start-1 row-start-2">
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                custom={2}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  className="bg-red-200 w-28 h-28 rounded-xl hover:bg-red-300 flex flex-col items-center"
                  onClick={() => handleNavigation("/sos")}
                >
                  <AlertTriangle className="h-10 w-10 text-red-500 mb-2" />
                  <span>SOS</span>
                </Button>
              </motion.div>
            </div>

            {/* Center button (close) */}
            <div className="col-start-2 row-start-2">
              <motion.div
                variants={closeButtonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="outline"
                  className="bg-white w-16 h-16 rounded-full hover:bg-gray-100"
                  onClick={() => {
                    play("click");
                    onClose();
                  }}
                >
                  <X className="h-6 w-6" />
                </Button>
              </motion.div>
            </div>

            {/* Right button */}
            <div className="col-start-3 row-start-2">
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                custom={3}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  className="bg-purple-200 w-28 h-28 rounded-xl hover:bg-purple-300 flex flex-col items-center"
                  onClick={() => handleNavigation("/visual")}
                >
                  <svg className="h-10 w-10 text-purple-500 mb-2" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 12H5.01M19 12H19.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19V19.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 1C10.22 1 8.47991 1.52784 6.99987 2.51677C5.51983 3.50571 4.36628 4.91131 3.68509 6.55585C3.0039 8.20038 2.82567 10.01 3.17294 11.7558C3.5202 13.5016 4.37737 15.1053 5.63604 16.364C6.89472 17.6226 8.49836 18.4798 10.2442 18.8271C11.99 19.1743 13.7996 18.9961 15.4442 18.3149C17.0887 17.6337 18.4943 16.4802 19.4832 15.0001C20.4722 13.5201 21 11.78 21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Visual</span>
                </Button>
              </motion.div>
            </div>

            {/* Bottom row */}
            <div className="col-start-1 col-span-1 row-start-3">
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                custom={4}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  className="bg-pink-200 w-28 h-28 rounded-xl hover:bg-pink-300 flex flex-col items-center"
                  onClick={() => handleNavigation("/haptic")}
                >
                  <Mic className="h-10 w-10 text-pink-500 mb-2" />
                  <span>Haptic</span>
                </Button>
              </motion.div>
            </div>

            <div className="col-start-3 col-span-1 row-start-3">
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                custom={5}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  className="bg-green-200 w-28 h-28 rounded-xl hover:bg-green-300 flex flex-col items-center"
                  onClick={() => handleNavigation("/sounds")}
                >
                  <Music className="h-10 w-10 text-green-500 mb-2" />
                  <span>Sounds</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default QuickRingOverlay;
