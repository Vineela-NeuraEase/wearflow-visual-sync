
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import "../styles/animations.css";
import { useAudio } from "@/context/AudioContext";
import { motion } from "framer-motion";
import { BreathingCircle } from "@/components/breathing/BreathingCircle";
import { TechniqueSelector } from "@/components/breathing/TechniqueSelector";
import { ControlButtons } from "@/components/breathing/ControlButtons";
import { ProgressIndicator } from "@/components/breathing/ProgressIndicator";
import { StartButton } from "@/components/breathing/StartButton";
import { useBreathingExercise } from "@/components/breathing/hooks/useBreathingExercise";
import { useEffect } from "react";

const BreathingExercise = () => {
  const navigate = useNavigate();
  const { play, soundEnabled, toggleSound } = useAudio();
  
  useEffect(() => {
    console.log("BreathingExercise mounted");
  }, []);
  
  console.log("BreathingExercise rendering, soundEnabled:", soundEnabled);
  
  const {
    isStarted,
    breathState,
    counter,
    elapsedTime,
    totalSessionTime,
    selectedTechnique,
    handleTechniqueChange,
    handleStart,
    handleStop
  } = useBreathingExercise({
    onPlaySound: play
  });
  
  console.log("Current breathing state:", { 
    isStarted, 
    breathState, 
    counter, 
    selectedTechnique: selectedTechnique?.name 
  });
  
  const handleStopAndNavigate = () => {
    handleStop();
    navigate("/tools");
  };
  
  return (
    <div className="h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 flex flex-col">
      <div className="flex items-center p-4">
        <Button variant="ghost" size="icon" onClick={handleStopAndNavigate}>
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
          onStop={handleStopAndNavigate}
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
