
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { BiometricDataPoint } from '@/hooks/biometrics/types';
import { SleepData, SensoryData, RoutineData, BehavioralData } from '@/types/biometric';
import { Strategy } from '@/types/strategy';
import { WarningStrategy } from './types';

interface UseWarningEventsProps {
  regulationScore: number;
  dataPoints: BiometricDataPoint[];
  sensoryData: SensoryData | null;
  sleepData: SleepData | null;
  routineData: RoutineData | null;
  behavioralData: BehavioralData | null;
  warningLevel: string | null;
  latestPatterns: string[];
}

export function useWarningEvents({
  regulationScore,
  dataPoints,
  sensoryData,
  sleepData,
  routineData,
  behavioralData,
  warningLevel,
  latestPatterns
}: UseWarningEventsProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [warningActive, setWarningActive] = useState(false);
  const [warningEventId, setWarningEventId] = useState<string | null>(null);
  
  // Check for warning condition and log warning events
  useEffect(() => {
    const handleWarningStateChange = async () => {
      if (regulationScore < 70 && !warningActive) {
        setWarningActive(true);
        
        // Only log warning events if the user is signed in
        if (user) {
          try {
            // Create a sensor data snapshot
            const sensorSnapshot = {
              biometric: dataPoints.slice(0, 5),
              sensory: sensoryData,
              sleep: sleepData,
              routine: routineData,
              behavioral: behavioralData
            };
            
            // Cast the supabase client to any to bypass type checking for this call
            const { data, error } = await (supabase as any)
              .from('warning_events')
              .insert({
                user_id: user.id,
                warning_level: warningLevel || 'watch',
                regulation_score: regulationScore,
                sensor_data_snapshot: sensorSnapshot,
                notes: latestPatterns.join(', ')
              })
              .select()
              .single();
              
            if (error) {
              console.error("Error logging warning event:", error);
            } else if (data) {
              setWarningEventId(data.id);
              console.log("Warning event logged with ID:", data.id);
            }
          } catch (err) {
            console.error("Failed to log warning event:", err);
          }
        }
      } else if (regulationScore >= 70 && warningActive) {
        setWarningActive(false);
        
        // Update warning event with resolved timestamp if it exists
        if (user && warningEventId) {
          try {
            // Cast the supabase client to any to bypass type checking for this call
            const { error } = await (supabase as any)
              .from('warning_events')
              .update({
                resolved_at: new Date().toISOString()
              })
              .eq('id', warningEventId);
              
            if (error) {
              console.error("Error resolving warning event:", error);
            } else {
              console.log("Warning event resolved:", warningEventId);
              setWarningEventId(null);
            }
          } catch (err) {
            console.error("Failed to resolve warning event:", err);
          }
        }
      }
    };
    
    handleWarningStateChange();
  }, [regulationScore, warningActive, user, dataPoints, sensoryData, sleepData, routineData, behavioralData, warningLevel, latestPatterns, warningEventId]);

  // Update to accept Strategy[] instead of WarningStrategy[]
  const resolveWarningWithStrategy = async (strategyId: string, strategies: Strategy[]) => {
    if (!user || !warningEventId) return false;
    
    try {
      // Cast the supabase client to any to bypass type checking for this call
      const { error } = await (supabase as any)
        .from('warning_events')
        .update({
          resolved_at: new Date().toISOString(),
          resolution_strategy_id: strategyId
        })
        .eq('id', warningEventId);
        
      if (error) {
        console.error("Error updating warning event with strategy:", error);
        toast({
          title: "Error",
          description: "Failed to record resolution strategy",
          variant: "destructive"
        });
        return false;
      } else {
        setWarningEventId(null);
        setWarningActive(false);
        
        toast({
          title: "Warning resolved",
          description: "Your selected strategy has been recorded",
        });
        return true;
      }
    } catch (err) {
      console.error("Failed to resolve warning with strategy:", err);
      return false;
    }
  };

  return {
    warningActive,
    warningEventId,
    resolveWarningWithStrategy
  };
}
