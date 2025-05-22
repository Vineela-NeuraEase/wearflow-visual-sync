
import React from 'react';
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { BiometricDataPoint } from '@/hooks/biometrics/types';

interface ConnectionAlertProps {
  isConnected: boolean;
  dataPoints: BiometricDataPoint[];
}

export const ConnectionAlert = ({ 
  isConnected, 
  dataPoints 
}: ConnectionAlertProps) => {
  if (isConnected && dataPoints.length > 0) {
    return (
      <Card className="p-3 flex items-center bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
        <div>
          <p className="text-sm font-medium">Device connected</p>
          <p className="text-xs text-muted-foreground">
            Received {dataPoints.length} measurements
          </p>
        </div>
      </Card>
    );
  }

  if (isConnected) {
    return (
      <Card className="p-3 flex items-center bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
        <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
        <div>
          <p className="text-sm font-medium">Device connected</p>
          <p className="text-xs text-muted-foreground">
            Waiting for first measurement...
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-3 flex items-center bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
      <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
      <div>
        <p className="text-sm font-medium">No device connected</p>
        <p className="text-xs text-muted-foreground">
          Connect a device to begin monitoring
        </p>
      </div>
    </Card>
  );
};
