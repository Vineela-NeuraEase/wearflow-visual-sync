
import { useCallback, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { BiometricData } from '@/types/biometric';
import { User } from '@supabase/supabase-js';

interface UseSensorDataProps {
  isConnected: boolean;
  isOnline: boolean;
  onDataReceived?: (data: BiometricData) => void;
  user: User | null;
}

export const useSensorData = ({ 
  isConnected, 
  isOnline, 
  onDataReceived,
  user
}: UseSensorDataProps) => {
  // Function to collect data
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

  return {
    collectData,
    saveSensorData
  };
};
