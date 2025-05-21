
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, BarChart2 } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";

const AssistantCard = () => {
  const navigate = useNavigate();
  const { highContrastEnabled } = useAccessibility();
  
  return (
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
  );
};

export default AssistantCard;
