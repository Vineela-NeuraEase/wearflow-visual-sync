
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const EmotionInsightsHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="rounded-xl bg-sense-pink p-4">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Emotion Insights</h1>
      </div>
    </div>
  );
};

export default EmotionInsightsHeader;
