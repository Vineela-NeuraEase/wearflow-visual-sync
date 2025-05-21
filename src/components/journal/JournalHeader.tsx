
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface JournalHeaderProps {
  mode: "quick" | "prompted" | "free" | "voice";
  handleSave: () => void;
  formattedDate: string;
}

const JournalHeader = ({ mode, handleSave, formattedDate }: JournalHeaderProps) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const renderHeaderTitle = () => {
    const titles = {
      quick: "Quick Note",
      prompted: "Journal",
      free: "Free Write",
      voice: "Voice Journal"
    };
    
    return titles[mode];
  };

  return (
    <>
      <div className="bg-blue-100 p-4 rounded-b-3xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold ml-2">{renderHeaderTitle()}</h1>
          </div>
          {mode !== "voice" && (
            <Button 
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Save
            </Button>
          )}
        </div>
      </div>
      <div className="text-center text-gray-600 mb-4">
        {formattedDate}
      </div>
    </>
  );
};

export default JournalHeader;
