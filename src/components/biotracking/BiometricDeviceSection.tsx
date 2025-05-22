
import { BluetoothDeviceManager } from "@/domains/biometrics/components";

interface BiometricDeviceSectionProps {
  onDeviceConnected: (device: any) => void;
  onDataReceived: (data: any) => void;
}

export const BiometricDeviceSection = ({
  onDeviceConnected,
  onDataReceived
}: BiometricDeviceSectionProps) => {
  return (
    <BluetoothDeviceManager 
      onDeviceConnected={onDeviceConnected}
      onDataReceived={onDataReceived}
    />
  );
};
