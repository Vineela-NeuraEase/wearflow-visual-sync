
import { BluetoothDeviceManager } from "@/components/BluetoothDeviceManager";
import { RegulationStatus } from "@/components/warning-system/RegulationStatus";
import { WarningHeader } from "@/components/warning-system/WarningHeader";
import { ConnectionAlert } from "@/components/warning-system/ConnectionAlert";
import { TabsContainer } from "@/components/warning-system/tabs/TabsContainer";
import { OfflineDataSync } from "@/components/warning-system/OfflineDataSync";
import { useWarningSystem } from "@/hooks/useWarningSystem";

// Define the RegulationFactor type
export type RegulationFactorImpact = "high" | "medium" | "low";
export type RegulationFactorTrend = "increasing" | "decreasing" | "stable";

export interface RegulationFactor {
  name: string;
  value: number;
  impact: RegulationFactorImpact;
  trend: RegulationFactorTrend;
}

const WarningSystem = () => {
  // Use our custom hook for warning system state and logic
  const {
    isConnected,
    dataPoints,
    isOnline,
    offlineData,
    regulationFactors,
    regulationScore,
    warningActive,
    showStrategies,
    getChartData,
    handleDeviceConnected,
    handleDataReceived,
    handleSaveThresholds,
    handleSaveEnvironment,
    handleShowStrategies,
    handleHideStrategies
  } = useWarningSystem();

  return (
    <div className="space-y-6 pb-16">
      <WarningHeader isOnline={isOnline} />
      
      <div className="px-4 space-y-6">
        <BluetoothDeviceManager 
          onDeviceConnected={handleDeviceConnected}
          onDataReceived={handleDataReceived}
        />
        
        <ConnectionAlert 
          isConnected={isConnected} 
          dataPoints={dataPoints}
        />
        
        <RegulationStatus 
          score={regulationScore}
          factors={regulationFactors}
          timeLeft={regulationScore < 70 ? "45 minutes" : null}
          isWarningActive={warningActive}
        />
        
        <TabsContainer 
          chartData={getChartData()}
          warningActive={warningActive}
          realtimeData={dataPoints}
          onShowStrategies={handleShowStrategies}
          showStrategies={showStrategies}
          onHideStrategies={handleHideStrategies}
          onSaveThresholds={handleSaveThresholds}
          onSaveEnvironment={handleSaveEnvironment}
        />
        
        <OfflineDataSync 
          offlineData={offlineData} 
          isOnline={isOnline}
        />
      </div>
    </div>
  );
};

export default WarningSystem;
