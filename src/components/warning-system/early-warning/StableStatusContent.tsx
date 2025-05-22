
import { Info } from "lucide-react";
import { BiometricData } from "./types";

interface StableStatusContentProps {
  biometricData: BiometricData[];
}

export const StableStatusContent = ({ biometricData }: StableStatusContentProps) => {
  return (
    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-start">
      <Info className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
      <div>
        <h3 className="font-medium text-green-800 dark:text-green-300">
          Status: Stable
        </h3>
        <p className="text-sm text-green-700 dark:text-green-400 mt-1">
          No early warning signs detected. Your regulation metrics are within your typical range.
        </p>
        {biometricData.length > 0 && (
          <div className="mt-2 text-xs text-green-700 dark:text-green-400">
            {biometricData.length} data points collected. Continuous monitoring active.
          </div>
        )}
      </div>
    </div>
  );
};
