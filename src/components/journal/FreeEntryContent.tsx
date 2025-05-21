
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAudio } from "@/context/AudioContext";

interface FreeEntryContentProps {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
}

export const FreeEntryContent = ({
  title,
  setTitle,
  content,
  setContent
}: FreeEntryContentProps) => {
  const { play } = useAudio();

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
};
