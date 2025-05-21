
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/context/AudioContext";
import { motion } from "framer-motion";

// Import shared data
import { emotions } from "@/data/emotionsList";

// Import extracted components
import { HeaderSection } from "@/components/emotions/HeaderSection";
import { DateDisplay } from "@/components/emotions/DateDisplay";
import { EmotionGrid } from "@/components/emotions/EmotionGrid";
import { NoteInput } from "@/components/emotions/NoteInput";

const EmotionLogger = () => {
  const navigate = useNavigate();
  const { play } = useAudio();
  const [selectedEmotion, setSelectedEmotion] = useState<number | null>(null);
  const [note, setNote] = useState("");
  
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit"
  });
  
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };
  
  const handleSave = () => {
    // Save emotion log
    play("success");
    navigate(-1);
  };
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="h-full flex flex-col">
      <HeaderSection onBack={handleBack} />

      <div className="p-4 flex-1 flex flex-col">
        <DateDisplay formattedDate={formattedDate} />
        
        {/* Emotions grid */}
        <EmotionGrid 
          emotions={emotions}
          selectedEmotion={selectedEmotion}
          onSelect={setSelectedEmotion}
        />
        
        {/* Note textarea */}
        <NoteInput note={note} onChange={handleNoteChange} />
        
        {/* Save button */}
        <Button 
          onClick={handleSave}
          className="w-full py-6 text-lg rounded-xl bg-blue-500 hover:bg-blue-600"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EmotionLogger;
