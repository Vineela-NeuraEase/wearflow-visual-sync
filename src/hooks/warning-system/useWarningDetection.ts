
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook that handles warning detection and logging warning events
 */
export function useWarningDetection({
  user,
  regulationScore,
  warningActive,
  setWarningActive,
  warningEventId,
  setWarningEventId,
  dataPoints,
  sensoryData,
  sleepData,
  routineData,
  behavioralData,
  latestPatterns
}) {
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
            
            // Use the meltdown_events table instead of warning_events
            const { data, error } = await supabase
              .from('meltdown_events')
              .insert({
                user_id: user.id,
                intensity: 100 - regulationScore, // Convert regulation score to intensity
                duration: 0, // Set initial duration to 0
                notes: latestPatterns.join(', '),
                triggers: ["early warning detected"], // Add this as a trigger
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
            // Update the meltdown_events entry with a duration to indicate it's resolved
            const { error } = await supabase
              .from('meltdown_events')
              .update({
                duration: 15, // Set a nominal duration in minutes
                notes: (latestPatterns.join(', ') + " - Automatically resolved")
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
  }, [
    regulationScore,
    warningActive,
    user,
    dataPoints,
    sensoryData,
    sleepData,
    routineData,
    behavioralData,
    latestPatterns,
    warningEventId,
    setWarningActive,
    setWarningEventId
  ]);
}
