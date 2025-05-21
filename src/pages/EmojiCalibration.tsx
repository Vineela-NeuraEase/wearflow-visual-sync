
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useState } from "react";

const EmojiCalibration = () => {
  const navigate = useNavigate();
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  
  const emotions = [
    { id: "happy", emoji: "😊", name: "Happy" },
    { id: "calm", emoji: "😌", name: "Calm" },
    { id: "neutral", emoji: "😐", name: "Neutral" },
    { id: "confused", emoji: "😕", name: "Confused" },
    { id: "stressed", emoji: "😖", name: "Stressed" },
    { id: "sad", emoji: "😢", name: "Sad" },
    { id: "tired", emoji: "😴", name: "Tired" },
    { id: "thinking", emoji: "🤔", name: "Thinking" },
    { id: "anxious", emoji: "😬", name: "Anxious" },
  ];
  
  const toggleEmotion = (emotionId: string) => {
    if (selectedEmotions.includes(emotionId)) {
      // Remove if already selected
      setSelectedEmotions(selectedEmotions.filter(id => id !== emotionId));
    } else if (selectedEmotions.length < 3) {
      // Add if less than 3 are selected
      setSelectedEmotions([...selectedEmotions, emotionId]);
    }
  };
  
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col p-6">
      <div className="flex justify-between space-x-4 mb-6">
        <div className="h-2 bg-blue-500 rounded-full w-1/4"></div>
        <div className="h-2 bg-blue-500 rounded-full w-1/4"></div>
        <div className="h-2 bg-blue-500 rounded-full w-1/4"></div>
        <div className="h-2 bg-blue-200 rounded-full w-1/4"></div>
      </div>
      
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-center">Emotion Calibration</h1>
        
        <p className="text-center text-gray-600 mb-8 max-w-md">
          Select 3 emotions you experience most frequently. 
          This helps us personalize your experience.
        </p>
        
        <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-8">
          {emotions.map((emotion) => {
            const isSelected = selectedEmotions.includes(emotion.id);
            const selectedIndex = selectedEmotions.indexOf(emotion.id) + 1;
            
            return (
              <Card 
                key={emotion.id}
                className={`p-4 flex flex-col items-center justify-center cursor-pointer relative ${
                  isSelected ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => toggleEmotion(emotion.id)}
              >
                <div className="text-4xl mb-2">{emotion.emoji}</div>
                <span className="text-sm font-medium">{emotion.name}</span>
                
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-sm font-bold">
                    {selectedIndex}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
        
        <div className="flex items-start bg-blue-100 p-4 rounded-lg mb-8 max-w-md">
          <Info className="text-blue-500 mr-3 flex-shrink-0 mt-1" />
          <p className="text-sm">
            These emotions will appear first in your emotion log. 
            You can customize this further in settings.
          </p>
        </div>
      </div>
      
      <div className="mt-auto flex justify-end">
        <Button 
          onClick={() => navigate("/welcome/choose-sos-side")} 
          className="bg-blue-500 hover:bg-blue-600"
          disabled={selectedEmotions.length !== 3}
          size="lg"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default EmojiCalibration;
