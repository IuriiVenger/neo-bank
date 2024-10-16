'use client';

import { useLaunchParams } from '@telegram-apps/sdk-react';

import DashboardPage from '@/app/(common_pages)/_dashboard';
import privateRoute from '@/components/privateRoute';
import { unsupportedTelegramVersions } from '@/config/telegram';

const MiniAppPage = () => {
  const launchParams = useLaunchParams(true);

  console.log('launchParams', launchParams?.version);
  launchParams?.version &&
    console.log('unsupportedTelegramVersions', unsupportedTelegramVersions.includes(launchParams.version));

  if (launchParams?.version && unsupportedTelegramVersions.includes(launchParams.version)) {
    return <h1>Plese update your app</h1>;
  }

  return <DashboardPage />;
};

export default privateRoute(MiniAppPage);
