
import { useState } from "react";
import { useAudio } from "@/context/AudioContext";
import { useNavigate } from "react-router-dom";
import JournalHeader from "@/components/journal/JournalHeader";
import { QuickEntryContent } from "@/components/journal/QuickEntryContent";
import { PromptedEntryContent } from "@/components/journal/PromptedEntryContent";
import { FreeEntryContent } from "@/components/journal/FreeEntryContent";
import { VoiceEntryContent } from "@/components/journal/VoiceEntryContent";

type JournalEntryProps = {
  mode: "quick" | "prompted" | "free" | "voice";
};

const JournalEntry = ({ mode = "quick" }: JournalEntryProps) => {
  const navigate = useNavigate();
  const { play } = useAudio();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  
  const handleSave = () => {
    // Save journal entry
    play("success");
    navigate(-1);
  };
  
  const renderModeSpecificContent = () => {
    switch (mode) {
      case "quick":
        return (
          <QuickEntryContent 
            content={content} 
            setContent={setContent} 
          />
        );
        
      case "prompted":
        return (
          <PromptedEntryContent 
            content={content} 
            setContent={setContent} 
          />
        );
        
      case "free":
        return (
          <FreeEntryContent 
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
          />
        );
        
      case "voice":
        return <VoiceEntryContent />;
        
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <JournalHeader 
        mode={mode} 
        handleSave={handleSave} 
        formattedDate={formattedDate} 
      />

      <div className="p-4 flex-1 flex flex-col">
        {renderModeSpecificContent()}
      </div>
    </div>
  );
};

export default JournalEntry;
