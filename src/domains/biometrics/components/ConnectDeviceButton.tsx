
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface ConnectDeviceButtonProps {
  isConnecting: boolean;
  onConnect: () => void;
}

export function ConnectDeviceButton({ 
  isConnecting, 
  onConnect 
}: ConnectDeviceButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onConnect}
      disabled={isConnecting}
    >
      {isConnecting ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text style={styles.buttonText}>
          Connect Wearable Device
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14
  }
});
