import React from 'react';
import { UserProfileType } from '../types';
import { ProfileOption, CEOIcon, AssociateIcon, CreatorIcon } from '../components';
import { useTranslations } from 'next-intl';

interface ProfileTypeStepProps {
  selectedProfile: UserProfileType;
  setSelectedProfile: (profile: UserProfileType) => void;
}

const ProfileTypeStep: React.FC<ProfileTypeStepProps> = ({ selectedProfile, setSelectedProfile }) => {
  const t = useTranslations('userform');
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium text-white mb-6">{t('steps.profileType.title')}</h2>
      
      <div className="space-y-4">
        <ProfileOption 
          title={t('steps.profileType.options.ceo.title')} 
          description={t('steps.profileType.options.ceo.description')}
          icon={<CEOIcon />}
          selected={selectedProfile === 'CEO'}
          onClick={() => setSelectedProfile('CEO')}
        />
        
        <ProfileOption 
          title={t('steps.profileType.options.associate.title')} 
          description={t('steps.profileType.options.associate.description')}
          icon={<AssociateIcon />}
          selected={selectedProfile === 'Associate'}
          onClick={() => setSelectedProfile('Associate')}
        />
        
        <ProfileOption 
          title={t('steps.profileType.options.creator.title')} 
          description={t('steps.profileType.options.creator.description')}
          icon={<CreatorIcon />}
          selected={selectedProfile === 'UGC Creator'}
          onClick={() => setSelectedProfile('UGC Creator')}
        />
      </div>
    </div>
  );
};

export default ProfileTypeStep;
