
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";

interface StatusCardProps {
  regulationScore: number;
  heartRate: number;
  hrv: number;
}

const StatusCard = ({ regulationScore, heartRate, hrv }: StatusCardProps) => {
  const navigate = useNavigate();
  const { highContrastEnabled } = useAccessibility();
  
  // Determine color based on regulation score
  const getRegulationColor = () => {
    if (regulationScore >= 80) return "from-green-100 via-green-200 to-green-100 dark:from-green-900/30 dark:via-green-800/20 dark:to-green-900/10";
    if (regulationScore >= 60) return "from-yellow-100 via-yellow-200 to-yellow-100 dark:from-yellow-900/30 dark:via-yellow-800/20 dark:to-yellow-900/10";
    return "from-red-100 via-red-200 to-red-100 dark:from-red-900/30 dark:via-red-800/20 dark:to-red-900/10";
  };
  
  const getProgressColor = () => {
    if (regulationScore >= 80) return "bg-green-500";
    if (regulationScore >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  return (
    <Card className={`${highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 dark:from-blue-900/20 dark:via-purple-900/15 dark:to-blue-900/10'} rounded-3xl p-6 animate-fade-in shadow-md`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Current Status</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-blue-600 border border-blue-200 dark:border-blue-800 bg-gradient-to-r from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/20"
          onClick={() => navigate('/bio-tracking')}
        >
          Details
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gradient-to-r p-3 rounded-xl shadow-sm border border-opacity-20 border-green-300 dark:border-green-800 bg-white/60 dark:bg-gray-800/40">
          <div className="flex justify-between items-center mb-1">
            <span className={`font-medium ${
              regulationScore >= 80 ? "text-green-600 dark:text-green-400" : 
              regulationScore >= 60 ? "text-yellow-600 dark:text-yellow-400" : 
              "text-red-600 dark:text-red-400"
            }`}>Regulation Status</span>
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent font-bold">{regulationScore}%</span>
          </div>
          <Progress 
            value={regulationScore} 
            className={`h-3 bg-${regulationScore >= 80 ? 'green' : regulationScore >= 60 ? 'yellow' : 'red'}-100 rounded-lg overflow-hidden`}
            style={{background: `linear-gradient(to right, ${regulationScore >= 80 ? '#dcfce7' : regulationScore >= 60 ? '#fef9c3' : '#fee2e2'}, ${regulationScore >= 80 ? '#bbf7d0' : regulationScore >= 60 ? '#fde68a' : '#fecaca'})`}}
          >
            <div 
              className={`h-full ${getProgressColor()}`}
              style={{background: `linear-gradient(to right, ${regulationScore >= 80 ? '#22c55e' : regulationScore >= 60 ? '#eab308' : '#ef4444'}, ${regulationScore >= 80 ? '#16a34a' : regulationScore >= 60 ? '#ca8a04' : '#dc2626'})`}}
            />
          </Progress>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 dark:from-blue-900/20 dark:via-blue-900/15 dark:to-blue-900/10 p-3 rounded-xl shadow-sm border border-blue-200 dark:border-blue-900/30">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800/30 dark:to-blue-700/20 shadow-inner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Heart Rate</div>
                <div className="font-medium bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">{heartRate} bpm</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50 dark:from-purple-900/20 dark:via-purple-900/15 dark:to-purple-900/10 p-3 rounded-xl shadow-sm border border-purple-200 dark:border-purple-900/30">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800/30 dark:to-purple-700/20 shadow-inner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">HRV</div>
                <div className="font-medium bg-gradient-to-r from-purple-700 to-purple-500 dark:from-purple-400 dark:to-purple-300 bg-clip-text text-transparent">{hrv} ms</div>
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          className={`w-full ${highContrastEnabled ? 'bg-high-contrast-primary hover:bg-high-contrast-primary/90' : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 dark:from-red-600 dark:to-orange-600 dark:hover:from-red-700 dark:hover:to-orange-700'} text-white rounded-xl flex items-center gap-2 justify-center shadow-md`}
          onClick={() => navigate('/sos')}
        >
          <Zap className="h-5 w-5 text-white" />
          <span>SOS Support</span>
        </Button>
      </div>
    </Card>
  );
};

export default StatusCard;
