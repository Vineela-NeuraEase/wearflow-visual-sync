import { Card } from "@/components/ui/card";
import { BluetoothDeviceManager } from "@/domains/biometrics/components";
import { WarningLevelDisplay } from "./early-warning/WarningLevelDisplay";
import { WarningActiveContent } from "./early-warning/WarningActiveContent";
import { StableStatusContent } from "./early-warning/StableStatusContent";
import { DeviceConnectionPrompt } from "./early-warning/DeviceConnectionPrompt";
import { useDataCollection } from "./early-warning/useDataCollection";
import { useWarningAnalysis } from "./early-warning/useWarningAnalysis";
import { BiometricData } from "@/domains/early-warning/types";

interface EarlyWarningProps {
  userId?: string;
  onShowStrategies: () => void;
}

export const EarlyWarningSystem = ({ userId, onShowStrategies }: EarlyWarningProps) => {
  // Handle data collection
  const {
    isDeviceConnected,
    biometricData,
    latestSensorData,
    handleDeviceConnected,
    handleBiometricData
  } = useDataCollection({ userId });
  
  // Handle warning analysis
  const {
    warningLevel,
    rumblingScore,
    timeToThreshold,
    detectedPatterns,
    dismissWarning
  } = useWarningAnalysis({ 
    biometricData,
    sensorData: latestSensorData
  });
  
  const getWarningBackground = () => {
    switch (warningLevel) {
      case 'alert': return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900/30';
      case 'watch': return 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-900/30';
      case 'notice': return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-900/30';
      default: return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900/30';
    }
  };
  
  return (
    <Card className={`p-5 border ${getWarningBackground()}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Early Warning System</h2>
        <WarningLevelDisplay warningLevel={warningLevel} />
      </div>
      
      <BluetoothDeviceManager 
        onDeviceConnected={handleDeviceConnected}
        onDataReceived={handleBiometricData as (data: any) => void}
      />
      
      <DeviceConnectionPrompt 
        isDeviceConnected={isDeviceConnected}
        hasData={biometricData.length > 0}
      />
      
      {warningLevel !== 'normal' ? (
        <WarningActiveContent 
          warningLevel={warningLevel}
          rumblingScore={rumblingScore}
          timeToThreshold={timeToThreshold}
          detectedPatterns={detectedPatterns}
          onShowStrategies={onShowStrategies}
          onDismiss={dismissWarning}
        />
      ) : (
        <StableStatusContent biometricData={biometricData} />
      )}
    </Card>
  );
};
