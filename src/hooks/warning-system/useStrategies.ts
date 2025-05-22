
import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Strategy } from "@/types/strategy";
import { supabase } from "@/integrations/supabase/client";

interface UseStrategiesReturn {
  showStrategies: boolean;
  strategies: Strategy[];
  loading: boolean;
  error: string | null;
  handleShowStrategies: () => void;
  handleHideStrategies: () => void;
  saveStrategy: (strategy: Omit<Strategy, "id" | "user_id">) => Promise<void>;
  deleteStrategy: (id: string) => Promise<void>;
}

export function useStrategies(): UseStrategiesReturn {
  const [showStrategies, setShowStrategies] = useState(false);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Load strategies from database when user changes
  useEffect(() => {
    async function loadStrategies() {
      if (!user) {
        // Use default strategies if no user
        setStrategies([
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
        ]);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('strategies')
          .select('*')
          .eq('user_id', user.id);
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          setStrategies(data as Strategy[]);
        } else {
          // Set default strategies
          setStrategies([
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
            }
          ]);
        }
      } catch (err) {
        console.error("Error loading strategies:", err);
        setError("Failed to load strategies");
      } finally {
        setLoading(false);
      }
    }
    
    loadStrategies();
  }, [user]);
  
  const handleShowStrategies = useCallback(() => {
    setShowStrategies(true);
  }, []);
  
  const handleHideStrategies = useCallback(() => {
    setShowStrategies(false);
  }, []);
  
  const saveStrategy = useCallback(async (strategy: Omit<Strategy, "id" | "user_id">) => {
    if (!user) {
      console.log("Cannot save strategy: Not logged in");
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('strategies')
        .insert([
          { 
            ...strategy,
            user_id: user.id
          }
        ])
        .select();
        
      if (error) throw error;
      
      if (data) {
        setStrategies(prev => [...prev, data[0] as Strategy]);
      }
    } catch (err) {
      console.error("Error saving strategy:", err);
      throw err;
    }
  }, [user]);
  
  const deleteStrategy = useCallback(async (id: string) => {
    if (!user) {
      console.log("Cannot delete strategy: Not logged in");
      return;
    }
    
    try {
      const { error } = await supabase
        .from('strategies')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      // Remove from local state
      setStrategies(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error("Error deleting strategy:", err);
      throw err;
    }
  }, [user]);
  
  return {
    showStrategies,
    strategies,
    loading,
    error,
    handleShowStrategies,
    handleHideStrategies,
    saveStrategy,
    deleteStrategy
  };
}
