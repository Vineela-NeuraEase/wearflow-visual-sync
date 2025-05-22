
import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "../use-toast";
import { RoutineData } from '@/types/biometric';
import { User } from '@supabase/supabase-js';

interface UseRoutineDataProps {
  user: User | null;
  setIsLoading: (loading: boolean) => void;
}

export const useRoutineData = ({ user, setIsLoading }: UseRoutineDataProps) => {
  const { toast } = useToast();
  
  // Function to save routine data
  const saveRoutineData = useCallback(async (data: Omit<RoutineData, "user_id">) => {
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
        expected_activity: data.expected_activity || data.routine_change || 'Unspecified',
        actual_activity: data.actual_activity || data.routine_change || 'Unspecified',
        location: data.location || 'Not specified',
        is_unexpected_change: data.is_unexpected_change !== undefined ? data.is_unexpected_change : !data.is_planned,
        deviation_score: data.deviation_score || data.disruption_level || 5,
        timestamp: data.timestamp || new Date().toISOString(),
        user_id: user.id
      };
      
      const { data: result, error } = await supabase.from('routine_data').insert(completeData).select().single();
      
      if (error) throw error;
      
      toast({
        title: "Routine data saved",
        description: "Your routine change data has been recorded",
      });
      
      return result;
    } catch (error) {
      console.error('Error saving routine data:', error);
      toast({
        title: "Error saving data",
        description: "There was a problem saving your routine data",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [user, toast, setIsLoading]);
  
  // Fetch routine data for user
  const fetchRoutineData = useCallback(async (limit = 10) => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('routine_data')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(limit);
      
      if (error) {
        console.error("Error fetching routine data:", error);
        return [];
      }
      
      return data || [];
    } catch (err) {
      console.error("Error in fetchRoutineData:", err);
      return [];
    }
  }, [user]);

  return {
    saveRoutineData,
    fetchRoutineData
  };
};
