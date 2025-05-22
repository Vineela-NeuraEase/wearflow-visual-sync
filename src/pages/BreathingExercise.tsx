
import { useBreathingExercise } from "@/hooks/useBreathingExercise";
import { BreathingHeader } from "@/components/breathing/BreathingHeader";
import { TechniqueSelector } from "@/components/breathing/TechniqueSelector";
import { BreathingCircle } from "@/components/breathing/BreathingCircle";
import { SessionProgress } from "@/components/breathing/SessionProgress";
import { StartButton } from "@/components/breathing/StartButton";
import "../styles/animations.css";

const BreathingExercise = () => {
  const {
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
  } = useBreathingExercise();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 dark:from-indigo-950 dark:to-blue-950 flex flex-col">
      <BreathingHeader 
        onExit={handleStop} 
        soundEnabled={soundEnabled} 
        onToggleSound={toggleSound} 
      />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {!isStarted && (
          <TechniqueSelector 
            selectedTechnique={selectedTechnique}
            onTechniqueChange={handleTechniqueChange}
          />
        )}
        
        <BreathingCircle 
          breathState={breathState}
          counter={counter}
          selectedTechnique={selectedTechnique}
        />
        
        {isStarted && (
          <SessionProgress 
            elapsedTime={elapsedTime} 
            totalTime={totalSessionTime} 
            formatTime={formatTime} 
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
