
import { useMemo } from 'react';
import { BiometricDataPoint } from "@/hooks/biometrics/types";

interface ChartDataPoint {
  time: string;
  heartRate: number;
  hrv: number;
  regulationScore: number;
  environmentalStress: number;
}

export function useChartData(dataPoints: BiometricDataPoint[]) {
  // Convert dataPoints to chart format using useMemo for performance
  const chartData = useMemo(() => {
    // If no data is available, return mock data for demonstration
    if (dataPoints.length === 0) {
      return [
        { time: '8 AM', heartRate: 65, hrv: 55, regulationScore: 90, environmentalStress: 20 },
        { time: '10 AM', heartRate: 68, hrv: 52, regulationScore: 88, environmentalStress: 25 },
        { time: '12 PM', heartRate: 75, hrv: 48, regulationScore: 82, environmentalStress: 30 },
        { time: '2 PM', heartRate: 82, hrv: 42, regulationScore: 75, environmentalStress: 40 },
        { time: '4 PM', heartRate: 78, hrv: 44, regulationScore: 70, environmentalStress: 45 },
        { time: '6 PM', heartRate: 72, hrv: 46, regulationScore: 78, environmentalStress: 35 },
      ];
    }
    
    // Process real data if available
    return dataPoints.slice(0, 10).reverse().map(point => {
      const date = new Date(point.timestamp);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      
      // Calculate regulation score as inverse of stress level
      const regulationScore = typeof point.stressLevel === 'number'
        ? Math.max(0, 100 - point.stressLevel)
        : 80; // Default value if stress level is missing
      
      return {
        time: `${hours}:${minutes}`,
        heartRate: point.heartRate || 70, // Default value if missing
        hrv: point.hrv || 50, // Default value if missing
        regulationScore,
        environmentalStress: point.stressLevel || 20, // Default value if missing
      };
    });
  }, [dataPoints]);

  // Getter function for the chart data
  const getChartData = () => chartData;

  return { getChartData };
}
