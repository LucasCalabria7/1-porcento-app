import React from 'react';
import { FormData } from '../types';
import { useTranslations } from 'next-intl';

interface ReviewStepProps {
  formData: FormData;
  getOptionLabel: (options: { value: string; label: string }[], value: string) => string;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData, getOptionLabel }) => {
  const t = useTranslations('userform');
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-white mb-6">{t('steps.review.title')}</h2>
      
      <div className="space-y-6 bg-dark-600/50 p-6 rounded-xl border border-dark-500">
        <h3 className="text-lg font-medium text-white">{t('steps.review.sections.basicInfo')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">{t('steps.basicInfo.fields.fullName.label')}</p>
            <p className="text-white">{formData.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">{t('steps.basicInfo.fields.email.label')}</p>
            <p className="text-white">{formData.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">{t('steps.basicInfo.fields.phoneNumber.label')}</p>
            <p className="text-white">{formData.phoneNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">{t('steps.basicInfo.fields.country.label')}</p>
            <p className="text-white">{getOptionLabel([{ value: formData.country, label: formData.country }], formData.country)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">{t('steps.basicInfo.fields.birthDate.label')}</p>
            <p className="text-white">{new Date(formData.birthDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">{formData.country === 'BR' ? t('steps.basicInfo.fields.document.labelBR') : t('steps.basicInfo.fields.document.label')}</p>
            <p className="text-white">{formData.document || t('steps.review.notProvided')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">{t('steps.basicInfo.fields.address.label')}</p>
            <p className="text-white">{formData.address}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">{t('steps.basicInfo.fields.language.label')}</p>
            <p className="text-white">{getOptionLabel([{ value: formData.language, label: formData.language }], formData.language)}</p>
          </div>
        </div>

        <div className="border-t border-dark-500 my-4"></div>
        
        <h3 className="text-lg font-medium text-white">{t('steps.review.sections.profileExperience')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">{t('steps.review.fields.profileType')}</p>
            <p className="text-white">{formData.profileType}</p>
          </div>
          
          {formData.profileType === 'CEO' && formData.companyRevenue && (
            <div>
              <p className="text-sm text-gray-400">{t('steps.review.fields.companyRevenue')}</p>
              <p className="text-white">{getOptionLabel([{ value: formData.companyRevenue, label: formData.companyRevenue }], formData.companyRevenue)}</p>
            </div>
          )}
          
          {formData.profileType === 'Associate' && formData.globalSellingExperience && (
            <div>
              <p className="text-sm text-gray-400">{t('steps.review.fields.globalSellingExperience')}</p>
              <p className="text-white">{getOptionLabel([{ value: formData.globalSellingExperience, label: formData.globalSellingExperience }], formData.globalSellingExperience)}</p>
            </div>
          )}
          
          {formData.profileType === 'UGC Creator' && formData.creatorExperienceLevel && (
            <div>
              <p className="text-sm text-gray-400">{t('steps.review.fields.creatorExperienceLevel')}</p>
              <p className="text-white">{getOptionLabel([{ value: formData.creatorExperienceLevel, label: formData.creatorExperienceLevel }], formData.creatorExperienceLevel)}</p>
            </div>
          )}
        </div>

        <div className="border-t border-dark-500 my-4"></div>
        
        <h3 className="text-lg font-medium text-white">{t('steps.review.sections.monetization')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">{t('steps.review.fields.monetizationMethod')}</p>
            <p className="text-white">{getOptionLabel([{ value: formData.monetizationMethod, label: formData.monetizationMethod }], formData.monetizationMethod)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">{t('steps.review.fields.globalMonetization')}</p>
            <p className="text-white">{getOptionLabel([{ value: formData.globalMonetization, label: formData.globalMonetization }], formData.globalMonetization)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">{t('steps.review.fields.digitalProductStrategy')}</p>
            <p className="text-white">{formData.digitalProductStrategy ? t('common.yes') : t('common.no')}</p>
          </div>
          
          {formData.digitalProductStrategy && formData.digitalProductType.length > 0 && (
            <div>
              <p className="text-sm text-gray-400">{t('steps.review.fields.digitalProductTypes')}</p>
              <div>
                {formData.digitalProductType.map((type, index) => (
                  <span key={index} className="inline-block bg-dark-500 text-white text-xs px-2 py-1 rounded mr-2 mb-2">
                    {getOptionLabel([{ value: type, label: type }], type)}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <p className="text-sm text-gray-400">{t('steps.review.fields.referralSource')}</p>
            <p className="text-white">{getOptionLabel([{ value: formData.referralSource, label: formData.referralSource }], formData.referralSource)}</p>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-400">
        {t('steps.review.verifyInfo')}
      </p>
      <p className="text-center text-sm text-gray-400 mt-6">
        {t.rich('steps.review.termsAgreement', {
          terms: (chunks) => <a href="/terms" className="text-primary-500 hover:underline">{chunks}</a>,
          privacy: (chunks) => <a href="/privacy" className="text-primary-500 hover:underline">{chunks}</a>
        })}
      </p>
    </div>
  );
};

export default ReviewStep;
