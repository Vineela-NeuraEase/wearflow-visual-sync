import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getEmotionEmoji } from "@/utils/emotionUtils";

interface CalendarTabContentProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  formattedMonth: string;
}

const CalendarTabContent = ({ 
  currentDate, 
  onPreviousMonth, 
  onNextMonth, 
  formattedMonth 
}: CalendarTabContentProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="icon" onClick={onPreviousMonth}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-medium">{formattedMonth}</h2>
        <Button variant="outline" size="icon" onClick={onNextMonth}>
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
    </div>
  );
};

export default CalendarTabContent;
