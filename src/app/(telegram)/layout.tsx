'use client';

import { SDKProvider } from '@telegram-apps/sdk-react';
import Script from 'next/script';
import { FC, PropsWithChildren } from 'react';

import WithCheckTGVersion from '@/components/initialization/WithCheckTGVersion';
import LayoutModalContainer from '@/components/modals/LayoutModalContainer';

const RootTelegramLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Script strategy="beforeInteractive" src="https://telegram.org/js/telegram-web-app.js" />
    <SDKProvider>
      <WithCheckTGVersion>{children}</WithCheckTGVersion>
      <LayoutModalContainer />
    </SDKProvider>
  </>
);

export default RootTelegramLayout;
