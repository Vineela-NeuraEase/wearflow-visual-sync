
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

interface ProfileContextType {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (updates: Partial<Profile>) => Promise<{ success: boolean; error: string | null }>;
  uploadAvatar: (file: File) => Promise<{ url: string | null; error: string | null }>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Cast the supabase client to any to bypass type checking for this call
        const { data, error: fetchError } = await (supabase as any)
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (fetchError) {
          console.error("Error fetching profile:", fetchError);
          setError(`Failed to load profile: ${fetchError.message}`);
        } else {
          setProfile(data);
        }
      } catch (err: any) {
        console.error("Unexpected error fetching profile:", err);
        setError("An unexpected error occurred while fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    try {
      // Cast the supabase client to any to bypass type checking for this call
      const { error: updateError } = await (supabase as any)
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (updateError) {
        console.error("Error updating profile:", updateError);
        toast({
          title: "Error",
          description: `Failed to update profile: ${updateError.message}`,
          variant: "destructive"
        });
        return { success: false, error: updateError.message };
      }

      // Update local state with new profile data
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });

      return { success: true, error: null };
    } catch (err: any) {
      console.error("Unexpected error updating profile:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred while updating profile",
        variant: "destructive"
      });
      return { success: false, error: err.message };
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user) {
      return { url: null, error: "User not authenticated" };
    }

    try {
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Cast the supabase client to any to bypass type checking for this call
      const { error: uploadError } = await (supabase as any)
        .storage
        .from('user-content')
        .upload(filePath, file);

      if (uploadError) {
        console.error("Error uploading avatar:", uploadError);
        toast({
          title: "Error",
          description: `Failed to upload avatar: ${uploadError.message}`,
          variant: "destructive"
        });
        return { url: null, error: uploadError.message };
      }

      // Get the public URL for the uploaded file
      const { data } = (supabase as any)
        .storage
        .from('user-content')
        .getPublicUrl(filePath);

      const avatarUrl = data.publicUrl;

      // Update the user's profile with the new avatar URL
      await updateProfile({ avatar_url: avatarUrl });

      toast({
        title: "Avatar uploaded",
        description: "Your avatar has been uploaded successfully",
      });

      return { url: avatarUrl, error: null };
    } catch (err: any) {
      console.error("Unexpected error uploading avatar:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred while uploading avatar",
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
