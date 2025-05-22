
import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "../use-toast";
import { SensoryData } from '@/types/biometric';
import { User } from '@supabase/supabase-js';

interface UseSensoryDataProps {
  user: User | null;
  setIsLoading: (loading: boolean) => void;
}

export const useSensoryData = ({ user, setIsLoading }: UseSensoryDataProps) => {
  const { toast } = useToast();
  
  // Function to save sensory data
  const saveSensoryData = useCallback(async (data: Omit<SensoryData, "user_id">) => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please log in to save data",
        variant: "destructive"
      });
      return Promise.reject("Not logged in");
    }
    
    try {
      setIsLoading(true);
      
      // Convert light_level to light_intensity for database compatibility
      const dbData = {
        noise_level: data.noise_level,
        temperature: data.temperature,
        crowding: data.crowding,
        texture_sensitivity: data.texture_sensitivity,
        smell_sensitivity: data.smell_sensitivity,
        timestamp: data.timestamp || new Date().toISOString(),
        light_intensity: data.light_level, // Use light_level as the required light_intensity
        user_id: user.id
      };
      
      const { data: result, error } = await supabase.from('sensory_data').insert(dbData).select().single();
      
      if (error) throw error;
      
      toast({
        title: "Sensory data saved",
        description: "Your sensory environment data has been recorded",
      });
      
      return result;
    } catch (error) {
      console.error('Error saving sensory data:', error);
      toast({
        title: "Error saving data",
        description: "There was a problem saving your sensory data",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [user, toast, setIsLoading]);
  
  // Fetch sensory data for user
  const fetchSensoryData = useCallback(async (limit = 10) => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('sensory_data')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(limit);
      
      if (error) {
        console.error("Error fetching sensory data:", error);
        return [];
      }
      
      return data || [];
    } catch (err) {
      console.error("Error in fetchSensoryData:", err);
      return [];
    }
  }, [user]);

  return {
    saveSensoryData,
    fetchSensoryData
  };
};
