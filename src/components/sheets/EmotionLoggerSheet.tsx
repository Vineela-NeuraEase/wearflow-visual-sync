
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { ChevronLeft } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

// Import shared data and components
import { emotions } from "@/data/emotionsList";
import { DateDisplay } from "@/components/emotions/DateDisplay";
import { EmotionGrid } from "@/components/emotions/EmotionGrid";
import { NoteInput } from "@/components/emotions/NoteInput";

interface EmotionLoggerSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

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
          <DateDisplay formattedDate={formattedDate} />
          
          {/* Emotions grid with adjusted gap for the drawer */}
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
