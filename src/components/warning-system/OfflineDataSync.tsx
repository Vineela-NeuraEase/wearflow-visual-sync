
import { WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OfflineDataSyncProps {
  offlineData: any[];
  isOnline: boolean;
}

export const OfflineDataSync = ({ 
  offlineData, 
  isOnline 
}: OfflineDataSyncProps) => {
  if (!offlineData || offlineData.length === 0) return null;
  
  return (
    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between">
      <p className="text-sm text-amber-800">
        {offlineData.length} measurements stored locally while offline.
      </p>
      <Button 
        size="sm" 
        variant="outline" 
        className="bg-white"
        disabled={!isOnline}
      >
        {isOnline ? "Sync Now" : "Waiting for connection..."}
      </Button>
    </div>
  );
};
