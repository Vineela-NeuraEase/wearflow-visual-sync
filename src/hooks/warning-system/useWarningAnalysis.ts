
import { useState, useEffect } from "react";
import { BiometricDataPoint } from '@/hooks/biometrics/types';
import { useToast } from "@/hooks/use-toast";

interface UseWarningAnalysisProps {
  biometricData: BiometricDataPoint[];
  sensorData: any[] | null;
}

export function useWarningAnalysis({ biometricData, sensorData }: UseWarningAnalysisProps) {
  const { toast } = useToast();
  const [warningLevel, setWarningLevel] = useState<'normal' | 'notice' | 'watch' | 'alert'>('normal');
  const [rumblingScore, setRumblingScore] = useState(0);
  const [timeToThreshold, setTimeToThreshold] = useState<string | null>(null);
  const [latestPatterns, setLatestPatterns] = useState<string[]>([]);
  
  // Calculate rumbling score from sensor data and other factors
  useEffect(() => {
    // Combine data from both sources - real-time wearable and server data
    const allData = [...biometricData];
    
    if (sensorData && sensorData.length > 0) {
      // Transform Supabase data format to match BiometricData format
      const transformedSensorData = sensorData.map(item => {
        // Convert Supabase data format to BiometricData format
        return {
          heartRate: item.data_type === 'heartRate' ? item.value : 70, // default value
          hrv: item.data_type === 'hrv' ? item.value : 50, // default value
          stressLevel: item.data_type === 'stress' ? item.value : 30, // default value
          timestamp: item.timestamp
        } as BiometricDataPoint;
      });
      
      // Add transformed data
      allData.push(...transformedSensorData);
    }
    
    if (allData.length === 0) return;
    
    // This is a simplified algorithm - in a real app, this would be more sophisticated
    // using machine learning models trained on the user's historical data
    
    // Mock pattern detection algorithm
    const analyzePatterns = () => {
      const heartRateData = allData.filter(d => 'heartRate' in d);
      const hrvData = allData.filter(d => 'hrv' in d);
      
      const patterns: string[] = [];
      let calculatedScore = 0;
      
      // Detect elevated heart rate trend
      if (heartRateData.length >= 3) {
        const recentAvg = heartRateData.slice(0, 3).reduce((sum, item) => sum + Number(item.heartRate), 0) / 3;
        const olderAvg = heartRateData.slice(3, 6).reduce((sum, item) => sum + Number(item.heartRate), 0) / 3;
        
        if (recentAvg > olderAvg + 5) {
          patterns.push('Rising heart rate detected');
          calculatedScore += 20;
        }
      }
      
      // Detect decreasing HRV trend (indicator of stress)
      if (hrvData.length >= 3) {
        const recentAvg = hrvData.slice(0, 3).reduce((sum, item) => sum + Number(item.hrv), 0) / 3;
        const olderAvg = hrvData.slice(3, 6).reduce((sum, item) => sum + Number(item.hrv), 0) / 3;
        
        if (recentAvg < olderAvg - 3) {
          patterns.push('Decreasing HRV detected');
          calculatedScore += 25;
        }
      }
      
      // Use stress level data if available
      const stressData = allData.filter(d => 'stressLevel' in d);
      if (stressData.length > 0) {
        const avgStress = stressData.reduce((sum, item: any) => sum + Number(item.stressLevel), 0) / stressData.length;
        if (avgStress > 60) {
          patterns.push('Elevated stress level detected');
          calculatedScore += 20;
        }
      }
      
      // For demonstration, add some random factors
      if (Math.random() > 0.7) {
        patterns.push('Sleep quality was below threshold last night');
        calculatedScore += 15;
      }
      
      if (Math.random() > 0.8) {
        patterns.push('Current environment has multiple known triggers');
        calculatedScore += 20;
      }
      
      // Cap the score at 100
      calculatedScore = Math.min(calculatedScore, 100);
      
      setLatestPatterns(patterns);
      setRumblingScore(calculatedScore);
      
      // Set warning level based on score
      if (calculatedScore > 75) {
        setWarningLevel('alert');
        setTimeToThreshold('~15-30 minutes');
      } else if (calculatedScore > 50) {
        setWarningLevel('watch');
        setTimeToThreshold('~45-60 minutes');
      } else if (calculatedScore > 25) {
        setWarningLevel('notice');
        setTimeToThreshold('~90+ minutes');
      } else {
        setWarningLevel('normal');
        setTimeToThreshold(null);
      }
    };
    
    analyzePatterns();
  }, [biometricData, sensorData]);

  const dismissWarning = () => {
    toast({
      title: "Warning acknowledged",
      description: "You've acknowledged the current warning level."
    });
  };

  return {
    warningLevel,
    rumblingScore,
    timeToThreshold,
    latestPatterns,
    dismissWarning
  };
}
