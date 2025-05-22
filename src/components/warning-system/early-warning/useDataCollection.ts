
import { useState, useEffect, useCallback } from "react";
import { BiometricData } from "./types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

interface UseDataCollectionProps {
  userId?: string;
}

export function useDataCollection({ userId }: UseDataCollectionProps = {}) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);
  const [biometricData, setBiometricData] = useState<BiometricData[]>([]);
  
  // Use authenticated user ID if available
  const currentUserId = userId || user?.id;
  
  // Local storage key for offline data
  const OFFLINE_DATA_KEY = 'hana_offline_biometric_data';
  
  // Load any stored offline data on component mount
  useEffect(() => {
    const storedData = localStorage.getItem(OFFLINE_DATA_KEY);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
          setBiometricData(prevData => [...prevData, ...parsedData]);
          console.log(`Loaded ${parsedData.length} stored data points from local storage`);
          // Clear storage after loading to avoid duplicates
          localStorage.removeItem(OFFLINE_DATA_KEY);
        }
      } catch (error) {
        console.error("Failed to parse stored biometric data:", error);
      }
    }
  }, []);
  
  // Save to local storage when offline
  useEffect(() => {
    if (biometricData.length > 0 && !navigator.onLine) {
      localStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(biometricData));
      console.log("Saved biometric data to local storage for offline use");
    }
  }, [biometricData, navigator.onLine]);
  
  // Fetch latest sensor data
  const { data: latestSensorData } = useQuery({
    queryKey: ['latestSensorData', currentUserId],
    queryFn: async () => {
      if (!navigator.onLine || !currentUserId) {
        console.log("Offline mode or no user ID: skipping server fetch");
        return null;
      }
      
      try {
        // Fetch from the specific user's data
        const { data, error } = await supabase
          .from('sensor_data')
          .select('*')
          .eq('user_id', currentUserId)
          .order('timestamp', { ascending: false })
          .limit(10);
          
        if (error) {
          console.error('Error fetching sensor data:', error);
          return null;
        }
          
        return data;
      } catch (err) {
        console.error("Network error:", err);
        return null;
      }
    },
    refetchInterval: 15000, // Refetch every 15 seconds
    enabled: navigator.onLine && currentUserId !== undefined, // Only run when online and user is authenticated
  });
  
  // Handler for receiving real-time data from wearable
  const handleBiometricData = useCallback((data: BiometricData) => {
    // Add the new data to our state
    setBiometricData(prevData => {
      const newData = [data, ...prevData].slice(0, 50); // Keep the most recent 50 readings
      return newData;
    });
    
    // Log for debugging
    console.log("Received new biometric data:", data);
    
    // If we're online and authenticated, sync with the backend
    if (navigator.onLine && currentUserId) {
      // Convert the biometric data to sensor_data format
      const sensorDataToSync = [
        { data_type: 'heartRate', value: data.heartRate || 0, user_id: currentUserId },
        { data_type: 'hrv', value: data.hrv || 0, user_id: currentUserId },
        { data_type: 'stress', value: data.stressLevel || 0, user_id: currentUserId }
      ];
      
      // Only sync values that are present
      const validSensorData = sensorDataToSync.filter(item => item.value > 0);
      
      if (validSensorData.length > 0) {
        supabase.from('sensor_data')
          .insert(validSensorData)
          .then(({ error }) => {
            if (error) console.error("Error syncing data to Supabase:", error);
          });
      }
    }
  }, [currentUserId]);
  
  // Handle device connection
  const handleDeviceConnected = (device: any) => {
    console.log("Device connected:", device);
    setIsDeviceConnected(true);
    toast({
      title: "Wearable Connected",
      description: "Now receiving real-time biometric data",
    });
  };

  return {
    isDeviceConnected,
    biometricData,
    latestSensorData,
    handleDeviceConnected,
    handleBiometricData
  };
}
