
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wellness Monitor</Text>
        <Text style={styles.subtitle}>Track your biometrics and wellbeing</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Wearable Connection</Text>
        <Text style={styles.cardDescription}>
          Connect to a wearable device to start tracking your biometrics in real-time.
        </Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('WearablePairing')}
        >
          <Text style={styles.buttonText}>Connect Device</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.grid}>
        <TouchableOpacity 
          style={styles.gridItem}
          onPress={() => navigation.navigate('BioTracking')}
        >
          <View style={[styles.gridIcon, { backgroundColor: '#e6f2fe' }]}>
            <Text style={{ fontSize: 24 }}>📊</Text>
          </View>
          <Text style={styles.gridLabel}>Bio Tracking</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.gridItem}
          onPress={() => navigation.navigate('WarningSystem')}
        >
          <View style={[styles.gridIcon, { backgroundColor: '#fff2e6' }]}>
            <Text style={{ fontSize: 24 }}>⚠️</Text>
          </View>
          <Text style={styles.gridLabel}>Warning System</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f7fa'
  },
  header: {
    marginBottom: 24
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b'
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4
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
    elevation: 2
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1e293b'
  },
  cardDescription: {
    color: '#64748b',
    marginBottom: 16,
    lineHeight: 20
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -8
  },
  gridItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginHorizontal: '1%',
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  gridIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  gridLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b'
  }
});

export default HomeScreen;
