
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, Music, Info, ChevronDown } from "lucide-react";
import "../styles/animations.css";
import { useAudio } from "@/context/AudioContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";

// Breathing states
type BreathState = "inhale" | "hold" | "exhale" | "rest" | "idle";

// Breathing technique types
type BreathingTechnique = {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  timing: {
    inhale: number;
    hold1?: number;
    exhale: number;
    hold2?: number;
  };
  color: string;
};

const breathingTechniques: BreathingTechnique[] = [
  {
    id: "box",
    name: "Box Breathing (4-4-4-4)",
    description: "Inhale, hold, exhale, and hold again for 4 seconds each.",
    benefits: ["Reduces stress", "Improves concentration", "Used by military and first responders"],
    timing: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
    color: "from-blue-400 to-purple-500"
  },
  {
    id: "relaxing",
    name: "Relaxing Breath (4-7-8)",
    description: "Inhale for 4, hold for 7, and exhale for 8 seconds.",
    benefits: ["Promotes sleep", "Reduces anxiety", "Calms the nervous system"],
    timing: { inhale: 4, hold1: 7, exhale: 8 },
    color: "from-indigo-400 to-cyan-300"
  },
  {
    id: "energizing",
    name: "Energizing Breath (5-2-5)",
    description: "Inhale for 5, hold for 2, and exhale for 5 seconds.",
    benefits: ["Increases energy", "Improves alertness", "Good for morning or mid-day"],
    timing: { inhale: 5, hold1: 2, exhale: 5 },
    color: "from-orange-400 to-pink-500"
  },
  {
    id: "quick",
    name: "Quick Calm (2-1-2)",
    description: "A faster technique with 2 second inhale, 1 second hold, 2 second exhale.",
    benefits: ["Quick stress relief", "Can be done discreetly", "Good for immediate calm"],
    timing: { inhale: 2, hold1: 1, exhale: 2 },
    color: "from-green-400 to-teal-500"
  }
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
  
  useEffect(() => {
    if (isStarted && breathState !== "idle") {
      // Reset counter when changing techniques while in a session
      if (breathState === "inhale") {
        setCounter(selectedTechnique.timing.inhale);
      } else if (breathState === "hold") {
        setCounter(selectedTechnique.timing.hold1 || 0);
      } else if (breathState === "exhale") {
        setCounter(selectedTechnique.timing.exhale);
      } else if (breathState === "rest") {
        setCounter(selectedTechnique.timing.hold2 || 0);
      }
    }
  }, [selectedTechnique, isStarted]);
  
  // Setup breathing cycle
  useEffect(() => {
    if (!isStarted) return;
    
    let interval: NodeJS.Timeout;
    
    if (breathState === "inhale") {
      setCounter(selectedTechnique.timing.inhale);
      play("breathing");
      interval = setInterval(() => {
        setCounter(prev => {
          if (prev <= 1) {
            play("pop");
            return selectedTechnique.timing.hold1
              ? (() => { setBreathState("hold"); return selectedTechnique.timing.hold1 || 0; })()
              : (() => { setBreathState("exhale"); return selectedTechnique.timing.exhale; })();
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
            return selectedTechnique.timing.exhale;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (breathState === "exhale") {
      interval = setInterval(() => {
        setCounter(prev => {
          if (prev <= 1) {
            play("pop");
            return selectedTechnique.timing.hold2 
              ? (() => { setBreathState("rest"); return selectedTechnique.timing.hold2 || 0; })()
              : (() => { setBreathState("inhale"); return selectedTechnique.timing.inhale; })();
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
            return selectedTechnique.timing.inhale;
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
    setCounter(selectedTechnique.timing.inhale);
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

  const getAnimationDuration = () => {
    switch (breathState) {
      case "inhale": return selectedTechnique.timing.inhale;
      case "hold": return selectedTechnique.timing.hold1 || 0;
      case "exhale": return selectedTechnique.timing.exhale;
      case "rest": return selectedTechnique.timing.hold2 || 0;
      default: return 0;
    }
  };

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
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 flex flex-col">
      <div className="flex justify-between items-center p-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleStop}
          className="hover:bg-blue-100"
        >
          <X className="h-6 w-6" />
        </Button>
        
        <h1 className="text-2xl font-semibold text-indigo-800">Breathing Exercise</h1>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleSound}
          className="hover:bg-blue-100"
        >
          <Music className={`h-6 w-6 ${soundEnabled ? 'text-indigo-600' : 'text-gray-400'}`} />
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {!isStarted && (
          <div className="w-full max-w-md mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium text-indigo-700">Choose Technique</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                          <Info className="h-4 w-4 text-indigo-600" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-4">
                        <div className="space-y-2">
                          <h3 className="font-medium">About {selectedTechnique.name}</h3>
                          <p className="text-sm text-muted-foreground">{selectedTechnique.description}</p>
                          <h4 className="text-sm font-medium pt-2">Benefits:</h4>
                          <ul className="text-sm list-disc pl-5 space-y-1">
                            {selectedTechnique.benefits.map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Learn about this technique</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <Select
              value={selectedTechnique.id}
              onValueChange={(value) => setSelectedTechnique(breathingTechniques.find(t => t.id === value) || breathingTechniques[0])}
            >
              <SelectTrigger className="w-full bg-white border-indigo-200">
                <SelectValue placeholder="Select a breathing technique" />
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
        )}
        
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
            className="absolute inset-2 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center"
            style={{
              boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.8)",
            }}
          >
            <div className="z-10 text-center">
              <span className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {counter}
              </span>
              <p className="text-xl mt-2 font-medium text-indigo-800">
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
        
        {isStarted && (
          <div className="w-full max-w-md mt-6">
            <div className="text-center mb-2 text-indigo-700 font-medium">Session Progress</div>
            <Progress 
              value={(elapsedTime / totalSessionTime) * 100} 
              className="h-2 bg-blue-100" 
              indicatorClassName="bg-gradient-to-r from-indigo-500 to-purple-500" 
            />
            <div className="text-center mt-2 font-medium text-indigo-600">
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
              className="px-12 py-6 text-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
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
