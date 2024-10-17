import { notFound } from 'next/navigation';
import { FC } from 'react';

import PrivacyContent from '@/components/staticPages/PrivacyContent';
import whiteLabelConfig from '@/config/whitelabel';

const TermsPage: FC = async () => (whiteLabelConfig.disableStaticPages ? notFound() : <PrivacyContent />);

export default TermsPage;
