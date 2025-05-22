import { useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Strategy } from '@/types/strategy';
import { supabase } from "@/integrations/supabase/client";

export function useStrategySave() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const saveStrategy = useCallback(async (
    strategy: Omit<Strategy, "id" | "user_id">,
    setStrategies: React.Dispatch<React.SetStateAction<Strategy[]>>
  ): Promise<Strategy | null> => {
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
  
  return {
    isLoading,
    saveStrategy
  };
}
