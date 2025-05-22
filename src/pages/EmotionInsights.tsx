
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmotionInsightsHeader from "@/components/emotion-insights/EmotionInsightsHeader";
import JournalTabContent from "@/components/emotion-insights/JournalTabContent";
import CalendarTabContent from "@/components/emotion-insights/CalendarTabContent";
import PatternsTabContent from "@/components/emotion-insights/PatternsTabContent";
import { groupEmotionsByDate, EmotionEntry } from "@/utils/emotionUtils";

// Placeholder data - in a real app, this would come from a database
const emotions: EmotionEntry[] = [
  { date: '2025-05-21', emotion: 'Happy', notes: 'Good day at work, had lunch with friends', time: '10:30 AM' },
  { date: '2025-05-21', emotion: 'Tired', notes: 'Feeling exhausted after work', time: '5:45 PM' },
  { date: '2025-05-20', emotion: 'Calm', notes: 'Morning meditation helped a lot', time: '9:15 AM' },
  { date: '2025-05-20', emotion: 'Anxious', notes: 'Big meeting coming up tomorrow', time: '8:30 PM' },
  { date: '2025-05-19', emotion: 'Neutral', notes: 'Regular day, nothing special', time: '2:00 PM' },
  { date: '2025-05-18', emotion: 'Happy', notes: 'Weekend trip with family', time: '4:20 PM' },
  { date: '2025-05-17', emotion: 'Stressed', notes: 'Too many tasks to complete', time: '11:45 AM' },
  { date: '2025-05-16', emotion: 'Confused', notes: 'Difficult problem at work', time: '3:15 PM' },
];

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
  const [currentDate, setCurrentDate] = useState(new Date());
  const groupedEmotions = groupEmotionsByDate(emotions);
  
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
      <EmotionInsightsHeader />
      
      <div className="px-4 space-y-6">
        <Tabs defaultValue="journal" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="journal" className="text-sm md:text-base py-3">Journal</TabsTrigger>
            <TabsTrigger value="calendar" className="text-sm md:text-base py-3">Calendar</TabsTrigger>
            <TabsTrigger value="patterns" className="text-sm md:text-base py-3">Patterns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="journal">
            <JournalTabContent groupedEmotions={groupedEmotions} />
          </TabsContent>
          
          <TabsContent value="calendar">
            <CalendarTabContent 
              currentDate={currentDate}
              onPreviousMonth={goToPreviousMonth}
              onNextMonth={goToNextMonth}
              formattedMonth={formattedMonth}
            />
          </TabsContent>
          
          <TabsContent value="patterns">
            <PatternsTabContent patternInsights={patternInsights} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmotionInsights;
