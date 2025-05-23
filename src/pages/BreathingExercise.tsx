
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

// Import our components and hooks with the updated paths
import BreathingCircle from "@/components/breathing/BreathingCircle";
import TechniqueSelector from "@/components/breathing/TechniqueSelector";
import BreathingInstructions from "@/components/breathing/BreathingInstructions";
import BreathingControls from "@/components/breathing/BreathingControls";
import { useBreathingExercise } from "@/hooks/useBreathingExercise";

const BreathingExercise = () => {
  console.log('Enhanced Breathing Component Loaded');
  
  const navigate = useNavigate();
  const { 
    selectedTechnique,
    currentPhase,
    isBreathing,
    progress,
    technique,
    remainingSeconds,
    handleTechniqueChange,
    toggleBreathing,
    resetExercise
  } = useBreathingExercise();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Breathing Exercise</h1>
        </div>
      </div>
      
      <Card className="p-6 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-indigo-900/30 dark:via-blue-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800">
        <TechniqueSelector 
          selectedTechnique={selectedTechnique}
          onTechniqueChange={handleTechniqueChange}
          technique={technique}
        />
        
        <div className="mt-8 mb-6">
          <BreathingCircle 
            isBreathing={isBreathing}
            technique={technique}
            currentPhase={currentPhase}
            progress={progress}
            remainingSeconds={remainingSeconds}
          />
        </div>
        
        <BreathingControls
          isBreathing={isBreathing}
          onToggleBreathing={toggleBreathing}
          onReset={resetExercise}
        />
        
        <BreathingInstructions />
      </Card>
    </div>
  );
};

export default BreathingExercise;
