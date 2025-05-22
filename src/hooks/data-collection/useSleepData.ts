
import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "../use-toast";
import { SleepData } from '@/types/biometric';
import { User } from '@supabase/supabase-js';

interface UseSleepDataProps {
  user: User | null;
  setIsLoading: (loading: boolean) => void;
}

export const useSleepData = ({ user, setIsLoading }: UseSleepDataProps) => {
  const { toast } = useToast();
  
  // Function to save sleep data
  const saveSleepData = useCallback(async (data: Omit<SleepData, "user_id">) => {
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
      
      // Ensure all required fields are present
      const completeData = {
        ...data,
        // If rem_sleep_percentage is missing, add a default value
        rem_sleep_percentage: data.rem_sleep_percentage || Math.floor(data.duration * 0.25),
        user_id: user.id
      };
      
      const { data: result, error } = await supabase.from('sleep_data').insert(completeData).select().single();
      
      if (error) throw error;
      
      toast({
        title: "Sleep data saved",
        description: "Your sleep data has been recorded",
      });
      
      return result;
    } catch (error) {
      console.error('Error saving sleep data:', error);
      toast({
        title: "Error saving data",
        description: "There was a problem saving your sleep data",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [user, toast, setIsLoading]);
  
  // Fetch sleep data for user
  const fetchSleepData = useCallback(async (limit = 10) => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('sleep_data')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(limit);
      
      if (error) {
        console.error("Error fetching sleep data:", error);
        return [];
      }
      
      return data || [];
    } catch (err) {
      console.error("Error in fetchSleepData:", err);
      return [];
    }
  }, [user]);

  return {
    saveSleepData,
    fetchSleepData
  };
};
