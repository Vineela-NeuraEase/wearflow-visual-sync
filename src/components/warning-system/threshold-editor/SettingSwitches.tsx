
import { SettingSwitch } from "./SettingSwitch";
import { ThresholdSettings } from "./types";

interface SettingSwitchesProps {
  settings: ThresholdSettings;
  onChange: (key: keyof ThresholdSettings, value: boolean) => void;
}

export const SettingSwitches = ({ settings, onChange }: SettingSwitchesProps) => {
  return (
    <div className="space-y-2">
      <SettingSwitch
        id="notifications"
        label="Enable Notifications"
        description="Receive alerts when thresholds are crossed."
        checked={settings.enableNotifications}
        onCheckedChange={(checked) => onChange('enableNotifications', checked)}
      />
      
      <SettingSwitch
        id="auto-adjust"
        label="Auto-Adjust Thresholds"
        description="Allow Hana to learn from your patterns and adjust thresholds automatically."
        checked={settings.enableAutoAdjust}
        onCheckedChange={(checked) => onChange('enableAutoAdjust', checked)}
      />
    </div>
  );
};
