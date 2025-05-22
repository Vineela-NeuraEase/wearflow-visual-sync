
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart2, Lightbulb, CalendarClock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import new components
import { PatternVisualization } from "@/components/insights/PatternVisualization";
import { StrategyEffectivenessRater } from "@/components/feedback/StrategyEffectivenessRater";
import { ProactiveScheduler } from "@/components/insights/ProactiveScheduler";

// Mock strategy for feedback demo
const mockStrategy = {
  id: "breath-1",
  name: "4-7-8 Breathing",
  type: "breathing",
  lastUsed: "Today, 2:30 PM",
  effectiveness: 4
};

const Insights = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(mockStrategy.effectiveness || 0);
  
  const handleRatingSubmit = (rating: number, feedback: string) => {
    console.log("Strategy rated:", { rating, feedback });
    // In a real app, this would be sent to the backend
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="rounded-xl bg-purple-100 p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Personal Insights</h1>
        </div>
        
        <p className="text-sm px-4 text-muted-foreground">
          Discover patterns and personalized recommendations based on your data.
        </p>
      </div>
      
      <div className="px-4 space-y-6">
        <Tabs defaultValue="patterns" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="patterns" className="flex items-center gap-1">
              <BarChart2 className="h-4 w-4" />
              <span className="text-sm">Patterns</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-1">
              <Lightbulb className="h-4 w-4" />
              <span className="text-sm">Feedback</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-1">
              <CalendarClock className="h-4 w-4" />
              <span className="text-sm">Schedule</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="patterns" className="space-y-6">
            <PatternVisualization 
              title="Daily Regulation Patterns" 
              type="heatmap" 
            />
            <PatternVisualization 
              title="Activity Connections" 
              type="connections" 
            />
            <PatternVisualization 
              title="Sleep Impact Analysis" 
              type="sleep" 
            />
          </TabsContent>
          
          <TabsContent value="feedback" className="space-y-6">
            <StrategyEffectivenessRater 
              strategy={mockStrategy}
              rating={rating}
              onChange={setRating}
              onRatingSubmit={handleRatingSubmit}
            />
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium flex items-center mb-2 text-blue-800">
                <Lightbulb className="h-4 w-4 mr-2" />
                Your Most Effective Strategies
              </h3>
              <ol className="list-decimal pl-5 space-y-1 text-blue-700 text-sm">
                <li>Deep Pressure (Weighted Blanket) - 4.8/5</li>
                <li>Nature Sounds - 4.5/5</li>
                <li>4-7-8 Breathing - 4.2/5</li>
              </ol>
              <p className="mt-3 text-xs text-blue-600">
                Based on your feedback from 28 ratings
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-6">
            <ProactiveScheduler />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Insights;
