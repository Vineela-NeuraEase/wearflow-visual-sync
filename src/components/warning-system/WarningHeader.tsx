
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, History, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WarningHeaderProps {
  isOnline: boolean;
}

export const WarningHeader = ({ isOnline }: WarningHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl bg-blue-100 p-4">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Early Warning System</h1>
        
        <div className="ml-auto flex gap-2">
          {!isOnline && (
            <div className="flex items-center text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs">
              <WifiOff className="h-3 w-3 mr-1" />
              Offline
            </div>
          )}
          <Button variant="ghost" size="icon">
            <History className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <p className="text-sm px-4 text-muted-foreground">
        Monitor your regulation indicators and get personalized early warnings before meltdowns.
      </p>
    </div>
  );
};
