
interface OfflineNoticeProps {
  isOffline: boolean;
}

export const OfflineNotice = ({ isOffline }: OfflineNoticeProps) => {
  if (!isOffline) return null;
  
  return (
    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
      <p className="text-sm text-amber-800">
        You're currently in offline mode. New data is being collected locally and will sync when you're back online.
      </p>
    </div>
  );
};
