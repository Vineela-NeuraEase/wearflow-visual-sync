
/// <reference types="vite/client" />

// Add type definition for Web Bluetooth API
interface Navigator {
  bluetooth?: {
    requestDevice: Function;
    // Add other Bluetooth API methods as needed
  };
}
