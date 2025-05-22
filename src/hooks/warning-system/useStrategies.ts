import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Strategy } from '@/types/strategy';
import { supabase } from "@/integrations/supabase/client";

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
      
      // If user is not logged in, just add to local state with a generated ID
      if (!user) {
        const newStrategy: Strategy = {
          ...strategy,
          id: crypto.randomUUID(),
        };
        
        setStrategies(prev => [...prev, newStrategy]);
        
        toast({
          title: "Strategy saved locally",
          description: "Your strategy has been added but will not be saved permanently without an account",
        });
        
        return newStrategy;
      }
      
      // Otherwise, save to Supabase
      const { data, error } = await supabase
        .from('strategies')
        .insert({
          ...strategy,
          user_id: user.id
        })
        .select()
        .single();
      
      if (error) {
        console.error("Error saving strategy:", error);
        toast({
          title: "Error",
          description: "Failed to save strategy: " + error.message,
          variant: "destructive"
        });
        return null;
      }
      
      // Add to local state
      setStrategies(prev => [...prev, data]);
      
      toast({
        title: "Strategy saved",
        description: "Your strategy has been added to your account",
      });
      
      return data;
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
      
      // If it's a default strategy (id starts with 'default-'), just remove from local state
      if (id.startsWith('default-')) {
        setStrategies(prev => prev.filter(s => s.id !== id));
        toast({
          title: "Default strategy hidden",
          description: "This default strategy has been hidden from your view",
        });
        return;
      }
      
      // If user is not logged in or no ID provided, just remove from local state
      if (!user || !id) {
        setStrategies(prev => prev.filter(s => s.id !== id));
        return;
      }
      
      // Otherwise, delete from Supabase
      const { error } = await supabase
        .from('strategies')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error("Error deleting strategy:", error);
        toast({
          title: "Error",
          description: "Failed to delete strategy: " + error.message,
          variant: "destructive"
        });
        return;
      }
      
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
  }, [user, toast]);
  
  const updateEffectiveness = useCallback(async (id: string, rating: number) => {
    try {
      setIsLoading(true);
      
      // Update in local state first for UI responsiveness
      setStrategies(prev => 
        prev.map(strategy => 
          strategy.id === id 
            ? { ...strategy, effectiveness: rating } 
            : strategy
        )
      );
      
      // If it's a default strategy or user isn't logged in, just update local state
      if (id.startsWith('default-') || !user) {
        return;
      }
      
      // Otherwise, update in Supabase
      const { error } = await supabase
        .from('strategies')
        .update({ effectiveness: rating })
        .eq('id', id);
      
      if (error) {
        console.error("Error updating effectiveness:", error);
        toast({
          title: "Error",
          description: "Failed to update rating: " + error.message,
          variant: "destructive"
        });
        return;
      }
      
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
  }, [user, toast]);
  
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
