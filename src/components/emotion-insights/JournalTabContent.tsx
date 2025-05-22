
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getEmotionColor, getEmotionEmoji } from "@/utils/emotionUtils";

type EmotionEntry = {
  date: string;
  emotion: string;
  notes: string;
  time: string;
};

type GroupedEmotions = Record<string, EmotionEntry[]>;

interface JournalTabContentProps {
  groupedEmotions: GroupedEmotions;
}

const JournalTabContent = ({ groupedEmotions }: JournalTabContentProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default JournalTabContent;
