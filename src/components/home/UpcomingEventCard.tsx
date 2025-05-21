
import { Card } from "@/components/ui/card";
import { useAccessibility } from "@/context/AccessibilityContext";

const UpcomingEventCard = () => {
  const { highContrastEnabled } = useAccessibility();
  
  return (
    <Card className={`${highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-white'} rounded-2xl p-4`}>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Next up: Reading Time</h2>
        <span className="text-sm text-muted-foreground">In 15 min</span>
      </div>
      <div className="flex items-center gap-3">
        <div className={`${highContrastEnabled ? 'bg-gray-100 border border-black' : 'bg-calm-blue/30'} rounded-full p-2`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm">Continue your daily wind-down with some reading</p>
        </div>
      </div>
    </Card>
  );
};

export default UpcomingEventCard;
