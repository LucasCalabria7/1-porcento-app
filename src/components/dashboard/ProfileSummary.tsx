"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Briefcase, User, Camera } from 'lucide-react';
import { useAppTranslations } from '@/lib/useAppTranslations';

interface ProfileSummaryProps {
  userId?: string;
}

export default function ProfileSummary({ userId }: ProfileSummaryProps) {
  const { t } = useAppTranslations();
  const [username, setUsername] = useState<string>('');
  const [profileType, setProfileType] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Get user name from metadata or email
          const userName = session.user.user_metadata?.name || 
                          session.user.user_metadata?.full_name || 
                          session.user.email?.split('@')[0] || 
                          t('dashboard.creator.user');
          
          setUsername(userName);
          
          // Get profile type from database
          const { data: profile } = await supabase
            .from('profiles')
            .select('profile_type, avatar_url')
            .eq('user_id', userId || session.user.id)
            .single();
          
          // Set profile type
          if (profile && profile.profile_type) {
            setProfileType(profile.profile_type);
          } else {
            // Fallback to metadata
            setProfileType(session.user.user_metadata?.profile_type || '');
          }
          
          // Get profile image
          let profileImageUrl = null;
          
          if (session.user.user_metadata?.picture) {
            profileImageUrl = session.user.user_metadata.picture;
          } 
          else if (session.user.user_metadata?.raw_user_meta_data?.picture) {
            profileImageUrl = session.user.user_metadata.raw_user_meta_data.picture;
          }
          else if (profile?.avatar_url) {
            profileImageUrl = profile.avatar_url;
          }
          else if (session.user.user_metadata?.avatar_url) {
            profileImageUrl = session.user.user_metadata.avatar_url;
          }
          
          setProfileImage(profileImageUrl);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [userId]);

  // Function to get the appropriate icon for each profile type
  const getProfileTypeIcon = () => {
    switch(profileType.toLowerCase()) {
      case 'ceo':
        return <Briefcase className="w-5 h-5 text-primary-400" />;
      case 'associate':
        return <User className="w-5 h-5 text-primary-400" />;
      case 'ugc creator':
      case 'creator':
        return <Camera className="w-5 h-5 text-primary-400" />;
      default:
        return <User className="w-5 h-5 text-primary-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-dark-700 rounded-lg border border-dark-600 p-4 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-dark-600"></div>
          <div className="flex-1">
            <div className="h-5 w-24 bg-dark-600 rounded mb-2"></div>
            <div className="h-4 w-16 bg-dark-600 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-700 rounded-lg border border-dark-600 p-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 relative">
          {/* Glowing effect for profile image */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full opacity-75 blur-sm"></div>
          {profileImage ? (
            <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary-500">
              <img 
                src={profileImage} 
                alt={username} 
                className="h-full w-full object-cover"
                onError={(e) => {
                  // If image fails to load, replace with initials
                  const target = e.currentTarget;
                  const parent = target.parentElement;
                  if (parent) {
                    target.style.display = 'none';
                    // Create a fallback element with initials
                    const fallback = document.createElement('div');
                    fallback.className = "h-full w-full bg-primary-600 flex items-center justify-center text-white font-medium text-xl";
                    fallback.textContent = username.charAt(0).toUpperCase();
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
          ) : (
            <div className="relative h-16 w-16 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium text-xl">
              {username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-xl font-medium text-white">{username}</h3>
          <div className="flex items-center mt-1 text-gray-400">
            <span className="mr-2">{getProfileTypeIcon()}</span>
            <span>{profileType}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
