
import React from 'react';
import { Button } from '@/components/ui/button';

interface ConnectedDeviceProps {
  deviceName: string;
  isOnline: boolean;
  offlineDataCount: number;
  onDisconnect: () => void;
}

export function ConnectedDevice({ 
  deviceName,
  isOnline,
  offlineDataCount,
  onDisconnect
}: ConnectedDeviceProps) {
  return (
    <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-900/30">
      <div className="flex items-center">
        <div className="h-3 w-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
        <div>
          <span className="font-medium">Connected to {deviceName}</span>
          {!isOnline && (
            <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">
              Offline mode - Data stored locally ({offlineDataCount})
            </div>
          )}
        </div>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onDisconnect}
      >
        Disconnect
      </Button>
    </div>
  );
}
