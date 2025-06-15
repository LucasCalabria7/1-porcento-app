"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { User, Settings, LogOut, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { signOut, supabase } from '@/lib/supabaseClient';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('dashboard');
  
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  
  // Store collapsed state in localStorage
  useEffect(() => {
    const storedCollapsedState = localStorage.getItem('sidebarCollapsed');
    if (storedCollapsedState) {
      setIsCollapsed(storedCollapsedState === 'true');
    }
  }, []);
  
  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    localStorage.setItem('sidebarCollapsed', String(newCollapsedState));
  };
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Get user name from metadata or email
          const userName = session.user.user_metadata?.name || 
                          session.user.user_metadata?.full_name || 
                          session.user.email?.split('@')[0] || 
                          'Usuário';
          
          setUsername(userName);
          setEmail(session.user.email || '');
          
          // Get profile data from database
          const { data: profile } = await supabase
            .from('profiles')
            .select('avatar_url')
            .eq('user_id', session.user.id)
            .single();
          
          // Improved profile image handling with deep inspection of user data
          let profileImageUrl = null;
          
          // 1. Try Google picture from user metadata (most common location)
          if (session.user.user_metadata?.picture) {
            profileImageUrl = session.user.user_metadata.picture;
          } 
          // 2. Try Google picture from raw user metadata (sometimes stored here)
          else if (session.user.user_metadata?.raw_user_meta_data?.picture) {
            profileImageUrl = session.user.user_metadata.raw_user_meta_data.picture;
          }
          // 3. Try avatar_url from profile database
          else if (profile?.avatar_url) {
            profileImageUrl = profile.avatar_url;
          }
          // 4. Try avatar_url from metadata
          else if (session.user.user_metadata?.avatar_url) {
            profileImageUrl = session.user.user_metadata.avatar_url;
          }
          // 5. Try avatar_url from raw user metadata
          else if (session.user.user_metadata?.raw_user_meta_data?.avatar_url) {
            profileImageUrl = session.user.user_metadata.raw_user_meta_data.avatar_url;
          }
          // 6. Try Google OAuth specific fields
          else if (session.user.identities && session.user.identities.length > 0) {
            const googleIdentity = session.user.identities.find(identity => identity.provider === 'google');
            if (googleIdentity?.identity_data?.avatar_url) {
              profileImageUrl = googleIdentity.identity_data.avatar_url;
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
  
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/auth/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navigation = [
    { 
      name: t('sidebar.dashboard'), 
      href: '/dashboard', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ) 
    },
    { 
      name: t('sidebar.products'), 
      href: '/dashboard/products', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ) 
    },
    { 
      name: t('sidebar.sales'), 
      href: '/dashboard/sales', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ) 
    },
    { 
      name: t('sidebar.customers'), 
      href: '/dashboard/customers', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ) 
    },
    { 
      name: t('sidebar.analytics'), 
      href: '/dashboard/analytics', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ) 
    },
    { 
      name: t('sidebar.settings'), 
      href: '/dashboard/settings', 
      icon: <Settings className="h-5 w-5" /> 
    }
  ];

  return (
    <div className={`h-screen bg-dark-700 border-r border-dark-600 transition-all duration-300 flex-shrink-0 overflow-y-auto ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="relative h-16 border-b border-dark-600 bg-gradient-to-r from-dark-800 to-dark-700 flex items-center justify-between px-4">
        {!isCollapsed && (
          <div className="flex items-center flex-1">
            <Link href="/dashboard" className="flex items-center">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full opacity-30 group-hover:opacity-50 blur transition duration-300"></div>
                <div className="relative">
                  <Image 
                    src="/assets/logo-solo-azul-medio.png" 
                    alt="Umporcento Logo" 
                    width={32} 
                    height={32} 
                    className="transition-all duration-300"
                  />
                </div>
              </div>
              <span className="font-gotham-black text-lg text-white ml-3 transition-opacity duration-300">
                Um<span className="font-gotham-thin bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-primary-500">porcento</span>
              </span>
            </Link>
          </div>
        )}
        
        <button 
          onClick={toggleSidebar}
          className={`h-8 w-8 flex items-center justify-center rounded-full bg-dark-600 hover:bg-dark-500 text-primary-400 hover:text-primary-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 ${isCollapsed ? 'mx-auto' : ''}`}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      
      <div className={`${isCollapsed ? 'px-2' : 'px-4'} py-6`}>
        {!isCollapsed && (
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4 ml-2">MENU</p>
        )}
        {isCollapsed && (
          <div className="flex justify-center mb-4">
            <Menu size={16} className="text-gray-400" />
          </div>
        )}
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors ${isActive 
                  ? 'bg-primary-900/20 text-primary-400' 
                  : 'text-gray-300 hover:bg-dark-600 hover:text-white'}`}
                title={isCollapsed ? item.name : ''}
              >
                <div className={`flex-shrink-0 ${isCollapsed ? 'mx-auto' : 'mr-3'} ${isActive ? 'text-primary-400' : 'text-gray-400 group-hover:text-primary-400'}`}>
                  {item.icon}
                </div>
                {!isCollapsed && <span className="flex-1">{item.name}</span>}
                {isActive && !isCollapsed && (
                  <div className="relative ml-3">
                    <span className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full opacity-50 blur-sm animate-pulse"></span>
                    <span className="relative h-6 w-1 rounded-full bg-primary-400 block"></span>
                  </div>
                )}
                {isActive && isCollapsed && (
                  <div className="absolute left-0">
                    <span className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-r-full opacity-50 blur-sm animate-pulse"></span>
                    <span className="relative h-6 w-1 rounded-r-full bg-primary-400 block"></span>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className={`${isCollapsed ? 'px-2' : 'px-4'} py-4 mt-6 border-t border-dark-600`} ref={userDropdownRef}>
        <div 
          className={`cursor-pointer hover:bg-dark-600 p-2 rounded-lg transition-colors ${isCollapsed ? 'flex justify-center' : 'flex items-center'}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
                    const target = e.currentTarget;
                    const parent = target.parentElement;
                    if (parent) {
                      target.style.display = 'none';
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
          {!isCollapsed && (
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">{username}</p>
              <p className="text-xs text-gray-400">{email}</p>
            </div>
          )}
        </div>
        
        {/* User dropdown menu */}
        {isDropdownOpen && (
          <div className={`mt-2 bg-dark-700 border border-dark-600 rounded-md shadow-lg overflow-hidden ${isCollapsed ? 'absolute left-16 z-50 w-48' : ''}`}>
            <Link 
              href="/profile" 
              className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-dark-600 hover:text-white"
              onClick={() => setIsDropdownOpen(false)}
            >
              <User className="w-4 h-4 mr-2" />
              {t('userMenu.profile')}
            </Link>
            <Link 
              href="/settings" 
              className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-dark-600 hover:text-white"
              onClick={() => setIsDropdownOpen(false)}
            >
              <Settings className="w-4 h-4 mr-2" />
              {t('userMenu.settings')}
            </Link>
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:bg-dark-600 hover:text-red-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t('userMenu.logout')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
