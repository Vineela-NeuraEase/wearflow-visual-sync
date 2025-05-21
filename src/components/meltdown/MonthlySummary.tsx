
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MonthlySummaryProps {
  total: number;
  avgIntensity: number;
  avgDuration: number;
  commonTrigger: string;
  effectiveStrategy: string;
}

export const MonthlySummary = ({
  total,
  avgIntensity,
  avgDuration,
  commonTrigger,
  effectiveStrategy
}: MonthlySummaryProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-4 bg-gray-50">
      <h3 className="font-medium mb-3">This Month's Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Total Meltdowns:</span>
          <span className="font-medium">{total}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Average Intensity:</span>
          <span className="font-medium">{avgIntensity}/10</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Average Duration:</span>
          <span className="font-medium">{avgDuration} min</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Most Common Trigger:</span>
          <span className="font-medium">{commonTrigger}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Most Effective Strategy:</span>
          <span className="font-medium">{effectiveStrategy}</span>
        </div>
      </div>
      
      <Button 
        className="w-full mt-4"
        onClick={() => navigate("/emotion-insights")}
      >
        <Calendar className="h-4 w-4 mr-2" />
        View Complete Analytics
      </Button>
    </Card>
  );
};
