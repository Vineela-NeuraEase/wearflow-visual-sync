
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BluetoothDeviceManager } from '@/domains/biometrics/components/BluetoothDeviceManager';
import { BiometricData } from '@/domains/biometrics/types';

const BioTrackingScreen = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [biometricData, setBiometricData] = useState<BiometricData[]>([]);
  
  const handleDeviceConnected = useCallback((device: any) => {
    setIsConnected(true);
    console.log('Connected to device:', device);
  }, []);
  
  const handleDataReceived = useCallback((data: BiometricData) => {
    setBiometricData(prevData => [data, ...prevData.slice(0, 49)]);
  }, []);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <BluetoothDeviceManager 
          onDeviceConnected={handleDeviceConnected}
          onDataReceived={handleDataReceived}
        />
      </View>
      
      {isConnected && (
        <View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Current Metrics</Text>
            {biometricData.length > 0 ? (
              <View style={styles.metricsContainer}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricValue}>{biometricData[0].heartRate}</Text>
                  <Text style={styles.metricLabel}>Heart Rate</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricValue}>{biometricData[0].hrv}</Text>
                  <Text style={styles.metricLabel}>HRV</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricValue}>{biometricData[0].stressLevel}</Text>
                  <Text style={styles.metricLabel}>Stress Level</Text>
                </View>
              </View>
            ) : (
              <Text style={styles.waitingText}>Waiting for data...</Text>
            )}
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Data History</Text>
            {biometricData.map((data, index) => (
              <View key={index} style={styles.dataRow}>
                <Text style={styles.dataTime}>
                  {new Date(data.timestamp).toLocaleTimeString()}
                </Text>
                <Text style={styles.dataValue}>
                  HR: {data.heartRate} | HRV: {data.hrv} | Stress: {data.stressLevel}
                </Text>
              </View>
            ))}
            {biometricData.length === 0 && (
              <Text style={styles.waitingText}>No data available</Text>
            )}
          </View>
        </View>
      )}
      
      {!isConnected && (
        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderText}>
            Connect to a wearable device to see your biometric data
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  section: {
    marginBottom: 16
  },
  card: {
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
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1e293b'
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  metricItem: {
    alignItems: 'center',
    flex: 1
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b'
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4
  },
  waitingText: {
    textAlign: 'center',
    color: '#94a3b8',
    fontStyle: 'italic',
    paddingVertical: 16
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  dataTime: {
    fontSize: 12,
    color: '#64748b'
  },
  dataValue: {
    fontSize: 12,
    color: '#1e293b'
  },
  placeholderCard: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 32,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholderText: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 14,
    lineHeight: 20
  }
});

export default BioTrackingScreen;
