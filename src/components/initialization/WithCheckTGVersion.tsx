'use client';

import { useLaunchParams } from '@telegram-apps/sdk-react';
import { FC, PropsWithChildren } from 'react';

import UpdateTelegram from '../UpdateTelegram';

import { unsupportedTelegramVersions } from '@/config/telegram';

const WithCheckTGVersion: FC<PropsWithChildren> = ({ children }) => {
  const launchParams = useLaunchParams(true);

  if (launchParams?.version && unsupportedTelegramVersions.includes(launchParams.version)) {
    return <UpdateTelegram />;
  }

  return children;
};

export default WithCheckTGVersion;
