
import { Button } from "@/components/ui/button";
import { DrawerHeader } from "@/components/ui/drawer";
import { ChevronLeft } from "lucide-react";

interface SheetHeaderProps {
  formattedDate: string;
  onClose: () => void;
}

export const SheetHeader = ({ formattedDate, onClose }: SheetHeaderProps) => {
  return (
    <div className="bg-amber-100 p-4 rounded-t-[30px]">
      <DrawerHeader className="text-left p-0">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-2xl font-bold ml-2">Log Meltdown</h2>
        </div>
      </DrawerHeader>
      
      <p className="mt-2 text-sm text-gray-700 px-2">
        {formattedDate}
      </p>
    </div>
  );
};
