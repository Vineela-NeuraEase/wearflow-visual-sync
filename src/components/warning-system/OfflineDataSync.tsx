
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BiometricData } from "@/types/strategy";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CloudOff, Upload, Check } from "lucide-react";

interface OfflineDataSyncProps {
  offlineData: BiometricData[];
  isOnline: boolean;
}

export const OfflineDataSync = ({ offlineData, isOnline }: OfflineDataSyncProps) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  if (offlineData.length === 0 || !isOnline) {
    return null;
  }
  
  const handleSync = async () => {
    if (!user) return;
    
    try {
      setIsSyncing(true);
      
      // Convert biometric data to sensor readings for database
      const sensorData = offlineData.flatMap(reading => {
        const timestamp = reading.timestamp || new Date().toISOString();
        const entries = [];
        
        if (reading.heartRate !== undefined) {
          entries.push({
            user_id: user.id,
            data_type: 'heartRate',
            value: reading.heartRate,
            timestamp
          });
        }
        
        if (reading.hrv !== undefined) {
          entries.push({
            user_id: user.id,
            data_type: 'hrv',
            value: reading.hrv,
            timestamp
          });
        }
        
        if (reading.stressLevel !== undefined) {
          entries.push({
            user_id: user.id,
            data_type: 'stress',
            value: reading.stressLevel,
            timestamp
          });
        }
        
        return entries;
      });
      
      // Batch insert the data into sensor_data table
      const { error } = await supabase
        .from('sensor_data')
        .insert(sensorData);
      
      if (error) {
        console.error("Error syncing offline data:", error);
        toast({
          title: "Sync failed",
          description: "Failed to sync offline data",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Data synced",
          description: `Successfully synced ${sensorData.length} readings`,
        });
        setSyncComplete(true);
      }
    } catch (err) {
      console.error("Error in sync process:", err);
      toast({
        title: "Sync error",
        description: "An unexpected error occurred during sync",
        variant: "destructive"
      });
    } finally {
      setIsSyncing(false);
    }
  };
  
  return (
    <Card className="bg-blue-50 dark:bg-blue-900/20 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <CloudOff className="text-blue-500 mr-3 h-5 w-5" />
          <div>
            <h3 className="font-medium">Offline data available</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {offlineData.length} readings collected while offline
            </p>
          </div>
        </div>
        
        {syncComplete ? (
          <div className="flex items-center text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded">
            <Check className="h-4 w-4 mr-1" />
            Synced
          </div>
        ) : (
          <Button 
            onClick={handleSync} 
            disabled={isSyncing}
            size="sm"
          >
            {isSyncing ? (
              <>Syncing...</>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Sync Now
              </>
            )}
          </Button>
        )}
      </div>
    </Card>
  );
};
