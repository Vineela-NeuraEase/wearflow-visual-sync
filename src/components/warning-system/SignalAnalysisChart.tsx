
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DataPoint {
  time: string;
  heartRate: number;
  hrv: number;
  regulationScore: number;
  environmentalStress?: number;
}

interface SignalAnalysisChartProps {
  data: DataPoint[];
  title?: string;
}

export const SignalAnalysisChart = ({ 
  data,
  title = "Multi-Signal Analysis"
}: SignalAnalysisChartProps) => {
  const [visibleSignals, setVisibleSignals] = useState<{
    heartRate: boolean;
    hrv: boolean;
    regulationScore: boolean;
    environmentalStress: boolean;
  }>({
    heartRate: true,
    hrv: true,
    regulationScore: true,
    environmentalStress: false
  });
  
  const toggleSignal = (signal: keyof typeof visibleSignals) => {
    setVisibleSignals(prev => ({
      ...prev,
      [signal]: !prev[signal]
    }));
  };

  return (
    <Card className="p-5">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          size="sm" 
          variant={visibleSignals.heartRate ? "default" : "outline"}
          className={visibleSignals.heartRate ? "bg-red-500 hover:bg-red-600" : ""}
          onClick={() => toggleSignal('heartRate')}
        >
          Heart Rate
        </Button>
        <Button 
          size="sm" 
          variant={visibleSignals.hrv ? "default" : "outline"}
          className={visibleSignals.hrv ? "bg-blue-500 hover:bg-blue-600" : ""}
          onClick={() => toggleSignal('hrv')}
        >
          HRV
        </Button>
        <Button 
          size="sm" 
          variant={visibleSignals.regulationScore ? "default" : "outline"}
          className={visibleSignals.regulationScore ? "bg-green-500 hover:bg-green-600" : ""}
          onClick={() => toggleSignal('regulationScore')}
        >
          Regulation
        </Button>
        <Button 
          size="sm" 
          variant={visibleSignals.environmentalStress ? "default" : "outline"}
          className={visibleSignals.environmentalStress ? "bg-amber-500 hover:bg-amber-600" : ""}
          onClick={() => toggleSignal('environmentalStress')}
        >
          Environmental
        </Button>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            
            {visibleSignals.heartRate && (
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="heartRate" 
                stroke="#ef4444" 
                activeDot={{ r: 8 }}
                name="Heart Rate"
              />
            )}
            
            {visibleSignals.hrv && (
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="hrv" 
                stroke="#3b82f6" 
                name="HRV"
              />
            )}
            
            {visibleSignals.regulationScore && (
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="regulationScore" 
                stroke="#22c55e" 
                name="Regulation Score"
              />
            )}
            
            {visibleSignals.environmentalStress && (
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="environmentalStress" 
                stroke="#f59e0b" 
                name="Environmental Stress"
                strokeDasharray="5 5"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
