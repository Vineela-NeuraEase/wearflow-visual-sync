
import { useState, useEffect, useRef } from "react";
import { BreathState, BreathingTechnique } from "../types";
import { breathingTechniques } from "../breathingTechniques";

type UseBreathingExerciseProps = {
  onPlaySound: (sound: string) => void;
};

export const useBreathingExercise = ({ onPlaySound }: UseBreathingExerciseProps) => {
  const [isStarted, setIsStarted] = useState(false);
  const [breathState, setBreathState] = useState<BreathState>("idle");
  const [counter, setCounter] = useState(4);
  const [elapsedTime, setElapsedTime] = useState(0);
  const totalSessionTime = 180; // 3 minutes in seconds
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique>(breathingTechniques[0]);
  
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
      onPlaySound("breathing");
      interval = setInterval(() => {
        setCounter(prev => {
          if (prev <= 1) {
            onPlaySound("pop");
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
            onPlaySound("pop");
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
            onPlaySound("pop");
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
            onPlaySound("pop");
            setBreathState("inhale");
            return selectedTechnique.inhaleTime;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [breathState, isStarted, onPlaySound, selectedTechnique]);
  
  // Track session time
  useEffect(() => {
    if (!isStarted) return;
    
    const interval = setInterval(() => {
      setElapsedTime(prev => {
        if (prev >= totalSessionTime) {
          onPlaySound("complete");
          setIsStarted(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isStarted, onPlaySound]);
  
  const handleStart = () => {
    onPlaySound("whoosh");
    setIsStarted(true);
    setBreathState("inhale");
    setCounter(selectedTechnique.inhaleTime);
    setElapsedTime(0);
  };
  
  const handleStop = () => {
    onPlaySound("click");
    setIsStarted(false);
    setBreathState("idle");
  };

  return {
    isStarted,
    breathState,
    counter,
    elapsedTime,
    totalSessionTime,
    selectedTechnique,
    handleTechniqueChange,
    handleStart,
    handleStop
  };
};
