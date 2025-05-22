
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SettingSwitchProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const SettingSwitch = ({
  id,
  label,
  description,
  checked,
  onCheckedChange
}: SettingSwitchProps) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <Label htmlFor={id} className="text-base">{label}</Label>
        <p className="text-xs text-muted-foreground mt-1">
          {description}
        </p>
      </div>
      <Switch 
        id={id} 
        checked={checked} 
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};
