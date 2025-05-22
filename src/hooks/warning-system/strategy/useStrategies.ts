
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Strategy } from '@/types/strategy';
import { useDefaultStrategies } from "./useDefaultStrategies";
import { useStrategyUI } from "./useStrategyUI";
import { useStrategyOperations } from "./useStrategyOperations";
import { UseStrategiesReturn } from "./types";

export function useStrategies(): UseStrategiesReturn {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { defaultStrategies } = useDefaultStrategies();
  const { saveStrategy: saveStrategyOp, deleteStrategy: deleteStrategyOp, updateEffectiveness: updateEffectivenessOp, isLoading } = useStrategyOperations();
  
  // Load strategies from supabase
  useEffect(() => {
    const loadStrategies = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Start with default strategies
        let allStrategies = [...defaultStrategies];
        
        // If user is logged in, fetch their custom strategies
        if (user) {
          const { data, error } = await supabase
            .from('strategies')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (error) {
            console.error("Error fetching strategies:", error);
            setError("Failed to load strategies: " + error.message);
          } else if (data) {
            // Add user's custom strategies
            allStrategies = [...allStrategies, ...data];
          }
        }
        
        setStrategies(allStrategies);
      } catch (err) {
        console.error("Error loading strategies:", err);
        setError("Failed to load strategies");
      } finally {
        setLoading(false);
      }
    };
    
    loadStrategies();
  }, [user, defaultStrategies]);
  
  // Wrap the operations to update local state after API calls
  const saveStrategy = async (strategy: Omit<Strategy, "id" | "user_id">): Promise<Strategy | null> => {
    const newStrategy = await saveStrategyOp(strategy);
    if (newStrategy) {
      setStrategies(prev => [...prev, newStrategy]);
    }
    return newStrategy;
  };
  
  const deleteStrategy = async (id: string): Promise<void> => {
    await deleteStrategyOp(id);
    setStrategies(prev => prev.filter(s => s.id !== id));
  };
  
  const updateEffectiveness = async (id: string, rating: number): Promise<void> => {
    await updateEffectivenessOp(id, rating);
    setStrategies(prev => 
      prev.map(strategy => 
        strategy.id === id 
          ? { ...strategy, effectiveness: rating } 
          : strategy
      )
    );
  };
  
  return {
    strategies,
    isLoading,
    saveStrategy,
    deleteStrategy,
    updateEffectiveness
  };
}
