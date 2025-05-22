
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Pause, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const Sounds = () => {
  const navigate = useNavigate();
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [volume, setVolume] = useState(70);

  const soundOptions = [
    { id: "whiteNoise", name: "White Noise", icon: "🌫️", color: "bg-gray-100" },
    { id: "rainSounds", name: "Rain", icon: "🌧️", color: "bg-blue-100" },
    { id: "oceanWaves", name: "Ocean Waves", icon: "🌊", color: "bg-cyan-100" },
    { id: "forestSounds", name: "Forest", icon: "🌳", color: "bg-green-100" },
    { id: "fireSounds", name: "Fireplace", icon: "🔥", color: "bg-orange-100" },
    { id: "nightSounds", name: "Night Sounds", icon: "🌙", color: "bg-indigo-100" },
  ];

  const toggleSound = (soundId: string) => {
    if (activeSound === soundId) {
      setActiveSound(null);
    } else {
      setActiveSound(soundId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/20">
      <div className="p-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/tools')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-medium mt-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-300 dark:to-purple-400">
          Soothing Sounds
        </h1>

        <div className="flex items-center mt-6 mb-8">
          <Volume2 className="h-5 w-5 text-gray-600 mr-3" />
          <Slider
            value={[volume]}
            onValueChange={(values) => setVolume(values[0])}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="ml-3 text-sm text-gray-600 min-w-12">
            {volume}%
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {soundOptions.map((sound) => (
            <motion.div
              key={sound.id}
              whileTap={{ scale: 0.97 }}
            >
              <Card
                className={`p-4 ${sound.color} hover:shadow-md transition-all cursor-pointer ${
                  activeSound === sound.id ? "border-2 border-indigo-500" : ""
                }`}
                onClick={() => toggleSound(sound.id)}
              >
                <div className="flex items-center">
                  <div className="text-3xl mr-3">{sound.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium">{sound.name}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8 bg-white"
                  >
                    {activeSound === sound.id ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-8 mb-8">
          <p className="text-sm text-gray-500">
            Sound files are simulated for demonstration. Actual audio files can be added later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sounds;
