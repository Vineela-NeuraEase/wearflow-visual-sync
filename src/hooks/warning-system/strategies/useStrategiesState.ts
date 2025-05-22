
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Strategy } from '@/types/strategy';
import { supabase } from "@/integrations/supabase/client";
import { defaultStrategies } from "./types";

export function useStrategiesState() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  
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
  
  return {
    strategies,
    setStrategies,
    loading,
    error
  };
}
