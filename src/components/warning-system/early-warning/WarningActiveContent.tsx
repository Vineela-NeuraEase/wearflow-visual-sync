
import { RumblingRiskProgress } from "./RumblingRiskProgress";
import { DetectedPatterns } from "./DetectedPatterns";
import { ActionButtons } from "./ActionButtons";
import { WarningLevel } from "./types";

interface WarningActiveContentProps {
  warningLevel: WarningLevel;
  rumblingScore: number;
  timeToThreshold: string | null;
  detectedPatterns: string[];
  onShowStrategies: () => void;
  onDismiss: () => void;
}

export const WarningActiveContent = ({
  warningLevel,
  rumblingScore,
  timeToThreshold,
  detectedPatterns,
  onShowStrategies,
  onDismiss
}: WarningActiveContentProps) => {
  return (
    <>
      <RumblingRiskProgress
        rumblingScore={rumblingScore}
        warningLevel={warningLevel}
        timeToThreshold={timeToThreshold}
      />
      
      <DetectedPatterns patterns={detectedPatterns} />
      
      <ActionButtons
        warningLevel={warningLevel}
        onShowStrategies={onShowStrategies}
        onDismiss={onDismiss}
      />
    </>
  );
};
