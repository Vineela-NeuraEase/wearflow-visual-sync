import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bell, MessageCircle, Wind, Heart, Zap, Timer, Smile, Book, Menu, Brain, BarChart2, Accessibility } from "lucide-react";
import BreakTimerSheet from "@/components/sheets/BreakTimerSheet";
import EmotionLoggerSheet from "@/components/sheets/EmotionLoggerSheet";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Progress } from "@/components/ui/progress";

const Home = () => {
  const navigate = useNavigate();
  const [isBreakTimerOpen, setIsBreakTimerOpen] = useState(false);
  const [isEmotionLoggerOpen, setIsEmotionLoggerOpen] = useState(false);
  const { highContrastEnabled, reducedMotionEnabled } = useAccessibility();
  
  // Mock data for biometric status
  const regulationScore = 85;
  const heartRate = 72;
  const hrv = 48;
  
  const menuItems = [
    { name: "Home", path: "/", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> },
    { name: "Bio Tracking", path: "/bio-tracking", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg> },
    { name: "Early Warning", path: "/warning-system", icon: <Bell className="h-4 w-4" /> },
    { name: "Environmental", path: "/environmental", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v14"></path><path d="M18 22V4"></path><path d="M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2v8z"></path><path d="M6 10V4a2 2 0 0 1 2-2h2"></path><path d="M10 2v8"></path></svg> },
    { name: "Personal Insights", path: "/insights", icon: <BarChart2 className="h-4 w-4" /> },
    { name: "Sensory Profile", path: "/sensory-profile", icon: <Brain className="h-4 w-4" /> },
    { name: "Emotion Insights", path: "/emotion-insights", icon: <BarChart2 className="h-4 w-4" /> },
    { name: "Accessibility", path: "/settings/accessibility", icon: <Accessibility className="h-4 w-4" /> },
    { name: "SOS History", path: "/sos-history", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="12 8 12 12 14 14"></polyline><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"></path></svg> },
    { name: "Caregiver View", path: "/caregiver-view", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> },
    { name: "Notification Center", path: "/notification-center", icon: <Bell className="h-4 w-4" /> },
    { name: "Resource Library", path: "/resource-library", icon: <Book className="h-4 w-4" /> },
    { name: "Profile & Account", path: "/profile-account", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> },
    { name: "Settings", path: "/settings", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg> },
    { name: "Daily Routine", path: "/routine", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg> },
    { name: "Focus Mode", path: "/focus", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" x2="9.17" y1="4.93" y2="9.17"></line><line x1="14.83" x2="19.07" y1="14.83" y2="19.07"></line><line x1="14.83" x2="19.07" y1="9.17" y2="4.93"></line><line x1="14.83" x2="18.36" y1="9.17" y2="5.64"></line><line x1="4.93" x2="9.17" y1="19.07" y2="14.83"></line></svg> },
    { name: "Journal Entries", path: "/journal", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"></path><line x1="9" y1="9" x2="10" y2="9"></line><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg> },
    { name: "Body Stats", path: "/body-stats", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 6h6"></path><path d="M21 12H6"></path><path d="M12 18H3"></path><path d="M16 6 8 14h8l-8 8"></path></svg> },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="py-6">
                <h2 className="text-2xl font-bold mb-6 px-2">Hana</h2>
                <div className="space-y-1">
                  {menuItems.map((item) => (
                    <Button 
                      key={item.path} 
                      variant="ghost" 
                      className="w-full justify-start text-base py-3"
                      onClick={() => navigate(item.path)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                      {(item.path === '/settings/accessibility' && (highContrastEnabled || reducedMotionEnabled)) && (
                        <span className="ml-auto bg-purple-100 text-purple-800 text-xs rounded-full px-2 py-0.5">
                          Active
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-2xl font-bold">Hana</h1>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full"
          onClick={() => navigate("/notification-center")}
        >
          <Bell className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Biometric Status Card */}
      <Card className={`${highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-calm-blue/30'} rounded-3xl p-6 animate-fade-in`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Current Status</h2>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-600"
              onClick={() => navigate('/bio-tracking')}
            >
              Details
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-amber-600 border-amber-300 bg-amber-50"
              onClick={() => navigate('/warning-system')}
            >
              Warning System
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-green-600 font-medium">Regulation Status</span>
              <span>{regulationScore}%</span>
            </div>
            <Progress value={regulationScore} className="h-2 bg-green-100" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-blue-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Heart Rate</div>
                  <div className="font-medium">{heartRate} bpm</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-purple-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-600">HRV</div>
                  <div className="font-medium">{hrv} ms</div>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            className={`w-full ${highContrastEnabled ? 'bg-high-contrast-primary hover:bg-high-contrast-primary/90' : 'bg-white hover:bg-white/90'} text-foreground rounded-xl flex items-center gap-2 justify-center`}
            onClick={() => navigate('/sos')}
          >
            <Zap className={`h-5 w-5 ${highContrastEnabled ? 'text-white' : 'text-primary'}`} />
            <span>SOS Support</span>
          </Button>
        </div>
      </Card>
      
      <Card className={`${highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-calm-blue/30'} rounded-3xl p-6`}>
        <h2 className="text-xl font-semibold mb-2">How are you feeling?</h2>
        <p className={`${highContrastEnabled ? 'text-black' : 'text-muted-foreground'} mb-4`}>
          Tap to check in with your assistant
        </p>
        <div className="flex gap-2">
          <Button 
            className={`flex-1 ${highContrastEnabled ? 'bg-high-contrast-primary hover:bg-high-contrast-primary/90' : 'bg-white hover:bg-white/90'} text-foreground rounded-xl flex items-center gap-2 justify-center`}
            onClick={() => navigate('/chat')}
          >
            <MessageCircle className={`h-5 w-5 ${highContrastEnabled ? 'text-white' : 'text-primary'}`} />
            <span>Chat Now</span>
          </Button>
          
          <Button 
            className={`flex-1 ${highContrastEnabled ? 'bg-high-contrast-secondary hover:bg-high-contrast-secondary/90' : 'bg-purple-100 hover:bg-purple-200'} text-foreground rounded-xl flex items-center gap-2 justify-center`}
            onClick={() => navigate('/insights')}
          >
            <BarChart2 className={`h-5 w-5 ${highContrastEnabled ? 'text-white' : 'text-purple-600'}`} />
            <span>Insights</span>
          </Button>
        </div>
      </Card>
      
      <div>
        <h2 className="text-xl font-semibold mb-3">Quick Relief</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className={`${highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-calm-purple/30'} p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform`}
            onClick={() => navigate('/breathing')}
          >
            <div className={`mb-3 rounded-full ${highContrastEnabled ? 'bg-gray-100 border border-black' : 'bg-white'} w-12 h-12 flex items-center justify-center`}>
              <Wind className={`h-6 w-6 ${highContrastEnabled ? 'text-high-contrast-primary' : 'text-tool-blue'}`} />
            </div>
            <h3 className="font-medium">Breathing</h3>
            <p className="text-sm text-muted-foreground">Guided patterns</p>
          </Card>
          
          <Card
            className={`${highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-calm-pink/30'} p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform`}
            onClick={() => navigate('/visual')}
          >
            <div className={`mb-3 rounded-full ${highContrastEnabled ? 'bg-gray-100 border border-black' : 'bg-white'} w-12 h-12 flex items-center justify-center`}>
              <Heart className={`h-6 w-6 ${highContrastEnabled ? 'text-high-contrast-secondary' : 'text-tool-pink'}`} />
            </div>
            <h3 className="font-medium">Visual</h3>
            <p className="text-sm text-muted-foreground">Calming patterns</p>
          </Card>
          
          <Card
            className={`${highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-calm-blue/30'} p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform`}
            onClick={() => navigate('/sounds')}
          >
            <div className={`mb-3 rounded-full ${highContrastEnabled ? 'bg-gray-100 border border-black' : 'bg-white'} w-12 h-12 flex items-center justify-center`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`${highContrastEnabled ? 'text-high-contrast-primary' : 'text-tool-blue'}`}>
                <path d="M9 18V6L21 12L9 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 9H5V15H3V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-medium">Sounds</h3>
            <p className="text-sm text-muted-foreground">Soothing audio</p>
          </Card>
          
          <Card 
            className={`${highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-calm-green/30'} p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform`}
            onClick={() => navigate('/environmental')}
          >
            <div className={`mb-3 rounded-full ${highContrastEnabled ? 'bg-gray-100 border border-black' : 'bg-white'} w-12 h-12 flex items-center justify-center`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-6 w-6 ${highContrastEnabled ? 'text-high-contrast-secondary' : 'text-tool-green'}`}>
                <path d="M18 2h-3a5 5 0 0 0-5 5v14"></path>
                <path d="M18 22V4"></path>
                <path d="M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2v8z"></path>
              </svg>
            </div>
            <h3 className="font-medium">Environment</h3>
            <p className="text-sm text-muted-foreground">Track factors</p>
          </Card>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-3">Quick Access</h2>
        <div className="grid grid-cols-3 gap-3">
          <Card 
            className={`p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform ${highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-blue-100'}`}
            onClick={() => setIsBreakTimerOpen(true)}
          >
            <div className={`mb-2 rounded-full ${highContrastEnabled ? 'bg-gray-100 border border-black' : 'bg-white'} w-10 h-10 flex items-center justify-center`}>
              <Timer className={`h-5 w-5 ${highContrastEnabled ? 'text-high-contrast-primary' : 'text-blue-500'}`} />
            </div>
            <h3 className="font-medium text-sm">Break Timer</h3>
          </Card>
          
          <Card 
            className={`p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform ${highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-purple-100'}`}
            onClick={() => setIsEmotionLoggerOpen(true)}
          >
            <div className={`mb-2 rounded-full ${highContrastEnabled ? 'bg-gray-100 border border-black' : 'bg-white'} w-10 h-10 flex items-center justify-center`}>
              <Smile className={`h-5 w-5 ${highContrastEnabled ? 'text-high-contrast-primary' : 'text-purple-500'}`} />
            </div>
            <h3 className="font-medium text-sm">Log Mood</h3>
          </Card>
          
          <Card 
            className={`p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform ${highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-pink-100'}`}
            onClick={() => navigate('/journal')}
          >
            <div className={`mb-2 rounded-full ${highContrastEnabled ? 'bg-gray-100 border border-black' : 'bg-white'} w-10 h-10 flex items-center justify-center`}>
              <Book className={`h-5 w-5 ${highContrastEnabled ? 'text-high-contrast-secondary' : 'text-pink-500'}`} />
            </div>
            <h3 className="font-medium text-sm">Journal</h3>
          </Card>
        </div>
      </div>
      
      <Card className={`${highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-white'} rounded-2xl p-4`}>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Next up: Reading Time</h2>
          <span className="text-sm text-muted-foreground">In 15 min</span>
        </div>
        <div className="flex items-center gap-3">
          <div className={`${highContrastEnabled ? 'bg-gray-100 border border-black' : 'bg-calm-blue/30'} rounded-full p-2`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm">Continue your daily wind-down with some reading</p>
          </div>
        </div>
      </Card>

      {/* Accessibility shortcuts */}
      {(highContrastEnabled || reducedMotionEnabled) && (
        <Card className="bg-purple-50 p-4 rounded-xl">
          <h3 className="font-medium mb-2 flex items-center">
            <Accessibility className="h-4 w-4 mr-2" />
            Accessibility Settings Active
          </h3>
          <div className="text-sm space-y-1">
            {highContrastEnabled && <p>• High Contrast Mode enabled</p>}
            {reducedMotionEnabled && <p>• Reduced Animations enabled</p>}
          </div>
          <Button 
            variant="link" 
            className="p-0 mt-2 text-purple-700"
            onClick={() => navigate('/settings/accessibility')}
          >
            Adjust Settings
          </Button>
        </Card>
      )}

      {/* Sheets */}
      <BreakTimerSheet isOpen={isBreakTimerOpen} onClose={() => setIsBreakTimerOpen(false)} />
      <EmotionLoggerSheet isOpen={isEmotionLoggerOpen} onClose={() => setIsEmotionLoggerOpen(false)} />
    </div>
  );
};

export default Home;
