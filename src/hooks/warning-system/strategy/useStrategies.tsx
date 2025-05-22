
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Strategy } from '@/types/strategy';
import { useStrategyOperations } from './useStrategyOperations';
import { useDefaultStrategies } from './useDefaultStrategies';
import { UseStrategiesReturn } from './types';
import { useToast } from '@/hooks/use-toast';

export function useStrategies(): UseStrategiesReturn {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Get operations for managing strategies
  const {
    saveStrategy: saveStrategyOperation,
    deleteStrategy: deleteStrategyOperation,
    updateEffectiveness: updateEffectivenessOperation
  } = useStrategyOperations();
  
  // Load default strategies
  const { defaultStrategies } = useDefaultStrategies();
  
  // Function to load strategies from database and merge with defaults
  const loadStrategies = useCallback(async () => {
    setIsLoading(true);
    try {
      // Start with default strategies
      let allStrategies = [...defaultStrategies];
      
      // If user is logged in, fetch their strategies from db
      if (user) {
        const { data, error } = await supabase
          .from('strategies')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error("Error loading strategies:", error);
          toast({
            title: "Error",
            description: "Failed to load your strategies",
            variant: "destructive"
          });
        } else if (data) {
          // Combine user strategies with defaults
          allStrategies = [...data, ...defaultStrategies];
        }
      }
      
      setStrategies(allStrategies);
    } catch (err) {
      console.error("Error in loadStrategies:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user, defaultStrategies, toast]);
  
  // Load strategies on mount and user change
  useEffect(() => {
    loadStrategies();
  }, [loadStrategies]);
  
  // Wrapper for save operation that updates local state
  const saveStrategy = useCallback(async (strategy: Omit<Strategy, "id" | "user_id">) => {
    const savedStrategy = await saveStrategyOperation(strategy);
    
    if (savedStrategy) {
      setStrategies(prev => [savedStrategy, ...prev]);
    }
    
    return savedStrategy;
  }, [saveStrategyOperation]);
  
  // Wrapper for delete operation that updates local state
  const deleteStrategy = useCallback(async (id: string) => {
    await deleteStrategyOperation(id);
    
    // Remove from local state
    setStrategies(prev => prev.filter(s => s.id !== id));
  }, [deleteStrategyOperation]);
  
  // Wrapper for effectiveness update that updates local state
  const updateEffectiveness = useCallback(async (id: string, rating: number) => {
    await updateEffectivenessOperation(id, rating);
    
    // Update in local state
    setStrategies(prev => prev.map(s => 
      s.id === id ? { ...s, effectiveness: rating } : s
    ));
  }, [updateEffectivenessOperation]);

  return {
    strategies,
    isLoading,
    saveStrategy,
    deleteStrategy,
    updateEffectiveness
  };
}
