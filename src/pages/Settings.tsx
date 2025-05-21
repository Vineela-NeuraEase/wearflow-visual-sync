
import { useAccessibility } from "@/context/AccessibilityContext";
import SettingsHeader from "@/components/settings/SettingsHeader";
import SettingsGroup from "@/components/settings/SettingsGroup";
import RestartOnboardingButton from "@/components/settings/RestartOnboardingButton";
import { appSettingsOptions, personalOptions, additionalOptions } from "@/components/settings/settingsData";

const Settings = () => {
  const { highContrastEnabled, reducedMotionEnabled } = useAccessibility();
  
  // Update accessibility highlights based on context
  const updatedAppSettings = appSettingsOptions.map(option => {
    if (option.name === "Accessibility") {
      return {
        ...option,
        highlight: highContrastEnabled || reducedMotionEnabled
      };
    }
    return option;
  });
  
  return (
    <div className="space-y-6 pb-16">
      <SettingsHeader />
      
      <div className="px-4">
        <h2 className="text-lg font-medium mb-3">App Settings</h2>
        <SettingsGroup title="" options={updatedAppSettings} />
        <SettingsGroup title="Personal Preferences" options={personalOptions} />
        <SettingsGroup title="Features & Tools" options={additionalOptions} />
        <RestartOnboardingButton />
      </div>
    </div>
  );
};

export default Settings;
