
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InfoCircle, TrendingDown, Activity, Brain, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Pattern {
  id: string;
  name: string;
  description: string;
  confidence: number;
  indicators: string[];
  category: 'physiological' | 'environmental' | 'behavioral' | 'temporal';
}

interface PatternDetectionInsightsProps {
  detectedPatterns: Pattern[];
}

// Mock data for visualization
const mockData = [
  { day: 'Mon', heartRate: 75, hrv: 54, regulation: 90, stressScore: 25 },
  { day: 'Tue', heartRate: 72, hrv: 55, regulation: 92, stressScore: 20 },
  { day: 'Wed', heartRate: 78, hrv: 52, regulation: 88, stressScore: 30 },
  { day: 'Thu', heartRate: 85, hrv: 48, regulation: 80, stressScore: 45 },
  { day: 'Fri', heartRate: 90, hrv: 42, regulation: 70, stressScore: 65 },
  { day: 'Sat', heartRate: 82, hrv: 45, regulation: 75, stressScore: 50 },
  { day: 'Today', heartRate: 88, hrv: 40, regulation: 65, stressScore: 70 },
];

export const PatternDetectionInsights = ({ 
  detectedPatterns = [
    {
      id: 'pattern1',
      name: 'Pre-meltdown Physiological Pattern',
      description: 'Increasing heart rate with decreasing HRV over 30+ minutes',
      confidence: 85,
      indicators: ['Heart rate +15% from baseline', 'HRV -25% from baseline', 'Stress hormone increase'],
      category: 'physiological'
    },
    {
      id: 'pattern2',
      name: 'Environmental Trigger Accumulation',
      description: 'Multiple environmental triggers present simultaneously',
      confidence: 75,
      indicators: ['Loud environment', 'Bright lighting', 'Crowded space'],
      category: 'environmental'
    },
    {
      id: 'pattern3',
      name: 'Time-based Vulnerability Pattern',
      description: 'Increased sensitivity during afternoon transition period',
      confidence: 70,
      indicators: ['Time of day: 2-4 PM', 'Post-lunch energy dip', 'Before routine transition'],
      category: 'temporal'
    }
  ]
}: PatternDetectionInsightsProps) => {
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'physiological': return <Activity className="h-4 w-4" />;
      case 'environmental': return <InfoCircle className="h-4 w-4" />;
      case 'behavioral': return <Brain className="h-4 w-4" />;
      case 'temporal': return <Calendar className="h-4 w-4" />;
      default: return <InfoCircle className="h-4 w-4" />;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'physiological': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'environmental': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'behavioral': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'temporal': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };
  
  return (
    <Card className="p-5">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-1">Pattern Recognition</h2>
          <p className="text-sm text-muted-foreground">
            AI-detected patterns based on your historical data
          </p>
        </div>
        
        <Badge variant="secondary" className="flex items-center gap-1">
          <TrendingDown className="h-3 w-3" />
          Active Monitoring
        </Badge>
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Weekly Trend Analysis</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mockData}
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
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Detected Patterns</h3>
        
        {detectedPatterns.map((pattern) => (
          <div 
            key={pattern.id} 
            className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800/50"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">{pattern.name}</h4>
              <Badge className={getCategoryColor(pattern.category)}>
                <div className="flex items-center gap-1">
                  {getCategoryIcon(pattern.category)}
                  <span>{pattern.category}</span>
                </div>
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {pattern.description}
            </p>
            
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-muted-foreground">Pattern confidence:</span>
                <span className="text-xs font-medium">{pattern.confidence}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500"
                  style={{ width: `${pattern.confidence}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <h5 className="text-xs font-medium mb-1">Key Indicators:</h5>
              <ul className="text-xs space-y-1 text-muted-foreground">
                {pattern.indicators.map((indicator, index) => (
                  <li key={index} className="flex items-center">
                    <span className="h-1 w-1 rounded-full bg-gray-400 mr-2"></span>
                    {indicator}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full mt-2">
          View All Detected Patterns
        </Button>
      </div>
    </Card>
  );
};
