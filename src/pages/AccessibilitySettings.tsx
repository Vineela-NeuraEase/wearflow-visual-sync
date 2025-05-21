
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Type, Palette, Zap, Sliders } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useState } from "react";

const AccessibilitySettings = () => {
  const navigate = useNavigate();
  const {
    textSize, 
    setTextSize,
    animations,
    setAnimations,
    spacing,
    setSpacing,
    saturation, 
    setSaturation,
    hapticIntensity,
    setHapticIntensity,
    soundVolume,
    setSoundVolume,
    highContrastEnabled,
    toggleHighContrast,
    reducedMotionEnabled,
    toggleReducedMotion
  } = useAccessibility();
  
  const [previewText, setPreviewText] = useState(
    "This text shows how content will appear throughout the app with your current settings."
  );
  
  // Create demo vibration pattern with current intensity
  const testHapticFeedback = () => {
    if ("vibrate" in navigator) {
      const intensity = hapticIntensity / 100 * 200; // Scale 0-100 to 0-200ms
      navigator.vibrate([intensity, 30, intensity]);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="rounded-xl bg-sense-blue p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-sense-blue">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Accessibility Settings</h1>
        </div>
      </div>
      
      <div className="px-4 space-y-8">
        <Tabs defaultValue="visual" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="visual" className="text-sm md:text-base py-3">Visual</TabsTrigger>
            <TabsTrigger value="sensory" className="text-sm md:text-base py-3">Sensory</TabsTrigger>
            <TabsTrigger value="input" className="text-sm md:text-base py-3">Input</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual" className="space-y-6">
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Type className="h-5 w-5 mr-2 text-blue-500" />
                  <h2 className="text-lg font-medium">Text Size</h2>
                </div>
                <div className="text-sm text-muted-foreground">
                  {textSize === 'default' ? 'Regular' : textSize === 'large' ? 'Large' : 'Extra Large'}
                </div>
              </div>
              
              <Card className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm">A</span>
                  <span className="text-xl">A</span>
                  <span className="text-3xl">A</span>
                </div>
                
                <Slider
                  value={[textSize === 'default' ? 0 : textSize === 'large' ? 50 : 100]}
                  onValueChange={(value) => {
                    if (value[0] < 30) setTextSize('default');
                    else if (value[0] < 70) setTextSize('large');
                    else setTextSize('x-large');
                  }}
                  max={100}
                  step={1}
                  className="w-full"
                />
                
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>Regular</span>
                  <span>Large</span>
                  <span>Extra Large</span>
                </div>
              </Card>
            </section>
            
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Palette className="h-5 w-5 mr-2 text-green-500" />
                  <h2 className="text-lg font-medium">Display Options</h2>
                </div>
              </div>
              
              <Card className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="high-contrast" className="text-base">High Contrast Mode</Label>
                    <p className="text-sm text-muted-foreground">Increases visual contrast for better readability</p>
                  </div>
                  <Switch 
                    id="high-contrast" 
                    checked={highContrastEnabled} 
                    onCheckedChange={toggleHighContrast} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="reduced-saturation" className="text-base">Reduced Color Intensity</Label>
                    <p className="text-sm text-muted-foreground">Decreases color saturation for visual comfort</p>
                  </div>
                  <Switch 
                    id="reduced-saturation" 
                    checked={saturation === 'reduced'} 
                    onCheckedChange={(checked) => setSaturation(checked ? 'reduced' : 'default')} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="increased-spacing" className="text-base">Increased Spacing</Label>
                    <p className="text-sm text-muted-foreground">Adds more space between text for easier reading</p>
                  </div>
                  <Switch 
                    id="increased-spacing" 
                    checked={spacing === 'increased'} 
                    onCheckedChange={(checked) => setSpacing(checked ? 'increased' : 'default')} 
                  />
                </div>
              </Card>
            </section>
            
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-purple-500" />
                  <h2 className="text-lg font-medium">Motion & Animations</h2>
                </div>
              </div>
              
              <Card className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="reduced-motion" className="text-base">Reduced Motion</Label>
                    <p className="text-sm text-muted-foreground">Minimizes or disables animations throughout the app</p>
                  </div>
                  <Switch 
                    id="reduced-motion" 
                    checked={reducedMotionEnabled} 
                    onCheckedChange={toggleReducedMotion} 
                  />
                </div>
                
                {!reducedMotionEnabled && (
                  <div className="space-y-2">
                    <Label htmlFor="animation-speed" className="text-base">Animation Speed</Label>
                    <p className="text-sm text-muted-foreground">Adjust how quickly animations play</p>
                    
                    <Slider
                      id="animation-speed"
                      value={[animations === 'default' ? 100 : animations === 'reduced' ? 50 : 0]}
                      onValueChange={(value) => {
                        if (value[0] < 30) setAnimations('none');
                        else if (value[0] < 70) setAnimations('reduced');
                        else setAnimations('default');
                      }}
                      max={100}
                      step={1}
                    />
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Slower</span>
                      <span>Normal</span>
                    </div>
                  </div>
                )}
              </Card>
            </section>
            
            <section>
              <div className="bg-sense-blue p-4 rounded-lg mt-8">
                <h3 className="text-center font-medium mb-4">Preview</h3>
                <div 
                  className={`bg-white p-4 rounded-lg ${
                    textSize === 'large' ? 'text-lg' : textSize === 'x-large' ? 'text-xl' : 'text-base'
                  } ${spacing === 'increased' ? 'leading-relaxed' : 'leading-normal'}`}
                >
                  {previewText}
                </div>
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="sensory" className="space-y-6">
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Sliders className="h-5 w-5 mr-2 text-blue-500" />
                  <h2 className="text-lg font-medium">Haptic Feedback</h2>
                </div>
                <div className="text-sm text-muted-foreground">{hapticIntensity}%</div>
              </div>
              
              <Card className="p-4">
                <Slider
                  value={[hapticIntensity]}
                  onValueChange={(value) => setHapticIntensity(value[0])}
                  max={100}
                  step={1}
                  className="w-full mb-4"
                />
                
                <div className="flex justify-between text-sm text-muted-foreground mb-6">
                  <span>None</span>
                  <span>Medium</span>
                  <span>Strong</span>
                </div>
                
                <Button 
                  onClick={testHapticFeedback} 
                  className="w-full"
                  disabled={hapticIntensity === 0}
                >
                  Test Haptic Feedback
                </Button>
              </Card>
            </section>
            
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 8L6 12L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 8L18 12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h2 className="text-lg font-medium">Sound Feedback</h2>
                </div>
                <div className="text-sm text-muted-foreground">{soundVolume}%</div>
              </div>
              
              <Card className="p-4">
                <Slider
                  value={[soundVolume]}
                  onValueChange={(value) => setSoundVolume(value[0])}
                  max={100}
                  step={1}
                  className="w-full mb-4"
                />
                
                <div className="flex justify-between text-sm text-muted-foreground mb-6">
                  <span>Mute</span>
                  <span>Medium</span>
                  <span>Loud</span>
                </div>
                
                <Button 
                  className="w-full"
                  disabled={soundVolume === 0}
                >
                  Test Sound
                </Button>
              </Card>
            </section>
            
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Notification Settings</h2>
              </div>
              
              <Card className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="gentle-notifications" className="text-base">Gentle Notifications</Label>
                    <p className="text-sm text-muted-foreground">Use softer sounds and visuals for notifications</p>
                  </div>
                  <Switch id="gentle-notifications" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="visual-notifications" className="text-base">Visual Only</Label>
                    <p className="text-sm text-muted-foreground">Disable sounds for notifications</p>
                  </div>
                  <Switch id="visual-notifications" />
                </div>
              </Card>
            </section>
          </TabsContent>
          
          <TabsContent value="input" className="space-y-6">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Touch Sensitivity</h2>
              </div>
              
              <Card className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label>Touch Response Speed</Label>
                  <Slider
                    value={[50]}
                    max={100}
                    step={1}
                    className="w-full mb-2"
                  />
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Slower</span>
                    <span>Default</span>
                    <span>Faster</span>
                  </div>
                </div>
              </Card>
            </section>
            
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Input Methods</h2>
              </div>
              
              <Card className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="voice-input" className="text-base">Voice Input</Label>
                    <p className="text-sm text-muted-foreground">Enable voice commands throughout the app</p>
                  </div>
                  <Switch id="voice-input" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="switch-control" className="text-base">Switch Control</Label>
                    <p className="text-sm text-muted-foreground">Support for external switch devices</p>
                  </div>
                  <Switch id="switch-control" />
                </div>
              </Card>
            </section>
            
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Interaction Settings</h2>
              </div>
              
              <Card className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="press-hold-time" className="text-base">Press & Hold Duration</Label>
                    <p className="text-sm text-muted-foreground">Time required for press and hold actions</p>
                  </div>
                </div>
                
                <Slider
                  id="press-hold-time"
                  value={[50]}
                  max={100}
                  step={1}
                  className="w-full mb-2"
                />
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Short (0.5s)</span>
                  <span>Default (1s)</span>
                  <span>Long (2s)</span>
                </div>
              </Card>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AccessibilitySettings;
