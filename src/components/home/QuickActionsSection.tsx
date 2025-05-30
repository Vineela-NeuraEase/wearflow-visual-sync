
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, Sparkles, Wind } from "lucide-react";

const QuickActionsSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        <Card 
          className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => navigate("/sos")}
        >
          <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-2 mb-2">
            <Activity className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <span className="text-sm">SOS Calm</span>
        </Card>
        
        <Card 
          className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => navigate("/breathing")}
        >
          <div className="rounded-full bg-cyan-100 dark:bg-cyan-900/20 p-2 mb-2">
            <Wind className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          </div>
          <span className="text-sm">Breathing</span>
        </Card>
      </div>
    </div>
  );
};

export default QuickActionsSection;
