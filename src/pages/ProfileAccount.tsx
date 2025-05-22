
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ChevronRight, User, Lock, Settings, Camera, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/context/ProfileContext";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ProfileAccount = () => {
  const navigate = useNavigate();
  const { profile, loading, updateProfile, uploadAvatar } = useProfile();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
    },
  });

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const fileSize = file.size / 1024 / 1024; // size in MB
    
    if (fileSize > 2) {
      toast({
        title: "File too large",
        description: "Avatar image must be less than 2MB",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);
      const { url, error } = await uploadAvatar(file);
      
      if (error || !url) {
        throw new Error(error || "Failed to upload avatar");
      }
      
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully",
      });
    } catch (err: any) {
      toast({
        title: "Upload failed",
        description: err.message || "Something went wrong while uploading your avatar",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const { success, error } = await updateProfile({
        first_name: data.first_name || null,
        last_name: data.last_name || null,
      });
      
      if (success) {
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Update form values when profile loads
  React.useEffect(() => {
    if (profile) {
      form.reset({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
      });
    }
  }, [profile, form]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 px-4 max-w-2xl mx-auto pt-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Profile & Account</h1>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <Avatar className="w-24 h-24 border-2 border-primary">
            {profile?.avatar_url ? (
              <AvatarImage src={profile.avatar_url} alt="Profile" />
            ) : (
              <AvatarFallback className="bg-primary text-white text-4xl">
                {user?.email ? user.email[0].toUpperCase() : "U"}
              </AvatarFallback>
            )}
          </Avatar>
          
          <label 
            htmlFor="avatar-upload" 
            className="absolute bottom-0 right-0 p-1 bg-primary text-white rounded-full cursor-pointer"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Camera className="h-4 w-4" />
            )}
          </label>
          
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarUpload}
            disabled={isUploading}
          />
        </div>
        
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="First Name" value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Last Name" value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex space-x-2">
                <Button type="submit">Save Changes</Button>
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <>
            <h2 className="text-xl font-semibold">
              {profile?.first_name || profile?.last_name 
                ? `${profile.first_name || ''} ${profile.last_name || ''}` 
                : 'User'}
            </h2>
            <p className="text-gray-500">{user?.email}</p>
            <Button variant="outline" className="mt-2" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          </>
        )}
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Account Settings</h3>
        </div>
        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={() => navigate("/settings/privacy")}
          >
            <Lock className="mr-2 h-5 w-5" />
            Privacy Settings
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={() => navigate("/settings/display")}
          >
            <Settings className="mr-2 h-5 w-5" />
            Display Preferences
          </Button>
          
          <Button 
            variant="destructive" 
            className="w-full" 
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfileAccount;

