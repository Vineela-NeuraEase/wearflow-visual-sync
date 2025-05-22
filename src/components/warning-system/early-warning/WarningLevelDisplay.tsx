
import { AlertTriangle } from "lucide-react";

interface WarningLevelDisplayProps {
  warningLevel: 'normal' | 'notice' | 'watch' | 'alert';
}

export const WarningLevelDisplay = ({ warningLevel }: WarningLevelDisplayProps) => {
  if (warningLevel === 'normal') return null;
  
  return (
    <div className={`px-3 py-1 rounded-full flex items-center text-sm ${
      warningLevel === 'alert' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 
      warningLevel === 'watch' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' : 
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    }`}>
      <AlertTriangle className="h-4 w-4 mr-1" />
      {warningLevel.charAt(0).toUpperCase() + warningLevel.slice(1)}
    </div>
  );
};
