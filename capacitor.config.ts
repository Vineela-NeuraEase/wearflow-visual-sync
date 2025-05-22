
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.9e1ab8cf8a1641398890aed4f47de8fc',
  appName: 'Hana Sensory Wellness',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000
    }
  },
  server: {
    url: "https://9e1ab8cf-8a16-4139-8890-aed4f47de8fc.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
};

export default config;
