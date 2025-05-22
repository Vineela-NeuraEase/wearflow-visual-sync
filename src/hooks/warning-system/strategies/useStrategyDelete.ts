import { useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Strategy } from '@/types/strategy';
import { supabase } from "@/integrations/supabase/client";

export function useStrategyDelete() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const deleteStrategy = useCallback(async (
    id: string,
    setStrategies: React.Dispatch<React.SetStateAction<Strategy[]>>
  ) => {
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
  
  return {
    isLoading,
    deleteStrategy
  };
}
