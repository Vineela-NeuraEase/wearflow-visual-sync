
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import MenuDrawer from "./MenuDrawer";

const HeaderSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <MenuDrawer />
        <h1 className="text-2xl font-bold">Hana</h1>
      </div>
      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full"
        onClick={() => navigate("/notification-center")}
      >
        <Bell className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default HeaderSection;
