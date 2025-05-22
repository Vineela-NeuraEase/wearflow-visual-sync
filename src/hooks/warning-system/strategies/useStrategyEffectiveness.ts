import { useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Strategy } from '@/types/strategy';
import { supabase } from "@/integrations/supabase/client";

export function useStrategyEffectiveness() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const updateEffectiveness = useCallback(async (
    id: string,
    rating: number,
    setStrategies: React.Dispatch<React.SetStateAction<Strategy[]>>
  ) => {
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
    isLoading,
    updateEffectiveness
  };
}
