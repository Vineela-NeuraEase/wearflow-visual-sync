
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import "../styles/animations.css";

// Import our new components and hooks
import BreathingCircle from "@/features/breathing/components/BreathingCircle";
import TechniqueSelector from "@/features/breathing/components/TechniqueSelector";
import BreathingInstructions from "@/features/breathing/components/BreathingInstructions";
import { useBreathingExercise } from "@/features/breathing/hooks/useBreathingExercise";

const BreathingExercise = () => {
  const navigate = useNavigate();
  const { 
    selectedTechnique,
    currentPhase,
    isBreathing,
    progress,
    technique,
    handleTechniqueChange,
    toggleBreathing
  } = useBreathingExercise();

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Breathing Exercise</h1>
      </div>
      
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/20 border-indigo-200 dark:border-indigo-800">
        <TechniqueSelector 
          selectedTechnique={selectedTechnique}
          onTechniqueChange={handleTechniqueChange}
          technique={technique}
          isBreathing={isBreathing}
          onToggleBreathing={toggleBreathing}
        />
        
        <BreathingCircle 
          isBreathing={isBreathing}
          technique={technique}
          currentPhase={currentPhase}
          progress={progress}
        />
        
        <BreathingInstructions />
      </Card>
    </div>
  );
};

export default BreathingExercise;
