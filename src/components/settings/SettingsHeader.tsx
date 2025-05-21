
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SettingsHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center mb-6">
      <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <h1 className="text-xl font-semibold ml-2 flex items-center">
        <SettingsIcon className="h-5 w-5 mr-2" />
        Settings
      </h1>
    </div>
  );
};

export default SettingsHeader;
