
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BreathingTechnique } from "../data/breathingTechniques";

interface BreathingCircleProps {
  isBreathing: boolean;
  technique: BreathingTechnique;
  currentPhase: number;
  progress: number;
  remainingSeconds: number;
}

const BreathingCircle: React.FC<BreathingCircleProps> = ({ 
  isBreathing, 
  technique, 
  currentPhase, 
  progress,
  remainingSeconds
}) => {
  // Animation properties based on current phase
  const getCircleAnimation = () => {
    if (!isBreathing) return {};
    
    switch (technique.phases[currentPhase]) {
      case "Inhale":
        return {
          scale: [1, 1.5],
          transition: { duration: technique.pattern[currentPhase], ease: "easeInOut" }
        };
      case "Exhale":
        return {
          scale: [1.5, 1],
          transition: { duration: technique.pattern[currentPhase], ease: "easeInOut" }
        };
      case "Hold":
        return {
          scale: currentPhase === 1 ? 1.5 : 1, // Hold after inhale or exhale
          transition: { duration: technique.pattern[currentPhase] }
        };
      default:
        return {};
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-64 relative">
      {/* Progress circle */}
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        <circle 
          cx="50" cy="50" r="45" fill="none" 
          stroke="rgba(203,213,225,0.5)" 
          strokeWidth="2"
        />
        {isBreathing && (
          <circle
            cx="50" cy="50" r="45" fill="none"
            stroke={technique.colors[currentPhase]}
            strokeWidth="3"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progress / 100)}
            transform="rotate(-90 50 50)"
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        )}
      </svg>
      
      {/* Breathing circle */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentPhase}-${isBreathing}`}
          className="w-52 h-52 rounded-full flex items-center justify-center relative"
          style={{
            background: `radial-gradient(circle, ${technique.colors[currentPhase]} 0%, transparent 70%)`
          }}
          animate={getCircleAnimation()}
        >
          <motion.div 
            className="w-36 h-36 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center"
            animate={{ 
              boxShadow: isBreathing 
                ? [
                    `0 0 0 rgba(${technique.colors[currentPhase].replace(/[^\d,]/g, '')}, 0)`,
                    `0 0 20px rgba(${technique.colors[currentPhase].replace(/[^\d,]/g, '')}, 0.5)`,
                    `0 0 0 rgba(${technique.colors[currentPhase].replace(/[^\d,]/g, '')}, 0)`
                  ]
                : `0 0 10px rgba(203,213,225,0.2)`
            }}
            transition={{ duration: technique.pattern[currentPhase], repeat: isBreathing ? Infinity : 0 }}
          >
            {isBreathing ? (
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-semibold"
                >
                  {technique.phases[currentPhase]}
                </motion.div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="text-xl font-bold">{remainingSeconds}</span>s
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-lg font-medium mb-1">Ready to begin</p>
                <p className="text-sm text-muted-foreground">Press Start</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BreathingCircle;
