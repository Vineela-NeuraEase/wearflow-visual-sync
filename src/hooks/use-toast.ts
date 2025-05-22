
import { useState } from 'react';
import { ToastAndroid, Platform, Alert } from 'react-native';

type ToastVariant = 'default' | 'destructive' | 'success';

interface ToastProps {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number; // in milliseconds
}

export function useToast() {
  const toast = ({ title, description, variant = 'default', duration = 3000 }: ToastProps) => {
    if (Platform.OS === 'android') {
      // Android uses native toast
      ToastAndroid.showWithGravity(
        description ? `${title}: ${description}` : title,
        duration > 2000 ? ToastAndroid.LONG : ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    } else if (Platform.OS === 'ios') {
      // iOS uses Alert (we could use a third-party library for better toast)
      Alert.alert(title, description);
    } else {
      // Web: just log for now, in a real app we'd use a proper web toast
      console.log(`[Toast - ${variant}] ${title}${description ? `: ${description}` : ''}`);
    }
  };

  return { toast };
}
