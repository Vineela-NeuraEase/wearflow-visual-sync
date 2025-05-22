
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import screens
import HomeScreen from './screens/HomeScreen';
import { Toaster } from './components/ui/toaster';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="flex flex-col h-screen">
      <div className="p-4 flex-1 overflow-auto">
        <HomeScreen />
      </div>
      <Toaster />
    </div>
  </QueryClientProvider>
);

export default App;
