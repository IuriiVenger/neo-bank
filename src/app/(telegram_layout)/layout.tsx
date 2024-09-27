'use client';

import 'react-toastify/dist/ReactToastify.css';
import { SDKProvider } from '@telegram-apps/sdk-react';
import Script from 'next/script';
import { FC, Suspense, useEffect, useState } from 'react';

import TelegramInit from './_components/TelegramInit';

import LayoutModalContainer from '@/components/modals/LayoutModalContainer';
import { BrandLoader } from '@/components/ui/Loader';
import { themes } from '@/config/themes';

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const MainLayout: FC<RootLayoutProps> = ({ children }) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (isScriptLoaded) {
      (window as any).Telegram.WebApp.setBackgroundColor(themes.dark.baseColors.background);
      (window as any).Telegram.WebApp.setHeaderColor(themes.dark.baseColors.background);
      (window as any).Telegram.WebApp.setBottomBarColor(themes.dark.telegramColors.mainButton.color);
    }
  }, [isScriptLoaded]);

  return (
    <main className="flex w-full max-w-screen-2xl flex-grow justify-center p-5 pb-20 md:px-10 md:pt-8">
      <Script onLoad={() => setIsScriptLoaded(true)} src="https://telegram.org/js/telegram-web-app.js" />
      {isScriptLoaded && (
        <SDKProvider>
          <TelegramInit />
          <Suspense fallback={<BrandLoader />}>{children}</Suspense>
          <LayoutModalContainer />
        </SDKProvider>
      )}
    </main>
  );
};

export default MainLayout;
