
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/animations.css";

const VisualStim = () => {
  const navigate = useNavigate();
  const [intensity, setIntensity] = useState(65);
  const [circles, setCircles] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const colors = [
      'rgb(191, 219, 254)', // blue
      'rgb(253, 224, 171)', // yellow
      'rgb(251, 207, 232)', // pink
      'rgb(167, 243, 208)', // green
    ];
    
    const newCircles = [];
    const circleCount = 4 + Math.floor(intensity / 20); // 4-9 circles based on intensity
    
    for (let i = 0; i < circleCount; i++) {
      const size = 100 + (Math.random() * intensity);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = `${10 + Math.random() * 80}%`;
      const top = `${10 + Math.random() * 60}%`;
      const delay = Math.random() * 2;
      
      newCircles.push(
        <div
          key={i}
          className="visual-circle appear"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            left,
            top,
            animationDelay: `${delay}s`,
            zIndex: 10 - i,
          }}
        ></div>
      );
    }
    
    setCircles(newCircles);
  }, [intensity]);

  const handleIntensityChange = (value: number[]) => {
    setIntensity(value[0]);
  };

  return (
    <div className="h-screen bg-purple-100/50 relative">
      <div className="absolute inset-0 overflow-hidden">
        {circles}
      </div>
      
      <div className="relative h-full flex flex-col">
        <div className="flex-1"></div>
        
        <div className="p-6 bg-white rounded-t-xl space-y-6">
          <div className="flex justify-between items-center">
            <div className="text-lg font-medium">Intensity</div>
            <div>{intensity}%</div>
          </div>
          
          <Slider
            defaultValue={[intensity]}
            max={100}
            step={1}
            onValueChange={handleIntensityChange}
            className="my-6"
          />
          
          <Button 
            variant="outline" 
            className="w-full py-6" 
            onClick={() => navigate('/tools')}
          >
            <X className="mr-2 h-5 w-5" /> Exit Visual Mode
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisualStim;
