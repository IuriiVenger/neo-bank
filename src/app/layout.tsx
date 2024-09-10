import cn from 'classnames';
import { Inter } from 'next/font/google';
import '@/assets/styles/globals.css';
import '@/assets/styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import { FC } from 'react';

import { Slide, ToastContainer } from 'react-toastify';

// import tenantInfo from '../../public/static/files/tenantInfo.json';

import { Providers } from './providers';

import type { Metadata } from 'next';

import StoreProvider from '@/store/components/StoreProvider';
import StoreWatchers from '@/store/components/StoreWatchers';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  // title: tenantInfo.name || 'Crypto Wallet',
  title: 'SkyFlyCard',
  description: 'SkyFlyCard. Your Secure Oasis for Global Transactions',
  other: {
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
  },
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <StoreProvider>
    <html lang="en" className="dark">
      <body className={cn(font.className, 'bg-background text-foreground')}>
        <Providers>{children}</Providers>
        <ToastContainer
          position="top-right"
          closeButton={false}
          autoClose={4000}
          transition={Slide}
          progressStyle={{ background: 'white' }}
          closeOnClick
          pauseOnHover={false}
          toastClassName="py-0 px-4 bg-white border border-beerus rounded-lg shadow-xl"
          bodyClassName="text-sm text-black p-0 font-normal"
        />
        <StoreWatchers />
      </body>
    </html>
  </StoreProvider>
);

export default RootLayout;
