
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface PatternInsight {
  title: string;
  description: string;
}

interface PatternsTabContentProps {
  patternInsights: PatternInsight[];
}

const PatternsTabContent = ({ patternInsights }: PatternsTabContentProps) => {
  return (
    <div className="space-y-4">
      <div className="bg-sense-purple/30 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-medium text-center mb-2">Emotion Pattern Insights</h2>
        <p className="text-sm text-center">
          Analysis based on your emotion data over the past month
        </p>
      </div>
      
      <div className="space-y-4">
        {patternInsights.map((insight, index) => (
          <Card key={index} className="p-4">
            <h3 className="font-medium mb-2">{insight.title}</h3>
            <p className="text-sm text-gray-600">{insight.description}</p>
          </Card>
        ))}
      </div>
      
      <Card className="p-4">
        <h3 className="font-medium mb-3">Daily Mood Flow</h3>
        <div className="h-40 flex items-end space-x-2">
          {['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'].map((time, i) => {
            const heights = [30, 60, 70, 50, 40, 35];
            const colors = [
              'bg-blue-200', 
              'bg-green-200', 
              'bg-green-300', 
              'bg-yellow-200',
              'bg-orange-200',
              'bg-blue-300'
            ];
            const emotions = ['😌', '😊', '😃', '😐', '😣', '😴'];
            
            return (
              <div key={time} className="flex-1 flex flex-col items-center">
                <div className="flex-grow flex items-end justify-center w-full">
                  <div 
                    className={`w-full ${colors[i]}`} 
                    style={{ height: `${heights[i]}%` }}
                  >
                    <div className="flex justify-center -mt-6">{emotions[i]}</div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600">{time}</div>
              </div>
            );
          })}
        </div>
      </Card>
      
      <Card className="p-4">
        <h3 className="font-medium mb-3">Potential Triggers</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Work Meetings</span>
            <div className="flex items-center">
              <span className="text-sm mr-2">Stress</span>
              <span>😣</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Morning Meditation</span>
            <div className="flex items-center">
              <span className="text-sm mr-2">Calm</span>
              <span>😌</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Social Activities</span>
            <div className="flex items-center">
              <span className="text-sm mr-2">Happy</span>
              <span>😊</span>
            </div>
          </div>
        </div>
        
        <Button className="w-full mt-4 bg-purple-500 hover:bg-purple-600">
          <Calendar className="h-4 w-4 mr-2" />
          View Full Analysis
        </Button>
      </Card>
    </div>
  );
};

export default PatternsTabContent;
