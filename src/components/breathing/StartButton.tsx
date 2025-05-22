
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type StartButtonProps = {
  onStart: () => void;
};

export const StartButton = ({ onStart }: StartButtonProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-8"
    >
      <Button 
        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-12 py-6 text-xl rounded-full shadow-lg hover:shadow-xl transition-all"
        onClick={onStart}
      >
        Start Breathing
      </Button>
    </motion.div>
  );
};
