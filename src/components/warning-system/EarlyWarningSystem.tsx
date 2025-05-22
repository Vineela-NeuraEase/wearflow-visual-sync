
import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, TrendingDown, ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BluetoothDeviceManager } from "@/components/BluetoothDeviceManager";

interface BiometricData {
  heartRate: number;
  hrv: number;
  stressLevel: number;
  timestamp: string;
}

interface EarlyWarningProps {
  userId?: string;
  onShowStrategies: () => void;
}

export const EarlyWarningSystem = ({ userId, onShowStrategies }: EarlyWarningProps) => {
  const { toast } = useToast();
  const [warningLevel, setWarningLevel] = useState<'normal' | 'notice' | 'watch' | 'alert'>('normal');
  const [rumblingScore, setRumblingScore] = useState(0);
  const [timeToThreshold, setTimeToThreshold] = useState<string | null>(null);
  const [detectedPatterns, setDetectedPatterns] = useState<string[]>([]);
  const [biometricData, setBiometricData] = useState<BiometricData[]>([]);
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);
  
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
  
  // Fetch latest sensor data and environmental factors to calculate rumbling score
  const { data: latestSensorData } = useQuery({
    queryKey: ['latestSensorData', userId],
    queryFn: async () => {
      if (!navigator.onLine) {
        console.log("Offline mode: skipping server fetch");
        return null;
      }
      
      try {
        // In a real app, this would fetch from a specific user's data
        const { data, error } = await supabase
          .from('sensor_data')
          .select('*')
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
    enabled: navigator.onLine && userId !== undefined, // Only run when online
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
    
    // If we're online, we could also sync this with the backend
    if (navigator.onLine) {
      // In a real app, we would sync with Supabase or another backend
      console.log("Online: data could be synced to backend");
      // Example: supabase.from('sensor_data').insert([data])
    }
  }, []);
  
  // Handle device connection
  const handleDeviceConnected = (device: any) => {
    console.log("Device connected:", device);
    setIsDeviceConnected(true);
    toast({
      title: "Wearable Connected",
      description: "Now receiving real-time biometric data",
    });
  };
  
  // Calculate rumbling score from sensor data and other factors
  useEffect(() => {
    // Combine data from both sources - real-time wearable and server data
    const allData = [...biometricData];
    
    if (latestSensorData && latestSensorData.length > 0) {
      // Add any additional data from the server that we don't have locally
      // In a real app, we'd need to deduplicate these
      allData.push(...latestSensorData);
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
      
      setDetectedPatterns(patterns);
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
  }, [biometricData, latestSensorData]);
  
  const getWarningColor = () => {
    switch (warningLevel) {
      case 'alert': return 'bg-red-500';
      case 'watch': return 'bg-amber-500';
      case 'notice': return 'bg-blue-500';
      default: return 'bg-green-500';
    }
  };
  
  const getWarningBackground = () => {
    switch (warningLevel) {
      case 'alert': return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900/30';
      case 'watch': return 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-900/30';
      case 'notice': return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-900/30';
      default: return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900/30';
    }
  };
  
  const dismissWarning = () => {
    toast({
      title: "Warning acknowledged",
      description: "You've acknowledged the current warning level."
    });
  };
  
  return (
    <Card className={`p-5 border ${getWarningBackground()}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Early Warning System</h2>
        {warningLevel !== 'normal' && (
          <div className={`px-3 py-1 rounded-full flex items-center text-sm ${
            warningLevel === 'alert' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 
            warningLevel === 'watch' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' : 
            'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
          }`}>
            <AlertTriangle className="h-4 w-4 mr-1" />
            {warningLevel.charAt(0).toUpperCase() + warningLevel.slice(1)}
          </div>
        )}
      </div>
      
      <BluetoothDeviceManager 
        onDeviceConnected={handleDeviceConnected}
        onDataReceived={handleBiometricData}
      />
      
      {!isDeviceConnected && biometricData.length === 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Connect a wearable device to enable continuous monitoring and early warning detection.
          </p>
        </div>
      )}
      
      {warningLevel !== 'normal' ? (
        <>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="font-medium">Rumbling Risk</span>
              <span>{rumblingScore}%</span>
            </div>
            <Progress value={rumblingScore} className={`h-3 ${getWarningColor()}`} />
            
            {timeToThreshold && (
              <div className="mt-2 text-sm text-muted-foreground flex items-center">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span>Estimated time to threshold: {timeToThreshold}</span>
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Detected Patterns:</h3>
            <ul className="space-y-1">
              {detectedPatterns.length > 0 ? (
                detectedPatterns.map((pattern, index) => (
                  <li key={index} className="text-sm flex items-start">
                    <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
                    <span>{pattern}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground">No specific patterns detected</li>
              )}
            </ul>
          </div>
          
          <div className="flex gap-2 mt-3">
            <Button 
              onClick={onShowStrategies} 
              className={`flex-1 ${
                warningLevel === 'alert' ? 'bg-red-600 hover:bg-red-700' : 
                warningLevel === 'watch' ? 'bg-amber-600 hover:bg-amber-700' : 
                'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              View Strategies
            </Button>
            <Button 
              variant="outline" 
              onClick={dismissWarning}
              className="flex-1"
            >
              <Check className="h-4 w-4 mr-2" />
              Acknowledge
            </Button>
          </div>
        </>
      ) : (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-start">
          <Info className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-green-800 dark:text-green-300">
              Status: Stable
            </h3>
            <p className="text-sm text-green-700 dark:text-green-400 mt-1">
              No early warning signs detected. Your regulation metrics are within your typical range.
            </p>
            {biometricData.length > 0 && (
              <div className="mt-2 text-xs text-green-700 dark:text-green-400">
                {biometricData.length} data points collected. Continuous monitoring active.
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};
