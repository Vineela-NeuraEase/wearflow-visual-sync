
import { Strategy } from '@/types/strategy';

export interface UseStrategiesReturn {
  showStrategies: boolean;
  strategies: Strategy[];
  loading: boolean;
  error: string | null;
  isLoading: boolean;
  handleShowStrategies: () => void;
  handleHideStrategies: () => void;
  saveStrategy: (strategy: Omit<Strategy, "id" | "user_id">) => Promise<Strategy | null>;
  deleteStrategy: (id: string) => Promise<void>;
  updateEffectiveness: (id: string, rating: number) => Promise<void>;
}

export interface UseDefaultStrategiesReturn {
  defaultStrategies: Strategy[];
}

export interface UseStrategyUIReturn {
  showStrategies: boolean;
  handleShowStrategies: () => void;
  handleHideStrategies: () => void;
}

export interface UseStrategyOperationsReturn {
  saveStrategy: (strategy: Omit<Strategy, "id" | "user_id">) => Promise<Strategy | null>;
  deleteStrategy: (id: string) => Promise<void>;
  updateEffectiveness: (id: string, rating: number) => Promise<void>;
  isLoading: boolean;
}
