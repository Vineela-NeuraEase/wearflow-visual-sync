
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAudio } from "@/context/AudioContext";

export const VoiceEntryContent = () => {
  const { play } = useAudio();

  return (
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
  );
};
