
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import screens
import HomeScreen from './screens/HomeScreen';
import BioTrackingScreen from './screens/BioTrackingScreen';
import WarningSystemScreen from './screens/WarningSystemScreen';
import WearablePairingScreen from './screens/WearablePairingScreen';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: '#f8fafc' },
              headerTitleStyle: { fontWeight: '600' },
              contentStyle: { backgroundColor: '#f8fafc' }
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: 'Wellness App' }}
            />
            <Stack.Screen 
              name="BioTracking" 
              component={BioTrackingScreen}
              options={{ title: 'Bio Tracking' }}
            />
            <Stack.Screen 
              name="WarningSystem" 
              component={WarningSystemScreen}
              options={{ title: 'Warning System' }}
            />
            <Stack.Screen 
              name="WearablePairing" 
              component={WearablePairingScreen}
              options={{ title: 'Connect Wearable' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  </GestureHandlerRootView>
);

export default App;
