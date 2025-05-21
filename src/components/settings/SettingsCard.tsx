
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface SettingsCardProps {
  name: string;
  icon: React.ReactNode;
  description: string;
  path: string;
  highlight?: boolean;
}

const SettingsCard = ({ 
  name, 
  icon, 
  description, 
  path, 
  highlight = false 
}: SettingsCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className={`p-4 flex items-center cursor-pointer hover:shadow-md transition-shadow ${highlight ? 'border-2 border-purple-300' : ''}`}
      onClick={() => navigate(path)}
    >
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {highlight && (
        <div className="ml-auto">
          <span className="bg-purple-100 text-purple-800 text-xs rounded-full px-2 py-1">Active</span>
        </div>
      )}
    </Card>
  );
};

export default SettingsCard;
