
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BluetoothDeviceManager } from '@/domains/biometrics/components/BluetoothDeviceManager';
import { BiometricData } from '@/domains/biometrics/types';

const WarningSystemScreen = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [biometricData, setBiometricData] = useState<BiometricData[]>([]);
  const [warningLevel, setWarningLevel] = useState<'normal' | 'notice' | 'watch' | 'alert'>('normal');
  const [riskScore, setRiskScore] = useState(0);
  
  const handleDeviceConnected = useCallback((device: any) => {
    setIsConnected(true);
    console.log('Connected to device:', device);
  }, []);
  
  const handleDataReceived = useCallback((data: BiometricData) => {
    setBiometricData(prevData => [data, ...prevData.slice(0, 49)]);
    
    // Simple algorithm to determine warning level based on recent data
    // In a real app, this would be more sophisticated
    const newScore = calculateRiskScore(data);
    setRiskScore(newScore);
    
    if (newScore > 75) {
      setWarningLevel('alert');
    } else if (newScore > 50) {
      setWarningLevel('watch');
    } else if (newScore > 25) {
      setWarningLevel('notice');
    } else {
      setWarningLevel('normal');
    }
  }, []);
  
  const calculateRiskScore = (data: BiometricData): number => {
    // Simple calculation based on heart rate and HRV
    // Higher heart rate and lower HRV increase risk score
    let score = 0;
    
    // Heart rate component (higher = more risk)
    if (data.heartRate > 100) score += 40;
    else if (data.heartRate > 85) score += 20;
    else if (data.heartRate > 75) score += 10;
    
    // HRV component (lower = more risk)
    if (data.hrv < 30) score += 40;
    else if (data.hrv < 40) score += 20;
    else if (data.hrv < 50) score += 10;
    
    // Stress level component
    score += data.stressLevel * 0.2;
    
    return Math.min(100, score);
  };
  
  // Get styles based on warning level
  const getWarningStyles = () => {
    switch (warningLevel) {
      case 'alert':
        return { backgroundColor: '#fef2f2', borderColor: '#fca5a5', textColor: '#b91c1c' };
      case 'watch':
        return { backgroundColor: '#fff7ed', borderColor: '#fdba74', textColor: '#c2410c' };
      case 'notice':
        return { backgroundColor: '#f0f9ff', borderColor: '#93c5fd', textColor: '#1e40af' };
      default:
        return { backgroundColor: '#f0fdf4', borderColor: '#86efac', textColor: '#166534' };
    }
  };
  
  const warningStyles = getWarningStyles();
  
  const getWarningText = () => {
    switch (warningLevel) {
      case 'alert': return 'High Risk - Immediate action recommended';
      case 'watch': return 'Moderate Risk - Consider regulation strategies';
      case 'notice': return 'Low Risk - Monitor your condition';
      default: return 'Stable - All metrics within normal range';
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Early Warning System</Text>
        <Text style={styles.sectionDescription}>
          Monitor your biometrics to detect early signs of dysregulation
        </Text>
      </View>
      
      <View style={styles.deviceSection}>
        <BluetoothDeviceManager 
          onDeviceConnected={handleDeviceConnected}
          onDataReceived={handleDataReceived}
        />
      </View>
      
      <View style={[
        styles.warningCard, 
        { backgroundColor: warningStyles.backgroundColor, borderColor: warningStyles.borderColor }
      ]}>
        <Text style={[styles.warningLabel, { color: warningStyles.textColor }]}>
          Current Status
        </Text>
        <Text style={[styles.warningStatus, { color: warningStyles.textColor }]}>
          {warningLevel.toUpperCase()}
        </Text>
        <Text style={[styles.warningDescription, { color: warningStyles.textColor }]}>
          {getWarningText()}
        </Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View 
              style={[
                styles.progressFill,
                { width: `${riskScore}%`, backgroundColor: warningStyles.textColor }
              ]}
            />
          </View>
          <Text style={styles.progressText}>Risk Score: {riskScore}%</Text>
        </View>
      </View>
      
      {isConnected && biometricData.length > 0 ? (
        <View style={styles.dataCard}>
          <Text style={styles.dataCardTitle}>Latest Measurements</Text>
          <View style={styles.dataGrid}>
            <View style={styles.dataItem}>
              <Text style={styles.dataValue}>{biometricData[0].heartRate}</Text>
              <Text style={styles.dataLabel}>Heart Rate</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.dataValue}>{biometricData[0].hrv}</Text>
              <Text style={styles.dataLabel}>HRV</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.dataValue}>{biometricData[0].stressLevel}</Text>
              <Text style={styles.dataLabel}>Stress</Text>
            </View>
          </View>
          
          <Text style={styles.historyTitle}>Recent History</Text>
          {biometricData.slice(0, 5).map((data, index) => (
            <View key={index} style={styles.historyItem}>
              <Text style={styles.historyTime}>
                {new Date(data.timestamp).toLocaleTimeString()}
              </Text>
              <Text style={styles.historyValue}>
                HR: {data.heartRate} | HRV: {data.hrv}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderText}>
            {isConnected 
              ? "Waiting for biometric data..." 
              : "Connect to a wearable device to enable the warning system"}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b'
  },
  sectionDescription: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4
  },
  deviceSection: {
    marginBottom: 16
  },
  warningCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1
  },
  warningLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4
  },
  warningStatus: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8
  },
  warningDescription: {
    fontSize: 14,
    marginBottom: 16
  },
  progressContainer: {
    marginTop: 8
  },
  progressBackground: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressFill: {
    height: 8,
    borderRadius: 4
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'right'
  },
  dataCard: {
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
  dataCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16
  },
  dataGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  dataItem: {
    alignItems: 'center',
    flex: 1
  },
  dataValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b'
  },
  dataLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  historyTime: {
    fontSize: 12,
    color: '#64748b'
  },
  historyValue: {
    fontSize: 12,
    color: '#1e293b'
  },
  placeholderCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholderText: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 14
  }
});

export default WarningSystemScreen;
