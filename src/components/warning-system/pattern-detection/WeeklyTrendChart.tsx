
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState, useEffect } from 'react';

interface WeeklyTrendChartProps {
  realtimeData?: any[];
}

// Mock data for visualization
const defaultMockData = [
  { day: 'Mon', heartRate: 75, hrv: 54, regulation: 90, stressScore: 25 },
  { day: 'Tue', heartRate: 72, hrv: 55, regulation: 92, stressScore: 20 },
  { day: 'Wed', heartRate: 78, hrv: 52, regulation: 88, stressScore: 30 },
  { day: 'Thu', heartRate: 85, hrv: 48, regulation: 80, stressScore: 45 },
  { day: 'Fri', heartRate: 90, hrv: 42, regulation: 70, stressScore: 65 },
  { day: 'Sat', heartRate: 82, hrv: 45, regulation: 75, stressScore: 50 },
  { day: 'Today', heartRate: 88, hrv: 40, regulation: 65, stressScore: 70 },
];

export const WeeklyTrendChart = ({ realtimeData }: WeeklyTrendChartProps) => {
  const [chartData, setChartData] = useState(defaultMockData);
  
  // Update chart data when realtimeData changes
  useEffect(() => {
    if (realtimeData && realtimeData.length > 0) {
      // Process the realtime data into the format expected by the chart
      // This is a simplified example; in a real app, you would process the
      // data appropriately based on its structure
      const processedData = realtimeData.map((item, index) => {
        // Convert timestamp to readable day format
        const date = new Date(item.timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        return {
          day: `${hours}:${minutes}`,
          heartRate: item.heartRate || 0,
          hrv: item.hrv || 0,
          regulation: 100 - (item.stressLevel || 0),  // Convert stress to regulation
          stressScore: item.stressLevel || 0
        };
      });
      
      setChartData(processedData);
    }
  }, [realtimeData]);
  
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-2">Weekly Trend Analysis</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="heartRate" stroke="#ef4444" activeDot={{ r: 8 }} name="Heart Rate" />
            <Line type="monotone" dataKey="hrv" stroke="#3b82f6" name="HRV" />
            <Line type="monotone" dataKey="regulation" stroke="#22c55e" name="Regulation" />
            <Line type="monotone" dataKey="stressScore" stroke="#f59e0b" strokeDasharray="5 5" name="Stress Score" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
