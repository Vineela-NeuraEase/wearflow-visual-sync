
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accessibility } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";

const AccessibilityNotice = () => {
  const navigate = useNavigate();
  const { highContrastEnabled, reducedMotionEnabled } = useAccessibility();
  
  if (!highContrastEnabled && !reducedMotionEnabled) return null;
  
  return (
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
  );
};

export default AccessibilityNotice;
