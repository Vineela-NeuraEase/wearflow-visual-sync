
// Polyfill for @react-native-community/netinfo
class NetInfoStateType {
  static unknown = 'unknown';
  static none = 'none';
  static cellular = 'cellular';
  static wifi = 'wifi';
}

export default {
  addEventListener: (eventName, handler) => {
    window.addEventListener('online', () => handler({ isConnected: true }));
    window.addEventListener('offline', () => handler({ isConnected: false }));
    return () => {
      window.removeEventListener('online', handler);
      window.removeEventListener('offline', handler);
    };
  },
  fetch: () => Promise.resolve({
    isConnected: navigator.onLine,
    isInternetReachable: navigator.onLine,
    type: navigator.onLine ? NetInfoStateType.wifi : NetInfoStateType.none,
  }),
  NetInfoStateType,
};
