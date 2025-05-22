
import { Button } from "@/components/ui/button";
import { ChevronLeft, Database, BellOff, Wifi, WifiOff } from "lucide-react";
import { Link } from "react-router-dom";

interface WarningHeaderProps {
  isOnline: boolean;
}

export const WarningHeader = ({ isOnline }: WarningHeaderProps) => {
  return (
    <div className="rounded-xl bg-blue-100 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold ml-2">Warning System</h1>
        </div>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="h-4 w-4 text-green-600" />
          ) : (
            <WifiOff className="h-4 w-4 text-yellow-600" />
          )}
          
          <Link to="/data-collection">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Database className="h-4 w-4" />
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <BellOff className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground ml-9">
        Monitoring biometric signals and patterns to predict potential meltdowns
      </p>
    </div>
  );
};
