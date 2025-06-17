"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import CEODashboard from './CEODashboard';
import AssociateDashboard from './AssociateDashboard';
import CreatorDashboard from './CreatorDashboard';
import { Building2, Users, Video } from 'lucide-react';
import { useAppTranslations } from '@/lib/useAppTranslations';

export default function DashboardContent() {
  const { t } = useAppTranslations();
  const [profileType, setProfileType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [salesData, setSalesData] = useState({
    totalSalesToday: '1.240,00',
    availableBalance: '8.750,00',
    pendingBalance: '2.350,00'
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Get profile type from database
          const { data: profile } = await supabase
            .from('profiles')
            .select('profile_type')
            .eq('user_id', session.user.id)
            .single();
          
          // Set profile type
          if (profile && profile.profile_type) {
            setProfileType(profile.profile_type.toLowerCase());
          } else {
            // Fallback to metadata
            setProfileType(session.user.user_metadata?.profile_type?.toLowerCase() || 'ceo');
          }
          
          // Here you could fetch real sales data for the user
          // For now, we are using simulated data
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);

  // Render a loading skeleton while data is being loaded
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-24 bg-dark-700 rounded-lg"></div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-dark-700 rounded-lg"></div>
          ))}
        </div>
        <div className="h-80 bg-dark-700 rounded-lg"></div>
      </div>
    );
  }

  // Render the specific dashboard based on profile type
  const renderDashboardByProfileType = () => {
    switch(profileType) {
      case 'ceo':
        return (
          <CEODashboard 
            totalSalesToday={salesData.totalSalesToday}
            availableBalance={salesData.availableBalance}
            pendingBalance={salesData.pendingBalance}
          />
        );
      case 'associate':
        return (
          <AssociateDashboard 
            totalSalesToday={salesData.totalSalesToday}
            availableBalance={salesData.availableBalance}
            pendingBalance={salesData.pendingBalance}
          />
        );
      case 'ugc creator':
      case 'creator':
        return (
          <CreatorDashboard 
            totalSalesToday={salesData.totalSalesToday}
            availableBalance={salesData.availableBalance}
            pendingBalance={salesData.pendingBalance}
          />
        );
      default:
        return (
          <CEODashboard 
            totalSalesToday={salesData.totalSalesToday}
            availableBalance={salesData.availableBalance}
            pendingBalance={salesData.pendingBalance}
          />
        );
    }
  };

  // Function to render the icon based on profile type
  const renderProfileIcon = () => {
    switch(profileType) {
      case 'ceo':
        return <Building2 className="inline-block w-5 h-5 text-primary-400 mr-2" />;
      case 'associate':
        return <Users className="inline-block w-5 h-5 text-primary-400 mr-2" />;
      case 'ugc creator':
      case 'creator':
        return <Video className="inline-block w-5 h-5 text-primary-400 mr-2" />;
      default:
        return <Building2 className="inline-block w-5 h-5 text-primary-400 mr-2" />;
    }
  };

  // Function to get the formatted and translated profile name
  const getProfileName = () => {
    switch(profileType) {
      case 'ceo':
        return t('dashboard.profileTypes.ceo');
      case 'associate':
        return t('dashboard.profileTypes.associate');
      case 'ugc creator':
      case 'creator':
        return t('dashboard.profileTypes.creator');
      default:
        return t('dashboard.profileTypes.ceo');
    }
  };

  return (
    <div className="">
      {/* Header with profile icon */}
      <div className="mb-8">
        <h1 className="title-black text-2xl font-semibold text-white flex items-center">
          {t('dashboard.sidebar.dashboard')} 
          <span className="ml-2 flex items-center bg-dark-700/60 px-3 py-1 rounded-full text-lg">
            {renderProfileIcon()}
            {getProfileName()}
          </span>
        </h1>
      </div>
      
      {/* Specific dashboard based on profile type */}
      {renderDashboardByProfileType()}
    </div>
  );
}
