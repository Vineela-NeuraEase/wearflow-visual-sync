
import { useState } from "react";

export function useStrategies() {
  const [showStrategies, setShowStrategies] = useState(false);
  
  const handleShowStrategies = () => setShowStrategies(true);
  const handleHideStrategies = () => setShowStrategies(false);

  return {
    showStrategies,
    handleShowStrategies,
    handleHideStrategies
  };
}
