
import { useState, useEffect } from "react";
import { BreathState, BreathingTechnique, breathingTechniques } from "@/components/breathing/types";
import { useAudio } from "@/context/AudioContext";
import { useNavigate } from "react-router-dom";

export function useBreathingExercise() {
  const navigate = useNavigate();
  const { play, soundEnabled, toggleSound } = useAudio();
  const [isStarted, setIsStarted] = useState(false);
  const [breathState, setBreathState] = useState<BreathState>("idle");
  const [counter, setCounter] = useState(4);
  const [elapsedTime, setElapsedTime] = useState(0);
  const totalSessionTime = 180; // 3 minutes in seconds
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique>(breathingTechniques[0]);
  
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
  }, [selectedTechnique, isStarted, breathState]);
  
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

  const handleTechniqueChange = (techniqueId: string) => {
    const technique = breathingTechniques.find(t => t.id === techniqueId);
    if (technique) {
      setSelectedTechnique(technique);
    }
  };

  return {
    isStarted,
    breathState,
    counter,
    elapsedTime,
    totalSessionTime,
    selectedTechnique,
    soundEnabled,
    handleStart,
    handleStop,
    formatTime,
    handleTechniqueChange,
    toggleSound
  };
}
