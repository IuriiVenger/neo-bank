'use client';

import { SDKProvider } from '@telegram-apps/sdk-react';
import Script from 'next/script';
import { FC, PropsWithChildren } from 'react';

import SetTelegramEnviroment from '../../components/initialization/SetTelegramEnviroment';
import TelegramInit from '../../components/initialization/TelegramInit';

import WithCheckTGVersion from '@/components/initialization/WithCheckTGVersion';
import LayoutModalContainer from '@/components/modals/LayoutModalContainer';

const RootTelegramLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Script strategy="beforeInteractive" src="https://telegram.org/js/telegram-web-app.js" />
    <SDKProvider>
      <TelegramInit />
      <SetTelegramEnviroment />
      <WithCheckTGVersion>{children}</WithCheckTGVersion>
      <LayoutModalContainer />
    </SDKProvider>
  </>
);

export default RootTelegramLayout;
