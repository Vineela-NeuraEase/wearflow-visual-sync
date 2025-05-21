
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, BarChart2, PlusCircle, Smile, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import EmotionLoggerSheet from "@/components/sheets/EmotionLoggerSheet";

const EmotionHub = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEmotionLoggerOpen, setIsEmotionLoggerOpen] = useState(false);

  const handleOpenMeltdownLogger = () => {
    navigate("/meltdown-logger");
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="rounded-xl bg-sense-purple p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Emotion Hub</h1>
        </div>
      </div>

      <div className="px-4 space-y-6">
        <Tabs defaultValue="log" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="log" className="text-sm md:text-base py-3">Log</TabsTrigger>
            <TabsTrigger value="journal" className="text-sm md:text-base py-3">Journal</TabsTrigger>
            <TabsTrigger value="meltdowns" className="text-sm md:text-base py-3">Meltdowns</TabsTrigger>
            <TabsTrigger value="insights" className="text-sm md:text-base py-3">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="log" className="space-y-4">
            <Card className="p-4 bg-blue-50 rounded-xl">
              <h2 className="text-lg font-medium mb-2">How are you feeling?</h2>
              <p className="text-sm text-gray-600 mb-4">
                Track your emotions to identify patterns and improve well-being.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-6"
                  onClick={() => setIsEmotionLoggerOpen(true)}
                >
                  <Smile className="h-5 w-5 mr-2 text-purple-500" />
                  Log Emotion
                </Button>
                <Button 
                  className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-6"
                  onClick={handleOpenMeltdownLogger}
                >
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                  Log Meltdown
                </Button>
              </div>
            </Card>
            
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Recent Logs</h3>
              <Button variant="link" onClick={() => navigate("/emotion-insights")}>
                View All
              </Button>
            </div>
            
            <div className="space-y-3">
              {/* Placeholder for recent logs */}
              <Card className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">😊</span>
                    <div>
                      <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                        Happy
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">Today, 10:30 AM</span>
                </div>
                <p className="text-gray-600 mt-2">Had a productive morning session</p>
              </Card>
              
              <Card className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">😣</span>
                    <div>
                      <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                        Stressed
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">Yesterday, 4:15 PM</span>
                </div>
                <p className="text-gray-600 mt-2">Too much noise in the environment</p>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="journal" className="space-y-4">
            <Card className="p-4 bg-green-50 rounded-xl">
              <h2 className="text-lg font-medium mb-2">Journal Entry</h2>
              <p className="text-sm text-gray-600 mb-4">
                Record your thoughts, feelings, and experiences.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-6"
                  onClick={() => navigate("/journal/quick")}
                >
                  <PlusCircle className="h-5 w-5 mr-2 text-green-500" />
                  Quick Entry
                </Button>
                <Button 
                  className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-6"
                  onClick={() => navigate("/journal/prompted")}
                >
                  <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                  Guided Entry
                </Button>
              </div>
            </Card>
            
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Recent Entries</h3>
              <Button variant="link" onClick={() => navigate("/journal")}>
                View All
              </Button>
            </div>
            
            <div className="space-y-3">
              {/* Placeholder for recent journal entries */}
              <Card className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Morning Reflection</h4>
                  <span className="text-sm text-gray-500">Today</span>
                </div>
                <p className="text-gray-600 line-clamp-2">Started the day with meditation...</p>
              </Card>
              
              <Card className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Weekly Goals</h4>
                  <span className="text-sm text-gray-500">2 days ago</span>
                </div>
                <p className="text-gray-600 line-clamp-2">Planning to focus on self-care...</p>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="meltdowns" className="space-y-4">
            <Card className="p-4 bg-amber-50 rounded-xl">
              <h2 className="text-lg font-medium mb-2">Meltdown Tracking</h2>
              <p className="text-sm text-gray-600 mb-4">
                Log and monitor meltdowns to identify triggers and effective coping strategies.
              </p>
              <Button 
                className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-6"
                onClick={handleOpenMeltdownLogger}
              >
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                Log New Meltdown
              </Button>
            </Card>
            
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Recent Meltdowns</h3>
              <Button variant="link" onClick={() => navigate("/meltdown-history")}>
                View History
              </Button>
            </div>
            
            <div className="space-y-3">
              {/* Placeholder for recent meltdowns */}
              <Card className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800">
                      Moderate Intensity
                    </span>
                    <h4 className="font-medium mt-1">Loud environment</h4>
                  </div>
                  <span className="text-sm text-gray-500">3 days ago</span>
                </div>
                <div className="flex mt-2">
                  <div className="mr-4">
                    <span className="text-xs text-gray-500">Duration</span>
                    <p>25 min</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Triggers</span>
                    <p>Noise, Crowds</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-4">
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
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Sheets */}
      <EmotionLoggerSheet isOpen={isEmotionLoggerOpen} onClose={() => setIsEmotionLoggerOpen(false)} />
    </div>
  );
};

export default EmotionHub;
