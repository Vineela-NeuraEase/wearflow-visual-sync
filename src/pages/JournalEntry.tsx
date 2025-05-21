
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAudio } from "@/context/AudioContext";

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
  
  const moods = [
    { emoji: "😊", name: "happy" },
    { emoji: "😌", name: "calm" },
    { emoji: "😐", name: "neutral" },
    { emoji: "🙁", name: "sad" }
  ];
  
  const promptOptions = [
    "What are you grateful for today?",
    "Describe a challenge you overcame."
  ];
  
  const [promptText, setPromptText] = useState(
    mode === "prompted" ? "What is something small that brought you joy today?" : ""
  );
  
  const handleMoodSelect = (index: number) => {
    setSelectedMood(index);
    play("pop");
  };
  
  const handlePromptSelect = (prompt: string) => {
    setPromptText(prompt);
    play("click");
  };
  
  const handleSave = () => {
    // Save journal entry
    play("success");
    navigate(-1);
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const renderHeader = () => {
    const titles = {
      quick: "Quick Note",
      prompted: "Journal",
      free: "Free Write",
      voice: "Voice Journal"
    };
    
    return titles[mode];
  };
  
  const renderModeSpecificContent = () => {
    switch (mode) {
      case "quick":
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
        
      case "prompted":
        return (
          <>
            <Card className="p-6 mb-6 bg-purple-100">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-purple-200 rounded-full mr-2">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-lg font-semibold">Today's Prompt</h3>
              </div>
              <p className="text-xl text-center">{promptText}</p>
            </Card>
            <Card className="p-4 mb-6">
              <Textarea
                placeholder="Write your thoughts here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="resize-none border-none focus-visible:ring-0"
                rows={10}
              />
            </Card>
            <h3 className="text-lg font-semibold mb-3">Try another prompt:</h3>
            <div className="space-y-3">
              {promptOptions.map((prompt, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="w-full text-left justify-start p-4 h-auto"
                  onClick={() => handlePromptSelect(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </>
        );
        
      case "free":
        return (
          <>
            <Card className="p-4 mb-4">
              <Input
                placeholder="Entry title (optional)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-none focus-visible:ring-0 text-xl"
              />
            </Card>
            <Card className="p-4 mb-6">
              <Textarea
                placeholder="Write freely about whatever is on your mind..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="resize-none border-none focus-visible:ring-0"
                rows={15}
              />
            </Card>
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <Button variant="ghost" size="icon">
                  <span className="text-xl">≡</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <span className="text-xl">×</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <span className="text-xl">🖼️</span>
                </Button>
              </div>
              <div className="text-gray-500">0 words</div>
            </div>
            <div className="mt-6">
              <h3 className="mb-3">How are you feeling?</h3>
              <div className="flex flex-wrap gap-2">
                {["Calm", "Reflective", "Happy", "Anxious", "Hopeful", "+ Add"].map((mood, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className={`rounded-full ${
                      i === 0 ? "bg-blue-100" :
                      i === 1 ? "bg-purple-100" :
                      i === 2 ? "bg-yellow-100" :
                      i === 3 ? "bg-red-100" :
                      i === 4 ? "bg-green-100" : "bg-gray-100"
                    }`}
                    onClick={() => play("pop")}
                  >
                    {mood}
                  </Button>
                ))}
              </div>
            </div>
          </>
        );
        
      case "voice":
        return (
          <>
            <div className="flex-1 flex flex-col items-center justify-center">
              <Card className="p-6 w-full mb-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Recording...</h3>
                  <p className="text-gray-600">Speak clearly and at a normal pace</p>
                </div>
                
                <div className="flex justify-center mb-8">
                  <div className="flex items-end gap-1 h-32">
                    {Array.from({ length: 9 }).map((_, i) => {
                      const height = 30 + Math.sin(i * 0.7) * 70;
                      return (
                        <div 
                          key={i} 
                          className="w-6 rounded-full bg-purple-400"
                          style={{ height: `${height}%` }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="text-center text-2xl mb-8">00:32</div>
                
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-gray-700">
                    I had a productive morning today. I completed my routine without any issues and...
                  </p>
                </div>
                
                <div className="flex items-center justify-center text-gray-500 gap-2 text-sm">
                  <span className="inline-block">🔒</span>
                  <span>Transcription happens on your device</span>
                </div>
              </Card>
              
              <div className="flex gap-4 w-full justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600"
                  onClick={() => play("click")}
                >
                  <span className="text-2xl text-white">×</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600"
                  onClick={() => play("success")}
                >
                  <span className="text-2xl text-white">✓</span>
                </Button>
              </div>
            </div>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-blue-100 p-4 rounded-b-3xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold ml-2">{renderHeader()}</h1>
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

      <div className="p-4 flex-1 flex flex-col">
        <div className="text-center text-gray-600 mb-4">
          {formattedDate}
        </div>
        
        {renderModeSpecificContent()}
      </div>
    </div>
  );
};

export default JournalEntry;
