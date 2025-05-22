
import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Strategy } from '@/types/strategy';

// Export the interface for the hook return type
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

export function useStrategies(): UseStrategiesReturn {
  const [showStrategies, setShowStrategies] = useState(false);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load default strategies to use regardless of user login status
  const defaultStrategies: Strategy[] = [
    {
      id: "default-1",
      name: "Deep Breathing",
      description: "4-7-8 breathing technique",
      category: "breathing",
      effectiveness: 4
    },
    {
      id: "default-2",
      name: "Sensory Break",
      description: "Take 10 minutes in a quiet space",
      category: "sensory", 
      effectiveness: 5
    },
    {
      id: "default-3",
      name: "Weighted Blanket",
      description: "Use weighted blanket for deep pressure",
      category: "sensory",
      effectiveness: 5
    }
  ];
  
  // Load strategies
  useEffect(() => {
    const loadStrategies = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // For now, just use default strategies
        setStrategies(defaultStrategies);
      } catch (err) {
        console.error("Error loading strategies:", err);
        setError("Failed to load strategies");
      } finally {
        setLoading(false);
      }
    };
    
    loadStrategies();
  }, [user]);
  
  const handleShowStrategies = useCallback(() => {
    setShowStrategies(true);
  }, []);
  
  const handleHideStrategies = useCallback(() => {
    setShowStrategies(false);
  }, []);
  
  const saveStrategy = useCallback(async (strategy: Omit<Strategy, "id" | "user_id">): Promise<Strategy | null> => {
    try {
      setIsLoading(true);
      // Create new strategy with generated ID
      const newStrategy: Strategy = {
        ...strategy,
        id: crypto.randomUUID(),
        user_id: user?.id
      };
      
      // Add to local state
      setStrategies(prev => [...prev, newStrategy]);
      
      toast({
        title: "Strategy saved",
        description: "Your strategy has been added",
      });
      
      return newStrategy;
    } catch (err) {
      console.error("Error saving strategy:", err);
      toast({
        title: "Error",
        description: "Failed to save strategy",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);
  
  const deleteStrategy = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      // Remove from local state
      setStrategies(prev => prev.filter(s => s.id !== id));
      
      toast({
        title: "Strategy deleted",
        description: "Your strategy has been removed",
      });
    } catch (err) {
      console.error("Error deleting strategy:", err);
      toast({
        title: "Error",
        description: "Failed to delete strategy",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);
  
  const updateEffectiveness = useCallback(async (id: string, rating: number) => {
    try {
      setIsLoading(true);
      // Update effectiveness in local state
      setStrategies(prev => 
        prev.map(strategy => 
          strategy.id === id 
            ? { ...strategy, effectiveness: rating } 
            : strategy
        )
      );
      
      toast({
        title: "Rating updated",
        description: "Strategy effectiveness updated",
      });
    } catch (err) {
      console.error("Error updating effectiveness:", err);
      toast({
        title: "Error",
        description: "Failed to update rating",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);
  
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
