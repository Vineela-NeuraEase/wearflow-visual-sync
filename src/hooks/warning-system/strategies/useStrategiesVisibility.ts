
import { useState, useCallback } from "react";

export function useStrategiesVisibility() {
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
