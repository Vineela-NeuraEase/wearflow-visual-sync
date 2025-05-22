
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmotionInsightsHeader from "@/components/emotion-insights/EmotionInsightsHeader";
import JournalTabContent from "@/components/emotion-insights/JournalTabContent";
import CalendarTabContent from "@/components/emotion-insights/CalendarTabContent";
import PatternsTabContent from "@/components/emotion-insights/PatternsTabContent";
import { groupEmotionsByDate } from "@/utils/emotionUtils";
import { emotions } from "@/data/emotionData";
import { patternInsights } from "@/data/patternInsights";
import { useCalendar } from "@/hooks/useCalendar";

const EmotionInsights = () => {
  const { currentDate, formattedMonth, goToPreviousMonth, goToNextMonth } = useCalendar();
  const groupedEmotions = groupEmotionsByDate(emotions);
  
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
