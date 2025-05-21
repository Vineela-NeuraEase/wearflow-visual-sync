
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface HeaderSectionProps {
  onBack: () => void;
}

export const HeaderSection = ({ onBack }: HeaderSectionProps) => {
  return (
    <div className="bg-blue-100 p-4 rounded-b-3xl">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold ml-2">How are you feeling?</h1>
      </div>
    </div>
  );
};
