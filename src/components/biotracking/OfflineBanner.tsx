
import { Upload, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface OfflineBannerProps {
  isOnline: boolean;
  offlineData: any[] | null;
}

export const OfflineBanner = ({ isOnline, offlineData }: OfflineBannerProps) => {
  const { toast } = useToast();
  
  if (isOnline && (!offlineData || offlineData.length === 0)) {
    return null;
  }
  
  return (
    <div className="flex items-center">
      {!isOnline && (
        <div className="mr-2 flex items-center text-amber-500 bg-amber-50 px-2 py-1 rounded text-xs">
          <WifiOff className="h-3 w-3 mr-1" />
          Offline
        </div>
      )}
      {offlineData && offlineData.length > 0 && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            toast({
              title: "Syncing Data",
              description: `${offlineData.length} measurements being uploaded...`
            });
          }}
          className="mr-2 text-xs"
          disabled={!isOnline}
        >
          <Upload className="h-3 w-3 mr-1" />
          Sync ({offlineData.length})
        </Button>
      )}
    </div>
  );
};
