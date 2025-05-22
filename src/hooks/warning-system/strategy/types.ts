
import { Strategy } from '@/types/strategy';

export interface UseStrategiesReturn {
  strategies: Strategy[];
  isLoading: boolean;
  saveStrategy: (strategy: Omit<Strategy, "id" | "user_id">) => Promise<Strategy | null>;
  deleteStrategy: (id: string) => Promise<void>;
  updateEffectiveness: (id: string, rating: number) => Promise<void>;
}

export interface UseDefaultStrategiesReturn {
  defaultStrategies: Strategy[];
}

export interface UseStrategyUIReturn {
  categories: string[];
  getCategoryName: (category: string) => string;
  getCategoryIcon: (category: string) => JSX.Element;
  getEffectivenessLabel: (rating: number) => string;
}

export interface UseStrategyOperationsReturn {
  saveStrategy: (strategy: Omit<Strategy, "id" | "user_id">) => Promise<Strategy | null>;
  deleteStrategy: (id: string) => Promise<void>;
  updateEffectiveness: (id: string, rating: number) => Promise<void>;
  isLoading: boolean;
}
