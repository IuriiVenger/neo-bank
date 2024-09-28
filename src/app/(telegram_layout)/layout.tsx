'use client';

import 'react-toastify/dist/ReactToastify.css';
import { SDKProvider } from '@telegram-apps/sdk-react';
import Script from 'next/script';
import { FC, Suspense, useEffect } from 'react';

import TelegramInit from './_components/TelegramInit';

import LayoutModalContainer from '@/components/modals/LayoutModalContainer';
import { BrandLoader } from '@/components/ui/Loader';
import { themes } from '@/config/themes';

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const MainLayout: FC<RootLayoutProps> = ({ children }) => {
  const test = 123;
  useEffect(() => {
    window.Telegram.WebApp.setBackgroundColor(themes.dark.baseColors.background);
    window.Telegram.WebApp.setHeaderColor(themes.dark.baseColors.background);
    window.Telegram.WebApp.setBottomBarColor(themes.dark.baseColors.background);
  }, []);

  return (
    <main className="flex w-full max-w-screen-2xl flex-grow justify-center p-5 pb-20 md:px-10 md:pt-8">
      <Script strategy="beforeInteractive" src="https://telegram.org/js/telegram-web-app.js" />

      <SDKProvider>
        <TelegramInit />
        <Suspense fallback={<BrandLoader />}>{children}</Suspense>
        <LayoutModalContainer />
      </SDKProvider>
    </main>
  );
};

export default MainLayout;
