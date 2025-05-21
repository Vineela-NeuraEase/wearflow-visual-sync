
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface ToolOption {
  name: string;
  icon: React.ReactNode;
  path: string;
  bgColor: string;
}

interface ToolButtonProps {
  tool: ToolOption;
  index: number;
  onClick: () => void;
  radius?: number;
}

const ToolButton = ({ 
  tool, 
  index, 
  onClick, 
  radius = 120 
}: ToolButtonProps) => {
  // Calculate position in a circle
  const angle = (index * (360 / 5) - 90) * (Math.PI / 180);
  
  // Calculate X and Y positions
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <motion.div
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
        onClick={onClick}
      >
        {tool.icon}
        <span>{tool.name}</span>
      </Button>
    </motion.div>
  );
};

export default ToolButton;
