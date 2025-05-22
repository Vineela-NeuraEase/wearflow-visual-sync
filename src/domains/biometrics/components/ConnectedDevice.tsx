
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ConnectedDeviceProps {
  deviceName: string;
  isOnline: boolean;
  offlineDataCount: number;
  onDisconnect: () => void;
}

export function ConnectedDevice({ 
  deviceName,
  isOnline,
  offlineDataCount,
  onDisconnect
}: ConnectedDeviceProps) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.indicatorContainer}>
          <View style={[styles.indicator, styles.activeIndicator]} />
        </View>
        <View>
          <Text style={styles.deviceName}>Connected to {deviceName}</Text>
          {!isOnline && (
            <Text style={styles.offlineText}>
              Offline mode - Data stored locally ({offlineDataCount})
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity 
        style={styles.disconnectButton}
        onPress={onDisconnect}
      >
        <Text style={styles.disconnectText}>Disconnect</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#a7f3d0'
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  indicatorContainer: {
    marginRight: 8
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  activeIndicator: {
    backgroundColor: '#10b981',
  },
  deviceName: {
    fontSize: 14,
    fontWeight: '500'
  },
  offlineText: {
    fontSize: 12,
    color: '#d97706',
    marginTop: 2
  },
  disconnectButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  disconnectText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500'
  }
});
