
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SleepData } from '@/types/strategy';
import { useToast } from '@/hooks/use-toast';

interface UseSleepDataProps {
  user: any | null;
  setIsLoading: (isLoading: boolean) => void;
}

export const useSleepData = ({ user, setIsLoading }: UseSleepDataProps) => {
  const { toast } = useToast();
  
  const saveSleepData = async (data: Omit<SleepData, "user_id">) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save sleep data",
        variant: "destructive"
      });
      return null;
    }
    
    setIsLoading(true);
    
    try {
      // Check if there's already data for this date
      const { data: existingData, error: fetchError } = await supabase
        .from('sleep_data')
        .select('id')
        .eq('user_id', user.id)
        .eq('date', data.date)
        .maybeSingle();
      
      if (fetchError) {
        console.error("Error checking existing sleep data:", fetchError);
      }
      
      let savedData;
      
      if (existingData) {
        // Update existing record
        const { data: updatedData, error } = await supabase
          .from('sleep_data')
          .update({
            ...data,
            user_id: user.id
          })
          .eq('id', existingData.id)
          .select()
          .single();
        
        if (error) {
          console.error("Error updating sleep data:", error);
          toast({
            title: "Error",
            description: "Failed to update sleep data",
            variant: "destructive"
          });
          return null;
        }
        
        savedData = updatedData;
        toast({
          title: "Sleep data updated",
          description: "Your sleep data has been updated"
        });
      } else {
        // Insert new record
        const { data: insertedData, error } = await supabase
          .from('sleep_data')
          .insert({
            ...data,
            user_id: user.id
          })
          .select()
          .single();
        
        if (error) {
          console.error("Error saving sleep data:", error);
          toast({
            title: "Error",
            description: "Failed to save sleep data",
            variant: "destructive"
          });
          return null;
        }
        
        savedData = insertedData;
        toast({
          title: "Sleep data saved",
          description: "Your sleep data has been recorded"
        });
      }
      
      return savedData;
    } catch (err) {
      console.error("Error in saveSleepData:", err);
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
  
  const fetchSleepData = async (limit = 7) => {
    if (!user) return [];
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('sleep_data')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(limit);
      
      if (error) {
        console.error("Error fetching sleep data:", error);
        toast({
          title: "Error",
          description: "Failed to load sleep data",
          variant: "destructive"
        });
        return [];
      }
      
      return data || [];
    } catch (err) {
      console.error("Error in fetchSleepData:", err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    saveSleepData,
    fetchSleepData
  };
};
