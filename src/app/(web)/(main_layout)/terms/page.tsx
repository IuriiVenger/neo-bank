import { notFound } from 'next/navigation';
import { FC } from 'react';

import TermsContent from '@/components/staticPages/TermsContent';
import whiteLabelConfig from '@/config/whitelabel';

const TermsPage: FC = async () => (whiteLabelConfig.disableStaticPages ? notFound() : <TermsContent />);

export default TermsPage;
