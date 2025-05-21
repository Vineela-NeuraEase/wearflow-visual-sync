
import { ReactNode } from "react";
import SettingsCard from "./SettingsCard";

interface SettingOption {
  name: string;
  icon: ReactNode;
  description: string;
  path: string;
  highlight?: boolean;
}

interface SettingsGroupProps {
  title: string;
  options: SettingOption[];
}

const SettingsGroup = ({ title, options }: SettingsGroupProps) => {
  return (
    <>
      <h2 className="text-lg font-medium mb-3 mt-8">{title}</h2>
      <div className="space-y-4">
        {options.map((option) => (
          <SettingsCard 
            key={option.name}
            name={option.name}
            icon={option.icon}
            description={option.description}
            path={option.path}
            highlight={option.highlight}
          />
        ))}
      </div>
    </>
  );
};

export default SettingsGroup;
