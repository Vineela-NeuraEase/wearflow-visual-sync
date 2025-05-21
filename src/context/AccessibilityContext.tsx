
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'default' | 'dark' | 'high-contrast';
type AnimationMode = 'default' | 'reduced' | 'none';
type TextSize = 'default' | 'large' | 'x-large';
type SpacingMode = 'default' | 'increased';
type ColorSaturation = 'default' | 'reduced';

interface AccessibilityContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  animations: AnimationMode;
  setAnimations: (mode: AnimationMode) => void;
  spacing: SpacingMode;
  setSpacing: (mode: SpacingMode) => void;
  saturation: ColorSaturation;
  setSaturation: (mode: ColorSaturation) => void;
  hapticIntensity: number;
  setHapticIntensity: (intensity: number) => void;
  soundVolume: number;
  setSoundVolume: (volume: number) => void;
  highContrastEnabled: boolean;
  toggleHighContrast: () => void;
  reducedMotionEnabled: boolean;
  toggleReducedMotion: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('default');
  const [textSize, setTextSize] = useState<TextSize>('default');
  const [animations, setAnimations] = useState<AnimationMode>('default');
  const [spacing, setSpacing] = useState<SpacingMode>('default');
  const [saturation, setSaturation] = useState<ColorSaturation>('default');
  const [hapticIntensity, setHapticIntensity] = useState(50);
  const [soundVolume, setSoundVolume] = useState(70);
  const [highContrastEnabled, setHighContrastEnabled] = useState(false);
  const [reducedMotionEnabled, setReducedMotionEnabled] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('accessibility-theme');
    const savedTextSize = localStorage.getItem('accessibility-text-size');
    const savedAnimations = localStorage.getItem('accessibility-animations');
    const savedSpacing = localStorage.getItem('accessibility-spacing');
    const savedSaturation = localStorage.getItem('accessibility-saturation');
    const savedHapticIntensity = localStorage.getItem('accessibility-haptic');
    const savedSoundVolume = localStorage.getItem('accessibility-sound');
    const savedHighContrast = localStorage.getItem('accessibility-high-contrast');
    const savedReducedMotion = localStorage.getItem('accessibility-reduced-motion');

    if (savedTheme) setTheme(savedTheme as ThemeMode);
    if (savedTextSize) setTextSize(savedTextSize as TextSize);
    if (savedAnimations) setAnimations(savedAnimations as AnimationMode);
    if (savedSpacing) setSpacing(savedSpacing as SpacingMode);
    if (savedSaturation) setSaturation(savedSaturation as ColorSaturation);
    if (savedHapticIntensity) setHapticIntensity(Number(savedHapticIntensity));
    if (savedSoundVolume) setSoundVolume(Number(savedSoundVolume));
    if (savedHighContrast) setHighContrastEnabled(savedHighContrast === 'true');
    if (savedReducedMotion) setReducedMotionEnabled(savedReducedMotion === 'true');
  }, []);

  // Apply theme classes to document
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light', 'high-contrast');
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else if (theme === 'high-contrast') document.documentElement.classList.add('high-contrast');
    localStorage.setItem('accessibility-theme', theme);
  }, [theme]);

  // Apply text size to document
  useEffect(() => {
    document.documentElement.classList.remove('text-base', 'text-lg', 'text-xl');
    if (textSize === 'large') document.documentElement.classList.add('text-lg');
    else if (textSize === 'x-large') document.documentElement.classList.add('text-xl');
    localStorage.setItem('accessibility-text-size', textSize);
  }, [textSize]);

  // Apply animation settings
  useEffect(() => {
    document.documentElement.classList.remove('reduced-motion', 'no-motion');
    if (animations === 'reduced') document.documentElement.classList.add('reduced-motion');
    else if (animations === 'none') document.documentElement.classList.add('no-motion');
    localStorage.setItem('accessibility-animations', animations);
  }, [animations]);

  // Apply spacing settings
  useEffect(() => {
    document.documentElement.classList.remove('increased-spacing');
    if (spacing === 'increased') document.documentElement.classList.add('increased-spacing');
    localStorage.setItem('accessibility-spacing', spacing);
  }, [spacing]);

  // Apply saturation settings
  useEffect(() => {
    document.documentElement.classList.remove('reduced-saturation');
    if (saturation === 'reduced') document.documentElement.classList.add('reduced-saturation');
    localStorage.setItem('accessibility-saturation', saturation);
  }, [saturation]);

  // Save haptic settings
  useEffect(() => {
    localStorage.setItem('accessibility-haptic', String(hapticIntensity));
  }, [hapticIntensity]);

  // Save sound settings
  useEffect(() => {
    localStorage.setItem('accessibility-sound', String(soundVolume));
  }, [soundVolume]);

  // Toggle high contrast mode
  const toggleHighContrast = () => {
    const newValue = !highContrastEnabled;
    setHighContrastEnabled(newValue);
    if (newValue) {
      setTheme('high-contrast');
    } else {
      setTheme('default');
    }
    localStorage.setItem('accessibility-high-contrast', String(newValue));
  };

  // Toggle reduced motion
  const toggleReducedMotion = () => {
    const newValue = !reducedMotionEnabled;
    setReducedMotionEnabled(newValue);
    if (newValue) {
      setAnimations('none');
    } else {
      setAnimations('default');
    }
    localStorage.setItem('accessibility-reduced-motion', String(newValue));
  };

  return (
    <AccessibilityContext.Provider
      value={{
        theme,
        setTheme,
        textSize,
        setTextSize,
        animations,
        setAnimations,
        spacing,
        setSpacing,
        saturation,
        setSaturation,
        hapticIntensity,
        setHapticIntensity,
        soundVolume,
        setSoundVolume,
        highContrastEnabled,
        toggleHighContrast,
        reducedMotionEnabled,
        toggleReducedMotion,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
