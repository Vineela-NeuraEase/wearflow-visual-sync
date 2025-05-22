
import { Card } from "@/components/ui/card";
import { AlertThresholds } from "./AlertThresholds";
import { TrackingSettings } from "./TrackingSettings";

interface ThresholdsTabContentProps {
  thresholds: {
    heartRateHigh: number;
    heartRateLow: number;
    hrvHigh: number;
    hrvLow: number;
    sleepQuality: number;
  };
  settings: {
    autoAdjust: boolean;
    notifyOnChange: boolean;
    collectEnvironmental: boolean;
    shareToCaregivers: boolean;
  };
  onThresholdChange: (metric: string, value: number) => void;
  onToggleSetting: (setting: string) => void;
  onSaveSettings: () => void;
}

export const ThresholdsTabContent = ({
  thresholds,
  settings,
  onThresholdChange,
  onToggleSetting,
  onSaveSettings
}: ThresholdsTabContentProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-5">
        <AlertThresholds 
          thresholds={thresholds}
          onThresholdChange={onThresholdChange}
          onSave={onSaveSettings}
        />
      </Card>
      
      <Card className="p-5">
        <TrackingSettings 
          settings={settings}
          onToggleSetting={onToggleSetting}
        />
      </Card>
    </div>
  );
};
