
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Wind, Heart } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";

const QuickReliefSection = () => {
  const navigate = useNavigate();
  const { highContrastEnabled } = useAccessibility();
  
  const reliefOptions = [
    {
      title: "Breathing",
      description: "Guided patterns",
      icon: <Wind className={`h-6 w-6 ${highContrastEnabled ? 'text-high-contrast-primary' : 'text-tool-blue'}`} />,
      path: "/breathing",
      color: highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-calm-purple/30'
    },
    {
      title: "Visual",
      description: "Calming patterns",
      icon: <Heart className={`h-6 w-6 ${highContrastEnabled ? 'text-high-contrast-secondary' : 'text-tool-pink'}`} />,
      path: "/visual",
      color: highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-calm-pink/30'
    },
    {
      title: "Sounds",
      description: "Soothing audio",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`${highContrastEnabled ? 'text-high-contrast-primary' : 'text-tool-blue'}`}>
              <path d="M9 18V6L21 12L9 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 9H5V15H3V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>,
      path: "/sounds",
      color: highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-calm-blue/30'
    },
    {
      title: "Environment",
      description: "Track factors",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-6 w-6 ${highContrastEnabled ? 'text-high-contrast-secondary' : 'text-tool-green'}`}>
              <path d="M18 2h-3a5 5 0 0 0-5 5v14"></path>
              <path d="M18 22V4"></path>
              <path d="M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2v8z"></path>
            </svg>,
      path: "/environmental",
      color: highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-calm-green/30'
    }
  ];
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Quick Relief</h2>
      <div className="grid grid-cols-2 gap-4">
        {reliefOptions.map((option) => (
          <Card 
            key={option.title}
            className={`${option.color} p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform`}
            onClick={() => navigate(option.path)}
          >
            <div className={`mb-3 rounded-full ${highContrastEnabled ? 'bg-gray-100 border border-black' : 'bg-white'} w-12 h-12 flex items-center justify-center`}>
              {option.icon}
            </div>
            <h3 className="font-medium">{option.title}</h3>
            <p className="text-sm text-muted-foreground">{option.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickReliefSection;
