
// Polyfill for react-native-ble-plx
export class Device {
  constructor(props) {
    this.id = props.id || 'mock-id';
    this.name = props.name || 'Mock Device';
    this.rssi = props.rssi || -50;
  }
}

const BluetoothService = {
  checkBluetoothState: () => Promise.resolve(true),
  scanForDevices: (callback) => {
    setTimeout(() => {
      callback(new Device({ id: '1', name: 'Mock Heart Rate Monitor', rssi: -55 }));
      callback(new Device({ id: '2', name: 'Mock Fitness Tracker', rssi: -70 }));
    }, 1000);
    return () => {};
  },
  stopScan: () => {},
  connectToDevice: (device) => Promise.resolve(device),
  disconnectDevice: () => Promise.resolve(),
  subscribeToHeartRate: (callback) => {
    const interval = setInterval(() => {
      callback({
        heartRate: 65 + Math.floor(Math.random() * 20),
        hrv: 45 + Math.floor(Math.random() * 15),
        stressLevel: Math.floor(Math.random() * 100),
        timestamp: new Date().toISOString(),
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }
};

export default BluetoothService;
export { BluetoothService, Device };
