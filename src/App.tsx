
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import screens
import HomeScreen from './screens/HomeScreen';
import BioTrackingScreen from './screens/BioTrackingScreen';
import WarningSystemScreen from './screens/WarningSystemScreen';
import WearablePairingScreen from './screens/WearablePairingScreen';

// Create the navigation stack
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => (
  <SafeAreaProvider>
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator 
          id={undefined}
          initialRouteName="Home"
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Wellness Monitor' }}
          />
          <Stack.Screen 
            name="BioTracking" 
            component={BioTrackingScreen} 
            options={{ title: 'Bio Tracking' }}
          />
          <Stack.Screen 
            name="WarningSystem" 
            component={WarningSystemScreen} 
            options={{ title: 'Early Warning System' }}
          />
          <Stack.Screen 
            name="WearablePairing" 
            component={WearablePairingScreen} 
            options={{ title: 'Connect Device' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  </SafeAreaProvider>
);

export default App;
