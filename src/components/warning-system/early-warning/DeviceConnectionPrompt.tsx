
interface DeviceConnectionPromptProps {
  isDeviceConnected: boolean;
  hasData: boolean;
}

export const DeviceConnectionPrompt = ({ 
  isDeviceConnected, 
  hasData 
}: DeviceConnectionPromptProps) => {
  if (isDeviceConnected || hasData) return null;
  
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
      <p className="text-sm text-blue-800 dark:text-blue-300">
        Connect a wearable device to enable continuous monitoring and early warning detection.
      </p>
    </div>
  );
};
