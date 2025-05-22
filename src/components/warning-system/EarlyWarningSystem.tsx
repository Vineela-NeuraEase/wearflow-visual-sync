
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, TrendingDown, ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  
  // Fetch latest sensor data and environmental factors to calculate rumbling score
  const { data: latestSensorData } = useQuery({
    queryKey: ['latestSensorData', userId],
    queryFn: async () => {
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
    },
    refetchInterval: 15000 // Refetch every 15 seconds
  });
  
  // Calculate rumbling score from sensor data and other factors
  useEffect(() => {
    if (!latestSensorData || latestSensorData.length === 0) return;
    
    // This is a simplified algorithm - in a real app, this would be more sophisticated
    // using machine learning models trained on the user's historical data
    
    // Mock pattern detection algorithm
    const analyzePatterns = () => {
      const heartRateData = latestSensorData.filter(d => d.data_type === 'heart_rate');
      const hrvData = latestSensorData.filter(d => d.data_type === 'hrv');
      
      const patterns: string[] = [];
      let calculatedScore = 0;
      
      // Detect elevated heart rate trend
      if (heartRateData.length >= 3) {
        const recentAvg = heartRateData.slice(0, 3).reduce((sum, item) => sum + Number(item.value), 0) / 3;
        const olderAvg = heartRateData.slice(3, 6).reduce((sum, item) => sum + Number(item.value), 0) / 3;
        
        if (recentAvg > olderAvg + 5) {
          patterns.push('Rising heart rate detected');
          calculatedScore += 20;
        }
      }
      
      // Detect decreasing HRV trend (indicator of stress)
      if (hrvData.length >= 3) {
        const recentAvg = hrvData.slice(0, 3).reduce((sum, item) => sum + Number(item.value), 0) / 3;
        const olderAvg = hrvData.slice(3, 6).reduce((sum, item) => sum + Number(item.value), 0) / 3;
        
        if (recentAvg < olderAvg - 3) {
          patterns.push('Decreasing HRV detected');
          calculatedScore += 25;
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
  }, [latestSensorData]);
  
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
          </div>
        </div>
      )}
    </Card>
  );
};
