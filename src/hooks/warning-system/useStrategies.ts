
import { useStrategiesState } from "./strategies/useStrategiesState";
import { useStrategiesVisibility } from "./strategies/useStrategiesVisibility";
import { useStrategiesCrud } from "./strategies/useStrategiesCrud";
import { UseStrategiesReturn } from "./strategies/types";

export function useStrategies(): UseStrategiesReturn {
  // Use smaller hooks for specific functionality
  const { 
    strategies, 
    setStrategies, 
    loading, 
    error 
  } = useStrategiesState();
  
  const { 
    showStrategies, 
    handleShowStrategies, 
    handleHideStrategies 
  } = useStrategiesVisibility();
  
  const { 
    isLoading, 
    saveStrategy, 
    deleteStrategy, 
    updateEffectiveness 
  } = useStrategiesCrud(strategies, setStrategies);
  
  // Return combined state and methods
  return {
    showStrategies,
    strategies,
    loading,
    error,
    isLoading,
    handleShowStrategies,
    handleHideStrategies,
    saveStrategy,
    deleteStrategy,
    updateEffectiveness
  };
}
