
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAudio } from "@/context/AudioContext";

interface QuickEntryContentProps {
  content: string;
  setContent: (content: string) => void;
}

export const QuickEntryContent = ({ content, setContent }: QuickEntryContentProps) => {
  const { play } = useAudio();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  
  const moods = [
    { emoji: "😊", name: "happy" },
    { emoji: "😌", name: "calm" },
    { emoji: "😐", name: "neutral" },
    { emoji: "🙁", name: "sad" }
  ];
  
  const handleMoodSelect = (index: number) => {
    setSelectedMood(index);
    play("pop");
  };

  return (
    <>
      <div className="flex justify-around mb-6 pt-2">
        {moods.map((mood, index) => (
          <Button
            key={mood.name}
            variant="ghost"
            className={`rounded-full p-4 ${selectedMood === index ? 'bg-gray-200' : ''}`}
            onClick={() => handleMoodSelect(index)}
          >
            <span className="text-3xl">{mood.emoji}</span>
          </Button>
        ))}
      </div>
      <Card className="p-4 mb-6">
        <Textarea
          placeholder="How are you feeling right now?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="resize-none border-none focus-visible:ring-0"
          rows={5}
        />
      </Card>
      <h2 className="text-2xl font-bold mb-4">Recent Notes</h2>
      <div className="space-y-4">
        {[
          { time: "Today, 10:15 AM", text: "Feeling good after my morning routine.", emoji: "😊" },
          { time: "Yesterday, 3:30 PM", text: "Too much noise at the coffee shop today.", emoji: "😣" },
          { time: "Yesterday, 9:45 AM", text: "The breathing exercise really helped.", emoji: "😌" }
        ].map((note, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between mb-2">
              <div className="text-gray-600">{note.time}</div>
              <div className="text-xl">{note.emoji}</div>
            </div>
            <p className="text-center">{note.text}</p>
          </Card>
        ))}
      </div>
    </>
  );
};
