
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Pause, RotateCcw, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAccessibility } from "@/context/AccessibilityContext";

interface BreathingTechnique {
  id: string;
  name: string;
  pattern: string;
  description: string;
  benefits: string[];
  inhale: number;
  hold1?: number;
  exhale: number;
  hold2?: number;
  color: string;
  bgGradient: string;
}

const breathingTechniques: BreathingTechnique[] = [
  {
    id: "444",
    name: "Box Breathing (4-4-4-4)",
    pattern: "4-4-4-4",
    description: "Equal counts for inhale, hold, exhale, hold. Used by Navy SEALs for stress management.",
    benefits: [
      "Reduces stress and anxiety",
      "Improves focus and concentration", 
      "Helps regulate the nervous system",
      "Promotes better sleep quality"
    ],
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    color: "blue",
    bgGradient: "from-blue-100 to-blue-200"
  },
  {
    id: "478",
    name: "Relaxing Breath (4-7-8)",
    pattern: "4-7-8",
    description: "Dr. Andrew Weil's technique for deep relaxation and better sleep.",
    benefits: [
      "Promotes deep relaxation",
      "Helps with falling asleep faster",
      "Reduces anxiety and panic",
      "Activates the parasympathetic nervous system"
    ],
    inhale: 4,
    hold1: 7,
    exhale: 8,
    color: "purple",
    bgGradient: "from-purple-100 to-purple-200"
  },
  {
    id: "equal",
    name: "Equal Breathing (4-4)",
    pattern: "4-4",
    description: "Simple technique with equal inhale and exhale counts.",
    benefits: [
      "Balances the nervous system",
      "Easy for beginners",
      "Improves lung capacity",
      "Enhances mental clarity"
    ],
    inhale: 4,
    exhale: 4,
    color: "green",
    bgGradient: "from-green-100 to-green-200"
  },
  {
    id: "energizing",
    name: "Energizing Breath (4-0-4-0)",
    pattern: "4-0-4-0",
    description: "Quick breathing without holds to increase energy and alertness.",
    benefits: [
      "Increases energy levels",
      "Improves alertness",
      "Boosts circulation",
      "Helps with morning wake-up"
    ],
    inhale: 4,
    exhale: 4,
    color: "orange",
    bgGradient: "from-orange-100 to-orange-200"
  }
];

const BreathingExercises = () => {
  const navigate = useNavigate();
  const { highContrastEnabled } = useAccessibility();
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState("inhale");
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  const startExercise = (technique: BreathingTechnique) => {
    setSelectedTechnique(technique);
    setIsActive(true);
    setCurrentPhase("inhale");
    setCount(technique.inhale);
    setCycle(1);
  };

  const pauseExercise = () => {
    setIsActive(false);
  };

  const resetExercise = () => {
    setIsActive(false);
    setCurrentPhase("inhale");
    if (selectedTechnique) {
      setCount(selectedTechnique.inhale);
    }
    setCycle(0);
  };

  const getPhaseInstruction = () => {
    if (!selectedTechnique) return "";
    
    switch (currentPhase) {
      case "inhale":
        return "Breathe In";
      case "hold1":
        return "Hold";
      case "exhale":
        return "Breathe Out";
      case "hold2":
        return "Hold";
      default:
        return "";
    }
  };

  if (selectedTechnique) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSelectedTechnique(null)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">{selectedTechnique.name}</h1>
            <div></div>
          </div>

          <motion.div 
            className="text-center mb-8"
            animate={{ scale: isActive ? [1, 1.1, 1] : 1 }}
            transition={{ duration: count, repeat: isActive ? Infinity : 0 }}
          >
            <div className={`w-48 h-48 mx-auto rounded-full bg-gradient-to-br ${selectedTechnique.bgGradient} flex items-center justify-center mb-4`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-700">{count}</div>
                <div className="text-lg text-gray-600">{getPhaseInstruction()}</div>
              </div>
            </div>
            
            <div className="text-lg font-medium mb-2">Cycle {cycle}</div>
            <div className="text-sm text-gray-600">Pattern: {selectedTechnique.pattern}</div>
          </motion.div>

          <div className="flex gap-4 justify-center mb-6">
            <Button
              onClick={() => isActive ? pauseExercise() : setIsActive(true)}
              size="lg"
              className="flex-1"
            >
              {isActive ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
              {isActive ? "Pause" : "Start"}
            </Button>
            
            <Button
              onClick={resetExercise}
              variant="outline"
              size="lg"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>

          <Card className="p-4">
            <h3 className="font-semibold mb-2 flex items-center">
              <Info className="h-4 w-4 mr-2" />
              Benefits
            </h3>
            <ul className="text-sm space-y-1">
              {selectedTechnique.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Breathing Exercises</h1>
        </div>

        <div className="space-y-4">
          {breathingTechniques.map((technique) => (
            <Card 
              key={technique.id}
              className={`p-4 cursor-pointer hover:shadow-md transition-shadow bg-gradient-to-r ${technique.bgGradient} ${highContrastEnabled ? 'border-2 border-black' : ''}`}
              onClick={() => startExercise(technique)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{technique.name}</h3>
                <span className="text-sm bg-white/50 px-2 py-1 rounded">
                  {technique.pattern}
                </span>
              </div>
              
              <p className="text-sm text-gray-700 mb-3">{technique.description}</p>
              
              <div className="text-xs">
                <strong>Key Benefits:</strong>
                <div className="mt-1 flex flex-wrap gap-1">
                  {technique.benefits.slice(0, 2).map((benefit, index) => (
                    <span key={index} className="bg-white/50 px-2 py-1 rounded text-xs">
                      {benefit}
                    </span>
                  ))}
                  {technique.benefits.length > 2 && (
                    <span className="text-gray-600">+{technique.benefits.length - 2} more</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-4 mt-6 bg-gradient-to-r from-amber-100 to-amber-200">
          <h3 className="font-semibold mb-2 flex items-center">
            <Info className="h-4 w-4 mr-2" />
            Getting Started
          </h3>
          <ul className="text-sm space-y-1">
            <li>• Start with 3-5 cycles per session</li>
            <li>• Practice in a quiet, comfortable space</li>
            <li>• Begin with easier techniques like Equal Breathing</li>
            <li>• Stop if you feel dizzy or uncomfortable</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default BreathingExercises;
