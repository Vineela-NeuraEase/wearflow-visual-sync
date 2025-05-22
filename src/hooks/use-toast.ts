
import { useState } from 'react';
import { toast as showToast } from 'sonner';

type ToastVariant = 'default' | 'destructive' | 'success';

interface ToastProps {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number; // in milliseconds
}

export function useToast() {
  const toast = ({ title, description, variant = 'default', duration = 3000 }: ToastProps) => {
    const toastVariant = variant === 'destructive' ? 'error' : variant;
    
    showToast(title, {
      description,
      duration,
      // @ts-ignore - sonner has slightly different types
      variant: toastVariant,
    });
  };

  return { toast };
}

// Export a direct toast function for ease of use
export const toast = ({ title, description, variant = 'default', duration = 3000 }: ToastProps) => {
  const toastVariant = variant === 'destructive' ? 'error' : variant;
  
  showToast(title, {
    description,
    duration,
    // @ts-ignore - sonner has slightly different types
    variant: toastVariant,
  });
};
