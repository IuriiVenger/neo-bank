'use client';

import { useLaunchParams } from '@telegram-apps/sdk-react';
import { FC, PropsWithChildren } from 'react';

import UpdateTelegram from '../UpdateTelegram';

import SetTelegramEnviroment from './SetTelegramEnviroment';
import TelegramInit from './TelegramInit';

import { unsupportedTelegramVersions } from '@/config/telegram';

const WithCheckTGVersion: FC<PropsWithChildren> = ({ children }) => {
  const launchParams = useLaunchParams(true);

  if (launchParams?.version && unsupportedTelegramVersions.includes(launchParams.version)) {
    return <UpdateTelegram />;
  }

  return (
    <>
      <SetTelegramEnviroment />
      <TelegramInit />
      {children}
    </>
  );
};

export default WithCheckTGVersion;
