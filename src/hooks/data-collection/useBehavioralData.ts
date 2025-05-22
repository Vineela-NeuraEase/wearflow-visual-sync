
import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "../use-toast";
import { BehavioralData } from '@/types/biometric';
import { User } from '@supabase/supabase-js';

interface UseBehavioralDataProps {
  user: User | null;
  setIsLoading: (loading: boolean) => void;
}

export const useBehavioralData = ({ user, setIsLoading }: UseBehavioralDataProps) => {
  const { toast } = useToast();
  
  // Function to save behavioral data
  const saveBehavioralData = useCallback(async (data: Omit<BehavioralData, "user_id">) => {
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
      
      // Ensure required fields are present
      const completeData = {
        irritability_level: data.irritability_level,
        notes: data.notes,
        timestamp: data.timestamp || new Date().toISOString(),
        communication_difficulty: data.communication_difficulty || 0,
        social_withdrawal: data.social_withdrawal || 0,
        self_reported_mood: data.self_reported_mood || 5,
        stimming: data.stimming || 0,
        user_id: user.id
      };
      
      const { data: result, error } = await supabase.from('behavioral_data').insert(completeData).select().single();
      
      if (error) throw error;
      
      toast({
        title: "Behavioral data saved",
        description: "Your behavioral data has been recorded",
      });
      
      return result;
    } catch (error) {
      console.error('Error saving behavioral data:', error);
      toast({
        title: "Error saving data",
        description: "There was a problem saving your behavioral data",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [user, toast, setIsLoading]);
  
  // Fetch behavioral data for user
  const fetchBehavioralData = useCallback(async (limit = 10) => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('behavioral_data')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(limit);
      
      if (error) {
        console.error("Error fetching behavioral data:", error);
        return [];
      }
      
      return data || [];
    } catch (err) {
      console.error("Error in fetchBehavioralData:", err);
      return [];
    }
  }, [user]);

  return {
    saveBehavioralData,
    fetchBehavioralData
  };
};
