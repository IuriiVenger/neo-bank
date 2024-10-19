import { notFound } from 'next/navigation';
import { FC } from 'react';

import AMLContent from '@/components/staticPages/AMLContent';
import whiteLabelConfig from '@/config/whitelabel';

const AMLPage: FC = async () => (whiteLabelConfig.disableStaticPages ? notFound() : <AMLContent />);

export default AMLPage;
