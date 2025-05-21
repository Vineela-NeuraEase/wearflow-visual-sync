
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

export const InfoCard = () => {
  return (
    <Card className="p-4 bg-blue-50 flex items-center space-x-3">
      <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />
      <p className="text-sm">
        Tracking meltdowns helps identify patterns and develop effective coping strategies.
      </p>
    </Card>
  );
};
