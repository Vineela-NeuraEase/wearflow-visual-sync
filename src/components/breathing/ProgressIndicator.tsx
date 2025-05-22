
import { Progress } from "@/components/ui/progress";

type ProgressIndicatorProps = {
  elapsedTime: number;
  totalSessionTime: number;
};

export const ProgressIndicator = ({ elapsedTime, totalSessionTime }: ProgressIndicatorProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mt-4">
      <div className="text-center mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">Session Progress</div>
      <Progress value={(elapsedTime / totalSessionTime) * 100} className="h-2 bg-blue-100 dark:bg-blue-900/50" />
      <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
        {formatTime(elapsedTime)} / {formatTime(totalSessionTime)}
      </div>
    </div>
  );
};
