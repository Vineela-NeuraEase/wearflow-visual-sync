
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, Music, ArrowLeft, Info } from "lucide-react";
import "../styles/animations.css";
import { useAudio } from "@/context/AudioContext";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Breathing technique types and definitions
type BreathState = "inhale" | "hold" | "exhale" | "rest" | "idle";

type BreathingTechnique = {
  id: string;
  name: string;
  inhaleTime: number;
  holdTime: number;
  exhaleTime: number;
  restTime: number;
  description: string;
  benefits: string;
};

const breathingTechniques: BreathingTechnique[] = [
  {
    id: "4-4-4",
    name: "Box Breathing (4-4-4-4)",
    inhaleTime: 4,
    holdTime: 4,
    exhaleTime: 4,
    restTime: 4,
    description: "Equal counts of inhale, hold, exhale, and rest.",
    benefits: "Great for everyday stress relief and focus enhancement. Used by Navy SEALs for maintaining calm under pressure.",
  },
  {
    id: "4-7-8",
    name: "Relaxing Breath (4-7-8)",
    inhaleTime: 4,
    holdTime: 7,
    exhaleTime: 8,
    restTime: 0,
    description: "Inhale for 4, hold for 7, exhale for 8.",
    benefits: "Helps with anxiety, sleep issues, and managing cravings. Acts as a natural tranquilizer for the nervous system.",
  },
  {
    id: "5-2-5",
    name: "Energizing Breath (5-2-5)",
    inhaleTime: 5,
    holdTime: 2,
    exhaleTime: 5,
    restTime: 0,
    description: "Deeper breaths with a short hold for energy.",
    benefits: "Increases alertness and energy levels. Good for morning routines or when you need a mental boost.",
  },
  {
    id: "2-1-2",
    name: "Quick Calm (2-1-2)",
    inhaleTime: 2,
    holdTime: 1,
    exhaleTime: 2,
    restTime: 0,
    description: "Short breaths for quick relief.",
    benefits: "Perfect for quick stress relief in urgent situations. Easy to do discreetly in public settings.",
  },
];

const BreathingExercise = () => {
  const navigate = useNavigate();
  const { play, soundEnabled, toggleSound } = useAudio();
  const [isStarted, setIsStarted] = useState(false);
  const [breathState, setBreathState] = useState<BreathState>("idle");
  const [counter, setCounter] = useState(4);
  const [elapsedTime, setElapsedTime] = useState(0);
  const totalSessionTime = 180; // 3 minutes in seconds
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique>(breathingTechniques[0]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Handle technique change
  const handleTechniqueChange = (techniqueId: string) => {
    const technique = breathingTechniques.find(t => t.id === techniqueId);
    if (technique) {
      setSelectedTechnique(technique);
      if (isStarted) {
        // If already started, restart with new technique
        setBreathState("inhale");
        setCounter(technique.inhaleTime);
      }
    }
  };
  
  // Setup breathing cycle
  useEffect(() => {
    if (!isStarted) return;
    
    let interval: NodeJS.Timeout;
    
    if (breathState === "inhale") {
      setCounter(selectedTechnique.inhaleTime);
      play("breathing");
      interval = setInterval(() => {
        setCounter(prev => {
          if (prev <= 1) {
            play("pop");
            setBreathState(selectedTechnique.holdTime > 0 ? "hold" : "exhale");
            return selectedTechnique.holdTime > 0 ? selectedTechnique.holdTime : selectedTechnique.exhaleTime;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (breathState === "hold") {
      interval = setInterval(() => {
        setCounter(prev => {
          if (prev <= 1) {
            play("pop");
            setBreathState("exhale");
            return selectedTechnique.exhaleTime;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (breathState === "exhale") {
      interval = setInterval(() => {
        setCounter(prev => {
          if (prev <= 1) {
            play("pop");
            if (selectedTechnique.restTime > 0) {
              setBreathState("rest");
              return selectedTechnique.restTime;
            } else {
              setBreathState("inhale");
              return selectedTechnique.inhaleTime;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else if (breathState === "rest") {
      interval = setInterval(() => {
        setCounter(prev => {
          if (prev <= 1) {
            play("pop");
            setBreathState("inhale");
            return selectedTechnique.inhaleTime;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [breathState, isStarted, play, selectedTechnique]);
  
  // Track session time
  useEffect(() => {
    if (!isStarted) return;
    
    const interval = setInterval(() => {
      setElapsedTime(prev => {
        if (prev >= totalSessionTime) {
          play("complete");
          setIsStarted(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isStarted, play]);
  
  const handleStart = () => {
    play("whoosh");
    setIsStarted(true);
    setBreathState("inhale");
    setCounter(selectedTechnique.inhaleTime);
    setElapsedTime(0);
  };
  
  const handleStop = () => {
    play("click");
    setIsStarted(false);
    setBreathState("idle");
    navigate("/tools");
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

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
    <div className="h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 flex flex-col">
      <div className="flex items-center p-4">
        <Button variant="ghost" size="icon" onClick={handleStop}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-medium ml-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-300 dark:to-indigo-400">
          Breathing Exercise
        </h1>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6">
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
        
        <div className="w-full max-w-md mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Breathing Technique</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Info className="h-4 w-4 text-blue-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">{selectedTechnique.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {selectedTechnique.description}
                        </p>
                        <h4 className="text-sm font-medium mt-2">Benefits:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {selectedTechnique.benefits}
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View technique details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <Select 
            value={selectedTechnique.id} 
            onValueChange={handleTechniqueChange}
            disabled={isStarted}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select technique" />
            </SelectTrigger>
            <SelectContent>
              {breathingTechniques.map((technique) => (
                <SelectItem key={technique.id} value={technique.id}>
                  {technique.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full max-w-md flex justify-between mt-6 mb-6 space-x-4">
          <Button 
            variant="outline" 
            className="flex-1 bg-white dark:bg-transparent border-blue-200 dark:border-blue-800"
            onClick={handleStop}
          >
            <X className="mr-2 h-4 w-4" /> Stop
          </Button>
          
          <Button 
            variant="outline" 
            className={`flex-1 ${soundEnabled ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-white dark:bg-transparent'}`}
            onClick={toggleSound}
          >
            <Music className="mr-2 h-4 w-4" /> Sound
          </Button>
        </div>
        
        {isStarted && (
          <div className="w-full max-w-md mt-4">
            <div className="text-center mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">Session Progress</div>
            <Progress value={(elapsedTime / totalSessionTime) * 100} className="h-2 bg-blue-100 dark:bg-blue-900/50" />
            <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
              {formatTime(elapsedTime)} / {formatTime(totalSessionTime)}
            </div>
          </div>
        )}
        
        {!isStarted && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <Button 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-12 py-6 text-xl rounded-full shadow-lg hover:shadow-xl transition-all"
              onClick={handleStart}
            >
              Start Breathing
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BreathingExercise;
