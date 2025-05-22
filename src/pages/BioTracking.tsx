
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/biotracking/PageHeader";
import { BiometricDeviceSection } from "@/components/biotracking/BiometricDeviceSection";
import { OfflineBanner } from "@/components/biotracking/OfflineBanner";
import { StatusTabContent } from "@/components/biotracking/StatusTabContent";
import { ThresholdsTabContent } from "@/components/biotracking/ThresholdsTabContent";
import { PatternsTabContent } from "@/components/biotracking/PatternsTabContent";
import { useBioTrackingState } from "@/hooks/useBioTrackingState";

const BioTracking = () => {
  const {
    isConnected,
    dataPoints,
    offlineData,
    isOnline,
    thresholds,
    settings,
    weeklyData,
    handleThresholdChange,
    handleToggleSetting,
    saveSettings,
    handleDeviceConnected,
    handleDataReceived,
    getCurrentMetrics,
    formatDailyTrendData
  } = useBioTrackingState();

  return (
    <div className="space-y-6 pb-16">
      <PageHeader>
        <OfflineBanner isOnline={isOnline} offlineData={offlineData} />
      </PageHeader>
      
      <div className="px-4 space-y-6">
        <BiometricDeviceSection 
          onDeviceConnected={handleDeviceConnected}
          onDataReceived={handleDataReceived}
        />
        
        <Tabs defaultValue="status" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="status" className="text-sm md:text-base py-3">Current Status</TabsTrigger>
            <TabsTrigger value="thresholds" className="text-sm md:text-base py-3">Thresholds</TabsTrigger>
            <TabsTrigger value="patterns" className="text-sm md:text-base py-3">Patterns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="status">
            <StatusTabContent 
              currentMetrics={getCurrentMetrics()} 
              dailyTrendData={formatDailyTrendData()}
              isConnected={isConnected}
            />
          </TabsContent>
          
          <TabsContent value="thresholds">
            <ThresholdsTabContent
              thresholds={thresholds}
              settings={settings}
              onThresholdChange={handleThresholdChange}
              onToggleSetting={handleToggleSetting}
              onSaveSettings={saveSettings}
            />
          </TabsContent>
          
          <TabsContent value="patterns">
            <PatternsTabContent
              weeklyData={weeklyData}
              dataPoints={dataPoints}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BioTracking;
