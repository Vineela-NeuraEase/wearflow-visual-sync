
interface DataPoint {
  hour: string;
  heartRate: number;
  hrv: number;
}

interface DailyTrendProps {
  data: DataPoint[];
}

export const DailyTrend = ({ data }: DailyTrendProps) => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Daily Trend</h2>
      
      <div className="h-60 flex items-end space-x-1">
        {data.map((point, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="flex-grow flex flex-col-reverse w-full">
              <div 
                className="w-full bg-blue-200" 
                style={{ height: `${(point.heartRate - 60) * 2}%` }}
              ></div>
            </div>
            <div className="mt-2 text-xs text-gray-600 rotate-45 origin-left">
              {point.hour}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-200 mr-2"></div>
          <span className="text-sm">Heart Rate</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-purple-200 mr-2"></div>
          <span className="text-sm">HRV</span>
        </div>
      </div>
    </div>
  );
};
