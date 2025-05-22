
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  children: React.ReactNode;
}

export const PageHeader = ({ children }: PageHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="rounded-xl bg-sense-blue p-4">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Biometric Tracking</h1>
        
        <div className="ml-auto flex items-center">
          {children}
        </div>
      </div>
      
      <p className="text-sm px-4 text-muted-foreground">
        Monitor and customize how Hana uses your physiological data to detect early signs.
      </p>
    </div>
  );
};
