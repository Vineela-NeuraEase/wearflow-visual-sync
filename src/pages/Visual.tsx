
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Visual = () => {
  const navigate = useNavigate();
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string }>>([]);
  
  // Generate random bubbles
  useEffect(() => {
    const newBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10, // 10-90% of screen width
      y: Math.random() * 80 + 10, // 10-90% of screen height
      size: Math.random() * 100 + 50, // 50-150px
      color: `hsl(${Math.random() * 60 + 180}, 80%, 70%)`, // Blue/green hues
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="relative h-screen bg-gradient-to-b from-cyan-50 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/20 overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full opacity-70"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.size,
            height: bubble.size,
            backgroundColor: bubble.color
          }}
          animate={{
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 5 + 5,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <div className="relative z-10 p-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/tools')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-medium mt-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-300 dark:to-blue-400">
          Visual Calming
        </h1>
        
        <div className="text-center mt-8 text-gray-600 dark:text-gray-300">
          <p>Tap anywhere on the screen to create more bubbles</p>
        </div>
      </div>
    </div>
  );
};

export default Visual;
