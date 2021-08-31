import { CapacitorConfig } from '@capacitor/cli';
/// <reference types="@capacitor/push-notifications" />

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Stiletto',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    PushNotifications:{
      presentationOptions:['badge', 'sound', 'alert']
    }
  }
};

export default config;
