import { useState, useCallback } from "react";
import { Strategy } from '@/types/strategy';
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UseStrategyOperationsReturn } from './types';

export function useStrategyOperations(): UseStrategyOperationsReturn {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const saveStrategy = useCallback(async (strategy: Omit<Strategy, "id" | "user_id">): Promise<Strategy | null> => {
    try {
      setIsLoading(true);
      
      // If user is not logged in, just add to local state with a generated ID
      if (!user) {
        const newStrategy: Strategy = {
          ...strategy,
          id: crypto.randomUUID(),
        };
        
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
        toast({
          title: "Default strategy hidden",
          description: "This default strategy has been hidden from your view",
        });
        return;
      }
      
      // If user is not logged in or no ID provided, just remove from local state
      if (!user || !id) {
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
    saveStrategy,
    deleteStrategy,
    updateEffectiveness,
    isLoading
  };
}
