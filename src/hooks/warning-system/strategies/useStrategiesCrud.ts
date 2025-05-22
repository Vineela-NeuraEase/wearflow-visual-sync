
import { useState } from "react";
import { Strategy } from '@/types/strategy';
import { useStrategySave } from "./useStrategySave";
import { useStrategyDelete } from "./useStrategyDelete";
import { useStrategyEffectiveness } from "./useStrategyEffectiveness";

export function useStrategiesCrud(
  strategies: Strategy[], 
  setStrategies: React.Dispatch<React.SetStateAction<Strategy[]>>
) {
  // Use smaller hooks for specific operations
  const { isLoading: isSaving, saveStrategy: saveStrategyAction } = useStrategySave();
  const { isLoading: isDeleting, deleteStrategy: deleteStrategyAction } = useStrategyDelete();
  const { isLoading: isUpdating, updateEffectiveness: updateEffectivenessAction } = useStrategyEffectiveness();
  
  // Combine loading states
  const isLoading = isSaving || isDeleting || isUpdating;
  
  // Create wrapper functions that provide the setStrategies callback
  const saveStrategy = async (strategy: Omit<Strategy, "id" | "user_id">) => {
    return saveStrategyAction(strategy, setStrategies);
  };
  
  const deleteStrategy = async (id: string) => {
    return deleteStrategyAction(id, setStrategies);
  };
  
  const updateEffectiveness = async (id: string, rating: number) => {
    return updateEffectivenessAction(id, rating, setStrategies);
  };
  
  return {
    isLoading,
    saveStrategy,
    deleteStrategy,
    updateEffectiveness
  };
}
