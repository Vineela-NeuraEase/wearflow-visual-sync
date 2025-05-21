
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const RestartOnboardingButton = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mt-8">
      <Button 
        className="w-full"
        variant="outline"
        onClick={() => navigate("/welcome/intro")}
      >
        Restart Onboarding
      </Button>
    </div>
  );
};

export default RestartOnboardingButton;
