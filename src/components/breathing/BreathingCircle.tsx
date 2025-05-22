
import { motion } from "framer-motion";
import { BreathState, BreathingTechnique } from "./types";

type BreathingCircleProps = {
  breathState: BreathState;
  counter: number;
  selectedTechnique: BreathingTechnique;
};

export const BreathingCircle = ({ breathState, counter, selectedTechnique }: BreathingCircleProps) => {
  const circleVariants = {
    inhale: {
      scale: 1.2,
      borderColor: "rgba(59, 130, 246, 0.8)",
      boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
      transition: { duration: selectedTechnique.inhaleTime, ease: "easeInOut" }
    },
    exhale: {
      scale: 1,
      borderColor: "rgba(191, 219, 254, 0.8)",
      boxShadow: "0 0 10px rgba(191, 219, 254, 0.2)",
      transition: { duration: selectedTechnique.exhaleTime, ease: "easeInOut" }
    },
    hold: {
      scale: 1.2,
      borderColor: "rgba(124, 58, 237, 0.8)",
      boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
      transition: { duration: 0.3 }
    },
    rest: {
      scale: 1,
      borderColor: "rgba(147, 197, 253, 0.8)",
      boxShadow: "0 0 10px rgba(147, 197, 253, 0.2)",
      transition: { duration: 0.3 }
    },
    idle: {
      scale: 1,
      borderColor: "rgba(191, 219, 254, 0.8)",
      boxShadow: "0 0 10px rgba(191, 219, 254, 0.2)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="relative w-64 h-64 flex items-center justify-center mb-8">
      <motion.div 
        className="absolute inset-0 rounded-full border-8"
        variants={circleVariants}
        animate={breathState}
        initial="idle"
      ></motion.div>
      <div className="z-10 text-center">
        <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-300 dark:to-indigo-400">
          {counter}
        </span>
        <p className="text-xl mt-2 font-medium text-blue-600 dark:text-blue-300">
          {breathState === "inhale" 
            ? "Breathe in..." 
            : breathState === "hold" 
            ? "Hold..." 
            : breathState === "exhale" 
            ? "Breathe out..." 
            : breathState === "rest"
            ? "Rest..."
            : "Ready?"}
        </p>
      </div>
    </div>
  );
};
