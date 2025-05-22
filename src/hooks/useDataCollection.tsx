
import { useCallback, useState, useEffect } from 'react';
import { BiometricData } from '@/types/biometric';
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
  
  // Function to collect and process data, for use by BluetoothDeviceManager
  const collectData = useCallback(() => {
    console.log("Collecting data...");
    // This could be expanded to fetch historical data, process offlined data, etc.
  }, []);
  
  // Function to save sleep data
  const saveSleepData = useCallback(async (data: Omit<BiometricData["SleepData"], "user_id">) => {
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
      const { data: result, error } = await supabase.from('sleep_data').insert({
        ...data,
        user_id: user.id
      }).select().single();
      
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
  
  // Similar functions for other data types
  
  return {
    isLoading,
    collectData,
    saveSleepData,
    // Add other data handling functions here
  };
};
