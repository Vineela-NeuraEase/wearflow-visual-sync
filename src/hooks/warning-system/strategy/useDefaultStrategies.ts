
import { Strategy } from '@/types/strategy';
import { UseDefaultStrategiesReturn } from './types';

export function useDefaultStrategies(): UseDefaultStrategiesReturn {
  // Default strategies to use regardless of user login status
  const defaultStrategies: Strategy[] = [
    {
      id: "default-1",
      name: "Deep Breathing",
      description: "4-7-8 breathing technique",
      category: "breathing",
      effectiveness: 4
    },
    {
      id: "default-2",
      name: "Sensory Break",
      description: "Take 10 minutes in a quiet space",
      category: "sensory", 
      effectiveness: 5
    },
    {
      id: "default-3",
      name: "Weighted Blanket",
      description: "Use weighted blanket for deep pressure",
      category: "sensory",
      effectiveness: 5
    }
  ];
  
  return { defaultStrategies };
}
