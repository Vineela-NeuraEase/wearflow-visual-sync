
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bluetooth } from "lucide-react";

const WearablePairing = () => {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold text-center">Connect Your Wearable</h1>
      
      <Card className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Bluetooth className="h-8 w-8 text-blue-600" />
          </div>
          
          <h2 className="text-lg font-semibold">Connect a Wearable Device</h2>
          
          <p className="text-sm text-muted-foreground">
            Connect a compatible wearable device to enable real-time monitoring and early warnings.
          </p>
          
          <Button className="w-full">
            Scan for Devices
          </Button>
          
          <Button variant="outline" className="w-full">
            Skip for Now
          </Button>
        </div>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to="/welcome/personalize">Back</Link>
        </Button>
        <Button asChild>
          <Link to="/welcome/add-ons">Next</Link>
        </Button>
      </div>
    </div>
  );
};

export default WearablePairing;
