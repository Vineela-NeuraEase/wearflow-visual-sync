
import { BluetoothDeviceManager } from "@/components/BluetoothDeviceManager";

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
