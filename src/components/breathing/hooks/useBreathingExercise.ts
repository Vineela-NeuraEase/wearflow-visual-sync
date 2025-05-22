
import { useState, useEffect, useRef } from "react";
import { BreathState, BreathingTechnique } from "../types";
import { breathingTechniques } from "../breathingTechniques";

type UseBreathingExerciseProps = {
  onPlaySound: (sound: string) => void;
};

export const useBreathingExercise = ({ onPlaySound }: UseBreathingExerciseProps) => {
  console.log("Initializing useBreathingExercise");
  const [isStarted, setIsStarted] = useState(false);
  const [breathState, setBreathState] = useState<BreathState>("idle");
  const [counter, setCounter] = useState(4);
  const [elapsedTime, setElapsedTime] = useState(0);
  const totalSessionTime = 180; // 3 minutes in seconds
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique>(breathingTechniques[0]);
  
  useEffect(() => {
    console.log("Available techniques:", breathingTechniques.map(t => t.name));
    console.log("Selected technique:", selectedTechnique.name);
  }, [selectedTechnique]);
  
  // Handle technique change
  const handleTechniqueChange = (techniqueId: string) => {
    console.log("Technique change requested:", techniqueId);
    const technique = breathingTechniques.find(t => t.id === techniqueId);
    if (technique) {
      console.log("Found technique:", technique.name);
      setSelectedTechnique(technique);
      if (isStarted) {
        // If already started, restart with new technique
        setBreathState("inhale");
        setCounter(technique.inhaleTime);
      }
    } else {
      console.warn("Technique not found:", techniqueId);
    }
  };
  
  // Setup breathing cycle
  useEffect(() => {
    if (!isStarted) return;
    console.log(`Breathing cycle updated: state=${breathState}, counter=${counter}`);
    
    let interval: NodeJS.Timeout;
    
    if (breathState === "inhale") {
      setCounter(selectedTechnique.inhaleTime);
      console.log("Playing breathing sound");
      onPlaySound("breathing");
      interval = setInterval(() => {
        setCounter(prev => {
          if (prev <= 1) {
            console.log("Inhale complete, transitioning to hold/exhale");
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
            console.log("Hold complete, transitioning to exhale");
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
            console.log("Exhale complete, transitioning to rest/inhale");
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
            console.log("Rest complete, transitioning to inhale");
            onPlaySound("pop");
            setBreathState("inhale");
            return selectedTechnique.inhaleTime;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [breathState, isStarted, onPlaySound, selectedTechnique]);
  
  // Track session time
  useEffect(() => {
    if (!isStarted) return;
    
    console.log("Starting session timer");
    const interval = setInterval(() => {
      setElapsedTime(prev => {
        const newTime = prev + 1;
        if (newTime >= totalSessionTime) {
          console.log("Session complete");
          onPlaySound("complete");
          setIsStarted(false);
          return prev;
        }
        return newTime;
      });
    }, 1000);
    
    return () => {
      console.log("Cleaning up session timer");
      clearInterval(interval);
    };
  }, [isStarted, onPlaySound, totalSessionTime]);
  
  const handleStart = () => {
    console.log("Starting breathing exercise");
    onPlaySound("whoosh");
    setIsStarted(true);
    setBreathState("inhale");
    setCounter(selectedTechnique.inhaleTime);
    setElapsedTime(0);
  };
  
  const handleStop = () => {
    console.log("Stopping breathing exercise");
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
