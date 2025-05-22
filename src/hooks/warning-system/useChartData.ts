
import { BiometricDataPoint } from "@/hooks/biometrics/types";

export function useChartData(dataPoints: BiometricDataPoint[]) {
  // Convert dataPoints to SignalAnalysisChart format
  const getChartData = () => {
    // Mock data for demonstration (will be replaced by real-time data)
    const mockChartData = [
      { time: '8 AM', heartRate: 65, hrv: 55, regulationScore: 90, environmentalStress: 20 },
      { time: '10 AM', heartRate: 68, hrv: 52, regulationScore: 88, environmentalStress: 25 },
      { time: '12 PM', heartRate: 75, hrv: 48, regulationScore: 82, environmentalStress: 30 },
      { time: '2 PM', heartRate: 82, hrv: 42, regulationScore: 75, environmentalStress: 40 },
      { time: '4 PM', heartRate: 78, hrv: 44, regulationScore: 70, environmentalStress: 45 },
      { time: '6 PM', heartRate: 72, hrv: 46, regulationScore: 78, environmentalStress: 35 },
    ];
    
    if (dataPoints.length === 0) return mockChartData;
    
    return dataPoints.slice(0, 10).reverse().map(point => {
      const date = new Date(point.timestamp);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      
      return {
        time: `${hours}:${minutes}`,
        heartRate: point.heartRate,
        hrv: point.hrv,
        regulationScore: 100 - point.stressLevel,
        environmentalStress: point.stressLevel
      };
    });
  };

  return { getChartData };
}
