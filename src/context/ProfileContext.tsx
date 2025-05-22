
import React, { createContext, useContext, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// Mock profile for development
const mockProfile: Profile = {
  id: 'mock-profile-id',
  first_name: 'Test',
  last_name: 'User',
  avatar_url: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

interface ProfileContextType {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (updates: Partial<Profile>) => Promise<{ success: boolean; error: string | null }>;
  uploadAvatar: (file: File) => Promise<{ url: string | null; error: string | null }>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(mockProfile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });

      return { success: true, error: null };
    } catch (err: any) {
      console.error("Error updating profile:", err);
      toast({
        title: "Error",
        description: "An error occurred while updating profile",
        variant: "destructive"
      });
      return { success: false, error: err.message };
    }
  };

  const uploadAvatar = async (file: File) => {
    try {
      // Mock upload
      const avatarUrl = URL.createObjectURL(file);
      
      // Update the profile with the new avatar URL
      setProfile(prev => prev ? { ...prev, avatar_url: avatarUrl } : null);

      toast({
        title: "Avatar uploaded",
        description: "Your avatar has been uploaded successfully",
      });

      return { url: avatarUrl, error: null };
    } catch (err: any) {
      console.error("Error uploading avatar:", err);
      toast({
        title: "Error",
        description: "An error occurred while uploading avatar",
        variant: "destructive"
      });
      return { url: null, error: err.message };
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, loading, error, updateProfile, uploadAvatar }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
