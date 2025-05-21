
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart2, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InsightsTabContent = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-purple-50 rounded-xl">
        <h2 className="text-lg font-medium mb-2">Emotion Insights</h2>
        <p className="text-sm text-gray-600 mb-4">
          Discover patterns and trends in your emotional well-being.
        </p>
        <Button 
          className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-6"
          onClick={() => navigate("/emotion-insights")}
        >
          <BarChart2 className="h-5 w-5 mr-2 text-purple-500" />
          View Detailed Insights
        </Button>
      </Card>
      
      <Card className="p-4">
        <h3 className="font-medium mb-3">Monthly Overview</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Most Common Emotions</h4>
            <div className="flex justify-between">
              <div className="flex items-center">
                <span className="text-xl mr-1">😊</span>
                <span>Happy (32%)</span>
              </div>
              <div className="flex items-center">
                <span className="text-xl mr-1">😣</span>
                <span>Stressed (18%)</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Meltdown Frequency</h4>
            <div className="flex items-center">
              <span className="mr-2">↓ 20% from last month</span>
              <span className="text-green-600">Improving</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Top Triggers</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">Noise</span>
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">Crowds</span>
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">Changes in routine</span>
            </div>
          </div>
        </div>
        
        <Button 
          variant="link" 
          className="mt-4 w-full"
          onClick={() => navigate("/emotion-insights")}
        >
          <Calendar className="h-4 w-4 mr-2" />
          View Calendar View
        </Button>
      </Card>
    </div>
  );
};

export default InsightsTabContent;
