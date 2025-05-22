
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalysisTabContent } from "./AnalysisTabContent";
import { PatternDetectionInsights } from "@/components/warning-system/PatternDetectionInsights";
import { EnvironmentalTracker } from "@/components/warning-system/EnvironmentalTracker";
import { CustomThresholdEditor } from "@/components/warning-system/CustomThresholdEditor";
import { PersonalizedStrategies } from "@/components/warning-system/PersonalizedStrategies";

interface TabsContainerProps {
  chartData: any[];
  warningActive: boolean;
  realtimeData: any[];
  onShowStrategies: () => void;
  showStrategies: boolean;
  onHideStrategies: () => void;
  onSaveThresholds: (settings: any) => void;
  onSaveEnvironment: (factors: any) => void;
}

export const TabsContainer = ({
  chartData,
  warningActive,
  realtimeData,
  onShowStrategies,
  showStrategies,
  onHideStrategies,
  onSaveThresholds,
  onSaveEnvironment
}: TabsContainerProps) => {
  const [activeTab, setActiveTab] = useState("analysis");
  
  if (showStrategies) {
    return (
      <div className="mb-6">
        <PersonalizedStrategies 
          onClose={onHideStrategies} 
          warningLevel="watch"
        />
      </div>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="analysis" className="text-sm">Analysis</TabsTrigger>
        <TabsTrigger value="patterns" className="text-sm">Patterns</TabsTrigger>
        <TabsTrigger value="environment" className="text-sm">Environment</TabsTrigger>
        <TabsTrigger value="settings" className="text-sm">Thresholds</TabsTrigger>
      </TabsList>
      
      <TabsContent value="analysis" className="space-y-6">
        <AnalysisTabContent 
          chartData={chartData}
          warningActive={warningActive}
          onShowStrategies={onShowStrategies}
        />
      </TabsContent>
      
      <TabsContent value="patterns" className="space-y-6">
        <PatternDetectionInsights realtimeData={realtimeData} />
      </TabsContent>
      
      <TabsContent value="environment" className="space-y-6">
        <EnvironmentalTracker onSave={onSaveEnvironment} />
      </TabsContent>
      
      <TabsContent value="settings" className="space-y-6">
        <CustomThresholdEditor onSave={onSaveThresholds} />
      </TabsContent>
    </Tabs>
  );
};
