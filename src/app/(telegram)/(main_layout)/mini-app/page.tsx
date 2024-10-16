'use client';

import { useLaunchParams } from '@telegram-apps/sdk-react';

import DashboardPage from '@/app/(common_pages)/_dashboard';
import privateRoute from '@/components/privateRoute';
import { unsupportedTelegramVersions } from '@/config/telegram';

const MiniAppPage = () => {
  const launchParams = useLaunchParams(true);

  if (launchParams?.version && unsupportedTelegramVersions.includes(launchParams.version)) {
    return <h1>Plese update your app</h1>;
  }

  return <DashboardPage />;
};

export default privateRoute(MiniAppPage);
