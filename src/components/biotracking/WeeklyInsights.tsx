
interface WeeklyData {
  sleep: number[];
  regulation: number[];
  heartRate: number[];
}

interface WeeklyInsightsProps {
  data: WeeklyData;
}

export const WeeklyInsights = ({ data }: WeeklyInsightsProps) => {
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Weekly Insights</h2>
      
      <div className="space-y-5">
        <div>
          <h3 className="font-medium mb-2">Sleep Quality</h3>
          <div className="h-20 flex items-end space-x-2">
            {data.sleep.map((value, i) => (
              <div 
                key={i}
                className="flex-1"
              >
                <div 
                  className={`w-full ${value > 80 ? 'bg-green-200' : value > 70 ? 'bg-blue-200' : 'bg-amber-200'}`}
                  style={{ height: `${value}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-600">
            {weekdays.map((day, i) => (
              <span key={i}>{day}</span>
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-2">Regulation Status</h3>
          <div className="h-20 flex items-end space-x-2">
            {data.regulation.map((value, i) => (
              <div 
                key={i}
                className="flex-1"
              >
                <div 
                  className={`w-full ${value > 80 ? 'bg-green-200' : value > 60 ? 'bg-blue-200' : 'bg-red-200'}`}
                  style={{ height: `${value}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-600">
            {weekdays.map((day, i) => (
              <span key={i}>{day}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
