'use client';

import { useLaunchParams } from '@telegram-apps/sdk-react';

import DashboardPage from '@/app/(common_pages)/_dashboard';
import privateRoute from '@/components/privateRoute';

const MiniAppPage = () => {
  const launchParams = useLaunchParams(true);

  console.log('launchParams', launchParams);

  return <DashboardPage />;
};

export default privateRoute(MiniAppPage);
