
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";

const MeltdownTracking = () => {
  const [loading, setLoading] = React.useState(false);
  
  return (
    <div className="container max-w-5xl py-8 space-y-6 px-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Meltdown Tracking</h1>
          <p className="text-muted-foreground">
            Track and analyze meltdown patterns to identify triggers
          </p>
        </div>
        
        <Button className="flex items-center">
          <Plus className="h-4 w-4 mr-1" />
          Log Meltdown
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="border rounded-lg p-6 bg-white shadow-sm text-center">
          <p className="text-muted-foreground mb-4">
            No meltdown events recorded yet. Start tracking to identify patterns.
          </p>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Log Your First Meltdown
          </Button>
        </div>
      )}
    </div>
  );
};

export default MeltdownTracking;
