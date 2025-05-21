
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAudio } from "@/context/AudioContext";

interface PromptedEntryContentProps {
  content: string;
  setContent: (content: string) => void;
  initialPrompt?: string;
}

export const PromptedEntryContent = ({
  content,
  setContent,
  initialPrompt = "What is something small that brought you joy today?"
}: PromptedEntryContentProps) => {
  const { play } = useAudio();
  const [promptText, setPromptText] = useState(initialPrompt);
  
  const promptOptions = [
    "What are you grateful for today?",
    "Describe a challenge you overcame."
  ];
  
  const handlePromptSelect = (prompt: string) => {
    setPromptText(prompt);
    play("click");
  };

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
};
