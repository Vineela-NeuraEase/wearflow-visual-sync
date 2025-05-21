
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/animations.css";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAccessibility } from "@/context/AccessibilityContext";

const VisualStim = () => {
  const navigate = useNavigate();
  const [intensity, setIntensity] = useState(65);
  const [circles, setCircles] = useState<JSX.Element[]>([]);
  const [colorScheme, setColorScheme] = useState<'standard' | 'muted' | 'low-saturation'>('standard');
  const [speed, setSpeed] = useState(50);
  const [autoChange, setAutoChange] = useState(false);
  const { reducedMotionEnabled, saturation } = useAccessibility();

  useEffect(() => {
    // Apply color scheme based on accessibility settings
    if (saturation === 'reduced') {
      setColorScheme('low-saturation');
    }
  }, [saturation]);
  
  useEffect(() => {
    // If reduced motion is enabled, reduce speed
    if (reducedMotionEnabled) {
      setSpeed(20);
    }
  }, [reducedMotionEnabled]);

  useEffect(() => {
    // Create visual elements based on settings
    const standardColors = [
      'rgb(191, 219, 254)', // blue
      'rgb(253, 224, 171)', // yellow
      'rgb(251, 207, 232)', // pink
      'rgb(167, 243, 208)', // green
    ];
    
    const mutedColors = [
      'rgb(220, 231, 247)', // muted blue
      'rgb(250, 240, 225)', // muted yellow
      'rgb(245, 231, 240)', // muted pink
      'rgb(232, 247, 240)', // muted green
    ];
    
    const lowSaturationColors = [
      'rgb(230, 235, 240)', // very muted blue
      'rgb(240, 238, 233)', // very muted yellow
      'rgb(238, 235, 237)', // very muted pink
      'rgb(235, 240, 238)', // very muted green
    ];
    
    let colors;
    switch (colorScheme) {
      case 'muted':
        colors = mutedColors;
        break;
      case 'low-saturation':
        colors = lowSaturationColors;
        break;
      default:
        colors = standardColors;
        break;
    }
    
    const newCircles = [];
    const circleCount = 4 + Math.floor(intensity / 20); // 4-9 circles based on intensity
    
    for (let i = 0; i < circleCount; i++) {
      const size = 100 + (Math.random() * intensity);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = `${10 + Math.random() * 80}%`;
      const top = `${10 + Math.random() * 60}%`;
      const delay = Math.random() * 2;
      const animationSpeed = reducedMotionEnabled ? '4s' : `${3 - (speed / 100 * 2)}s`;
      
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
            animationDuration: animationSpeed,
            zIndex: 10 - i,
          }}
        ></div>
      );
    }
    
    setCircles(newCircles);
    
    // Set up automatic color change if enabled
    let interval: number | undefined;
    if (autoChange && !reducedMotionEnabled) {
      interval = window.setInterval(() => {
        setColorScheme(prev => 
          prev === 'standard' ? 'muted' : 
          prev === 'muted' ? 'low-saturation' : 'standard'
        );
      }, 10000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [intensity, colorScheme, speed, autoChange, reducedMotionEnabled]);

  const handleIntensityChange = (value: number[]) => {
    setIntensity(value[0]);
  };

  const handleSpeedChange = (value: number[]) => {
    setSpeed(value[0]);
  };

  return (
    <div className={`h-screen ${
      colorScheme === 'standard' ? 'bg-purple-100/50' : 
      colorScheme === 'muted' ? 'bg-purple-50/50' : 'bg-gray-50'
    } relative`}>
      <div className="absolute inset-0 overflow-hidden">
        {circles}
      </div>
      
      <div className="relative h-full flex flex-col">
        <div className="absolute top-4 right-4">
          <Button 
            variant="outline" 
            className="bg-white rounded-full h-12 w-12 p-0" 
            onClick={() => navigate('/tools')}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
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
          
          <div className="space-y-4">
            {!reducedMotionEnabled && (
              <>
                <div className="flex justify-between items-center">
                  <div className="text-lg font-medium">Speed</div>
                  <div>{speed}%</div>
                </div>
                
                <Slider
                  value={[speed]}
                  max={100}
                  step={1}
                  onValueChange={handleSpeedChange}
                  className="mb-6"
                />
              </>
            )}
            
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium">Visual Preferences</h3>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="color-scheme">Color Intensity</Label>
                <select 
                  id="color-scheme"
                  value={colorScheme}
                  onChange={(e) => setColorScheme(e.target.value as any)}
                  className="bg-white border rounded-md p-2"
                >
                  <option value="standard">Standard</option>
                  <option value="muted">Muted</option>
                  <option value="low-saturation">Low Saturation</option>
                </select>
              </div>
              
              {!reducedMotionEnabled && (
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="auto-change" className="text-base">Auto-change Colors</Label>
                    <p className="text-sm text-muted-foreground">Colors will change gradually</p>
                  </div>
                  <Switch 
                    id="auto-change" 
                    checked={autoChange}
                    onCheckedChange={setAutoChange}
                  />
                </div>
              )}
            </div>
          </div>
          
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
