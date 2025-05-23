
import { useState, useEffect, useCallback, useRef } from "react";
import { useAudio } from "@/context/AudioContext";
import { BREATHING_TECHNIQUES, BreathingTechnique } from "@/data/breathingTechniques";

export const useBreathingExercise = () => {
  const { play } = useAudio();
  const [selectedTechnique, setSelectedTechnique] = useState<string>("box");
  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const [isBreathing, setIsBreathing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number | null>(null);

  const technique = BREATHING_TECHNIQUES.find(t => t.id === selectedTechnique) || BREATHING_TECHNIQUES[0];
  
  const updateBreathingAnimation = useCallback((timestamp: number) => {
    if (!isBreathing) return;
    
    if (!lastUpdateTimeRef.current) {
      lastUpdateTimeRef.current = timestamp;
    }
    
    const elapsed = timestamp - lastUpdateTimeRef.current;
    const phaseDuration = technique.pattern[currentPhase] * 1000; // ms
    
    if (elapsed >= 33) { // Update roughly every 33ms (30fps)
      lastUpdateTimeRef.current = timestamp;
      
      setProgress(prev => {
        const newProgress = prev + (elapsed / phaseDuration * 100);
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
          play("/sounds/pop.mp3");
          return 0;
        }
        
        // Update remaining seconds
        const timeElapsed = (newProgress / 100) * phaseDuration / 1000;
        const remaining = Math.ceil(technique.pattern[currentPhase] - timeElapsed);
        setRemainingSeconds(remaining);
        
        return newProgress;
      });
    }
    
    animationFrameRef.current = requestAnimationFrame(updateBreathingAnimation);
  }, [currentPhase, isBreathing, technique, play]);

  // Start or stop animation
  useEffect(() => {
    if (isBreathing) {
      lastUpdateTimeRef.current = null;
      setRemainingSeconds(technique.pattern[currentPhase]);
      animationFrameRef.current = requestAnimationFrame(updateBreathingAnimation);
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isBreathing, updateBreathingAnimation, technique, currentPhase]);

  const handleTechniqueChange = useCallback((value: string) => {
    setSelectedTechnique(value);
    setCurrentPhase(0);
    setProgress(0);
    setRemainingSeconds(BREATHING_TECHNIQUES.find(t => t.id === value)?.pattern[0] || 4);
    play("/sounds/click.mp3");
    
    // If currently breathing, stop and restart
    if (isBreathing) {
      setIsBreathing(false);
      setTimeout(() => setIsBreathing(true), 300);
    }
  }, [isBreathing, play]);

  const toggleBreathing = useCallback(() => {
    setIsBreathing(prev => !prev);
    if (!isBreathing) {
      setCurrentPhase(0);
      setProgress(0);
      setRemainingSeconds(technique.pattern[0]);
      play("/sounds/pop.mp3");
    }
  }, [isBreathing, play, technique]);

  const resetExercise = useCallback(() => {
    setCurrentPhase(0);
    setProgress(0);
    setRemainingSeconds(technique.pattern[0]);
    play("/sounds/click.mp3");
  }, [play, technique]);

  return {
    selectedTechnique,
    currentPhase,
    isBreathing,
    progress,
    remainingSeconds,
    technique,
    handleTechniqueChange,
    toggleBreathing,
    resetExercise
  };
};
