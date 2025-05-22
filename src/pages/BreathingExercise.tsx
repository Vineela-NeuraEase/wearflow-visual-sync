
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import "../styles/animations.css";
import { useAudio } from "@/context/AudioContext";
import { motion } from "framer-motion";
import { BreathState, BreathingTechnique } from "@/components/breathing/types";
import { breathingTechniques } from "@/components/breathing/breathingTechniques";
import { BreathingCircle } from "@/components/breathing/BreathingCircle";
import { TechniqueSelector } from "@/components/breathing/TechniqueSelector";
import { ControlButtons } from "@/components/breathing/ControlButtons";
import { ProgressIndicator } from "@/components/breathing/ProgressIndicator";
import { StartButton } from "@/components/breathing/StartButton";

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
        <BreathingCircle 
          breathState={breathState}
          counter={counter}
          selectedTechnique={selectedTechnique}
        />
        
        <TechniqueSelector
          selectedTechnique={selectedTechnique}
          onTechniqueChange={handleTechniqueChange}
          disabled={isStarted}
        />
        
        <ControlButtons
          onStop={handleStop}
          onToggleSound={toggleSound}
          soundEnabled={soundEnabled}
        />
        
        {isStarted && (
          <ProgressIndicator 
            elapsedTime={elapsedTime} 
            totalSessionTime={totalSessionTime} 
          />
        )}
        
        {!isStarted && (
          <StartButton onStart={handleStart} />
        )}
      </div>
    </div>
  );
};

export default BreathingExercise;
