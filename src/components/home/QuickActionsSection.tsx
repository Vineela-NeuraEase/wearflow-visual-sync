
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wind, Activity, Sparkles } from "lucide-react";

const QuickActionsSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-4">
        <Card 
          className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => navigate("/breathing")}
        >
          <div className="rounded-full bg-blue-100 dark:bg-blue-900/20 p-2 mb-2">
            <Wind className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-sm">Breathing</span>
        </Card>
        
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
          onClick={() => navigate("/visual")}
        >
          <div className="rounded-full bg-purple-100 dark:bg-purple-900/20 p-2 mb-2">
            <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <span className="text-sm">Visual</span>
        </Card>
      </div>
    </div>
  );
};

export default QuickActionsSection;
