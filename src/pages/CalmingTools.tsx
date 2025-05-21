
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wind, Music } from "lucide-react";
import { Card } from "@/components/ui/card";

const CalmingTools = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Calming Tools</h1>
      </div>
      
      <div className="calm-container">
        <div className="flex items-center mb-2">
          <ArrowLeft className="h-5 w-5 text-primary cursor-pointer" onClick={() => navigate('/')} />
          <h2 className="text-2xl font-semibold ml-4">Calming Tools</h2>
        </div>
        
        <h3 className="text-xl font-medium mt-6 mb-4">Activities</h3>
        
        <div className="space-y-4">
          <Card 
            className="bg-white rounded-xl p-4 flex items-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/breathing')}
          >
            <div className="bg-calm-blue/30 rounded-full p-3 mr-4">
              <Wind className="h-6 w-6 text-tool-blue" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Breathing Exercise</h3>
              <p className="text-muted-foreground">Guided breathing patterns</p>
            </div>
          </Card>
          
          <Card 
            className="bg-white rounded-xl p-4 flex items-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/visual')}
          >
            <div className="bg-calm-green/30 rounded-full p-3 mr-4">
              <svg className="h-6 w-6 text-tool-green" viewBox="0 0 24 24" fill="none">
                <path d="M12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 12H5.01M19 12H19.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19V19.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 1C10.22 1 8.47991 1.52784 6.99987 2.51677C5.51983 3.50571 4.36628 4.91131 3.68509 6.55585C3.0039 8.20038 2.82567 10.01 3.17294 11.7558C3.5202 13.5016 4.37737 15.1053 5.63604 16.364C6.89472 17.6226 8.49836 18.4798 10.2442 18.8271C11.99 19.1743 13.7996 18.9961 15.4442 18.3149C17.0887 17.6337 18.4943 16.4802 19.4832 15.0001C20.4722 13.5201 21 11.78 21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-lg">Visual Stimming</h3>
              <p className="text-muted-foreground">Calming visual patterns</p>
            </div>
          </Card>
          
          <Card 
            className="bg-white rounded-xl p-4 flex items-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/sounds')}
          >
            <div className="bg-calm-pink/30 rounded-full p-3 mr-4">
              <Music className="h-6 w-6 text-tool-pink" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Soothing Sounds</h3>
              <p className="text-muted-foreground">White noise and nature sounds</p>
            </div>
          </Card>
        </div>
        
        <h3 className="text-xl font-medium mt-8 mb-4">Featured: Bubble Pop</h3>
        
        <Card className="bg-white rounded-xl p-4 overflow-hidden">
          <img 
            src="https://placeholder.pics/svg/320x180/DEDEDE/555555/Bubble%20pop%20activity" 
            alt="Bubble pop activity" 
            className="w-full h-[180px] object-cover rounded-lg"
          />
          <p className="mt-4 text-center text-muted-foreground">
            A calming activity to help reduce stress through interactive bubble popping
          </p>
        </Card>
      </div>
    </div>
  );
};

export default CalmingTools;
