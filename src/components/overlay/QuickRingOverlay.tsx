
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, AlertTriangle, Wind, Mic, Music, Eye } from "lucide-react";
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

  const toolOptions = [
    { name: "Breathe", icon: <Wind className="h-10 w-10 text-tool-blue mb-2" />, path: "/breathing", bgColor: "bg-calm-blue hover:bg-calm-blue/80" },
    { name: "SOS", icon: <AlertTriangle className="h-10 w-10 text-red-500 mb-2" />, path: "/sos", bgColor: "bg-red-200 hover:bg-red-300" },
    { name: "Visual", icon: <Eye className="h-10 w-10 text-purple-500 mb-2" />, path: "/visual", bgColor: "bg-purple-200 hover:bg-purple-300" },
    { name: "Haptic", icon: <Mic className="h-10 w-10 text-pink-500 mb-2" />, path: "/haptic", bgColor: "bg-pink-200 hover:bg-pink-300" },
    { name: "Sounds", icon: <Music className="h-10 w-10 text-green-500 mb-2" />, path: "/sounds", bgColor: "bg-green-200 hover:bg-green-300" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-screen bg-gray-500/70 p-0 rounded-none">
        <div className="flex justify-center items-center h-full">
          <div className="relative">
            {/* Center close button */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
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

            {/* Tool buttons in a circle */}
            <div className="relative w-[280px] h-[280px]">
              {toolOptions.map((tool, index) => {
                // Calculate position in a circle
                const angle = (index * (360 / toolOptions.length) - 90) * (Math.PI / 180);
                const radius = 120; // Distance from center
                
                // Calculate X and Y positions
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={tool.path}
                    className="absolute"
                    style={{ 
                      left: `calc(50% + ${x}px - 50px)`, 
                      top: `calc(50% + ${y}px - 50px)` 
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className={`w-28 h-28 rounded-xl ${tool.bgColor} flex flex-col items-center justify-center`}
                      onClick={() => handleNavigation(tool.path)}
                    >
                      {tool.icon}
                      <span>{tool.name}</span>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default QuickRingOverlay;
