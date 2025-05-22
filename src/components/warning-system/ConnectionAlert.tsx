
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ConnectionAlertProps {
  isConnected: boolean;
  dataPoints: any[];
}

export const ConnectionAlert = ({ isConnected, dataPoints }: ConnectionAlertProps) => {
  if (isConnected || dataPoints.length > 0) return null;
  
  return (
    <Alert className="bg-amber-50 border-amber-200 text-amber-800">
      <AlertDescription>
        Connect a wearable device to enable real-time monitoring and early warnings. The system will use historical and simulated data until a device is connected.
      </AlertDescription>
    </Alert>
  );
};
