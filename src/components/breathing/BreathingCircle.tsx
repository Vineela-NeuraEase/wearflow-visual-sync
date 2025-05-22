
import { motion, AnimatePresence } from "framer-motion";
import { BreathState, BreathingTechnique } from "./types";

interface BreathingCircleProps {
  breathState: BreathState;
  counter: number;
  selectedTechnique: BreathingTechnique;
}

export function BreathingCircle({
  breathState,
  counter,
  selectedTechnique,
}: BreathingCircleProps) {
  const getStateMessage = () => {
    switch (breathState) {
      case "inhale": return "Breathe in...";
      case "hold": return "Hold...";
      case "exhale": return "Breathe out...";
      case "rest": return "Rest...";
      default: return "Ready?";
    }
  };

  const circleVariants = {
    inhale: {
      scale: 1.2,
      boxShadow: `0 0 30px 5px rgba(120, 180, 255, 0.7)`,
      transition: { duration: selectedTechnique.timing.inhale, ease: "easeInOut" }
    },
    hold: {
      scale: 1.2,
      boxShadow: `0 0 30px 5px rgba(180, 120, 255, 0.7)`,
      transition: { duration: selectedTechnique.timing.hold1 || 0.1, ease: "linear" }
    },
    exhale: {
      scale: 1,
      boxShadow: `0 0 15px 3px rgba(120, 180, 255, 0.4)`,
      transition: { duration: selectedTechnique.timing.exhale, ease: "easeInOut" }
    },
    rest: {
      scale: 1,
      boxShadow: `0 0 15px 3px rgba(120, 220, 180, 0.4)`,
      transition: { duration: selectedTechnique.timing.hold2 || 0.1, ease: "linear" }
    },
    idle: {
      scale: 1,
      boxShadow: `0 0 10px 2px rgba(120, 180, 255, 0.3)`,
      transition: { duration: 0.1 }
    }
  };

  return (
    <div className="relative w-64 h-64 flex items-center justify-center mb-8">
      <motion.div 
        className={`absolute inset-0 rounded-full bg-gradient-to-r ${selectedTechnique.color}`}
        style={{
          filter: "blur(1px)",
        }}
        animate={breathState}
        variants={circleVariants}
      />
      <motion.div 
        className="absolute inset-2 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm flex items-center justify-center"
        style={{
          boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.8)",
        }}
      >
        <div className="z-10 text-center">
          <span className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            {counter}
          </span>
          <p className="text-xl mt-2 font-medium text-indigo-800 dark:text-indigo-300">
            {getStateMessage()}
          </p>
        </div>
      </motion.div>
      
      {/* Animated particles/bubbles */}
      <AnimatePresence>
        {breathState === "inhale" && (
          Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`inhale-particle-${i}`}
              className="absolute rounded-full bg-blue-400/30"
              initial={{ 
                x: -100 - Math.random() * 50,
                y: Math.random() * 200 - 100,
                scale: 0,
                opacity: 0.7
              }}
              animate={{ 
                x: 0, 
                scale: Math.random() * 0.5 + 0.5,
                opacity: 0
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: selectedTechnique.timing.inhale * 0.8, 
                delay: i * 0.2 
              }}
              style={{
                width: Math.random() * 20 + 10,
                height: Math.random() * 20 + 10,
              }}
            />
          ))
        )}
        
        {breathState === "exhale" && (
          Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`exhale-particle-${i}`}
              className="absolute rounded-full bg-purple-400/30"
              initial={{ 
                x: 0,
                y: Math.random() * 200 - 100,
                scale: Math.random() * 0.5 + 0.5,
                opacity: 0.7
              }}
              animate={{ 
                x: 100 + Math.random() * 50, 
                scale: 0,
                opacity: 0
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: selectedTechnique.timing.exhale * 0.8, 
                delay: i * 0.2 
              }}
              style={{
                width: Math.random() * 20 + 10,
                height: Math.random() * 20 + 10,
              }}
            />
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
