
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import EmotionLoggerSheet from "@/components/sheets/EmotionLoggerSheet";
import MeltdownLoggerSheet from "@/components/sheets/MeltdownLoggerSheet";

// Import extracted components
import EmotionHubHeader from "@/components/emotion-hub/EmotionHubHeader";
import LogTabContent from "@/components/emotion-hub/LogTabContent";
import JournalTabContent from "@/components/emotion-hub/JournalTabContent";
import MeltdownsTabContent from "@/components/emotion-hub/MeltdownsTabContent";
import InsightsTabContent from "@/components/emotion-hub/InsightsTabContent";

const EmotionHub = () => {
  const { toast } = useToast();
  const [isEmotionLoggerOpen, setIsEmotionLoggerOpen] = useState(false);
  const [isMeltdownLoggerOpen, setIsMeltdownLoggerOpen] = useState(false);

  return (
    <div className="space-y-6 pb-16">
      <EmotionHubHeader />

      <div className="px-4 space-y-6">
        <Tabs defaultValue="log" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="log" className="text-sm md:text-base py-3">Log</TabsTrigger>
            <TabsTrigger value="journal" className="text-sm md:text-base py-3">Journal</TabsTrigger>
            <TabsTrigger value="meltdowns" className="text-sm md:text-base py-3">Meltdowns</TabsTrigger>
            <TabsTrigger value="insights" className="text-sm md:text-base py-3">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="log">
            <LogTabContent 
              setIsEmotionLoggerOpen={setIsEmotionLoggerOpen}
              setIsMeltdownLoggerOpen={setIsMeltdownLoggerOpen}
            />
          </TabsContent>
          
          <TabsContent value="journal">
            <JournalTabContent />
          </TabsContent>
          
          <TabsContent value="meltdowns">
            <MeltdownsTabContent setIsMeltdownLoggerOpen={setIsMeltdownLoggerOpen} />
          </TabsContent>
          
          <TabsContent value="insights">
            <InsightsTabContent />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Sheets */}
      <EmotionLoggerSheet isOpen={isEmotionLoggerOpen} onClose={() => setIsEmotionLoggerOpen(false)} />
      <MeltdownLoggerSheet isOpen={isMeltdownLoggerOpen} onClose={() => setIsMeltdownLoggerOpen(false)} />
    </div>
  );
};

export default EmotionHub;
