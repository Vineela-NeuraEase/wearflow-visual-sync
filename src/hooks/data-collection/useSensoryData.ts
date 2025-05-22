
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SensoryData } from '@/types/strategy';
import { useToast } from '@/hooks/use-toast';

interface UseSensoryDataProps {
  user: any | null;
  setIsLoading: (isLoading: boolean) => void;
}

export const useSensoryData = ({ user, setIsLoading }: UseSensoryDataProps) => {
  const { toast } = useToast();
  
  const saveSensoryData = async (data: Omit<SensoryData, "user_id">) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save sensory data",
        variant: "destructive"
      });
      return null;
    }
    
    setIsLoading(true);
    
    try {
      // Rename light_level to light_intensity for database compatibility
      const { light_level, ...otherData } = data;
      
      const { data: savedData, error } = await supabase
        .from('sensory_data')
        .insert({
          ...otherData,
          light_intensity: light_level, // Map light_level to light_intensity
          user_id: user.id,
          timestamp: data.timestamp || new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) {
        console.error("Error saving sensory data:", error);
        toast({
          title: "Error",
          description: "Failed to save sensory data",
          variant: "destructive"
        });
        return null;
      }
      
      toast({
        title: "Sensory data saved",
        description: "Your sensory data has been recorded"
      });
      
      return savedData;
    } catch (err) {
      console.error("Error in saveSensoryData:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchSensoryData = async (limit = 7) => {
    if (!user) return [];
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('sensory_data')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(limit);
      
      if (error) {
        console.error("Error fetching sensory data:", error);
        toast({
          title: "Error",
          description: "Failed to load sensory data",
          variant: "destructive"
        });
        return [];
      }
      
      return data || [];
    } catch (err) {
      console.error("Error in fetchSensoryData:", err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    saveSensoryData,
    fetchSensoryData
  };
};
