
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Device } from 'react-native-ble-plx';

interface DeviceListProps {
  devices: Device[];
  onSelectDevice: (device: Device) => void;
  isConnecting: boolean;
}

export const DeviceList = ({ 
  devices, 
  onSelectDevice,
  isConnecting 
}: DeviceListProps) => {
  // Calculate signal strength as percentage (RSSI is typically between -100 and 0)
  const getSignalStrength = (rssi: number | null | undefined): number => {
    if (rssi === null || rssi === undefined) return 0;
    // Convert RSSI to percentage (0 to 100)
    // -100 or lower = 0%, -50 = 50%, 0 or higher = 100%
    return Math.min(100, Math.max(0, 100 + rssi));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available Devices</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.deviceItem}
            onPress={() => onSelectDevice(item)}
            disabled={isConnecting}
          >
            <View style={styles.deviceInfo}>
              <Text style={styles.deviceName}>{item.name || 'Unknown Device'}</Text>
              <Text style={styles.deviceId}>{item.id}</Text>
            </View>
            <View style={styles.signalContainer}>
              <Text style={styles.signalText}>
                {getSignalStrength(item.rssi)}%
              </Text>
              <View
                style={[
                  styles.signalIndicator,
                  {
                    backgroundColor:
                      getSignalStrength(item.rssi) > 70 ? '#4ade80' : 
                      getSignalStrength(item.rssi) > 40 ? '#facc15' : '#f87171'
                  }
                ]}
              />
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No devices found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12
  },
  deviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  deviceInfo: {
    flex: 1
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '500'
  },
  deviceId: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2
  },
  signalContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  signalText: {
    fontSize: 12,
    color: '#64748b',
    marginRight: 8
  },
  signalIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center'
  },
  emptyText: {
    color: '#64748b'
  }
});
