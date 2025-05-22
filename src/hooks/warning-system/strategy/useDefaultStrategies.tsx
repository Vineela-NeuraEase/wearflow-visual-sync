
import { useState, useEffect } from 'react';
import { Strategy } from '@/types/strategy';

export interface UseDefaultStrategiesReturn {
  defaultStrategies: Strategy[];
}

export function useDefaultStrategies(): UseDefaultStrategiesReturn {
  const [defaultStrategies, setDefaultStrategies] = useState<Strategy[]>([
    {
      id: 'default-1',
      name: 'Deep breathing',
      description: 'Breathe in for 4 seconds, hold for 4 seconds, exhale for 4 seconds',
      category: 'sensory',
      effectiveness: 4,
    },
    {
      id: 'default-2',
      name: 'Noise-canceling headphones',
      description: 'Use headphones to reduce auditory stimulation',
      category: 'sensory',
      effectiveness: 5,
    },
    {
      id: 'default-3',
      name: 'Pressure stimulation',
      description: 'Use a weighted blanket or pressure vest',
      category: 'sensory',
      effectiveness: 3,
    },
    {
      id: 'default-4',
      name: 'Removing triggers',
      description: 'Leave the triggering environment if possible',
      category: 'environment',
      effectiveness: 4,
    },
    {
      id: 'default-5',
      name: 'Stimming',
      description: 'Allow repetitive movements that help with regulation',
      category: 'behavioral',
      effectiveness: 3,
    }
  ]);

  return { defaultStrategies };
}
