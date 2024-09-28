'use client';

import 'react-toastify/dist/ReactToastify.css';
import { SDKProvider } from '@telegram-apps/sdk-react';
import Script from 'next/script';
import { FC, Suspense } from 'react';

import TelegramInit from './_components/TelegramInit';

import LayoutModalContainer from '@/components/modals/LayoutModalContainer';
import { BrandLoader } from '@/components/ui/Loader';

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const MainLayout: FC<RootLayoutProps> = ({ children }) => (
  <main className="flex w-full max-w-screen-2xl flex-grow justify-center p-5 pb-20 md:px-10 md:pt-8">
    <Script strategy="beforeInteractive" src="https://telegram.org/js/telegram-web-app.js" />
    <SDKProvider>
      <TelegramInit />
      <Suspense fallback={<BrandLoader />}>{children}</Suspense>
      <LayoutModalContainer />
    </SDKProvider>
  </main>
);

export default MainLayout;
