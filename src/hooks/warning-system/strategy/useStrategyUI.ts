
import { useState, useCallback } from "react";
import { UseStrategyUIReturn } from './types';

export function useStrategyUI(): UseStrategyUIReturn {
  const [showStrategies, setShowStrategies] = useState(false);
  
  const handleShowStrategies = useCallback(() => {
    setShowStrategies(true);
  }, []);
  
  const handleHideStrategies = useCallback(() => {
    setShowStrategies(false);
  }, []);

  return {
    showStrategies,
    handleShowStrategies,
    handleHideStrategies
  };
}
