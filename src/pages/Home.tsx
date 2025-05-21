
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bell, MessageCircle, Wind, Heart, Zap } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Calm Space</h1>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
      
      <Card className="bg-calm-blue/30 rounded-3xl p-6">
        <h2 className="text-xl font-semibold mb-2">How are you feeling?</h2>
        <p className="text-muted-foreground mb-4">
          Tap to check in with your assistant
        </p>
        <Button 
          className="w-full bg-white hover:bg-white/90 text-foreground rounded-xl flex items-center gap-2 justify-center"
          onClick={() => navigate('/chat')}
        >
          <MessageCircle className="h-5 w-5 text-primary" />
          <span>Chat Now</span>
        </Button>
      </Card>
      
      <div>
        <h2 className="text-xl font-semibold mb-3">Quick Relief</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="bg-calm-purple/30 p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate('/breathing')}
          >
            <div className="mb-3 rounded-full bg-white w-12 h-12 flex items-center justify-center">
              <Wind className="h-6 w-6 text-tool-blue" />
            </div>
            <h3 className="font-medium">Breathing</h3>
            <p className="text-sm text-muted-foreground">Guided patterns</p>
          </Card>
          
          <Card
            className="bg-calm-pink/30 p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate('/visual')}
          >
            <div className="mb-3 rounded-full bg-white w-12 h-12 flex items-center justify-center">
              <Heart className="h-6 w-6 text-tool-pink" />
            </div>
            <h3 className="font-medium">Visual</h3>
            <p className="text-sm text-muted-foreground">Calming patterns</p>
          </Card>
          
          <Card
            className="bg-calm-blue/30 p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate('/sounds')}
          >
            <div className="mb-3 rounded-full bg-white w-12 h-12 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-tool-blue">
                <path d="M9 18V6L21 12L9 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 9H5V15H3V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-medium">Sounds</h3>
            <p className="text-sm text-muted-foreground">Soothing audio</p>
          </Card>
          
          <Card 
            className="bg-calm-green/30 p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate('/sos')}
          >
            <div className="mb-3 rounded-full bg-white w-12 h-12 flex items-center justify-center">
              <Zap className="h-6 w-6 text-tool-green" />
            </div>
            <h3 className="font-medium">SOS Calm</h3>
            <p className="text-sm text-muted-foreground">Quick relief</p>
          </Card>
        </div>
      </div>
      
      <Card className="bg-white rounded-2xl p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Next up: Reading Time</h2>
          <span className="text-sm text-muted-foreground">In 15 min</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-calm-blue/30 rounded-full p-2">
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
    </div>
  );
};

export default Home;
