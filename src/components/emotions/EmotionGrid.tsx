
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useAudio } from "@/context/AudioContext";

type Emotion = {
  name: string;
  emoji: string;
};

interface EmotionGridProps {
  emotions: Emotion[];
  selectedEmotion: number | null;
  onSelect: (index: number) => void;
}

export const EmotionGrid = ({ 
  emotions, 
  selectedEmotion, 
  onSelect 
}: EmotionGridProps) => {
  const { play } = useAudio();

  const handleEmotionSelect = (index: number) => {
    onSelect(index);
    play("pop");
  };

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {emotions.map((emotion, index) => (
        <motion.div 
          key={emotion.name}
          whileTap={{ scale: 0.95 }}
        >
          <Card 
            className={`p-4 flex flex-col items-center justify-center cursor-pointer ${
              selectedEmotion === index ? 'bg-purple-100 border-purple-300' : 'bg-white'
            }`}
            onClick={() => handleEmotionSelect(index)}
          >
            <div className="text-3xl mb-1">{emotion.emoji}</div>
            <div className="text-sm">{emotion.name}</div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
