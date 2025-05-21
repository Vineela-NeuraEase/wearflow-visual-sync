
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
  
  return (
    <Card className={`${highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-calm-blue/30'} rounded-3xl p-6 animate-fade-in`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Current Status</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-blue-600"
          onClick={() => navigate('/bio-tracking')}
        >
          Details
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-green-600 font-medium">Regulation Status</span>
            <span>{regulationScore}%</span>
          </div>
          <Progress value={regulationScore} className="h-2 bg-green-100" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-blue-100">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-600">Heart Rate</div>
                <div className="font-medium">{heartRate} bpm</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-purple-100">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-600">HRV</div>
                <div className="font-medium">{hrv} ms</div>
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          className={`w-full ${highContrastEnabled ? 'bg-high-contrast-primary hover:bg-high-contrast-primary/90' : 'bg-white hover:bg-white/90'} text-foreground rounded-xl flex items-center gap-2 justify-center`}
          onClick={() => navigate('/sos')}
        >
          <Zap className={`h-5 w-5 ${highContrastEnabled ? 'text-white' : 'text-primary'}`} />
          <span>SOS Support</span>
        </Button>
      </div>
    </Card>
  );
};

export default StatusCard;
