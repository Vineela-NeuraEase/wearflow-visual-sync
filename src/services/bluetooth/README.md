
# Bluetooth Service Architecture

This document provides an overview of the Bluetooth service architecture used in this application for connecting to and retrieving data from wearable devices.

## Architecture Overview

The Bluetooth service is built with a modular architecture that provides:

- Platform-specific implementations (native mobile vs web)
- Common interfaces for consistent usage patterns
- Utility functions for data processing
- Mock implementation for web development

![Bluetooth Service Architecture](https://www.plantuml.com/plantuml/png/TP11JiCm44NtFeKnSG_G13QPov0nWQJ2KWycs8EOhRHjZ8sAQYoP97t_tnuuqJAq9aw9_vBpDu1R8bGc4XZ32AKbEdz5PBQt10x49UeXDy2sOoOcI3Nq-yiqqJ7jH7S9OcNLpkBKp-XJJ2eg1NP_3Vty5fqldBmcFARb6XgvKG8ZGK2-_gv85IxXeXUOs5qnzI6zIYY3XkXQ2H2mZLpJXD_N3ryDSQYPhMhnLhkRjM_x4mtvSt6KckVFhiFYG6dfJmLqbgFkdlxvyPvVaXPzhnC0)

## Directory Structure

```
src/services/
│
├── BluetoothServiceFactory.ts      # Factory for selecting the right service implementation
├── BluetoothService.ts             # Re-exports for convenient imports
│
└── bluetooth/                      # Bluetooth service implementation modules
    ├── constants.ts                # GATT service and characteristic UUIDs
    ├── index.ts                    # Re-exports for convenient imports
    ├── MockBluetoothService.ts     # Web/development implementation that simulates data
    ├── NativeBluetoothService.ts   # Mobile native implementation using Capacitor
    ├── types.ts                    # TypeScript interfaces and types
    └── utils.ts                    # Utility functions for data processing
```

## Usage

### Basic Usage Example

```typescript
import { useBluetoothConnection } from '@/hooks/useBluetoothConnection';

function MyComponent() {
  const { 
    isConnected, 
    isConnecting, 
    deviceName,
    connectToDevice, 
    disconnectDevice 
  } = useBluetoothConnection({
    onDeviceConnected: (device) => {
      console.log('Device connected:', device);
    },
    onDataReceived: (data) => {
      console.log('Received biometric data:', data);
    }
  });
  
  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected to: {deviceName}</p>
          <button onClick={disconnectDevice}>Disconnect</button>
        </div>
      ) : (
        <button 
          onClick={connectToDevice} 
          disabled={isConnecting}
        >
          {isConnecting ? 'Connecting...' : 'Connect'}
        </button>
      )}
    </div>
  );
}
```

### Using the Service Directly

If you need more control, you can use the Bluetooth service directly:

```typescript
import { getBiometricService } from '@/services/BluetoothServiceFactory';

const bluetoothService = getBiometricService();

// Initialize Bluetooth
await bluetoothService.initialize();

// Request permissions
const permissionsGranted = await bluetoothService.requestPermissions();
if (!permissionsGranted) {
  console.error('Bluetooth permissions denied');
  return;
}

// Scan for devices
const devices = await bluetoothService.scanForDevices();

// Connect to a device
if (devices.length > 0) {
  await bluetoothService.connectToDevice(devices[0].deviceId);
}

// Add data listener
bluetoothService.addDataListener((data) => {
  console.log('Received data:', data);
});

// Disconnect when done
await bluetoothService.disconnectDevice();
```

## Key Components

### BluetoothServiceFactory

The factory determines which implementation to use based on the current platform:
- `NativeBluetoothService` for mobile devices
- `MockBluetoothService` for web browsers

```typescript
// Get the appropriate implementation
const bluetoothService = getBiometricService();
```

### BluetoothServiceInterface

All Bluetooth service implementations follow this common interface, which provides methods for:
- Initializing Bluetooth
- Requesting permissions
- Scanning for devices
- Connecting to/disconnecting from devices
- Registering data and connection listeners

### Data Types

The core data type is `BiometricReading`, which includes:
- `heartRate` - Current heart rate in BPM
- `hrv` - Heart rate variability (optional)
- `stressLevel` - Calculated stress level (optional)
- `timestamp` - ISO timestamp of the reading

## Platform-specific Details

### Native Mobile (Capacitor)

On native mobile platforms (iOS/Android), the service uses the `@capacitor-community/bluetooth-le` plugin to interact with the device's Bluetooth hardware.

The service follows the standard Bluetooth GATT profile for heart rate monitoring, using these standard UUIDs:
- Heart Rate Service: `0000180d-0000-1000-8000-00805f9b34fb`
- Heart Rate Characteristic: `00002a37-0000-1000-8000-00805f9b34fb`

### Web/Mock Implementation

In web environments where Bluetooth LE might not be available, the mock implementation provides simulated data that mimics real biometric readings.

## Hooks

The application provides convenience hooks that wrap the Bluetooth services:

### useBluetoothConnection

This hook provides a React-friendly interface to the Bluetooth service, handling:
- Device connection/disconnection
- Data reception
- Connection status
- Toast notifications for important events

## Extending the Architecture

### Adding Support for New Device Types

To add support for new types of wearable devices:

1. Add relevant UUIDs to `constants.ts`
2. Add parsing functions to `utils.ts` for any new data formats
3. Extend the service implementations to handle the new device types

### Adding New Metrics

To add support for additional biometric metrics:

1. Extend the `BiometricReading` interface in `types.ts`
2. Update the service implementations to collect the new metrics
3. Update any data processing/parsing utilities

## Troubleshooting

### Common Issues

1. **Device not found during scanning**
   - Ensure the device is powered on and in pairing mode
   - Check that Bluetooth is enabled on the user's device
   - Verify the device supports the required GATT services

2. **Connection failures**
   - Ensure the device is in range
   - Check the device's battery level
   - On Android, location permissions might be required for Bluetooth scanning

3. **No data received after connection**
   - Verify the device supports the expected characteristics
   - Check that notifications have been enabled for the characteristics
   - Review the parsing logic in case the data format is unexpected

### Debugging

The service implementation includes extensive logging. Check the browser/device console for error messages and connection status updates.
