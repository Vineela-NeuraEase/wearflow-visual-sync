
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const HomeScreen = ({ navigation }: Props) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wellness Monitor</Text>
        <Text style={styles.headerSubtitle}>Track your biometrics and wellbeing</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Wearable Connection</Text>
        <Text style={styles.cardText}>
          Connect to a wearable device to start tracking your biometrics in real-time.
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('WearablePairing')}
        >
          <Text style={styles.buttonText}>Connect Device</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.menuGrid}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('BioTracking')}
        >
          <View style={[styles.menuIcon, { backgroundColor: '#e9f5fe' }]}>
            {/* Icon would go here */}
          </View>
          <Text style={styles.menuLabel}>Bio Tracking</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('WarningSystem')}
        >
          <View style={[styles.menuIcon, { backgroundColor: '#fef3e9' }]}>
            {/* Icon would go here */}
          </View>
          <Text style={styles.menuLabel}>Warning System</Text>
        </TouchableOpacity>
        
        {/* Additional menu items would go here */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc'
  },
  header: {
    marginBottom: 24
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b'
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8
  },
  cardText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    lineHeight: 20
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b'
  }
});

export default HomeScreen;
