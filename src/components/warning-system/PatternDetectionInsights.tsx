
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown } from "lucide-react";
import { useState, useEffect } from 'react';
import { WeeklyTrendChart } from "./pattern-detection/WeeklyTrendChart";
import { PatternsList } from "./pattern-detection/PatternsList";
import { OfflineNotice } from "./pattern-detection/OfflineNotice";
import { defaultPatterns } from "./pattern-detection/defaultPatterns";
import { PatternDetectionInsightsProps } from "./pattern-detection/types";

export const PatternDetectionInsights = ({ 
  detectedPatterns = defaultPatterns,
  realtimeData
}: PatternDetectionInsightsProps) => {
  const [offlineMode, setOfflineMode] = useState(!navigator.onLine);
  
  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setOfflineMode(false);
    const handleOffline = () => setOfflineMode(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return (
    <Card className="p-5">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-1">Pattern Recognition</h2>
          <p className="text-sm text-muted-foreground">
            AI-detected patterns based on your historical data
          </p>
        </div>
        
        <Badge variant="secondary" className="flex items-center gap-1">
          <TrendingDown className="h-3 w-3" />
          {offlineMode ? "Offline Analysis" : "Active Monitoring"}
        </Badge>
      </div>
      
      <WeeklyTrendChart realtimeData={realtimeData} />
      
      <PatternsList patterns={detectedPatterns} />
      
      <OfflineNotice isOffline={offlineMode} />
    </Card>
  );
};
