
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Placeholder data - in a real app, this would come from a database
const emotions = [
  { date: '2025-05-21', emotion: 'Happy', notes: 'Good day at work, had lunch with friends', time: '10:30 AM' },
  { date: '2025-05-21', emotion: 'Tired', notes: 'Feeling exhausted after work', time: '5:45 PM' },
  { date: '2025-05-20', emotion: 'Calm', notes: 'Morning meditation helped a lot', time: '9:15 AM' },
  { date: '2025-05-20', emotion: 'Anxious', notes: 'Big meeting coming up tomorrow', time: '8:30 PM' },
  { date: '2025-05-19', emotion: 'Neutral', notes: 'Regular day, nothing special', time: '2:00 PM' },
  { date: '2025-05-18', emotion: 'Happy', notes: 'Weekend trip with family', time: '4:20 PM' },
  { date: '2025-05-17', emotion: 'Stressed', notes: 'Too many tasks to complete', time: '11:45 AM' },
  { date: '2025-05-16', emotion: 'Confused', notes: 'Difficult problem at work', time: '3:15 PM' },
];

// Group emotions by date for easier rendering
const groupEmotionsByDate = () => {
  const grouped: Record<string, typeof emotions> = {};
  
  emotions.forEach(entry => {
    if (!grouped[entry.date]) {
      grouped[entry.date] = [];
    }
    grouped[entry.date].push(entry);
  });
  
  return grouped;
};

const getEmotionColor = (emotion: string) => {
  const emotionColors: Record<string, string> = {
    'Happy': 'bg-green-100 text-green-800',
    'Calm': 'bg-blue-100 text-blue-800',
    'Neutral': 'bg-gray-100 text-gray-800',
    'Tired': 'bg-purple-100 text-purple-800',
    'Anxious': 'bg-orange-100 text-orange-800',
    'Stressed': 'bg-red-100 text-red-800',
    'Confused': 'bg-yellow-100 text-yellow-800'
  };
  
  return emotionColors[emotion] || 'bg-gray-100 text-gray-800';
};

const getEmotionEmoji = (emotion: string) => {
  const emojis: Record<string, string> = {
    'Happy': '😊',
    'Calm': '😌',
    'Neutral': '😐',
    'Tired': '😴',
    'Anxious': '😬',
    'Stressed': '😣',
    'Confused': '🤔'
  };
  
  return emojis[emotion] || '🙂';
};

// Placeholder data for the pattern insights
const patternInsights = [
  { title: 'Morning Mood', description: 'You tend to feel calmer in the mornings, especially after meditation.' },
  { title: 'Evening Anxiety', description: 'Anxiety often increases in the evening, particularly before important events.' },
  { title: 'Weekly Pattern', description: 'Stress peaks mid-week (Wednesday) and happiness increases on weekends.' },
  { title: 'Activity Impact', description: 'Social activities with friends correlate with higher mood ratings.' }
];

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];

const EmotionInsights = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const groupedEmotions = groupEmotionsByDate();
  
  const formattedMonth = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  
  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };
  
  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };
  
  return (
    <div className="space-y-6 pb-16">
      <div className="rounded-xl bg-sense-pink p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Emotion Insights</h1>
        </div>
      </div>
      
      <div className="px-4 space-y-6">
        <Tabs defaultValue="journal" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="journal" className="text-sm md:text-base py-3">Journal</TabsTrigger>
            <TabsTrigger value="calendar" className="text-sm md:text-base py-3">Calendar</TabsTrigger>
            <TabsTrigger value="patterns" className="text-sm md:text-base py-3">Patterns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="journal" className="space-y-4">
            <Card className="p-4 bg-blue-50 flex items-center space-x-3">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />
              <p className="text-sm">Your emotion log helps identify patterns and triggers over time.</p>
            </Card>
            
            <div className="space-y-6">
              {Object.keys(groupedEmotions).sort().reverse().map((date) => {
                const dateObj = new Date(date);
                const formattedDate = dateObj.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric' 
                });
                
                return (
                  <div key={date}>
                    <h2 className="text-lg font-medium mb-3">{formattedDate}</h2>
                    <div className="space-y-3">
                      {groupedEmotions[date].map((entry, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <span className="text-2xl mr-2">{getEmotionEmoji(entry.emotion)}</span>
                              <div>
                                <span className={`px-3 py-1 rounded-full text-sm ${getEmotionColor(entry.emotion)}`}>
                                  {entry.emotion}
                                </span>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{entry.time}</span>
                          </div>
                          <p className="text-gray-600 mt-2">{entry.notes}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <Button 
              onClick={() => navigate('/emotion-logger')} 
              className="w-full bg-purple-500 hover:bg-purple-600"
            >
              Log New Emotion
            </Button>
          </TabsContent>
          
          <TabsContent value="calendar" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-medium">{formattedMonth}</h2>
              <Button variant="outline" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <Card className="p-4">
              <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="py-1">{day}</div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i + 1;
                  const hasEmotion = day < 22; // Simulated data for demo
                  const emotionType = day % 5 === 0 ? 'Happy' : 
                                     day % 5 === 1 ? 'Calm' : 
                                     day % 5 === 2 ? 'Neutral' : 
                                     day % 5 === 3 ? 'Tired' : 'Anxious';
                  
                  return (
                    <div key={i} className={`
                      h-10 flex items-center justify-center rounded-md
                      ${day > 31 ? 'invisible' : 'cursor-pointer hover:bg-gray-100'}
                      ${day === 21 ? 'bg-blue-100 font-bold border border-blue-300' : ''}
                    `}>
                      {day <= 31 && (
                        <>
                          <span>{day}</span>
                          {hasEmotion && (
                            <span className="ml-1 text-xs" title={emotionType}>
                              {getEmotionEmoji(emotionType)}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-medium mb-3">Month at a Glance</h3>
              <div className="flex space-x-2 mb-4">
                {['Happy', 'Calm', 'Neutral', 'Tired', 'Anxious'].map(emotion => (
                  <div key={emotion} className="flex items-center">
                    <span className="mr-1">{getEmotionEmoji(emotion)}</span>
                    <span className="text-xs">{emotion}</span>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Most Common</h4>
                  <div className="flex items-center">
                    <span className="text-xl mr-2">😊</span>
                    <span>Happy (32%)</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Mood Trend</h4>
                  <span className="text-green-600">↗ Improving</span>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="patterns" className="space-y-4">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmotionInsights;
