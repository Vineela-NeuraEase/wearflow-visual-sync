
import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export type Strategy = {
  id: string;
  name: string;
  description: string;
  category: string;
  effectiveness: number;
  user_id: string;
  created_at?: string;
  updated_at?: string;
};

export function useStrategies() {
  const [showStrategies, setShowStrategies] = useState(false);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const handleShowStrategies = () => setShowStrategies(true);
  const handleHideStrategies = () => setShowStrategies(false);

  // Fetch strategies from Supabase
  const fetchStrategies = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('strategies')
        .select('*')
        .eq('user_id', user.id)
        .order('effectiveness', { ascending: false });
      
      if (error) {
        console.error("Error fetching strategies:", error);
        toast({
          title: "Error loading strategies",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      setStrategies(data || []);
    } catch (err) {
      console.error("Error in fetchStrategies:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  // Create or update a strategy
  const saveStrategy = useCallback(async (strategy: Omit<Strategy, "user_id" | "created_at" | "updated_at">) => {
    if (!user) return null;
    
    try {
      const strategyWithUser = {
        ...strategy,
        user_id: user.id,
      };
      
      const { data, error } = await supabase
        .from('strategies')
        .upsert(strategyWithUser)
        .select()
        .single();
      
      if (error) {
        console.error("Error saving strategy:", error);
        toast({
          title: "Error saving strategy",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }
      
      // Update local state
      setStrategies(prev => {
        const exists = prev.some(s => s.id === strategy.id);
        if (exists) {
          return prev.map(s => s.id === strategy.id ? data : s);
        } else {
          return [...prev, data];
        }
      });
      
      toast({
        title: "Strategy saved",
        description: `"${strategy.name}" has been saved.`,
      });
      
      return data;
    } catch (err) {
      console.error("Error in saveStrategy:", err);
      return null;
    }
  }, [user, toast]);

  // Delete a strategy
  const deleteStrategy = useCallback(async (id: string) => {
    if (!user) return false;
    
    try {
      const { error } = await supabase
        .from('strategies')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (error) {
        console.error("Error deleting strategy:", error);
        toast({
          title: "Error deleting strategy",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }
      
      // Update local state
      setStrategies(prev => prev.filter(s => s.id !== id));
      
      toast({
        title: "Strategy deleted",
        description: "The strategy has been removed",
      });
      
      return true;
    } catch (err) {
      console.error("Error in deleteStrategy:", err);
      return false;
    }
  }, [user, toast]);

  // Update strategy effectiveness
  const updateEffectiveness = useCallback(async (id: string, effectiveness: number) => {
    if (!user) return false;
    
    try {
      const { error } = await supabase
        .from('strategies')
        .update({ effectiveness })
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (error) {
        console.error("Error updating strategy effectiveness:", error);
        toast({
          title: "Error updating effectiveness",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }
      
      // Update local state
      setStrategies(prev => 
        prev.map(s => s.id === id ? { ...s, effectiveness } : s)
      );
      
      return true;
    } catch (err) {
      console.error("Error in updateEffectiveness:", err);
      return false;
    }
  }, [user, toast]);

  // Load strategies on component mount and when user changes
  useEffect(() => {
    if (user) {
      fetchStrategies();
    }
  }, [user, fetchStrategies]);

  return {
    showStrategies,
    strategies,
    isLoading,
    handleShowStrategies,
    handleHideStrategies,
    fetchStrategies,
    saveStrategy,
    deleteStrategy,
    updateEffectiveness
  };
}
