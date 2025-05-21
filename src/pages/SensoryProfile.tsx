
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface SensorySetting {
  intensity: number;
  preference: 'like' | 'neutral' | 'dislike';
  notes: string;
}

const SensoryProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    visual: {
      intensity: 50,
      preference: 'neutral' as const,
      notes: ''
    },
    auditory: {
      intensity: 40,
      preference: 'neutral' as const,
      notes: ''
    },
    tactile: {
      intensity: 60,
      preference: 'neutral' as const,
      notes: ''
    },
    movement: {
      intensity: 50,
      preference: 'neutral' as const,
      notes: ''
    },
    proprioceptive: {
      intensity: 70,
      preference: 'neutral' as const,
      notes: ''
    }
  });
  
  const updateSetting = (
    type: keyof typeof settings,
    property: keyof SensorySetting,
    value: any
  ) => {
    setSettings((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [property]: value
      }
    }));
  };
  
  const saveProfile = () => {
    // In a real app, this would save to a database or local storage
    localStorage.setItem('sensory-profile', JSON.stringify(settings));
    toast({
      title: "Profile Saved",
      description: "Your sensory profile has been updated",
    });
  };
  
  const SensorySection = ({ 
    type, 
    title, 
    icon, 
    description 
  }: { 
    type: keyof typeof settings, 
    title: string, 
    icon: React.ReactNode, 
    description: string 
  }) => {
    const setting = settings[type];
    
    return (
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-sense-blue text-primary">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <Label className="mb-2 block">Sensitivity</Label>
            <div className="flex items-center">
              <span className="w-20 text-sm">Low</span>
              <Slider 
                value={[setting.intensity]} 
                onValueChange={(value) => updateSetting(type, 'intensity', value[0])}
                max={100}
                step={1}
                className="flex-1 mx-4"
              />
              <span className="w-20 text-sm text-right">High</span>
            </div>
          </div>
          
          <div>
            <Label className="mb-2 block">Preference</Label>
            <RadioGroup 
              value={setting.preference} 
              onValueChange={(value) => updateSetting(type, 'preference', value as 'like' | 'neutral' | 'dislike')}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="like" id={`${type}-like`} />
                <Label htmlFor={`${type}-like`} className="text-sm cursor-pointer">I Like</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutral" id={`${type}-neutral`} />
                <Label htmlFor={`${type}-neutral`} className="text-sm cursor-pointer">Neutral</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dislike" id={`${type}-dislike`} />
                <Label htmlFor={`${type}-dislike`} className="text-sm cursor-pointer">I Dislike</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor={`${type}-notes`} className="mb-2 block">Notes</Label>
            <textarea 
              id={`${type}-notes`}
              className="w-full p-3 border border-gray-200 rounded-md text-sm"
              placeholder="Add specific notes or triggers..."
              rows={2}
              value={setting.notes}
              onChange={(e) => updateSetting(type, 'notes', e.target.value)}
            />
          </div>
        </div>
      </Card>
    );
  };
  
  return (
    <div className="space-y-6 pb-16">
      <div className="rounded-xl bg-sense-purple p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold ml-2">Sensory Profile</h1>
          </div>
          <Button onClick={saveProfile} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            <span>Save</span>
          </Button>
        </div>
        
        <p className="text-sm px-4 text-muted-foreground">
          Customize your sensory preferences to help Hana adjust features to your needs.
        </p>
      </div>
      
      <div className="px-4 space-y-6">
        <Card className="p-4 bg-sense-blue/30 flex items-center space-x-4">
          <div className="flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-500">
              <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex-grow">
            <p className="text-sm">
              Your sensory profile helps personalize your experience. Hana will adjust features like visual stimulation, sounds, and haptic feedback based on your preferences.
            </p>
          </div>
        </Card>
        
        <div className="space-y-6">
          <SensorySection 
            type="visual"
            title="Visual Processing"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>}
            description="How you process visual information like colors, patterns, and movement"
          />
          
          <SensorySection 
            type="auditory"
            title="Auditory Processing"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c3 0 7-1 7-8V5c0-3-2-4-4-4-3 0-5 4-5 4s-2-4-5-4C3 1 1 2 1 5v9c0 7 4 8 7 8"></path></svg>}
            description="How you process sounds, tones, and volume levels"
          />
          
          <SensorySection 
            type="tactile"
            title="Tactile Processing"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6v12H4V6h16z"></path><path d="M12 12h.01"></path></svg>}
            description="How you process touch, textures, and physical feedback"
          />
          
          <SensorySection 
            type="movement"
            title="Movement Sensitivity"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="8 12 12 16 16 12"></polyline><line x1="12" y1="8" x2="12" y2="16"></line></svg>}
            description="How you respond to motion and animations"
          />
          
          <SensorySection 
            type="proprioceptive"
            title="Body Awareness"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
            description="How you sense your body in space and pressure needs"
          />
        </div>
        
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">Automated Adjustments</h2>
          
          <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="auto-adjust" className="text-base">Auto-adjust Features</Label>
                <p className="text-sm text-muted-foreground">Allow Hana to adjust settings based on your sensory profile</p>
              </div>
              <Switch id="auto-adjust" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="overload-detection" className="text-base">Sensory Overload Detection</Label>
                <p className="text-sm text-muted-foreground">Detect patterns that may indicate sensory overload</p>
              </div>
              <Switch id="overload-detection" defaultChecked />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SensoryProfile;
