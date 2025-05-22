
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface StartButtonProps {
  onStart: () => void;
}

export function StartButton({ onStart }: StartButtonProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-8"
    >
      <Button 
        className="px-12 py-6 text-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
        onClick={onStart}
      >
        Start Breathing
      </Button>
    </motion.div>
  );
}
