
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { ChevronLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useAudio } from "@/context/AudioContext";

interface EmotionLoggerSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

type Emotion = {
  name: string;
  emoji: string;
};

const emotions: Emotion[] = [
  { name: "Happy", emoji: "😊" },
  { name: "Calm", emoji: "😌" },
  { name: "Neutral", emoji: "😐" },
  { name: "Fine", emoji: "🙂" },
  { name: "Confused", emoji: "🙁" },
  { name: "Stressed", emoji: "😣" },
  { name: "Sad", emoji: "😢" },
  { name: "Tired", emoji: "😴" },
  { name: "Angry", emoji: "😠" },
  { name: "Thinking", emoji: "🤔" },
  { name: "Anxious", emoji: "😬" },
  { name: "Excited", emoji: "🥳" }
];

const EmotionLoggerSheet = ({ isOpen, onClose }: EmotionLoggerSheetProps) => {
  const { play } = useAudio();
  const [selectedEmotion, setSelectedEmotion] = useState<number | null>(null);
  const [note, setNote] = useState("");
  
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit"
  });
  
  const handleEmotionSelect = (index: number) => {
    setSelectedEmotion(index);
    play("pop");
  };
  
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };
  
  const handleSave = () => {
    // Save emotion log
    play("success");
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-w-md mx-auto rounded-t-[30px] p-0">
        <div className="bg-blue-100 p-4 rounded-t-[30px]">
          <DrawerHeader className="text-left p-0">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <h2 className="text-2xl font-bold ml-2">How are you feeling?</h2>
            </div>
          </DrawerHeader>
        </div>

        <div className="p-4">
          <div className="text-center text-gray-600 mb-6">
            {formattedDate}
          </div>
          
          {/* Emotions grid */}
          <div className="grid grid-cols-4 gap-2 mb-8">
            {emotions.map((emotion, index) => (
              <motion.div 
                key={emotion.name}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className={`p-3 flex flex-col items-center justify-center cursor-pointer ${
                    selectedEmotion === index ? 'bg-purple-100 border-purple-300' : 'bg-white'
                  }`}
                  onClick={() => handleEmotionSelect(index)}
                >
                  <div className="text-3xl mb-1">{emotion.emoji}</div>
                  <div className="text-xs">{emotion.name}</div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Note textarea */}
          <Card className="p-4 mb-6">
            <Textarea
              placeholder="Add a note about how you're feeling (optional)"
              value={note}
              onChange={handleNoteChange}
              className="resize-none border-none focus-visible:ring-0"
              rows={4}
            />
          </Card>
          
          {/* Save button */}
          <Button 
            onClick={handleSave}
            className="w-full py-6 text-lg rounded-xl"
          >
            Save
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EmotionLoggerSheet;
