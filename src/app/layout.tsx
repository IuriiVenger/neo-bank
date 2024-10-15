import '@/assets/styles/main.scss';

import 'react-toastify/dist/ReactToastify.css';
import { cookies } from 'next/headers';
import { FC } from 'react';

import { Providers } from './providers';

import type { Metadata } from 'next';

import StoreProvider from '@/store/components/StoreProvider';
import { getInitialTheme } from '@/utils/helpers';

export const metadata: Metadata = {
  // title: tenantInfo.name || 'Crypto Wallet',
  title: 'Main Card',
  description: 'Main Card. Your Secure Oasis for Global Transactions',
  other: {
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
  },
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  const cookiesTheme = cookies().get('active_theme')?.value;
  const envTheme = process.env.DEFAULT_THEME;

  const initialTheme = getInitialTheme(cookiesTheme, envTheme);

  return (
    <StoreProvider>
      <Providers initialTheme={initialTheme}>{children}</Providers>
    </StoreProvider>
  );
};

export default RootLayout;
