
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Device } from 'react-native-ble-plx';
import { useBluetoothDevices } from '@/domains/biometrics/hooks/useBluetoothDevices';
import { useToast } from '@/hooks/use-toast';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const WearablePairingScreen = ({ navigation }: Props) => {
  const { toast } = useToast();
  const {
    isScanning,
    devices,
    connectedDevice,
    isConnected,
    startScan,
    connectToDevice
  } = useBluetoothDevices();
  
  // Check for Bluetooth availability
  const [bluetoothAvailable, setBluetoothAvailable] = useState(true);
  
  // When device connects successfully, navigate back
  useEffect(() => {
    if (isConnected && connectedDevice) {
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    }
  }, [isConnected, connectedDevice, navigation]);
  
  // Signal strength calculation
  const getSignalStrength = (rssi: number | null | undefined): number => {
    if (rssi === null || rssi === undefined) return 0;
    return Math.min(100, Math.max(0, 100 + rssi));
  };
  
  // Handle device selection
  const handleSelectDevice = async (device: Device) => {
    try {
      await connectToDevice(device);
    } catch (error) {
      console.error('Error connecting to device:', error);
      toast({
        title: 'Connection Failed',
        description: 'Could not connect to the selected device',
        variant: 'destructive'
      });
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Connect a Wearable</Text>
        <Text style={styles.subtitle}>
          Connect a wearable device to track heart rate and other metrics 
          for better insights and early warning detection.
        </Text>
      </View>
      
      <View style={styles.iconContainer}>
        <View style={styles.iconOuter}>
          <View style={styles.iconInner}>
            <Text style={styles.iconText}>BLE</Text>
          </View>
        </View>
      </View>
      
      {!bluetoothAvailable ? (
        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>Bluetooth Not Available</Text>
          <Text style={styles.warningText}>
            This device doesn't support Bluetooth Low Energy or permissions are not granted.
          </Text>
          <TouchableOpacity 
            style={styles.warningButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.warningButtonText}>Continue Without Wearable</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.devicesCard}>
          <View style={styles.devicesHeader}>
            <Text style={styles.devicesTitle}>Available Devices</Text>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={startScan}
              disabled={isScanning}
            >
              <Text style={styles.scanButtonText}>
                {isScanning ? "Scanning..." : "Scan"}
              </Text>
            </TouchableOpacity>
          </View>
          
          {isScanning && devices.length === 0 && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3b82f6" />
              <Text style={styles.loadingText}>Scanning for devices...</Text>
            </View>
          )}
          
          {!isScanning && devices.length === 0 && (
            <Text style={styles.emptyText}>
              No devices found. Tap "Scan" to search for nearby wearables.
            </Text>
          )}
          
          <FlatList
            data={devices}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.deviceItem}
                onPress={() => handleSelectDevice(item)}
                disabled={isScanning}
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
            style={styles.devicesList}
          />
        </View>
      )}
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          You can skip this step and connect a device later in settings. Continuous data collection helps provide better early warnings.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  header: {
    marginBottom: 24
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1e293b'
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
    lineHeight: 20
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24
  },
  iconOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#bfdbfe',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#60a5fa',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 18
  },
  warningCard: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fcd34d'
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 8
  },
  warningText: {
    fontSize: 14,
    color: '#92400e',
    marginBottom: 16,
    lineHeight: 20
  },
  warningButton: {
    backgroundColor: '#f59e0b',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center'
  },
  warningButtonText: {
    color: '#ffffff',
    fontWeight: '600'
  },
  devicesCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  devicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  devicesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b'
  },
  scanButton: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6
  },
  scanButtonText: {
    color: '#1e293b',
    fontSize: 12,
    fontWeight: '500'
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 24
  },
  loadingText: {
    marginTop: 12,
    color: '#64748b'
  },
  emptyText: {
    textAlign: 'center',
    color: '#94a3b8',
    fontStyle: 'italic',
    paddingVertical: 24
  },
  devicesList: {
    maxHeight: 300
  },
  deviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8
  },
  deviceInfo: {
    flex: 1
  },
  deviceName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b'
  },
  deviceId: {
    fontSize: 12,
    color: '#64748b'
  },
  signalContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  signalText: {
    fontSize: 12,
    color: '#64748b',
    marginRight: 4
  },
  signalIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  infoContainer: {
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
    padding: 12,
    marginTop: 8
  },
  infoText: {
    fontSize: 13,
    color: '#0c4a6e',
    lineHeight: 18
  }
});

export default WearablePairingScreen;
