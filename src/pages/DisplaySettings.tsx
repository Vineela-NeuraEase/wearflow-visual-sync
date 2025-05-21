
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const DisplaySettings = () => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState("calm-blue");
  const [textSize, setTextSize] = useState([50]);

  const {
    theme,
    setTheme,
    highContrastEnabled,
    toggleHighContrast,
    saturation,
    setSaturation,
    reducedMotionEnabled,
    toggleReducedMotion,
  } = useAccessibility();
  
  const themes = [
    { id: "calm-blue", name: "Calm Blue", color: "bg-blue-100" },
    { id: "lavender", name: "Lavender", color: "bg-purple-100" },
    { id: "mint", name: "Mint", color: "bg-green-100" },
    { id: "rose", name: "Rose", color: "bg-pink-100" },
    { id: "sunshine", name: "Sunshine", color: "bg-yellow-100" },
    { id: "high-contrast", name: "High Contrast", color: "bg-high-contrast-bg border border-black" },
  ];
  
  const handleThemeSelection = (themeId: string) => {
    setSelectedTheme(themeId);
    
    if (themeId === "high-contrast" && !highContrastEnabled) {
      toggleHighContrast();
    } else if (themeId !== "high-contrast" && highContrastEnabled) {
      toggleHighContrast();
    }
    
    // Set theme in the context
    if (themeId === "high-contrast") {
      setTheme("high-contrast");
    } else {
      setTheme("default");
    }
  };
  
  return (
    <div className="space-y-6 pb-16">
      <div className="rounded-xl bg-blue-100 p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-blue-200">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Display Settings</h1>
        </div>
      </div>
      
      <div className="px-4 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-center mb-6">Theme</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <Card 
                key={theme.id}
                className={`p-4 flex flex-col items-center cursor-pointer ${
                  selectedTheme === theme.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => handleThemeSelection(theme.id)}
              >
                <div className={`w-full h-20 rounded-md mb-4 ${theme.color}`}></div>
                <span className="font-medium">{theme.name}</span>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <Card className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="reduced-colors" className="text-base">Reduced Color Intensity</Label>
                  <p className="text-sm text-muted-foreground">Lower saturation for visual comfort</p>
                </div>
                <Switch 
                  id="reduced-colors" 
                  checked={saturation === 'reduced'} 
                  onCheckedChange={(checked) => setSaturation(checked ? 'reduced' : 'default')} 
                />
              </div>
            </Card>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-center mb-6">Text Size</h2>
          
          <div className="flex flex-col items-center">
            <div className="flex justify-between w-full mb-4">
              <span className="text-sm">A</span>
              <span className="text-lg">A</span>
              <span className="text-2xl">A</span>
            </div>
            
            <Slider
              value={textSize}
              onValueChange={setTextSize}
              max={100}
              step={1}
              className="w-full"
            />
            
            <div className="mt-8 bg-blue-50 rounded-lg p-6 w-full">
              <h3 className="text-center font-medium mb-2">Preview</h3>
              <p className="text-center" style={{ fontSize: `${(textSize[0] / 100) * 1.5 + 0.8}rem` }}>
                This is how your text will appear throughout the app.
              </p>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-center mb-6">Animation Settings</h2>
          
          <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="reduced-motion" className="text-base">Reduce Motion</Label>
                <p className="text-sm text-muted-foreground">Minimize or disable animations throughout the app</p>
              </div>
              <Switch 
                id="reduced-motion" 
                checked={reducedMotionEnabled} 
                onCheckedChange={toggleReducedMotion} 
              />
            </div>
            
            {!reducedMotionEnabled && (
              <div className="mt-4">
                <Label htmlFor="animation-speed" className="text-base mb-2 block">Animation Speed</Label>
                <Slider
                  id="animation-speed"
                  defaultValue={[50]}
                  max={100}
                  step={1}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>Slower</span>
                  <span>Default</span>
                  <span>Faster</span>
                </div>
              </div>
            )}
          </Card>
        </section>
        
        <Button 
          onClick={() => navigate('/settings/accessibility')}
          className="w-full"
          variant="outline"
        >
          More Accessibility Options
        </Button>
      </div>
    </div>
  );
};

export default DisplaySettings;
