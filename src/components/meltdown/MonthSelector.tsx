
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthSelectorProps {
  currentMonth: string;
  onPrevious: () => void;
  onNext: () => void;
}

export const MonthSelector = ({ currentMonth, onPrevious, onNext }: MonthSelectorProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <Button variant="outline" size="icon" onClick={onPrevious}>
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <h2 className="text-lg font-medium">{currentMonth}</h2>
      <Button variant="outline" size="icon" onClick={onNext}>
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};
