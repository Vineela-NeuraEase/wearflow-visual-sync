
import { useCallback, useState, useEffect } from 'react';
import { BiometricData, SleepData, SensoryData, RoutineData, BehavioralData } from '@/types/biometric';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "./use-toast";

interface UseDataCollectionProps {
  isConnected?: boolean;
  isOnline?: boolean;
  onDataReceived?: (data: BiometricData) => void;
}

export const useDataCollection = ({ 
  isConnected = false, 
  isOnline = true,
  onDataReceived
}: UseDataCollectionProps = {}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Function to collect data - needed for BluetoothDeviceManager
  const collectData = useCallback(() => {
    console.log("Collecting data...");
    // This could be expanded to fetch historical data, process offline data, etc.
  }, []);
  
  // Listen for data from the Bluetooth device
  useEffect(() => {
    if (!isConnected) return;
    
    const handleBluetoothData = (event: Event) => {
      const customEvent = event as CustomEvent;
      const data = customEvent.detail;
      
      if (onDataReceived) {
        onDataReceived(data);
      }
      
      // If online, save to database
      if (user && isOnline) {
        saveSensorData(data);
      }
    };
    
    window.addEventListener('bluetoothData', handleBluetoothData);
    
    return () => {
      window.removeEventListener('bluetoothData', handleBluetoothData);
    };
  }, [isConnected, isOnline, onDataReceived, user]);
  
  // Function to save sensor data
  const saveSensorData = useCallback(async (data: BiometricData) => {
    if (!user) return;
    
    try {
      // Save different properties as separate data points
      if (data.heartRate !== undefined) {
        await supabase.from('sensor_data').insert({
          user_id: user.id,
          data_type: 'heartRate',
          value: data.heartRate,
          timestamp: data.timestamp || new Date().toISOString()
        });
      }
      
      if (data.hrv !== undefined) {
        await supabase.from('sensor_data').insert({
          user_id: user.id,
          data_type: 'hrv',
          value: data.hrv,
          timestamp: data.timestamp || new Date().toISOString()
        });
      }
      
      if (data.stressLevel !== undefined) {
        await supabase.from('sensor_data').insert({
          user_id: user.id,
          data_type: 'stress',
          value: data.stressLevel,
          timestamp: data.timestamp || new Date().toISOString()
        });
      }
      
    } catch (error) {
      console.error('Error saving sensor data:', error);
    }
  }, [user]);
  
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
  }, [user, toast]);
  
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
        timestamp: data.timestamp,
        light_intensity: data.light_intensity || data.light_level, // Use light_intensity if available, otherwise light_level
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
  }, [user, toast]);
  
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
  }, [user, toast]);
  
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
    collectData, // Fix: Include collectData in the return object
    saveSleepData,
    saveSensoryData,
    saveRoutineData,
    saveBehavioralData,
    fetchSleepData,
    fetchSensoryData,
    fetchRoutineData,
    fetchBehavioralData
  };
};
