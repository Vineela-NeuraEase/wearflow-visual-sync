
import { useState, useEffect, useCallback } from "react";
import { useAudio } from "@/context/AudioContext";
import { BREATHING_TECHNIQUES, BreathingTechnique } from "../data/breathingTechniques";

export const useBreathingExercise = () => {
  const { play } = useAudio();
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
            play("/sounds/pop.mp3");
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
  }, [currentPhase, isBreathing, technique, play]);

  const handleTechniqueChange = useCallback((value: string) => {
    setSelectedTechnique(value);
    setCurrentPhase(0);
    setProgress(0);
    play("/sounds/click.mp3");
  }, [play]);

  const toggleBreathing = useCallback(() => {
    setIsBreathing(prev => !prev);
    if (!isBreathing) {
      setCurrentPhase(0);
      setProgress(0);
      play("/sounds/pop.mp3");
    }
  }, [isBreathing, play]);

  return {
    selectedTechnique,
    currentPhase,
    isBreathing,
    progress,
    cycleDuration,
    technique,
    handleTechniqueChange,
    toggleBreathing
  };
};
