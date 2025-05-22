
import React from 'react';
import { Button } from '@/components/ui/button';

interface ConnectDeviceButtonProps {
  isConnecting: boolean;
  onConnect: () => void;
}

export function ConnectDeviceButton({ 
  isConnecting, 
  onConnect 
}: ConnectDeviceButtonProps) {
  return (
    <Button
      className="w-full"
      onClick={onConnect}
      disabled={isConnecting}
    >
      {isConnecting ? "Connecting..." : "Connect Wearable Device"}
    </Button>
  );
}
