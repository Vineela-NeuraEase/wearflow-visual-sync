
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAudio } from "@/context/AudioContext";
import "../styles/animations.css";

// Define breathing techniques
const BREATHING_TECHNIQUES = [
  {
    id: "box",
    name: "Box Breathing",
    pattern: [4, 4, 4, 4],
    phases: ["Inhale", "Hold", "Exhale", "Hold"],
    description: "Great for focus and stress relief",
    colors: ["#60a5fa", "#93c5fd", "#3b82f6", "#93c5fd"]
  },
  {
    id: "relaxing",
    name: "Relaxing Breath",
    pattern: [4, 7, 8, 0],
    phases: ["Inhale", "Hold", "Exhale", ""],
    description: "Perfect for bedtime and deep relaxation",
    colors: ["#8b5cf6", "#a78bfa", "#7c3aed", "transparent"]
  },
  {
    id: "energizing",
    name: "Energizing Breath",
    pattern: [5, 2, 5, 0],
    phases: ["Inhale", "Hold", "Exhale", ""],
    description: "Ideal for morning energy boost",
    colors: ["#f59e0b", "#fbbf24", "#d97706", "transparent"]
  },
  {
    id: "quick",
    name: "Quick Calm",
    pattern: [2, 1, 2, 0],
    phases: ["Inhale", "Hold", "Exhale", ""],
    description: "Quick stress relief in under a minute",
    colors: ["#10b981", "#34d399", "#059669", "transparent"]
  }
];

const BreathingExercise = () => {
  const navigate = useNavigate();
  const { playSound } = useAudio();
  const [selectedTechnique, setSelectedTechnique] = useState<string>("box");
  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const [isBreathing, setIsBreathing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [cycleDuration, setCycleDuration] = useState<number>(0);

  const technique = BREATHING_TECHNIQUES.find(t => t.id === selectedTechnique) || BREATHING_TECHNIQUES[0];
  
  // Calculate total cycle duration in seconds
  useEffect(() => {
    const totalDuration = technique.pattern.reduce((sum, val) => sum + val, 0);
    setCycleDuration(totalDuration);
  }, [selectedTechnique, technique]);

  // Handle breathing cycle
  useEffect(() => {
    if (!isBreathing) return;
    
    const phaseDuration = technique.pattern[currentPhase];
    const phaseInterval = phaseDuration * 1000; // Convert to milliseconds
    
    // If it's a valid phase with duration
    if (phaseDuration > 0) {
      const timer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            // Move to next phase
            const nextPhase = (currentPhase + 1) % technique.pattern.length;
            // Skip phases with 0 duration
            if (technique.pattern[nextPhase] === 0) {
              setCurrentPhase((nextPhase + 1) % technique.pattern.length);
            } else {
              setCurrentPhase(nextPhase);
            }
            
            // Play a subtle sound when transitioning phases
            playSound("pop");
            return 0;
          }
          return newProgress;
        });
      }, phaseInterval / 100);

      return () => clearInterval(timer);
    } else {
      // Skip zero-duration phases
      setCurrentPhase((currentPhase + 1) % technique.pattern.length);
    }
  }, [currentPhase, isBreathing, technique, playSound]);

  const handleTechniqueChange = (value: string) => {
    setSelectedTechnique(value);
    setCurrentPhase(0);
    setProgress(0);
    playSound("click.mp3");
  };

  const toggleBreathing = () => {
    setIsBreathing(prev => !prev);
    if (!isBreathing) {
      setCurrentPhase(0);
      setProgress(0);
      playSound("pop");
    }
  };

  // Animation properties based on current phase
  const getCircleAnimation = () => {
    if (!isBreathing) return {};
    
    switch (technique.phases[currentPhase]) {
      case "Inhale":
        return {
          scale: [1, 1.4],
          transition: { duration: technique.pattern[currentPhase], ease: "easeInOut" }
        };
      case "Exhale":
        return {
          scale: [1.4, 1],
          transition: { duration: technique.pattern[currentPhase], ease: "easeInOut" }
        };
      case "Hold":
        return {
          scale: currentPhase === 1 ? 1.4 : 1, // Hold after inhale or exhale
          transition: { duration: technique.pattern[currentPhase] }
        };
      default:
        return {};
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Breathing Exercise</h1>
      </div>
      
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/20 border-indigo-200 dark:border-indigo-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center">
              <Select value={selectedTechnique} onValueChange={handleTechniqueChange}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select technique" />
                </SelectTrigger>
                <SelectContent>
                  {BREATHING_TECHNIQUES.map(tech => (
                    <SelectItem key={tech.id} value={tech.id}>{tech.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Info className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72">
                  <div className="space-y-2">
                    <h3 className="font-medium">{technique.name}</h3>
                    <p className="text-sm text-muted-foreground">{technique.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {technique.phases.filter(p => p).map((phase, idx) => (
                        <div key={idx} className="text-xs bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded flex items-center">
                          <span className="mr-1">{phase}:</span> 
                          <span className="font-medium">{technique.pattern[idx]}s</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <Button 
            onClick={toggleBreathing}
            variant={isBreathing ? "destructive" : "default"}
            className="px-6"
          >
            {isBreathing ? "Stop" : "Start"}
          </Button>
        </div>
        
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
                {isBreathing && (
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
                      {Math.round((technique.pattern[currentPhase] - (progress / 100 * technique.pattern[currentPhase])) * 10) / 10}s
                    </div>
                  </div>
                )}
                
                {!isBreathing && (
                  <div className="text-center">
                    <p className="text-lg font-medium mb-1">Ready to begin</p>
                    <p className="text-sm text-muted-foreground">Press Start</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Find a comfortable seated position</li>
            <li>• Follow the breathing circle as it expands and contracts</li>
            <li>• Focus on the rhythm and let your breathing synchronize</li>
            <li>• Try to continue for at least 2-3 minutes for best results</li>
          </ul>
        </div>
      </Card>
      
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10">
        <h3 className="font-medium mb-2">Benefits of Breathing Exercises</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Regular breathing practice can reduce stress, improve focus, lower blood pressure,
          and help manage anxiety. Try to incorporate a few minutes of breathing exercises
          into your daily routine.
        </p>
      </Card>
    </div>
  );
};

export default BreathingExercise;
