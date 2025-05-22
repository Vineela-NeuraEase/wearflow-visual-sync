
import { Progress } from "@/components/ui/progress";

interface SessionProgressProps {
  elapsedTime: number;
  totalTime: number;
  formatTime: (seconds: number) => string;
}

export function SessionProgress({ 
  elapsedTime, 
  totalTime, 
  formatTime 
}: SessionProgressProps) {
  return (
    <div className="w-full max-w-md mt-6">
      <div className="text-center mb-2 text-indigo-700 font-medium">Session Progress</div>
      <Progress 
        value={(elapsedTime / totalTime) * 100} 
        className="h-2 bg-blue-100" 
        indicatorClassName="bg-gradient-to-r from-indigo-500 to-purple-500" 
      />
      <div className="text-center mt-2 font-medium text-indigo-600">
        {formatTime(elapsedTime)} / {formatTime(totalTime)}
      </div>
    </div>
  );
}
