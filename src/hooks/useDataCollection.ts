
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  SleepData, 
  SensoryData, 
  RoutineData, 
  BehavioralData 
} from "@/types/biometric";

export function useDataCollection() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Save sleep data to Supabase
  const saveSleepData = useCallback(async (data: Omit<SleepData, "user_id">) => {
    if (!user) return null;
    
    setIsLoading(true);
    try {
      const { data: savedData, error } = await supabase
        .from('sleep_data')
        .insert([{ 
          ...data, 
          user_id: user.id 
        }])
        .select()
        .single();
      
      if (error) {
        console.error("Error saving sleep data:", error);
        toast({
          title: "Error saving sleep data",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }
      
      toast({
        title: "Sleep data saved",
        description: "Your sleep information has been recorded"
      });
      
      return savedData;
    } catch (err) {
      console.error("Error in saveSleepData:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);
  
  // Save sensory data to Supabase
  const saveSensoryData = useCallback(async (data: Omit<SensoryData, "user_id">) => {
    if (!user) return null;
    
    setIsLoading(true);
    try {
      const { data: savedData, error } = await supabase
        .from('sensory_data')
        .insert([{ 
          ...data, 
          user_id: user.id 
        }])
        .select()
        .single();
      
      if (error) {
        console.error("Error saving sensory data:", error);
        toast({
          title: "Error saving sensory data",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }
      
      toast({
        title: "Sensory data saved",
        description: "Your sensory environment has been recorded"
      });
      
      return savedData;
    } catch (err) {
      console.error("Error in saveSensoryData:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);
  
  // Save routine data to Supabase
  const saveRoutineData = useCallback(async (data: Omit<RoutineData, "user_id">) => {
    if (!user) return null;
    
    setIsLoading(true);
    try {
      const { data: savedData, error } = await supabase
        .from('routine_data')
        .insert([{ 
          ...data, 
          user_id: user.id 
        }])
        .select()
        .single();
      
      if (error) {
        console.error("Error saving routine data:", error);
        toast({
          title: "Error saving routine data",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }
      
      toast({
        title: "Routine data saved",
        description: "Your schedule change has been recorded"
      });
      
      return savedData;
    } catch (err) {
      console.error("Error in saveRoutineData:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);
  
  // Save behavioral data to Supabase
  const saveBehavioralData = useCallback(async (data: Omit<BehavioralData, "user_id">) => {
    if (!user) return null;
    
    setIsLoading(true);
    try {
      const { data: savedData, error } = await supabase
        .from('behavioral_data')
        .insert([{ 
          ...data, 
          user_id: user.id 
        }])
        .select()
        .single();
      
      if (error) {
        console.error("Error saving behavioral data:", error);
        toast({
          title: "Error saving behavioral data",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }
      
      toast({
        title: "Behavioral data saved",
        description: "Your current state has been recorded"
      });
      
      return savedData;
    } catch (err) {
      console.error("Error in saveBehavioralData:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);
  
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
    isLoading,
    saveSleepData,
    saveSensoryData,
    saveRoutineData,
    saveBehavioralData,
    fetchSleepData,
    fetchSensoryData,
    fetchRoutineData,
    fetchBehavioralData
  };
}
