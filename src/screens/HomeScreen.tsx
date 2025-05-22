
import React from 'react';
import { Button } from '@/components/ui/button';

const HomeScreen = () => {
  const navigateToScreen = (screen: string) => {
    console.log(`Navigate to ${screen} (would use navigation in a real mobile app)`);
    // In a real app with React Navigation, we would use navigation.navigate(screen)
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Wellness Monitor</h1>
        <p className="text-muted-foreground">Track your biometrics and wellbeing</p>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">Wearable Connection</h2>
        <p className="mb-4 text-gray-600">
          Connect to a wearable device to start tracking your biometrics in real-time.
        </p>
        <Button 
          onClick={() => navigateToScreen('WearablePairing')}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          Connect Device
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div 
          onClick={() => navigateToScreen('BioTracking')}
          className="bg-white rounded-lg p-4 shadow cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="h-12 w-12 rounded-full bg-blue-100 mb-3 flex items-center justify-center">
            <span className="text-blue-500">📊</span>
          </div>
          <h3 className="font-medium">Bio Tracking</h3>
        </div>
        
        <div 
          onClick={() => navigateToScreen('WarningSystem')}
          className="bg-white rounded-lg p-4 shadow cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="h-12 w-12 rounded-full bg-amber-100 mb-3 flex items-center justify-center">
            <span className="text-amber-500">⚠️</span>
          </div>
          <h3 className="font-medium">Warning System</h3>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
