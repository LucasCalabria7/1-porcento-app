"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Settings, 
  ChevronDown,
  User,
  Briefcase,
  Camera,
  LogOut
} from 'lucide-react';
import { signOut, supabase } from '@/lib/supabaseClient';
import { useLocale } from '@/contexts/LocaleProvider';

export default function Header() {
  const router = useRouter();
  const t = useTranslations('dashboard');
  const { locale } = useLocale();
  const [username, setUsername] = useState<string>('');
  const [profileType, setProfileType] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileTypeDropdownOpen, setIsProfileTypeDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // Mock notification count

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log('User session:', session);
          console.log('User metadata:', session.user.user_metadata);
          
          // Get user name from metadata or email
          const userName = session.user.user_metadata?.name || 
                          session.user.user_metadata?.full_name || 
                          session.user.email?.split('@')[0] || 
                          'Usuário';
          
          setUsername(userName);
          
          // Get profile type from database
          const { data: profile } = await supabase
            .from('profiles')
            .select('profile_type, avatar_url')
            .eq('user_id', session.user.id)
            .single();
          
          console.log('Profile data:', profile);
          
          // Set profile type
          if (profile && profile.profile_type) {
            setProfileType(profile.profile_type);
          } else {
            // Fallback to metadata
            setProfileType(session.user.user_metadata?.profile_type || '');
          }
          
          // Improved profile image handling with deep inspection of user data
          // Check all possible sources for profile image
          let profileImageUrl = null;
          
          // Log all potential image sources for debugging
          console.log('Potential image sources:');
          console.log('- user_metadata.picture:', session.user.user_metadata?.picture);
          console.log('- user_metadata.avatar_url:', session.user.user_metadata?.avatar_url);
          console.log('- profile.avatar_url:', profile?.avatar_url);
          console.log('- user_metadata.raw_user_meta_data:', session.user.user_metadata?.raw_user_meta_data);
          
          // 1. Try Google picture from user metadata (most common location)
          if (session.user.user_metadata?.picture) {
            profileImageUrl = session.user.user_metadata.picture;
            console.log('Using Google picture from user_metadata.picture:', profileImageUrl);
          } 
          // 2. Try Google picture from raw user metadata (sometimes stored here)
          else if (session.user.user_metadata?.raw_user_meta_data?.picture) {
            profileImageUrl = session.user.user_metadata.raw_user_meta_data.picture;
            console.log('Using Google picture from raw_user_meta_data.picture:', profileImageUrl);
          }
          // 3. Try avatar_url from profile database
          else if (profile?.avatar_url) {
            profileImageUrl = profile.avatar_url;
            console.log('Using profile avatar_url from database:', profileImageUrl);
          }
          // 4. Try avatar_url from metadata
          else if (session.user.user_metadata?.avatar_url) {
            profileImageUrl = session.user.user_metadata.avatar_url;
            console.log('Using avatar_url from metadata:', profileImageUrl);
          }
          // 5. Try avatar_url from raw user metadata
          else if (session.user.user_metadata?.raw_user_meta_data?.avatar_url) {
            profileImageUrl = session.user.user_metadata.raw_user_meta_data.avatar_url;
            console.log('Using avatar_url from raw_user_meta_data:', profileImageUrl);
          }
          // 6. Try Google OAuth specific fields
          else if (session.user.identities && session.user.identities.length > 0) {
            const googleIdentity = session.user.identities.find(identity => identity.provider === 'google');
            if (googleIdentity?.identity_data?.avatar_url) {
              profileImageUrl = googleIdentity.identity_data.avatar_url;
              console.log('Using avatar_url from Google identity data:', profileImageUrl);
            }
          }
          
          setProfileImage(profileImageUrl);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/auth/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Function to get the appropriate icon for each profile type
  const getProfileTypeIcon = () => {
    switch(profileType.toLowerCase()) {
      case 'ceo':
        return <Briefcase className="w-4 h-4 text-primary-400" />;
      case 'associate':
        return <User className="w-4 h-4 text-primary-400" />;
      case 'ugc creator':
      case 'creator':
        return <Camera className="w-4 h-4 text-primary-400" />;
      default:
        return <User className="w-4 h-4 text-primary-400" />;
    }
  };
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Close profile type dropdown if clicking outside
      if (isProfileTypeDropdownOpen && !target.closest('.profile-type-dropdown')) {
        setIsProfileTypeDropdownOpen(false);
      }
      
      // Close user dropdown if clicking outside
      if (isDropdownOpen && !target.closest('.user-dropdown')) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileTypeDropdownOpen, isDropdownOpen]);

  return (
    <header className="bg-dark-700 border-b border-dark-600 py-4 px-6">
      <div className="flex items-center justify-between">
        {/* Left side - Welcome message */}
        <div className="flex items-center">
          <div>
            <div className="flex items-center">
              <h2 className="text-white text-lg font-medium">
                {t('welcome')}, <span className="text-primary-400">{username}</span>
              </h2>
              
              {/* Profile Type Dropdown */}
              {profileType && (
                <div className="relative ml-2 profile-type-dropdown">
                  <button 
                    onClick={() => setIsProfileTypeDropdownOpen(!isProfileTypeDropdownOpen)}
                    className="flex items-center text-gray-400 hover:text-primary-400 transition-colors px-2 py-1 rounded-md hover:bg-dark-600"
                  >
                    <span className="mr-1">{getProfileTypeIcon()}</span>
                    <span>{profileType}</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isProfileTypeDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-40 bg-dark-700 border border-dark-600 rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-dark-600 hover:text-white flex items-center">
                          <Briefcase className="w-4 h-4 mr-2 text-primary-400" />
                          {t('profileTypes.ceo')}
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-dark-600 hover:text-white flex items-center">
                          <User className="w-4 h-4 mr-2 text-primary-400" />
                          {t('profileTypes.associate')}
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-dark-600 hover:text-white flex items-center">
                          <Camera className="w-4 h-4 mr-2 text-primary-400" />
                          {t('profileTypes.creator')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <p className="text-gray-400 text-sm">
              {(() => {
                // Use the application's current locale from the LocaleProvider
                try {
                  // Map the application locale to a valid date locale format
                  const dateLocale = {
                    'pt-BR': 'pt-BR',
                    'en': 'en-US',
                    'es': 'es-ES'
                  }[locale] || locale;
                  
                  console.log('Using date locale:', dateLocale);
                  
                  // Try to format the date with the current locale
                  return new Date().toLocaleDateString(dateLocale, { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  });
                } catch (e) {
                  console.error('Error formatting date with locale:', locale, e);
                  // Fallback based on the current locale
                  const fallbackLocale = locale.startsWith('es') ? 'es-ES' : 
                                         locale.startsWith('en') ? 'en-US' : 'pt-BR';
                  
                  return new Date().toLocaleDateString(fallbackLocale, { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  });
                }
              })()}
            </p>
          </div>
        </div>

        {/* Right side - Search and actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input 
              type="search" 
              className="block w-full md:w-64 p-2 pl-10 text-sm bg-dark-800 border border-dark-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-white placeholder-gray-400"
              placeholder={t('searchPlaceholder')} 
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-300 hover:text-white rounded-full hover:bg-dark-600 transition-colors">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                {notifications}
              </span>
            )}
            <span className="sr-only">{t('notifications')}</span>
          </button>

          {/* Help */}
          <button className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-dark-600 transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Settings */}
          <Link href="/settings" className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-dark-600 transition-colors">
            <Settings className="w-5 h-5" />
          </Link>

          {/* User menu */}
          <div className="relative user-dropdown">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 text-white hover:text-primary-400 transition-colors focus:outline-none"
            >
              <div className="flex-shrink-0 relative">
                {/* Glowing effect for profile image */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full opacity-75 blur-sm animate-pulse"></div>
                {profileImage ? (
                  <div className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-primary-500">
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
                          fallback.className = "h-full w-full bg-primary-600 flex items-center justify-center text-white font-medium";
                          fallback.textContent = username.charAt(0).toUpperCase();
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="relative h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                    {username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-dark-700 border border-dark-600 rounded-md shadow-lg z-10">
                <div className="py-1">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-600 hover:text-white">
                    {t('userMenu.profile')}
                  </Link>
                  <Link href="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-600 hover:text-white">
                    {t('userMenu.settings')}
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-dark-600 hover:text-red-300 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('userMenu.logout')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
