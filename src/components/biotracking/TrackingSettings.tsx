
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Settings {
  autoAdjust: boolean;
  notifyOnChange: boolean;
  collectEnvironmental: boolean;
  shareToCaregivers: boolean;
}

interface TrackingSettingsProps {
  settings: Settings;
  onToggleSetting: (setting: keyof Settings) => void;
}

export const TrackingSettings = ({ settings, onToggleSetting }: TrackingSettingsProps) => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Auto-adjust Thresholds</Label>
            <p className="text-sm text-muted-foreground">Let Hana learn from your patterns</p>
          </div>
          <Switch 
            checked={settings.autoAdjust}
            onCheckedChange={() => onToggleSetting('autoAdjust')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Notifications</Label>
            <p className="text-sm text-muted-foreground">Get alerts when metrics change significantly</p>
          </div>
          <Switch 
            checked={settings.notifyOnChange}
            onCheckedChange={() => onToggleSetting('notifyOnChange')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Environmental Data</Label>
            <p className="text-sm text-muted-foreground">Collect ambient noise, light, etc.</p>
          </div>
          <Switch 
            checked={settings.collectEnvironmental}
            onCheckedChange={() => onToggleSetting('collectEnvironmental')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Caregiver Access</Label>
            <p className="text-sm text-muted-foreground">Share metrics with trusted support</p>
          </div>
          <Switch 
            checked={settings.shareToCaregivers}
            onCheckedChange={() => onToggleSetting('shareToCaregivers')}
          />
        </div>
      </div>
    </div>
  );
};
