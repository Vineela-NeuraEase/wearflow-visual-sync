
import { Button } from "@/components/ui/button";
import { AlertCircle, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const ConnectionAlert = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-amber-800 dark:text-amber-300">
            {user ? "Wearable device not connected" : "Authentication required"}
          </h3>
          <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
            {user ? 
              "Connect a compatible wearable device to enable real-time biometric tracking and early warning detection." :
              "You need to sign in to use the warning system and access your personal data."
            }
          </p>
          <Button 
            className="mt-3 bg-amber-500 hover:bg-amber-600 text-white"
            size="sm"
            onClick={() => navigate(user ? "/data-collection" : "/auth")}
          >
            {user ? "Connect Device" : (
              <>
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
