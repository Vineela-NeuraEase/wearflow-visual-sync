
import { useState, useCallback } from "react";
import { CircleHalf, Brain, Activity, Users, Home, Sparkles } from "lucide-react";
import { UseStrategyUIReturn } from './types';

export function useStrategyUI(): UseStrategyUIReturn {
  const [showStrategies, setShowStrategies] = useState(false);
  
  const handleShowStrategies = useCallback(() => {
    setShowStrategies(true);
  }, []);
  
  const handleHideStrategies = useCallback(() => {
    setShowStrategies(false);
  }, []);
  
  // Category helpers
  const categories = [
    'sensory',
    'cognitive',
    'physical',
    'social',
    'environment',
    'behavioral'
  ];
  
  const getCategoryName = (category: string): string => {
    const names: Record<string, string> = {
      'sensory': 'Sensory',
      'cognitive': 'Cognitive',
      'physical': 'Physical',
      'social': 'Social',
      'environment': 'Environment',
      'behavioral': 'Behavioral'
    };
    
    return names[category] || category;
  };
  
  const getCategoryIcon = (category: string): JSX.Element => {
    switch (category) {
      case 'sensory':
        return <CircleHalf className="h-4 w-4" />;
      case 'cognitive':
        return <Brain className="h-4 w-4" />;
      case 'physical':
        return <Activity className="h-4 w-4" />;
      case 'social':
        return <Users className="h-4 w-4" />;
      case 'environment':
        return <Home className="h-4 w-4" />;
      case 'behavioral':
        return <Sparkles className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };
  
  const getEffectivenessLabel = (rating: number): string => {
    if (rating >= 5) return "Highly Effective";
    if (rating >= 4) return "Effective";
    if (rating >= 3) return "Moderately Effective";
    if (rating >= 2) return "Somewhat Effective";
    return "Not Very Effective";
  };

  return {
    categories,
    getCategoryName,
    getCategoryIcon,
    getEffectivenessLabel,
    showStrategies,
    handleShowStrategies,
    handleHideStrategies
  };
}
