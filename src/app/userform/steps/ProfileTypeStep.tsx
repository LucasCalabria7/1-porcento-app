import React from 'react';
import { UserProfileType } from '../types';
import { ProfileOption, CEOIcon, AssociateIcon, CreatorIcon } from '../components';

interface ProfileTypeStepProps {
  selectedProfile: UserProfileType;
  setSelectedProfile: (profile: UserProfileType) => void;
}

const ProfileTypeStep: React.FC<ProfileTypeStepProps> = ({ selectedProfile, setSelectedProfile }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium text-white mb-6">Qual melhor perfil define você?</h2>
      
      <div className="space-y-4">
        <ProfileOption 
          title="CEO" 
          description="Você é dono ou lidera uma empresa ou produto digital"
          icon={<CEOIcon />}
          selected={selectedProfile === 'CEO'}
          onClick={() => setSelectedProfile('CEO')}
        />
        
        <ProfileOption 
          title="Associate" 
          description="Você trabalha em uma empresa ou é parte de um time"
          icon={<AssociateIcon />}
          selected={selectedProfile === 'Associate'}
          onClick={() => setSelectedProfile('Associate')}
        />
        
        <ProfileOption 
          title="UGC Creator" 
          description="Você cria conteúdo e é um influenciador digital"
          icon={<CreatorIcon />}
          selected={selectedProfile === 'UGC Creator'}
          onClick={() => setSelectedProfile('UGC Creator')}
        />
      </div>
    </div>
  );
};

export default ProfileTypeStep;
